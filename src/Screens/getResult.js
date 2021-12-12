import * as React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";

import { ResultadoMegaSena } from "../services";


// acumuladaProxConcurso: "R$ 37 Milhões"
// acumulou: true
// concurso: 2434
// data: "04/12//2021"
// dataProxConcurso: "07/12/2021"
// dezenas: (6) ['01', '02', '14', '28', '40', '51']
// estadosPremiados: []
// local: "ESPAÇO LOTERIAS CAIXA em SÃO PAULO, SP"
// loteria: "mega-sena"
// mesSorte: null
// nome: "Mega-Sena"
// premiacoes: Array(3)
// 0: {acertos: 'Sena', vencedores: 0, premio: '-'}
// 1: {acertos: 'Quina', vencedores: 37, premio: '75.710,54'}
// 2: {acertos: 'Quadra', vencedores: 3663, premio: '1.092,50'}


const ResultMega = () => {

    let [megasena, setMega] = React.useState({acumuladaProxConcurso: '', acumulou: '', 
    concurso: '', dataProxConcurso: '', dezenas: [], estadosPremiados: [], 
    local: '', premiacoes: [] });

    let state = false;
    function teste() {
        state = !state;
        console.log(state);
        return state;
    }

    const getSena = async () => {
        let mega = await ResultadoMegaSena();
        setMega(...mega)
        console.log(megasena)
    }

    return (
        <React.Fragment>
            <View>
                <Text>MEGA </Text>

                <Button onPress={getSena}>Resultado</Button>
            </View>
        </React.Fragment>

    )
}

export default ResultMega;