import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { Colors, IconSizes, LockIcon, TextInput } from "@goodtechsoft/xs-core-native";
const AskPasswordSheet = /*#__PURE__*/memo(() => {
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.input
  }, /*#__PURE__*/React.createElement(TextInput, {
    useBottomSheet: true,
    autoFocus: true,
    style: styles.input,
    placeholder: "\u041D\u0443\u0443\u0446 \u04AF\u0433\u044D\u044D \u043E\u0440\u0443\u0443\u043B\u043D\u0430 \u0443\u0443",
    prefix: /*#__PURE__*/React.createElement(LockIcon, {
      color: Colors.gray103,
      size: IconSizes.Medium
    })
  })));
});
AskPasswordSheet.displayName = "AskPasswordSheet";
export { AskPasswordSheet };
const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 18
  },
  text: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: Colors.primary
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Colors.gray101
  }
});
//# sourceMappingURL=ask-password.js.map