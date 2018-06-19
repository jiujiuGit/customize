require('./config$');

function success() {
require('../..//app');
require('../..//pages/groupForm/groupForm');
require('../..//pages/customType/customType');
require('../..//pages/modelList/modelList');
require('../..//pages/index/index');
require('../..//pages/todos/todos');
require('../..//pages/add-todo/add-todo');
require('../..//pages/sticker/sticker');
require('../..//pages/images/images');
require('../..//pages/bgList/bgList');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
