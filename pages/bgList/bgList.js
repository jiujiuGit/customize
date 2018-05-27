Page({
  data: {},
  onLoad() {
     my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/get_diy_image',
      method: 'post',
      data: {
        type: 2,
        oritype:2

        // from: '支付宝',
        // production: 'AlipayJSAPI',
      },
      dataType: 'json',
      success: function(res) {
        
        console.log(JSON.stringify(res))
        // my.alert({content: 'success'});
        // console.log(JSON.stringify(res));
        that.setData({
          // stickers:res.data.list
        })
      },
      fail: function(res) {
        console.log(res)
        // my.alert({content: 'fail'});
      },
      complete: function(res) {
        // my.hideLoading();
        // my.alert({content: 'complete'});
      }
    });


  },
});
