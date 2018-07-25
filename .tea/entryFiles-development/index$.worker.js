require('./config$');

function success() {
require('../..//app');
require('../../pages/customType/customType');
require('../../pages/modelList/modelList');
require('../../pages/placeTeamOrder/placeTeamOrder');
require('../../pages/orderList/orderList');
require('../../pages/orderDetail/orderDetail');
require('../../pages/individualForm/individualForm');
require('../../pages/index/index');
require('../../pages/placeIndividualOrder/placeIndividualOrder');
require('../../pages/sticker/sticker');
require('../../pages/groupForm/groupForm');
require('../../pages/customizationDetails/customizationDetails');
require('../../pages/canvas/canvas');
require('../../pages/sideSticker/sideSticker');
require('../../pages/images/images');
require('../../pages/bgList/bgList');
require('../../pages/todos/todos');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
