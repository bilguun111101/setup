"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleForm = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var yup = _interopRequireWildcard(require("yup"));
var _rowButton = require("../row-button");
var _formResult = require("../layout/form-result");
var _addItem = require("../layout/add-item");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const schema = yup.object().shape({});
const RuleForm = exports.RuleForm = /*#__PURE__*/(0, _react.forwardRef)(({
  onSubmit,
  payload
}, ref) => {
  const formRef = (0, _react.useRef)(null);
  const data = (0, _react.useMemo)(() => {
    return payload;
  }, [payload]);
  (0, _react.useImperativeHandle)(ref, () => ({
    submit() {
      formRef.current?.submit();
    }
  }));
  const onCancel = (0, _react.useCallback)(setFieldValue => {
    if (payload.rule) {
      setFieldValue("type", "confirm");
      return;
    }
    setFieldValue("type", "");
  }, [payload]);
  (0, _react.useEffect)(() => {
    if (formRef) {
      formRef.current?.setFieldValue("type", payload?.type);
      formRef.current?.setFieldValue("rule", payload?.rule);
    }
  }, [payload]);
  return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Form, {
    ref: formRef,
    onSubmit: onSubmit,
    initialValues: data,
    validationSchema: schema
  }, ({
    values,
    setFieldValue
  }) => {
    if (!values.type) {
      return /*#__PURE__*/_react.default.createElement(_addItem.AddItem, {
        title: "Бүлгийн дүрэм",
        onPress: () => setFieldValue("type", "edit")
      });
    }
    if (values.type === "confirm") {
      return /*#__PURE__*/_react.default.createElement(_formResult.ResultForm, {
        title: "Дүрэм",
        description: values.rule,
        onPress: () => setFieldValue("type", "edit")
      });
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.card
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Field, {
      name: "rule"
    }, ({
      onChange,
      value,
      error
    }) => {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.TextInput, {
        error: error,
        multiline: true,
        onChangeText: onChange,
        placeholder: "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u0434\u04AF\u0440\u044D\u043C",
        style: styles.input,
        value: value,
        label: "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u0434\u04AF\u0440\u044D\u043C"
      });
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h10
    }), /*#__PURE__*/_react.default.createElement(_rowButton.RowButton, {
      onPress: () => {
        formRef.current?.submit();
        setFieldValue("type", "confirm");
      },
      onCancel: () => onCancel(setFieldValue)
    }));
  });
});
RuleForm.displayName = "RuleForm";
const styles = _reactNative.StyleSheet.create({
  card: {
    backgroundColor: _xsCoreNative.Colors.white,
    borderRadius: 10,
    padding: 18
  },
  h10: {
    height: 10
  },
  rule: {
    fontWeight: "400",
    fontFamily: "Inter",
    fontSize: 12,
    lineHeight: 16,
    color: _xsCoreNative.Colors.gray104,
    marginVertical: 10
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _xsCoreNative.Colors.gray101
  }
});
//# sourceMappingURL=rule-form.js.map