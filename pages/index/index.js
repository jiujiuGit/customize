Page({
  data: {
    windowActive:false,
    itemList: [{  
            id: 1,  
            image: '../../assets/images/108.png',//图片地址  
            top: 100,//初始图片的位置   
            left: 100,  
            x: 155, //初始圆心位置，可再downImg之后又宽高和初始的图片位置得出  
            y: 155,  
            scale: 1,//缩放比例  1为不缩放  
            angle: 0,//旋转角度  
            active: false //判定点击状态  
        }, {  
            id: 2,  
            image: '../../assets/images/108.png',  
            top: 50,  
            left: 50,  
            x: 155,  
            y: 155,  
            scale: 1,  
            angle: 0,  
            active: false  
    }],
    footer:'list'  
  
  },
  onLoad() {},
  add(e) {
    console.log(12312312)
  },
  windowToggle:function(e){
   my.navigateTo({ url: '../sticker/sticker' });
    // console.log(21324567)
    this.setData({
      windowActive: !this.data.windowActive
    })
    
  },
  sticker(e){
    console.log(e)
    my.navigateTo({ url: '../sticker/sticker' });
  },
  // 点击正面
  front(e){
    console.log(e)
  },
  // 点击背面
  back(e){

  },
  // 点击侧面
  side(e){
    console.log(12)
  },
  // 点击文字
  textEdit(){
    this.setData({
      footer:'text'
    })
  }
});
