require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../../pages/customType/customType');
require('../../pages/index/index');
require('../../pages/canvas/canvas');
require('../../pages/placeTeamOrder/placeTeamOrder');
require('../../pages/individualForm/individualForm');
require('../../pages/placeIndividualOrder/placeIndividualOrder');
require('../../pages/groupForm/groupForm');
require('../../pages/orderDetail/orderDetail');
require('../../pages/customizationDetails/customizationDetails');
require('../../pages/orderList/orderList');
require('../../pages/sticker/sticker');
require('../../pages/modelList/modelList');
require('../../pages/sideSticker/sideSticker');
require('../../pages/images/images');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
