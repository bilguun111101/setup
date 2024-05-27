"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoScreen = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _native = require("@react-navigation/native");
var _swr = _interopRequireWildcard(require("swr"));
var _infoItem = require("../../components/layout/info-item");
var _navigation = require("../../navigation");
var _formResult = require("../../components/layout/form-result");
var _apis = require("../../apis");
var _descriptionForm = require("../../components/form/description-form");
var _ruleForm = require("../../components/form/rule-form");
var _reactNativeToastNotifications = require("react-native-toast-notifications");
var _timeformat = require("../../utils/timeformat");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const InfoScreen = exports.InfoScreen = /*#__PURE__*/(0, _react.memo)(({
  route
}) => {
  const {
    payload
  } = route.params;
  const [isImageLoading, setImageLoading] = (0, _react.useState)(false);
  const {
    mutate
  } = (0, _swr.useSWRConfig)();
  const toast = (0, _reactNativeToastNotifications.useToast)();
  const navigation = (0, _native.useNavigation)();
  const renderCover = (0, _react.useCallback)(() => {
    if (isImageLoading) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.cover
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Loader, null));
    }
    if (groupData?.coverImage) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Image, {
        source: groupData.coverImage,
        size: _xsCoreNative.ImageSizes.ExtraLarge,
        style: styles.coverContainer
      });
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.coverContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.coverButton
    }, plusButton()));
  }, [isImageLoading]);
  const plusButton = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.iconRoot
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.iconContainer
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.PlusIcon, {
      size: _xsCoreNative.IconSizes.Medium,
      color: _xsCoreNative.Colors.white
    })));
  };
  const uploadFile = async item => {
    try {
      const file = new FormData();
      file.append("file", {
        name: _reactNative.Platform.OS === "ios" ? item?.image.uri?.replace("file://", "") : item?.image.uri,
        type: _reactNative.Platform.OS === "ios" ? item.type : "image/jpeg",
        uri: _reactNative.Platform.OS === "ios" ? item?.image.uri?.replace("file://", "") : item?.image.uri
      });
      const result = await _apis.MediaApi.uploadImage(file, "USER");
      return {
        ...result,
        type: "image"
      };
    } catch (e) {
      console.log("catch ", e);
      return null;
    }
  };
  const onChangeCover = (0, _react.useCallback)(async (_, uri) => {
    setImageLoading(true);
    if (_reactNative.Platform.OS === "android") {
      try {
        await _reactNative.PermissionsAndroid.request(_reactNative.PermissionsAndroid.PERMISSIONS.CAMERA, {
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
      const res = await _apis.GroupApi.coverChange({
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
  } = (0, _swr.default)(`swr.group.${payload._id}`, async () => {
    const res = await _apis.GroupApi.get(payload._id);
    return res;
  }, {
    revalidateOnFocus: true,
    fallback: {}
  });
  if (isLoading) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.loaderContainer
    }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Loader, {
      size: 50
    }));
  }
  const privacyType = (0, _react.useCallback)(() => {
    if (groupData?.privacy === "PUBLIC") {
      return "Нээлттэй";
    }
    return "Нууцлалтай";
  }, [groupData]);
  const postType = (0, _react.useCallback)(() => {
    if (groupData?.isDirectPost === true) {
      return "Шууд нийтлэгдэнэ";
    }
    return "Админ зөвшөөрнө";
  }, [groupData]);
  const onChangeFirstname = (0, _react.useCallback)(() => {
    navigation.push(_navigation.NavigationRoutes.Group_ChangeNameSheet, {
      payload: groupData
    });
  }, [navigation]);
  const onPrivacy = (0, _react.useCallback)(() => {
    navigation.push(_navigation.NavigationRoutes.Group_ChangePrivacySheet, {
      onChange: async (_, data) => {
        groupData?.setPrivacy(mutate, data.value);
        const sendingData = {
          privacy: data.value
        };
        await _apis.GroupApi.privacyChange({
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
  const onPostType = (0, _react.useCallback)(() => {
    navigation.push(_navigation.NavigationRoutes.Group_ChangePostTypeSheet, {
      onChange: async (_, data) => {
        groupData?.setPostType(mutate, data.value);
        const sendingData = {
          isDirectPost: data.value
        };
        await _apis.GroupApi.directPost({
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
  const descriptionRef = (0, _react.useRef)(null);
  const descriptionData = (0, _react.useMemo)(() => {
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
  const onDescriptionSubmit = (0, _react.useCallback)(async values => {
    const groupForm = {
      description: values.description
    };
    try {
      const formData = await _apis.GroupApi.descriptionChange({
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
  const ruleRef = (0, _react.useRef)(null);
  const ruleData = (0, _react.useMemo)(() => {
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
  const onRuleSubmit = (0, _react.useCallback)(async values => {
    const groupForm = {
      rule: values.rule
    };
    try {
      const formData = await _apis.GroupApi.ruleChange({
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
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.AppBar, {
    left: /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      type: "text",
      icon: /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowLeftIcon, {
        size: _xsCoreNative.IconSizes.ExtraLarge
      }),
      onPress: () => navigation.goBack()
    }),
    center: /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.title
    }, "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u043C\u044D\u0434\u044D\u044D\u043B\u044D\u043B")
  })), /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
    style: styles.avoid,
    behavior: _reactNative.Platform.OS === "ios" ? "padding" : undefined
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    showsVerticalScrollIndicator: false,
    style: styles.ph18
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h15
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.subtitle
  }, "\u041A\u043E\u0432\u0435\u0440 \u0437\u0443\u0440\u0430\u0433"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, _reactNative.Platform.OS === "ios" && /*#__PURE__*/_react.default.createElement(_xsCoreNative.ImageUpload, {
    onChange: onChangeCover,
    cropRect: {
      width: 1280,
      height: 640
    }
  }, renderCover()), _reactNative.Platform.OS === "android" && /*#__PURE__*/_react.default.createElement(_xsCoreNative.ImageUpload, {
    cropRect: {
      width: 1280,
      height: 640
    },
    onChange: onChangeCover
  }, renderCover())), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.description
  }, "\u042D\u043D\u044D \u0431\u043E\u043B \u0442\u0430\u043D\u044B \u0445\u0443\u0443\u0434\u0441\u0430\u043D \u0434\u044D\u044D\u0440 \u0445\u04AF\u043C\u04AF\u04AF\u0441\u0438\u0439\u043D \u0445\u0430\u0440\u0436 \u0431\u0443\u0439 \u0430\u043D\u0445\u043D\u044B \u0437\u0443\u0440\u0430\u0433 \u044E\u043C. \u0422\u0430 \u044F\u043C\u0430\u0440 \u043D\u044D\u0433 \u0448\u0438\u043D\u044D \u0437\u04AF\u0439\u043B\u0438\u0439\u0433 \u043E\u043D\u0446\u043B\u043E\u0445\u044B\u0433 \u0445\u04AF\u0441\u0441\u044D\u043D \u04AF\u0435\u0434\u044D\u044D \u0448\u0438\u043D\u044D\u0447\u0438\u043B\u0436 \u0431\u043E\u043B\u043D\u043E."), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h15
  }), /*#__PURE__*/_react.default.createElement(_infoItem.InfoItem, {
    title: "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u043D\u044D\u0440",
    description: groupData?.name,
    onSubmit: onChangeFirstname
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  }), /*#__PURE__*/_react.default.createElement(_infoItem.InfoItem, {
    title: "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u043D\u0443\u0443\u0446\u043B\u0430\u043B",
    description: privacyType(),
    onSubmit: onPrivacy
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  }), /*#__PURE__*/_react.default.createElement(_infoItem.InfoItem, {
    title: "\u041F\u043E\u0441\u0442 \u043D\u0438\u0439\u0442\u043B\u044D\u0445 \u0442\u04E9\u0440\u04E9\u043B",
    description: postType(),
    onSubmit: onPostType
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  }), /*#__PURE__*/_react.default.createElement(_descriptionForm.DescriptionForm, {
    ref: descriptionRef,
    payload: descriptionData,
    onSubmit: onDescriptionSubmit
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  }), /*#__PURE__*/_react.default.createElement(_ruleForm.RuleForm, {
    ref: ruleRef,
    payload: ruleData,
    onSubmit: onRuleSubmit
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.h10
  }), /*#__PURE__*/_react.default.createElement(_formResult.ResultForm, {
    title: "Нээгдсэн огноо",
    description: `${(0, _timeformat.timeFormat)(groupData?.createdAt)}`
  }))));
});
const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: _xsCoreNative.Colors.gray101
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
    color: _xsCoreNative.Colors.primary
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    lineHeight: 22,
    color: _xsCoreNative.Colors.primary
  },
  cover: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: _xsCoreNative.Colors.gray102
  },
  description: {
    fontSize: 12,
    color: _xsCoreNative.Colors.gray104,
    fontFamily: "Inter",
    fontWeight: "400"
  },
  plusIcon: {
    position: "absolute",
    backgroundColor: _xsCoreNative.Colors.primary,
    borderRadius: 200,
    borderWidth: 5,
    borderColor: _xsCoreNative.Colors.gray101,
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
    backgroundColor: _xsCoreNative.Colors.gray102,
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
    backgroundColor: _xsCoreNative.Colors.gray101,
    borderRadius: 100
  },
  iconContainer: {
    backgroundColor: _xsCoreNative.Colors.primary,
    padding: 4,
    borderRadius: 100
  }
});
InfoScreen.displayName = "InfoScreen";
//# sourceMappingURL=info.js.map