Page({
  data: {
    www:""
  },
  onReady() {
    this.ctx = my.createCanvasContext('myCanvas');
    //  var img = new Image();
    var that = this;
                // that.ctx.drawImage('http://bbltest.color3.cn/Public/upload/diyset/2016/12-23/585cdead2bd1f.png',0,0,100,120) 

   my.downloadFile({  
      url: 'http://bbltest.color3.cn/Public/upload/diyset/2016/12-23/585cdead2bd1f.png',  
      success: function (res) {  
        console.log(res);  
        that.ctx = my.createCanvasContext('myCanvas');  
        that.ctx.drawImage(res.apFilePath,0,0,100,200)
        that.ctx.draw()
      },fail:function(res){  
  
      }  
    })  

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

    for(var i=3;i>-1;i--){
        
   
        // ctx.rotate(this.data.itemList[i].angle * Math.PI / 180);
        // this.ctx.save();
        // this.ctx.translate(i*10, i*10);
        // this.ctx.rotate(i*10 * Math.PI / 180);
        // this.ctx.setGlobalAlpha(i/10)
        // this.ctx.setFillStyle('red');
        // this.ctx.fillText('我是'+i, 90, 90)

        // // this.ctx.drawImage('../../assets/images/108.png',0,0,100,120)
        // this.ctx.drawImage('http://bbltest.color3.cn/Public/upload/diyset/2016/12-23/585cdead2bd1f.png',0,0,100,120) 

        // // this.ctx.drawImage('https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',0,0,100,120) 
        // this.ctx.restore();//恢复状态
    }
      this.ctx.setFillStyle('black');
        // this.ctx.fillText('我是Jiujiu', 90, 90)
    // this.ctx.translate(20, 20);
        // this.ctx.rotate(i*10 * Math.PI / 180);
        
        // this.ctx.drawImage('http://bbltest.color3.cn/Public/upload/diyset/2016/12-23/585cdead2bd1f.png',0,0,100,120) 

        // this.ctx.drawImage('https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',0,0,100,120) 
 
    this.ctx.draw();
    this.ctx.save();
        
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
