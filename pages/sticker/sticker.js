var app = getApp();
Page({
  data: {
    stickers:[
      // {
      //   "id":"405",
      //   "picname":"旗头",
      //   "usetype":"0",
      //   "orderby":"0",
      //   "type":"1",
      //   "pic":"http://bbltest.color3.cn/Public/upload/diyset/2016/12-20/5858d5ed6f5bd.png",
      //   "oritype":"5",
      //   "picw":"400",
      //   "pich":"400",
      // }
    ],
    // stickers:[
    //   {
    //   imgUrl:'../../assets/images/t1.jpg',
    //   mode: 'widthFix',
    //   },
    //   {
    //   imgUrl:'../../assets/images/t5.jpg',
    //   mode: 'widthFix',
    //   },
    //   {
    //   imgUrl:'../../assets/images/t5.jpg',
    //   mode: 'widthFix',
    //   },
    //   {
    //   imgUrl:'../../assets/images/t2.jpg',
    //   mode: 'widthFix',
    //   },
    //   {
    //   imgUrl:'../../assets/images/t3.jpg',
    //   mode: 'widthFix',
    //   },
    //   {
    //   imgUrl:'../../assets/images/t4.jpg',
    //   mode: 'widthFix',
    //   },
    //   {
    //   imgUrl:'../../assets/images/t1.jpg',
    //   mode: 'widthFix',
    //   },
    //   {
    //   imgUrl:'../../assets/images/t5.jpg',
    //   mode: 'widthFix',
    //   },
    //   {
    //   imgUrl:'../../assets/images/t5.jpg',
    //   mode: 'widthFix',
    //   },
    //   {
    //   imgUrl:'../../assets/images/t2.jpg',
    //   mode: 'widthFix',
    //   },
    //   {
    //   imgUrl:'../../assets/images/t3.jpg',
    //   mode: 'widthFix',
    //   },
    //   {
    //   imgUrl:'../../assets/images/t4.jpg',
    //   mode: 'widthFix',
    //   },
      
    // ],
    ground:'', //当前编辑面   front 、siede、back
    stickIndex:'' //
  },
  onLoad(query) {
    // console.log(query.currentTap);
    // console.log(query.oritype);
    // console.log(typeof(query.oritype))
    switch(query.oritype){
      case "2":
        my.setNavigationBar({
          title:'添加线条'
        });
        break;
      case "3":
         my.setNavigationBar({
          title:'添加形状'
        });
        break;
      case "5":
       my.setNavigationBar({
          title:'添加贴纸'
        });
        break;
      case "6":
        my.setNavigationBar({
          title:'添加边框'
        });
        break;
    }
    const that = this;
    this.setData({
      ground:query.currentTap 
    });
    my.showLoading({
      content: '加载中...'
    });
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/get_diy_image',
      method: 'post',
      data: {
        type: 1,
        oritype:query.oritype

        // from: '支付宝',
        // production: 'AlipayJSAPI',
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
  imageTap(e) {
    // console.log( e.target.dataset.index);
    let tapIndex = e.target.dataset.index;
    let imgLength = app.globalData.items.length;

    const item = {  
            // id: imgLength+1,   
            top: 100,//初始图片的位置   
            left: 100,  
            x: 155, //初始圆心位置，可再downImg之后又宽高和初始的图片位置得出  
            y: 155,  
            scale: 1,//缩放比例  1为不缩放  
            angle: 0,//旋转角度  
            active: false, //判定点击状态
            opacity:100,//透明度
            rotate:0,
            type:'image',
            ground:this.data.ground,
            zindex:imgLength+1  
        }
    item.image = this.data.stickers[tapIndex].pic
    if(this.data.ground == 'front'){  //添加到front编辑列表
      const frontLength = app.globalData.frontItems.length
      item.id = frontLength+1;
      app.globalData.frontItems.push(item)
      app.globalData.stickerIndex = app.globalData.frontItems.length-1
    }else if(this.data.ground == 'back'){ //添加到back编辑列表
    const backLength = app.globalData.backItems.length
      item.id = backLength+1;
      app.globalData.backItems.push(item)
      app.globalData.stickerIndex = app.globalData.backItems.length-1
    }


    // app.globalData.items.push(item);
    my.navigateBack({
      delta: 1
    })
    console.log(item.id)
    this.setData({
      stickerIndex : item.id
    })
    app.globalData.footer = 'imgTransparency'

  
  },
});
