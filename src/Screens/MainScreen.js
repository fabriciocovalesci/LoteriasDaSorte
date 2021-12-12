import React, { useState } from "react";
import FeedLoteria from "./FeedLoteria";

import EstatisticaRoute from "./EstatisticaRoute";
import FavoritoRoute from "./FavoritoRoute";
import GeradorRoute from "./GeradorRoute";

import LoteriaFacil from "./Loterias/LoteriaFacil";

import { BottomNavigation } from "react-native-paper";

const Screen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "home", title: "Home", icon: "home", color: "#3F51B5" },
    { key: "gerador", title: "Gerador", icon: "counter", color: "#795548" },
    { key: "estatistica", title: "Estatísticas", icon: "chart-bar-stacked", color: "#0349fc" },
    { key: "favorito", title: "Favoritos", icon: "heart", color: "#009688" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: FeedLoteria,
    gerador: GeradorRoute,
    estatistica: EstatisticaRoute,
    favorito: LoteriaFacil
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Screen;