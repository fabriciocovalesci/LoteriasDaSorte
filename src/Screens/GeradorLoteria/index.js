import * as React from 'react';
import { Surface, Text, Title } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { styles } from './styles'

import ModalGerador from "../../Components/ModalGerador";
import TopBar from '../../Components/TopBar';

const GeradorLoteria = () => {
    const [visibleMega, setVisibleMega] = React.useState(false);
    const [visibleFacil, setVisibleFacil] = React.useState(false);
    const [visibleMania, setVisibleMania] = React.useState(false);
    const [visibleQuina, setVisibleQuina] = React.useState(false);
    const [loterias, setLoteria] = React.useState({ nome: '', numeros: '' })

    const hideDialog = () => {
        setVisibleMega(false);
        setVisibleFacil(false);
        setVisibleMania(false);
        setVisibleQuina(false)
    }

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

    function toogleModal(loteria) {
        if (loteria !== undefined && loteria !== null) {
            if (loteria === 'megasena') {
                setLoteria({ nome: 'Mega Sena', numeros: generate(1, 60, 6) })
                setVisibleMega(!visibleMega)
            }
            if (loteria === 'lotofacil') {
                setLoteria({ nome: 'Loto Fácil', numeros: generate(1, 25, 15) })
                setVisibleFacil(!visibleFacil)
            }
            if (loteria === 'lotomania') {
                setLoteria({ nome: 'Loto Mania', numeros: generate(1, 50, 20) })
                setVisibleMania(!visibleMania)
            }
            if (loteria === 'quina') {
                setLoteria({ nome: 'Quina', numeros: generate(1, 80, 5) })
                setVisibleQuina(!visibleQuina)
            }
        }
    }

    return (
        <>
        <TopBar subtitle="Gerador de loterias aleatórios" />
        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
            <View style={{ alignSelf: "center" }}>
                <Title>Minha Surpresinha</Title>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                <ModalGerador title={loterias.nome} numeros={loterias.numeros} isVisible={visibleMega} hideDialog={hideDialog} />
                <TouchableOpacity onPress={() => toogleModal('megasena')}>
                    <Surface style={styles.surfaceMega}>
                        <Text style={styles.surfaceText}>Mega Sena</Text>
                    </Surface>
                </TouchableOpacity>

                <ModalGerador title={loterias.nome} numeros={loterias.numeros} isVisible={visibleFacil} hideDialog={hideDialog} />
                <TouchableOpacity onPress={() => toogleModal('lotofacil')}>
                    <Surface style={styles.surfaceFacil}>
                        <Text style={styles.surfaceText}>Loto Fácil</Text>
                    </Surface>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <ModalGerador title={loterias.nome} numeros={loterias.numeros} isVisible={visibleMania} hideDialog={hideDialog} />
                <TouchableOpacity onPress={() => toogleModal('lotomania')}>
                    <Surface style={styles.surfaceMania}>
                        <Text style={styles.surfaceText}>Loto Mania</Text>
                    </Surface>
                </TouchableOpacity>
                <ModalGerador title={loterias.nome} numeros={loterias.numeros} isVisible={visibleQuina} hideDialog={hideDialog} />
                <TouchableOpacity onPress={() => toogleModal('quina')}>
                    <Surface style={styles.surfaceQuina}>
                        <Text style={styles.surfaceText}>Quina</Text>
                    </Surface>
                </TouchableOpacity>
            </View>
        </View>
        </>
    );
}

export default GeradorLoteria;