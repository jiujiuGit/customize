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
    textContent:''//文字内容

  
  
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
textTap(){
console.log(323123)
},
  // 图片touchStart
  WraptouchStart(e){
    console.log(121)
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
  getDistancs(cx,cy,pointer_x,pointer_y){

    let discount  =  Math.sqrt(Math.pow((cx-pointer_x),2) + Math.pow((cy-pointer_y),2))
    console.log(discount);
    return discount;
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
    
    my.navigateTo({ url: '../sticker/sticker' });
  },
  // 点击正面
  front(e){
    this.setData({
      currentTap:'front'
    })
  },
  // 点击背面
  back(e){
    this.setData({
      currentTap:'back'
    })
  },
  // 点击侧面
  side(e){
    this.setData({
      currentTap:'side'
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
            type:'text',  //文字  
            fontFamily:'SimSun'
        }
        
    item.text = this.data.textContent;
    app.globalData.items.push(item);
    this.setData({
      itemList:app.globalData.items
    });
  
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
  }
});
