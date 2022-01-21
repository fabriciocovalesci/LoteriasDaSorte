import * as React from 'react';
import { Surface, Text, DataTable, Title, IconButton, Colors, Checkbox, Chip, TextInput, Snackbar, Button, Paragraph, Dialog, Portal, Provider, Divider } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity, Dimensions, Keyboard, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { styles } from '../styles'
import FiltroDb from '../../../Model/FiltroDb';
import FavoritosDataBase from '../../../Model/FavoritosDataBase';
import { returnDataFiltro } from '../../../services/filtros';
import { EstatisMega, compareJogo, EstatisFacil } from '../../../services/estatisticas';

import Slider from '@react-native-community/slider';
import ActionSheet from "react-native-actions-sheet";
import { ScrollView } from 'react-native-gesture-handler';
import { Col, Row, Grid } from "react-native-easy-grid";

import { BarChartScreen } from '../../../Components/Graficos';

import {
    ResultadoMegaSena,
    AllResultMega,
    ResultadoLotoFacil,
    ResultadoLotoMania,
    ResultadoQuina,
    AllResultFacil,
    AllResultMania,
    AllResultQuina
} from '../../../services';

const GeradorQuina = (navigation, route) => {


    const [selected, setStateBtn] = React.useState(0)
    const [loteriaMega, setloteriaMega] = React.useState({ nome: '', numeros: '' });

    const [state, setstate] = React.useState()
    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const [visibleCopy, setVisibleCopy] = React.useState(false);
    const onToggleSnackBarCopy = () => setVisibleCopy(!visibleCopy);
    const onDismissSnackBarCopy = () => setVisibleCopy(false);


    const [checked, setChecked] = React.useState(false)
    const [text, setText] = React.useState('');
    const [filterDB, setFilterDB] = React.useState([])
    const [SelectedDB, setSelectedDB] = React.useState([])
    const [enableBtnGerar, setEnableBtnGerar] = React.useState(false)

    const [visibleModal, setVisibleModal] = React.useState(false);

    const [allMega, setAllMega] = React.useState([]);
    const [acertos, setAcertos] = React.useState([])
    const [filterAllMega, setFilterAllMega] = React.useState([])

    // slider
    const [sliderDezenas, setSliderDezenas] = React.useState(6);
    const [sliderMegaPar, setSliderMegaPar] = React.useState(3);
    const [sliderMegaImpar, setSliderMegaImpar] = React.useState(3);

    async function getAllResult() {
        try {
            const data = await AllResultFacil();
            let jogos = []
            data.slice(Math.max(data.length - 10, 0)).filter((elem, index) => {
                let data = {
                    "concurso": elem.concurso,
                    "data": elem.data,
                    "dezenas": elem.dezenas.map(i => Number(i))
                }
                jogos.push(data)
            })
            setFilterAllMega(jogos)
            setAllMega(data);
        } catch (error) {
            console.error(error)
        }
    }




    const showDialog = () => setVisibleModal(true);

    const hideDialog = () => setVisibleModal(false);

    async function savedData() {
        try {
            FavoritosDataBase.create({ titulo: text, numeros: JSON.stringify(loteriaMega.numeros), associar: checked, concurso: parseInt(megasena.proxConcurso), loteria: 'quina', dataProxConcurso: megasena.dataProxConcurso })
                .then(id => {
                    console.log('Fav created with id: ' + id);
                    setText('');
                    setChecked(false)
                    onToggleSnackBar()
                    Keyboard.dismiss()
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.error(error)
        }
    }


    function generate(min, max, quantidade, par, impar) {
        let numbers = []
        let arrayPar = []
        let arrayImpar = []
        while (numbers.length < quantidade) {
            min = Math.ceil(min);
            max = Math.floor(max);
            let aleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
            if (numbers.indexOf(aleatorio + ' ') === -1) numbers.push(aleatorio + ' ');

            // if(par !== null && impar !== null){
            //     if(aleatorio%2===0 && numbers.indexOf(aleatorio) === -1 && par === arrayPar.length) {
            //         arrayPar.push(aleatorio)
            //         numbers.push(aleatorio);
            //     }
            //     else if(aleatorio%2!==0 && numbers.indexOf(aleatorio) === -1 && impar === arrayImpar.length) {
            //         arrayImpar.push(aleatorio)
            //         numbers.push(aleatorio);
            //     }
            // }else {
            //     if(numbers.indexOf(aleatorio) === -1) numbers.push(aleatorio);
            // }
        }
        return numbers.sort((a, b) => { return a - b });
    }



    function returnMSG() {
        let message = `Palpite Quina para o concurso ${megasena.proxConcurso}:`
        loteriaMega.numeros.filter(elem => message = message + ' ' + elem)
        return message;
    }

    function setGenerate() {
        setloteriaMega({ nome: 'Quina', numeros: generate(1, 80, 5, sliderMegaPar, sliderMegaImpar) })
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: returnMSG(),
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    async function compareMeuJogo() {
        try {
            let acertosMega = await compareJogo(loteriaMega.numeros, AllResultQuina, 2)
            setAcertos(acertosMega)
        } catch (error) {
            console.error(error);
        }
    }



    function removeFilter() {
        setSelectedDB([])
        setEnableBtnGerar(false)
    }

    async function getFilters() {
        try {
            const filters = await FiltroDb.findByloteria('quina');
            setFilterDB(filters)
            setVisibleModal(true);
        } catch (error) {
            console.error(error);
        }
    }

    async function returnIdChildrenAplicarFiltro(id) {
        setSelectedDB([])
        const data = filterDB.filter(filter => filter.id === id);
        setSelectedDB(data)
        setloteriaMega({ nome: 'Loto Fácil', numeros: await returnDataFiltro(data[0].maiorocorrencia, data[0].menorocorrencia, data[0].maioratraso, data[0].menoratraso, data[0].qtadepar, data[0].qtadeimpar, data[0].qtadedezenas, EstatisFacil) })
        setEnableBtnGerar(true)
    }

    function truncParImpar(value, dezenas, par, impar) {
        const numero = Math.abs(value - dezenas)
        if (par && !impar) {
            setSliderMegaPar(value)
            setSliderMegaImpar(numero)
        }
        if (!par && impar) {
            setSliderMegaPar(numero)
            setSliderMegaImpar(value)
        }
    }

    function controllerDezenas(value) {
        if (value % 2 === 0) {
            setSliderMegaPar(value / 2)
            setSliderMegaImpar(value / 2)
        } else {
            let par = value / 2;
            let impar = Math.abs(par - value)
            setSliderMegaPar(Math.trunc(par))
            setSliderMegaImpar(Math.round(impar))
        }
    }


    const copyJogo = () => {
        try {
            Clipboard.setString(returnMSG());
            onToggleSnackBarCopy();
        } catch (error) {
            console.error(error);
        }
    };


    let [megasena, setMega] = React.useState({
        acumuladaProxConcurso: '', acumulou: '',
        concurso: '', dataProxConcurso: '', dezenas: [], estadosPremiados: [],
        local: '', premiacoes: [], loteria: '', nome: '', data: '', proxConcurso: ''
    });


    React.useEffect(() => {
        async function loadDataMega() {
            const data = await ResultadoQuina();
            setMega(data.data)
            getAllResult()
        }
        loadDataMega();
    }, []);

    React.useEffect(() => {
        function initial() {
            setloteriaMega({ nome: 'Quina', numeros: generate(1, 80, 5, null, null) })

        }
        initial()
    }, []);

    const scrollViewRef = React.createRef();

    const DetalhesConcurso = () => {

        function somarArr(array) {
            var total = array.reduce((total, numero) => parseInt(total) + parseInt(numero), 0);
            return total;
        }

        function countParImpar(array) {
            let par = 0;
            let impar = 0;
            array.filter(elem => {
                if (parseInt(elem) % 2 === 0) par++
                else if (parseInt(elem) % 2 !== 0) impar++
            });
            return {
                par,
                impar
            }
        }

        const [objAcerto, setObjectAcerto] = React.useState([])
        const [nenhumJogo, setNenhumJogo] = React.useState(false)

        return (
            <>
                <View ref={scrollViewRef}
                    style={{
                        backgroundColor: '#FFF',
                        padding: 5,
                        width: "100%",
                        height: "100%",
                        marginBottom: 20
                    }}
                >
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10, justifyContent: "center" }}>
                        {loteriaMega.numeros !== undefined && loteriaMega.numeros.length !== 0 ? loteriaMega.numeros.map((dezena, index) =>
                            <View key={index} style={styles.circleQuina}>
                                <Text style={styles.fontText}>{dezena}</Text>
                            </View>
                        ) : null}
                    </View>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold", textAlign: "center", marginTop: 5, backgroundColor: Colors.blue200 }}>Concursos anteriores</Text>
                    <View style={{ marginBottom: 15, marginTop: 15, flexDirection: "row", justifyContent: "center" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                            <View style={{ width: 30, height: 15, backgroundColor: Colors.blue200 }}></View>
                            <View><Text style={{ color: Colors.green500, marginLeft: 5 }}>Acertos</Text></View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 30, height: 15, backgroundColor: Colors.red300 }}></View>
                            <View><Text style={{ color: Colors.red500, marginLeft: 5 }}>Erros</Text></View>
                        </View>
                    </View>
                    <View style={{ marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0, marginTop: 10 }}>
                        <View>
                            {
                                acertos.length !== 0 ? acertos.map(elem =>
                                    <View style={{ flexDirection: "column", justifyContent: "space-around" }} key={elem.concurso}>
                                        {
                                            elem.acertos.length >= 3 ?
                                                <View style={styles.cardShadow}>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                                        <Text style={{ fontWeight: "bold" }}>Concurso: {elem.concurso}</Text>
                                                        <Text style={{ fontWeight: "bold" }}> {elem.data}</Text>
                                                        <Text style={{ fontWeight: "bold", alignSelf: "flex-end" }}> Acertos: {elem.acertos.length}</Text>
                                                    </View>
                                                    <View style={{ marginLeft: 20 }}>
                                                        <Grid>
                                                            <Col>
                                                                <Row><Text style={{ fontWeight: "bold" }}>Soma</Text></Row>
                                                                <Row style={{ marginLeft: 10 }}><Text>{somarArr(elem.dezenas)}</Text></Row>
                                                            </Col>
                                                            <Col>
                                                                <Row><Text style={{ fontWeight: "bold" }}>Pares</Text></Row>
                                                                <Row style={{ marginLeft: 15 }}><Text>{countParImpar(elem.dezenas).par}</Text></Row>
                                                            </Col>
                                                            <Col>
                                                                <Row><Text style={{ fontWeight: "bold" }}>Ímpares</Text></Row>
                                                                <Row style={{ marginLeft: 15 }}><Text>{countParImpar(elem.dezenas).impar}</Text></Row>
                                                            </Col>
                                                        </Grid>
                                                    </View>
                                                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10, justifyContent: "center" }}>
                                                        {elem.dezenas.length !== 0 ? elem.dezenas.map((dezena, index) =>
                                                            <View key={index} style={loteriaMega.numeros.toString().replace(/\s*\,\s*/g, ",").trim().split(",").includes(dezena) ? styles.circleQuina : styles.circle}>
                                                                <Text style={styles.fontText}>{dezena}</Text>
                                                            </View>
                                                        ) : null}
                                                    </View>
                                                </View>
                                                : null}
                                    </View>
                                )
                                    :
                                    <View style={styles.cardShadow}>
                                        <Text style={{ padding: 10, fontWeight: "bold" }}>Nenhuma aposta anterior atingiu no minimo 2 acertos nesse jogo</Text>
                                    </View>
                            }
                        </View>
                    </View>
                </View>
            </>
        );
    }

    const actionSheetRef = React.createRef();

    // modal filter
    const ModalFilter = (props) => {

        const [stateCheck, setCheck] = React.useState('')

        function getFilter(id) {
            setCheck(id)
        }

        function fechar() {
            props.func(stateCheck)
            props.hideDialog()
        }

        return (
            <View>
                <Portal>
                    <Dialog visible={props.visible} onDismiss={props.hideDialog}>
                        <Dialog.Title style={{ textAlign: "center", color: "#058ce1" }}>Filtros Quina</Dialog.Title>
                        <Dialog.Content>
                            <ScrollView>
                                {props.filterDB.map((filter) =>
                                    <View key={filter.id} style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Checkbox status={filter.id === stateCheck ? 'checked' : 'unchecked'}
                                            onPress={() => getFilter(filter.id)} />
                                        <Paragraph onPress={() => getFilter(filter.id)}>{filter.nome}</Paragraph>
                                    </View>
                                )}
                            </ScrollView>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={fechar}>Aplicar Filtro</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    };

    return (
        <>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: 'center', marginBottom: 10 }}>
                <View style={{ justifyContent: "center", alignItems: "flex-end", marginTop: 25 }}>
                    <Title style={{ textAlign: "center", fontSize: 18 }}>Surpresinha Quina</Title>
                </View>
                <TouchableOpacity onPress={getFilters}>
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
            <ModalFilter func={(e) => returnIdChildrenAplicarFiltro(e)} filterDB={filterDB} visible={visibleModal} showDialog={showDialog} hideDialog={hideDialog} />

            <ScrollView>
                <TextInput mode="outlined" style={{ marginLeft: 5, marginRight: 5 }} value={text} onChangeText={text => setText(text)} label="Titulo" />
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    {/* <BarChartScreen dezenas={loteriaMega.numeros} array={allMega}/> */}
                </View>
                <View style={{ marginBottom: 20, alignItems: "center", justifyContent: "space-around" }}>


                    <View style={{ justifyContent: "center", alignContent: "space-around", flexDirection: "row", marginTop: 10 }}>
                        {SelectedDB.length !== 0 ?
                            <Chip icon="close" onPress={removeFilter} style={{ alignItems: "baseline", backgroundColor: Colors.purple400, height: 40 }}><Text style={{ color: "#fff", textAlign: "center", textAlignVertical: "center" }}>{SelectedDB[0].nome}</Text></Chip>
                            : null}
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>

                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10, justifyContent: "center" }}>
                            {loteriaMega.numeros !== undefined && loteriaMega.numeros.length !== 0 ? loteriaMega.numeros.map((dezena, index) =>
                                <View key={index} style={styles.circleQuina}>
                                    {dezena < 10 ?
                                        <Text style={styles.fontText}>{'0' + dezena}</Text>
                                        :
                                        <Text style={styles.fontText}>{dezena}</Text>
                                    }
                                </View>
                            ) : null}

                        </View>

                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 10 }}>
                        <Button icon="refresh" mode="outlined" disabled={enableBtnGerar} style={{ borderRadius: 5, width: '50%', height: 40, borderColor: Colors.green900, borderWidth: 1, borderStyle: "solid" }} onPress={setGenerate}>Gerar</Button>
                        <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
                            <IconButton
                                icon="content-copy"
                                color={Colors.blue600}
                                size={22}
                                onPress={copyJogo}
                            />
                            <IconButton
                                icon="share"
                                color={Colors.blue600}
                                size={22}
                                onPress={onShare}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>

                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => { setChecked(!checked) }}
                        />
                        <Text onPress={() => { setChecked(!checked) }} style={{ textAlign: "center" }}>Associar ao próximo concurso: {megasena.proxConcurso}</Text>
                    </View>
                    <Text style={{ textAlign: "center" }}>Data próximo sorteio: {megasena.dataProxConcurso}</Text>

                </View>
                <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", marginBottom: 10, marginTop: 10 }}>
                    <Button icon="file-find-outline" mode="outlined" style={{ borderRadius: 5, margin: 10, marginTop: 5, borderColor: Colors.green900, borderWidth: 1, borderStyle: "solid" }} onPress={() => { actionSheetRef.current?.setModalVisible(); compareMeuJogo() }}>Consultar</Button>
                    <Button icon="content-save-outline" mode="outlined" style={{ borderRadius: 5, margin: 10, marginTop: 5, borderColor: Colors.blue900, borderWidth: 1, borderStyle: "solid" }} onPress={savedData}>Salvar</Button>
                </View>

                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Fechar',
                        onPress: () => { onDismissSnackBar },
                    }}>
                    Números da {loteriaMega.title} salvo nos Favoritos.
                </Snackbar>

                <Snackbar
                    visible={visibleCopy}
                    onDismiss={onDismissSnackBarCopy}
                    action={{
                        label: 'Fechar',
                        onPress: () => { onDismissSnackBarCopy },
                    }}>
                    Números copiado com sucesso !!
                </Snackbar>

                
            </ScrollView>
            <ActionSheet ref={actionSheetRef}
                initialOffsetFromBottom={0.4}
                headerAlwaysVisible={true}
                statusBarTranslucent
                extraScroll={1}
                bounceOnOpen={true}
                drawUnderStatusBar={true}
                bounciness={5}
                gestureEnabled={true}
                defaultOverlayOpacity={0.3}>
                <ScrollView
                    ref={scrollViewRef}
                    nestedScrollEnabled={true}
                    scrollEnabled={true}
                    onScrollEndDrag={() =>
                        actionSheetRef.current?.handleChildScrollEnd()
                    }
                    onScrollAnimationEnd={() =>
                        actionSheetRef.current?.handleChildScrollEnd()
                    }
                    onMomentumScrollEnd={() =>
                        actionSheetRef.current?.handleChildScrollEnd()
                    }>
                    <View style={{ paddingHorizontal: 12 }}>
                        <Title style={{ textAlign: "center", fontSize: 16, backgroundColor: Colors.blue200, color: Colors.black }}>Comparar jogos</Title>
                        <DetalhesConcurso />
                    </View>
                </ScrollView>
            </ActionSheet>
        </>
    );
}

export default GeradorQuina;