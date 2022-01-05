import { View, Text, ScrollView } from 'react-native'

import * as React from 'react';
import { Dimensions, StyleSheet, Keyboard } from 'react-native'
import { Button, Snackbar, Dialog, Switch, Paragraph, TextInput, Provider, Chip, Checkbox, Menu, Divider } from 'react-native-paper';

import FavoritosDataBase from '../../Model/FavoritosDataBase';
import { insertFiltro } from '../../Model/FiltroDb';
import CardFilter from '../../Components/CardFilter'

import Slider from '@react-native-community/slider';
import FiltroDb from '../../Model/FiltroDb';


export default function CriarFiltro({ route }) {
       
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);


    const [nome, setNome] = React.useState('')
    const [maiorOcorrencia, setMaiorOcorrencia] = React.useState(false)
    const [menorOcorrencia, setMenorOcorrencia] = React.useState(false)
    const [maiorAtraso, setMaiorAtraso] = React.useState(false)
    const [menorAtraso, setMenorAtraso] = React.useState(false)

    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);
  
    const closeMenu = () => setVisible(false);

    const [sliderDezenas, setSliderDezenas] = React.useState(6);
    const [sliderMaxDezenas, setSliderMaxDezenas] = React.useState(15);
    const [sliderMegaPar, setSliderMegaPar] = React.useState(3);
    const [sliderMegaImpar, setSliderMegaImpar] = React.useState(3);
    const [ultimosconcurso, setUltimosConcurso] = React.useState(10)

    const [valueApostaMega, setValueApostaMega] = React.useState('4,50');
    const [valueApostaFacil, setValueApostaFacil] = React.useState('2,50');
    const [valueApostaMania, setValueApostaMania] = React.useState('2,50');
    const [valueApostaQuina, setValueApostaQuina] = React.useState('2,00');

    const [checkedMega, setcheckedMega] = React.useState(true);
    const [checkedFacil, setcheckedFacil] = React.useState(false);
    const [checkedMania, setcheckedMania] = React.useState(false);
    const [checkedQuina, setcheckedQuina] = React.useState(false);


    function calculaJogo(loteria, value){
        if(loteria === 'megasena'){
            if(value === 6) setValueApostaMega('4,50')
            else if(value === 7) setValueApostaMega('31,50')
            else if(value === 8) setValueApostaMega('126,00')
            else if(value === 9) setValueApostaMega('378,00')
            else if(value === 10) setValueApostaMega('945,00')
            else if(value === 11) setValueApostaMega('2.079,00')
            else if(value === 12) setValueApostaMega('4.158,00')
            else if(value === 13) setValueApostaMega('7.722,00')
            else if(value === 14) setValueApostaMega('13.513,50')
            else if(value === 15) setValueApostaMega('22.522,50')
        }
        else if(loteria === 'lotofacil'){
            if(value === 15) setValueApostaFacil('2,50')
            else if(value === 16) setValueApostaFacil('40,00')
            else if(value === 17) setValueApostaFacil('340,00')
            else if(value === 18) setValueApostaFacil('2.040,00')
        }
        else if(loteria === 'lotomania'){
            if(value === 20) setValueApostaMania('2,50')
        }
        else if(loteria === 'quina'){
            if(value === 5) setValueApostaQuina('2,00')
            else if(value === 6) setValueApostaQuina('12,00')
            else if(value === 7) setValueApostaQuina('42,00')
            else if(value === 8) setValueApostaQuina('112,00')
            else if(value === 9) setValueApostaQuina('252,00')
            else if(value === 10) setValueApostaQuina('504,00')
            else if(value === 11) setValueApostaQuina('924,00')
            else if(value === 12) setValueApostaQuina('1.584,00')
            else if(value === 13) setValueApostaQuina('2.574,00')
            else if(value === 14) setValueApostaQuina('4.004,00')
            else if(value === 15) setValueApostaQuina('6.006,00')
        }
    }

    function checkStateLoteria(loteria){
        if(loteria === 'megasena'){
            setSliderDezenas(6)
            setSliderMaxDezenas(15)
            setSliderMegaPar(3)
            setSliderMegaImpar(3)
            setcheckedMega(true)
            setcheckedFacil(false)
            setcheckedMania(false)
            setcheckedQuina(false)
            calculaJogo('megasena', sliderDezenas)
        }
        else if(loteria === 'lotofacil'){
            setSliderDezenas(15)
            setSliderMaxDezenas(18)
            setSliderMegaPar(8)
            setSliderMegaImpar(7)
            setcheckedMega(false)
            setcheckedFacil(true)
            setcheckedMania(false)
            setcheckedQuina(false)
            calculaJogo('lotofacil', sliderDezenas)
        }
        else if(loteria === 'lotomania'){
            setSliderDezenas(20)
            setSliderMaxDezenas(20)
            setSliderMegaPar(10)
            setSliderMegaImpar(10)
            setcheckedMega(false)
            setcheckedFacil(false)
            setcheckedMania(true)
            setcheckedQuina(false) 
            calculaJogo('lotomania', 20)
        }
        else if(loteria === 'quina'){
            setSliderDezenas(5)
            setSliderMaxDezenas(15)
            setSliderMegaPar(3)
            setSliderMegaImpar(2)
            setcheckedMega(false)
            setcheckedFacil(false)
            setcheckedMania(false)
            setcheckedQuina(true)
            calculaJogo('quina', sliderDezenas)
        }
    }

    function controllerDezenas(value){
        if(value%2===0){
            setSliderMegaPar(value/2)
            setSliderMegaImpar(value/2)
        }else{
            let par = value / 2;
            let impar = Math.abs(par-value)
            setSliderMegaPar(Math.trunc(par))
            setSliderMegaImpar(Math.round(impar))
        }
    }

    function truncParImpar(value, dezenas, par, impar){
        const numero = Math.abs(value-dezenas)
        if(par && !impar){
            console.log(value);
            console.log(numero);
            setSliderMegaPar(value)
            setSliderMegaImpar(numero)
        }
        if(!par && impar){
            setSliderMegaPar(numero)
            setSliderMegaImpar(value)
        }
    }

    function getLoteria(){
        if(checkedMega){
            return {
                loteria: 'megasena', 
                valor: valueApostaMega
            };
        }
        else if(checkedFacil){
            return {
                loteria: 'lotofacil', 
                valor: valueApostaFacil
            };
        }
        else if(checkedMania){
            return { 
                loteria: 'lotomania',
                valor: valueApostaMania
            };
        }
        else if(checkedQuina){
            return {
                loteria: 'quina',
                valor: valueApostaQuina
            }
        }
    }

    function resetValues() {
        setNome('')
        setMaiorOcorrencia(false)
        setMenorOcorrencia(false)
        setMaiorAtraso(false)
        setMenorAtraso(false)
        setValueApostaMega('4,50');
        setValueApostaFacil('2,50');
        setValueApostaMania('2,50');
        setValueApostaQuina('2,00');
        setcheckedMega(true);
        setcheckedFacil(false);
        setcheckedMania(false);
        setcheckedQuina(false);
        setSliderDezenas(6);
        setSliderMaxDezenas(15);
        setSliderMegaPar(3);
        setSliderMegaImpar(3);
        setUltimosConcurso(10)
    }

   const savedData = async () => {
        try {
            const { loteria, valor } = getLoteria();
            let data = {
                nome: nome,
                loteria: loteria,
                qtadepar: sliderMegaPar,
                qtadeimpar: sliderMegaImpar,
                qtadedezenas: sliderDezenas,
                soma: '0',
                maiorocorrencia: maiorOcorrencia,
                menorocorrencia: menorOcorrencia,
                maioratraso: maiorAtraso,
                menoratraso: menorAtraso,
                valoraposta: valor,
                ultimosconcurso: ultimosconcurso
            }
            const response = await insertFiltro(data.nome, data.loteria, data.qtadepar, data.qtadeimpar, data.qtadedezenas, data.soma, data.maiorocorrencia, data.menorocorrencia, data.maioratraso, data.menoratraso, data.valoraposta, data.ultimosconcurso)
            if(response.rowsAffected === 1){
                resetValues
                Keyboard.dismiss();
                onToggleSnackBar()
                resetValues();
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        <View style={{ flex: 1 }}>
            <ScrollView>
            <View>
                <Text style={{ alignSelf: "center", fontSize: 16, margin: 10, fontWeight: "bold" }}>Filtros Personalizados</Text>
                <TextInput style={{ marginRight: 10, marginLeft: 10 }} value={nome} onChangeText={nome => setNome(nome)} label="Nome filtro" mode="flat" />
            </View>

            <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 10}}>Loterias</Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10, justifyContent: "space-evenly", alignContent: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '50%' }}>
                <Checkbox status={checkedMega ? 'checked' : 'unchecked'} color='#2b6212'  onPress={() => { setcheckedMega(!checkedMega); checkStateLoteria('megasena'); }} />
                <Text onPress={() => { setcheckedMega(!checkedMega); checkStateLoteria('megasena'); }} style={{ textAlign: "center" }}>Mega Sena</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '50%' }}>
                <Checkbox status={checkedFacil ? 'checked' : 'unchecked'} color='#930989'  onPress={() => { setcheckedFacil(!checkedFacil); checkStateLoteria('lotofacil')}} />
                <Text onPress={() => { setcheckedFacil(!checkedFacil);checkStateLoteria('lotofacil') }} style={{ textAlign: "center" }}>Loto Fácil</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '50%' }}>
                <Checkbox status={checkedMania ? 'checked' : 'unchecked'} color='#F78100'  onPress={() => { setcheckedMania(!checkedMania); checkStateLoteria('lotomania') }} />
                <Text onPress={() => { setcheckedMania(!checkedMania); checkStateLoteria('lotomania') }} style={{ textAlign: "center" }}>Loto Mania</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '50%' }}>
                <Checkbox status={checkedQuina ? 'checked' : 'unchecked'} color='#260085' onPress={() => { setcheckedQuina(!checkedQuina); checkStateLoteria('quina')}} />
                <Text onPress={() => { setcheckedQuina(!checkedQuina); checkStateLoteria('quina')}} style={{ textAlign: "center" }}>Quina </Text>
            </View>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                {
                    checkedMega === true ? 
                    <View>
                    <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 10, marginBottom: 10}}>Quantidade de Dezenas Mega Sena</Text>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center" }}>Sortear quantas dezenas {sliderDezenas}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={6}
                        maximumValue={sliderMaxDezenas}
                        minimumTrackTintColor="#2b6212"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderDezenas}
                        onValueChange={(sliderDezenas) => {
                            setSliderDezenas(sliderDezenas)
                            calculaJogo('megasena', sliderDezenas)
                            controllerDezenas(sliderDezenas)
                        }}
                        />
                    <Text style={{ textAlign: "center" }}>Pares {sliderMegaPar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={0}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#2b6212"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaPar}
                        onValueChange={(sliderMegaPar) => {
                            setSliderMegaPar(sliderMegaPar)
                            truncParImpar(sliderMegaPar, sliderDezenas, true, false)
                        }}
                        />
                    </View>
            
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center" }}>Ímpares {sliderMegaImpar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={0}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#2b6212"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaImpar}
                        onValueChange={(sliderMegaImpar) => {
                            truncParImpar(sliderMegaImpar, sliderDezenas, false, true)
                            setSliderMegaImpar(sliderMegaImpar)
                        }}
                        />
                        <Text style={{ margin: 5 }}>Valor do jogo: R$ {valueApostaMega}</Text>
                    </View>
                    </View>
                    : checkedFacil === true ?
                    <View>
                    <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 10, marginBottom: 10}}>Quantidade de Dezenas Loto Fácil</Text>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center" }}>Sortear quantas dezenas {sliderDezenas}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={15}
                        maximumValue={sliderMaxDezenas}
                        minimumTrackTintColor="#930989"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderDezenas}
                        onValueChange={(sliderDezenas) => {
                            setSliderDezenas(sliderDezenas)
                            calculaJogo('lotofacil', sliderDezenas)
                            controllerDezenas(sliderDezenas)
                        }}
                        />
                    <Text style={{ textAlign: "center" }}>Pares {sliderMegaPar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={0}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#930989"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaPar}
                        onValueChange={(sliderMegaPar) => {
                            setSliderMegaPar(sliderMegaPar)
                            truncParImpar(sliderMegaPar, sliderDezenas, true, false)
                        }}
                        />
                    </View>
            
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center" }}>Ímpares {sliderMegaImpar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={0}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#930989"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaImpar}
                        onValueChange={(sliderMegaImpar) => {
                            setSliderMegaImpar(sliderMegaImpar)
                            truncParImpar(sliderMegaImpar, sliderDezenas, false, true)
                        }}
                        />
                        <Text style={{ margin: 5 }}>Valor do jogo: R$ {valueApostaFacil}</Text>
                    </View>
                    </View>
                    : checkedMania === true ? 
                    <View>
                    <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 10, marginBottom: 10}}>Quantidade de Dezenas Loto Mania</Text>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center" }}>Sortear quantas dezenas {sliderDezenas}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={20}
                        maximumValue={sliderMaxDezenas}
                        minimumTrackTintColor="#F78100"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderDezenas}
                        onValueChange={(sliderDezenas) => {
                            setSliderDezenas(sliderDezenas)
                            calculaJogo('lotomania', sliderDezenas)
                            controllerDezenas(sliderDezenas)
                        }}
                        />
                    <Text style={{ textAlign: "center" }}>Pares {sliderMegaPar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={0}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#F78100"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaPar}
                        onValueChange={(sliderMegaPar) => {
                            setSliderMegaPar(sliderMegaPar)
                            truncParImpar(sliderMegaPar, sliderDezenas, true, false)
                        }}
                        />
                    </View>
            
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center" }}>Ímpares {sliderMegaImpar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={0}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#F78100"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaImpar}
                        onValueChange={(sliderMegaImpar) => {
                            setSliderMegaImpar(sliderMegaImpar)
                            truncParImpar(sliderMegaImpar, sliderDezenas, false, true)
                        }}
                        />
                        <Text style={{ margin: 5 }}>Valor do jogo: R$ {valueApostaMania}</Text>
                    </View>
                    </View>
                    : checkedQuina === true ?
                    <View>
                    <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 10, marginBottom: 10}}>Quantidade de Dezenas Quina</Text>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center" }}>Sortear quantas dezenas {sliderDezenas}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={5}
                        maximumValue={sliderMaxDezenas}
                        minimumTrackTintColor="#260085"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderDezenas}
                        onValueChange={(sliderDezenas) => {
                            setSliderDezenas(sliderDezenas)
                            calculaJogo('quina', sliderDezenas)
                            controllerDezenas(sliderDezenas)
                        }}
                        />
                    <Text style={{ textAlign: "center" }}>Pares {sliderMegaPar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={0}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#260085"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaPar}
                        onValueChange={(sliderMegaPar) => {
                            setSliderMegaPar(sliderMegaPar)
                            truncParImpar(sliderMegaPar, sliderDezenas, true, false)
                        }}
                        />
                    </View>
            
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center" }}>Ímpares {sliderMegaImpar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={0}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#260085"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaImpar}
                        onValueChange={(sliderMegaImpar) => {
                            setSliderMegaImpar(sliderMegaImpar)
                            truncParImpar(sliderMegaImpar, sliderDezenas, false, true)
                        }}
                        />
                        <Text style={{ margin: 5 }}>Valor do jogo: R$ {valueApostaQuina}</Text>
                    </View>
                    </View>
                    : null
                }
            </View>
                <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 10 }}>Estatisticas</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10, justifyContent: "center", alignContent: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '50%' }}>
                    <Checkbox status={maiorOcorrencia ? 'checked' : 'unchecked'}  onPress={() => { setMaiorOcorrencia(!maiorOcorrencia); setMenorOcorrencia(false)}} />
                    <Text onPress={() => { setMaiorOcorrencia(!maiorOcorrencia); setMenorOcorrencia(false)}} style={{ textAlign: "center" }}>Maior Ocorrência </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '50%' }}>
                    <Checkbox status={maiorAtraso ? 'checked' : 'unchecked'}  onPress={() => { setMaiorAtraso(!maiorAtraso); setMenorAtraso(false)}} />
                    <Text onPress={() => { setMaiorAtraso(!maiorAtraso); setMenorAtraso(false)}} style={{ textAlign: "center" }}>Maior Atraso </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '50%' }}>
                    <Checkbox status={menorOcorrencia ? 'checked' : 'unchecked'}  onPress={() => { setMenorOcorrencia(!menorOcorrencia); setMaiorOcorrencia(false)}} />
                    <Text onPress={() => { setMenorOcorrencia(!menorOcorrencia); setMaiorOcorrencia(false)}} style={{ textAlign: "center" }}>Menor Ocorrência </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '50%' }}>
                    <Checkbox status={menorAtraso ? 'checked' : 'unchecked'}  onPress={() => { setMenorAtraso(!menorAtraso); setMaiorAtraso(false)}} />
                    <Text onPress={() => { setMenorAtraso(!menorAtraso); setMaiorAtraso(false)}} style={{ textAlign: "center" }}>Menor Atraso </Text>
                </View>
                </View>

                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10, marginBottom: 10 }}>
                    <Text style={{ textAlign: "center" }}>Filtro sobre os últimos {ultimosconcurso} concursos</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={10}
                        maximumValue={200}
                        minimumTrackTintColor="#260085"
                        maximumTrackTintColor="#000000"
                        step={10}
                        value={ultimosconcurso}
                        onValueChange={(ultimosconcurso) => {
                            setUltimosConcurso(ultimosconcurso)
                        }}
                        />
                    </View>
           
           <View style={{ margin: 5, alignItems: "center", justifyContent: "space-around", flexDirection: "row" }}>
                <Button icon="content-save-outline" mode="contained" style={{ borderRadius: 5, width: '50%' }} onPress={savedData}>Salvar Filtro</Button>
            </View>

            <View>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Fechar',
                    onPress: () => { onDismissSnackBar },
                }}>
                Filtro salvo com sucesso !!
            </Snackbar> 
            </View>
            </ScrollView>
        </View>
            </>
    )
}
