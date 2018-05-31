Page({
  data: {
    www:""
  },
  onReady() {
    this.ctx = my.createCanvasContext('myCanvas');
    for(var i=3;i>-1;i--){
        
   
        // ctx.rotate(this.data.itemList[i].angle * Math.PI / 180);
        this.ctx.save();
        this.ctx.translate(i*10, i*10);
        this.ctx.rotate(i*10 * Math.PI / 180);
        this.ctx.setGlobalAlpha(i/10)
        this.ctx.setFillStyle('red');
        this.ctx.fillText('我是'+i, 90, 90)

        console.log(i)
        // this.ctx.drawImage('http://bbltest.color3.cn/Public/upload/diyset/2016/12-23/585cdead2bd1f.png',0,0,100,120) 

        this.ctx.drawImage('https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',0,0,100,120) 
        this.ctx.restore();//恢复状态
    }
      this.ctx.setFillStyle('black');
        this.ctx.fillText('我是Jiujiu', 90, 90)
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
