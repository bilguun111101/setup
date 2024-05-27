import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import {
  Colors,
  EditIcon,
  IconSizes,
  InfoCircleIcon,
} from "@goodtechsoft/xs-core-native";

const ResultForm = memo(
  ({
    title,
    description,
    onPress,
  }: {
    title: string;
    description?: string | null;
    onPress?: () => void;
  }) => {
    return (
      <View style={styles.root}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.h10}></View>
        <Pressable onPress={onPress} style={styles.row}>
          <InfoCircleIcon color={Colors.primary} size={IconSizes.Medium} />
          <Text style={styles.description}>{description}</Text>
          {onPress && (
            <EditIcon color={Colors.primary} size={IconSizes.Medium} />
          )}
        </Pressable>
      </View>
    );
  },
);

ResultForm.displayName = "ResultForm";

export { ResultForm };

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  h10: {
    height: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.primary,
  },
  description: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.primary,
  },
});
