import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomSheetParamList, NavigationRoutes } from "../navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Colors,
  Button,
  CommunityIcon,
  Result,
} from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<
  BottomSheetParamList,
  NavigationRoutes.Group_DeleteConfirmSheet
>;

const DeleteConfirmSheet = memo(({ route }: Props) => {
  const { onChange } = route.params;
  const navigation = useNavigation();
  const sfArea = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <Text style={styles.headerTitle}>Бүлэг устгах</Text>
      <View style={styles.contentContainer}>
        <View style={styles.h15}></View>
        <Result
          title={"Бүлэг устгах"}
          subTitle={"Та энэ бүлгээ устгахдаа итгэлтэй байна уу?"}
          icon={<CommunityIcon color={Colors.white} />}
        />
        <View style={styles.h15}></View>
        <Button
          type={"primary"}
          title={"Зөвшөөрөх"}
          style={styles.button}
          onPress={() => {
            navigation.goBack();
            onChange();
          }}
        />
      </View>
      <View style={{ height: sfArea.bottom }}></View>
    </View>
  );
});

DeleteConfirmSheet.displayName = "DeleteConfirmSheet";

export { DeleteConfirmSheet };

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    paddingHorizontal: 18,
  },
  h10: {
    height: 10,
  },
  h15: {
    height: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    lineHeight: 20,
    textAlign: "center",
    color: Colors.primary,
    marginVertical: 12,
  },
  contentContainer: {
    backgroundColor: Colors.gray101,
    borderRadius: 12,
    flex: 1,
  },
  iconContainer: {
    alignSelf: "center",
    marginTop: 32,
  },
  username: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    lineHeight: 18,
    textAlign: "center",
    color: Colors.primary,
    marginHorizontal: 24,
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter",
    lineHeight: 18,
    textAlign: "center",
    color: Colors.primary,
    marginHorizontal: 24,
  },
  description: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    lineHeight: 15,
    color: Colors.gray103,
    textAlign: "center",
    marginTop: 12,
    marginHorizontal: 24,
  },
  button: {
    marginHorizontal: 18,
  },
});
