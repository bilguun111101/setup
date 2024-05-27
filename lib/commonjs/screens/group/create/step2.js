"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateStep2Screen = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
var _elements = require("@react-navigation/elements");
var _create2Group = require("../../../components/form/create-2-group");
var _navigation = require("../../../navigation");
var _apis = require("../../../apis");
var _infinite = _interopRequireDefault(require("swr/infinite"));
var _models = require("../../../models");
var _internal = require("swr/_internal");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CreateStep2Screen = exports.CreateStep2Screen = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const {
    data: formData
  } = route.params;
  const formRef = (0, _react.useRef)(null);
  const {
    mutate
  } = (0, _internal.useSWRConfig)();
  const headerHeight = (0, _elements.useHeaderHeight)();
  const navigation = (0, _native.useNavigation)();
  const {
    mutate: myJoinedList
  } = (0, _infinite.default)(index => `swr.group.my.${index}`);
  const {
    mutate: adminList
  } = (0, _infinite.default)(index => `swr.group.admin.${index}`);
  const onSubmit = async value => {
    const data = {
      name: formData.name,
      privacy: formData.privacy,
      description: value.description,
      coverImage: value.coverImage,
      category: value.category._id
    };
    try {
      var res = await _apis.GroupApi.create(data);
      var resultData = _models.Group.fromJson(res);
      resultData.setNewGroup(mutate);
      navigation.pop(2);
      navigation.navigate(_navigation.NavigationRoutes.Group_GroupDetailScreen, {
        payload: resultData
      });
      setTimeout(() => {
        myJoinedList();
        adminList();
      }, 300);
    } catch (err) {
      console.log(err);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_xsCoreNative.AppBar, {
    left: /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      type: "text",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowLeftIcon, {
        size: _xsCoreNative.IconSizes.Large,
        color: _xsCoreNative.Colors.primary
      }),
      onPress: () => navigation.goBack()
    }),
    center: /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.title
    }, "\u0411\u04AF\u043B\u044D\u0433 \u04AF\u04AF\u0441\u0433\u044D\u0445")
  }), /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
    style: styles.root,
    behavior: _reactNative.Platform.OS === "ios" ? "padding" : "height",
    keyboardVerticalOffset: headerHeight
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_create2Group.CreateGroupStep2Form, {
    onSubmit: onSubmit,
    formRef: formRef
  }))));
});
CreateStep2Screen.displayName = "CreateStep2Screen";
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.white
  },
  container: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10
  },
  title: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600",
    color: _xsCoreNative.Colors.primary
  }
});
//# sourceMappingURL=step2.js.map