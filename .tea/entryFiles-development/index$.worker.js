require('./config$');

function success() {
require('../..//app');
require('../../pages/customType/customType');
require('../../pages/index/index');
require('../../pages/customizationDetails/customizationDetails');
require('../../pages/orderList/orderList');
require('../../pages/placeIndividualOrder/placeIndividualOrder');
require('../../pages/canvas/canvas');
require('../../pages/sticker/sticker');
require('../../pages/orderDetail/orderDetail');
require('../../pages/individualForm/individualForm');
require('../../pages/groupForm/groupForm');
require('../../pages/placeTeamOrder/placeTeamOrder');
require('../../pages/modelList/modelList');
require('../../pages/sideSticker/sideSticker');
require('../../pages/images/images');
require('../../pages/bgList/bgList');
require('../../pages/todos/todos');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
