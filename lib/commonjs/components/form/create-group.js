"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateGroupForm = void 0;
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _navigation = require("../../navigation");
var yup = _interopRequireWildcard(require("yup"));
var _groupVector = require("../../assets/image/group-vector");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const schema = yup.object().shape({
  name: yup.string().required("Заавал бөглөнө!"),
  privacy: yup.object().required("Заавал бөглөнө!")
});
const CreateGroupForm = exports.CreateGroupForm = /*#__PURE__*/(0, _react.memo)(({
  onSubmit,
  formRef
}) => {
  const navigation = (0, _native.useNavigation)();
  return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Form, {
    onSubmit: onSubmit,
    initialValues: {
      name: undefined,
      privacy: undefined
    },
    validationSchema: schema,
    ref: formRef
  }, ({
    handleSubmit,
    setFieldValue
  }) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.contentContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.iconContainer
    }, /*#__PURE__*/_react.default.createElement(_groupVector.GroupVector, null)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h20
    }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Field, {
      name: "name"
    }, ({
      value,
      onChange,
      error
    }) => {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.TextInput, {
        label: "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u043D\u044D\u0440",
        error: error,
        value: value,
        onChangeText: onChange,
        placeholder: "\u042D\u043D\u0434 \u043D\u044D\u0440\u044D\u044D \u0431\u0438\u0447\u043D\u044D \u04AF\u04AF",
        placeholderTextColor: _xsCoreNative.Colors.gray103,
        style: error ? [styles.input, styles.error] : styles.input
      });
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.description
    }, "\u04E8\u04E9\u0440\u0438\u0439\u043D \u0431\u0440\u044D\u043D\u0434, \u0431\u0438\u0437\u043D\u0435\u0441, \u044D\u0441\u0432\u044D\u043B \u0431\u0430\u0439\u0433\u0443\u0443\u043B\u043B\u0430\u0433\u044B\u043D \u043D\u044D\u0440 \u0437\u044D\u0440\u044D\u0433 \u0445\u0443\u0443\u0434\u0441\u0430\u0430 \u0442\u0430\u043D\u0438\u043B\u0446\u0443\u0443\u043B\u0430\u0445\u0430\u0434 \u0430\u0448\u0438\u0433\u043B\u0430\u0445 \u043D\u044D\u0440\u0438\u0439\u0433 \u043E\u0440\u0443\u0443\u043B\u043D\u0430 \u0443\u0443."), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h20
    }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Field, {
      name: "privacy"
    }, ({
      value,
      error
    }) => {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.row
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.labelStyle
      }, "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u043D\u0443\u0443\u0446\u043B\u0430\u043B"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.errorText
      }, error)), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: () => navigation.navigate(_navigation.NavigationRoutes.Group_ChangePrivacySheet, {
          onChange: setFieldValue
        }),
        style: error ? [styles.fieldContainer, styles.error] : styles.fieldContainer
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: [styles.containerTitle, value && styles.primary]
      }, value ? value.name : "Нууцлал"), /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowBottomIcon, {
        size: _xsCoreNative.IconSizes.Medium,
        color: _xsCoreNative.Colors.primary
      })));
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.description
    }, "\u0422\u0430\u043D\u044B \u0445\u0443\u0443\u0434\u0441\u0430\u043D\u0434 \u0442\u043E\u0445\u0438\u0440\u043E\u0445 \u0445\u0430\u043C\u0433\u0438\u0439\u043D \u043E\u043D\u043E\u0432\u0447\u0442\u043E\u0439 \u0430\u043D\u0433\u0438\u043B\u0430\u043B\u044B\u0433 \u0441\u043E\u043D\u0433\u043E\u043D\u043E \u0443\u0443.")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h20
    }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      title: "\u04AE\u0440\u0433\u044D\u043B\u0436\u043B\u04AF\u04AF\u043B\u044D\u0445",
      type: "primary",
      onPress: handleSubmit
    }));
  });
});
CreateGroupForm.displayName = "CreateGroupForm";
const styles = _reactNative.StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  errorText: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: _xsCoreNative.Colors.sub200
  },
  input: {
    borderWidth: 1,
    borderColor: _xsCoreNative.Colors.gray102
  },
  container: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.white,
    paddingHorizontal: 24
  },
  error: {
    borderColor: _xsCoreNative.Colors.sub200
  },
  labelStyle: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: _xsCoreNative.Colors.primary,
    marginBottom: 8
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: _xsCoreNative.Colors.gray102,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  fieldStyle: {
    color: _xsCoreNative.Colors.gray103,
    lineHeight: 18,
    fontFamily: "Inter",
    fontWeight: "400"
  },
  primary: {
    color: _xsCoreNative.Colors.primary
  },
  containerTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "400",
    color: _xsCoreNative.Colors.gray103
  },
  contentContainer: {
    borderWidth: 1,
    borderColor: _xsCoreNative.Colors.gray102,
    borderRadius: 12,
    paddingVertical: 32,
    paddingHorizontal: 20
  },
  iconContainer: {
    alignSelf: "center"
  },
  h20: {
    height: 20
  },
  description: {
    marginTop: 8,
    fontWeight: "400",
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 13,
    color: _xsCoreNative.Colors.gray104
  },
  dropdown: {
    height: 44,
    borderColor: _xsCoreNative.Colors.gray102,
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 8,
    paddingLeft: 15
  },
  placeholderStyle: {
    fontFamily: "Inter",
    color: _xsCoreNative.Colors.gray103,
    fontSize: 14
  },
  selectedTextStyle: {
    fontFamily: "Inter",
    color: _xsCoreNative.Colors.primary,
    fontSize: 14
  }
});
//# sourceMappingURL=create-group.js.map