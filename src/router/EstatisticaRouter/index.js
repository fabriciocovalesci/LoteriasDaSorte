import * as React from "react";
import { View } from "react-native";
import { Text, Appbar, Menu } from "react-native-paper";
import { TabView, SceneMap } from 'react-native-tab-view';

import TopBar from "../../Components/TopBar";



import EstatisticaMega from "../../Screens/EstatisticaMega";
import EstatisticaFacil from "../../Screens/EstatisticaFacil";
import EstatisticaMania from "../../Screens/EstatisticaMania";
import EstatisticaQuina from "../../Screens/EstatisticaQuina";


const renderScene = SceneMap({
  first: EstatisticaMega,
  second: EstatisticaFacil,
  tree: EstatisticaMania,
  fourt: EstatisticaQuina
});

const EstatisticaRoute = () => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Mega Sena' },
      { key: 'second', title: 'Loto Fácil' },
      { key: 'tree', title: 'Loto Mania' },
      { key: 'fourt', title: 'Quina' },
    ]);
  

    return (
      <>
      <TopBar subtitle="Estatistícas"/>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 100 }}
      />
      </>
    )
}



export default EstatisticaRoute;
