import * as React from "react";

import { Modal, Portal, Text, Button, Provider, Card, Divider } from 'react-native-paper';

import CustomCard from "../Components/CustomCard";
import ResultCardMega from "./Loterias/LoteriaMega";
import SearchBar from "../Components/SearchBar";
import elements from "../CustomProperties/elements";
import { ScrollView } from "react-native";

import TopBar from "../Components/TopBar";

import { ResultadoMegaSena, ResultadoLotoFacil, ResultadoLotoMania, ResultadoQuina } from "../services";
import CardFeedLoteria from "../Components/CardFeedLoteria";
import { CardFeedLoteriaMega, CardFeedLoteriaLotoFacil, CardFeedLoteriaLotoMania, CardFeedLoteriaQuina } from "../Components/CardFeedLoteria";

const FeedLoteria = () => {



  let [megasena, setMega] = React.useState({
    acumuladaProxConcurso: '', acumulou: '',
    concurso: '', dataProxConcurso: '', dezenas: [], estadosPremiados: [],
    local: '', premiacoes: [], loteria: '', nome: '', data: ''
  });

  let [lotofacil, setLotoFacil] = React.useState({
    acumuladaProxConcurso: '', acumulou: '',
    concurso: '', dataProxConcurso: '', dezenas: [], estadosPremiados: [],
    local: '', premiacoes: [], loteria: '', nome: '', data: ''
  });

  let [lotoMania, setLotoMania] = React.useState({
    acumuladaProxConcurso: '', acumulou: '',
    concurso: '', dataProxConcurso: '', dezenas: [], estadosPremiados: [],
    local: '', premiacoes: [], loteria: '', nome: '', data: ''
  });

  let [quina, setQuina] = React.useState({
    acumuladaProxConcurso: '', acumulou: '',
    concurso: '', dataProxConcurso: '', dezenas: [], estadosPremiados: [],
    local: '', premiacoes: [], loteria: '', nome: '', data: ''
  });

  React.useEffect(() => {
    async function loadDataMega() {
      Promise.all([ResultadoMegaSena(), ResultadoLotoFacil(), ResultadoLotoMania(), ResultadoQuina()]).then((values) => {
        console.log(values)
        setMega(values[0].data)
        setLotoFacil(values[1].data)
        setLotoMania(values[2].data)
        setQuina(values[3].data)
      })
    }
    loadDataMega();
  }, []);

  return (
    <React.Fragment>
      <TopBar subtitle="Úlimos resultados"/>


      <ScrollView style={{ margin: 15 }}>

      <CardFeedLoteriaMega acumulou={megasena.acumulou} acumuladaProxConcurso={megasena.acumuladaProxConcurso} premiacoes={megasena.premiacoes}  dezenas={megasena.dezenas} nome={megasena.nome} concurso={megasena.concurso} data={megasena.data}/>

      <Divider style={{ marginTop: 10, marginBottom: 10 }} />

      <CardFeedLoteriaLotoFacil acumulou={lotofacil.acumulou} acumuladaProxConcurso={lotofacil.acumuladaProxConcurso} premiacoes={lotofacil.premiacoes}  dezenas={lotofacil.dezenas} nome={lotofacil.nome} concurso={lotofacil.concurso} data={lotofacil.data}/>

      <Divider style={{ marginTop: 10, marginBottom: 10 }} />

      <CardFeedLoteriaLotoMania acumulou={lotoMania.acumulou} acumuladaProxConcurso={lotoMania.acumuladaProxConcurso} premiacoes={lotoMania.premiacoes} dezenas={lotoMania.dezenas} nome={lotoMania.nome} concurso={lotoMania.concurso} data={lotoMania.data}/>

      <Divider style={{ marginTop: 10, marginBottom: 10 }} />

      <CardFeedLoteriaQuina acumulou={quina.acumulou} acumuladaProxConcurso={quina.acumuladaProxConcurso} premiacoes={quina.premiacoes} dezenas={quina.dezenas} nome={quina.nome} concurso={quina.concurso} data={quina.data}/>

      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      
      
        {/* <CustomCard.CustomCardMega
          key={'1' + megasena.loteria}
          title={megasena.nome}
          content={megasena.acumuladaProxConcurso}
          concurso={megasena.concurso}
          data={megasena.data}
          acumulou={megasena.acumulou}
          acumuladaProxConcurso={megasena.acumuladaProxConcurso}
          local={megasena.local}
          dezenas={megasena.dezenas}
          premiacoes={megasena.premiacoes}
          name={megasena.loteria}
          estadosPremiados={megasena.estadosPremiados}
        />

        <CustomCard.CustomCardLotoFacil
          key={'2' + lotofacil.loteria}
          title={lotofacil.nome}
          content={lotofacil.acumuladaProxConcurso}
          concurso={lotofacil.concurso}
          data={lotofacil.data}
          acumulou={lotofacil.acumulou}
          acumuladaProxConcurso={lotofacil.acumuladaProxConcurso}
          local={lotofacil.local}
          dezenas={lotofacil.dezenas}
          premiacoes={lotofacil.premiacoes}
          name={lotofacil.loteria}
        />

        <CustomCard.CustomCardLotoMania
          key={'3' + lotoMania.loteria}
          title={lotoMania.nome}
          content={lotoMania.acumuladaProxConcurso}
          concurso={lotoMania.concurso}
          data={lotoMania.data}
          acumulou={lotoMania.acumulou}
          acumuladaProxConcurso={lotoMania.acumuladaProxConcurso}
          local={lotoMania.local}
          dezenas={lotoMania.dezenas}
          premiacoes={lotoMania.premiacoes}
          name={lotoMania.loteria}
        /> */}

        {/* <CustomCard.CustomCardQuina
          key={'4' + quina.loteria}
          title={quina.nome}
          content={quina.acumuladaProxConcurso}
          concurso={quina.concurso}
          data={quina.data}
          acumulou={quina.acumulou}
          acumuladaProxConcurso={quina.acumuladaProxConcurso}
          local={quina.local}
          dezenas={quina.dezenas}
          premiacoes={quina.premiacoes}
          name={quina.loteria}
        /> */}

      </ScrollView>
    </React.Fragment>
  );
};

export default FeedLoteria;