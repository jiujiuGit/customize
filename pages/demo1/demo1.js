var app= getApp();
Page({
  data: {
    imgUrl:''
  },
  onLoad() {
  
  },
  onShow(){
   
    this.setData({
    imgUrl:app.globalData.demo
  })
   console.log('图片路径'+this.data.imgUrl)
  },
  tz(){
    my.navigateTo({url:'../demo/demo'});
  }
});
