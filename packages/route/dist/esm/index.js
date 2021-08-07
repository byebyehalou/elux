import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _extends from "@babel/runtime/helpers/esm/extends";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { isPromise, deepMerge, MultipleDispatcher } from '@elux/core';
import { routeConfig, setRouteConfig } from './basic';
import { History, HistoryRecord } from './history';
import { beforeRouteChangeAction, testRouteChangeAction, routeChangeAction } from './module';
import { eluxLocationToEluxUrl, nativeLocationToNativeUrl as _nativeLocationToNativeUrl } from './transform';
export { setRouteConfig, routeConfig, routeMeta } from './basic';
export { createLocationTransform, nativeUrlToNativeLocation, nativeLocationToNativeUrl } from './transform';
export { routeMiddleware, createRouteModule, RouteActionTypes } from './module';
export var BaseNativeRouter = function () {
  function BaseNativeRouter() {
    _defineProperty(this, "curTask", void 0);

    _defineProperty(this, "taskList", []);

    _defineProperty(this, "router", null);
  }

  var _proto = BaseNativeRouter.prototype;

  _proto.onChange = function onChange(key) {
    if (this.curTask) {
      this.curTask.resolve(this.curTask.nativeData);
      this.curTask = undefined;
      return false;
    }

    return key !== this.router.getCurKey();
  };

  _proto.setRouter = function setRouter(router) {
    this.router = router;
  };

  _proto.execute = function execute(method, getNativeData) {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      var task = {
        resolve: resolve,
        reject: reject,
        nativeData: undefined
      };
      _this.curTask = task;

      var result = _this[method].apply(_this, [function () {
        var nativeData = getNativeData();
        task.nativeData = nativeData;
        return nativeData;
      }].concat(args));

      if (!result) {
        resolve(undefined);
        _this.curTask = undefined;
      } else if (isPromise(result)) {
        result.catch(function (e) {
          reject(e);
          _this.curTask = undefined;
        });
      }
    });
  };

  return BaseNativeRouter;
}();
export var BaseRouter = function (_MultipleDispatcher) {
  _inheritsLoose(BaseRouter, _MultipleDispatcher);

  function BaseRouter(url, nativeRouter, locationTransform) {
    var _this2;

    _this2 = _MultipleDispatcher.call(this) || this;

    _defineProperty(_assertThisInitialized(_this2), "_tid", 0);

    _defineProperty(_assertThisInitialized(_this2), "curTask", void 0);

    _defineProperty(_assertThisInitialized(_this2), "taskList", []);

    _defineProperty(_assertThisInitialized(_this2), "_nativeData", void 0);

    _defineProperty(_assertThisInitialized(_this2), "routeState", void 0);

    _defineProperty(_assertThisInitialized(_this2), "internalUrl", void 0);

    _defineProperty(_assertThisInitialized(_this2), "history", void 0);

    _defineProperty(_assertThisInitialized(_this2), "initRouteState", void 0);

    _defineProperty(_assertThisInitialized(_this2), "injectedModules", {});

    _this2.nativeRouter = nativeRouter;
    _this2.locationTransform = locationTransform;
    nativeRouter.setRouter(_assertThisInitialized(_this2));
    _this2.history = new History();
    var locationOrPromise = locationTransform.urlToLocation(url);

    var callback = function callback(location) {
      var key = _this2._createKey();

      var routeState = _extends({}, location, {
        action: 'RELAUNCH',
        key: key
      });

      _this2.routeState = routeState;
      _this2.internalUrl = eluxLocationToEluxUrl({
        pathname: routeState.pagename,
        params: routeState.params
      });

      if (!routeConfig.indexUrl) {
        setRouteConfig({
          indexUrl: _this2.internalUrl
        });
      }

      return routeState;
    };

    if (isPromise(locationOrPromise)) {
      _this2.initRouteState = locationOrPromise.then(callback);
    } else {
      _this2.initRouteState = callback(locationOrPromise);
    }

    return _this2;
  }

  var _proto2 = BaseRouter.prototype;

  _proto2.getRouteState = function getRouteState() {
    return this.routeState;
  };

  _proto2.getPagename = function getPagename() {
    return this.routeState.pagename;
  };

  _proto2.getParams = function getParams() {
    return this.routeState.params;
  };

  _proto2.getInternalUrl = function getInternalUrl() {
    return this.internalUrl;
  };

  _proto2.getNativeLocation = function getNativeLocation() {
    if (!this._nativeData) {
      this._nativeData = this.locationToNativeData(this.routeState);
    }

    return this._nativeData.nativeLocation;
  };

  _proto2.getNativeUrl = function getNativeUrl() {
    if (!this._nativeData) {
      this._nativeData = this.locationToNativeData(this.routeState);
    }

    return this._nativeData.nativeUrl;
  };

  _proto2.init = function init(store) {
    var historyRecord = new HistoryRecord(this.routeState, this.routeState.key, this.history, store);
    this.history.init(historyRecord);
  };

  _proto2.getCurrentStore = function getCurrentStore() {
    return this.history.getCurrentRecord().store;
  };

  _proto2.getCurKey = function getCurKey() {
    return this.routeState.key;
  };

  _proto2.getHistory = function getHistory(root) {
    return root ? this.history : this.history.getCurrentSubHistory();
  };

  _proto2.getHistoryLength = function getHistoryLength(root) {
    return root ? this.history.getLength() : this.history.getCurrentSubHistory().getLength();
  };

  _proto2.locationToNativeData = function locationToNativeData(location) {
    var nativeLocation = this.locationTransform.partialLocationToNativeLocation(location);
    var nativeUrl = this.nativeLocationToNativeUrl(nativeLocation);
    return {
      nativeUrl: nativeUrl,
      nativeLocation: nativeLocation
    };
  };

  _proto2.urlToLocation = function urlToLocation(url) {
    return this.locationTransform.urlToLocation(url);
  };

  _proto2.payloadLocationToEluxUrl = function payloadLocationToEluxUrl(data) {
    var eluxLocation = this.payloadToEluxLocation(data);
    return eluxLocationToEluxUrl(eluxLocation);
  };

  _proto2.payloadLocationToNativeUrl = function payloadLocationToNativeUrl(data) {
    var eluxLocation = this.payloadToEluxLocation(data);
    var nativeLocation = this.locationTransform.eluxLocationToNativeLocation(eluxLocation);
    return this.nativeLocationToNativeUrl(nativeLocation);
  };

  _proto2.nativeLocationToNativeUrl = function nativeLocationToNativeUrl(nativeLocation) {
    return _nativeLocationToNativeUrl(nativeLocation);
  };

  _proto2._createKey = function _createKey() {
    this._tid++;
    return "" + this._tid;
  };

  _proto2.payloadToEluxLocation = function payloadToEluxLocation(payload) {
    var params = payload.params || {};
    var extendParams = payload.extendParams === 'current' ? this.routeState.params : payload.extendParams;

    if (extendParams && params) {
      params = deepMerge({}, extendParams, params);
    } else if (extendParams) {
      params = extendParams;
    }

    return {
      pathname: payload.pathname || this.routeState.pagename,
      params: params
    };
  };

  _proto2.preAdditions = function preAdditions(data) {
    if (typeof data === 'string') {
      if (/^[\w:]*\/\//.test(data)) {
        this.nativeRouter.toOutside(data);
        return null;
      }

      return this.locationTransform.urlToLocation(data);
    }

    var eluxLocation = this.payloadToEluxLocation(data);
    return this.locationTransform.eluxLocationToLocation(eluxLocation);
  };

  _proto2.relaunch = function relaunch(data, root, nativeCaller) {
    if (root === void 0) {
      root = false;
    }

    if (nativeCaller === void 0) {
      nativeCaller = false;
    }

    this.addTask(this._relaunch.bind(this, data, root, nativeCaller));
  };

  _proto2._relaunch = function () {
    var _relaunch2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(data, root, nativeCaller) {
      var _this3 = this;

      var preData, location, key, routeState, nativeData, notifyNativeRouter;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.preAdditions(data);

            case 2:
              preData = _context.sent;

              if (preData) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              location = preData;
              key = this._createKey();
              routeState = _extends({}, location, {
                action: 'RELAUNCH',
                key: key
              });
              _context.next = 10;
              return this.getCurrentStore().dispatch(testRouteChangeAction(routeState));

            case 10:
              _context.next = 12;
              return this.getCurrentStore().dispatch(beforeRouteChangeAction(routeState));

            case 12:
              notifyNativeRouter = routeConfig.notifyNativeRouter[root ? 'root' : 'internal'];

              if (!(!nativeCaller && notifyNativeRouter)) {
                _context.next = 17;
                break;
              }

              _context.next = 16;
              return this.nativeRouter.execute('relaunch', function () {
                return _this3.locationToNativeData(routeState);
              }, key);

            case 16:
              nativeData = _context.sent;

            case 17:
              this._nativeData = nativeData;
              this.routeState = routeState;
              this.internalUrl = eluxLocationToEluxUrl({
                pathname: routeState.pagename,
                params: routeState.params
              });

              if (root) {
                this.history.relaunch(location, key);
              } else {
                this.history.getCurrentSubHistory().relaunch(location, key);
              }

              this.getCurrentStore().dispatch(routeChangeAction(routeState));
              this.dispatch('change', {
                routeState: routeState,
                root: root
              });

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function _relaunch(_x, _x2, _x3) {
      return _relaunch2.apply(this, arguments);
    }

    return _relaunch;
  }();

  _proto2.push = function push(data, root, nativeCaller) {
    if (root === void 0) {
      root = false;
    }

    if (nativeCaller === void 0) {
      nativeCaller = false;
    }

    this.addTask(this._push.bind(this, data, root, nativeCaller));
  };

  _proto2._push = function () {
    var _push2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2(data, root, nativeCaller) {
      var _this4 = this;

      var preData, location, key, routeState, nativeData, notifyNativeRouter;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.preAdditions(data);

            case 2:
              preData = _context2.sent;

              if (preData) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return");

            case 5:
              location = preData;
              key = this._createKey();
              routeState = _extends({}, location, {
                action: 'PUSH',
                key: key
              });
              _context2.next = 10;
              return this.getCurrentStore().dispatch(testRouteChangeAction(routeState));

            case 10:
              _context2.next = 12;
              return this.getCurrentStore().dispatch(beforeRouteChangeAction(routeState));

            case 12:
              notifyNativeRouter = routeConfig.notifyNativeRouter[root ? 'root' : 'internal'];

              if (!(!nativeCaller && notifyNativeRouter)) {
                _context2.next = 17;
                break;
              }

              _context2.next = 16;
              return this.nativeRouter.execute('push', function () {
                return _this4.locationToNativeData(routeState);
              }, key);

            case 16:
              nativeData = _context2.sent;

            case 17:
              this._nativeData = nativeData;
              this.routeState = routeState;
              this.internalUrl = eluxLocationToEluxUrl({
                pathname: routeState.pagename,
                params: routeState.params
              });

              if (root) {
                this.history.push(location, key, routeState);
              } else {
                this.history.getCurrentSubHistory().push(location, key, routeState);
              }

              !root && this.getCurrentStore().dispatch(routeChangeAction(routeState));
              this.dispatch('change', {
                routeState: routeState,
                root: root
              });

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function _push(_x4, _x5, _x6) {
      return _push2.apply(this, arguments);
    }

    return _push;
  }();

  _proto2.replace = function replace(data, root, nativeCaller) {
    if (root === void 0) {
      root = false;
    }

    if (nativeCaller === void 0) {
      nativeCaller = false;
    }

    this.addTask(this._replace.bind(this, data, root, nativeCaller));
  };

  _proto2._replace = function () {
    var _replace2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee3(data, root, nativeCaller) {
      var _this5 = this;

      var preData, location, key, routeState, nativeData, notifyNativeRouter;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.preAdditions(data);

            case 2:
              preData = _context3.sent;

              if (preData) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return");

            case 5:
              location = preData;
              key = this._createKey();
              routeState = _extends({}, location, {
                action: 'REPLACE',
                key: key
              });
              _context3.next = 10;
              return this.getCurrentStore().dispatch(testRouteChangeAction(routeState));

            case 10:
              _context3.next = 12;
              return this.getCurrentStore().dispatch(beforeRouteChangeAction(routeState));

            case 12:
              notifyNativeRouter = routeConfig.notifyNativeRouter[root ? 'root' : 'internal'];

              if (!(!nativeCaller && notifyNativeRouter)) {
                _context3.next = 17;
                break;
              }

              _context3.next = 16;
              return this.nativeRouter.execute('replace', function () {
                return _this5.locationToNativeData(routeState);
              }, key);

            case 16:
              nativeData = _context3.sent;

            case 17:
              this._nativeData = nativeData;
              this.routeState = routeState;
              this.internalUrl = eluxLocationToEluxUrl({
                pathname: routeState.pagename,
                params: routeState.params
              });

              if (root) {
                this.history.replace(location, key);
              } else {
                this.history.getCurrentSubHistory().replace(location, key);
              }

              this.getCurrentStore().dispatch(routeChangeAction(routeState));
              this.dispatch('change', {
                routeState: routeState,
                root: root
              });

            case 23:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function _replace(_x7, _x8, _x9) {
      return _replace2.apply(this, arguments);
    }

    return _replace;
  }();

  _proto2.back = function back(n, root, options, nativeCaller) {
    if (n === void 0) {
      n = 1;
    }

    if (root === void 0) {
      root = false;
    }

    if (nativeCaller === void 0) {
      nativeCaller = false;
    }

    this.addTask(this._back.bind(this, n, root, options || {}, nativeCaller));
  };

  _proto2._back = function () {
    var _back2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee4(n, root, options, nativeCaller) {
      var _this6 = this;

      var didOverflowRedirect, overflowRedirectUrl, historyRecord, key, pagename, params, routeState, prevRootState, nativeData, notifyNativeRouter;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (n === void 0) {
                n = 1;
              }

              if (!(n < 1)) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", undefined);

            case 3:
              didOverflowRedirect = !!options.overflowRedirect;
              overflowRedirectUrl = typeof options.overflowRedirect === 'string' ? options.overflowRedirect : routeConfig.indexUrl;
              historyRecord = root ? this.history.preBack(n, didOverflowRedirect) : this.history.getCurrentSubHistory().preBack(n, didOverflowRedirect);

              if (historyRecord) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", this.relaunch(overflowRedirectUrl, root));

            case 8:
              key = historyRecord.key, pagename = historyRecord.pagename;
              params = deepMerge(historyRecord.getParams(), options.payload);
              routeState = {
                key: key,
                pagename: pagename,
                params: params,
                action: 'BACK'
              };
              prevRootState = this.getCurrentStore().getState();
              _context4.next = 14;
              return this.getCurrentStore().dispatch(testRouteChangeAction(routeState));

            case 14:
              _context4.next = 16;
              return this.getCurrentStore().dispatch(beforeRouteChangeAction(routeState));

            case 16:
              notifyNativeRouter = routeConfig.notifyNativeRouter[root ? 'root' : 'internal'];

              if (!(!nativeCaller && notifyNativeRouter)) {
                _context4.next = 21;
                break;
              }

              _context4.next = 20;
              return this.nativeRouter.execute('back', function () {
                return _this6.locationToNativeData(routeState);
              }, n, key);

            case 20:
              nativeData = _context4.sent;

            case 21:
              this._nativeData = nativeData;
              this.routeState = routeState;
              this.internalUrl = eluxLocationToEluxUrl({
                pathname: routeState.pagename,
                params: routeState.params
              });

              if (root) {
                this.history.back(n);
              } else {
                this.history.getCurrentSubHistory().back(n);
              }

              this.getCurrentStore().dispatch(routeChangeAction(routeState, prevRootState));
              this.dispatch('change', {
                routeState: routeState,
                root: root
              });

            case 27:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function _back(_x10, _x11, _x12, _x13) {
      return _back2.apply(this, arguments);
    }

    return _back;
  }();

  _proto2.taskComplete = function taskComplete() {
    var task = this.taskList.shift();

    if (task) {
      this.executeTask(task);
    } else {
      this.curTask = undefined;
    }
  };

  _proto2.executeTask = function executeTask(task) {
    this.curTask = task;
    task().finally(this.taskComplete.bind(this));
  };

  _proto2.addTask = function addTask(task) {
    if (this.curTask) {
      this.taskList.push(task);
    } else {
      this.executeTask(task);
    }
  };

  _proto2.destroy = function destroy() {
    this.nativeRouter.destroy();
  };

  return BaseRouter;
}(MultipleDispatcher);