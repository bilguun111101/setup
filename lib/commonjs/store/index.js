"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.persistor = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _reduxPersist = require("redux-persist");
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
var _xsAuthNative = require("@goodtechsoft/xs-auth-native");
var _xsPostNative = require("@goodtechsoft/xs-post-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const persistConfig = {
  key: "root",
  storage: _asyncStorage.default
};
const rootReducer = (0, _toolkit.combineReducers)({
  auth: _xsAuthNative.authReducer,
  post: _xsPostNative.postReducer
});
const persistedReducer = (0, _reduxPersist.persistReducer)(persistConfig, rootReducer);
const store = exports.store = (0, _toolkit.configureStore)({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [_reduxPersist.FLUSH, _reduxPersist.REHYDRATE, _reduxPersist.PAUSE, _reduxPersist.PERSIST, _reduxPersist.PURGE, _reduxPersist.REGISTER]
      }
    });
  }
});
const persistor = exports.persistor = (0, _reduxPersist.persistStore)(store);
//# sourceMappingURL=index.js.map