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
    demo:'',
    userInfo:{
      userid:999
    },
    type:'', //定制类型 ，1个人，2团体，3团体定制下的个人定制
    items: [],
    ground:"",
    frontItems:[],
    backItems:[],
    stickIndex:-1, //点击的贴纸、图片等的index
    footer:'list', //底部展示内容
    leftStickerId:'', //左侧面贴纸或线条id
    rightStickerId:'',

    eidtAreaParams:'',
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
  onLaunch(options) {
   
    // this.getUserInfo()
    console.log(options.query)
    // my.alert({content: '启动参数：'+JSON.stringify(options.query)});

    // 获取团体定制下的个人定制参数
    // if(options.query == undefined){
    //     return;
    // }
    

    this.globalData.type = 3
    this.globalData.teamIndividual.parent_orderid = 420
        this.globalData.teamIndividual.picname="新衣服"
    this.globalData.teamIndividual.prodId = 1
    this.globalData.teamIndividual.fabricId = 1
    // this.globalData.type = 3
    // this.globalData.teamIndividual.parent_orderid = options.query.parent_orderid
    // this.globalData.teamIndividual.picname=options.query.picname
    // this.globalData.teamIndividual.prodId = options.query.prodId
    // this.globalData.teamIndividual.fabricId = options.query.fabricId
    this.isNum();//判断是否能定制
    
  },
  isNum(){
    my.httpRequest({
      url:'http://bbltest.color3.cn/Mobile/Api/isnum',
      dataType:'json',
      method:'POST',
      data:{
        orderid:this.globalData.teamIndividual.parent_orderid
      },
      success:function(res){
        console.log(res)
        if(res.data.status == 0){
          my.alert({
           
            content: res.data.info,
            buttonText: '我知道了',
            success: () => {
             my.reLaunch({
               url: '../customType/customType', // 页面路径。如果页面不为 tabbar 页面则路径后可以带参数。参数规则如下：路径与参数之间使用
               
             });
            },
          });
        }
        
      }
    })
  },
  getUserInfo() {
    
    return new Promise((resolve, reject) => {
      if (this.userInfo) resolve(this.userInfo);

      my.getAuthCode({
        scopes: ['auth_user'],
        success: (authcode) => {
          // console.info(authcode);
          var  authCode = authcode
          my.getAuthUserInfo({
            success: (res) => {
              this.globalData.userInfo = res;
              // console.log(authcode)
              my.httpRequest({
                url: 'http://bbltest.color3.cn/Mobile/Api/getZFBuserInfo', // 目标服务器url
                method:'POST',
                dataType:'json',
                data:{
                  code:authcode.authCode
                },
                success: (res) => {
                  if(res.data.status){
                    this.globalData.userInfo.userId = res.data.user_id
                  }else{
                    my.showToast({
                      type: 'fail',
                      content: '服务器繁忙，请稍候再试',
                      duration: 2000,
                    });
                  }
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
