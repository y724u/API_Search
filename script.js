
// 検索ボタンがsubmitされたら
$(function () {
  $('.js-form').on('submit', function () {

    // エリア、店舗名、個室があるか、valを取得する
    const $targetArea = $('.js-area').val();
    const $targetStore = $('.js-store').val();
    const $checkBox = $('.js-pvRoom').filter(':checked');

    // console.log($checkBox);
    // console.log($targetArea);
    // console.log($targetStore);

    // Ajax通信を開始
    $.ajax({
      url: '',
      type: 'GET',
      dataType: 'json',
      // フォーム要素の内容をハッシュ形式に変換
      data: $('form').serializeArray(),
      timeout: 5000,
    })
      .done(function (data) {
        // 通信成功時の処理を記述
        const test = (data.rest);
        console.log(test);
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



