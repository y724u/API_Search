
// 検索ボタンがクリックされたら

// エリア、店舗名、個室あるのvalを取得する

// 条件に当てはまる件数を取得&表示

// 取得した情報に当てはまる店舗情報（店舗画像、最寄駅から何分か、お店のカテゴリ、店舗紹介文、個室があるか否か）を１０件ずつ表示

// 表示された情報をクリックされたら店舗ページへ別ウインドウへ飛ばす

$(function () {

  $('.js-search').on('click', function () {
    console.log('click!!')
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
        console.log('done');
      })
      .fail(function () {
        // 通信失敗時の処理を記述
        console.log('fail');
      });
  })
});
  // // API
  // const api_key = ''; //アクセスキー
	// const hit_per_page_num = 10; //一度に表示する件数
  // const offset_page_num = 1; //初期ページ

  // // API URL
  // var url_rest = 'https://api.gnavi.co.jp/RestSearchAPI/v3/'; //レストラン検索API
	// var url_pref = 'https://api.gnavi.co.jp/master/AreaSearchAPI/v3/'; //エリアマスタ取得API

  // //API 基本パラメータ
	// var params = {
	// 	keyid: api_key,
	// 	format: 'json'
	// };


