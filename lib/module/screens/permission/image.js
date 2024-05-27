import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { AppBar, ArrowLeftIcon, Button, Colors, IconSizes } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { NavigationRoutes, RootStackParamList } from "../../navigation/types";

// type Props = NativeStackScreenProps<
//   RootStackParamList,
//   NavigationRoutes.Group_ImagePermissionScreen
// >;

const ImagePermissionScreen = /*#__PURE__*/memo(() => {
  const navigation = useNavigation();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppBar, {
    left: /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement(ArrowLeftIcon, {
        color: Colors.primary,
        size: IconSizes.ExtraLarge
      }),
      type: "text",
      onPress: () => navigation.goBack()
    }),
    center: /*#__PURE__*/React.createElement(Text, {
      style: styles.headerTitle
    }, "\u0422\u043E\u0445\u0438\u0440\u0433\u043E\u043E"),
    useBorderRadius: true
  }), /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.card
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.h20
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.labelStyle
  }, "\u0422\u043E\u0445\u0438\u0440\u0433\u043E\u043E"), /*#__PURE__*/React.createElement(View, {
    style: styles.h6
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.descriptionStyle
  }, "\u0422\u0430 \u0437\u0443\u0440\u0430\u0433\u0442\u0430\u0439 \u043F\u043E\u0441\u0442 \u043D\u0438\u0439\u0442\u043B\u044D\u0445\u0438\u0439\u043D \u0442\u0443\u043B\u0434 \u0433\u0430\u043B\u043B\u0435\u0440\u0435\u0439 \u0431\u043E\u043B\u043E\u043D \u043A\u0430\u043C\u0435\u0440\u0430 \u0430\u0448\u0438\u0433\u043B\u0430\u0445 \u044D\u0440\u0445\u0438\u0439\u0433 \u043D\u044D\u044D\u0445 \u0448\u0430\u0430\u0440\u0434\u043B\u0430\u0433\u0430\u0442\u0430\u0439."), /*#__PURE__*/React.createElement(View, {
    style: styles.h28
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.wrapper
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.h8
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.h28
  }), /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    style: styles.btn,
    title: "\u0422\u043E\u0445\u0438\u0440\u0433\u043E\u043E \u0446\u044D\u0441\u0440\u04AF\u04AF \u0448\u0438\u043B\u0436\u0438\u0445",
    onPress: () => {
      Linking.openSettings();
    }
  }))));
});
ImagePermissionScreen.displayName = "ImagePermissionScreen";
export { ImagePermissionScreen };
const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: Colors.primary,
    lineHeight: 20
  },
  root: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginTop: 8
  },
  h6: {
    height: 6
  },
  h8: {
    height: 8
  },
  h20: {
    height: 20
  },
  h28: {
    height: 28
  },
  card: {
    backgroundColor: Colors.gray101,
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignSelf: "stretch"
  },
  btn: {
    width: "100%"
  },
  wrapper: {},
  labelStyle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    fontFamily: "Inter",
    color: Colors.primary
  },
  descriptionStyle: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Inter",
    color: Colors.gray103
  }
});
//# sourceMappingURL=image.js.map