// ===========================
// お知らせ（News）のデータ層
// lib/news.ts
//
// Supabaseの news テーブルを読み、LP のお知らせ表示用に NewsItem[] を返す。
// ・getNews: お知らせを表示順（sort_order降順→日付降順）で取得
//
// 追加・修正は Supabase の Table Editor から news テーブルの行を
// 編集するだけでよい（デプロイ不要で反映される）。
// ===========================

import { getReadClient } from '@/lib/supabase'

/** LP表示用の1件 */
export interface NewsItem {
    date: string   // 表示用の日付文字列（例 '2026/06/16'）
    text: string   // 本文
    tag: string    // 分類タグ（将来のチップ表示用。現状は未使用でも保持）
}

/** DBの1行の形 */
interface NewsRow {
    date_text: string
    body: string
    tag: string | null
    sort_order: number
}

/**
 * お知らせを取得する。
 * ・並びは sort_order 降順 → date_text 降順（新しい／上位のものが先頭）。
 * ・Supabase未接続や失敗時は空配列を返し、LP自体は落とさない。
 */
export async function getNews(): Promise<NewsItem[]> {
    const client = getReadClient()
    if (!client) {
        console.warn('[news] Supabase未接続のためお知らせを空で返します')
        return []
    }

    const { data, error } = await client
        .from('news')
        .select('date_text, body, tag, sort_order')
        .order('sort_order', { ascending: false })
        .order('date_text', { ascending: false })

    if (error) {
        console.error('[news] 取得エラー', error)
        return []
    }

    const rows = (data ?? []) as NewsRow[]
    return rows.map((row) => ({
        date: row.date_text,
        text: row.body,
        tag: row.tag ?? '',
    }))
}