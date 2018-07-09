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
    type:'', //定制类型 ，1个人，2团体
    items: [
      // {  
      //       id: 1,  
      //       image: '../../assets/images/t1.jpg',//图片地址  
      //       top: 100,//初始图片的位置   
      //       left: 100,  
      //       x: 155, //初始圆心位置，可再downImg之后又宽高和初始的图片位置得出  
      //       y: 155,  
      //       scale: 1,//缩放比例  1为不缩放  
      //       angle: 0,//旋转角度  
      //       active: false //判定点击状态  
      //   }, {  
      //       id: 2,  
      //       image: '../../assets/images/t2.jpg',  
      //       top: 50,  
      //       left: 50,  
      //       x: 155,  
      //       y: 155,  
      //       scale: 1,  
      //       angle: 0,  
      //       active: false  
      // }
    ],
    ground:"",
    frontItems:[],
    backItems:[],
    stickIndex:-1, //点击的贴纸、图片等的index
    footer:'list', //底部展示内容
    sideStickerId:'' //侧面贴纸或线条id
  }
  // getUserInfo() {
  //   return new Promise((resolve, reject) => {
  //     if (this.userInfo) resolve(this.userInfo);

  //     my.getAuthCode({
  //       scopes: ['auth_user'],
  //       success: (authcode) => {
  //         console.info(authcode);

  //         my.getAuthUserInfo({
  //           success: (res) => {
  //             this.userInfo = res;
  //             resolve(this.userInfo);
  //           },
  //           fail: () => {
  //             reject({});
  //           },
  //         });
  //       },
  //       fail: () => {
  //         reject({});
  //       },
  //     });
  //   });
  // },
});
