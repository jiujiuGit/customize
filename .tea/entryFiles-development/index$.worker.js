require('./config$');

function success() {
require('../..//app');
require('../..//pages/modelList/modelList');
require('../..//pages/index/index');
require('../..//pages/todos/todos');
require('../..//pages/add-todo/add-todo');
require('../..//pages/sticker/sticker');
require('../..//pages/images/images');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
