import * as React from "react";
import { View } from "react-native";
import { Text, Appbar, Menu } from "react-native-paper";
import { TabView, SceneMap } from 'react-native-tab-view';

import TopBar from "../../Components/TopBar";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const TreeRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673a99' }} />
);

const FourtRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673a00' }} />
);


const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  tree: TreeRoute,
  fourt: FourtRoute
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
