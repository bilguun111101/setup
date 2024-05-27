import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Button, Colors, CommunityIcon, Empty, IconSizes } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation";
const InviteMemberSheet = /*#__PURE__*/memo(props => {
  const {
    payload
  } = props;
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();
  const listHeaderComponent = useCallback(() => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.headerContainer
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.titleContainer
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.title
    }, payload.name)));
  }, []);
  const listFooterComponent = useCallback(() => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.footer
    }, /*#__PURE__*/React.createElement(Button, {
      onPress: () => navigation.navigate(NavigationRoutes.Group_InviteUsersScreen, {
        payload: payload
      }),
      title: "Жагсаалт"
    }));
  }, [payload, navigation]);
  return /*#__PURE__*/React.createElement(BottomSheet, {
    ref: bottomSheetRef,
    snapPoints: [260],
    index: 0,
    enablePanDownToClose: true,
    handleIndicatorStyle: styles.handleIndicator,
    backgroundStyle: styles.background,
    style: styles.bottomSheet
  }, /*#__PURE__*/React.createElement(View, null, listHeaderComponent(), /*#__PURE__*/React.createElement(Empty, {
    title: "\u041D\u0430\u0439\u0437\u0443\u0443\u0434\u0430\u0430 \u0443\u0440\u0438\u0445",
    description: "",
    icon: /*#__PURE__*/React.createElement(CommunityIcon, {
      color: Colors.white,
      size: IconSizes.ExtraLarge
    })
  }), listFooterComponent()));
});
InviteMemberSheet.displayName = "InviteMemberSheet";
export { InviteMemberSheet };
const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.base100,
    flex: 1
  },
  h15: {
    height: 15
  },
  contentContainer: {
    padding: 16,
    backgroundColor: "white"
  },
  empty: {
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    backgroundColor: "white"
  },
  handleIndicator: {
    backgroundColor: "gray"
  },
  background: {
    backgroundColor: Colors.white
  },
  listStyle: {},
  listContent: {
    marginTop: 10,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 20
  },
  headerContainer: {
    backgroundColor: Colors.gray101
  },
  inputContainer: {
    padding: 18,
    backgroundColor: Colors.white
  },
  input: {
    backgroundColor: Colors.gray101
  },
  titleContainer: {
    backgroundColor: Colors.white,
    paddingTop: 10
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "500",
    color: Colors.primary,
    textAlign: "center"
  },
  footer: {
    paddingHorizontal: 18
  }
});
//# sourceMappingURL=invite-members.js.map