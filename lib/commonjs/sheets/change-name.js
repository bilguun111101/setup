"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeNameSheet = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactNativeToastNotifications = require("react-native-toast-notifications");
var _swr = require("swr");
var _native = require("@react-navigation/native");
var _apis = require("../apis");
var _changeName = require("../components/form/change-name");
var _models = require("../models");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ChangeNameSheet = exports.ChangeNameSheet = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const {
    payload
  } = route.params;
  const {
    mutate
  } = (0, _swr.useSWRConfig)();
  const toast = (0, _reactNativeToastNotifications.useToast)();
  const navigation = (0, _native.useNavigation)();
  const data = (0, _react.useMemo)(() => {
    if (payload && payload.name) {
      return ["update", {
        name: payload.name
      }];
    }
    return ["update", {
      name: undefined
    }];
  }, [payload]);
  const onSubmit = async values => {
    navigation.goBack();
    const _group = _models.Group.fromJson(payload);
    _group.name = values.name;
    _group.setName(mutate, _group);
    try {
      await _apis.GroupApi.nameChange({
        id: payload._id,
        data: values
      });
      toast.show("Амжилттай солигдлоо", {
        placement: "bottom",
        duration: 2000,
        animationType: "slide-in"
      });
    } catch (err) {
      console.log(err);
    }
    _reactNative.Keyboard.dismiss();
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_changeName.ChangeNameForm, {
    onSubmit: onSubmit,
    action: data
  }));
});
ChangeNameSheet.displayName = "ChangeNameSheet";
//# sourceMappingURL=change-name.js.map