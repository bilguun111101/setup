import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Button, Colors } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const RuleSheet = /*#__PURE__*/memo(({
  route
}) => {
  const sfArea = useSafeAreaInsets();
  const {
    onPress
  } = route.params;
  const navigation = useNavigation();
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerTitle
  }, "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u0434\u04AF\u0440\u044D\u043C"), /*#__PURE__*/React.createElement(View, {
    style: styles.contentContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u0434\u04AF\u0440\u044D\u043C"), /*#__PURE__*/React.createElement(View, {
    style: styles.h15
  }), /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    title: "Зөвшөөрөх",
    style: styles.button,
    onPress: () => {
      onPress(navigation);
    }
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      height: sfArea.bottom
    }
  }));
});
RuleSheet.displayName = "RuleSheet";
export { RuleSheet };
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
    marginHorizontal: 24
  }
});
//# sourceMappingURL=rule.js.map