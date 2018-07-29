Page({
  data: {
    orderSn:'',//父订单号
    id:'',//订单id
    wenan:'',
    list:[
      // {
      //   nickname:'马姐姐',
      //   touxiang:'https://tfs.alipayobjects.com/images/partner/T1dRxmXXJfXXXXXXXX',
      //   // zhengpic:'',
      //   // fanpic:'',
      //   // leftpic:'',
      //   // rightpic:'',
      //   "zhengpic":"http://bbltest.color3.cn/Public/upload/diyset/2018/07-24/5b56d38ade911.png",
      //     "fanpic":"http://bbltest.color3.cn/Public/upload/diyset/2018/07-27/5b5a81f6a0846.png",
      //     "tname":"T恤",
      //     "leftpic":"http://bbltest.color3.cn/Public/upload/work/2018-07-29/5b5dd9f812148.png",
      //     "rightpic":"http://bbltest.color3.cn/Public/upload/work/2018-07-29/5b5dd9f813ea4.png",
      //   size:'xs',
      //   znum:'1'
      // },
    ],
    success:false
  },
  onLoad(query) {
    const that = this;
    console.log(query.id)
    that.setData({
      orderSn:query.order_sn,
      id:query.id
    })
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/teamorderchillist', // 目标服务器url
      method:'POST',
      dataType:'json',
      data:{
        order_sn:that.data.orderSn
        // order_sn:'201807292232236034'
      },
      success: (res) => {
        if(res.data.status){
          that.setData({
            list:res.data.data
          })
        }else{
          my.showToast({
            type: 'fail',
            content: '服务器繁忙，请稍候再试',
            duration: 2000,
          });
        }
        
      },
    });

    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/getwenan', // 目标服务器url
      methos:'POST',
      dataType:'json',
      data:{},
      success: (res) => {
        that.setData({
          wenan:res.data
        })
      },
    });
  },
  call(){
     my.makePhoneCall({ number: this.data.wenan.phone });
  },
  defaultTap(){
    const that = this;
    console.log(that.data.id)
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/sureorderchil', // 目标服务器url
      method:'POST',
      dataType:'json',
      data:{
        orderid:that.data.id
      },
      success: (res) => {
        if(res.data.status ==1){
          that.setData({
            success:true
          })
            // my.showToast({
            //   type: 'success',
            //   content: '下单成功',
            //   duration: 3000,
            //   success: () => {
            //     my.reLaunch({
            //       url: '../customType/customType', // 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。参数规则如下：路径与参数之间使用
            //     });
            //   },
            // });
        }else{
          my.showToast({
            type: 'fail',
            content: '服务器繁忙，请稍候再试',
            duration: 2000,
          });
        }
      },
    });
  },
  ok(){
    this.setData({
      success:false
    })
  }
});
