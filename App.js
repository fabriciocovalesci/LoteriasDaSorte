import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./src/CustomProperties/Theme";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabScreen } from "./src/router/TabRouter";

import TopBar from "./src/Components/TopBar";
import CriarFiltro from "./src/Screens/CriarFiltro";
const Stack = createNativeStackNavigator();

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllSorteiosDataBase from "./src/Model/AllSorteiosDataBase";
import OcorrenciaDb from "./src/Model/OcorrenciaDb";
import AtrasoDb from "./src/Model/AtrasoDb";
import SequenciaDb from "./src/Model/SequenciaDb";
import CombinacoesDb from "./src/Model/CombinacoesDb";
import FavoritosDataBase from "./src/Model/FavoritosDataBase";


import { AllResultMega, AllResultFacil, AllResultMania, AllResultQuina } from './src/services/index'
import { EstatisMega } from "./src/services/estatisticas";



const Tab = createBottomTabNavigator()

export default function App() {

  const [loading, setLoading] = React.useState(true);
  const [allmega, setAllMega] = React.useState([]);

  
  const getAllResultsMega = () => {

    // let estat = await FavoritosDataBase.all()

    // console.log('================estat====================');
    // FavoritosDataBase.all().then(res => {
    //   console.log('-- > ', res.length);
    // }).catch(err => console.log('--- ',err))
    // console.log('1 ', estat.estatisAtrasoSeq);
    // console.log('2 ', estat.ocorrencias.length);
    // console.log('3 ', estat.somaParImpar.length);
    // console.log('4 ', Object.values(estat.percentSoma).length);
    // console.log('====================================');
    // setLoading(false)
    // setAllMega(allMega)
    // AllResultMega().then(res => {
    //   setAllMega(res)
    // })
    // AllSorteiosDataBase.all().then(register => {
    //   console.log(register.length);
    //   if(register.length === 0){
    //     allmega.filter(sorteios => {
    //       console.log(sorteios.nome);
    //         AllSorteiosDataBase.create({ 
    //           nome: sorteios.nome,
    //           concurso: sorteios.nome,
    //           data: sorteios.data,
    //           dezenas: JSON.stringify(sorteios.dezenas),
    //           premiacoes: JSON.stringify(sorteios.premiacoes),
    //           acumulou: sorteios.acumulou,
    //           acumuladaProxConcurso: sorteios.acumuladaProxConcurso,
    //           dataProxConcurso: sorteios.dataProxConcurso,
    //           proxConcurso: sorteios.proxConcurso
    //         }).then(save => {
    //           console.log('dados  !!  ', save);
    //           setLoading(false)
    //         })
    //     })
        
    //   }
    // })

    // if(allmega.length !== 0){
    //   setLoading(false)
    // }
  }

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