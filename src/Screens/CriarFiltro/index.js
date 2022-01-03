import { View, Text, ScrollView } from 'react-native'

import * as React from 'react';
import { Dimensions, StyleSheet, Keyboard } from 'react-native'
import { Button, Snackbar, Dialog, Switch, Paragraph, TextInput, Provider, Chip, Checkbox, Menu, Divider } from 'react-native-paper';

import FavoritosDataBase from '../../Model/FavoritosDataBase';
import FiltroDb from '../../Model/FiltroDb';


import CardFilter from '../../Components/CardFilter'

import Slider from '@react-native-community/slider';

export default function CriarFiltro({ navigation, route }) {
    console.log('====================================');
    console.log(route);
    console.log(navigation);
    console.log('====================================');

    const [state, setstate] = React.useState()
    // const [visible, setVisible] = React.useState(false);
    // const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const [checked, setChecked] = React.useState(false);
    const [nome, setNome] = React.useState('')
    const [loteria, setLoteria] = React.useState('')
    const [quantidadePar, setQuantidadePar] = React.useState(0)
    const [quantidadeImpar, setQuantidadeImpar] = React.useState(0)
    const [RangeSoma, setRangeSoma] = React.useState('')
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
    const [ValueAposta, setValueAposta] = React.useState({ megasena: 'R$ 4,50', lotofacil: 'R$ 2,50', lotomania: 'R$ 2,50', quina: 'R$ 2,00'});

    const [checkedMega, setcheckedMega] = React.useState(true);
    const [checkedFacil, setcheckedFacil] = React.useState(false);
    const [checkedMania, setcheckedMania] = React.useState(false);
    const [checkedQuina, setcheckedQuina] = React.useState(false);


    function calculaJogo(loteria, value){
        if(loteria === 'megasena'){
            if(value === 6) setValueAposta({ megasena: 'R$ 4,50', lotofacil: '', lotomania: '', quina: '' })
            else if(value === 7) setValueAposta({ megasena: 'R$ 31,50', lotofacil: '', lotomania: '', quina: '' })
            else if(value === 8) setValueAposta({ megasena: 'R$ 126,00', lotofacil: '', lotomania: '', quina: '' })
            else if(value === 9) setValueAposta({ megasena: 'R$ 378,00', lotofacil: '', lotomania: '', quina: '' })
            else if(value === 10) setValueAposta({ megasena: 'R$ 945,00', lotofacil: '', lotomania: '', quina: '' })
            else if(value === 11) setValueAposta({ megasena: 'R$ 2.079,00', lotofacil: '', lotomania: '', quina: '' })
            else if(value === 12) setValueAposta({ megasena: 'R$ 4.158,00', lotofacil: '', lotomania: '', quina: '' })
            else if(value === 13) setValueAposta({ megasena: 'R$ 7.722,00', lotofacil: '', lotomania: '', quina: '' })
            else if(value === 14) setValueAposta({ megasena: 'R$ 13.513,50', lotofacil: '', lotomania: '', quina: '' })
            else if(value === 15) setValueAposta({ megasena: 'R$ 22.522,50', lotofacil: '', lotomania: '', quina: '' })
        }
        else if(loteria === 'lotofacil'){
            if(value === 15) setValueAposta({ megasena: 'R$ 22.522,50', lotofacil: 'R$ 2,50', lotomania: '', quina: 'R$ 6.006,00' })
            else if(value === 16) setValueAposta({ megasena: '', lotofacil: 'R$ 40,00', lotomania: '', quina: '' })
            else if(value === 17) setValueAposta({ megasena: '', lotofacil: 'R$ 340,00', lotomania: '', quina: '' })
            else if(value === 18) setValueAposta({ megasena: '', lotofacil: 'R$ 2.040,00', lotomania: '', quina: '' })
        }
        else if(loteria === 'lotomania'){
            if(value === 20) setValueAposta({ megasena: '', lotofacil: '', lotomania: 'R$ 2,50', quina: '' })
        }
        else if(loteria === 'quina'){
            if(value === 5) setValueAposta({ megasena: '', lotofacil: '', lotomania: '', quina: 'R$ 2,00' })
            else if(value === 6) setValueAposta({ megasena: 'R$ 4,50', lotofacil: '', lotomania: '', quina: 'R$ 12,00' })
            else if(value === 7) setValueAposta({ megasena: '', lotofacil: '', lotomania: '', quina: 'R$ 42,00' })
            else if(value === 8) setValueAposta({ megasena: '', lotofacil: '', lotomania: '', quina: 'R$ 112,00' })
            else if(value === 9) setValueAposta({ megasena: '', lotofacil: '', lotomania: '', quina: 'R$ 252,00' })
            else if(value === 10) setValueAposta({ megasena: '', lotofacil: '', lotomania: '', quina: 'R$ 504,00' })
            else if(value === 11) setValueAposta({ megasena: '', lotofacil: '', lotomania: '', quina: 'R$ 924,00' })
            else if(value === 12) setValueAposta({ megasena: '', lotofacil: '', lotomania: '', quina: 'R$ 1.584,00' })
            else if(value === 13) setValueAposta({ megasena: '', lotofacil: '', lotomania: '', quina: 'R$ 2.574,00' })
            else if(value === 14) setValueAposta({ megasena: '', lotofacil: '', lotomania: '', quina: 'R$ 4.004,00' })
            else if(value === 15) setValueAposta({ megasena: '', lotofacil: '', lotomania: '', quina: 'R$ 6.006,00'})
        }
    }

    function calculaJogo1() {
        switch (sliderDezenas) {
            case 5:
                setValueAposta({ megasena: '', lotofacil: 'R$ 2,50', lotomania: 'R$ 2,50', quina: 'R$ 2,00' })
                break;
            case 6:
                setValueAposta({ megasena: 'R$ 4,50', lotofacil: 'R$ 2,50', lotomania: 'R$ 2,50', quina: 'R$ 12,00' })
                break;
            case 7:
                setValueAposta({ megasena: 'R$ 31,50', lotofacil: 'R$ 2,50', lotomania: 'R$ 2,50', quina: 'R$ 42,00' })
                break;
            case 8:
                setValueAposta({ megasena: 'R$ 126,00', lotofacil: 'R$ 2,50', lotomania: 'R$ 2,50', quina: 'R$ 112,00' })
                break;
            case 9:
                setValueAposta({ megasena: 'R$ 378,00', lotofacil: 'R$ 2,50', lotomania: 'R$ 2,50', quina: 'R$ 252,00' })
                break;
            case 10:
                setValueAposta({ megasena: 'R$ 945,00', lotofacil: 'R$ 2,50', lotomania: 'R$ 2,50', quina: 'R$ 504,00' })
                break;
            case 11:
                setValueAposta({ megasena: 'R$ 2.079,00', lotofacil: 'R$ 2,50', lotomania: 'R$ 2,50', quina: 'R$ 924,00' })
                break;
            case 12:
                setValueAposta({ megasena: 'R$ 4.158,00', lotofacil: 'R$ 2,50', lotomania: 'R$ 2,50', quina: 'R$ 1.584,00' })
                break;
            case 13:
                setValueAposta({ megasena: 'R$ 7.722,00', lotofacil: 'R$ 2,50', lotomania: 'R$ 2,50', quina: 'R$ 2.574,00' })
                break;
            case 14:
                setValueAposta({ megasena: 'R$ 13.513,50', lotofacil: 'R$ 2,50', lotomania: 'R$ 2,50', quina: 'R$ 4.004,00' })
                break;
            case 15:
                setValueAposta({ megasena: 'R$ 22.522,50', lotofacil: 'R$ 2,50', lotomania: 'R$ 2,50', quina: 'R$ 6.006,00' })
                break;
            case 16:
                setValueAposta({ megasena: '', lotofacil: 'R$ 40,00', lotomania: 'R$ 2,50', quina: 'R$ 6.006,00' })
                break;
            case 17:
                setValueAposta({ megasena: '', lotofacil: 'R$ 340,00', lotomania: 'R$ 2,50', quina: 'R$ 6.006,00' })
                break;
            case 18:
                setValueAposta({ megasena: '', lotofacil: 'R$ 2.040,00', lotomania: 'R$ 2,50', quina: 'R$ 6.006,00' })
                break;
            default:
                break;
        }
    }

    function checkStateLoteria(loteria){
        if(loteria === 'megasena'){
            calculaJogo('megasena', sliderDezenas)
            setSliderDezenas(6)
            setSliderMaxDezenas(15)
            setSliderMegaPar(3)
            setSliderMegaImpar(3)
            setcheckedMega(true)
            setcheckedFacil(false)
            setcheckedMania(false)
            setcheckedQuina(false)
        }
        else if(loteria === 'lotofacil'){
            calculaJogo('lotofacil', sliderDezenas)
            setSliderDezenas(15)
            setSliderMaxDezenas(18)
            setSliderMegaPar(8)
            setSliderMegaImpar(7)
            setcheckedMega(false)
            setcheckedFacil(true)
            setcheckedMania(false)
            setcheckedQuina(false)
        }
        else if(loteria === 'lotomania'){
            calculaJogo('lotomania', 20)
            setSliderDezenas(20)
            setSliderMaxDezenas(20)
            setSliderMegaPar(10)
            setSliderMegaImpar(10)
            setcheckedMega(false)
            setcheckedFacil(false)
            setcheckedMania(true)
            setcheckedQuina(false) 
        }
        else if(loteria === 'quina'){
            calculaJogo('quina', sliderDezenas)
            setSliderDezenas(5)
            setSliderMaxDezenas(15)
            setSliderMegaPar(3)
            setSliderMegaImpar(2)
            setcheckedMega(false)
            setcheckedFacil(false)
            setcheckedMania(false)
            setcheckedQuina(true)
        }
    }


    async function savedData() {
        try {
            // FavoritosDataBase.create({ titulo: text, numeros: JSON.stringify(props.numeros), associar: checked, concurso: parseInt(proxConcurso), loteria: loteria, dataProxConcurso: proxDataConcurso })
            //     .then(id => {
            //         console.log('Fav created with id: ' + id);
            //         setText('');
            //         setChecked(false)
            //         onToggleSnackBar()
            //         props.hideDialog();
            //         Keyboard.dismiss()
            //     })
                // .catch(err => console.log(err))
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
                <Checkbox status={checkedMega ? 'checked' : 'unchecked'} color='#2b6212'  onPress={() => { setcheckedMega(!checkedMega); checkStateLoteria('megasena')}} />
                <Text onPress={() => { setcheckedMega(!checkedMega); checkStateLoteria('megasena')}} style={{ textAlign: "center" }}>Mega Sena</Text>
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
                            
                        }}
                        />
                    <Text style={{ textAlign: "center" }}>Pares {sliderMegaPar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={1}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#2b6212"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaPar}
                        onValueChange={(sliderMegaPar) => {
                            setSliderMegaPar(sliderMegaPar)
                        }}
                        />
                    </View>
            
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center" }}>Ímpares {sliderMegaImpar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={1}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#2b6212"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaImpar}
                        onValueChange={(sliderMegaImpar) => setSliderMegaImpar(sliderMegaImpar)}
                        />
                        <Text style={{ margin: 5 }}>Valor do jogo: {ValueAposta.megasena}</Text>
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
                        }}
                        />
                    <Text style={{ textAlign: "center" }}>Pares {sliderMegaPar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={1}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#930989"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaPar}
                        onValueChange={(sliderMegaPar) => {
                            setSliderMegaPar(sliderMegaPar)
                        }}
                        />
                    </View>
            
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center" }}>Ímpares {sliderMegaImpar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={1}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#930989"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaImpar}
                        onValueChange={(sliderMegaImpar) => setSliderMegaImpar(sliderMegaImpar)}
                        />
                        <Text style={{ margin: 5 }}>Valor do jogo: {ValueAposta.lotofacil}</Text>
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
                        }}
                        />
                    <Text style={{ textAlign: "center" }}>Pares {sliderMegaPar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={1}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#F78100"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaPar}
                        onValueChange={(sliderMegaPar) => {
                            setSliderMegaPar(sliderMegaPar)
                        }}
                        />
                    </View>
            
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center" }}>Ímpares {sliderMegaImpar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={1}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#F78100"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaImpar}
                        onValueChange={(sliderMegaImpar) => setSliderMegaImpar(sliderMegaImpar)}
                        />
                        <Text style={{ margin: 5 }}>Valor do jogo: {ValueAposta.lotomania}</Text>
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
                        }}
                        />
                    <Text style={{ textAlign: "center" }}>Pares {sliderMegaPar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={1}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#260085"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaPar}
                        onValueChange={(sliderMegaPar) => {
                            setSliderMegaPar(sliderMegaPar)
                        }}
                        />
                    </View>
            
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center" }}>Ímpares {sliderMegaImpar}</Text>
                    <Slider
                        style={{width: 300, height: 25}}
                        minimumValue={1}
                        maximumValue={sliderDezenas}
                        minimumTrackTintColor="#260085"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderMegaImpar}
                        onValueChange={(sliderMegaImpar) => setSliderMegaImpar(sliderMegaImpar)}
                        />
                        <Text style={{ margin: 5 }}>Valor do jogo: {ValueAposta.quina}</Text>
                    </View>
                    </View>
                    : null
                }
            </View>
            


                <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 10 }}>Estatisticas</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10, justifyContent: "center", alignContent: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '50%' }}>
                    <Checkbox status={maiorOcorrencia ? 'checked' : 'unchecked'}  onPress={() => { setMaiorOcorrencia(!maiorOcorrencia)}} />
                    <Text onPress={() => { setMaiorOcorrencia(!maiorOcorrencia)}} style={{ textAlign: "center" }}>Maior Ocorrência </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '50%' }}>
                    <Checkbox status={maiorAtraso ? 'checked' : 'unchecked'}  onPress={() => { setMaiorAtraso(!maiorAtraso)}} />
                    <Text onPress={() => { setMaiorAtraso(!maiorAtraso)}} style={{ textAlign: "center" }}>Maior Atraso </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '50%' }}>
                    <Checkbox status={menorOcorrencia ? 'checked' : 'unchecked'}  onPress={() => { setMenorOcorrencia(!menorOcorrencia)}} />
                    <Text onPress={() => { setMenorOcorrencia(!menorOcorrencia)}} style={{ textAlign: "center" }}>Menor Ocorrência </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '50%' }}>
                    <Checkbox status={menorAtraso ? 'checked' : 'unchecked'}  onPress={() => { setMenorAtraso(!menorAtraso)}} />
                    <Text onPress={() => { setMenorAtraso(!menorAtraso)}} style={{ textAlign: "center" }}>Menor Atraso </Text>
                </View>
                </View>

                <View style={{ margin: 5, alignItems: "center", justifyContent: "space-around", flexDirection: "row" }}>
                    <Button icon="content-save-outline" mode="contained" style={{ borderRadius: 5, width: '50%' }} onPress={savedData}>Salvar Filtro</Button>
                </View>
           
            <View>
            {/* <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Fechar',
                    onPress: () => { onDismissSnackBar },
                }}>
                Números da gravado nos Favoritos.
            </Snackbar> */}
            </View>
            </ScrollView>
        </View>
            </>
    )
}
