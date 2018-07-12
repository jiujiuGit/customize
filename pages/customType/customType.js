var app = getApp();
Page({
  data: {},
  onLoad() {
    my.getAuthUserInfo({
      success: (userInfo) => {
        app.globalData.userInfo.nickName = userInfo.nickName;
        console.log(app.globalData.userInfo.nickName)
        // my.alert({
        //   content: userInfo.nickName,
        // });
      }
    });
  },
  single:function(){
    if(app.globalData.userInfo.nickName == undefined){
      this.getUser();
      return;
    }
    app.globalData.type = 1;
    my.navigateTo({url:'../modelList/modelList'});
  },
  team:function(){
    if(app.globalData.userInfo.nickName == undefined){
      this.getUser();
      return;
    }
    app.globalData.type = 2;
    my.navigateTo({url:'../modelList/modelList'});
  },
  history(){
    if(app.globalData.userInfo.nickName == undefined){
      this.getUser();
      return;
    }
    my.navigateTo({url:'../orderList/orderList'})
  },
   // 获取用户授权
  getUser(){
    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        my.getAuthUserInfo({
          success: (userInfo) => {
            app.globalData.userInfo.nickName = userInfo.nickName;
            console.log(app.globalData.userInfo.nickName)
            // my.alert({
            //   content: userInfo.nickName,
            // });
          }
        });
      },
    });
  }
});
