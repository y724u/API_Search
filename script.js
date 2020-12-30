// API_KEY
const API_KEY = '';
// 検索ボタンがsubmitされたら
$(function () {
  $('.js-form').on('submit', function (e) {
     // submit処理停止
    e.preventDefault();
    // 既に検索結果がある場合
    $('.js-item , .js-result').remove();
    // エリア、店舗名、個室があるか、valを取得する
    const storeArea = $('.js-area').val();
    const storeName = $('.js-store').val();
    // 個室ありにチェックがされているか,private_room=1 は絞り込みあり、0はなし
    // チェックが入っていれば１を代入、入っていない場合は０を代入
    const isPrivate = $('.js-pvRoom').prop('checked') ? 1 : 0;
    // Ajax通信を開始
    $.ajax({
      url:'https://api.gnavi.co.jp/RestSearchAPI/v3/',
      type: 'GET',
      dataType: 'json',
      data:{
        keyid : API_KEY ,
        address: storeArea ,
        name : storeName ,
        private_room : isPrivate ,
        hit_per_page : 20 ,
      },
      timeout: 5000,
    })
    // 通信成功時の処理を記述
      .done(function (data) {
        // 検索結果件数
        const hitCounts = data.total_hit_count;
        // 現在表示しているページを表示
        const showedPages = $('.js-item').length + 20;
        // (.result__page)を格納
        const $result = $(`<p class='result__page js-result'>1~${showedPages}件を表示 / 全${hitCounts}件</p>`)
        if ($('.js-result').length) {
          $('.js-result').replaceWith($result);
        } else {
          $('.js-container').append($result);
          // $resultが使えない
          $('.js-container').prepend(`<p class='result__page js-result'>1~${showedPages}件を表示 / 全${hitCounts}件</p>`);
        };
        // データ取り出し
        for (let index = 0; index < data.rest.length; index++) {
          let element = data.rest[index];
          // 店名
          let restName = element.name;
          // 最寄駅
          let station = element.access.station;
          // 駅から何分
          let walk = element.access.walk;
          // 店舗案内文
          let pr = element.pr.pr_long;
          // 個室
          let privateRoom = pr.indexOf('個室');
          // URL
          let url = element.url;
          // 店舗画像
          let image = element.image_url.shop_image1
          // カテゴリ
          let category = element.category;
        //   // 検索結果を表示
          if (privateRoom > -1 || isPrivate === 1) {
            $('.js-list').append(
              `<li class="result__item js-item">
                <div class="result__image">
                  <img src="${image}" alt="店舗イメージ">
                </div>
                <dl class="result__content">
                  <dt class="result__storeName">
                    <a href="${url}" " target="_blank" rel="noopener noreferrer">${restName}</a>
                  </dt>
                  <dd class="result__location">${station} 徒歩${walk}分 / ${category}</dd>
                  <dd class="result__description">${pr}</dd>
                  <dd class="result__privateRoom">完全個室</dd>
                </dl>
              </li>`);
          } else {
            $('.js-list').append(
              `<li class="result__item js-item">
                <div class="result__image">
                  <img src="${image}" alt="店舗イメージ">
                </div>
                <dl class="result__content" id='js'>
                  <dt class="result__storeName">
                    <a href="${url}" " target="_blank" rel="noopener noreferrer">${restName}</a>
                  </dt>
                  <dd class="result__location">${station} 徒歩${walk}分 / ${category}</dd>
                  <dd class="result__description js-description">${pr}</dd>
                </dl>
              </li>`);
          }
        }

        // 店舗紹介文...で表示する(.js-description)
        $(function() {
          $('.js-description , .result__description').each(function() {
            let $targetArticles = $(this);
            // オリジナルの文章を取得する
            let html = $targetArticles.html();
            // 対象の要素を、高さにautoを指定し非表示で複製する
            let $clone = $targetArticles.clone();
            $clone
              .css({
                display: 'none',
                position : 'absolute',
                overflow : 'visible'
              })
              .width($targetArticles.width())
              .height('auto');
            // DOMを一旦追加
            $targetArticles.after($clone);
            // 指定した高さになるまで、1文字ずつ消去していく
            while((html.length > 0) && ($clone.height() > $targetArticles.height())) {
              html = html.substr(0, html.length - 1);
              $clone.html(html + '...');
            }
            // 文章を入れ替えて、複製した要素を削除する
            $targetArticles.html($clone.html());
            $clone.remove();
          });
        });
      })

      .fail(function () {
        // 通信失敗時の処理を記述
        console.log('fail');
      });
  })
});
