import React, { useState } from "react";
import { BottomNavigation, View } from "react-native-paper";

import Resultados from "../../Screens/UltimosResultados";
import EstatisticaRoute from "../EstatisticaRouter";
import Favoritos from "../../Screens/Favoritos";
import GeradorLoteria from "../../Screens/GeradorLoteria";

import CriarFavorito from "../../Screens/Loterias/index";

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

const FirstRoute = () => {
  return (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
)};

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const TreeRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673a99' }} />
);

const FourtRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673a00' }} />
);

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favoritos" component={Favoritos} />
      <Stack.Screen name="GeradorLoteria" component={GeradorLoteria} />
      <Stack.Screen name="CriarFavorito" component={CriarFavorito} />
      <Stack.Screen name="TreeRoute" component={TreeRoute} />
      <Stack.Screen name="FourtRoute" component={FourtRoute} />
    </Stack.Navigator>
  );
}


export const TabScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "home", title: "Home", icon: "home", color: "#3F51B5" },
    { key: "gerador", title: "Gerador", icon: "counter", color: "#795548" },
    { key: "estatistica", title: "Estatísticas", icon: "chart-bar-stacked", color: "#0349fc" },
    { key: "favorito", title: "Favoritos", icon: "heart", color: "#009688" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Resultados,
    gerador: GeradorLoteria,
    estatistica: EstatisticaRoute,
    favorito: MyStack
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
