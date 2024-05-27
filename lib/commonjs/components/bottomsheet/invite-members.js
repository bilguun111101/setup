"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InviteMemberSheet = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _bottomSheet = _interopRequireDefault(require("@gorhom/bottom-sheet"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
var _navigation = require("../../navigation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const InviteMemberSheet = exports.InviteMemberSheet = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    payload
  } = props;
  const bottomSheetRef = (0, _react.useRef)(null);
  const navigation = (0, _native.useNavigation)();
  const listHeaderComponent = (0, _react.useCallback)(() => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.headerContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.titleContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.title
    }, payload.name)));
  }, []);
  const listFooterComponent = (0, _react.useCallback)(() => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footer
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      onPress: () => navigation.navigate(_navigation.NavigationRoutes.Group_InviteUsersScreen, {
        payload: payload
      }),
      title: "Жагсаалт"
    }));
  }, [payload, navigation]);
  return /*#__PURE__*/_react.default.createElement(_bottomSheet.default, {
    ref: bottomSheetRef,
    snapPoints: [260],
    index: 0,
    enablePanDownToClose: true,
    handleIndicatorStyle: styles.handleIndicator,
    backgroundStyle: styles.background,
    style: styles.bottomSheet
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, listHeaderComponent(), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Empty, {
    title: "\u041D\u0430\u0439\u0437\u0443\u0443\u0434\u0430\u0430 \u0443\u0440\u0438\u0445",
    description: "",
    icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.CommunityIcon, {
      color: _xsCoreNative.Colors.white,
      size: _xsCoreNative.IconSizes.ExtraLarge
    })
  }), listFooterComponent()));
});
InviteMemberSheet.displayName = "InviteMemberSheet";
const styles = _reactNative.StyleSheet.create({
  root: {
    backgroundColor: _xsCoreNative.Colors.base100,
    flex: 1
  },
  h15: {
    height: 15
  },
  contentContainer: {
    padding: 16,
    backgroundColor: "white"
  },
  empty: {
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: _xsCoreNative.Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    backgroundColor: "white"
  },
  handleIndicator: {
    backgroundColor: "gray"
  },
  background: {
    backgroundColor: _xsCoreNative.Colors.white
  },
  listStyle: {},
  listContent: {
    marginTop: 10,
    backgroundColor: _xsCoreNative.Colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 20
  },
  headerContainer: {
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  inputContainer: {
    padding: 18,
    backgroundColor: _xsCoreNative.Colors.white
  },
  input: {
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  titleContainer: {
    backgroundColor: _xsCoreNative.Colors.white,
    paddingTop: 10
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "500",
    color: _xsCoreNative.Colors.primary,
    textAlign: "center"
  },
  footer: {
    paddingHorizontal: 18
  }
});
//# sourceMappingURL=invite-members.js.map