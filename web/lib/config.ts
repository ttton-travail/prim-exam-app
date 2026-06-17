// ===========================
// アプリ基本設定・定数管理
// lib/config.ts
// ===========================

// -----------------------------------------------
// 問題数の選択肢
// -----------------------------------------------
export const QUESTION_COUNT_OPTIONS = [5, 10, 20] as const
export type QuestionCount = (typeof QUESTION_COUNT_OPTIONS)[number]

export const DEFAULT_QUESTION_COUNT: QuestionCount = 10

// -----------------------------------------------
// Gemini API設定
// -----------------------------------------------
// 運用ユーザー向けの生成は Flash-Lite を使用（Flashの約1/6のコスト）。
// 価格目安: input $0.10 / output $0.40 per 1M tokens。
export const GEMINI_MODEL = 'gemini-2.5-flash-lite'
// Lite は thinking をほぼ使わないが、共テ形式は選択肢が長文になりやすいので余裕を持たせる。
// 10〜20問でも途中で切れないよう大きめに確保する。
export const GEMINI_MAX_TOKENS = 16384
// thinking を抑えて出力本体にトークンを回す（0で実質オフ）。
export const GEMINI_THINKING_BUDGET = 0
// 内容保障のため深度は1のままに。
export const GEMINI_TEMPERATURE = 1

// -----------------------------------------------
// アプリ情報
// -----------------------------------------------
export const APP_NAME = 'かたてスト'
// ブラウザタブ・検索結果・OGP用のフルタイトル（アプリ名＋副題、中黒区切り）。
// ※ 画面ロゴ横の副題（labels.app.subtitle = '- 1Click共テ対策 -'）は装飾用で別物。
export const APP_TITLE_FULL = 'かたてスト｜1Click共テ対策'
export const APP_DESCRIPTION = 'かたてスト（1Click共テ対策）｜1ClickでAI問題生成→お手軽共通テスト対策アプリ'
// 本番URL（OGP・canonical・sitemap で使用）。末尾スラッシュなし。
export const SITE_URL = 'https://katatest.ttton-notty.com'
// SEO用キーワード（検索流入を狙う語）。metadata.keywords に渡す。
export const SEO_KEYWORDS = [
    'かたてスト', '共テ', '共通テスト', 'センター', 'センターテスト',
    '共通テスト対策', '共通テスト 問題', '共通テスト 過去問', '一問一答',
    '高校 物理', '高校 化学', '高校 生物', '高校 地学',
    '物理基礎', '化学基礎', '生物基礎', '地学基礎', '情報I',
    '勉強', '学習', '勉強アプリ', '学習アプリ', '問題集アプリ', '高校生',
    'AI 問題生成', '大学受験', '受験勉強',
    'Ttton', 'TtLab', 'ととらぼ', 'とととん', 'nottY',
]

// -----------------------------------------------
//  デフォルトの問題形式
// -----------------------------------------------
export const DEFAULT_EXAM_FORMAT = 'csat' as const

// -----------------------------------------------
// 支援策（投げ銭など）
// -----------------------------------------------
// 「ご支援はこちらから」に並べるリンク群。
// enabled:false または url 空の項目は非表示（HP等が未完成のリンクを隠せる）。
// icon は public/assets 下の画像パス（任意）。あればボタン画像として表示し、
// その下に label テキストを出す（画像・テキストとも同じ url へ飛ぶ）。
//
// 【将来のスマホ実装メモ】
//   ストア規約上、外部決済（BMC等）はアプリ内課金を回避する導線にできないため、
//   スマホ版では外部リンクはWebページへ遷移させ、アプリ内課金は別途用意する。
export interface SupportLink {
    id: string             // labels.support.items[id] で表示テキストを引く
    url: string            // 飛び先
    enabled: boolean       // 表示するか
    icon?: string          // public/assets 下の画像パス（任意・BMC公式ボタン等）
}
export const SUPPORT_LINKS: SupportLink[] = [
    {
        id: 'bmc',
        url: 'https://buymeacoffee.com/ttton_notty',
        enabled: true,
        icon: '/assets/bmc-button.svg',
    },
    // 例（いずれ追加）:
    // { id: 'amazon', url: '', enabled: false },  ※表示文言は labels.support.items に追加
]

// 投稿箱（フィードバック）
// -----------------------------------------------
// 感想・要望・お問い合わせ・バグ報告の送信先。
// Google Apps Script の Webアプリ（doPost）URLを設定する。
// 受け取った内容はスプレッドシートに追記される（scripts/feedback_gas.gs 参照）。
// 空文字なら投書箱は非表示。
export const FEEDBACK_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyR-VusHCWmc0mmPYispk2pC95A-IHvK4bv9m7g_CyRaZyPwAlQmInV38XLyShOAeeBnQ/exec'

// 連絡先・SNS（フッター右側）
// -----------------------------------------------
// 製作者SNS・問い合わせ先などのリンク群。
// enabled:false または url 空の項目は非表示（HP等が未完成のリンクを隠せる）。
// icon は lib/assets.ts の BRAND_ICONS のキー（'x' | 'line' | 'github' | 'note' ...）。
export interface ContactLink {
    id: string
    label: string
    url: string
    enabled: boolean
    icon?: string          // BRAND_ICONS のキー
}
export const CONTACT_LINKS: ContactLink[] = [
    { id: 'x', label: '開発者X', url: 'https://x.com/Ttton_nottY', enabled: true, icon: 'x' },
    { id: 'note', label: 'note', url: '', enabled: false, icon: 'note' },
    { id: 'github', label: 'GitHub', url: '', enabled: false, icon: 'github' },
    // { id: 'site', label: '開発者サイト', url: '', enabled: false },
]

// 開発者連絡先メール（スパムbot対策のため、ソースに完全なアドレスを残さない）。
// user と domain を分割して保持し、クライアントでマウント後にJSで結合して表示・リンク化する。
// ※ SSR（HTMLソース）にはアドレスが文字列として現れない。
export const CONTACT_EMAIL_USER = 'contact'
export const CONTACT_EMAIL_DOMAIN = 'ttton-notty.com'
// 開発者ページにメールを表示するか
export const SHOW_CONTACT_EMAIL = true

// 共有用SNSボタンを表示するか（フッター。シェアURLは実行時のページURLを使用）
export const ENABLE_SHARE_BUTTONS = true

// シェア投稿文プリセット
// -----------------------------------------------
// X（旧Twitter）でシェアするときの本文テンプレート。
// {url} は実行時のページURLに置換される。
// スマホ版が公開されたら SHARE_MOBILE_URL を設定すると本文に追記される。
// ※Xは文字数制限があるため、タグは絞ってある。
export const SHARE_MOBILE_URL = ''   // スマホ版公開後にURLを設定（空なら本文に出さない）
// 汎用タグ（検索流入用）とブランドタグ（指名・集約用）を分けて、本文では改行で区切る
export const SHARE_HASHTAGS = ['共通テスト', '大学受験', '勉強アプリ', '高校生']
export const SHARE_BRAND_HASHTAGS = ['かたてスト', '1Click共テ対策', 'TtLab', 'ととらぼ']
export function buildShareText(pageUrl: string): string {
    const lines = [
        'かたてスト（1Click共テ対策）',
        '1ClickでAI問題生成→お手軽共テ対策アプリ',
        '',
        '▼Web版',
        pageUrl,
    ]
    if (SHARE_MOBILE_URL) {
        lines.push('▼スマホ版', SHARE_MOBILE_URL)
    }
    lines.push(
        '',
        '開発者 @Ttton_nottY',
        '',
        SHARE_HASHTAGS.map((t) => '#' + t).join(' '),
        SHARE_BRAND_HASHTAGS.map((t) => '#' + t).join(' '),
    )
    return lines.join('\n')
}

// -----------------------------------------------
// 回数制限・予算ガード
// -----------------------------------------------
// 端末ごと（localStorage）の1日あたり新規AI生成の上限回数。
// ストックからの配信はカウントしない（無料・無制限）。
export const DAILY_GEN_LIMIT_PER_DEVICE = 15
// 全体（サーバー側）の1日あたり新規AI生成の上限。コスト暴走・悪意あるアクセスの歯止め。
// 想定：15回 × 100人規模でも収まる範囲。利用状況に応じて調整する。
export const DAILY_GEN_LIMIT_GLOBAL = 2000
// -----------------------------------------------
// 広告（Google AdSense）
// -----------------------------------------------
// AD_MODE で広告の出し方を切り替える。
//   'off'         … 広告を一切出さない（DOMにも出さない）。
//   'placeholder' … グレー枠＋サイズ表示のダミーを出す。レイアウト確認・審査前用。
//   'live'        … 実際の AdSense 広告を配信する（審査通過後）。
// 審査フロー：placeholder でレイアウト確認 → 申請 → 通過後に 'live' へ。
export const AD_MODE: 'off' | 'placeholder' | 'live' = 'live'

// AdSense のパブリッシャーID（ca-pub-XXXXXXXXXXXXXXXX）。通過後に設定。
export const ADSENSE_CLIENT = 'ca-pub-5827479117826832'
// 広告ユニットのスロットID。配置ごとに作成して設定する（通過後）。
// 広告はフッター内（2カラムブロックの下・著作権表記の上）に1か所。
// 設定画面・結果画面はどちらも同じ Footer を使うため、共通の1スロットで配信する。
export const ADSENSE_SLOTS = {
    footerBottom: '4049295913', // フッター内バナー（設定・結果の両画面で共有）
} as const