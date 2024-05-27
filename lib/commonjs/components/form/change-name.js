"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeNameForm = void 0;
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const schema = yup.object().shape({
  name: yup.string().required("Заавал бөглөнө!").max(43, "Нэр ихдээ 43 тэмдэгтээс тогтоно")
});
const ChangeNameForm = exports.ChangeNameForm = /*#__PURE__*/_react.default.memo(({
  action,
  onSubmit
}) => {
  const data = (0, _react.useMemo)(() => {
    return {
      firstName: undefined,
      ...(action && action[0] === "update" ? action[1] : {})
    };
  }, [action]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Form, {
    initialValues: data,
    onSubmit: onSubmit,
    validationSchema: schema
  }, ({
    handleSubmit
  }) => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_xsCoreNative.AppBar, {
      useSafeArea: false,
      left: /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        type: "text",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowLeftIcon, {
          color: _xsCoreNative.Colors.primary,
          size: _xsCoreNative.IconSizes.ExtraLarge
        })
      }),
      right: /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
        onPress: handleSubmit,
        type: "text",
        icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.CheckIcon, {
          color: _xsCoreNative.Colors.primary,
          size: _xsCoreNative.IconSizes.ExtraLarge
        })
      }),
      center: /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.title
      }, "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u043D\u044D\u0440 \u0441\u043E\u043B\u0438\u0445")
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.body
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Field, {
      name: "name"
    }, ({
      value,
      onChange,
      error
    }) => /*#__PURE__*/_react.default.createElement(_xsCoreNative.TextInput, {
      label: "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u043D\u044D\u0440",
      error: error,
      autoFocus: true,
      useBottomSheet: true,
      value: value,
      onChangeText: text => onChange(text),
      onSubmitEditing: () => handleSubmit(),
      placeholder: "Нэр",
      placeholderTextColor: _xsCoreNative.Colors.gray103,
      returnKeyLabel: "go"
    }))));
  }));
});
ChangeNameForm.displayName = "ChangeNameForm";
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.white
  },
  body: {
    marginTop: 0,
    margin: 18,
    padding: 24,
    borderRadius: 12,
    backgroundColor: _xsCoreNative.Colors.gray101
  },
  title: {
    fontSize: 16,
    color: _xsCoreNative.Colors.primary,
    fontFamily: "Inter",
    fontWeight: "500"
  }
});
//# sourceMappingURL=change-name.js.map