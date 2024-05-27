import React, { memo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  type BottomSheetParamList,
  NavigationRoutes,
  type RootStackParamList,
} from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { DiscoveredTabScreen } from "../../components/tab-list/discovered-groups";
import { MyGroupTabScreen } from "../../components/tab-list/my-groups";
import { LabelRenderer } from "../../components/layout/tab-bar-label-render";

const width = Dimensions.get("window").width;

const HomeScreen = memo(() => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<BottomSheetParamList & RootStackParamList & any>
    >();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <Tabs.Container
        initialTabName={"MY"}
        renderHeader={() => <View />}
        headerContainerStyle={{
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
          shadowOpacity: 0,
          shadowRadius: 0,
        }}
        lazy={true}
        renderTabBar={props => (
          <View style={{ marginHorizontal: 18 }}>
            <MaterialTabBar
              {...props}
              indicatorStyle={{ backgroundColor: "#000" }}
              width={width - 30}
            />
          </View>
        )}>
        <Tabs.Tab
          name={"MY"}
          label={props => <LabelRenderer tabProps={props} />}>
          <MyGroupTabScreen />
        </Tabs.Tab>
        <Tabs.Tab
          name={"DISCOVER"}
          label={props => <LabelRenderer tabProps={props} />}>
          <DiscoveredTabScreen />
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    zIndex: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.primary,
  },
});

HomeScreen.displayName = "UserHomeScreen";

export { HomeScreen };
