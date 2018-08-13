Page({
  data: {
    orderId:'',
    wenan:'',
    orderDetail:{
      "order_id":"",
      "order_sn":"",
      "order_status":"",
      "consignee":"",
      "total_amount":"0.00",
      "province":"0",
      "city":"0",
      "address":"",
      "add_time":"",
      "numper":null,
      "peoplenum":null,
      "wid":"116",
      "worksname":"",
      "position_front_image":"",
      "numtype":"",
      "nowtime":"",
      "addtime":"",
      "ordertime":"",
      "znum":0,
      "erweima":"",
      "yinum":0,
      "weinum":0
    },
    systemInfo:'',
    showLayer:false
  },
  onLoad(query) {
    const that = this;
    my.getSystemInfo({
      success: (res) => {
        this.setData({
          systemInfo: res
        })
      }
    })
    this.setData({
      orderId:query.id
      // orderId:84
    })
    
    
    
    // 获取文案
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/getwenan', // 目标服务器url
      methos:'POST',
      dataType:'json',
      data:{},
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
          wenan:res.data
        })
      },
    });
  },
  onShow(){
    const that = this;
    that.getOrderDetail(that.data.orderId)
  },
  getOrderDetail(orderId){
    const that = this
    my.showLoading({
      content: '加载中...',
        
    });
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/ordertail', // 目标服务器url
      method:'POST',
      dataType:'json',
      data:{
        orderid:orderId
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
        let orderDetail = res.data.data;
        // let orderDetail = that.data.orderDetail
        //0 未付款 1已确认（不显示二维码,团体订单显示生产中 提醒发货） 3付款（如果是个人就显示生产中 如果是团队就显示定制中 显示二维码） 4已发货 5已完成 6已取消
        switch(orderDetail.order_status){
          case '0':
            orderDetail.statusName = '未付款';
            break;
          case '1':
            orderDetail.statusName = '已确认';
            break;
          case '3':
            orderDetail.statusName = '生产中';
            break;
          case '4':
            orderDetail.statusName = '已发货';
            break;
          case '5':
            orderDetail.statusName = '已完成';
            break;
          case '6':
            orderDetail.statusName = '已取消';
            break;
        }
        if(orderDetail.order_status == '1' && orderDetail.numtype == '2'){
          orderDetail.statusName = '定制生产中';
        }
        if(orderDetail.order_status == '3' && orderDetail.numtype == '2'){
          orderDetail.statusName = '买家定制中';
        }
        that.setData({
          orderDetail:orderDetail
        })
      },
      complete:function(){
        my.hideLoading();
      }
    });
  },
  // 取消订单
  cancle(){
    const that = this;
    my.confirm({
      title: '温馨提示',
      content: '确定取消订单？',
      confirmButtonText: '确定取消',
      cancelButtonText: '暂不取消',
      success: (result) => {
        if(result.confirm){
          my.httpRequest({
            url: 'http://bbltest.color3.cn/Mobile/Api/cancerorder', // 目标服务器url
            dataType:'',
            method:'POST',
            data:{
              orderid:this.data.orderId
            },
            success: (res) => {
              that.getOrderDetail(that.data.orderId)
              // let orderDetail = that.data.orderDetail
              // orderDetail.order_status ='6';
              // that.setData({
              //   orderDetail:orderDetail
              // })
            },
          });
        }
       
      },
    });
    
  },
  //确认订单
  confirm(){
    // console.log(this.data.orderDetail.id)
    my.navigateTo({url:'../customizationDetails/customizationDetails?order_sn='+this.data.orderDetail.order_sn+'&id='+this.data.orderId});
  },
  //去支付
  pay(){
    // this.setData({
    //   showLayer:true
    // })
    // "order_id":"",
    //   "order_sn":"",
    //   "order_status":"",
    //   "consignee":"",
    //   "total_amount":"0.00",
    const that = this;
    let order_sn = this.data.orderDetail.order_sn;
    let orderId = this.data.orderDetail.order_id;
    let total_amount = this.data.orderDetail.total_amount;
    my.showLoading({
      content: '加载中...'
    });
    my.httpRequest({
      url:'http://bbltest.color3.cn/Mobile/Api/zhifubaopay',
      method:'POST',
      dataType:'json',
      data:{
        ordersn:order_sn,
        orderid:orderId,
        total_amount:total_amount
        // total_amount:0.01
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
            if(res.resultCode == 9000){
              that.getOrderDetail(that.data.orderId)
              that.setData({
                showLayer:true,
                
                // text:"支付成功！"
              })
            }
            
            
          },
          fail: (res) => {
            my.alert({
            content: JSON.stringify(res),
          });
          }
        });
      },
      complete:function(){
        my.hideLoading();
      }

    })
  },
  closeLayer(){
    this.setData({
      showLayer:false
    })
  },
  call(){
    my.makePhoneCall({ number: this.data.wenan.phone });
  },
  // 提醒发货
  remind(){
    const that = this;
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/txfahuo', // 目标服务器url
      dataType:'json',
      method:'POST',
      data:{
        orderid:that.data.orderId
      },
      success: (res) => {
        my.showToast({
            type: 'success',
            content: '提交成功',
            duration: 2000,
        });
      },
    });
  },
  //保存二维码
  saveqrcode(){
    my.saveImage({url:this.data.orderDetail.erweima});
  },
  myCatchTouch: function () {
    console.log('stop user scroll it!');
    return;
  },
});
