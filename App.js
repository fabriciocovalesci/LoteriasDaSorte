import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import theme from "./src/CustomProperties/Theme";
import { TabScreen } from "./src/router/TabRouter";

import TopBar from "./src/Components/TopBar";


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        {/* <TopBar /> */}
        <TabScreen />
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});