import { AppBar, ArrowLeftIcon, Button, CheckIcon, Colors, Field, Form, IconSizes, TextInput } from "@goodtechsoft/xs-core-native";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as yup from "yup";
const schema = yup.object().shape({
  name: yup.string().required("Заавал бөглөнө!").max(43, "Нэр ихдээ 43 тэмдэгтээс тогтоно")
});
const ChangeNameForm = /*#__PURE__*/React.memo(({
  action,
  onSubmit
}) => {
  const data = useMemo(() => {
    return {
      firstName: undefined,
      ...(action && action[0] === "update" ? action[1] : {})
    };
  }, [action]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Form, {
    initialValues: data,
    onSubmit: onSubmit,
    validationSchema: schema
  }, ({
    handleSubmit
  }) => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppBar, {
      useSafeArea: false,
      left: /*#__PURE__*/React.createElement(Button, {
        type: "text",
        icon: /*#__PURE__*/React.createElement(ArrowLeftIcon, {
          color: Colors.primary,
          size: IconSizes.ExtraLarge
        })
      }),
      right: /*#__PURE__*/React.createElement(Button, {
        onPress: handleSubmit,
        type: "text",
        icon: /*#__PURE__*/React.createElement(CheckIcon, {
          color: Colors.primary,
          size: IconSizes.ExtraLarge
        })
      }),
      center: /*#__PURE__*/React.createElement(Text, {
        style: styles.title
      }, "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u043D\u044D\u0440 \u0441\u043E\u043B\u0438\u0445")
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.body
    }, /*#__PURE__*/React.createElement(Field, {
      name: "name"
    }, ({
      value,
      onChange,
      error
    }) => /*#__PURE__*/React.createElement(TextInput, {
      label: "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u043D\u044D\u0440",
      error: error,
      autoFocus: true,
      useBottomSheet: true,
      value: value,
      onChangeText: text => onChange(text),
      onSubmitEditing: () => handleSubmit(),
      placeholder: "Нэр",
      placeholderTextColor: Colors.gray103,
      returnKeyLabel: "go"
    }))));
  }));
});
ChangeNameForm.displayName = "ChangeNameForm";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  body: {
    marginTop: 0,
    margin: 18,
    padding: 24,
    borderRadius: 12,
    backgroundColor: Colors.gray101
  },
  title: {
    fontSize: 16,
    color: Colors.primary,
    fontFamily: "Inter",
    fontWeight: "500"
  }
});
export { ChangeNameForm };
//# sourceMappingURL=change-name.js.map