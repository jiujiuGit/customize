Page({
  data: {
    orderSn:'',//父订单号
  },
  onLoad(query) {
    const that = this;
    that.setData({
      orderSn:query.id
    })
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/teamorderchillist', // 目标服务器url
      method:'POST',
      dataType:'json',
      data:{
        order_sn:that.data.orderSn
      },
      success: (res) => {
        
      },
    });
  },
  call(){
     my.makePhoneCall({ number: '400-7417474' });
  }
});
