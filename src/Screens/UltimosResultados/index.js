import * as React from "react";
import { Modal, Portal, Text, Button, Provider, Card, Divider } from 'react-native-paper';
import { ScrollView } from "react-native";
import { styles } from './styles'
import TopBar from "../../Components/TopBar";

import UltimosResultadoDb from "../../Model/UltimosResultadoDb";

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

    const [loadingData, setloadingData] = React.useState(true)

    let [megasena, setMega] = React.useState({
        acumuladaProxConcurso: '', acumulou: '',
        concurso: '', dataProxConcurso: '', dezenas: [], estadosPremiados: [],
        local: '', premiacoes: [], loteria: '', nome: '', data: '', proxConcurso: ''
    });

    let [lotofacil, setLotoFacil] = React.useState({
        acumuladaProxConcurso: '', acumulou: '',
        concurso: '', dataProxConcurso: '', dezenas: [], estadosPremiados: [],
        local: '', premiacoes: [], loteria: '', nome: '', data: '', proxConcurso: ''
    });

    let [lotoMania, setLotoMania] = React.useState({
        acumuladaProxConcurso: '', acumulou: '',
        concurso: '', dataProxConcurso: '', dezenas: [], estadosPremiados: [],
        local: '', premiacoes: [], loteria: '', nome: '', data: '', proxConcurso: ''
    });

    let [quina, setQuina] = React.useState({
        acumuladaProxConcurso: '', acumulou: '',
        concurso: '', dataProxConcurso: '', dezenas: [], estadosPremiados: [],
        local: '', premiacoes: [], loteria: '', nome: '', data: '', proxConcurso: ''
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

    // React.useEffect(() => {
    //     async function savedData() {
    //         console.log(megasena);
    //     UltimosResultadoDb.create({nome: megasena.nome, dezena: JSON.stringify(megasena.dezenas), concurso: parseInt(megasena.concurso), dataProxConcurso: megasena.dataProxConcurso, proxConcurso: parseInt(megasena.proxConcurso)}).then((res) => console.log("Ultimos resultados da mega sena salvos!! ", res)).catch((err) => console.error("Error ao salvar dados da mega senha ", err))
    //     // UltimosResultadoDb.create({nome: lotofacil.nome, dezena: JSON.stringify(lotofacil.dezenas), concurso: parseInt(lotofacil.concurso), dataProxConcurso: lotofacil.dataProxConcurso, proxConcurso: parseInt(lotofacil.proxConcurso)}).then((res) => console.log("Ultimos resultados da lotofacil salvos!! ", res)).catch((err) => console.error("Error ao salvar dados da lotofacil ", err))
    //     // UltimosResultadoDb.create({nome: lotoMania.nome, dezena: JSON.stringify(lotoMania.dezenas), concurso: parseInt(lotoMania.concurso), dataProxConcurso: lotoMania.dataProxConcurso, proxConcurso: parseInt(lotoMania.proxConcurso)}).then((res) => console.log("Ultimos resultados da lotoMania salvos!! ", res)).catch((err) => console.error("Error ao salvar dados da lotoMania ", err))
    //     // UltimosResultadoDb.create({nome: quina.nome, dezena: JSON.stringify(quina.dezenas), concurso: parseInt(quina.concurso), dataProxConcurso: quina.dataProxConcurso, proxConcurso: parseInt(quina.proxConcurso)}).then((res) => console.log("Ultimos resultados da quina salvos!! ", res)).catch((err) => console.error("Error ao salvar dados da quina ", err))
    //     setloadingData(false)
    // }
    // savedData()
    
    // },[loadingData])

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