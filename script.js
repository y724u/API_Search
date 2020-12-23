
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
        const mainBlock = document.getElementById('id');

        for (let index = 0; index < data.rest.length; index++) {
          let element = data.rest[index];
          // console.log(element);

          // 店名
          let $restName = element.name;
          // console.log($restName);
          // $('#id').after(`<dt class="result__storeName"><a href="#">${$restName}</a></dt>`);
        //   let node = document.createElement('div');
        //   node.innerHTML = element.name;
        //   console.log(node);


        //   let img = document.createElement('img');
        //   img.src = element.image_url.shop_image1;
        //   console.log(img);
        //   let anker = document.createElement('a');
        //   anker.href = element.url;
        //   anker.innerHTML = element.url;
        //   console.log(anker);
        //   node.appendChild(img);
        // node.appendChild(anker);
        // mainBlock.appendChild(node);

          // 最寄駅
          let $station = element.access.station;
          // console.log($station);

          // 駅から何分
          let $walk = element.access.walk;
          // console.log($walk);

          // $('.result__storeName').after(`<dd class="result__location">${$walk}</dd>`);


          // 店舗案内文
          let $pr = element.pr.pr_short;

          // URL
          let $url = element.url;
          // console.log($url);

          // 店舗画像
          let $image = element.image_url.shop_image1

          const $div = $('<div>', { id:'hoge', class:'fuga', text:'piyo' });

          const $img = $("<img>", {src: $image, alt:'店舗イメージ'});

          // テストIDの後ろに配置
          $('#id').append($img);

          // imgをidで囲う
          $($img).wrap($div);

          // カテゴリ
          let $category = element.category;
          console.log($category);

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


// let node = document.createElement('div');
// node.innerHTML = element.name;
// console.log(node);
// $('.result__storeName').after(node);

