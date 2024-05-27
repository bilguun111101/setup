import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Colors } from "@goodtechsoft/xs-core-native";

type Props = {
  title: string;
  description: string;
  onPress: () => void;
};

const DescriptionItem = memo((props: Props) => {
  const { title, description, onPress } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress()}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.h4} />
      <Text numberOfLines={2} style={styles.description}>
        {description}
      </Text>
    </TouchableOpacity>
  );
});

DescriptionItem.displayName = "DescriptionItem";

export { DescriptionItem };

const styles = StyleSheet.create({
  h4: {
    height: 4,
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.primary,
    fontSize: 14,
  },
  description: {
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.gray104,
    fontSize: 14,
  },
});
