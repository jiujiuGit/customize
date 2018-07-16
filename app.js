App({
  todos: [
    { text: 'Learning Javascript', completed: true },
    { text: 'Learning ES2016', completed: true },
    { text: 'Learning 支付宝小程序', completed: false },
  ],
  userInfo: null,
  data:{
    items:[]
  },
  globalData:{
    userInfo:{
      userid:999
    },
    type:'', //定制类型 ，1个人，2团体
    items: [],
    ground:"",
    frontItems:[],
    backItems:[],
    stickIndex:-1, //点击的贴纸、图片等的index
    footer:'list', //底部展示内容
    leftStickerId:'', //左侧面贴纸或线条id
    rightStickerId:'',
    // area:[],//团体定制下个人可编辑区域


    // 团体信息
    teamData:{
      prodId:'', //款式id
      picname:'',//款式名字
      fabricId:'',//面料id
      order:'' //单号（保存团体定制表单后返回的order）
    },

    //个人定制信息
    individualData:{
      prodId:'', //款式id
      picname:'',//款式名字
      fabricId:''//面料id
    },

    // 团体订单下的个人定制
    teamIndividual:{
      prodId:'', //款式id
      picname:'',//款式名字
      fabricId:'',//面料id
      order:'' //单号（保存团体定制表单后返回的order）
    }

  },
  onLaunch(res) {
    this.getUserInfo()
    // my.alert({content: '启动参数：'+JSON.stringify(options.query)});

    // 获取团体定制下的个人定制参数
    // if(1){
    //   return
    // }
    let options = {
      parent_orderid:1,
      picname:'我的T恤',
      prodId : 1,
      fabricId:12,
    }
    // my.alert({content: '启动参数：'+JSON.stringify(options.query.x),});
    // console.log('query', options.query);
    // console.log('App Launch', options);


    // console.log(this.globalData.userInfo)
    this.globalData.type = 3
    this.globalData.teamIndividual.parent_orderid = options.parent_orderid
    this.globalData.teamIndividual.picname=options.picname
    this.globalData.teamIndividual.prodId = options.prodId
    this.globalData.teamIndividual.fabricId = options.fabricId
    // console.log(this.globalData.teamIndividual.picname)
    // this.setData({
    //   parent_orderid:99,//团体订单id
    //   picName:'团体单',//商品名称
    //   picId:1,//款式id
    //   fabricId:'12',//面料id

    // })
    // my.navigateTo({url:'../index/index'});

    // 团体定制id
    console.log('query', options.query);
    console.log('App Launch', options);
  },
  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.userInfo) resolve(this.userInfo);

      my.getAuthCode({
        scopes: ['auth_user'],
        success: (authcode) => {
          console.info(authcode);
          var  authCode = authcode
          my.getAuthUserInfo({
            success: (res) => {
              this.globalData.userInfo = res;
              console.log(authcode)
              my.httpRequest({
                url: 'http://bbltest.color3.cn/Mobile/Api/getZFBuserInfo', // 目标服务器url
                method:'POST',
                dataType:'json',
                data:{
                  code:authcode.authCode
                },
                success: (res) => {
                  this.globalData.userInfo.userId = res.data.user_id
                },
              });
              resolve(this.userInfo);
            },
            fail: () => {
              reject({});
            },
          });
        },
        fail: () => {
          reject({});
        },
      });
    });
  },
});
