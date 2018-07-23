require('./config$');

function success() {
require('../..//app');
require('../../pages/index/index');
require('../../pages/customType/customType');
require('../../pages/individualForm/individualForm');
require('../../pages/groupForm/groupForm');
require('../../pages/orderList/orderList');
require('../../pages/customizationDetails/customizationDetails');
require('../../pages/orderDetail/orderDetail');
require('../../pages/placeTeamOrder/placeTeamOrder');
require('../../pages/modelList/modelList');
require('../../pages/canvas/canvas');
require('../../pages/placeTeamOrder/placeTeamOrder');
require('../../pages/placeIndividualOrder/placeIndividualOrder');
require('../../pages/sticker/sticker');
require('../../pages/sideSticker/sideSticker');
require('../../pages/images/images');
require('../../pages/bgList/bgList');
require('../../pages/todos/todos');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
