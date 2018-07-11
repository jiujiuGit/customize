Page({
  data: {
    background: [],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    // currentTab:1,
    
    currentTab:1,
    side:'正面',
    sizeTab:0,
    success:false, //是否下单成功
    layerMsg:'',
    worksname:'',
    logolink:'',
    resStr:''
  },
  onLoad(query) {
    // this.setData({
    //   id:query.id
    // });
    const that = this;
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/getWorkdetail', // 目标服务器url
      dataType:'json',
      method: 'post',
      data:{
        wid:77
      },
      success: (res) => {
        console.log(res.data.data.pic2)
        // let bgList = [res.data.data.pic1,res.data.data.pic2,res.data.data.pic3];
        let bgList = ['../../assets/images/108.png','../../assets/images/img_geren.png']
        console.log(bgList)
        that.setData({
          background:bgList,
          tname:res.data.data.tname,
          sizes:res.data.data.sizes
        })
        console.log(that.data.sizes)
      },
    });

    // 文案接口
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/getwenan', // 目标服务器url
      dataType:'json',
      method: 'post',
      data:{
       
      },
      success: (res) => {
        that.setData({
          resStr:res.data
        })
        // console.log(that.data.sizes)
      },
    });

  },
  nameInput(e){
    this.setData({
      worksname:e.detail.value
    })
  },
  logoInput(e){
    this.setData({
      logolink:e.detail.value
    })
  },
  left(){
    const that = this;
    let current = this.data.currentTab;
    
    if(current==0){
      return;
    }
    this.setData({
      currentTab:current-1
    })
    const num = this.data.currentTab
    switch(num){
      case 0:
        that.setData({
          side:'正面'
        })
        break;
        
      case 1:
        that.setData({
          side:'反面'
        })
        break;

      case 2:
        that.setData({
          side:'侧面'
        })
        break;
    }
  },
  right(){
    const that = this;
    let current = this.data.currentTab;
    if(current==this.data.background.length-1){
      return;
    }
    this.setData({
      currentTab:current+1
    })
     const num = this.data.currentTab
    switch(num){
      case 0:
        that.setData({
          side:'正面'
        })
        break;
        
      case 1:
        that.setData({
          side:'反面'
        })
        break;

      case 2:
        that.setData({
          side:'侧面'
        })
        break;
    }
  },
  changeimage(e) {
    const that = this;
    var num = e.detail.current;
    switch(num){
      case 0:
        that.setData({
          side:'正面'
        })
        break;
        
      case 1:
        that.setData({
          side:'反面'
        })
        break;

      case 2:
        that.setData({
          side:'侧面'
        })
        break;
    }
    var source = e.detail.source;
    this.setData({
      currentTap: num,
    })
    console.log(num, source)
  },
  confirmOrder(){
    const that = this;
    my.httpRequest({
      url:'http://bbltest.color3.cn/Mobile/Api/issubteamorder',
      method:'POST',
      dataType:'json',
      data:{
        worksname:that.data.worksname,
        logolink:that.data.logolink,
        wid:112,
        orderid:20,
        zfb_userid:'999'
      },
      success:function(res){
        that.setData({
            success:true
        })
        if(res.data.status == 1){
          that.setData({
            success:true
          })
        }
      },
      fail:function(res){
        
      }
    })
  },

  home(){
    my.reLaunch({url:'../customType/customType'});
  },
  call(){
     my.makePhoneCall({ number: this.data.resStr.phone});
  }
});
