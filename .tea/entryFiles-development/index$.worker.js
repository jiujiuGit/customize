require('./config$');

function success() {
require('../..//app');
require('../..//pages/canvas/canvas');
require('../..//pages/modelList/modelList');
require('../..//pages/orderDetail/orderDetail');
require('../..//pages/groupForm/groupForm');
require('../..//pages/customType/customType');
require('../..//pages/index/index');
require('../..//pages/sticker/sticker');
require('../..//pages/images/images');
require('../..//pages/bgList/bgList');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
