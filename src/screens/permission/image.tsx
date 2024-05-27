import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { NavigationRoutes, RootStackParamList } from "../../navigation/types";

// type Props = NativeStackScreenProps<
//   RootStackParamList,
//   NavigationRoutes.Group_ImagePermissionScreen
// >;

const ImagePermissionScreen = memo(() => {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView style={styles.root}>
        <View style={styles.card}>
          {/* <GalleryAskIcon /> */}
          <View style={styles.h20} />
          <Text style={styles.labelStyle}>Тохиргоо</Text>
          <View style={styles.h6} />
          <Text style={styles.descriptionStyle}>
            Та зурагтай пост нийтлэхийн тулд галлерей болон камера ашиглах
            эрхийг нээх шаардлагатай.
          </Text>
          <View style={styles.h28} />
          <View style={styles.wrapper}>
            {/* <PermissionAccept
              icon={<CameraIcon />}
              title="Камер зөвшөөрөл"
              isDone={permission.camera}
            /> */}
            <View style={styles.h8} />
            {/* <PermissionAccept
              icon={<ImagesIcon />}
              title="Галерей зөвшөөрөл"
              isDone={permission.gallery}
            /> */}
          </View>
          <View style={styles.h28} />
        </View>
      </ScrollView>
    </>
  );
});

ImagePermissionScreen.displayName = "ImagePermissionScreen";

export { ImagePermissionScreen };

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    lineHeight: 20,
  },
  root: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginTop: 8,
  },
  h6: {
    height: 6,
  },
  h8: {
    height: 8,
  },
  h20: {
    height: 20,
  },
  h28: {
    height: 28,
  },
  card: {
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignSelf: "stretch",
  },
  btn: {
    width: "100%",
  },
  wrapper: {},
  labelStyle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    fontFamily: "Inter",
  },
  descriptionStyle: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Inter",
  },
});
