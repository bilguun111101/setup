"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateGroupStep2Form = void 0;
var _react = _interopRequireWildcard(require("react"));
var yup = _interopRequireWildcard(require("yup"));
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _reactNative = require("react-native");
var _native = require("@react-navigation/native");
var _navigation = require("../../navigation");
var _apis = require("../../apis");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const schema = yup.object().shape({
  category: yup.object().required("Заавал бөглөнө!"),
  description: yup.string().required("Заавал бөглөнө!")
});
const CreateGroupStep2Form = exports.CreateGroupStep2Form = /*#__PURE__*/(0, _react.memo)(({
  onSubmit,
  formRef
}) => {
  const [isImageLoading, setImageLoading] = (0, _react.useState)(false);
  const [coverImage, setCoverImage] = (0, _react.useState)("");
  const navigation = (0, _native.useNavigation)();
  const [permission, setPermission] = (0, _react.useState)({
    gallery: false,
    camera: false,
    loading: true
  });
  const mediaPermission = (0, _react.useCallback)(async () => {
    const camera = await (0, _xsCoreNative.checkPermission)(_xsCoreNative.PERMISSION_TYPE.CAMERA);
    const gallery = await (0, _xsCoreNative.checkPermission)(_xsCoreNative.PERMISSION_TYPE.GALLERY);
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
  const check = (0, _react.useCallback)(async () => {
    try {
      const {
        camera,
        gallery
      } = await mediaPermission();
      if (!camera || !gallery) {
        navigation.navigate(_navigation.NavigationRoutes.Group_ImagePermissionScreen, {
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
  const renderCover = (0, _react.useCallback)(() => {
    if (isImageLoading) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.cover
      }, /*#__PURE__*/_react.default.createElement(_xsCoreNative.Loader, null));
    }
    if (coverImage) {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Image, {
        source: coverImage,
        size: _xsCoreNative.ImageSizes.ExtraLarge,
        style: styles.coverContainer
      });
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.coverContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.coverButton
    }, plusButton()));
  }, [coverImage, isImageLoading]);
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
  const onChangeCover = (0, _react.useCallback)(async (_, uri, setFieldValue) => {
    if (_reactNative.Platform.OS === "android") {
      try {
        const granted = await _reactNative.PermissionsAndroid.request(_reactNative.PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: "Cool Photo App Camera Permission",
          message: "Cool Photo App needs access to your camera " + "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        });
        if (granted === _reactNative.PermissionsAndroid.RESULTS.GRANTED) {
          setCoverImage(uri);
        } else {
          navigation.navigate(_navigation.NavigationRoutes.Group_ImagePermissionScreen, {
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
  return /*#__PURE__*/_react.default.createElement(_xsCoreNative.Form, {
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.root
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.contentContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.labelStyle
    }, "\u041A\u043E\u0432\u0435\u0440 \u0437\u0443\u0440\u0430\u0433"), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Field, {
      name: "coverImage"
    }, ({}) => {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _reactNative.Platform.OS === "ios" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !permission.gallery ? /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
        onPress: check
      }, renderCover()) : /*#__PURE__*/_react.default.createElement(_xsCoreNative.ImageUpload, {
        onChange: (file, uri) => {
          setImageLoading(true);
          onChangeCover(file, uri, setFieldValue);
        },
        cropRect: {
          width: 1280,
          height: 640
        }
      }, renderCover())), _reactNative.Platform.OS === "android" && /*#__PURE__*/_react.default.createElement(_xsCoreNative.ImageUpload, {
        cropRect: {
          width: 1280,
          height: 640
        },
        onChange: (file, uri) => {
          setImageLoading(true);
          onChangeCover(file, uri, setFieldValue);
        }
      }, renderCover()));
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h20
    }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Field, {
      name: "category"
    }, ({
      value,
      error
    }) => {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.row
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.labelStyle
      }, "\u0411\u04AF\u043B\u0433\u0438\u0439\u043D \u0430\u043D\u0433\u0438\u043B\u0430\u043B"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: styles.errorText
      }, error)), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: () => navigation.navigate(_navigation.NavigationRoutes.Group_ChangeCategorySheet, {
          onChange: setFieldValue
        }),
        style: error ? [styles.fieldContainer, styles.error] : styles.fieldContainer
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: [styles.containerTitle, value && styles.primary]
      }, value ? value.name : "Ангилал"), /*#__PURE__*/_react.default.createElement(_xsCoreNative.ArrowBottomIcon, {
        size: _xsCoreNative.IconSizes.Medium,
        color: _xsCoreNative.Colors.primary
      })));
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h20
    }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Field, {
      name: "description"
    }, ({
      value,
      onChange,
      error
    }) => {
      return /*#__PURE__*/_react.default.createElement(_xsCoreNative.TextInput, {
        label: "\u0422\u0430\u0439\u043B\u0431\u0430\u0440",
        error: error,
        value: value,
        onChangeText: onChange,
        placeholder: "\u042D\u043D\u0434 \u0442\u0430\u0439\u043B\u0431\u0430\u0440\u0430\u0430 \u0431\u0438\u0447\u043D\u044D \u04AF\u04AF",
        placeholderTextColor: _xsCoreNative.Colors.gray103,
        style: error ? [styles.input, styles.error] : styles.input
      });
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.description
    }, "\u04E8\u04E9\u0440\u0438\u0439\u043D \u0431\u0440\u044D\u043D\u0434, \u0431\u0438\u0437\u043D\u0435\u0441, \u044D\u0441\u0432\u044D\u043B \u0431\u0430\u0439\u0433\u0443\u0443\u043B\u043B\u0430\u0433\u044B\u043D \u043D\u044D\u0440 \u0437\u044D\u0440\u044D\u0433 \u0445\u0443\u0443\u0434\u0441\u0430\u0430 \u0442\u0430\u043D\u0438\u043B\u0446\u0443\u0443\u043B\u0430\u0445\u0430\u0434 \u0430\u0448\u0438\u0433\u043B\u0430\u0445 \u043D\u044D\u0440\u0438\u0439\u0433 \u043E\u0440\u0443\u0443\u043B\u043D\u0430 \u0443\u0443.")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.h20
    }), /*#__PURE__*/_react.default.createElement(_xsCoreNative.Button, {
      title: "\u04AE\u0440\u0433\u044D\u043B\u0436\u043B\u04AF\u04AF\u043B\u044D\u0445",
      type: "primary",
      onPress: handleSubmit
    }));
  });
});
CreateGroupStep2Form.displayName = "CreateGroupStep2Form";
const styles = _reactNative.StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  root: {
    flex: 1,
    paddingHorizontal: 18
  },
  error: {
    borderColor: _xsCoreNative.Colors.sub200
  },
  input: {
    borderWidth: 1,
    borderColor: _xsCoreNative.Colors.gray102
  },
  errorText: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: _xsCoreNative.Colors.sub200
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
    borderColor: _xsCoreNative.Colors.gray102,
    borderRadius: 12,
    padding: 18
  },
  iconContainer: {
    backgroundColor: _xsCoreNative.Colors.primary,
    padding: 4,
    borderRadius: 100
  },
  cover: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: _xsCoreNative.Colors.gray102
  },
  primary: {
    color: _xsCoreNative.Colors.primary
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: _xsCoreNative.Colors.gray102,
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
    color: _xsCoreNative.Colors.gray104
  },
  coverContainer: {
    backgroundColor: _xsCoreNative.Colors.gray102,
    width: "100%",
    height: 150,
    borderRadius: 10
  },
  containerTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "400",
    color: _xsCoreNative.Colors.gray103
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
  }
});
//# sourceMappingURL=create-2-group.js.map