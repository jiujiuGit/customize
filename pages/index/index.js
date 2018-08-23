var app = getApp();
Page({
  data: {
    type:app.globalData.type,
    windowActive:false,
    windowPosition:{
      before:0,
      after:0
    },
    www:'',
    bgList:{},
    buttons:[], //可编辑面
    leftStickerId:app.globalData.leftStickerId,//左侧面贴纸或线条id
    leftStickerId:app.globalData.leftStickerId,//右侧面贴纸或线条id
    oriLeftPic:'',//初始左侧背景图
    orirightPic:'',//初始右侧背景图
    prodId:'',//款式id
    picname:'',//商品名称
    fabricId:'',//面料id
    leftSidePicId:'', //左侧图片id
    rightSidePicId:'',//右侧图片id
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

    currentTap:'front', //当前tap "front"-正面   "back"-背面  "leftSide"-左侧  "rightSide"-右侧   
    colorList:[], //颜色列表

    textEditItem:'font', //当前字体编辑项，“font”-字体，transparency-透明度，color-颜色
    // 字体列表
    fontList:[],
    textContent:'',//文字内容

    zindexSeen:false,
    sliderValue:100,
    sizes:[], //尺寸列表
    saveworkdesk:{}, //定制参数
    individualArea:[],//个人定制区域
    personalArea:false, //选择个人定制区域弹框是否可见
    parent_orderid:'',//团体订单id（团体定制下的个人定制）
    imgInitialW:100,//图片初始大小、
    // textInitialW:50,//文字初始大小
    // textInitialW:0,//文字初始大小

    drawList:[],
    uploadList:[]

  },
  getSystemInfoPage() {
    my.getSystemInfo({
      success: (res) => {
        
        this.setData({
          systemInfo: res
          
        })

      }
    })
  },
  onShow() {
    const that = this;
    let backItems = [];
    let frontItems = [];
    
    for(var i=0;i<app.globalData.backItems.length;i++){
      if(!app.globalData.backItems[i].bg){
        backItems.push(app.globalData.backItems[i])
      }
    }
    for(var i=0;i<app.globalData.frontItems.length;i++){
      if(!app.globalData.frontItems[i].bg){
        frontItems.push(app.globalData.frontItems[i])
      }
    }
    // 页面显示
    this.setData({
      backItemList:backItems,
      frontItemList:frontItems,
      index:app.globalData.stickerIndex,
      footer:app.globalData.footer,
      leftStickerId:app.globalData.leftStickerId,
      rightStickerId:app.globalData.rightStickerId,
      sliderValue:100
    });
    
  
    this.getSystemInfoPage();
    
    if(this.data.leftStickerId){  //请求左侧面背景图
      my.httpRequest({
        url: 'http://bbltest.color3.cn/Mobile/Api/getImageByDid',
        method: 'post',
        data: {
          did: that.data.leftStickerId, //贴纸或线条id
          tid:that.data.prodId,  //款式id
          // oritype:query.oritype
        },
        dataType: 'json',
        success: function(res) {
          my.hideLoading();
          if(res.data.status){
            let bgList = that.data.bgList;
            bgList.pic3 = res.data.data.pic;

            that.setData({
              bgList:bgList,
              leftSidePicId:res.data.data.id
            })
          }else{
            my.showToast({
            type: 'fail',
            content: '暂时不提供此组件定制,请重新选择',
            duration: 2000,
          });
          app.globalData.leftStickerId = ''
          }
          

        },
        fail: function(res) {

          // my.alert({content: 'fail'});
        },
        complete: function(res) {
          // my.hideLoading();
          // my.alert({content: 'complete'});
        }
      });
    }
    if(this.data.rightStickerId){  //请求右侧面背景图
      my.httpRequest({
        url: 'http://bbltest.color3.cn/Mobile/Api/getImageByDid',
        method: 'post',
        data: {
          did: that.data.rightStickerId, //贴纸或线条id
          tid:that.data.prodId,  //款式id
          // oritype:query.oritype
        },
        dataType: 'json',
        success: function(res) {
          my.hideLoading();
          if(res.data.status){
            let bgList = that.data.bgList;
            bgList.pic4 = res.data.data.pic1

            that.setData({
              bgList:bgList,
              rightSidePicId:res.data.data.id
            })
          }else{
            my.showToast({
              type: 'fail',
              content: '暂时不提供此组件定制,请重新选择',
              duration: 2000,
            });
            app.globalData.rightStickerId = ''
          }
          

        },
        fail: function(res) {

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
    // const that = this;
    app.globalData.leftStickerId = '';
    app.globalData.rightStickerId = '';
    app.globalData.frontItems = [];
    app.globalData.backItems = [];
    this.setData({
        type:app.globalData.type,
        picname:app.globalData.teamData.picname,
        prodId:app.globalData.teamData.prodId,
        fabricId:app.globalData.teamData.fabricId,
        saveworkdesk:{},//清空定制数据
        leftStickerId:'',//清空左右侧贴纸
        rightStickerId:''
      })
    if(app.globalData.type == 2){  //团体
      this.setData({
        type:app.globalData.type,
        picname:app.globalData.teamData.picname,
        prodId:app.globalData.teamData.prodId,
        fabricId:app.globalData.teamData.fabricId
      })
    } else if(app.globalData.type == 1){ //个人
      this.setData({
        type:app.globalData.type,
        picname:app.globalData.individualData.picname,
        prodId:app.globalData.individualData.prodId,
        fabricId:app.globalData.individualData.fabricId
      })
    }else if(app.globalData.type == 3){ //团体下个人定制
      this.setData({
        type:app.globalData.type,
        picname:app.globalData.teamIndividual.picname,
        prodId:app.globalData.teamIndividual.prodId,
        fabricId:app.globalData.teamIndividual.fabricId,
        parent_orderid:app.globalData.teamIndividual.parent_orderid
      })
    }
    
    const that = this;
    //获取背景图
    
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/get_style_bg',
      method: 'post',
      data: {
        id:this.data.prodId,
        // id:1,//款式id
        parent_orderid:that.data.parent_orderid,//团体订单id
      },
      dataType: 'json',
      
      success: function(res) {
        if(res.data.status == 0){
          my.showToast({
              type: 'fail',
              content: '服务器繁忙，请稍候再试',
              duration: 2000,
          });
          return;
        }
        that.setData({
          bgList:res.data.data
        })
        app.globalData.eidtAreaParams  = {
          width1:parseInt(res.data.data.width),
          width2:parseInt(res.data.data.width1),
          height1:parseInt(res.data.data.height),
          height2:parseInt(res.data.data.height1),
          left1:parseInt(res.data.data.left1),
          top1:parseInt(res.data.data.top1),
          left2:parseInt(res.data.data.left2),
          top2:parseInt(res.data.data.top2)
        }  //

        

        //获取图片宽度、高度
        my.getImageInfo({  //正面
          src:res.data.data.pic1,
          success:function(pic){
            that.data.bgList.pic1w = pic.width;
            that.data.bgList.pic1h = pic.height;
            that.data.bgList.contLeft1 = (that.data.systemInfo.windowWidth - pic.width)/2; //定制区域left
            that.data.bgList.contTop1 = (that.data.systemInfo.windowHeight - pic.height -100)/2  //定制区域top

            that.setData({
              bgList:that.data.bgList
            })
          },
          fail:function(res){
           
          }
        });
         my.getImageInfo({  //背面
          src:res.data.data.pic2,
          success:function(pic){
            that.data.bgList.pic2w = pic.width;
            that.data.bgList.pic2h = pic.height;
             that.data.bgList.contLeft2 = (that.data.systemInfo.windowWidth - pic.width)/2; //定制区域left
            that.data.bgList.contTop2 = (that.data.systemInfo.windowHeight - pic.height -100)/2  //定制区域top
            that.setData({
              bgList:that.data.bgList
            })
          }
        });

         my.getImageInfo({  //侧面
          src:res.data.data.pic3,
          success:function(pic){
            that.data.bgList.pic3w = pic.width;
            that.data.bgList.pic3h = pic.height;
             that.data.bgList.contLeft3 = (that.data.systemInfo.windowWidth - pic.width)/2; //定制区域left
            that.data.bgList.contTop3 = (that.data.systemInfo.windowHeight - pic.height -100)/2  //定制区域top
            that.setData({
              bgList:that.data.bgList
            })
          }
        });


        let ct = 'front'
        if(res.data.data.buttons.indexOf('正面')>-1){
          ct = 'front'
        }else if(res.data.data.buttons.indexOf('反面')>-1){
          ct = 'back'
        }else if(res.data.data.buttons.indexOf('左侧')>-1){
          ct = 'leftSide'
        }else if(res.data.data.buttons.indexOf('右侧')>-1){
          ct = 'rightSide'
        }
        that.setData({
          // bgList:bgList,
          sizes:res.data.data.sizes,
          buttons:res.data.data.buttons,
          oriLeftPic:res.data.data.pic3,
          oriRightPic:res.data.data.pic4,
          currentTap:ct
          // individualArea:res.data.data.buttons
        });
        
      
        
        let individualArea = []
        for(let i=0;i<res.data.data.buttons.length;i++){
          let btnItem = {
            name:res.data.data.buttons[i],
            active:false,
            disable:false
          }
          individualArea.push(btnItem)

        }
        that.setData({
          individualArea:individualArea
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
    //获取颜色列表
    my.httpRequest({
      url:'http://bbltest.color3.cn/Mobile/Api/getColorList',
      method:'POST',
      data:{},
      dataType:'json',
      success:function(res){
        if(res.data.status==0){
          my.showToast({
              type: 'fail',
              content: '服务器繁忙，请稍候再试',
              duration: 2000,
          });
          return;
        }
        that.setData({
          colorList:res.data.list
        })
       
      },
      fail:function(){

      },
      complete:function(){

      }
    });
   
  },
  
  areaTap(e){
    const index = e.currentTarget.dataset.index
    let areas = this.data.individualArea;
    if(areas[index].disable){
      return;
    }
    areas[index].active = !areas[index].active;
    this.setData({
      individualArea:areas
    })
    
  },
  // 选择个人定制区域
  personalArea(){
    // let front = this.data.individualArea.indexof
    let individualArea = this.data.individualArea;
    let frontIndex,
        backIndex,
        leftIndex,
        rightIndex;
    for(let i=0;i<individualArea.length;i++){
      if(individualArea[i].name == '正面'){
          frontIndex = i
      }else if(individualArea[i].name == '反面'){
          backIndex = i
      }else if(individualArea[i].name == '左侧'){
          leftIndex = i
      }else if(individualArea[i].name == '右侧'){
          rightIndex = i
      }
      
    }

    if(this.data.frontItemList.length>0){
      individualArea[frontIndex].disable = true
    }else{
      individualArea[frontIndex].disable = false
    }
    if(this.data.backItemList.length>0){
      individualArea[backIndex].disable = true
    }else{
      individualArea[backIndex].disable = false
    }
    if(this.data.leftStickerId!=0){
      individualArea[leftIndex].disable = true
    }else{
      individualArea[leftIndex].disable = false
    }
    if(this.data.rightStickerId!=0){
      individualArea[rightIndex].disable = true
    }else{
      individualArea[rightIndex].disable = false
    }


    this.setData({
      personalArea:true,
      individualArea:individualArea
    })
  },
  // 确定个人定制区域
  confirmPsnArea(){
    this.setData({
      personalArea:false
    })
  },
  // 图片touchStart
  WraptouchStart(e){
    
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
 
    // let items = this.data.itemList;
    const curTap = this.data.currentTap;
    let imgInitialW = this.data.imgInitialW 
    let maxLeft ; //可移动的最大left值
    let minLeft; //可移动的最小left值
    let maxTop; //可移动的最大top值
    let minTop;//可移动的最小top值
    
  
    let items = [];
    let index = this.data.index;
    let itemW ;//组件宽度
    let itemH; //组件高度
    if(curTap == 'front'){
       items = this.data.frontItemList;
       
       itemW = parseInt(items[index].scale*imgInitialW); //贴纸等组件的宽度
       itemH = items[index].scale*imgInitialW*(items[index].pich/items[index].picw);//贴纸等组件的高度
       maxLeft = parseInt(this.data.bgList.left1)+(parseInt(this.data.bgList.width));
       minLeft = this.data.bgList.left1;

       maxTop = parseInt(this.data.bgList.top1)+(parseInt(this.data.bgList.height));
       minTop = this.data.bgList.top1;
    }else if(curTap == 'back'){
       items = this.data.backItemList; 
       itemW = parseInt(items[index].scale*imgInitialW); //贴纸等组件的宽度
       itemH = items[index].scale*imgInitialW*(items[index].pich/items[index].picw);//贴纸等组件的高度
       maxLeft = parseInt(this.data.bgList.left2)+(parseInt(this.data.bgList.width1));
       minLeft = this.data.bgList.left2;

       maxTop = parseInt(this.data.bgList.top2)+(parseInt(this.data.bgList.height1));
       minTop = this.data.bgList.top2;
    }

        
        //移动时的坐标值也写图片的属性里  
        items[index]._lx = e.touches[0].clientX;  
        items[index]._ly = e.touches[0].clientY;  

       
        
       let movex = items[index]._lx - items[index].lx//x方向移动值
       let movey = items[index]._ly - items[index].ly//y方向移动值

        
        // const maxLeft = parseInt(this.data.bgList.left2)+(parseInt(this.data.bgList.width) - itemW); //可移动的最大left值

          
        //追加改动值  
      
        // if(items[index].x - imgInitialW*items[index].scale/2 < minLeft  && movex<0 && !items[index].text){
        //   console.log("不能再左移了")
          
        //   // return;
          
        // }else if(items[index].x + imgInitialW*items[index].scale/2 > maxLeft && movex>0 && !items[index].text){
        //   console.log("不能再右移了")
        //   // return;
        // }else{
          items[index].left  += items[index]._lx - items[index].lx;  // x方向 
          items[index].x +=  items[index]._lx - items[index].lx;   
             //把新的值赋给老的值  
          items[index].lx = e.touches[0].clientX;  
        // }

        // if(items[index].y - itemH/2<minTop && movey<0){
        //   console.log('不能再往上移了')
        // }else if(items[index].y+ itemH/2>maxTop && movey>0){
        //   console.log('不能再往下移了')
        // }else{
          items[index].top += items[index]._ly - items[index].ly;    // y方向  
          items[index].y += items[index]._ly - items[index].ly;  
          items[index].ly = e.touches[0].clientY;  

        // }
        // if(){

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

    if(curTap == 'front'){
          this.setData({   //赋值   
            frontItemList: items
          }) 
          app.globalData.frontItems = this.data.frontItemList 
        }else if(curTap == 'back'){
          this.setData({   //赋值   
            backItemList: items
          })  
          app.globalData.backItems = this.data.backItemList 
    }
    

    
  },

// 触摸开始事件  items是this.data.itemList的全局变量，便于赋值  所有的值都应给到对应的对象里  
  touchStart: function (e) {  
       //找到点击的那个图片对象，并记录  
        // let items = this.data.itemList;
        const curTap = this.data.currentTap;
        const index = this.data.index;
  
        let items = [];
        let editLeft; //编辑区域left、top值
        let editTop;
        if(curTap == 'front'){
          items = this.data.frontItemList;
          editLeft = this.data.bgList.left1;
          editTop = this.data.bgList.top1;
        }else if(curTap == 'back'){
          items = this.data.backItemList; 
          editLeft = this.data.bgList.left2
          editTop = this.data.bgList.top2;
        }
        for (let i = 0; i < items.length; i++) {  
            items[i].active = false;  
  
            if (e.currentTarget.dataset.id == items[i].id) {  
                this.setData({
                  index:i
                }) 
             
                items[index].active = true;  
            }  
        }  
        
         //获取作为移动前角度的坐标  
        items[index].tx = e.touches[0].clientX;  
        items[index].ty = e.touches[0].clientY;  
        //移动前的角度
       
        items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)  
  
        //获取图片半径  
        items[index].r = this.getDistancs(items[index].x-editLeft, items[index].y-editTop, items[index].left, items[index].top)  
        
    },  
    // 触摸移动事件    
  touchMove: function (e) {  
        //记录移动后的位置 
        // let items = this.data.itemList;
        const curTap = this.data.currentTap;
        const that = this;
  
        let items = [];
        if(curTap == 'front'){
          items = this.data.frontItemList;
        }else if(curTap == 'back'){
          items = this.data.backItemList; 
        }
        const index = this.data.index; 

        if(items[index].pictype == 2){
          return;
        }

        // let index = this.data.index;
        let itemW ;//组件宽度
        let itemH; //组件高度
        let hypotenuse;//斜边
        let maxLeft;//
        let minLeft;
        let minTop;
        let maxTop;
        if(curTap == 'front'){
          items = this.data.frontItemList;
          
          itemW = parseInt(items[index].scale*imgInitialW); //贴纸等组件的宽度

          itemH = items[index].scale*imgInitialW*(items[index].pich/items[index].picw);//贴纸等组件的高度
          maxLeft = parseInt(this.data.bgList.left1)+(parseInt(this.data.bgList.width));
          minLeft = this.data.bgList.left1;

          maxTop = parseInt(this.data.bgList.top1)+(parseInt(this.data.bgList.height));
          minTop = this.data.bgList.top1;
        }else if(curTap == 'back'){
          items = this.data.backItemList; 
          itemW = parseInt(items[index].scale*imgInitialW); //贴纸等组件的宽度
          itemH = items[index].scale*imgInitialW*(items[index].pich/items[index].picw);//贴纸等组件的高度
          maxLeft = parseInt(this.data.bgList.left2)+(parseInt(this.data.bgList.width1));
          minLeft = this.data.bgList.left2;

          maxTop = parseInt(this.data.bgList.top2)+(parseInt(this.data.bgList.height1));
          minTop = this.data.bgList.top2;
        }
        const imgInitialW = this.data.imgInitialW
        hypotenuse =  Math.sqrt(  (itemW/2) * (itemW/2) + (itemH/2) * (itemH/2)  )

        
        
        let clientX = e.touches[0].clientX; 
        let clientY = e.touches[0].clientY;  
        
        //移动的点到圆心的距离  
      
     

        // let disPtoO = this.getDistancs(items[index].x, items[index].y, clientX - that.data.bgList.contLeft1, clientY - that.data.bgList.contTop1)  

        // let scale = disPtoO / items[index].r; //手指滑动的点到圆心的距离与半径的比值作为图片的放大比例
        
       
        items[index].disPtoO = this.getDistancs(items[index].x, items[index].y, clientX - that.data.bgList.contLeft1, clientY - that.data.bgList.contTop1)  

        items[index].scale = items[index].disPtoO / items[index].r; //手指滑动的点到圆心的距离与半径的比值作为图片的放大比例  

        items[index]._tx = e.touches[0].clientX;  
        items[index]._ty = e.touches[0].clientY;  
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
  //计算旋转后的坐标
  countCoordinate:function(x0,y0,a,b,angle){ //(x0, y0)绕(a, b) 旋转b度后得到的坐标
    let x = (x0 - a) * cosb + (y0 - b) * sinb;

    let y = (y0 - b) * cosb + (x0 - a) * sinb;
    let coordinate = [x,y]
    return coordinate
  },
  countDeg: function (cx, cy, pointer_x, pointer_y) {  
        var ox = pointer_x - cx;  
        var oy = pointer_y - cy;  
        var to = Math.abs(ox / oy);  
        var angle = Math.atan(to) / (2 * Math.PI) * 360;//鼠标相对于旋转中心的角度  
 
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


    var ox = pointer_x - cx;  
        var oy = pointer_y - cy;  
        return Math.sqrt(  
            ox * ox + oy * oy  
        );  
  },
  add(e) {

  },
  windowToggle:function(e){

  
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

    let windowPosition = this.data.windowPosition;
    windowPosition.after = e.touches[0].clientY;
    windowPosition.before = e.touches[0].clientY
     this.setData({
      windowPosition : windowPosition
     })
  },
  windowTouchMove(e){

    let windowPosition = this.data.windowPosition;

    windowPosition.after = e.touches[0].clientY;
    windowPosition.before = this.data.windowPosition.before;
    this.setData({
      windowPosition : windowPosition
     })

     if(this.data.windowPosition.before - this.data.windowPosition.after>30){
        this.setData({
          windowActive: true
        });
     }

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

    if(this.data.index == undefined ){
      return;
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

    my.navigateTo({ url: "../images/images?currentTap="+currentTap });
  },
  sticker(e){
    
    app.globalData.footer = 'list'
    const oritype = e.currentTarget.dataset.id
    const currentTap = this.data.currentTap;

    if(currentTap == 'leftSide' || currentTap == 'rightSide'){
      my.navigateTo({ url: "../sideSticker/sideSticker?currentTap="+currentTap+"&oritype="+oritype });
    }else{
      my.navigateTo({ url: "../sticker/sticker?currentTap="+currentTap+"&oritype="+oritype });
    }
    
    
  },
  //清除功能
  cleanUp(e){
    const currentTap = this.data.currentTap;
    const that = this;
    my.confirm({
      title: '温馨提示',
      content: '是否清空当前画布',
      confirmButtonText: '清空',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){

          if(currentTap == 'front'){
            that.setData({
              frontItemList:[]
            })
          }else if(currentTap == 'back'){
            that.setData({
              backItemList:[]
            })
          }else if(currentTap == 'leftSide'){ //清除左侧
            let bgList=that.data.bgList
            bgList.pic3 = that.data.oriLeftPic
            app.globalData.leftStickerId = ''
            that.setData({
              bgList:bgList,
              leftStickerId:'',
              leftSidePicId:'', //左侧图片id
            })
            // my.httpRequest({
            //   url: 'http://bbltest.color3.cn/Mobile/Api/getImageByDid',
            //   method: 'post',
            //   data: {
            //     did: 0, //贴纸或线条id
            //     tid:that.data.prodId,  //款式id
            //     // oritype:query.oritype
            //   },
            //   dataType: 'json',
            //   success: function(res) {
            //     my.hideLoading();
            //     if(res.data.status){
            //       let bgList = that.data.bgList;
            //       bgList.pic3 = res.data.data.pic;

            //       that.setData({
            //         bgList:bgList,
            //         leftSidePicId:res.data.id
            //       })
            //     }else{
            //       my.showToast({
            //       type: 'fail',
            //       content: '暂时不提供此组件定制,请重新选择',
            //       duration: 2000,
            //     });
            //     app.globalData.leftStickerId = ''
            //     }
                

            //   },
            //   fail: function(res) {

            //     // my.alert({content: 'fail'});
            //   },
            //   complete: function(res) {
            //     // my.hideLoading();
            //     // my.alert({content: 'complete'});
            //   }
            // });
          }else if(currentTap == 'rightSide'){ //清除右侧
            let bgList=that.data.bgList
           
            app.globalData.rightStickerId = ''
            bgList.pic4= that.data.oriRightPic
            
            that.setData({
              bgList:bgList,
              rightStickerId:'',
              rightSidePicId:'',//右侧图片id
            })
            
          }
          // for(let i = 0;i<app.globalData.items.length;i++){
          //   if(app.globalData.items[i].ground == 'front'){
          //       app.globalData.items.splice(i,1)
          //   }
          // }
          // this.setData({
          //   itemList:app.globalData.items
          // });
        }
        
      },
    });
    // const oritype = 2
    // const currentTap = this.data.currentTap;
    // my.navigateTo({ url: "../bgList/bgList?currentTap="+currentTap+"&oritype="+oritype });

  },
  // 点击正面
  front(e){
    if(this.data.footer =='text'){
      return; //编辑字体时不允许切换
    }

    let individualArea = this.data.individualArea;
    let frontIndex;
    for(let i=0;i<individualArea.length;i++){
      if(individualArea[i].name == '正面'){
          frontIndex = i
      }
    }
    if(individualArea[frontIndex].active){
      my.confirm({
        title: '温馨提示',
        content: '是否取消（正面）个人定制权限',
        confirmButtonText: '清空',
        cancelButtonText: '取消',
        success: (result) => {
         if(result.confirm){
           individualArea[frontIndex].active =false
         }else{
           return;
         }
        },
      });
    }
    this.setData({
      currentTap:'front',
      individualArea:individualArea
    });

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
    let individualArea = this.data.individualArea;
    let backIndex;
        
    for(let i=0;i<individualArea.length;i++){
      if(individualArea[i].name == '反面'){
          backIndex = i
      }  
    }
    if(individualArea[backIndex].active){
      my.confirm({
        title: '温馨提示',
        content: '是否取消（反面）个人定制权限',
        confirmButtonText: '清空',
        cancelButtonText: '取消',
        success: (result) => {
         if(result.confirm){
           individualArea[backIndex].active =false;
         }else{
           return;
         }
        },
      });
    }

    this.setData({
      currentTap:'back',
      individualArea:individualArea
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
    // my.confirm({
    //   title: '温馨提示',
    //   content: '是否清空画布',
    //   confirmButtonText: '清空',
    //   cancelButtonText: '取消',
    //   success: (result) => {
    //   if(result.confirm){
    //       for(let i = 0;i<app.globalData.items.length;i++){
    //         if(app.globalData.items[i].ground == 'back'){
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
  // 点击左侧
  leftSide(side){
    if(this.data.footer =='text'){
      return; //编辑字体时不允许切换
    }
    let individualArea = this.data.individualArea;
    let leftIndex;
        
    for(let i=0;i<individualArea.length;i++){
      if(individualArea[i].name == '左侧'){
          leftIndex = i
      }  
    }
    if(individualArea[leftIndex].active){
      my.confirm({
        title: '温馨提示',
        content: '是否取消（左侧）个人定制权限',
        confirmButtonText: '清空',
        cancelButtonText: '取消',
        success: (result) => {
         if(result.confirm){
           individualArea[leftIndex].active =false;
         }else{
           return;
         }
        },
      });
    }


    this.setData({
      currentTap:'leftSide',
      windowActive:true,
      individualArea:individualArea
    })
  },
  // 点击右侧
  rightSide(side){
    if(this.data.footer =='text'){
      return; //编辑字体时不允许切换
    }

    let individualArea = this.data.individualArea;
    let rightIndex;
        
    for(let i=0;i<individualArea.length;i++){
      if(individualArea[i].name == '右侧'){
          rightIndex = i
      }  
    }
    if(individualArea[rightIndex].active){
      my.confirm({
        title: '温馨提示',
        content: '是否取消（右侧）个人定制权限',
        confirmButtonText: '清空',
        cancelButtonText: '取消',
        success: (result) => {
         if(result.confirm){
           individualArea[rightIndex].active =false;
         }else{
           return;
         }
        },
      });
    }
    this.setData({
      currentTap:'rightSide',
      windowActive:true,
      individualArea:individualArea
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

    const currentIndex = this.data.index;
    let items = this.data.itemList;
    items[currentIndex].fontFamily = e.detail.value
    this.setData({
      itemList: items
    })
  },
  bindTextInput(e){
    let text = this.filterEmoji(e.detail.value)
    this.setData({
      textContent:text
    })
  },
  filterEmoji(text){
    var reg = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
    if(text.match(reg)) {
        text = text.replace(reg, '');
    }
    return text
  },
  addText(){
    // let imgLength = app.globalData.items.length;
    let imgInitialW = this.data.imgInitialW;
    const that =  this;
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
    const eidtAreaParams = app.globalData.eidtAreaParams;
    
    
    if(this.data.currentTap == 'front'){
      const frontLength = app.globalData.frontItems.length;
      item.id = frontLength +1;
      item.left = (eidtAreaParams.width1 - imgInitialW)/2;
      item.top = (eidtAreaParams.height1)/2;
    
      item.x =parseInt(this.data.bgList.left1)+ item.left+that.data.imgInitialW/2;
      item.y = parseInt(this.data.bgList.top1)+item.top+item.fontSize;
      app.globalData.frontItems.push(item);
      
      this.setData({
        frontItemList:app.globalData.frontItems,
        index:frontLength
      });
    }else if(this.data.currentTap == 'back'){
      const backLength = app.globalData.backItems.length;
      item.left = (eidtAreaParams.width2 - imgInitialW)/2;
      item.top = (eidtAreaParams.height2)/2;
     
      item.id = backLength +1;
       item.x =parseInt(this.data.bgList.left2)+ item.left+that.data.imgInitialW/2;
      item.y =parseInt(this.data.bgList.top2)+ item.top;
      app.globalData.backItems.push(item);

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

    const colorIndex =  e.target.dataset.index;



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
    // let items = this.data.itemList;
    const curTap = this.data.currentTap;
  
    let items = [];
    if(curTap == 'front'){
       items = this.data.frontItemList;
    }else if(curTap == 'back'){
       items = this.data.backItemList; 
    }
    let index = this.data.index;

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
    my.showLoading({
      content: '提交中，请稍后...',
      // delay: 1000,
    });
    // that.ctx = my.createCanvasContext('canvasFront');
    // let frontItemList = that.data.frontItemList;
    // let backItemList = that.data.backItemList;                                            h 
    that.canvasDraw('front',true);//背景图（不包含个性定制贴纸）
    that.canvasDraw('back',true);
    that.canvasDraw('front',false);//展示图（包含个性定制贴纸）
    that.canvasDraw('back',false);
    // that.canvasRemix('front');
    // that.canvasRemix('back');
    
   

    // setTimeout(function(){

      
      
    // },1000)


    setTimeout(function(){

      that.uploadDrawImg('front');
      that.uploadDrawImg('back');
      that.uploadDrawImg('frontBg');
      that.uploadDrawImg('backBg');
      // that.uploadDrawImg('frontRemix')
      // that.uploadDrawImg('backRemix')
    
    },2000);
     setTimeout(function(){

      that.uploadDrawImg('frontRemix')
      that.uploadDrawImg('backRemix')

      that.uploadDrawImg('frontRemixBg')
      that.uploadDrawImg('backRemixBg')
    
    },3000);

    let params = that.data.saveworkdesk

    let myInterval = setInterval(function(){
          
          if(params.position_front_remix!=undefined&& params.position_front!=undefined && params.position_back_remix!=undefined && params.position_back!=undefined){
            
            clearInterval(myInterval);
            that.saveworkdesk();

          }

        }, 100);



    
  },

// canvas绘制正反面整体图（不包含背景图）

  canvasDraw(side,isBg){  //side:front正面、back反面,isBg：true团体定制成的背景图（无个性定制贴纸），false团体定制的展示图（有个性定制贴纸）

    let that = this;
    let itemList = [];
    let areaLeft ;
    let areaTop ;
    let imgInitialW = this.data.imgInitialW
  
    if(side =='front'){
      itemList = that.data.frontItemList;
      console.log(itemList)
      that.ctx = my.createCanvasContext('canvasFront');
      if(isBg){ //背景图，非展示图，不包含个性贴纸
        that.ctx = my.createCanvasContext('canvasFrontBg');
      }
      areaLeft = that.data.bgList.left1; //定制框left
      areaTop = that.data.bgList.top1; //定制框top
      
    }else if(side == 'back'){
      itemList = that.data.backItemList;
      that.ctx = my.createCanvasContext('canvasBack');
      if(isBg){ //背景图，非展示图，不包含个性贴纸
        that.ctx = my.createCanvasContext('canvasBackBg');
      }
      areaLeft = that.data.bgList.left2; //定制框left
      areaTop = that.data.bgList.top2; //定制框top
    }


    for(let i=0;i<itemList.length;i++){
        
        const item = itemList[i]
        if(item.pictype == 3&& isBg){
          return;
        }
        if(item.image == undefined && item.type == 'image'){
          return;
        }
        // this.ctx.rotate(30 * Math.PI / 180);
        that.ctx.save();
        
        const left = item.left;
        let top = item.top;
        let wh = item.pich / item.picw  //图片宽高比例
        
        let height = imgInitialW*wh*item.scale;  //计算缩放后的图片高度
        if(item.text){
          top = (item.fontSize*item.scale)/2+top;  //文字top要加上文字的高度
          height = -item.fontSize*item.scale;//文字的高度
        }
        


       
        that.ctx.translate(item.x-areaLeft,item.y-areaTop);//圆心坐标
        that.ctx.rotate(item.angle * Math.PI / 180);//旋转
        that.ctx.translate(-(imgInitialW * item.scale/ 2), -(height / 2))

        // that.ctx.translate(left,top);
        // that.ctx.rotate(item.angle * Math.PI / 180);





        that.ctx.setGlobalAlpha(item.opacity/100)

       
        if(item.downloadFile){  //绘制图片
          that.ctx.drawImage(item.image,0,0,imgInitialW*item.scale,height) 

        }else if(item.text){    //绘制文字
  
          that.ctx.setFillStyle(item.color);
          that.ctx.setFontSize(item.fontSize*item.scale);
          that.ctx.fillText(item.text, 0, 0)
        }

        that.ctx.restore();//恢复状态
        
    }
      
      that.ctx.draw();

  },

  //canvas正反面合成图（包含背景图）
  canvasRemix(side,isBg){  
   let imgInitialW = this.data.imgInitialW
    // return;
    let that = this;
    let itemList = [];
    let areaLeft ;
    let areaTop ;
    let bgItem = {
        "top":0,
        "left":0,
        "scale":1,
        "angle":0,
        "opacity":100,
        "rotate":0,
        "type":"image",
        "ground":"front",
        "zindex":1,
        
        "id":1,
        // "downloadFile":"temp://1530967751185.png"
    }
    if(side =='front'){
      itemList = that.data.frontItemList;
      // console.log(itemList)
      bgItem.picw = that.data.bgList.pic1w;
      bgItem.pich = that.data.bgList.pic1h;
      // bgItem.downloadFile = that.data.bgList.tempFilePath1;
      bgItem.image = that.data.bgList.pic1;
      bgItem.bg = true //是否是背景图
      
      itemList.unshift(bgItem);
      // console.log(itemList)
      that.ctx = my.createCanvasContext('frontRemix');
      areaLeft = that.data.bgList.left1; //定制框left
      areaTop = that.data.bgList.top1; //定制框top
      // that.data.frontItemList.splice(0,1)
       console.log(that.data.frontItemList)
      // that.setData({
      //   frontItemList:that.data.frontItemList.splice(0,1)
      // })
      console.log(that.data.frontItemList)
      
    }else if(side == 'back'){
      
      itemList = that.data.backItemList;
      bgItem.picw = that.data.bgList.pic2w;
      bgItem.pich = that.data.bgList.pic2h;
      bgItem.bg = true //是否是背景图
      // bgItem.downloadFile = that.data.bgList.tempFilePath2;
      bgItem.image = that.data.bgList.pic2
      itemList.unshift(bgItem);
      that.ctx = my.createCanvasContext('backRemix');
      areaLeft = that.data.bgList.left2; //定制框left
      areaTop = that.data.bgList.top2; //定制框top
      // that.ctx.save();
      let pic2 = ''
       console.log(this.data.backItemList)
      //  my.downloadFile({
      //   url: that.data.bgList.pic2, // 下载文件地址
      //   success: (res) => {
      //     pic2 = res.apFilePath
      //   },
      // });
      // that.ctx.drawImage(pic2,0,0,that.data.bgList.pic2w,that.data.bgList.pic2h) 
      // that.ctx.drawImage(item.downloadFile,0,0,100*item.scale,height) 
      // that.ctx.restore();//恢复状态
    }
  
    // for(let i=itemList.length-1;i>-1;i--){
    for(let i=0;i<itemList.length;i++){
        const item = itemList[i]
        // this.ctx.rotate(30 * Math.PI / 180);
        that.ctx.save();
        if(i == 0){
          that.ctx.drawImage(item.image,0,0,item.picw,item.pich) 
        }else{
          if(item.image == undefined && item.type == 'image'){
            return;
          }
          const left = parseInt(item.left) ;
          let top = parseInt(item.top );
          const wh = item.pich / item.picw  //图片宽高比例
          let height = imgInitialW*wh*item.scale;  //计算缩放后的图片高度
          if(item.text){
            top = (item.fontSize*item.scale)/2+top;  //文字top要加上文字的高度
            height = -item.fontSize*item.scale;//文字的高度
          }
          // that.ctx.translate(left,top);
          // that.ctx.rotate(item.angle * Math.PI / 180);
        
          that.ctx.translate(item.x,item.y);//圆心坐标
          that.ctx.rotate(item.angle * Math.PI / 180);//旋转
          that.ctx.translate(-(imgInitialW * item.scale/ 2), -(height / 2))



          that.ctx.setGlobalAlpha(item.opacity/100)

          if(item.downloadFile){  //绘制图片
            that.ctx.drawImage(item.image,0,0,imgInitialW*item.scale,height) 
          }else if(item.text){    //绘制文字
            that.ctx.setFillStyle(item.color);
            that.ctx.setFontSize(item.fontSize*item.scale);
            that.ctx.fillText(item.text, 0, 0)
          }
        }


        

        that.ctx.restore();//恢复状态
        
    }
      app.globalData.footer = 'list'
      that.ctx.draw();
      that.ctx.save();
      // console.log(this.data.frontItemList)
  },
  //canvas正反面合成图（包含背景图）
  canvasBg(side,cusImg){ 

    let that = this;
    let bgItem = {};
    let areaLeft ;
    let areaTop ;
    if(side =='front'){
    
     
      bgItem.picw = that.data.bgList.pic1w;
      bgItem.pich = that.data.bgList.pic1h;
   
      bgItem.image = that.data.bgList.pic1;

      that.ctx = my.createCanvasContext('frontRemix');
      areaLeft = that.data.bgList.left1; //定制框left
      areaTop = that.data.bgList.top1; //定制框top

      //  that.ctx.save();
      that.ctx.drawImage(bgItem.image,0,0,bgItem.picw,bgItem.pich)//画背景图
      that.ctx.drawImage(cusImg,areaLeft,areaTop,that.data.bgList.width,that.data.bgList.height)//画定制图
      that.ctx.draw()


      
    }else if(side == 'back'){
      
    
      bgItem.picw = that.data.bgList.pic2w;
      bgItem.pich = that.data.bgList.pic2h;
      bgItem.image = that.data.bgList.pic2
    
      that.ctx = my.createCanvasContext('backRemix');
      areaLeft = that.data.bgList.left2; //定制框left
      areaTop = that.data.bgList.top2; //定制框top
      that.ctx.drawImage(bgItem.image,0,0,bgItem.picw,bgItem.pich)//画背景图
      that.ctx.drawImage(cusImg,areaLeft,areaTop,that.data.bgList.width1,that.data.bgList.height1)//画定制图
      that.ctx.draw()
   
    }else if(side == 'canvasFrontBg'){
       bgItem.picw = that.data.bgList.pic1w;
      bgItem.pich = that.data.bgList.pic1h;
   
      bgItem.image = that.data.bgList.pic1;

      that.ctx = my.createCanvasContext('frontRemixBg');
      areaLeft = that.data.bgList.left1; //定制框left
      areaTop = that.data.bgList.top1; //定制框top

      //  that.ctx.save();
      that.ctx.drawImage(bgItem.image,0,0,bgItem.picw,bgItem.pich)//画背景图
      that.ctx.drawImage(cusImg,areaLeft,areaTop,that.data.bgList.width,that.data.bgList.height)//画定制图
      that.ctx.draw()

    }else if(side == 'canvasBackBg'){
      bgItem.picw = that.data.bgList.pic2w;
      bgItem.pich = that.data.bgList.pic2h;
      bgItem.image = that.data.bgList.pic2
    
      that.ctx = my.createCanvasContext('backRemixBg');
      areaLeft = that.data.bgList.left2; //定制框left
      areaTop = that.data.bgList.top2; //定制框top
      that.ctx.drawImage(bgItem.image,0,0,bgItem.picw,bgItem.pich)//画背景图
      that.ctx.drawImage(cusImg,areaLeft,areaTop,that.data.bgList.width1,that.data.bgList.height1)//画定制图
      that.ctx.draw()
    }
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
    }else if(side == 'frontRemixBg'){
      that.ctx = my.createCanvasContext('frontRemixBg');
    }else if(side == 'backRemixBg'){
      that.ctx = my.createCanvasContext('backRemixBg');
    }else if(side == 'frontBg'){
      that.ctx = my.createCanvasContext('canvasFrontBg');
    }else if(side == 'backBg'){
      that.ctx = my.createCanvasContext('canvasBackBg');
    }
    that.ctx.toTempFilePath({
          success(res) {
      
            let path = res.apFilePath;
            if(side == 'front'){
              that.canvasBg('front',res.apFilePath)
            }else if(side == 'back'){
              that.canvasBg('back',res.apFilePath)
            }else if(side == 'frontRemixBg'){
              that.canvasBg('canvasFrontBg',res.apFilePath)
            }else if(side == 'backRemixBg'){
              that.canvasBg('canvasFrontBg',res.apFilePath)
            }
            my.uploadFile({
              url: 'http://bbltest.color3.cn/Mobile/Api/workupload',
              fileType: 'image',
              fileName: 'file',
              filePath: path,
              success: (res) => {
                const resData = JSON.parse(res.data)
                let params = that.data.saveworkdesk

                if(side == 'front'){
                  params.position_front = resData.data.url
                }else if(side == 'back'){
                   params.position_back = resData.data.url;
                }else if(side == 'frontRemix'){
                  params.position_front_remix = resData.data.url
                  
                }else if(side == 'backRemix'){
                 
                  params.position_back_remix = resData.data.url
                }else if(side == 'frontRemixBg'){
                  params.position_font_clear= resData.data.url;
                  console.log( resData.data.url)
                }else if(side == 'backRemixBg'){
                  params.position_back_clear = resData.data.url
                }

                that.setData({
                  saveworkdesk:params
                })
                

              },
              fail(res) {

              },
            });
            
          },
      });
  },
  // 提交定制参数
  saveworkdesk(){
  
    let userInfo;
    const that = this;
    let frontStickers = '';
    let backStickers = '';
    let content_parm = { //个性定制贴纸参数
     
    };

    for(let i=0;i<this.data.frontItemList.length;i++){
      if(this.data.frontItemList[i].pictype != undefined){
        // frontStickers.push(this.data.frontItemList[i].stickerid)
        frontStickers+=this.data.frontItemList[i].stickerid+','
      }
      if(this.data.frontItemList[i].pictype==3){
        content_parm['front'] = this.data.frontItemList[i]
      }
    }
    for(let i=0;i<this.data.backItemList.length;i++){
      if(this.data.backItemList[i].pictype != undefined){
        // backStickers.push(this.data.backItemList[i].stickerid)
        backStickers+=this.data.backItemList[i].stickerid+','
        if(this.data.backItemList[i].pictype==3){
        content_parm['back'] = this.data.backItemList[i]
      }
      }
    }

    content_parm = JSON.stringify(content_parm)
    console.log(content_parm)

    my.httpRequest({
      url:'http://bbltest.color3.cn/Mobile/Api/saveworkdesk',
      dataType:'json',
      method:'POST',
      data:{
        'type_id':that.data.prodId,   //款式id
        'specitem_id':that.data.fabricId,   //材质id
        'position_front':that.data.saveworkdesk.position_front_remix,   //正面合成图片base64编码
        'position_front_remix':that.data.saveworkdesk.position_front,    //正面整体图片
        'position_back':that.data.saveworkdesk.position_back_remix,    //反面合成图片
        'position_back_remix':that.data.saveworkdesk.position_back,     //反面整体图片
        'position_side_id':that.data.leftSidePicId,   //侧面的图片id左侧
        'position_side_id1':that.data.rightSidePicId,//侧面的图片id右侧
        'size':that.data.fabricId,  //尺码
        // 'color':'',   //颜色id
        'group_idf':frontStickers,  //正面贴纸组件id
        'group_idb':backStickers,  //背面贴纸组件id
        'group_idl':that.data.leftStickerId, //左侧贴纸id
        'group_idr':that.data.rightStickerId,//右侧贴纸id
        'worksname':'',//作品名称
        'numtype':app.globalData.type, //1个人 2团体
        'nickname':app.globalData.userInfo.nickName,  //支付宝用户昵称
        'zfb_userid':app.globalData.userInfo.userId, //支付宝id
        'touxiang':app.globalData.userInfo.avatar, //支付宝头像
        'content_parm':content_parm,  
        'position_font_clear':that.data.saveworkdesk.position_font_clear,//不包含个性贴纸的背景图片
        'position_back_clear':that.data.saveworkdesk.position_back_clear
      },
      success:function(res){
        app.globalData.footer = 'list';
        my.hideLoading();
        if(res.data.status == 0){
          my.showToast({
              type: 'fail',
              content: '服务器繁忙，请稍候再试',
              duration: 2000,
          });
          return;
        }
        that.setData({
          saveworkdesk:{}
        })
        let params = that.data.saveworkdesk

       
        if(that.data.type == 1){
          my.navigateTo({url:'../placeIndividualOrder/placeIndividualOrder?id='+res.data.id}) //id订单号
        }else if(that.data.type == 2){
          let area = '';

          for(let i=0;i<that.data.individualArea.length;i++){
            if(that.data.individualArea[i].active){
              // area.push(that.data.individualArea[i].name)
              area+=that.data.individualArea[i].name+","
            }
          }

          // app.globalData.area = area;
          my.navigateTo({url:'../placeTeamOrder/placeTeamOrder?id='+res.data.id+'&area='+area})
        }else if(that.data.type == 3){
          my.navigateTo({url:'../placeIndividualOrder/placeIndividualOrder?id='+res.data.id})
        }
        // that.data.saveworkdesk
        

        
      },
      fail:function(){

      },
      complete:function(){
        
      }
    })


    //   // 获取用户信息
    // my.getAuthCode({
    //   scopes: 'auth_user', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
    //   success: (res) => {
    //     let nickname ;
    //     my.getAuthUserInfo({
    //         success: (userInfo) => {
    //           nickname = userInfo.nickName
    //         }
    //     });
    //     if (res.authCode) {
    //       // 认证成功
    //       // 调用自己的服务端接口，让服务端进行后端的授权认证，并且种session，需要解决跨域问题
    //       my.httpRequest({
    //         url: 'http://isv.com/auth', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
    //         data: {
    //           authcode: res.authcode
    //         },
    //         success: (res) => {
    //           // 授权成功并且服务器端登录成功
    //           userInfo = res
    //           // console.log(JSON.stringify(res));
              



    //         },
    //         fail: (res) => {
    //           console.log(res)
    //         },
    //       });
    //     }
    //   },
    //   fail:(res)=>{
    //     console.log(res)
    //   }
    // });



    
   
  },
  
  swapItems(arr, index1, index2){
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  },
  // 向上一层
  upZindex(e){

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


    if(index+1 == items.length){
      console.log("已经是最高一层");
      return; //已经是最高一层
    }

    items.splice(index,1);
    items.splice(index+1,0,curItem)

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


    items.splice(index,1);

    items.splice(index-1,0,curItem)


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
