var app = getApp();
Page({
  data: {
    stickers:[
      {
      imgUrl:'../../assets/images/t1.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t5.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t5.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t2.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t3.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t4.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t1.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t5.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t5.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t2.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t3.jpg',
      mode: 'widthFix',
      },
      {
      imgUrl:'../../assets/images/t4.jpg',
      mode: 'widthFix',
      },
      
    ]
  },
  onLoad() {},
  imageTap(e) {
    console.log( e.target.dataset.index);
    let tapIndex = e.target.dataset.index;
    let imgLength = app.globalData.items.length;
    const item = {  
            id: imgLength+1,   
            top: 100,//初始图片的位置   
            left: 100,  
            x: 155, //初始圆心位置，可再downImg之后又宽高和初始的图片位置得出  
            y: 155,  
            scale: 1,//缩放比例  1为不缩放  
            angle: 0,//旋转角度  
            active: false, //判定点击状态
            rotate:0,
            type:'image'  
        }
    item.image = this.data.stickers[tapIndex].imgUrl
    app.globalData.items.push(item);
    my.navigateBack({
      delta: 2
    })
  },
});
