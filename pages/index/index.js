var app = getApp();
Page({
  data: {
    windowActive:false,
    windowPosition:{
      before:0,
      after:0
    },
    www:'',
    bgList:{},
    sideStickerId:app.globalData.sideStickerId,//侧面贴纸或线条id
    prodId:'',//款式id
    picname:'',//商品名称
    fabricId:'',//面料id
    sidePicId:'',
    headerSeen:true,

    //可编辑图片列表
    itemList: [],
    frontItemList:[], //正面编辑列表
    backItemList:[],//背面编辑列表
    // frontEditArea:{}, //正面编辑框属性
    // backEditArea:{}, //侧面编辑框属性
    index:0,
  

    footer:'list',
    systemInfo: {}, //窗口信息

    currentTap:'front', //当前tap "front"-正面  "side"-侧面   "back"-背面
    colorList:[], //颜色列表

    textEditItem:'font', //当前字体编辑项，“font”-字体，transparency-透明度，color-颜色
    // 字体列表
    fontList:[],
    textContent:'',//文字内容

    zindexSeen:false,
    sliderValue:100,
    sizes:[], //尺寸列表
    saveworkdesk:{} //定制参数
  },
  getSystemInfoPage() {
    my.getSystemInfo({
      success: (res) => {
        
        this.setData({
          systemInfo: res
          
        })
        // console.log(this.data.systemInfo.windowWidth)
      }
    })
  },
  onShow() {
    const that = this;
    // 页面显示
    this.setData({
      backItemList:app.globalData.backItems,
      frontItemList:app.globalData.frontItems,
      index:app.globalData.stickerIndex,
      footer:app.globalData.footer,
      sideStickerId:app.globalData.sideStickerId
    });
    this.getSystemInfoPage();
    console.log(this.data.sideStickerId)
    if(this.data.sideStickerId){  //请求侧面背景图
      my.httpRequest({
        url: 'http://bbltest.color3.cn/Mobile/Api/getImageByDid',
        method: 'post',
        data: {
          did: that.data.sideStickerId, //贴纸或线条id
          tid:that.data.prodId,  //款式id
          // oritype:query.oritype
        },
        dataType: 'json',
        success: function(res) {
          my.hideLoading();
          let bgList = that.data.bgList;
          bgList.pic3 = res.data.data.pic
          console.log(res.data.data.pic)
          that.setData({
            bgList:bgList,
            sidePicId:res.data.id
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
    }

  
  },
  onLoad(query) {

    // console.log(query)
    // console.log(query.prodId);
    this.setData({
      picname:query.picname,
      prodId:query.prodId,
      fabricId:query.fabricId
    })
    const that = this;
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/get_style_bg',
      method: 'post',
      data: {
        id:query.prodId
      },
      dataType: 'json',
      
      success: function(res) {

        let bgList = res.data.data;
      
        // 获取图片宽度、高度
        my.getImageInfo({
          src:res.data.data.pic1,
          success:function(pic){
            bgList.pic1w = pic.width;
            bgList.pic1h = pic.height;
            bgList.contLeft1 = (that.data.systemInfo.windowWidth - pic.width)/2; //定制区域left
            bgList.contTop1 = (that.data.systemInfo.windowHeight - pic.height)/2  //定制区域top
          },
          fail:function(res){
            console.log(res)
          }
        });
         my.getImageInfo({
          src:res.data.data.pic2,
          success:function(pic){
            bgList.pic2w = pic.width;
            bgList.pic2h = pic.height;
             bgList.contLeft2 = (that.data.systemInfo.windowWidth - pic.width)/2; //定制区域left
            bgList.contTop2 = (that.data.systemInfo.windowHeight - pic.height)/2  //定制区域top
          }
        });

        
        that.setData({
          bgList:bgList,
          sizes:res.data.data.sizes
        });
        console.log(that.data.bgList)
        
        
      },
      fail: function(res) {
        // my.alert({content: 'fail'});
      }, 
      complete: function(res) {
        // my.hideLoading();
        // my.alert({content: 'complete'});
      }
    });

    my.httpRequest({
      url:'http://bbltest.color3.cn/Mobile/Api/getColorList',
      method:'POST',
      data:{},
      dataType:'json',
      success:function(res){
        that.setData({
          colorList:res.data.list
        })
        // console.log(JSON.stringify(res))
      },
      fail:function(){

      },
      complete:function(){

      }
    })
  },
  textTap(){
  // console.log(323123)
  },
  // 图片touchStart
  WraptouchStart(e){
    // console.log(this.data.footer)
    if(this.data.footer == 'list'){
      this.setData({
        footer:'transparency'
      })
    }
   
    const curTap = this.data.currentTap;
  
    let items = [];
    if(curTap == 'front'){
       items = this.data.frontItemList;
    }else if(curTap == 'back'){
       items = this.data.backItemList; 
    }

    
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
        
        const curItem = items[this.data.index];
        // console.log(this.data.index)
        items[this.data.index].lx = e.touches[0].clientX;  // 记录点击时的坐标值  
        items[this.data.index].ly = e.touches[0].clientY;  

    
        if(curTap == 'front'){
          this.setData({   //赋值   
            frontItemList: items,
            sliderValue:parseInt(curItem.opacity) 
          })  
        }else if(curTap == 'back'){
          this.setData({   //赋值   
            backItemList: items,
            sliderValue:parseInt(curItem.opacity) 
          })  
        }
        
  },
  WraptouchMove: function (e) {  
    // console.log(this.data.index)
    // let items = this.data.itemList;
    const curTap = this.data.currentTap;
  
    let items = [];
    if(curTap == 'front'){
       items = this.data.frontItemList;
    }else if(curTap == 'back'){
       items = this.data.backItemList; 
    }



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





        if(curTap == 'front'){
          this.setData({   //赋值   
            frontItemList: items
          })  
        }else if(curTap == 'back'){
          this.setData({   //赋值   
            backItemList: items
          })  
        }
      
        // this.setData({//赋值就移动了  
        //     itemList: items  
        // })  
        
  } , 

  // 删除图片
  deleteItem(e){
    // let items = this.data.itemList;
    const curTap = this.data.currentTap;
  
    let items = [];
    if(curTap == 'front'){
       items = this.data.frontItemList;
    }else if(curTap == 'back'){
       items = this.data.backItemList; 
    }
    let index = e.currentTarget.dataset.id;

    for(let i = 0;i<items.length;i++){
      if(index == items[i].id){
          items.splice(i,1)
      }
    }

    // for(let i = 0;i<app.globalData.items.length;i++){
    //   if(index == app.globalData.items[i].id){
    //       app.globalData.items.splice(i,1)
    //   }
    // }
    if(curTap == 'front'){
          this.setData({   //赋值   
            frontItemList: items
          })  
        }else if(curTap == 'back'){
          this.setData({   //赋值   
            backItemList: items
          })  
    }
    
    // console.log(app.globalData.frontItems)

    // this.setData({
    //   itemList:app.globalData.items
    // });
    
  },

// 触摸开始事件  items是this.data.itemList的全局变量，便于赋值  所有的值都应给到对应的对象里  
  touchStart: function (e) {  
       //找到点击的那个图片对象，并记录  
        // let items = this.data.itemList;
        const curTap = this.data.currentTap;
  
        let items = [];
        if(curTap == 'front'){
          items = this.data.frontItemList;
        }else if(curTap == 'back'){
          items = this.data.backItemList; 
        }
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
        // let items = this.data.itemList;
        const curTap = this.data.currentTap;
  
        let items = [];
        if(curTap == 'front'){
          items = this.data.frontItemList;
        }else if(curTap == 'back'){
          items = this.data.backItemList; 
        }
        const index = this.data.index; 
        items[index]._tx = e.touches[0].clientX;  
        items[index]._ty = e.touches[0].clientY;  
        //移动的点到圆心的距离  
      
        items[index].disPtoO = this.getDistancs(items[index].x, items[index].y, items[index]._tx - this.data.systemInfo.windowWidth * 0.125, items[index]._ty - 10)  
        console.log(this.data.systemInfo.windowWidth)
        items[index].scale = items[index].disPtoO / items[index].r; //手指滑动的点到圆心的距离与半径的比值作为图片的放大比例  
        console.log(items[index].scale)
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
        if(curTap == 'front'){
          this.setData({   //赋值   
            frontItemList: items
          })  
        }else if(curTap == 'back'){
          this.setData({   //赋值   
            backItemList: items
          })  
        }
        // this.setData({  
        //     itemList: items  
        // }) 
     
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
    // console.log(12312312)
  },
  windowToggle:function(e){
    // console.log("tap事件")
  
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
    // console.log("初始位置"+e.touches[0].clientY)
    let windowPosition = this.data.windowPosition;
    windowPosition.after = e.touches[0].clientY;
    windowPosition.before = e.touches[0].clientY
     this.setData({
      windowPosition : windowPosition
     })
  },
  windowTouchMove(e){
    // console.log(2)
    let windowPosition = this.data.windowPosition;
    // console.log("移动到"+e.touches[0].clientY)
    windowPosition.after = e.touches[0].clientY;
    windowPosition.before = this.data.windowPosition.before;
    this.setData({
      windowPosition : windowPosition
     })
    //  console.log(Math.abs(this.data.windowPosition.before - this.data.windowPosition.after))
     if(this.data.windowPosition.before - this.data.windowPosition.after>30){
        this.setData({
          windowActive: true
        });
     }
    //  console.log(this.data.windowPosition.before - this.data.windowPosition.after)
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
   
   const curTap = this.data.currentTap;
    let items = [];
    if(curTap == 'front'){
      items = this.data.frontItemList;
    }else if(curTap == 'back'){
      items = this.data.backItemList; 
    }
    items[this.data.index].active = false;
    if(curTap == 'front'){
      this.setData({ //赋值 
        frontItemList: items
      }) 
    }else if(curTap == 'back'){
      this.setData({ //赋值 
        backItemList: items
      }) 
    }

    // const items = this.data.itemList;
    // items[this.data.index].active = false;
    // this.setData({
    //   itemList:items
    // })
     this.setData({
      index:-1
    })
  },
  imageEdit(){
    const currentTap = this.data.currentTap;
  // console.log(currentTap)
    my.navigateTo({ url: "../images/images?currentTap="+currentTap });
  },
  sticker(e){
    
    app.globalData.footer = 'list'
    const oritype = e.currentTarget.dataset.id
    const currentTap = this.data.currentTap;

    if(currentTap == 'side'){
      my.navigateTo({ url: "../sideSticker/sideSticker?currentTap="+currentTap+"&oritype="+oritype });
    }else{
      my.navigateTo({ url: "../sticker/sticker?currentTap="+currentTap+"&oritype="+oritype });
    }
    
    
  },
  //背景列表
  bgList(e){
    const oritype = 2
    const currentTap = this.data.currentTap;
    my.navigateTo({ url: "../bgList/bgList?currentTap="+currentTap+"&oritype="+oritype });

  },
  // 点击正面
  front(e){
    if(this.data.footer =='text'){
      return; //编辑字体时不允许切换
    }
    
    // // console.log(ctx);
    // ctx.toTempFilePath({
     
    //   success(e) {
    //     // console.log(e)
    //   },
    // });
    this.setData({
      currentTap:'front'
    })
    this.windowHide();
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
            itemList:app.globalData.items
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
    this.windowHide();
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
      currentTap:'side',
      windowActive:true
    })
    // my.confirm({
    //   title: '温馨提示',
    //   content: '是否清空画布',
    //   confirmButtonText: '清空',
    //   cancelButtonText: '取消',
    //   success: (result) => {
    //     if(result.confirm){
    //       for(let i = 0;i<app.globalData.items.length;i++){
    //         if(app.globalData.items[i].ground == 'side'){
    //             app.globalData.items.splice(i,1)
    //         }
    //       }
    //       this.setData({
    //         itemList:app.globalData.items
    //       });
    //     }
    //   }
    // })
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
    // console.log('你选择的字体是：', e.detail.value);
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
    // let imgLength = app.globalData.items.length;
    let item = {  
            // id: imgLength+1,   
            top: 100,//初始图片的位置   
            left: 100,  
            x: 155, //初始圆心位置，可再downImg之后又宽高和初始的图片位置得出  
            y: 155,  
            scale: 1,//缩放比例  1为不缩放  
            angle: 0,//旋转角度  
            active: false, //判定点击状态
            rotate:0,
            opacity:100,//透明度
            type:'text',  //文字  
            ground:this.data.currentTap,
            fontFamily:'SimSun',
            fontSize:12,
            color:'black'
    
        }
        
    item.text = this.data.textContent;

    if(this.data.currentTap == 'front'){
      const frontLength = app.globalData.frontItems.length;
      item.id = frontLength +1;
      app.globalData.frontItems.push(item);
      this.setData({
        frontItemList:app.globalData.frontItems,
        index:frontLength
      });
    }else if(this.data.currentTap == 'back'){
      const backLength = app.globalData.backItems.length;
      item.id = backLength +1;
      app.globalData.backItems.push(item);
      console.log(this.data.backItemList)
      this.setData({
        backItemList:app.globalData.backItems,
        index:backLength
      });
    }

    // app.globalData.items.push(item);
    // this.setData({
    //   index:app.globalData.items
    // });
  
  
  },
  colorChoose(e){  //选择颜色
    // console.log(e.target.dataset.index);
    const colorIndex =  e.target.dataset.index;

    console.log(e.target.dataset.colorname);

    const curTap = this.data.currentTap;
    let items = [];
    if(curTap == 'front'){
      items = this.data.frontItemList;
    }else if(curTap == 'back'){
      items = this.data.backItemList; 
    }
    let index = this.data.index;
    items[index].color = e.target.dataset.colorname





    if(curTap == 'front'){
      this.setData({ //赋值 
        frontItemList: items
      }) 
    }else if(curTap == 'back'){
      this.setData({ //赋值 
        backItemList: items
      }) 
    }






    // let colorList = this.data.colorList;
    // for(let i = 0;i<colorList.length;i++){
    //   if(i == colorIndex){
    //     colorList[i].active = true
    //   }else{
    //     colorList[i].active = false
    //   }
    // }
  
    // this.setData({
    //   colorList:colorList
    // })
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
    // let items = this.data.itemList;
    const curTap = this.data.currentTap;
  
    let items = [];
    if(curTap == 'front'){
       items = this.data.frontItemList;
    }else if(curTap == 'back'){
       items = this.data.backItemList; 
    }
    let index = this.data.index;
    // console.log(index)
    items.splice(index,1)  
    if(curTap == 'front'){
          this.setData({   //赋值   
            frontItemList: items,
          })  
        }else if(curTap == 'back'){
          this.setData({   //赋值   
            backItemList: items,
          })  
    }
    // this.setData({
    //   itemList:app.globalData.items
    // });
  },

  // 头部保存按钮
  saveEdit(){
    const curTap = this.data.currentTap;
    this.setData({
      footer:'list'
    })
    // const items = this.data.itemList;
    let items = [];
    if(curTap == 'front'){
       items = this.data.frontItemList;
    }else if(curTap == 'back'){
       items = this.data.backItemList; 
    }
    // console.log(this.data.index)
    // console.log(JSON.stringify(items))
    items[this.data.index].active = false;
    if(curTap == 'front'){
          this.setData({   //赋值   
            frontItemList: items,
            index:-1
          })  
        }else if(curTap == 'back'){
          this.setData({   //赋值   
            backItemList: items,
            index:-1
            
          })  
    }

    // this.setData({
    //   itemList:items
    // })
    //  this.setData({
    //   index:-1
    // })
  },
   // 透明度设置
  sliderChange(e) {
     const curTap = this.data.currentTap;
     const index = this.data.index ;
     console.log(index)
    //  console.log(e.detail.value)
    if(curTap == 'front'){
      let items = this.data.frontItemList;
      items[index].opacity =  e.detail.value;
      this.setData({
       frontItemList:items
      })
    }else if(curTap == 'back'){
      let items = this.data.backItemList;
      items[index].opacity =  e.detail.value;
      this.setData({
       backItemList:items
      })
    }
    //  app.globalData.items[index].opacity =  e.detail.value;
    
    //  this.setData({
    //    itemList:app.globalData.items
    //  })
  },
  //  开始定制
  customize(){

  




    let that = this;
    that.ctx = my.createCanvasContext('canvasFront');
    let frontItemList = that.data.frontItemList;
    let backItemList = that.data.backItemList;
    console.log(JSON.stringify(frontItemList))
    // 先下载贴纸,正反面
     for(let i=frontItemList.length-1;i>-1;i--){  //正面
        if(frontItemList[i].image !=undefined){
          my.downloadFile({
          url: frontItemList[i].image, // 下载文件地址
          success: (res) => {         
            frontItemList[i].downloadFile = res.apFilePath;
          },
          fail(res){
          }
        });
        }
     }

     for(let i=backItemList.length-1;i>-1;i--){ //背面
        if(backItemList[i].image !=undefined){
          my.downloadFile({
          url: backItemList[i].image, // 下载文件地址
          success: (res) => {         
            backItemList[i].downloadFile = res.apFilePath;
          },
          fail(res){
          }
        });
        }
     }


    setTimeout(function(){

      that.canvasDraw('front');
      that.canvasDraw('back');
      that.canvasRemix('front');
      that.canvasRemix('back');
      // console.log(JSON.stringify(frontItemList))
      // for(let i=frontItemList.length-1;i>-1;i--){
        
      //   const item = frontItemList[i]
      //   // this.ctx.rotate(30 * Math.PI / 180);
      //   that.ctx.save();
      //   const left = item.left - that.data.bgList.left1;
      //   const top = item.top - that.data.bgList.top1;
      //   const wh = item.pich / item.picw  //图片宽高比例
      //   const height = 100*wh*item.scale;  //计算缩放后的图片高度
      //   that.ctx.translate(left,top);
      //   that.ctx.rotate(item.angle * Math.PI / 180);
      //   that.ctx.setGlobalAlpha(item.opacity/100)
       
      //   if(item.downloadFile){  //绘制图片
      //     that.ctx.drawImage(item.downloadFile,0,0,100*item.scale,height) 
      //   }else if(item.text){    //绘制文字
      //     that.ctx.setFillStyle('red');
      //     that.ctx.setFontSize(12*item.scale);
      //     that.ctx.fillText(item.text, 0, 0)
      //   }

      //   that.ctx.restore();//恢复状态
        
      // }
      
      // that.ctx.draw();
      // that.ctx.save();
    },1000)


    setTimeout(function(){

      that.uploadDrawImg('front');
      that.uploadDrawImg('back');
      that.uploadDrawImg('frontRemix')
      that.uploadDrawImg('backRemix')
      // let ctx1 = my.createCanvasContext('canvasFront');
      // that.ctx.toTempFilePath({
      //     success(res) {
      //       // console.log(res)
      
      //       let path = res.apFilePath;
      //       console.log(path)
      //       // console.log(path)
      //       my.uploadFile({
      //         url: 'http://bbltest.color3.cn/Mobile/Api/workupload',
      //         fileType: 'image',
      //         fileName: 'file',
      //         filePath: path,
      //         success: (res) => {
      //           console.log(JSON.stringify(res))
      //           my.alert({
      //             content: '上传成功'
      //           });
      //         },
      //         fail(res) {
      //           console.log(res)
      //           // console.log(JSON.stringify(res))
      //         },
      //       });
            
      //     },
      // });
    },2000);

    setTimeout(function(){
      that.saveworkdesk();
    },3000)

    
  },

// canvas绘制正反面整体图（不包含背景图）

  canvasDraw(side){

    let that = this;
    let itemList = [];
    let areaLeft ;
    let areaTop ;
    if(side =='front'){
      itemList = that.data.frontItemList;
      that.ctx = my.createCanvasContext('canvasFront');
      areaLeft = that.data.bgList.left1; //定制框left
      areaTop = that.data.bgList.top1; //定制框top
    }else if(side == 'back'){
      itemList = that.data.backItemList;
      that.ctx = my.createCanvasContext('canvasBack');
      areaLeft = that.data.bgList.left2; //定制框left
      areaTop = that.data.bgList.top2; //定制框top
    }
    
    for(let i=itemList.length-1;i>-1;i--){
        console.log(itemList[i])
        const item = itemList[i]
        // this.ctx.rotate(30 * Math.PI / 180);
        that.ctx.save();
        const left = item.left - areaLeft;
        const top = item.top - areaTop;
        const wh = item.pich / item.picw  //图片宽高比例
        const height = 100*wh*item.scale;  //计算缩放后的图片高度
        that.ctx.translate(left,top);
        that.ctx.rotate(item.angle * Math.PI / 180);
        that.ctx.setGlobalAlpha(item.opacity/100)
       
        if(item.downloadFile){  //绘制图片
          that.ctx.drawImage(item.downloadFile,0,0,100*item.scale,height) 
        }else if(item.text){    //绘制文字
          that.ctx.setFillStyle('red');
          that.ctx.setFontSize(12*item.scale);
          that.ctx.fillText(item.text, 0, 0)
        }

        that.ctx.restore();//恢复状态
        
    }
      
      that.ctx.draw();
      that.ctx.save();
  },

  //canvas正反面合成图（包含背景图）
  canvasRemix(side){

    let that = this;
    let itemList = [];
    let areaLeft ;
    let areaTop ;
    if(side =='front'){
      itemList = that.data.frontItemList;
      that.ctx = my.createCanvasContext('frontRemix');
      areaLeft = that.data.bgList.left1; //定制框left
      areaTop = that.data.bgList.top1; //定制框top
      // that.ctx.save();
      let pic1 = ''
      my.downloadFile({
        url: that.data.bgList.pic1, // 下载文件地址
        success: (res) => {
          pic1 = res.apFilePath;
          console.log(pic1)
          console.log(that.data.bgList.pic1w)
          that.ctx.save();
          that.ctx.drawImage(pic1,0,0,that.data.bgList.pic1w,that.data.bgList.pic1h) 
          that.ctx.restore();//恢复状态
        },
      });
      
    }else if(side == 'back'){
      
      itemList = that.data.backItemList;
      that.ctx = my.createCanvasContext('backRemix');
      areaLeft = that.data.bgList.left2; //定制框left
      areaTop = that.data.bgList.top2; //定制框top
      // that.ctx.save();
      let pic2 = ''
       my.downloadFile({
        url: that.data.bgList.pic2, // 下载文件地址
        success: (res) => {
          pic2 = res.apFilePath
        },
      });
      that.ctx.drawImage(pic2,0,0,that.data.bgList.pic2w,that.data.bgList.pic2h) 
      // that.ctx.drawImage(item.downloadFile,0,0,100*item.scale,height) 
      // that.ctx.restore();//恢复状态
    }
    
    for(let i=itemList.length-1;i>-1;i--){
        console.log(itemList[i])
        const item = itemList[i]
        // this.ctx.rotate(30 * Math.PI / 180);
        that.ctx.save();
        const left = item.left - areaLeft;
        const top = item.top - areaTop;
        const wh = item.pich / item.picw  //图片宽高比例
        const height = 100*wh*item.scale;  //计算缩放后的图片高度
        that.ctx.translate(left,top);
        that.ctx.rotate(item.angle * Math.PI / 180);
        that.ctx.setGlobalAlpha(item.opacity/100)
       
        if(item.downloadFile){  //绘制图片
          that.ctx.drawImage(item.downloadFile,0,0,100*item.scale,height) 
        }else if(item.text){    //绘制文字
          that.ctx.setFillStyle('red');
          that.ctx.setFontSize(12*item.scale);
          that.ctx.fillText(item.text, 0, 0)
        }

        that.ctx.restore();//恢复状态
        
    }
      
      that.ctx.draw();
      that.ctx.save();
  },
  //上传定制后的图片
  uploadDrawImg(side){
    const that = this;
    if(side == 'front'){
      that.ctx = my.createCanvasContext('canvasFront');
    }else if(side == 'back'){
      that.ctx = my.createCanvasContext('canvasBack');
    }else if(side == 'frontRemix'){
      that.ctx = my.createCanvasContext('frontRemix');
    }else if(side == 'backRemix'){
      that.ctx = my.createCanvasContext('backRemix');
    }
    that.ctx.toTempFilePath({
          success(res) {
            // console.log(res)
      
            let path = res.apFilePath;
            console.log(path)
            // console.log(path)
            my.uploadFile({
              url: 'http://bbltest.color3.cn/Mobile/Api/workupload',
              fileType: 'image',
              fileName: 'file',
              filePath: path,
              success: (res) => {
                // console.log(JSON.stringify(res.data))
                const resData = JSON.parse(res.data)
                let params = {
                  position_front:'',
                  position_back:'',
                  position_front_remix:'',
                  position_back_remix:''

                };

                if(side == 'front'){
                  params.position_front = resData.data.url
                }else if(side == 'back'){
                   params.position_back = resData.data.url;
                }else if(side == 'frontRemix'){
                  params.position_front_remix = resData.data.url
                  
                }else if(side == 'backRemix'){
                 
                  params.position_back_remix = resData.data.url
                }

                that.setData({
                  saveworkdesk:params
                })
              },
              fail(res) {
                console.log(res)
                // console.log(JSON.stringify(res))
              },
            });
            
          },
      });
  },
  // 提交定制参数
  saveworkdesk(){
    let userInfo;
    const that = this;
      // 获取用户信息
    my.getAuthCode({
      scopes: 'auth_user', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
      success: (res) => {
      
        if (res.authCode) {
          // 认证成功
          // 调用自己的服务端接口，让服务端进行后端的授权认证，并且种session，需要解决跨域问题
          my.httpRequest({
            url: 'http://isv.com/auth', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
            data: {
              authcode: res.authcode
            },
            success: (res) => {
              // 授权成功并且服务器端登录成功
              userInfo = res
               my.httpRequest({
              url:'http://bbltest.color3.cn/Mobile/Api/saveworkdesk',
              dataType:'json',
              method:'POST',
              data:{
                'type_id':that.data.prodId,   //款式id
                'specitem_id':that.data.fabricId,   //材质id
                'position_front_remix':that.data.saveworkdesk.position_front_remix,   //正面合成图片base64编码
                'position_front':that.data.saveworkdesk.position_front,    //正面整体图片
                'position_back_remix':that.data.saveworkdesk.position_back_remix,    //反面合成图片
                'position_back':that.data.saveworkdesk.position_back,     //反面整体图片
                'position_side_id':that.data.bgList.pic3,   //侧面的图片
                'size':that.data.fabricId,  //尺码
                'color':'',   //颜色id
                'group_idf':'',  //正面组件id
                'group_idb':'',  //反面组件id
                'nickname':userInfo.nickName  //支付宝用户昵称
              },
              success:function(){
                
              },
              fail:function(){

              },
              complete:function(){
                
              }
            })



            },
            fail: () => {
              // 根据自己的业务场景来进行错误处理
            },
          });
        }
      },
    });



    
   
  },
  
  swapItems(arr, index1, index2){
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  },
  // 向上一层
  upZindex(e){
    // console.log( e.target.dataset.id)
    // let items = this.data.itemList;
    const curTap = this.data.currentTap;
    let items = [];
    let index  = this.data.index;
    let curItem = {};
    if(curTap == 'front'){
      items = this.data.frontItemList;
      curItem = this.data.frontItemList[index]
    }else if(curTap == 'back'){
      items = this.data.backItemList; 
      curItem = this.data.backItemList[index]
    }
    // let index  = this.data.index;
    // const curItem = this.data.itemList[index]
    // console.log(index)

    if(index+1 == items.length){
      console.log("已经是最高一层");
      return; //已经是最高一层
    }
    // console.log(index);
    items.splice(index,1);
    items.splice(index+1,0,curItem)
    //  console.log(items)
    index = index+1;
    if(curTap == 'front'){
      this.setData({ //赋值 
        frontItemList: items,
        index:index
      }) 
    }else if(curTap == 'back'){
      this.setData({ //赋值 
        backItemList: items,
        index:index
      }) 
    }

  },
  // 向下一层
  downZindex(){
    
    // let items = this.data.itemList;

    const curTap = this.data.currentTap;
    let items = [];
    let index  = this.data.index;
    let curItem = {};
    if(curTap == 'front'){
      items = this.data.frontItemList;
      curItem = this.data.frontItemList[index]
    }else if(curTap == 'back'){
      items = this.data.backItemList; 
      curItem = this.data.backItemList[index]
    }
   
    
     
    // const curItem = this.data.itemList[index]
    if(index == 0){
      console.log("已经是最后一层");
      return; //已经是最高一层
    }

    // console.log(items[index].zindex)
    items.splice(index,1);
    // console.log(curItem)
    items.splice(index-1,0,curItem)
    // console.log(JSON.stringify(items))

    index = index-1

    if(curTap == 'front'){
      this.setData({ //赋值 
        frontItemList: items,
        index:index
      }) 
    }else if(curTap == 'back'){
      this.setData({ //赋值 
        backItemList: items,
        index:index
      }) 
    }
    
  }
});
