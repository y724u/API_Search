
// 検索ボタンがsubmitされたら
$(function () {
  $('.js-form').on('submit', function () {
    // エリア、店舗名、個室があるか、valを取得する
    const $targetArea = $('.js-area').val();
    const $targetStore = $('.js-store').val();
    const $checkedBox = $('.js-pvRoom').filter(':checked');

    // console.log($checkBox);
    // console.log($targetArea);
    // console.log($targetStore);

    // Ajax通信を開始
    let $id = $('#id');
    const API_KEY = '';
    $.ajax({
      url: `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${API_KEY}&address=${$targetArea}&name=${$targetStore}&private_room=1`,
      // private_room=1 は絞り込みあり、０はなし

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

        for (let index = 0; index < data.rest.length; index++) {
          let element = data.rest[index];
          console.log(element);

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
          // console.log($pr);

          // URL
          let $url = element.url;
          // console.log($url);

          // 店舗画像
          let $image = element.image_url.shop_image1;
          // console.log($image);
        }

      })
      .fail(function () {
        // 通信失敗時の処理を記述
        console.log('fail');
      });

      // 条件に当てはまる件数を取得&表示



      // 取得した情報に当てはまる店舗情報（店舗画像、最寄駅から何分か、お店のカテゴリ、店舗紹介文、個室があるか否か）を１０件ずつ表示



      // 表示された情報をクリックされたら店舗ページへ別ウインドウへ飛ばす
  })
});



