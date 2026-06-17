// ===========================
// 科目・単元マスター
// lib/subjects.ts
//
// 単元は高等学校学習指導要領（平成30年告示・現行課程）の
// 「内容のまとまり（大項目）」を基準にしている。
//
// 将来の拡張候補：
//   - 学習指導要領PDFからAIが自動抽出
//   - 外部JSONファイルからの読み込み
//   - DBからの動的取得
// その場合このファイルの中身だけ差し替える
// ===========================

import type { Subject, SubjectGroup } from '@/types/quiz'

export const SUBJECTS: Subject[] = [
    {
        id: 'info1',
        group: 'info',
        label: '情報I',
        enabled: true,
        units: [
            { id: 'info1_01', label: '情報社会の問題解決' },
            { id: 'info1_02', label: 'コミュニケーションと情報デザイン' },
            { id: 'info1_03', label: 'コンピュータとプログラミング' },
            { id: 'info1_04', label: 'アルゴリズムと基本的なプログラム' },
            { id: 'info1_05', label: 'データの活用' },
            { id: 'info1_06', label: 'ネットワークと情報セキュリティ' },
            { id: 'info1_07', label: 'デジタル化と情報の表現' },
        ],
    },

    // ---------------- 数学 ----------------
    // 「数学IA」= 数学I + 数学A
    {
        id: 'math1a',
        group: 'math',
        label: '数学IA',
        // 共通テストが数値入力形式のため初期実装では非表示（将来、数式入力UI実装時に有効化）
        enabled: false,
        units: [
            // 数学I
            { id: 'math1a_01', label: '数と式' },
            { id: 'math1a_02', label: '図形と計量' },
            { id: 'math1a_03', label: '二次関数' },
            { id: 'math1a_04', label: 'データの分析' },
            // 数学A
            { id: 'math1a_05', label: '図形の性質' },
            { id: 'math1a_06', label: '場合の数と確率' },
            { id: 'math1a_07', label: '数学と人間の活動（整数など）' },
        ],
    },
    // 「数学IIBC」= 数学II + 数学B + 数学C
    //  現行課程ではベクトルが数学Cに移行。共通テスト「数学II,B,C」に合わせて
    //  数学B（数列・統計的な推測）と数学C（ベクトル・平面上の曲線と複素数平面）を含める。
    {
        id: 'math2bc',
        group: 'math',
        label: '数学IIBC',
        // 共通テストが数値入力形式のため初期実装では非表示（将来、数式入力UI実装時に有効化）
        enabled: false,
        units: [
            // 数学II
            { id: 'math2bc_01', label: 'いろいろな式' },
            { id: 'math2bc_02', label: '図形と方程式' },
            { id: 'math2bc_03', label: '指数関数・対数関数' },
            { id: 'math2bc_04', label: '三角関数' },
            { id: 'math2bc_05', label: '微分・積分の考え' },
            // 数学B
            { id: 'math2bc_06', label: '数列' },
            { id: 'math2bc_07', label: '統計的な推測' },
            // 数学C
            { id: 'math2bc_08', label: 'ベクトル' },
            { id: 'math2bc_09', label: '平面上の曲線と複素数平面' },
        ],
    },

    // ---------------- 物理 ----------------
    {
        id: 'phys_base',
        group: 'science_base',
        label: '物理基礎',
        enabled: true,
        units: [
            { id: 'phys_base_01', label: '物体の運動とエネルギー' },
            { id: 'phys_base_02', label: '様々な物理現象とエネルギーの利用' },
        ],
    },
    {
        id: 'phys',
        group: 'science',
        label: '物理',
        enabled: false,
        units: [
            { id: 'phys_01', label: '様々な運動' },
            { id: 'phys_02', label: '波' },
            { id: 'phys_03', label: '電気と磁気' },
            { id: 'phys_04', label: '原子' },
        ],
    },

    // ---------------- 化学 ----------------
    {
        id: 'chem_base',
        group: 'science_base',
        label: '化学基礎',
        enabled: true,
        units: [
            { id: 'chem_base_01', label: '化学と人間生活' },
            { id: 'chem_base_02', label: '物質の構成' },
            { id: 'chem_base_03', label: '物質の変化とその利用' },
        ],
    },
    {
        id: 'chem',
        group: 'science',
        label: '化学',
        enabled: false,
        units: [
            { id: 'chem_01', label: '物質の状態と平衡' },
            { id: 'chem_02', label: '物質の変化と平衡' },
            { id: 'chem_03', label: '無機物質の性質' },
            { id: 'chem_04', label: '有機化合物の性質' },
            { id: 'chem_05', label: '高分子化合物' },
        ],
    },

    // ---------------- 生物 ----------------
    {
        id: 'bio_base',
        group: 'science_base',
        label: '生物基礎',
        enabled: true,
        units: [
            { id: 'bio_base_01', label: '生物の特徴' },
            { id: 'bio_base_02', label: '遺伝子とその働き' },
            { id: 'bio_base_03', label: 'ヒトの体の調節' },
            { id: 'bio_base_04', label: '生物の多様性と生態系' },
        ],
    },
    {
        id: 'bio',
        group: 'science',
        label: '生物',
        enabled: false,
        units: [
            { id: 'bio_01', label: '生物の進化' },
            { id: 'bio_02', label: '生命現象と物質' },
            { id: 'bio_03', label: '遺伝情報の発現と発生' },
            { id: 'bio_04', label: '生物の環境応答' },
            { id: 'bio_05', label: '生態と環境' },
        ],
    },

    // ---------------- 地学 ----------------
    {
        id: 'earth_base',
        group: 'science_base',
        label: '地学基礎',
        enabled: true,
        units: [
            { id: 'earth_base_01', label: '地球のすがた' },
            { id: 'earth_base_02', label: '変動する地球' },
        ],
    },
    {
        id: 'earth',
        group: 'science',
        label: '地学',
        enabled: false,
        units: [
            { id: 'earth_01', label: '地球の概観' },
            { id: 'earth_02', label: '地球の活動と歴史' },
            { id: 'earth_03', label: '地球の大気と海洋' },
            { id: 'earth_04', label: '宇宙の構造' },
        ],
    },
]

export const DEFAULT_SUBJECT_ID = 'info1'

/**
 * 科目グループの表示順。
 * 設定画面はこの順（数学 → 理科基礎 → 理科 → 情報）でチップを改行表示する。
 * 理科は「基礎4つ」と「基礎なし4つ」で行を分ける。グループ名は画面に出さない。
 */
export const SUBJECT_GROUPS: { key: SubjectGroup }[] = [
    { key: 'math' },
    { key: 'science_base' },
    { key: 'science' },
    { key: 'info' },
]