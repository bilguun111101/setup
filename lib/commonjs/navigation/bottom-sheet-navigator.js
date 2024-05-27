"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomSheetNavigator = void 0;
Object.defineProperty(exports, "chatBottomSheetRootStack", {
  enumerable: true,
  get: function () {
    return _xsChatNative.chatBottomSheetRootStack;
  }
});
exports.groupBottomSheetRootStack = void 0;
Object.defineProperty(exports, "postBottomSheetRootStack", {
  enumerable: true,
  get: function () {
    return _xsPostNative.postBottomSheetRootStack;
  }
});
Object.defineProperty(exports, "settingsBottomSheetRootStack", {
  enumerable: true,
  get: function () {
    return _xsSettingsNative.settingsBottomSheetRootStack;
  }
});
Object.defineProperty(exports, "userBottomSheetRootStack", {
  enumerable: true,
  get: function () {
    return _xsUserNative.userBottomSheetRootStack;
  }
});
var _react = _interopRequireDefault(require("react"));
var _reactNavigationBottomSheet = require("@th3rdwave/react-navigation-bottom-sheet");
var _rootStackNavigator = require("./root-stack-navigator");
var _types = require("./types");
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _rule = require("../sheets/rule");
var _userMore = require("../sheets/user-more");
var _askPassword = require("../sheets/ask-password");
var _remove = require("../sheets/remove");
var _join = require("../sheets/join");
var _changePrivacy = require("../sheets/change-privacy");
var _changeCategory = require("../sheets/change-category");
var _changeName = require("../sheets/change-name");
var _xsUserNative = require("@goodtechsoft/xs-user-native");
var _changePostType = require("../sheets/change-post-type");
var _xsPostNative = require("@goodtechsoft/xs-post-native");
var _deleteConfirm = require("../sheets/delete-confirm");
var _xsChatNative = require("@goodtechsoft/xs-chat-native");
var _xsSettingsNative = require("@goodtechsoft/xs-settings-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const BottomSheet = (0, _reactNavigationBottomSheet.createBottomSheetNavigator)();
const {
  Navigator,
  Screen,
  Group
} = BottomSheet;
const groupBottomSheetRootStack = insets => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Group, null, /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_RuleSheet,
    component: _rule.RuleSheet,
    options: {
      backdropComponent: _xsCoreNative.SheetBackdrop,
      snapPoints: [240],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_UserMoreSheet,
    component: _userMore.UserMoreSheet,
    options: {
      backdropComponent: _xsCoreNative.SheetBackdrop,
      snapPoints: [400],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_RemoveSheet,
    component: _remove.RemoveSheet,
    options: {
      backdropComponent: _xsCoreNative.SheetBackdrop,
      snapPoints: [320],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_AskPasswordSheet,
    component: _askPassword.AskPasswordSheet,
    options: {
      backdropComponent: _xsCoreNative.SheetBackdrop,
      snapPoints: [80],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_JoinSheet,
    component: _join.JoinSheet,
    options: {
      backdropComponent: _xsCoreNative.SheetBackdrop,
      snapPoints: ["90%"],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_ChangePrivacySheet,
    component: _changePrivacy.ChangePrivacySheet,
    options: {
      backdropComponent: _xsCoreNative.SheetBackdrop,
      snapPoints: [250],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_ChangePostTypeSheet,
    component: _changePostType.ChangePostTypeSheet,
    options: {
      backdropComponent: _xsCoreNative.SheetBackdrop,
      snapPoints: [250],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_ChangeCategorySheet,
    component: _changeCategory.ChangeCategorySheet,
    options: {
      backdropComponent: _xsCoreNative.SheetBackdrop,
      snapPoints: [460],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_ChangeNameSheet,
    component: _changeName.ChangeNameSheet,
    options: {
      backdropComponent: _xsCoreNative.SheetBackdrop,
      snapPoints: [220],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/_react.default.createElement(Screen, {
    name: _types.NavigationRoutes.Group_DeleteConfirmSheet,
    component: _deleteConfirm.DeleteConfirmSheet,
    options: {
      backdropComponent: _xsCoreNative.SheetBackdrop,
      snapPoints: [300],
      index: 1,
      topInset: insets.top
    }
  })));
};
exports.groupBottomSheetRootStack = groupBottomSheetRootStack;
const BottomSheetNavigator = () => {
  return /*#__PURE__*/_react.default.createElement(Navigator, null, /*#__PURE__*/_react.default.createElement(Screen, {
    name: "Group_RootStackNavigator",
    component: _rootStackNavigator.RootStackNavigator
  }));
};
exports.BottomSheetNavigator = BottomSheetNavigator;
//# sourceMappingURL=bottom-sheet-navigator.js.map