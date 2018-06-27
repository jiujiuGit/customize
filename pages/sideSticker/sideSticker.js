var app = getApp();
Page({
  data: {
    stickers:[]
  },
  onLoad(query) {
    console.log(query.oritype);
    const that = this;
    switch(query.oritype){
      case "2":
        my.setNavigationBar({
          title:'添加线条'
        });
        break;
      case "5":
       my.setNavigationBar({
          title:'添加贴纸'
        });
        break;
    }
    my.showLoading({
      content: '加载中...'
    });
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/get_imagebyposition',
      method: 'post',
      data: {
        type: 1,
        position:3,
        oritype:query.oritype
      },
      dataType: 'json',
      success: function(res) {
        my.hideLoading();
        that.setData({
          stickers:res.data.list
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
  imageTap(e){
    let tapIndex = e.target.dataset.index;
    app.globalData.sideStickerId = this.data.stickers[tapIndex].id;
     my.navigateBack({
      delta: 1
    })
  }
});
