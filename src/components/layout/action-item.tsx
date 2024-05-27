import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { ArrowRightIcon, Colors } from "@goodtechsoft/xs-core-native";

type Props = {
  title: string;
  suffixIcon?: boolean;
  badgeNumber?: number;
  onPress: () => void;
};

const ActionItem = memo((props: Props) => {
  const { title, suffixIcon, onPress, badgeNumber } = props;
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.subTitle}>{title}</Text>
      {badgeNumber! > 0 && <View style={styles.badge}>
        <Text style={styles.badgeText}>{badgeNumber}</Text>
        </View>}
      {suffixIcon && <ArrowRightIcon color={Colors.primary} />}
    </Pressable>
  );
});

ActionItem.displayName = "ActionItem";

export { ActionItem };

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge:{
    backgroundColor: Colors.sub200,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 10,
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.white,
  },
  subTitle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    fontFamily: "Inter",
    color: Colors.primary,
  },
});
