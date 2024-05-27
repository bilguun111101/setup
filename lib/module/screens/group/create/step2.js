import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";
import React, { memo, useRef } from "react";
import { AppBar, ArrowLeftIcon, Button, Colors, IconSizes } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import { CreateGroupStep2Form } from "../../../components/form/create-2-group";
import { NavigationRoutes } from "../../../navigation";
import { GroupApi } from "../../../apis";
import useSWRInfinite from "swr/infinite";
import { Group } from "../../../models";
import { useSWRConfig } from "swr/_internal";
const CreateStep2Screen = /*#__PURE__*/memo(({
  route
}) => {
  const {
    data: formData
  } = route.params;
  const formRef = useRef(null);
  const {
    mutate
  } = useSWRConfig();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const {
    mutate: myJoinedList
  } = useSWRInfinite(index => `swr.group.my.${index}`);
  const {
    mutate: adminList
  } = useSWRInfinite(index => `swr.group.admin.${index}`);
  const onSubmit = async value => {
    const data = {
      name: formData.name,
      privacy: formData.privacy,
      description: value.description,
      coverImage: value.coverImage,
      category: value.category._id
    };
    try {
      var res = await GroupApi.create(data);
      var resultData = Group.fromJson(res);
      resultData.setNewGroup(mutate);
      navigation.pop(2);
      navigation.navigate(NavigationRoutes.Group_GroupDetailScreen, {
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
  }, /*#__PURE__*/React.createElement(CreateGroupStep2Form, {
    onSubmit: onSubmit,
    formRef: formRef
  }))));
});
CreateStep2Screen.displayName = "CreateStep2Screen";
export { CreateStep2Screen };
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
//# sourceMappingURL=step2.js.map