Page({
  data: {
    www:""
  },
  onReady() {
    this.ctx = my.createCanvasContext('myCanvas');
    //  var img = new Image();
    var that = this;
                // that.ctx.drawImage('http://bbltest.color3.cn/Public/upload/diyset/2016/12-23/585cdead2bd1f.png',0,0,100,120) 

  //  my.downloadFile({  
  //     url: 'http://bbltest.color3.cn/Public/upload/diyset/2016/12-23/585cdead2bd1f.png',  
  //     success: function (res) {  
  //       console.log(res);  
  //       that.ctx = my.createCanvasContext('myCanvas');  
  //       that.ctx.drawImage(res.apFilePath,0,0,100,200)
  //       that.ctx.draw()
  //     },fail:function(res){  
  
  //     }  
  //   })  

    // my.getImageInfo({
    //   // src: 'http://bbltest.color3.cn/Public/upload/diyset/2016/12-23/585cdead2bd1f.png',    //请求的网络图片路径
    //   src:'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
    //   success: function (res) {
    //     console.log(res.path)
    //     my.setStorageSync({
    //       key: 'img1',
    //       data: res.path
    //     });
    //     //请求成功后将会生成一个本地路径即res.path,然后将该路径缓存到storageKeyUrl关键字中
    //     // my.setStorageSync({
    //     //   key: 'img',
    //     //   data: res.path,
    //     // });
    //     var headUrl = my.getStorageSync('img');
    //     that.ctx.drawImage(headUrl.store,0,0,100,200)
    //   }
    // })

  //    console.log(this.ctx)
  //   //  const that = this;

  //  var that = this
  //  var path = 'http://bbltest.color3.cn/Public/upload/diyset/2016/12-23/585cdead2bd1f.png'
  //  my.getImageInfo({
  //    src:path,
  //    success:function(res){
  //      console.log(that.ctx)
  //      console.log(res)
  //       var path = res.path;
  //       that.ctx = my.createCanvasContext('myCanvas')
  //           that.ctx.drawImage('https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',0,0,100,120) 

  //       that.ctx.drawImage(path,0,0,100,200)
  //    }
  //  });



    // img.src="https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg";
    // img.onload = function(){
    //   console.log(that.ctx)
    //   console.log(img.src)
      // that.ctx.draw
      // console.log(1)
      // var a = {ctx:''}
      //   ;
      //  a.ctx = my.createCanvasContext('myCanvas');
      // my.createCanvasContext('myCanvas').drawImage("https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg",0,0,100,120);
    // }  
    // this.ctx.drawImage('http://bbltest.color3.cn/Public/upload/diyset/2016/12-23/585cdead2bd1f.png',0,0,100,120) 

    // this.ctx.drawImage('https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',0,0,100,120) 
    let newArr = []
    for(var i=0;i<30;i++){
      my.downloadFile({
        url: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg', // 下载文件地址
        success: (res) => {
          newArr.push(res.apFilePath)
        },
      });
    }

    setTimeout(function(){
      for(var i=newArr.length-1;i>-1;i--){
        console.log(newArr.length)
        console.log(newArr[i])
        // this.ctx.rotate(30 * Math.PI / 180);
        that.ctx.save();
        that.ctx.translate(i*10, i*10);
        that.ctx.rotate(i*10 * Math.PI / 180);
        that.ctx.setGlobalAlpha(i/10)
        that.ctx.setFillStyle('red');
        that.ctx.fillText('我是'+i, 90, 90)
        that.ctx.drawImage(newArr[i],0,0,100,120) 
        that.ctx.restore();//恢复状态
      }
        that.ctx.setFillStyle('black');
          that.ctx.fillText('我是Jiujiu', 90, 90)
      that.ctx.draw();
      that.ctx.save();
    },1000)
        
  },
  clickMe(){
    let that=this;
   
        that.ctx.toTempFilePath({
          success(res) {
            console.log(res)
            that.setData({
              www:res.apFilePath
            })
            let path = res.apFilePath;
            console.log(path)
            my.uploadFile({
              url: 'http://bbltest.color3.cn/Mobile/Api/diyupload',
              fileType: 'image',
              fileName: 'file',
              filePath: path,
              success: (res) => {
                console.log(JSON.stringify(res))
                my.alert({
                  content: '上传成功'
                });
              },
              fail(res) {
                console.log(JSON.stringify(res))
              },
            });
            
          },
        });
  }
});
