import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useSwr, { useSWRConfig } from "swr";
import { InfoItem } from "../../components/layout/info-item";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigationRoutes, type RootStackParamList } from "../../navigation";
import { ResultForm } from "../../components/layout/form-result";
import type { IGroup } from "../../interfaces";
import { GroupApi, MediaApi } from "../../apis";
import {
  DescriptionForm,
  type IDescriptionFormData,
} from "../../components/form/description-form";
import { type IRuleFormData, RuleForm } from "../../components/form/rule-form";
import type { IPrivacyType } from "../../sheets/change-category";
import { useToast } from "react-native-toast-notifications";
import { timeFormat } from "../../utils/timeformat";
import type { IPostType } from "../../sheets/change-post-type";

type Props = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.Group_InfoScreen
>;

const InfoScreen = memo(({ route }: Props) => {
  const { payload } = route.params;
  const [isImageLoading, setImageLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const toast = useToast();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const renderCover = useCallback(() => {
    if (isImageLoading) {
      return (
        <View style={styles.cover}>
        </View>
      );
    }
    if (groupData?.coverImage) {
      return (
        <></>
      );
    }
    return (
      <View style={styles.coverContainer}>
        <View style={styles.coverButton}>{plusButton()}</View>
      </View>
    );
  }, [isImageLoading]);

  const plusButton = () => {
    return (
      <View style={styles.iconRoot}>
        <View style={styles.iconContainer}>
        </View>
      </View>
    );
  };

  const uploadFile = async (item: any) => {
    try {
      const file = new FormData();

      file.append("file", {
        name:
          Platform.OS === "ios"
            ? item?.image.uri?.replace("file://", "")
            : item?.image.uri,
        type: Platform.OS === "ios" ? item.type : "image/jpeg",
        uri:
          Platform.OS === "ios"
            ? item?.image.uri?.replace("file://", "")
            : item?.image.uri,
      });
      const result = await MediaApi.uploadImage(file, "USER");
      return {
        ...result,
        type: "image",
      };
    } catch (e) {
      console.log("catch ", e);
      return null;
    }
  };

  const onChangeCover = useCallback(
    async (_: any, uri: string) => {
      setImageLoading(true);
      if (Platform.OS === "android") {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA!,
            {
              title: "Cool Photo App Camera Permission",
              message:
                "Cool Photo App needs access to your camera " +
                "so you can take awesome pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            },
          );
        } catch (err) {
          console.warn(err);
        }
      }
      const res = await uploadFile({
        image: {
          uri: uri,
        },
      });
      const sendData = {
        coverImage: res._id,
      };
      try {
        const res = await GroupApi.coverChange({
          id: payload._id,
          data: sendData,
        });
        groupData?.setCover(mutate, res);
        toast.show("Амжилттай солигдлоо", {
          placement: "bottom",
          duration: 2000,
          animationType: "slide-in",
        });
      } catch (err) {
        console.log(err);
        toast.show("Солиход алдаа гарлаа", {
          placement: "bottom",
          duration: 2000,
          animationType: "slide-in",
        });
      }
      setImageLoading(false);
    },
    [navigation],
  );

  const { data: groupData, isLoading } = useSwr<IGroup>(
    `swr.group.${payload._id}`,
    async () => {
      const res = await GroupApi.get(payload._id);
      return res;
    },
    {
      revalidateOnFocus: true,
      fallback: {},
    },
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
      </View>
    );
  }

  const privacyType = useCallback(() => {
    if (groupData?.privacy === "PUBLIC") {
      return "Нээлттэй";
    }
    return "Нууцлалтай";
  }, [groupData]);

  const postType = useCallback(() => {
    if (groupData?.isDirectPost === true) {
      return "Шууд нийтлэгдэнэ";
    }
    return "Админ зөвшөөрнө";
  }, [groupData]);

  const onChangeFirstname = useCallback(() => {
    navigation.push(NavigationRoutes.Group_ChangeNameSheet, {
      payload: groupData,
    });
  }, [navigation]);

  const onPrivacy = useCallback(() => {
    navigation.push(NavigationRoutes.Group_ChangePrivacySheet, {
      onChange: async (_: any, data: IPrivacyType) => {
        groupData?.setPrivacy(mutate, data.value);
        const sendingData = {
          privacy: data.value,
        };
        await GroupApi.privacyChange({ id: payload._id, data: sendingData });
        toast.show("Амжилттай солигдлоо", {
          placement: "bottom",
          duration: 2000,
          animationType: "slide-in",
        });
      },
    });
  }, [groupData, navigation, mutate]);

  const onPostType = useCallback(() => {
    navigation.push(NavigationRoutes.Group_ChangePostTypeSheet, {
      onChange: async (_: any, data: IPostType) => {
        groupData?.setPostType(mutate, data.value);
        const sendingData = {
          isDirectPost: data.value,
        };
        await GroupApi.directPost({ id: payload._id, data: sendingData });
        toast.show("Амжилттай солигдлоо", {
          placement: "bottom",
          duration: 2000,
          animationType: "slide-in",
        });
      },
    });
  }, [groupData, navigation, mutate]);

  const descriptionRef = useRef(null);
  const descriptionData = useMemo<IDescriptionFormData>(() => {
    if (groupData?.description) {
      return {
        description: groupData?.description,
        type: "confirm",
      };
    }
    return {
      description: undefined,
      type: "",
    };
  }, [groupData?.description]);

  const onDescriptionSubmit = useCallback(
    async (values: IDescriptionFormData) => {
      const groupForm = {
        description: values.description,
      };

      try {
        const formData = await GroupApi.descriptionChange({
          id: groupData?._id!,
          data: groupForm || "",
        });

        groupData?.setDescription(mutate, formData);
        toast.show("Амжилттай солигдлоо", {
          placement: "bottom",
          duration: 2000,
          animationType: "slide-in",
        });
      } catch (err) {
        // descriptionRef.current?.setErrors({
        //   email: (err as HttpHandler).message || "",
        // });
      }
    },
    [mutate, groupData],
  );

  const ruleRef = useRef(null);
  const ruleData = useMemo<IDescriptionFormData>(() => {
    if (groupData?.rule) {
      return {
        rule: groupData?.rule,
        type: "confirm",
      };
    }
    return {
      rule: undefined,
      type: "",
    };
  }, [groupData?.rule]);

  const onRuleSubmit = useCallback(
    async (values: IRuleFormData) => {
      const groupForm = {
        rule: values.rule,
      };

      try {
        const formData = await GroupApi.ruleChange({
          id: groupData?._id!,
          data: groupForm || "",
        });
        groupData?.setRule(mutate, formData);
        toast.show("Амжилттай солигдлоо", {
          placement: "bottom",
          duration: 2000,
          animationType: "slide-in",
        });
      } catch (err) {
        // descriptionRef.current?.setErrors({
        //   email: (err as HttpHandler).message || "",
        // });
      }
    },
    [mutate, groupData],
  );

  return (
    <View style={styles.root}>
      <View style={styles.header}>
      </View>
      <KeyboardAvoidingView
        style={styles.avoid}
        behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.ph18}>
          <View style={styles.h15}></View>
          <Text style={styles.subtitle}>Ковер зураг</Text>
          <View style={styles.h10}></View>
          <View>
            {Platform.OS === "ios" && (
              <ImageUpload
                onChange={onChangeCover}
                cropRect={{ width: 1280, height: 640 }}>
                {renderCover()}
              </ImageUpload>
            )}
            {Platform.OS === "android" && (
              <ImageUpload
                cropRect={{ width: 1280, height: 640 }}
                onChange={onChangeCover}>
                {renderCover()}
              </ImageUpload>
            )}
          </View>
          <View style={styles.h10}></View>
          <Text style={styles.description}>
            Энэ бол таны хуудсан дээр хүмүүсийн харж буй анхны зураг юм. Та ямар
            нэг шинэ зүйлийг онцлохыг хүссэн үедээ шинэчилж болно.
          </Text>
          <View style={styles.h15}></View>
          <InfoItem
            title="Бүлгийн нэр"
            description={groupData?.name}
            onSubmit={onChangeFirstname}
          />
          <View style={styles.h10}></View>
          <InfoItem
            title="Бүлгийн нууцлал"
            description={privacyType()}
            onSubmit={onPrivacy}
          />
          <View style={styles.h10}></View>
          <InfoItem
            title="Пост нийтлэх төрөл"
            description={postType()}
            onSubmit={onPostType}
          />
          <View style={styles.h10}></View>
          <DescriptionForm
            ref={descriptionRef}
            payload={descriptionData}
            onSubmit={onDescriptionSubmit}
          />
          <View style={styles.h10}></View>
          <RuleForm ref={ruleRef} payload={ruleData} onSubmit={onRuleSubmit} />
          <View style={styles.h10}></View>
          <ResultForm
            title={"Нээгдсэн огноо"}
            description={`${timeFormat(groupData?.createdAt!)}`}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray101,
  },
  avoid: {
    flex: 1,
  },
  ph18: {
    paddingHorizontal: 18,
  },
  header: {
    zIndex: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    borderBottomRightRadius: 10,
  },
  h15: {
    height: 15,
  },
  h10: {
    height: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    lineHeight: 22,
    color: Colors.primary,
  },
  cover: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: Colors.gray102,
  },
  description: {
    fontSize: 12,
    color: Colors.gray104,
    fontFamily: "Inter",
    fontWeight: "400",
  },
  plusIcon: {
    position: "absolute",
    backgroundColor: Colors.primary,
    borderRadius: 200,
    borderWidth: 5,
    borderColor: Colors.gray101,
    bottom: -10,
    right: 0,
    padding: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  coverContainer: {
    backgroundColor: Colors.gray102,
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  coverButton: {
    position: "absolute",
    bottom: -12,
    right: 6,
  },
  iconRoot: {
    padding: 6,
    backgroundColor: Colors.gray101,
    borderRadius: 100,
  },
  iconContainer: {
    backgroundColor: Colors.primary,
    padding: 4,
    borderRadius: 100,
  },
});

InfoScreen.displayName = "InfoScreen";

export { InfoScreen };
