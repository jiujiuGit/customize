var app = getApp();
Page({
  data: {
    windowActive:false,
    windowPosition:{
      before:0,
      after:0
    },
    bgList:[],
    headerSeen:true,

    //可编辑图片列表
    itemList: [],
    index:0,
  

    footer:'list',
    systemInfo: {}, //窗口信息

    currentTap:'front', //当前tap "front"-正面  "side"-侧面   "back"-背面
    colorList:[
      {
        colorCode:'#000000'
      },
      {
        colorCode:'#FFFFFF'
      },
      {
        colorCode:'#8B8B8B'
      },
      {
        colorCode:'#E82D18'
      },
      {
        colorCode:'#E84117'
      },
      {
        colorCode:'#F2811B'
      },
      {
        colorCode:'#EEB20E'
      },
      {
        colorCode:'#B9D21F'
      },
      {
        colorCode:'#B9D21F'
      },
      {
        colorCode:'#B9D21F'
      },
      {
        colorCode:'#B9D21F'
      },
    ], //颜色列表

    textEditItem:'font', //当前字体编辑项，“font”-字体，transparency-透明度，color-颜色
    // 字体列表
    fontList:[
      {
        name:'SimSun',
        value:'宋体',
        checked: true
      },
      {
        name:'KaiTi',
        value:'楷体'
      },
      {
        name:'Microsoft Yahei',
        value:'微软雅黑'
      },
      {
        name:'YouYuan',
        value:'幼圆'
      },
    ],
    textContent:'',//文字内容

    zindexSeen:false,
    sliderValue:100
  
  },
  getSystemInfoPage() {
    my.getSystemInfo({
      success: (res) => {
        
        this.setData({
          systemInfo: res
          
        })
        console.log(this.data.systemInfo.windowWidth)
      }
    })
  },
  onShow() {
    // 页面显示
    this.setData({
      itemList:app.globalData.items
    });
    this.getSystemInfoPage();
    const pages = getCurrentPages();
  
    const curPage = pages[pages.length - 1];
    if(curPage == undefined){
      return;
    }
   console.log(curPage.data.stickerIndex)
    if(curPage.data.stickerIndex!=undefined){
      console.log(1)
      this.setData({
        footer:'imgTransparency',
        headerSeen:true,
        index:curPage.data.stickerIndex,
        sliderValue:100
      })
    }
    console.log(this.data.headerSeen)

  
  },
  onLoad(query) {

    console.log(query)
    console.log(query.prodId);
    const that = this;
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/get_style_bg',
      method: 'post',
      data: {
        id:query.prodId
        // from: '支付宝',
        // production: 'AlipayJSAPI',
      },
      dataType: 'json',
      success: function(res) {
        // my.alert({content: 'success'});
        console.log(JSON.stringify(res));
        that.setData({
          bgList:res.data.data
        })
      },
      fail: function(res) {
        // my.alert({content: 'fail'});
      },
      complete: function(res) {
        // my.hideLoading();
        // my.alert({content: 'complete'});
      }
    });

    // this.setData({
    //   itemList:app.globalData.items
    // })
   
    // console.log(JSON.stringify(getApp().data.items ) );
    //  this.setData({
    //   items : this.data.itemLits
    //  })
  },
  textTap(){
  console.log(323123)
  },
  // 图片touchStart
  WraptouchStart(e){
    console.log(this.data.footer)
    if(this.data.footer == 'list'){
      this.setData({
        footer:'transparency'
      })
    }
    
    let items = this.data.itemList;
    
     for (let i = 0; i < items.length; i++) {  //旋转数据找到点击的  
            items[i].active = false;  
            if (e.currentTarget.dataset.id == items[i].id) {  
                this.setData({
                  index:i
                })
                // index = i;   //记录下标  
                items[this.data.index].active = true;  //开启点击属性  
            }  
        }  
        console.log(this.data.index);
        const curItem = items[this.data.index];
        console.log(curItem.opacity )
        items[this.data.index].lx = e.touches[0].clientX;  // 记录点击时的坐标值  
        items[this.data.index].ly = e.touches[0].clientY;  
        this.setData({   //赋值   
            itemList: items,
            sliderValue:parseInt(curItem.opacity) 
        })  
  },
  WraptouchMove: function (e) {  
    console.log(this.data.index)
    let items = this.data.itemList;
    let index = this.data.index;
        //移动时的坐标值也写图片的属性里  
        items[index]._lx = e.touches[0].clientX;  
        items[index]._ly = e.touches[0].clientY;  
          
        //追加改动值  
        items[index].left  += items[index]._lx - items[index].lx;  // x方向  
        items[index].top += items[index]._ly - items[index].ly;    // y方向  
        items[index].x +=  items[index]._lx - items[index].lx;  
        items[index].y += items[index]._ly - items[index].ly;  
          
        //把新的值赋给老的值  
        items[index].lx = e.touches[0].clientX;    
        items[index].ly = e.touches[0].clientY;  
      
        this.setData({//赋值就移动了  
            itemList: items  
        })  
        
  } , 

  // 删除图片
  deleteItem(e){
    let items = this.data.itemList;
    let index = e.currentTarget.dataset.id;

    for(let i = 0;i<items.length;i++){
      if(index == items[i].id){
          items.splice(i,1)
      }
    }

    for(let i = 0;i<app.globalData.items.length;i++){
      if(index == app.globalData.items[i].id){
          app.globalData.items.splice(i,1)
      }
    }
    

    this.setData({
      itemList:app.globalData.items
    });
    
  },

// 触摸开始事件  items是this.data.itemList的全局变量，便于赋值  所有的值都应给到对应的对象里  
  touchStart: function (e) {  
       //找到点击的那个图片对象，并记录  
        let items = this.data.itemList;
        for (let i = 0; i < items.length; i++) {  
            items[i].active = false;  
  
            if (e.currentTarget.dataset.id == items[i].id) {  
                this.setData({
                  index:i
                }) 
             
                items[this.data.index].active = true;  
            }  
        }  
         //获取作为移动前角度的坐标  
        items[this.data.index].tx = e.touches[0].clientX;  
        items[this.data.index].ty = e.touches[0].clientY;  
        //移动前的角度
       const index = this.data.index;
        items[this.data.index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)  
  
        //获取图片半径  
        items[this.data.index].r = this.getDistancs(items[index].x, items[index].y, items[index].left, items[index].top)  
    },  
    // 触摸移动事件    
  touchMove: function (e) {  
        //记录移动后的位置 
        let items = this.data.itemList;
        const index = this.data.index; 
        items[index]._tx = e.touches[0].clientX;  
        items[index]._ty = e.touches[0].clientY;  
        //移动的点到圆心的距离  
      
        items[index].disPtoO = this.getDistancs(items[index].x, items[index].y, items[index]._tx - this.data.systemInfo.windowWidth * 0.125, items[index]._ty - 10)  
  
        items[index].scale = items[index].disPtoO / items[index].r; //手指滑动的点到圆心的距离与半径的比值作为图片的放大比例  
        items[index].oScale = 1 / items[index].scale;//图片放大响应的右下角按钮同比缩小  
  
        //移动后位置的角度  
        items[index].angleNext = this.countDeg(items[index].x, items[index].y, items[index]._tx, items[index]._ty)  
        //角度差  
        items[index].new_rotate = items[index].angleNext - items[index].anglePre;  
       
        //叠加的角度差  
        items[index].rotate += items[index].new_rotate;  
        
        items[index].angle = items[index].rotate; //赋值  
        
        //用过移动后的坐标赋值为移动前坐标  
        items[index].tx = e.touches[0].clientX;  
        items[index].ty = e.touches[0].clientY;  
        items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)  
      
        //赋值setData渲染  
        this.setData({  
            itemList: items  
        }) 
     
  },
  countDeg: function (cx, cy, pointer_x, pointer_y) {  
        var ox = pointer_x - cx;  
        var oy = pointer_y - cy;  
        var to = Math.abs(ox / oy);  
        var angle = Math.atan(to) / (2 * Math.PI) * 360;//鼠标相对于旋转中心的角度  
        // console.log("ox.oy:", ox, oy)  
        if (ox < 0 && oy < 0)//相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系    
        {  
            angle = -angle;  
        } else if (ox <= 0 && oy >= 0)//左下角,3象限    
        {  
            angle = -(180 - angle)  
        } else if (ox > 0 && oy < 0)//右上角，1象限    
        {  
            angle = angle;  
        } else if (ox > 0 && oy > 0)//右下角，2象限    
        {  
            angle = 180 - angle;  
        }  
  
        return angle;  
  },  



//移动的点到圆心的距离 
  getDistancs(cx, cy, pointer_x, pointer_y){

    // let discount  =  Math.sqrt(Math.pow((cx-pointer_x),2) + Math.pow((cy-pointer_y),2))
    // console.log(discount);
    // return discount;

    var ox = pointer_x - cx;  
        var oy = pointer_y - cy;  
        return Math.sqrt(  
            ox * ox + oy * oy  
        );  
  },
  add(e) {
    console.log(12312312)
  },
  windowToggle:function(e){
    console.log("tap事件")
  
    this.setData({
      windowActive: !this.data.windowActive
    });
    let items = this.data.itemList;

    for(let i=0;i<items.length;i++){
      items[i].active = false;
    }
    this.setData({
      itemList:items
    })
    
  },
  windowTouchStart(e){
    //  let windowPosion = {};
    //  let windowPostion = e.touches[0].clientY;
    console.log("初始位置"+e.touches[0].clientY)
    let windowPosition = this.data.windowPosition;
    windowPosition.after = e.touches[0].clientY;
    windowPosition.before = e.touches[0].clientY
     this.setData({
      windowPosition : windowPosition
     })
  },
  windowTouchMove(e){
    console.log(2)
    let windowPosition = this.data.windowPosition;
    console.log("移动到"+e.touches[0].clientY)
    windowPosition.after = e.touches[0].clientY;
    windowPosition.before = this.data.windowPosition.before;
    this.setData({
      windowPosition : windowPosition
     })
     console.log(Math.abs(this.data.windowPosition.before - this.data.windowPosition.after))
     if(this.data.windowPosition.before - this.data.windowPosition.after>30){
        this.setData({
          windowActive: true
        });
     }
     console.log(this.data.windowPosition.before - this.data.windowPosition.after)
     if(this.data.windowPosition.before - this.data.windowPosition.after<-30){
        this.setData({
          windowActive: false
        });
     }
  },
  windowTouchEnd(){

  },
  windowHide(){
    this.setData({
      footer:'list'
    })
    this.setData({
      windowActive: false
    });
   
    const items = this.data.itemList;
    items[this.data.index].active = false;
    this.setData({
      itemList:items
    })
     this.setData({
      index:-1
    })
  },
  imageEdit(){
    const currentTap = this.data.currentTap;
  console.log(currentTap)
    my.navigateTo({ url: "../images/images?currentTap="+currentTap });
  },
  sticker(e){
    const oritype = e.currentTarget.dataset.id
    const currentTap = this.data.currentTap;
    my.navigateTo({ url: "../sticker/sticker?currentTap="+currentTap+"&oritype="+oritype });
    
  },
  // 点击正面
  front(e){
    if(this.data.footer =='text'){
      return; //编辑字体时不允许切换
    }
    const ctx = my.createCanvasContext("mycanvas");
    console.log(ctx);
    ctx.toTempFilePath({
     
      success(e) {
        console.log(e)
      },
    });
    this.setData({
      currentTap:'front'
    })
    let hasFrontItem = false;

    for(let i=0;i<this.data.itemList.length;i++){
      if(this.data.itemList[i].ground == 'front'){
        hasFrontItem = true;
        break;
      }

    }
    if(hasFrontItem == false){
      return;
    }

    my.confirm({
      title: '温馨提示',
      content: '是否清空画布',
      confirmButtonText: '清空',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          for(let i = 0;i<app.globalData.items.length;i++){
            if(app.globalData.items[i].ground == 'front'){
                app.globalData.items.splice(i,1)
            }
          }
          this.setData({
            itemList:[]
          });
        }
        
      },
    });
  },
  // 点击背面
  back(e){
    if(this.data.footer =='text'){
      return; //编辑字体时不允许切换
    }
    this.setData({
      currentTap:'back'
    })

    let hasBackItem = false;

    for(let i=0;i<this.data.itemList.length;i++){
      if(this.data.itemList[i].ground == 'back'){
        hasBackItem = true;
        break;
      }

    }
    if(hasBackItem == false){
      return;
    }
    my.confirm({
      title: '温馨提示',
      content: '是否清空画布',
      confirmButtonText: '清空',
      cancelButtonText: '取消',
      success: (result) => {
      if(result.confirm){
          for(let i = 0;i<app.globalData.items.length;i++){
            if(app.globalData.items[i].ground == 'back'){
                app.globalData.items.splice(i,1)
            }
          }
          this.setData({
            itemList:app.globalData.items
          });
        }
      }
    })
  },
  // 点击侧面
  side(e){
    if(this.data.footer =='text'){
      return; //编辑字体时不允许切换
    }
    this.setData({
      currentTap:'side'
    })
    my.confirm({
      title: '温馨提示',
      content: '是否清空画布',
      confirmButtonText: '清空',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          for(let i = 0;i<app.globalData.items.length;i++){
            if(app.globalData.items[i].ground == 'side'){
                app.globalData.items.splice(i,1)
            }
          }
          this.setData({
            itemList:app.globalData.items
          });
        }
      }
    })
  },
  // 点击文字
  textEdit(){
    this.setData({
      footer:'text'
    })
  },
  // 设置文字字体
  setTextFont(){
    this.setData({
      textEditItem:'font'
    })
  },
  // 点击字体列表
  fontChoose(e){
    console.log('你选择的字体是：', e.detail.value);
    const currentIndex = this.data.index;
    let items = this.data.itemList;
    items[currentIndex].fontFamily = e.detail.value
    this.setData({
      itemList: items
    })
  },
  bindTextInput(e){
    this.setData({
      textContent:e.detail.value
    })
  },
  addText(){
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
            rotate:0,
            opacity:1,//透明度
            type:'text',  //文字  
             ground:this.data.currentTap,
            fontFamily:'SimSun'
        }
        
    item.text = this.data.textContent;
    app.globalData.items.push(item);
    this.setData({
      itemList:app.globalData.items
    });
  
  
  },
  colorChoose(e){  //选择颜色
    console.log(e.target.dataset.index);
    const colorIndex =  e.target.dataset.index
    let colorList = this.data.colorList;
    for(let i = 0;i<colorList.length;i++){
      if(i == colorIndex){
        colorList[i].active = true
      }else{
        colorList[i].active = false
      }
    }
  
    this.setData({
      colorList:colorList
    })
  },

  // 设置透明度
  setTextTransparency(){
    this.setData({
      textEditItem:'transparency'
    })
  },
  //设置字体颜色
  setTextColor(){
    this.setData({
      textEditItem:'color'
    })
  },
 

  
  //头部取消按钮
  cancle(){
    this.setData({
      footer:'list'
    })
    let items = this.data.itemList;
    let index = this.data.index;
    console.log(index)
    items.splice(index,1)
    // for(let i = 0;i<items.length;i++){
    //   items.splice[i]
    //   // if(index == items[i].id){
    //   //     items.splice(i,1)
    //   // }
    // }

    // for(let i = 0;i<app.globalData.items.length;i++){
    //   if(index == app.globalData.items[i].id){
    //       app.globalData.items.splice(i,1)
    //   }
    // }
    

    this.setData({
      itemList:app.globalData.items
    });
  },

  // 头部保存按钮
  saveEdit(){
    this.setData({
      footer:'list'
    })
    const items = this.data.itemList;
    items[this.data.index].active = false;
    this.setData({
      itemList:items
    })
     this.setData({
      index:-1
    })
  },
   // 透明度设置
  sliderChange(e) {
    
     const index = this.data.index ;
     console.log(index)
     app.globalData.items[index].opacity =  e.detail.value/100;
    
     this.setData({
       itemList:app.globalData.items
     })
  },
  //  开始定制
  customize(){
    // console.log(1)
    for(let i=0;i<this.data.itemList.length;i++){
      
      if(this.data.itemList[i].ground == 'front'){
        console.log(1)
        const item = this.data.itemList[i]
        const ctx = my.createCanvasContext('canvasFront');
        ctx.rotate(this.data.itemList[i].angle * Math.PI / 180);
        // console.log(item.width)
        // console.log(item.height)
        ctx.drawImage(item.image,item.left,item.top,100,120)
        // ctx.drawImage(this.data.itemList[i].image, item.left, item.top, item.width, item.height);
        ctx.draw();
        ctx.save();
        ctx.restore();//恢复状态
        ctx.toTempFilePath({
          success(res) {
            console.log(res.apFilePath)
            let path = res.apFilePath.replace('png','')
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
                // my.alert({
                //   content: res.errorMessage || res.error,
                // });
              },
            });
            // my.saveImage({url:res.apFilePath});
            
          },
        });
      }
    }


    
    // ctx.restore();//恢复状态




//     var ctx = my.createCanvasContext('canvasFront');
// // var ctx = canvas.getContext("2d");
// var img = new Image();
// img.src = "https://img.alicdn.com/tfs/TB1GvVMj2BNTKJjy0FdXXcPpVXa-520-280.jpg";
// img.onload = function (){
//     // ctx.save();//保存状态
//     // ctx.translate(200,200);//设置画布上的(0,0)位置，也就是旋转的中心点
//     // ctx.rotate(45*Math.PI/180);
//     ctx.drawImage(img,-img.width/2,-img.height/2);//把图片绘制在旋转的中心点，
//     // ctx.restore();//恢复状态
// }
  },

  swapItems(arr, index1, index2){
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  },
  // 向上一层
  upZindex(e){
    // console.log( e.target.dataset.id)
    let items = this.data.itemList;
    let index  = this.data.index;
    const curItem = this.data.itemList[index]
    console.log(index)

    if(index+1 == items.length){
      console.log("已经是最高一层");
      return; //已经是最高一层
    }
    console.log(index);
    items.splice(index,1);
    items.splice(index+1,0,curItem)
     console.log(items)
    // const index1 = index-1
    // const index2 = items
    // items[index] = items.splice(items, index, items[index - 1])[0];
    // items =  this.swapItems(items, index, index - 1);
    // items.remove(index);
    // item.splice(index+1,0,curItem);
    // items.splice(index,1,items[index]);
    // const curIndex = items[index].zindex;
    // items[index].zindex = items[index+1].zindex; //和下一个交换位置
    // items[index+1].zindex = curIndex;
    // items.splice()
    // console.log(items[index].zindex);
    index = index+1
    this.setData({
      itemList:items,
      index:index
    })
  },
  // 向下一层
  downZindex(){
    
    let items = this.data.itemList;
    let index  = this.data.index;
    const curItem = this.data.itemList[index]
    if(index == 0){
      console.log("已经是最后一层");
      return; //已经是最高一层
    }

    console.log(items[index].zindex)
    items.splice(index,1);
    items.splice(index-1,0,curItem)
    console.log(items)
    // items[index] = items.splice(items, index, items[index + 1])[0];
    // items = swapItems(items, index, index + 1);
    // items.remove(index);
    // item.splice(index+1,0,curItem);
    // const curIndex = items[index].zindex; 
    // items[index].zindex = items[index-1].zindex; //和上一个交换zindex
    // items[index-1].zindex = curIndex
    console.log(items[index].zindex);
    index = index-1
    this.setData({
      itemList:items,
      index:index
    })
  }
});
