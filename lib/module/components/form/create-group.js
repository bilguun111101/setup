import React, { memo } from "react";
import { ArrowBottomIcon, Button, Colors, Field, Form, IconSizes, TextInput } from "@goodtechsoft/xs-core-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation";
import * as yup from "yup";
import { GroupVector } from "../../assets/image/group-vector";
const schema = yup.object().shape({
  name: yup.string().required("Заавал бөглөнө!"),
  privacy: yup.object().required("Заавал бөглөнө!")
});
const CreateGroupForm = /*#__PURE__*/memo(({
  onSubmit,
  formRef
}) => {
  const navigation = useNavigation();
  return /*#__PURE__*/React.createElement(Form, {
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
    return /*#__PURE__*/React.createElement(View, {
      style: styles.container
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.contentContainer
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.iconContainer
    }, /*#__PURE__*/React.createElement(GroupVector, null)), /*#__PURE__*/React.createElement(View, {
      style: styles.h20
    }), /*#__PURE__*/React.createElement(Field, {
      name: "name"
    }, ({
      value,
      onChange,
      error
    }) => {
      return /*#__PURE__*/React.createElement(TextInput, {
        label: "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u043D\u044D\u0440",
        error: error,
        value: value,
        onChangeText: onChange,
        placeholder: "\u042D\u043D\u0434 \u043D\u044D\u0440\u044D\u044D \u0431\u0438\u0447\u043D\u044D \u04AF\u04AF",
        placeholderTextColor: Colors.gray103,
        style: error ? [styles.input, styles.error] : styles.input
      });
    }), /*#__PURE__*/React.createElement(Text, {
      style: styles.description
    }, "\u04E8\u04E9\u0440\u0438\u0439\u043D \u0431\u0440\u044D\u043D\u0434, \u0431\u0438\u0437\u043D\u0435\u0441, \u044D\u0441\u0432\u044D\u043B \u0431\u0430\u0439\u0433\u0443\u0443\u043B\u043B\u0430\u0433\u044B\u043D \u043D\u044D\u0440 \u0437\u044D\u0440\u044D\u0433 \u0445\u0443\u0443\u0434\u0441\u0430\u0430 \u0442\u0430\u043D\u0438\u043B\u0446\u0443\u0443\u043B\u0430\u0445\u0430\u0434 \u0430\u0448\u0438\u0433\u043B\u0430\u0445 \u043D\u044D\u0440\u0438\u0439\u0433 \u043E\u0440\u0443\u0443\u043B\u043D\u0430 \u0443\u0443."), /*#__PURE__*/React.createElement(View, {
      style: styles.h20
    }), /*#__PURE__*/React.createElement(Field, {
      name: "privacy"
    }, ({
      value,
      error
    }) => {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
        style: styles.row
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.labelStyle
      }, "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u043D\u0443\u0443\u0446\u043B\u0430\u043B"), /*#__PURE__*/React.createElement(Text, {
        style: styles.errorText
      }, error)), /*#__PURE__*/React.createElement(TouchableOpacity, {
        onPress: () => navigation.navigate(NavigationRoutes.Group_ChangePrivacySheet, {
          onChange: setFieldValue
        }),
        style: error ? [styles.fieldContainer, styles.error] : styles.fieldContainer
      }, /*#__PURE__*/React.createElement(Text, {
        style: [styles.containerTitle, value && styles.primary]
      }, value ? value.name : "Нууцлал"), /*#__PURE__*/React.createElement(ArrowBottomIcon, {
        size: IconSizes.Medium,
        color: Colors.primary
      })));
    }), /*#__PURE__*/React.createElement(Text, {
      style: styles.description
    }, "\u0422\u0430\u043D\u044B \u0445\u0443\u0443\u0434\u0441\u0430\u043D\u0434 \u0442\u043E\u0445\u0438\u0440\u043E\u0445 \u0445\u0430\u043C\u0433\u0438\u0439\u043D \u043E\u043D\u043E\u0432\u0447\u0442\u043E\u0439 \u0430\u043D\u0433\u0438\u043B\u0430\u043B\u044B\u0433 \u0441\u043E\u043D\u0433\u043E\u043D\u043E \u0443\u0443.")), /*#__PURE__*/React.createElement(View, {
      style: styles.h20
    }), /*#__PURE__*/React.createElement(Button, {
      title: "\u04AE\u0440\u0433\u044D\u043B\u0436\u043B\u04AF\u04AF\u043B\u044D\u0445",
      type: "primary",
      onPress: handleSubmit
    }));
  });
});
CreateGroupForm.displayName = "CreateGroupForm";
export { CreateGroupForm };
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  errorText: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.sub200
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray102
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24
  },
  error: {
    borderColor: Colors.sub200
  },
  labelStyle: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary,
    marginBottom: 8
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: Colors.gray102,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  fieldStyle: {
    color: Colors.gray103,
    lineHeight: 18,
    fontFamily: "Inter",
    fontWeight: "400"
  },
  primary: {
    color: Colors.primary
  },
  containerTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.gray103
  },
  contentContainer: {
    borderWidth: 1,
    borderColor: Colors.gray102,
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
    color: Colors.gray104
  },
  dropdown: {
    height: 44,
    borderColor: Colors.gray102,
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 8,
    paddingLeft: 15
  },
  placeholderStyle: {
    fontFamily: "Inter",
    color: Colors.gray103,
    fontSize: 14
  },
  selectedTextStyle: {
    fontFamily: "Inter",
    color: Colors.primary,
    fontSize: 14
  }
});
//# sourceMappingURL=create-group.js.map