import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import {
  Colors,
  IconSizes,
  LockIcon,
  TextInput,
} from "@goodtechsoft/xs-core-native";

const AskPasswordSheet = memo(() => {
  return (
    <View style={styles.root}>
      <View style={styles.input}>
        <TextInput
          useBottomSheet
          autoFocus
          style={styles.input}
          placeholder="Нууц үгээ оруулна уу"
          prefix={<LockIcon color={Colors.gray103} size={IconSizes.Medium} />}
        />
      </View>
    </View>
  );
});

AskPasswordSheet.displayName = "AskPasswordSheet";

export { AskPasswordSheet };

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: Colors.primary,
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Colors.gray101,
  },
});
