var app = getApp();
Page({
  data: {
    windowActive:false,
    headerConfig:{

    },

    //可编辑图片列表
    itemList: [],
    index:0,
  

    footer:'list',
    systemInfo: {} //窗口信息
  
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
    // 页面显示
    this.setData({
      itemList:app.globalData.items
    })
  },
  onLoad() {
    console.log(1)
    // this.setData({
    //   itemList:app.globalData.items
    // })
   
    // console.log(JSON.stringify(getApp().data.items ) );
    //  this.setData({
    //   items : this.data.itemLits
    //  })
  },

  // 图片touchStart
  WraptouchStart(e){
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
         
        items[this.data.index].lx = e.touches[0].clientX;  // 记录点击时的坐标值  
        items[this.data.index].ly = e.touches[0].clientY;  
        this.setData({   //赋值   
            itemList: items  
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
        temList: items  
    }) 
    console.log(JSON.stringify(items))
    console.log(JSON.stringify(this.data.itemList)) 
    
    
  },

// 触摸开始事件  items是this.data.itemList的全局变量，便于赋值  所有的值都应给到对应的对象里  
  touchStart: function (e) {  
       //找到点击的那个图片对象，并记录  
        let items = this.data.itemList;
        for (let i = 0; i < items.length; i++) {  
            items[i].active = false;  
  
            if (e.currentTarget.dataset.id == items[i].id) {  
                // console.log('e.currentTarget.dataset.id', e.currentTarget.dataset.id)  
                this.setData({
                  index:i
                }) 
                // console.log(items[index])  
                items[this.data.index].active = true;  
            }  
        }  
         //获取作为移动前角度的坐标  
        items[this.data.index].tx = e.touches[0].clientX;  
        items[this.data.index].ty = e.touches[0].clientY;  
        //移动前的角度  
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
        items[index].disPtoO = this.getDistancs(items[index].x, items[index].y, items[index]._tx - this.sysData.windowWidth * 0.125, items[index]._ty - 10)  
  
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




  add(e) {
    console.log(12312312)
  },
  windowToggle:function(e){
  //  my.navigateTo({ url: '../sticker/sticker' });
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
  },
  //头部取消按钮
  cancle(){
    this.setData({
      footer:'list'
    })
  }
});
