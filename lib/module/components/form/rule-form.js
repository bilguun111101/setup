import { StyleSheet, View } from "react-native";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { Colors, Field, Form, TextInput } from "@goodtechsoft/xs-core-native";
import * as yup from "yup";
import { RowButton } from "../row-button";
import { ResultForm } from "../layout/form-result";
import { AddItem } from "../layout/add-item";
const schema = yup.object().shape({});
const RuleForm = /*#__PURE__*/forwardRef(({
  onSubmit,
  payload
}, ref) => {
  const formRef = useRef(null);
  const data = useMemo(() => {
    return payload;
  }, [payload]);
  useImperativeHandle(ref, () => ({
    submit() {
      formRef.current?.submit();
    }
  }));
  const onCancel = useCallback(setFieldValue => {
    if (payload.rule) {
      setFieldValue("type", "confirm");
      return;
    }
    setFieldValue("type", "");
  }, [payload]);
  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldValue("type", payload?.type);
      formRef.current?.setFieldValue("rule", payload?.rule);
    }
  }, [payload]);
  return /*#__PURE__*/React.createElement(Form, {
    ref: formRef,
    onSubmit: onSubmit,
    initialValues: data,
    validationSchema: schema
  }, ({
    values,
    setFieldValue
  }) => {
    if (!values.type) {
      return /*#__PURE__*/React.createElement(AddItem, {
        title: "Бүлгийн дүрэм",
        onPress: () => setFieldValue("type", "edit")
      });
    }
    if (values.type === "confirm") {
      return /*#__PURE__*/React.createElement(ResultForm, {
        title: "Дүрэм",
        description: values.rule,
        onPress: () => setFieldValue("type", "edit")
      });
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.card
    }, /*#__PURE__*/React.createElement(Field, {
      name: "rule"
    }, ({
      onChange,
      value,
      error
    }) => {
      return /*#__PURE__*/React.createElement(TextInput, {
        error: error,
        multiline: true,
        onChangeText: onChange,
        placeholder: "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u0434\u04AF\u0440\u044D\u043C",
        style: styles.input,
        value: value,
        label: "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u0434\u04AF\u0440\u044D\u043C"
      });
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.h10
    }), /*#__PURE__*/React.createElement(RowButton, {
      onPress: () => {
        formRef.current?.submit();
        setFieldValue("type", "confirm");
      },
      onCancel: () => onCancel(setFieldValue)
    }));
  });
});
RuleForm.displayName = "RuleForm";
export { RuleForm };
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
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
    color: Colors.gray104,
    marginVertical: 10
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.gray101
  }
});
//# sourceMappingURL=rule-form.js.map