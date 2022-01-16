import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./src/CustomProperties/Theme";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabScreen } from "./src/router/TabRouter";

const Stack = createNativeStackNavigator();

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator()

export default function App() {

  React.useEffect(() => {



  },[])

  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
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

/*

a42ee0b8-7a9a-46b1-8bc3-4e175c144411
onesignal

*/