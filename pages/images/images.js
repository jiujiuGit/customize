var app = getApp();
Page({
  data: {
    img:'',
    ground:'' //当前编辑面   front 、siede、back
  },
  onLoad(query) {
  
    this.setData({
      ground:query.currentTap 
    })
  },
  addImg(){
    let img ;
    const that = this;
    my.chooseImage({
    count: 1,
    success: (res) => {
      // that.img = res.apFilePaths[0];
      // img.src = res.apFilePaths[0];
      console.log(12)
      console.log(res)
      console.log(res.apFilePaths[0]);


      let imgLength = app.globalData.items.length;
      let item = {  
              id: imgLength+1,   
              top: 100,//初始图片的位置   
              left: 100,  
              x: 155, //初始圆心位置，可再downImg之后又宽高和初始的图片位置得出  
              y: 155,  
              scale: 1,//缩放比例  1为不缩放  
              angle: 0,//旋转角度  
              active: false, //判定点击状态
              opacity:1,//透明度
              rotate:0,
              type:'image',
              ground:this.data.ground    
          }
      item.image = res.apFilePaths[0];
      app.globalData.items.push(item);
      my.navigateBack({
        delta: 1
      })

      const pages = getCurrentPages();
      const prePage = pages[pages.length - 2];
  
      prePage.setData({
        footer:'imgTransparency',
        index:app.globalData.items.length-1
      })

    },
    fail: (res) => {
      console.log(res)
    }
    
  });
  }
});
