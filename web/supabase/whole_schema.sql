-- ============================================================
-- 1Click共テ対策  Supabase スキーマ 初期とmigration統合版
-- supabase/schema.sql
--
-- Supabaseの SQL Editor にこの内容を貼り付けて実行する。
-- questions（問題ストック）と daily_usage（全体上限カウンタ）の2テーブル。
-- ============================================================

-- 問題ストック本体 -------------------------------------------
create table if not exists questions (
    id           bigint generated always as identity primary key,
    subject_id   text        not null,              -- 例: 'math1a'
    unit_id      text        not null,              -- 例: 'math1a_03'
    unit_label   text        not null,              -- 例: '二次関数'
    exam_format  text        not null default 'csat',
    question     text        not null,
    choices      jsonb       not null,              -- ["選択肢1","選択肢2","選択肢3","選択肢4"]
    answer_index int         not null,              -- 正解の配列インデックス(0〜3)
    explanation  text        not null,
    keywords     jsonb       not null default '[]'::jsonb, -- ["平方完成","頂点"] 復習用
    source       text        not null default 'seed', -- 'seed'(初期) | 'user'(利用者生成)
    created_at   timestamptz not null default now()
);

-- 抽出を速くするためのインデックス（科目・単元での絞り込み）
create index if not exists idx_questions_subject_unit
    on questions (subject_id, unit_id);

-- 全体の1日あたり生成回数を記録するカウンタ（予算ガード用）-----
create table if not exists daily_usage (
    day          date        primary key,           -- 'YYYY-MM-DD'
    gen_count    int         not null default 0,    -- その日の新規AI生成回数（全体）
    updated_at   timestamptz not null default now()
);

-- 1日の総生成回数を1増やし、増加後の値を返す関数（原子的にカウント）
-- アプリ側はこの戻り値を見て全体上限を超えたら生成を止める。
create or replace function increment_daily_usage()
returns int
language plpgsql
as $$
declare
    today date := (now() at time zone 'Asia/Tokyo')::date;
    newcount int;
begin
    insert into daily_usage (day, gen_count, updated_at)
        values (today, 1, now())
    on conflict (day) do update
        set gen_count = daily_usage.gen_count + 1,
            updated_at = now()
    returning gen_count into newcount;
    return newcount;
end;
$$;

-- ストックからランダムにN問取得する関数（単元指定は任意）
-- unit_ids が空配列なら科目全体から、指定があればその単元群からランダム抽出。
create or replace function pick_random_questions(
    p_subject_id text,
    p_unit_ids   text[],
    p_limit      int
)
returns setof questions
language sql
as $$
    select *
    from questions
    where subject_id = p_subject_id
        and (
            array_length(p_unit_ids, 1) is null
            or unit_id = any(p_unit_ids)
        )
    order by random()
    limit p_limit;
$$;

-- 行レベルセキュリティ（RLS）---------------------------------
-- 公開読み取りのみ許可。書き込みはサーバー側のservice_roleキーで行う。
alter table questions enable row level security;

create policy "questions are publicly readable"
    on questions for select
    using (true);

-- ============================================================
-- 単元ごとのストック数キャッシュ（設定画面の「現在約○○問」表示用）
-- ============================================================

-- 集計結果を保持する小さなテーブル（単元ごと1行）
create table if not exists unit_stats (
    subject_id   text        not null,
    unit_id      text        not null,
    question_count int       not null default 0,
    updated_at   timestamptz not null default now(),
    primary key (subject_id, unit_id)
);

-- questions を集計して unit_stats を作り直す関数。
-- 初回は手動でこの関数を実行（SQL Editorで select refresh_unit_stats();）。
-- 将来 pg_cron で1日1回この関数を呼べば自動更新に拡張できる（ロジックはこのまま）。
create or replace function refresh_unit_stats()
returns void
language plpgsql
as $$
begin
    -- いったん空にして集計し直す（差分でなく総入れ替え。データ量が小さいので十分速い）
    delete from unit_stats;
    insert into unit_stats (subject_id, unit_id, question_count, updated_at)
    select subject_id, unit_id, count(*)::int, now()
    from questions
    group by subject_id, unit_id;
end;
$$;

-- 公開読み取りを許可（書き込みは service_role のみ）
alter table unit_stats enable row level security;

create policy "unit_stats are publicly readable"
    on unit_stats for select
    using (true);

-- ============================================================
-- 【将来の自動更新メモ】
-- pg_cron 拡張を有効化すれば、以下で毎日午前4時(JST=UTC19時)に自動集計できる。
-- 初期は不要。手動運用に慣れて自動化したくなったら有効化する。
--
--   create extension if not exists pg_cron;
--   select cron.schedule('refresh-unit-stats', '0 19 * * *', 'select refresh_unit_stats();');
-- ============================================================