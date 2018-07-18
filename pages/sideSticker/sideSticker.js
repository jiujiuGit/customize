var app = getApp();
Page({
  data: {
    stickers:[],
    currentTap:''
  },
  onLoad(query) {
    console.log(query.oritype);
    console.log(query.currentTap);
    this.setData({
      currentTap:query.currentTap
    })
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
        if(res.data.status==0){
          my.showToast({
            type: 'fail',
            content: '服务器繁忙，请稍候再试',
            duration: 2000,
          });
          return;
        }
        that.setData({
          stickers:res.data.list
        })
      },
      fail: function(res) {
        console.log(res)
        // my.alert({content: 'fail'});
      },
      complete: function(res) {
        my.hideLoading();
        // my.hideLoading();
        // my.alert({content: 'complete'});
      }
    });

  },
  imageTap(e){
    let tapIndex = e.target.dataset.index;
    if(this.data.currentTap == 'leftSide'){
      app.globalData.leftStickerId = this.data.stickers[tapIndex].id;
    }else if(this.data.currentTap == 'rightSide'){
      app.globalData.rightStickerId = this.data.stickers[tapIndex].id;
    }
    
     my.navigateBack({
      delta: 1
    })
  }
});
