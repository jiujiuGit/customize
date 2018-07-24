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
        // console.log(12)
        // console.log(res)
        // console.log(res.apFilePaths[0]);
       

        let imgLength = app.globalData.items.length;
        let item = {  
                // id: imgLength+1,   
                // top: 100,//初始图片的位置   
                // left: 100,  
                x: 155, //初始圆心位置，可再downImg之后又宽高和初始的图片位置得出  
                y: 155,  
                scale: 1,//缩放比例  1为不缩放  
                angle: 0,//旋转角度  
                active: false, //判定点击状态
                opacity:100,//透明度
                rotate:0,
                type:'image',
                ground:this.data.ground    
            }
        item.image = res.apFilePaths[0];

        
        my.showLoading({
          content: '图片上传中，请稍候...',
          // delay: 1000,
        });
        my.uploadFile({
          url: 'http://bbltest.color3.cn/Mobile/Api/diyupload',
          fileType: 'image',
          fileName: 'file',
          filePath: item.image,
          success: (res) => {
            if(res.data.status==0){
              my.showToast({
                type: 'fail',
                content: res.data.error,
                duration: 2000,
              });
              return;
            }
            const resData = JSON.parse(res.data)
            item.image =resData.data.url;
            console.log(item.image)

            // 获取图片宽高
            my.getImageInfo({
              src:item.image,
              success:(res)=>{
                console.log(JSON.stringify(res))
                item.picw = res.width,
                item.pich = res.height,
                my.downloadFile({
                  url: item.image, // 下载文件地址
                  success: (res) => { 
                    const  eidtAreaParams = app.globalData.eidtAreaParams       
                    item.downloadFile = res.apFilePath;
                    if(this.data.ground == 'front'){
                      let frontLength = app.globalData.frontItems.length;
                      item.id = frontLength+1;
                      item.left = eidtAreaParams.left2+(eidtAreaParams.width1 - 100)/2;
                      item.top = eidtAreaParams.top2 + (eidtAreaParams.height1 - 100*(item.pich/item.picw))/2
                      console.log(item.left+"*********"+item.top)
                      app.globalData.frontItems.push(item);
                      app.globalData.stickerIndex = app.globalData.frontItems.length-1
                    }else if(this.data.ground == 'back'){
                      let backLength = app.globalData.backItems.length;
                      item.left = eidtAreaParams.left2+(eidtAreaParams.width2 - 100)/2;
                      item.top = eidtAreaParams.top2 + (eidtAreaParams.height2 - 100*(item.pich/item.picw))/2
                      item.id = backLength+1;
                      app.globalData.backItems.push(item);
                      app.globalData.stickerIndex = app.globalData.backItems.length-1
                    }
                    item.x = item.left + 50;
                    item.y = item.top+(100*(item.pich/item.picw))/2
                    console.log(item)
                    console.log(item.x+"****"+item.y)


                    my.navigateBack({
                      delta: 1
                    })
                    this.setData({
                      stickerIndex : item.id
                    })
                    
                    app.globalData.footer = 'imgTransparency'
                    // console.log(frontItemList)
                  },
                  fail(res){
                  }
                });
              },
              fail:(res)=>{
                console.log(res)
              },

            });

          },
          fail(res) {
            console.log(JSON.stringify(res))
          },
          complete(){
            my.hideLoading();
          }
        });



      },
      fail: (res) => {
        console.log(res)
      }
      
      
    });
  }
});
