import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";
import React, { memo, useRef } from "react";
import { AppBar, ArrowLeftIcon, Button, Colors, IconSizes } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import { CreateGroupForm } from "../../../components/form/create-group";
import { NavigationRoutes } from "../../../navigation";
const CreateScreen = /*#__PURE__*/memo(() => {
  const formRef = useRef(null);
  const headerHeight = useHeaderHeight();
  const onSubmit = async value => {
    const data = {
      name: value.name,
      privacy: value.privacy.value
    };
    navigation.navigate(NavigationRoutes.Group_CreateStep2Screen, {
      data: data
    });
  };
  const navigation = useNavigation();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppBar, {
    left: /*#__PURE__*/React.createElement(Button, {
      type: "text",
      icon: /*#__PURE__*/React.createElement(ArrowLeftIcon, {
        size: IconSizes.Large,
        color: Colors.primary
      }),
      onPress: () => navigation.goBack()
    }),
    center: /*#__PURE__*/React.createElement(Text, {
      style: styles.title
    }, "\u0411\u04AF\u043B\u044D\u0433 \u04AF\u04AF\u0441\u0433\u044D\u0445")
  }), /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
    style: styles.root,
    behavior: Platform.OS === "ios" ? "padding" : "height",
    keyboardVerticalOffset: headerHeight
  }, /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(CreateGroupForm, {
    onSubmit: onSubmit,
    formRef: formRef
  }))));
});
CreateScreen.displayName = "CreateScreen";
export { CreateScreen };
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10
  },
  title: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary
  }
});
//# sourceMappingURL=step1.js.map