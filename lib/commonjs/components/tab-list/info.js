"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoTabScreen = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _reactNativeCollapsibleTabView = require("react-native-collapsible-tab-view");
var _descriptionForm = require("../form/description-form");
var _internal = require("swr/_internal");
var _apis = require("../../apis");
var _formResult = require("../layout/form-result");
var _ruleForm = require("../form/rule-form");
var _reactNativeToastNotifications = require("react-native-toast-notifications");
var _timeformat = require("../../utils/timeformat");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const InfoTabScreen = exports.InfoTabScreen = /*#__PURE__*/(0, _react.memo)(props => {
  const {
    data
  } = props;
  const {
    mutate
  } = (0, _internal.useSWRConfig)();
  const descriptionRef = (0, _react.useRef)(null);
  const toast = (0, _reactNativeToastNotifications.useToast)();
  const sfArea = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const descriptionData = (0, _react.useMemo)(() => {
    if (data?.description) {
      return {
        description: data?.description,
        type: "confirm"
      };
    }
    return {
      description: undefined,
      type: ""
    };
  }, [data?.description]);
  const onDescriptionSubmit = (0, _react.useCallback)(async values => {
    const groupForm = {
      description: values.description
    };
    try {
      const formData = await _apis.GroupApi.descriptionChange({
        id: data._id,
        data: groupForm || ""
      });
      data.setDescription(mutate, formData);
      toast.show("Амжилттай солигдлоо", {
        placement: "bottom",
        duration: 2000,
        animationType: "slide-in"
      });
    } catch (err) {
      descriptionRef.current?.setErrors({
        email: err.message || ""
      });
    }
  }, [mutate, data]);
  const ruleRef = (0, _react.useRef)(null);
  const ruleData = (0, _react.useMemo)(() => {
    if (data?.rule) {
      return {
        rule: data?.rule,
        type: "confirm"
      };
    }
    return {
      rule: undefined,
      type: ""
    };
  }, [data?.rule]);
  const onRuleSubmit = (0, _react.useCallback)(async values => {
    const groupForm = {
      rule: values.rule
    };
    try {
      const formData = await _apis.GroupApi.ruleChange({
        id: data._id,
        data: groupForm || ""
      });
      data.setRule(mutate, formData);
      toast.show("Амжилттай солигдлоо", {
        placement: "bottom",
        duration: 2000,
        animationType: "slide-in"
      });
    } catch (err) {
      descriptionRef.current?.setErrors({
        email: err.message || ""
      });
    }
  }, [mutate, data]);
  const descriptionRender = (0, _react.useCallback)(() => {
    if (data.isAdmin) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_descriptionForm.DescriptionForm, {
        ref: descriptionRef,
        payload: descriptionData,
        onSubmit: onDescriptionSubmit
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.h10
      }));
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_formResult.ResultForm, {
      title: "Тайлбар",
      description: data.description
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h10
    }));
  }, []);
  const ruleRender = (0, _react.useCallback)(() => {
    if (data.isAdmin) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ruleForm.RuleForm, {
        ref: ruleRef,
        payload: ruleData,
        onSubmit: onRuleSubmit
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.h10
      }));
    }
    if (data.rule) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_formResult.ResultForm, {
        title: "Дүрэм",
        description: data.rule
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.h10
      }));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, data.isJoined || data.privacy === "PUBLIC" ? /*#__PURE__*/_react.default.createElement(_reactNativeCollapsibleTabView.Tabs.ScrollView, {
    showsVerticalScrollIndicator: false,
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  }), descriptionRender(), ruleRender(), /*#__PURE__*/_react.default.createElement(_formResult.ResultForm, {
    title: "\u041D\u044D\u044D\u0433\u0434\u0441\u044D\u043D \u043E\u0433\u043D\u043E\u043E",
    description: `${(0, _timeformat.timeFormat)(data.createdAt)}`
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height: sfArea.bottom
    }
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }));
});
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  h10: {
    height: 10
  },
  h15: {
    height: 15
  },
  h4: {
    height: 4
  },
  w4: {
    width: 4
  },
  ph18: {
    paddingHorizontal: 18
  }
});
InfoTabScreen.displayName = "InfoTabScreen";
//# sourceMappingURL=info.js.map