var app = getApp();
Page({
  data: {},
  onLoad() {
    // my.getAuthCode({
    //   scopes: 'auth_user', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
    //   success: (res) => {
    //   console.log(res.authCode)
    //     if (res.authCode) {
    //       // 认证成功
    //       // 调用自己的服务端接口，让服务端进行后端的授权认证，并且种session，需要解决跨域问题
    //       my.httpRequest({
    //         url: 'http://bbltest.color3.cn/Mobile/Api/getZFBuserInfo', // 目标服务器url
    //         method:'POST',
    //         dataType:'json',
    //         data:{
    //           code:res.authCode
    //         },
    //         success: (res) => {
              
    //         },
    //       });


    //       // my.httpRequest({
    //       //   url: 'http://bbltest.color3.cn/Mobile/Api/getZFBuserInfo', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
    //       //   method:'POST',
    //       //   dataType:'json',
    //       //   data: {
    //       //     authcode: res.authcode
    //       //   },
    //       //   success: () => {
    //       //     // 授权成功并且服务器端登录成功
    //       //   },
    //       //   fail: () => {
    //       //     // 根据自己的业务场景来进行错误处理
    //       //   },
    //       // });
    //     }
    //   },
    // });
    // my.getAuthUserInfo({
    //   success: (userInfo) => {
    //     app.globalData.userInfo.nickName = userInfo.nickName;
    //     console.log(app.globalData.userInfo.nickName)
    //     // my.alert({
    //     //   content: userInfo.nickName,
    //     // });
    //   }
    // });
  },
  single:function(){
    // if(app.globalData.userInfo.nickName == undefined){
    //   this.getUser();
    //   return;
    // }
    app.globalData.type = 1;
    my.navigateTo({url:'../modelList/modelList'});
  },
  team:function(){
    // if(app.globalData.userInfo.nickName == undefined){
    //   // this.getUser();
    //   return;
    // }
    app.globalData.type = 2;
    my.navigateTo({url:'../modelList/modelList'});
  },
  history(){
    // if(app.globalData.userInfo.nickName == undefined){
    //   // this.getUser();
    //   return;
    // }
    my.navigateTo({url:'../orderList/orderList'})
  },
  //  // 获取用户授权
  // getUser(){
  //   my.getAuthCode({
  //     scopes: 'auth_user',
  //     success: (res) => {
  //       my.getAuthUserInfo({
  //         success: (userInfo) => {
  //           console.log(userInfo)
  //           app.globalData.userInfo.nickName = userInfo.nickName;
  //           app.globalData.userInfo.userId = 999
  //           app.globalData.userInfo.headerImg = "https://tfs.alipayobjects.com/images/partner/TB195ZxXddFDuNkUuLAXXXvvFXa"
  //           console.log(app.globalData.userInfo.nickName)
  //           // my.alert({
  //           //   content: userInfo.nickName,
  //           // });
  //         }
  //       });
  //     },
  //   });
  // }
});
