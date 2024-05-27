import React, { memo, useCallback, useState } from "react";
import * as yup from "yup";
import { ArrowBottomIcon, Button, Colors, Field, Form, IconSizes, Image, ImageSizes, ImageUpload, Loader, PERMISSION_TYPE, PlusIcon, TextInput, checkPermission } from "@goodtechsoft/xs-core-native";
import { PermissionsAndroid, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation";
import { MediaApi } from "../../apis";
const schema = yup.object().shape({
  category: yup.object().required("Заавал бөглөнө!"),
  description: yup.string().required("Заавал бөглөнө!")
});
const CreateGroupStep2Form = /*#__PURE__*/memo(({
  onSubmit,
  formRef
}) => {
  const [isImageLoading, setImageLoading] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const navigation = useNavigation();
  const [permission, setPermission] = useState({
    gallery: false,
    camera: false,
    loading: true
  });
  const mediaPermission = useCallback(async () => {
    const camera = await checkPermission(PERMISSION_TYPE.CAMERA);
    const gallery = await checkPermission(PERMISSION_TYPE.GALLERY);
    setPermission({
      camera,
      gallery,
      loading: false
    });
    const res = {
      gallery,
      camera
    };
    return res;
  }, []);
  const check = useCallback(async () => {
    try {
      const {
        camera,
        gallery
      } = await mediaPermission();
      if (!camera || !gallery) {
        navigation.navigate(NavigationRoutes.Group_ImagePermissionScreen, {
          permission
        });
      }
    } catch (error) {
      console.log("error ", error);
      setPermission(e => {
        return {
          ...e,
          loading: false
        };
      });
    }
  }, [mediaPermission, navigation, permission]);
  const renderCover = useCallback(() => {
    if (isImageLoading) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.cover
      }, /*#__PURE__*/React.createElement(Loader, null));
    }
    if (coverImage) {
      return /*#__PURE__*/React.createElement(Image, {
        source: coverImage,
        size: ImageSizes.ExtraLarge,
        style: styles.coverContainer
      });
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.coverContainer
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.coverButton
    }, plusButton()));
  }, [coverImage, isImageLoading]);
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
  const onChangeCover = useCallback(async (_, uri, setFieldValue) => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: "Cool Photo App Camera Permission",
          message: "Cool Photo App needs access to your camera " + "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setCoverImage(uri);
        } else {
          navigation.navigate(NavigationRoutes.Group_ImagePermissionScreen, {
            permission
          });
        }
      } catch (err) {
        console.warn(err);
      }
    }
    const res = await uploadFile({
      image: {
        uri: uri
      }
    });
    setCoverImage(uri);
    setFieldValue("coverImage", res._id);
    setImageLoading(false);
  }, [navigation, permission]);
  return /*#__PURE__*/React.createElement(Form, {
    onSubmit: onSubmit,
    validationSchema: schema,
    initialValues: {
      coverImage: undefined,
      category: undefined,
      description: undefined
    },
    ref: formRef
  }, ({
    handleSubmit,
    setFieldValue
  }) => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.root
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.contentContainer
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.labelStyle
    }, "\u041A\u043E\u0432\u0435\u0440 \u0437\u0443\u0440\u0430\u0433"), /*#__PURE__*/React.createElement(Field, {
      name: "coverImage"
    }, ({}) => {
      return /*#__PURE__*/React.createElement(React.Fragment, null, Platform.OS === "ios" && /*#__PURE__*/React.createElement(React.Fragment, null, !permission.gallery ? /*#__PURE__*/React.createElement(Pressable, {
        onPress: check
      }, renderCover()) : /*#__PURE__*/React.createElement(ImageUpload, {
        onChange: (file, uri) => {
          setImageLoading(true);
          onChangeCover(file, uri, setFieldValue);
        },
        cropRect: {
          width: 1280,
          height: 640
        }
      }, renderCover())), Platform.OS === "android" && /*#__PURE__*/React.createElement(ImageUpload, {
        cropRect: {
          width: 1280,
          height: 640
        },
        onChange: (file, uri) => {
          setImageLoading(true);
          onChangeCover(file, uri, setFieldValue);
        }
      }, renderCover()));
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.h20
    }), /*#__PURE__*/React.createElement(Field, {
      name: "category"
    }, ({
      value,
      error
    }) => {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
        style: styles.row
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.labelStyle
      }, "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u0430\u043D\u0433\u0438\u043B\u0430\u043B"), /*#__PURE__*/React.createElement(Text, {
        style: styles.errorText
      }, error)), /*#__PURE__*/React.createElement(TouchableOpacity, {
        onPress: () => navigation.navigate(NavigationRoutes.Group_ChangeCategorySheet, {
          onChange: setFieldValue
        }),
        style: error ? [styles.fieldContainer, styles.error] : styles.fieldContainer
      }, /*#__PURE__*/React.createElement(Text, {
        style: [styles.containerTitle, value && styles.primary]
      }, value ? value.name : "Ангилал"), /*#__PURE__*/React.createElement(ArrowBottomIcon, {
        size: IconSizes.Medium,
        color: Colors.primary
      })));
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.h20
    }), /*#__PURE__*/React.createElement(Field, {
      name: "description"
    }, ({
      value,
      onChange,
      error
    }) => {
      return /*#__PURE__*/React.createElement(TextInput, {
        label: "\u0422\u0430\u0439\u043B\u0431\u0430\u0440",
        error: error,
        value: value,
        onChangeText: onChange,
        placeholder: "\u042D\u043D\u0434 \u0442\u0430\u0439\u043B\u0431\u0430\u0440\u0430\u0430 \u0431\u0438\u0447\u043D\u044D \u04AF\u04AF",
        placeholderTextColor: Colors.gray103,
        style: error ? [styles.input, styles.error] : styles.input
      });
    }), /*#__PURE__*/React.createElement(Text, {
      style: styles.description
    }, "\u04E8\u04E9\u0440\u0438\u0439\u043D \u0431\u0440\u044D\u043D\u0434, \u0431\u0438\u0437\u043D\u0435\u0441, \u044D\u0441\u0432\u044D\u043B \u0431\u0430\u0439\u0433\u0443\u0443\u043B\u043B\u0430\u0433\u044B\u043D \u043D\u044D\u0440 \u0437\u044D\u0440\u044D\u0433 \u0445\u0443\u0443\u0434\u0441\u0430\u0430 \u0442\u0430\u043D\u0438\u043B\u0446\u0443\u0443\u043B\u0430\u0445\u0430\u0434 \u0430\u0448\u0438\u0433\u043B\u0430\u0445 \u043D\u044D\u0440\u0438\u0439\u0433 \u043E\u0440\u0443\u0443\u043B\u043D\u0430 \u0443\u0443.")), /*#__PURE__*/React.createElement(View, {
      style: styles.h20
    }), /*#__PURE__*/React.createElement(Button, {
      title: "\u04AE\u0440\u0433\u044D\u043B\u0436\u043B\u04AF\u04AF\u043B\u044D\u0445",
      type: "primary",
      onPress: handleSubmit
    }));
  });
});
CreateGroupStep2Form.displayName = "CreateGroupStep2Form";
export { CreateGroupStep2Form };
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  root: {
    flex: 1,
    paddingHorizontal: 18
  },
  error: {
    borderColor: Colors.sub200
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray102
  },
  errorText: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.sub200
  },
  h20: {
    height: 20
  },
  labelStyle: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8
  },
  contentContainer: {
    borderWidth: 1,
    borderColor: Colors.gray102,
    borderRadius: 12,
    padding: 18
  },
  iconContainer: {
    backgroundColor: Colors.primary,
    padding: 4,
    borderRadius: 100
  },
  cover: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: Colors.gray102
  },
  primary: {
    color: Colors.primary
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: Colors.gray102,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  description: {
    marginTop: 8,
    fontWeight: "400",
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 13,
    color: Colors.gray104
  },
  coverContainer: {
    backgroundColor: Colors.gray102,
    width: "100%",
    height: 150,
    borderRadius: 10
  },
  containerTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.gray103
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
  }
});
//# sourceMappingURL=create-2-group.js.map