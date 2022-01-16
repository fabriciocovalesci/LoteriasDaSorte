import * as React from 'react';
import { Surface, Text, Title, IconButton, Colors , TextInput, Button} from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import SegmentedControlTab from "react-native-segmented-control-tab";
import { styles } from './styles'

import ModalGerador from "../../Components/ModalGerador";
import TopBar from '../../Components/TopBar';
import CriarFiltro from '../CriarFiltro';

import CardGenerate from '../../Components/CardGenerate';

import UltimosResultadoDb from '../../Model/UltimosResultadoDb';

import { getFilter } from '../../services/filtros';

import {
    ResultadoMegaSena,
    ResultadoLotoFacil,
    ResultadoLotoMania,
    ResultadoQuina
}
    from "../../services";

const GeradorLoteria = ({ route }) => {

    console.log(route);

    const [selected, setStateBtn] = React.useState(0)
    const [loteriaMega, setloteriaMega] = React.useState({ nome: '', numeros: '' });
    const [loteriaFacil, setloteriaFacil] = React.useState({ nome: '', numeros: '' });
    const [loteriaMania, setloteriaMania] = React.useState({ nome: '', numeros: '' });
    const [loteriaQuina, setloteriaQuina] = React.useState({ nome: '', numeros: '' });

    function generate(min, max, quantidade) {
        let numbers = []
        while(numbers.length < quantidade){
            min = Math.ceil(min);
            max = Math.floor(max);
            let aleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
            if(numbers.indexOf(aleatorio + ' ') === -1) numbers.push(aleatorio + ' ');
        }
        return numbers.sort((a, b) => {return a-b});
    } 

    function toogleGenerate(loteria){
        if (loteria !== undefined && loteria !== null) {
            if (loteria === 'megasena') {
                setloteriaMega({ nome: 'Mega Sena', numeros: generate(1, 60, 6) })
            }
            if (loteria === 'lotofacil') {
                setloteriaFacil({ nome: 'Loto Fácil', numeros: generate(1, 25, 15) })
   
            }
            if (loteria === 'lotomania') {
                setloteriaMania({ nome: 'Loto Mania', numeros: generate(1, 50, 20) })
            }
            if (loteria === 'quina') {
                setloteriaQuina({ nome: 'Quina', numeros: generate(1, 80, 5) })
            }
        }
    }

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

    React.useEffect(() => {
        function initial(){
            setloteriaMega({ nome: 'Mega Sena', numeros: generate(1, 60, 6) })
            setloteriaFacil({ nome: 'Loto Fácil', numeros: generate(1, 25, 15) })
            setloteriaMania({ nome: 'Loto Mania', numeros: generate(1, 50, 20) })
            setloteriaQuina({ nome: 'Quina', numeros: generate(1, 80, 5) })

            // UltimosResultadoDb.all().then((res) => {
            //     console.log('====================================');
            //     console.log(res);
            //     console.log('====================================');
            // }).catch(err => console.log(err))
        }
        initial()
    }, [])

    return (
        <>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: 'center', marginBottom: 10 }}>
                <View style={{ justifyContent: "center", alignItems: "flex-end", marginTop: 25 }}>
                <Title style={{ textAlign: "center", fontSize: 20 }}>Minha Surpresinha</Title>
                </View>
                <TouchableOpacity onPress={() => alert(getFilter(selected))}>
                <View onc style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                <IconButton
                icon="filter-menu-outline"
                style={{ marginRight: 0 }}
                color={Colors.black}
                size={20}
                />
                <Text style={{ fontSize: 14 }}>Filtros</Text>
                </View>
                </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 0, marginTop: 5, marginLeft: 5, marginRight: 5 }}>
                <SegmentedControlTab
                    values={["Mega Sena", "Loto Facil", "Loto Mania", "Quina"]}
                    selectedIndex={selected}
                    onTabPress={index => setStateBtn(index)}
                />
                </View>
        <ScrollView>
        <View style={{ flex: 1 }}>       
        { selected === 0 ? 
            <View >
            <CardGenerate title={loteriaMega.nome} loteria={'megasena'} gerarNumeros={toogleGenerate} numeros={loteriaMega.numeros} proxDataConcurso={megasena.dataProxConcurso} proxConcurso={megasena.proxConcurso} />
            </View>
            : selected === 1 ? 
            <View>
                <CardGenerate title={loteriaFacil.nome} loteria="lotofacil" gerarNumeros={toogleGenerate} numeros={loteriaFacil.numeros} proxDataConcurso={lotofacil.dataProxConcurso} proxConcurso={lotofacil.proxConcurso} />
            </View>
            : selected === 2 ? 
            <View>
                <CardGenerate title={loteriaMania.nome} loteria="lotomania" gerarNumeros={toogleGenerate} numeros={loteriaMania.numeros} proxDataConcurso={lotoMania.dataProxConcurso} proxConcurso={lotoMania.proxConcurso} />
            </View>
            : 
            <View>
                <CardGenerate title={loteriaQuina.nome} loteria="quina" gerarNumeros={toogleGenerate} numeros={loteriaQuina.numeros} proxDataConcurso={quina.dataProxConcurso} proxConcurso={quina.proxConcurso} />
            </View>
        }
     </View>
     </ScrollView>
        </>
    );
}

export default GeradorLoteria;