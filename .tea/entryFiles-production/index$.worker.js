require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../../pages/modelList/modelList');
require('../../pages/customizationDetails/customizationDetails');
require('../../pages/orderDetail/orderDetail');
require('../../pages/canvas/canvas');
require('../../pages/groupForm/groupForm');
require('../../pages/customType/customType');
require('../../pages/index/index');
require('../../pages/sticker/sticker');
require('../../pages/sideSticker/sideSticker');
require('../../pages/images/images');
require('../../pages/bgList/bgList');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
