import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import theme from "./src/CustomProperties/Theme";
import MainScreen from "./src/Screens/MainScreen";
import TopBar from "./src/Components/TopBar";


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        {/* <TopBar /> */}
        <MainScreen />
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