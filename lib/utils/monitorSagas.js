"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = monitorSagas;
function monitorSagas(store) {
  var allTasks = [];
  var saveRunSaga = store.runSaga;

  store.runSaga = function interceptRunSaga(saga) {
    // eslint-disable-line no-param-reassign
    var task = saveRunSaga.call(store, saga);
    allTasks.push(task);
    return task;
  };
  return function done() {
    return Promise.all(allTasks.map(function (t) {
      return t.done;
    }));
  };
}