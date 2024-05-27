import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppBar, ArrowLeftIcon, Button, Colors, IconSizes, Image, ImageSizes, ImageUpload, Loader, PlusIcon } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
import useSwr, { useSWRConfig } from "swr";
import { InfoItem } from "../../components/layout/info-item";
import { NavigationRoutes } from "../../navigation";
import { ResultForm } from "../../components/layout/form-result";
import { GroupApi, MediaApi } from "../../apis";
import { DescriptionForm } from "../../components/form/description-form";
import { RuleForm } from "../../components/form/rule-form";
import { useToast } from "react-native-toast-notifications";
import { timeFormat } from "../../utils/timeformat";
const InfoScreen = /*#__PURE__*/memo(({
  route
}) => {
  const {
    payload
  } = route.params;
  const [isImageLoading, setImageLoading] = useState(false);
  const {
    mutate
  } = useSWRConfig();
  const toast = useToast();
  const navigation = useNavigation();
  const renderCover = useCallback(() => {
    if (isImageLoading) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.cover
      }, /*#__PURE__*/React.createElement(Loader, null));
    }
    if (groupData?.coverImage) {
      return /*#__PURE__*/React.createElement(Image, {
        source: groupData.coverImage,
        size: ImageSizes.ExtraLarge,
        style: styles.coverContainer
      });
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.coverContainer
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.coverButton
    }, plusButton()));
  }, [isImageLoading]);
  const plusButton = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.iconRoot
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.iconContainer
    }, /*#__PURE__*/React.createElement(PlusIcon, {
      size: IconSizes.Medium,
      color: Colors.white
    })));
  };
  const uploadFile = async item => {
    try {
      const file = new FormData();
      file.append("file", {
        name: Platform.OS === "ios" ? item?.image.uri?.replace("file://", "") : item?.image.uri,
        type: Platform.OS === "ios" ? item.type : "image/jpeg",
        uri: Platform.OS === "ios" ? item?.image.uri?.replace("file://", "") : item?.image.uri
      });
      const result = await MediaApi.uploadImage(file, "USER");
      return {
        ...result,
        type: "image"
      };
    } catch (e) {
      console.log("catch ", e);
      return null;
    }
  };
  const onChangeCover = useCallback(async (_, uri) => {
    setImageLoading(true);
    if (Platform.OS === "android") {
      try {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: "Cool Photo App Camera Permission",
          message: "Cool Photo App needs access to your camera " + "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        });
      } catch (err) {
        console.warn(err);
      }
    }
    const res = await uploadFile({
      image: {
        uri: uri
      }
    });
    const sendData = {
      coverImage: res._id
    };
    try {
      const res = await GroupApi.coverChange({
        id: payload._id,
        data: sendData
      });
      groupData?.setCover(mutate, res);
      toast.show("Амжилттай солигдлоо", {
        placement: "bottom",
        duration: 2000,
        animationType: "slide-in"
      });
    } catch (err) {
      console.log(err);
      toast.show("Солиход алдаа гарлаа", {
        placement: "bottom",
        duration: 2000,
        animationType: "slide-in"
      });
    }
    setImageLoading(false);
  }, [navigation]);
  const {
    data: groupData,
    isLoading
  } = useSwr(`swr.group.${payload._id}`, async () => {
    const res = await GroupApi.get(payload._id);
    return res;
  }, {
    revalidateOnFocus: true,
    fallback: {}
  });
  if (isLoading) {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.loaderContainer
    }, /*#__PURE__*/React.createElement(Loader, {
      size: 50
    }));
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
      payload: groupData
    });
  }, [navigation]);
  const onPrivacy = useCallback(() => {
    navigation.push(NavigationRoutes.Group_ChangePrivacySheet, {
      onChange: async (_, data) => {
        groupData?.setPrivacy(mutate, data.value);
        const sendingData = {
          privacy: data.value
        };
        await GroupApi.privacyChange({
          id: payload._id,
          data: sendingData
        });
        toast.show("Амжилттай солигдлоо", {
          placement: "bottom",
          duration: 2000,
          animationType: "slide-in"
        });
      }
    });
  }, [groupData, navigation, mutate]);
  const onPostType = useCallback(() => {
    navigation.push(NavigationRoutes.Group_ChangePostTypeSheet, {
      onChange: async (_, data) => {
        groupData?.setPostType(mutate, data.value);
        const sendingData = {
          isDirectPost: data.value
        };
        await GroupApi.directPost({
          id: payload._id,
          data: sendingData
        });
        toast.show("Амжилттай солигдлоо", {
          placement: "bottom",
          duration: 2000,
          animationType: "slide-in"
        });
      }
    });
  }, [groupData, navigation, mutate]);
  const descriptionRef = useRef(null);
  const descriptionData = useMemo(() => {
    if (groupData?.description) {
      return {
        description: groupData?.description,
        type: "confirm"
      };
    }
    return {
      description: undefined,
      type: ""
    };
  }, [groupData?.description]);
  const onDescriptionSubmit = useCallback(async values => {
    const groupForm = {
      description: values.description
    };
    try {
      const formData = await GroupApi.descriptionChange({
        id: groupData?._id,
        data: groupForm || ""
      });
      groupData?.setDescription(mutate, formData);
      toast.show("Амжилттай солигдлоо", {
        placement: "bottom",
        duration: 2000,
        animationType: "slide-in"
      });
    } catch (err) {
      descriptionRef.current?.setErrors({
        email: err.message || ""
      });
    }
  }, [mutate, groupData]);
  const ruleRef = useRef(null);
  const ruleData = useMemo(() => {
    if (groupData?.rule) {
      return {
        rule: groupData?.rule,
        type: "confirm"
      };
    }
    return {
      rule: undefined,
      type: ""
    };
  }, [groupData?.rule]);
  const onRuleSubmit = useCallback(async values => {
    const groupForm = {
      rule: values.rule
    };
    try {
      const formData = await GroupApi.ruleChange({
        id: groupData?._id,
        data: groupForm || ""
      });
      groupData?.setRule(mutate, formData);
      toast.show("Амжилттай солигдлоо", {
        placement: "bottom",
        duration: 2000,
        animationType: "slide-in"
      });
    } catch (err) {
      descriptionRef.current?.setErrors({
        email: err.message || ""
      });
    }
  }, [mutate, groupData]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(AppBar, {
    left: /*#__PURE__*/React.createElement(Button, {
      type: "text",
      icon: /*#__PURE__*/React.createElement(ArrowLeftIcon, {
        size: IconSizes.ExtraLarge
      }),
      onPress: () => navigation.goBack()
    }),
    center: /*#__PURE__*/React.createElement(Text, {
      style: styles.title
    }, "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u043C\u044D\u0434\u044D\u044D\u043B\u044D\u043B")
  })), /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
    style: styles.avoid,
    behavior: Platform.OS === "ios" ? "padding" : undefined
  }, /*#__PURE__*/React.createElement(ScrollView, {
    showsVerticalScrollIndicator: false,
    style: styles.ph18
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.h15
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.subtitle
  }, "\u041A\u043E\u0432\u0435\u0440 \u0437\u0443\u0440\u0430\u0433"), /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  }), /*#__PURE__*/React.createElement(View, null, Platform.OS === "ios" && /*#__PURE__*/React.createElement(ImageUpload, {
    onChange: onChangeCover,
    cropRect: {
      width: 1280,
      height: 640
    }
  }, renderCover()), Platform.OS === "android" && /*#__PURE__*/React.createElement(ImageUpload, {
    cropRect: {
      width: 1280,
      height: 640
    },
    onChange: onChangeCover
  }, renderCover())), /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.description
  }, "\u042D\u043D\u044D \u0431\u043E\u043B \u0442\u0430\u043D\u044B \u0445\u0443\u0443\u0434\u0441\u0430\u043D \u0434\u044D\u044D\u0440 \u0445\u04AF\u043C\u04AF\u04AF\u0441\u0438\u0439\u043D \u0445\u0430\u0440\u0436 \u0431\u0443\u0439 \u0430\u043D\u0445\u043D\u044B \u0437\u0443\u0440\u0430\u0433 \u044E\u043C. \u0422\u0430 \u044F\u043C\u0430\u0440 \u043D\u044D\u0433 \u0448\u0438\u043D\u044D \u0437\u04AF\u0439\u043B\u0438\u0439\u0433 \u043E\u043D\u0446\u043B\u043E\u0445\u044B\u0433 \u0445\u04AF\u0441\u0441\u044D\u043D \u04AF\u0435\u0434\u044D\u044D \u0448\u0438\u043D\u044D\u0447\u0438\u043B\u0436 \u0431\u043E\u043B\u043D\u043E."), /*#__PURE__*/React.createElement(View, {
    style: styles.h15
  }), /*#__PURE__*/React.createElement(InfoItem, {
    title: "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u043D\u044D\u0440",
    description: groupData?.name,
    onSubmit: onChangeFirstname
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  }), /*#__PURE__*/React.createElement(InfoItem, {
    title: "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u043D\u0443\u0443\u0446\u043B\u0430\u043B",
    description: privacyType(),
    onSubmit: onPrivacy
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  }), /*#__PURE__*/React.createElement(InfoItem, {
    title: "\u041F\u043E\u0441\u0442 \u043D\u0438\u0439\u0442\u043B\u044D\u0445 \u0442\u04E9\u0440\u04E9\u043B",
    description: postType(),
    onSubmit: onPostType
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  }), /*#__PURE__*/React.createElement(DescriptionForm, {
    ref: descriptionRef,
    payload: descriptionData,
    onSubmit: onDescriptionSubmit
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  }), /*#__PURE__*/React.createElement(RuleForm, {
    ref: ruleRef,
    payload: ruleData,
    onSubmit: onRuleSubmit
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  }), /*#__PURE__*/React.createElement(ResultForm, {
    title: "Нээгдсэн огноо",
    description: `${timeFormat(groupData?.createdAt)}`
  }))));
});
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray101
  },
  avoid: {
    flex: 1
  },
  ph18: {
    paddingHorizontal: 18
  },
  header: {
    zIndex: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    borderBottomRightRadius: 10
  },
  h15: {
    height: 15
  },
  h10: {
    height: 10
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    color: Colors.primary
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    lineHeight: 22,
    color: Colors.primary
  },
  cover: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: Colors.gray102
  },
  description: {
    fontSize: 12,
    color: Colors.gray104,
    fontFamily: "Inter",
    fontWeight: "400"
  },
  plusIcon: {
    position: "absolute",
    backgroundColor: Colors.primary,
    borderRadius: 200,
    borderWidth: 5,
    borderColor: Colors.gray101,
    bottom: -10,
    right: 0,
    padding: 4
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  coverContainer: {
    backgroundColor: Colors.gray102,
    width: "100%",
    height: 150,
    borderRadius: 10
  },
  coverButton: {
    position: "absolute",
    bottom: -12,
    right: 6
  },
  iconRoot: {
    padding: 6,
    backgroundColor: Colors.gray101,
    borderRadius: 100
  },
  iconContainer: {
    backgroundColor: Colors.primary,
    padding: 4,
    borderRadius: 100
  }
});
InfoScreen.displayName = "InfoScreen";
export { InfoScreen };
//# sourceMappingURL=info.js.map