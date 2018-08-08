var app = getApp();
Page({
  data: {
    background: [],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    // currentTab:1,
    num:0,//定制数量
    currentTab:1,
    side:'正面',
    sizeTab:0,
    success:false, //是否下单成功
    layerMsg:'',
    worksname:'',
    logolink:'',
    resStr:'',
    wid:'',//保存定制信息后返回的wid
    total_amount:'',
    area:'',//团体定制下个人可编辑区域
  
  },
  onLoad(query) {
    // this.setData({
    //   id:query.id
    // });
    const that = this;
    console.log(query.area)

    const orderid = app.globalData.teamData.order; //团体订单orderid
   
    this.setData({
      wid:query.id,
      area:query.area
    })
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/getWorkdetail', // 目标服务器url
      dataType:'json',
      method: 'post',
      data:{
        wid:query.id,
        orderid:orderid
        // wid:135,
        // orderid:408
      },
      success: (res) => {
        console.log(res.data.data.pic2)
        if(res.data.status==0){
          my.showToast({
            type: 'fail',
            content: '服务器繁忙，请稍候再试',
            duration: 2000,
          });
          return;
        }
        let bgList = [res.data.data.pic1,res.data.data.pic2,res.data.data.pic3,res.data.data.pic4];
        // let bgList = [res.data.data.pic1,res.data.data.pic2,res.data.data.pic3];
        // let bgList = ['../../assets/images/108.png','../../assets/images/img_geren.png']
        console.log(bgList)
        that.setData({
          background:bgList,
          tname:res.data.data.tname,
          sizes:res.data.data.sizes,
          num:res.data.data.num,
          total_amount:res.data.data.total_amount
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
        if(res.data.status==0){
          my.showToast({
            type: 'fail',
            content: '服务器繁忙，请稍候再试',
            duration: 2000,
          });
          return;
        }
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
          side:'左侧'
        })
        break;
      case 3:
        that.setData({
          side:'右侧'
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
          side:'左侧'
        })
        break;
      case 3:
        that.setData({
          side:'右侧'
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
          side:'左侧'
        })
        break;
      case 3:
        that.setData({
          side:'右侧'
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
        // wid:112,
        // orderid:20,
        wid:that.data.wid,
        orderid:app.globalData.teamData.order,
        area:this.data.area,//个人可定制区域
        zfb_userid:app.globalData.userInfo.userId
      },
      success:function(res){
        if(res.data.status==0){
          my.showToast({
            type: 'fail',
            content: '服务器繁忙，请稍候再试',
            duration: 2000,
          });
          return;
        }
        // 获取支付str
        my.httpRequest({
          url:'http://bbltest.color3.cn/Mobile/Api/zhifubaopay',
          method:'POST',
          dataType:'json',
          data:{
            ordersn:res.data.order_sn,
            orderid:res.data.orderid,
            // total_amount:that.data.total_amount
            total_amount:0.01
          },
          success:function(payRes){
            if(payRes.data.status==0){
              my.showToast({
                  type: 'fail',
                  content: '服务器繁忙，请稍候再试',
                  duration: 2000,
              });
              return;
            }
            my.tradePay({
              orderStr: payRes.data.orderstring, //完整的支付参数拼接成的字符串，从服务端获取
              success: (res) => {
                that.setData({
                    success:true
                })
              },
              fail: (res) => {
                my.alert({
                content: JSON.stringify(res),
              });
              }
            });
          }

        })
        // that.setData({
        //     success:true
        // })
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
