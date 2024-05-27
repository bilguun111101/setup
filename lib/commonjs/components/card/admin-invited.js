"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminInvitedCard = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _xsNotificationNative = require("@goodtechsoft/xs-notification-native");
var _apis = require("../../apis");
var _swr = _interopRequireWildcard(require("swr"));
var _reactNativeToastNotifications = require("react-native-toast-notifications");
var _infinite = _interopRequireDefault(require("swr/infinite"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AdminInvitedCard = exports.AdminInvitedCard = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    data,
    notifData
  } = props;
  const {
    mutate
  } = (0, _swr.useSWRConfig)();
  const toast = (0, _reactNativeToastNotifications.useToast)();
  const {
    mutate: groupMutate
  } = (0, _swr.default)(`swr.group.${data._id}`);
  const {
    mutate: myGroupMutate
  } = (0, _infinite.default)(index => `swr.group.admin.${index}`);
  const approveAdmin = (0, _react.useCallback)(async () => {
    if (notifData) {
      const _notifData = _xsNotificationNative.Notification.fromJson(notifData);
      _notifData.setIsDone(mutate);
    }
    await _apis.GroupApi.approveAdmin(data._id);
    data.setGroupAdmin(mutate);
    toast.show("Амжилттай админ боллоо", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
    setTimeout(() => {
      groupMutate();
      myGroupMutate();
    }, 300);
  }, []);
  const declineAdmin = (0, _react.useCallback)(async () => {
    if (notifData) {
      const _notifData = _xsNotificationNative.Notification.fromJson(notifData);
      _notifData.setIsDone(mutate);
    }
    await _apis.GroupApi.declineAdmin(data._id);
    toast.show("Амдин болох санал цуцлагдлаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
    data.setDeclineAdmin(mutate);
    setTimeout(() => {
      groupMutate();
    }, 300);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.adminInvited
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.textContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.adminInviteTitle
  }, "\u0410\u0434\u043C\u0438\u043D \u0443\u0440\u0438\u043B\u0433\u0430"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.description
  }, "\u0422\u0430\u043D\u0438\u0439\u0433 \u044D\u043D\u044D \u0431\u04AF\u043B\u044D\u0433\u0442 \u0430\u0434\u043C\u0438\u043D \u0431\u043E\u043B\u043E\u0445 \u0445\u04AF\u0441\u044D\u043B\u0442 \u0438\u0440\u0441\u044D\u043D \u0431\u0430\u0439\u043D\u0430.")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.row
  }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
    title: "\u0417\u04E9\u0432\u0448\u04E9\u04E9\u0440\u04E9\u0445",
    type: "primary",
    onPress: approveAdmin
  }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
    title: "\u0426\u0443\u0446\u043B\u0430\u0445",
    onPress: declineAdmin
  })));
});
AdminInvitedCard.displayName = "AdminInvitedCard";
const styles = _reactNative.StyleSheet.create({
  adminInvited: {
    backgroundColor: _xsCoreNative.Colors.white,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    padding: 18
  },
  firstCol: {
    flex: 1,
    alignItems: "flex-start",
    gap: 4
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10
  },
  adminInviteTitle: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    color: _xsCoreNative.Colors.primary
  },
  textContainer: {
    flex: 1,
    gap: 4
  },
  description: {
    fontSize: 14,
    fontFamily: "Inter",
    color: _xsCoreNative.Colors.gray104
  },
  avatar: {
    borderWidth: 1,
    padding: 4,
    backgroundColor: _xsCoreNative.Colors.gray102,
    borderRadius: 8
  }
});
//# sourceMappingURL=admin-invited.js.map