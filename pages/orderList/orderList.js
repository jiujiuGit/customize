var app = getApp();
Page({
  data: {
    orderList:[],
    wenan:{},
    text:'', //弹框显示内容
    showLayer:false,
    systemInfo:''
  },
  onLoad() {
    const that = this;

    // 获取屏幕信息
    my.getSystemInfo({
      success: (res) => {
        this.setData({
          systemInfo: res
        })
      }
    })


    this.getOrderList();
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
  getOrderList(){
    const that = this;
    my.showLoading({
      content: '加载中...',
    });
    my.httpRequest({
      url: 'http://bbltest.color3.cn/Mobile/Api/getOrderList', // 目标服务器url
      dataType:"json",
      method:'POST',
      data:{
        userid:app.globalData.userInfo.userId
      },
      success: (res) => {
         my.hideLoading();
         if(res.data.status==0){
          my.showToast({
            type: 'fail',
            content: '服务器繁忙，请稍候再试',
            duration: 2000,
          });
          return;
        }
        let list = res.data.list;
        for(let i=0;i<list.length;i++){
          let statusCode = list[i].order_status
          // 0未确认 未付款（团队订单不显示下面定制按钮） 1已确认（团队订单显示定制生产中） 3付款（如果是个人就显示生产中 如果是团队就显示个人定制中 下方开始选择定制按钮） 4已发货 5已完成 6已取消
          switch(statusCode){
            case "0":
              list[i].statusName = '未付款';
              break;
            case "1":
              list[i].statusName = '已确认';
              break;
            case "3":
              list[i].statusName = '生产中';
              break;
            case "4":
              list[i].statusName = '已发货';
              break;
            case "5":
              list[i].statusName = '已完成';
              break;
            case "6":
              list[i].statusName = '已取消';
              break;           
          }
          if(list[i].numtype =='2'){
            switch(statusCode){
              case "1":
                list[i].statusName = '生产中';
                break;
              case "3":
                list[i].statusName = '个人定制中';
                break;
            }
          }
          // if(list[i].numtype ==2 && statusCode == '1'){
          //   list[i].statusName ='生产中'
          // }
          // if(list[i].numtype ==2 && statusCode == '3'){
          //   list[i].statusName ='生产中'
          // }
        }
        
        that.setData({
          orderList:list
        })
      },
      fail(res){
        console.log(res)
      },
      complete:(res)=>{
        my.hideLoading();
      }
    });
  },
  // 点击更多
  more(e){
    console.log(e.currentTarget.dataset.id)

    my.navigateTo({url:'../orderDetail/orderDetail?id='+e.currentTarget.dataset.id});
  },
  closeLayer(){
    this.setData({
      showLayer:false
    })
  },
  // 支付按钮
  pay(e){
    // this.setData({
    //   showLayer:true,
    //   text:this.data.wenan.quzhifu
    // })
    // 获取支付str
    const that = this
    // console.log(e.target.dataset.index)
    let tabIndex = e.target.dataset.index
    let order_sn = this.data.orderList[tabIndex].order_sn;
    let orderId = this.data.orderList[tabIndex].order_id;
    let total_amount = this.data.orderList[tabIndex].total_amount
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
            console.log(res.resultCode)
            if(res.resultCode == 9000){
              that.getOrderList();
              that.setData({
                showLayer:true,
                text:"支付成功！"
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
  // 修改地址
  updateAddr(){
    this.setData({
      showLayer:true,
      text:this.data.wenan.xiugaidizhi
    })
  },
  // 查看物流
  wuliu(e){
    my.navigateTo({url:'../orderDetail/orderDetail?id='+e.currentTarget.dataset.id});
  },
  // 开始定制
  confirm(e){
    const that = this;
    my.navigateTo({url:'../orderDetail/orderDetail?id='+e.currentTarget.dataset.id});
    // my.httpRequest({
    //   method:'POST',
    //   dataType:'json',
    //   url: 'http://bbltest.color3.cn/Mobile/Api/suborder', // 目标服务器url
    //   data:{
    //     orderid:e.currentTarget.dataset.id
    //   },
    //   success: (res) => {
    //     if(res.data.status==0){
    //       my.showToast({
    //         type: 'fail',
    //         content: '服务器繁忙，请稍候再试',
    //         duration: 2000,
    //       });
    //       return;
    //     }
    //     my.showToast({
    //         type: 'success',
    //         content: '提交成功',
    //         duration: 2000,
    //     });
    //   },
    // });
  },
  // 提醒发货
  remind(e){
    const that = this;
    my.httpRequest({
      method:'POST',
      dataType:'json',
      url: 'http://bbltest.color3.cn/Mobile/Api/txfahuo', // 目标服务器url
      data:{
        orderid:e.currentTarget.dataset.id
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
        my.showToast({
            type: 'success',
            content: '提交成功',
            duration: 2000,
        });
      },
    });
  },
  // 确认收货
  recieve(e){
    const that = this;
    my.httpRequest({
      method:'POST',
      dataType:'json',
      url: 'http://bbltest.color3.cn/Mobile/Api/sureordershouhuo', // 目标服务器url
      data:{
        orderid:e.currentTarget.dataset.id
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
        my.showToast({
            type: 'success',
            content: '提交成功',
            duration: 2000,
        });
      },
    });
  }
});
