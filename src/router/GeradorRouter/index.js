import * as React from "react";
import { View } from "react-native";
import { Text, Appbar, Menu } from "react-native-paper";
import { TabView, SceneMap } from 'react-native-tab-view';

import TopBar from "../../Components/TopBar";

import GeradorLotofacil from "../../Screens/GeradorLoteria/GeradorLotoFacil";
import GeradorLotoMania from "../../Screens/GeradorLoteria/GeradorLotoMania";
import GeradorMegaSena from "../../Screens/GeradorLoteria/GeradorMegaSena";
import GeradorQuina from "../../Screens/GeradorLoteria/GeradorQuina";

import GeradorLoteria from "../../Screens/GeradorLoteria";


const renderScene = SceneMap({
    first: GeradorMegaSena,
    second: GeradorLotofacil,
    tree: GeradorLotoMania,
    fourt: GeradorQuina
});

const GeradorRoute = () => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Mega Sena' },
      { key: 'second', title: 'Loto Fácil' },
      { key: 'tree', title: 'Loto Mania' },
      { key: 'fourt', title: 'Quina' },
    ]);
  

    return (
      <>
      <TopBar subtitle="Gerador de loterias aleatórios"/>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 100 }}
      />
      </>
    )
}



export default GeradorRoute;
