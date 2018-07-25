Page({
  data: {
    orderId:'',
    wenan:'',
    orderDetail:{
      "order_id":"2",
      "order_sn":"201807061412193415",
      "order_status":"3",
      "consignee":"",
      "total_amount":"0.00",
      "province":"0",
      "city":"0",
      "address":"",
      "add_time":"1530857539",
      "numper":null,
      "peoplenum":null,
      "wid":"116",
      "worksname":"re",
      "position_front_image":"http://bbltest.color3.cn/Public/upload/work/2018-07-12/5b46ff1dd1d47.png",
      "numtype":"2",
      "nowtime":"2018-07-09 11:36",
      "addtime":"2018-07-19",
      "ordertime":"2018-07-19",
      "znum":0,
      "erweima":"",
      "yinum":0,
      "weinum":0
    },
    showLayer:false
  },
  onLoad(query) {
    const that = this;
    this.setData({
      orderId:query.id
      // orderId:84
    })
  
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/ordertail', // 目标服务器url
      method:'POST',
      dataType:'json',
      data:{
        orderid:that.data.orderId
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
    });

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
              let orderDetail = that.data.orderDetail
              orderDetail.order_status ='6';
              that.setData({
                orderDetail:orderDetail
              })
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
    this.setData({
      showLayer:true
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
        
      },
    });
  },
  //保存二维码
  saveqrcode(){
    my.saveImage({url:this.data.orderDetail.erweima});
  }
});
