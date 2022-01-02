import * as React from "react";
import { View } from "react-native";
import { Text, Appbar, Menu } from "react-native-paper";
import { TabView, SceneMap } from 'react-native-tab-view';

import TopBar from "../../Components/TopBar";
import CriarFiltro from "../../Screens/CriarFiltro";
import ListarFiltro from "../../Screens/ListarFiltro";


const renderScene = SceneMap({
  first: ListarFiltro,
  second: CriarFiltro,
});

const FiltroRoute = () => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Filtros' },
      { key: 'second', title: 'Criar Filtros' }
    ]);
  

    return (
      <>
      <TopBar subtitle="Filtros"/>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 100 }}
      />
      </>
    )
}



export default FiltroRoute;
