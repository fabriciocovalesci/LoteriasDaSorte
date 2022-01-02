import React, { useState } from "react";
import { BottomNavigation, View } from "react-native-paper";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Resultados from "../../Screens/UltimosResultados";
import EstatisticaRoute from "../EstatisticaRouter";
import Favoritos from "../../Screens/Favoritos";
import GeradorLoteria from "../../Screens/GeradorLoteria";
import Filtro from "../../Screens/Filtro";
import CriarFavorito from "../../Screens/Loterias/index";

const Stack = createNativeStackNavigator();

const StackFavoritos = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favoritos" component={Favoritos} />
      <Stack.Screen name="GeradorLoteria" component={GeradorLoteria} />
      <Stack.Screen name="CriarFavorito" component={CriarFavorito} />
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
    { key: "filtro", title: "Filtros", icon: "filter-plus", color: "#260085" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Resultados,
    gerador: GeradorLoteria,
    estatistica: EstatisticaRoute,
    favorito: StackFavoritos,
    filtro: Filtro,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
