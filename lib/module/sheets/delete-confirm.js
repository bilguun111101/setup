import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Button, CommunityIcon, Result } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
const DeleteConfirmSheet = /*#__PURE__*/memo(({
  route
}) => {
  const {
    onChange
  } = route.params;
  const navigation = useNavigation();
  const sfArea = useSafeAreaInsets();
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerTitle
  }, "\u0411\u04AF\u043B\u044D\u0433 \u0443\u0441\u0442\u0433\u0430\u0445"), /*#__PURE__*/React.createElement(View, {
    style: styles.contentContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.h15
  }), /*#__PURE__*/React.createElement(Result, {
    title: "Бүлэг устгах",
    subTitle: "Та энэ бүлгээ устгахдаа итгэлтэй байна уу?",
    icon: /*#__PURE__*/React.createElement(CommunityIcon, {
      color: Colors.white
    })
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.h15
  }), /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    title: "Зөвшөөрөх",
    style: styles.button,
    onPress: () => {
      navigation.goBack();
      onChange();
    }
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      height: sfArea.bottom
    }
  }));
});
DeleteConfirmSheet.displayName = "DeleteConfirmSheet";
export { DeleteConfirmSheet };
const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    paddingHorizontal: 18
  },
  h10: {
    height: 10
  },
  h15: {
    height: 15
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    lineHeight: 20,
    textAlign: "center",
    color: Colors.primary,
    marginVertical: 12
  },
  contentContainer: {
    backgroundColor: Colors.gray101,
    borderRadius: 12,
    flex: 1
  },
  iconContainer: {
    alignSelf: "center",
    marginTop: 32
  },
  username: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    lineHeight: 18,
    textAlign: "center",
    color: Colors.primary,
    marginHorizontal: 24
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter",
    lineHeight: 18,
    textAlign: "center",
    color: Colors.primary,
    marginHorizontal: 24
  },
  description: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    lineHeight: 15,
    color: Colors.gray103,
    textAlign: "center",
    marginTop: 12,
    marginHorizontal: 24
  },
  button: {
    marginHorizontal: 18
  }
});
//# sourceMappingURL=delete-confirm.js.map