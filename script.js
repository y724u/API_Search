
// 検索ボタンがsubmitされたら
$(function () {
  $('.js-form').on('submit', function () {

    // エリア、店舗名、個室があるか、valを取得する
    const $targetArea = $('.js-area').val();
    const $targetStore = $('.js-store').val();

    // 個室ありにチェックがされているかprivate_room=1 は絞り込みあり、0はなし
    const $checkedBox = $('.js-pvRoom').filter(':checked');

    // Ajax通信を開始
    const API_KEY = '';
    $.ajax({
      url: `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${API_KEY}&address=${$targetArea}&name=${$targetStore}&private_room=${$checkedBox.length}`,
      type: 'GET',
      dataType: 'json',
      // フォーム要素の内容をハッシュ形式に変換
      data: $('form').serializeArray(),
      timeout: 5000,
    })
      .done(function (data) {
        // 通信成功時の処理を記述
        // 検索結果件数
        let $hitCounts = data.total_hit_count;
        // 現在表示しているページを表示
        let $showedPages = $('.result__item').length + 10;
        // (.result__page)を格納
        const $result = $(`<p class='result__page js-result'>1~${$showedPages}件を表示 / 全${$hitCounts}件</p>`)
        if ($('.js-result').length) {
          $('.js-result').replaceWith($result);
        } else {
          $('.result__container').append($result);
          $('.result__container').prepend(`<p class='result__page js-result'>1~${$showedPages}件を表示 / 全${$hitCounts}件</p>`);
        };
        // データ取り出し
        for (let index = 0; index < data.rest.length; index++) {
          let element = data.rest[index];
          // console.log(element);

          // 店名
          let $restName = element.name;
          // console.log($restName);

          // 最寄駅
          let $station = element.access.station;
          // console.log($station);

          // 駅から何分
          let $walk = element.access.walk;
          // console.log($walk);

          // 店舗案内文
          let $pr = element.pr.pr_short;

          // URL
          let $url = element.url;
          // console.log($url);

          // 店舗画像
          let $image = element.image_url.shop_image1

          // カテゴリ
          let $category = element.category;
          // console.log($category);

          // 検索結果を表示
          $('.result__list').append(
            `<li class="result__item">
            <div class="result__image">
            <img src="${$image}" alt="店舗イメージ">
            </div>
            <dl class="result__content" id='js'>
            <dt class="result__storeName">
            <a href="${$url}" " target="_blank" rel="noopener noreferrer">${$restName}</a>
            </dt>
            <dd class="result__location">${$station} 徒歩${$walk}分 / ${$category}</dd>
            <dd class="result__description">${$pr}</dd>

            </dl>
            </li>`);
          // <dd class="result__privateRoom">完全個室</dd>
        }

        // if(($checkedBox.length) === 1) {
        //   console.log('ok');
        //   $('.result__description').append('<dd class="result__privateRoom">完全個室</dd>');
        // }else if ($('result__privateRoom').length===0){
        // };
      })
      .fail(function () {
        // 通信失敗時の処理を記述
        console.log('fail');
      });
  })
});
