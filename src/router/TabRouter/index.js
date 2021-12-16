import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";

import Resultados from "../../Screens/UltimosResultados";
import EstatisticaRoute from "../EstatisticaRouter";
import Favoritos from "../../Screens/Favoritos";
import GeradorLoteria from "../../Screens/GeradorLoteria";


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
    favorito: Favoritos
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
