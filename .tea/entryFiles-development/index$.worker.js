require('./config$');

function success() {
require('../..//app');
require('../..//pages/index/index');
require('../..//pages/todos/todos');
require('../..//pages/add-todo/add-todo');
require('../..//pages/sticker/sticker');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
