import * as React from "react";
import { Modal, Portal, Text, Button, Provider, Card, Divider } from 'react-native-paper';
import { ScrollView } from "react-native";
import { styles } from './styles'
import TopBar from "../../Components/TopBar";

import {
    ResultadoMegaSena,
    ResultadoLotoFacil,
    ResultadoLotoMania,
    ResultadoQuina
}
    from "../../services";

import {
    CardFeedLoteriaMega,
    CardFeedLoteriaLotoFacil,
    CardFeedLoteriaLotoMania,
    CardFeedLoteriaQuina
}
    from "../../Components/CardFeedLoteria";

const Resultados = () => {

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
               if(values !== undefined && values !== null){
                   setMega(values[0].data)
                   setLotoFacil(values[1].data)
                   setLotoMania(values[2].data)
                   setQuina(values[3].data)
               }
            })
        }
        loadDataMega();
    }, []);

    return (
        <React.Fragment>
            <TopBar subtitle="Úlimos resultados" />

            <ScrollView style={{ margin: 15 }}>

                <CardFeedLoteriaMega acumulou={megasena.acumulou} acumuladaProxConcurso={megasena.acumuladaProxConcurso} premiacoes={megasena.premiacoes} dezenas={megasena.dezenas} nome={megasena.nome} concurso={megasena.concurso} data={megasena.data} />

                <Divider style={styles.divider} />

                <CardFeedLoteriaLotoFacil acumulou={lotofacil.acumulou} acumuladaProxConcurso={lotofacil.acumuladaProxConcurso} premiacoes={lotofacil.premiacoes} dezenas={lotofacil.dezenas} nome={lotofacil.nome} concurso={lotofacil.concurso} data={lotofacil.data} />

                <Divider style={styles.divider} />

                <CardFeedLoteriaLotoMania acumulou={lotoMania.acumulou} acumuladaProxConcurso={lotoMania.acumuladaProxConcurso} premiacoes={lotoMania.premiacoes} dezenas={lotoMania.dezenas} nome={lotoMania.nome} concurso={lotoMania.concurso} data={lotoMania.data} />

                <Divider style={styles.divider} />

                <CardFeedLoteriaQuina acumulou={quina.acumulou} acumuladaProxConcurso={quina.acumuladaProxConcurso} premiacoes={quina.premiacoes} dezenas={quina.dezenas} nome={quina.nome} concurso={quina.concurso} data={quina.data} />

                <Divider style={styles.divider} />

            </ScrollView>
        </React.Fragment>
    );
};

export default Resultados;