# ふたりの九州旅

2026年9月13〜17日、熊本・阿蘇・宮崎のスマートフォン向け旅のしおり。

公開URL: https://r79128686.github.io/kyushu-shiori-2026/

- 移動カードごとに出発 A・到着 B の地図を表示。飛行機・バス・車・徒歩を色とアイコンで区別。
- 熊本初日は空港からホテルへ行って荷物を預け、観光後に同じホテルへ戻る。
- グルメ24候補・観光18スポット。エリアとカテゴリで絞り込み、実写真・メニュー・価格・店舗リンクで比較。
- 13・14日の昼食と夕食は写真の横スクロールから変更でき、選択先の移動地図と共有URLに反映。
- 飛行機の時刻・座席、なんぷう号の座席と決済額、シーガイアの部屋・食事・夕食予約を掲載。
- 予約番号、航空券番号、個人名、個人の連絡先、認証付き乗車券URLは公開しない。

## 情報の扱い

予約済みと移動・食事の提案を分けて表示。○は提案時刻。地図の点線は地点間の位置関係で、道路や飛行経路そのものではない。詳細なバス乗り場はページ内の目印図で案内。

価格は確認できた公式・店舗掲載額を優先し、参考掲載額や予算目安にはその旨を表示。菊南温泉の宿泊条件は共有情報に基づき、メール未確認の部屋・金額は断定しない。

## Source layout

Sites source uses dist/ as its public directory. GitHub Pages places those files at the repository root. Static HTML/CSS/JavaScript; no build dependencies. Leaflet is vendored locally and map tiles are from OpenStreetMap with attribution.

Main files: app.js (UI and choices), itinerary.js (itinerary and booking notes), movement.js (maps), catalog.js and extra-catalog.js (recommendations), movement.css (transport and discovery styles).

## Verification

Checked all five days and six regional views, every eligible meal selection, hotel-first ordering, map endpoints, reservation times/seats, lunch/dinner-specific menus, local photos and public-data exclusions. Photo sources: [PHOTO_SOURCES.md](PHOTO_SOURCES.md).
