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

    // const [visible, setVisible] = React.useState(false);
    // const openMenu = () => setVisible(true);
    // const closeMenu = () => setVisible(false);

    // const [back, setVisibleback] = React.useState(false);

    // function _back(){
    //     setVisibleback(!back)
    // }

    // return (
    //     <>
 
    //    <Appbar.Header>
    //     {back ? <Appbar.BackAction onPress={_back} /> : null}
    //     <Appbar.Content title="Minha Aposta" />
    //     {!back ? (
    //       <Menu
    //         visible={visible}
    //         onDismiss={closeMenu}
    //         anchor={
    //           <Appbar.Action icon="menu" color="white" onPress={openMenu} />
    //         }>
    //         <Menu.Item onPress={() => {console.log('Option 1 was pressed')}} title="Option 1" />
    //         <Menu.Item onPress={() => {console.log('Option 2 was pressed')}} title="Option 2" />
    //         <Menu.Item onPress={() => {console.log('Option 3 was pressed')}} title="Option 3" disabled />
    //       </Menu>
    //     ) : null}
    //   </Appbar.Header>
    //   <View>
    //        <Text>oi</Text>
    //    </View>
    //    </>
    // )
    // const layout = useWindowDimensions();

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
