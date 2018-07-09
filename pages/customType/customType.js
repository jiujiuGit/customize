var app = getApp();
Page({
  data: {},
  onLoad() {},
  single:function(){
    app.globalData.type = 1;
    my.navigateTo({url:'../modelList/modelList'});
  },
  team:function(){
    app.globalData.type = 2;
    my.navigateTo({url:'../groupForm/groupForm'});
  }
});
