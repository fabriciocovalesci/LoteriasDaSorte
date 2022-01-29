import React from 'react'
import { View, Text, Dimensions, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import moment from 'moment';
import "moment/locale/pt-br"
import { EstatisFacil } from '../../services/estatisticas';
import { MyBarChart, MyBarChartAtraso, MyBarChartSequencia } from '../../Components/BarChart';
import { DataTable, Divider, Colors, Button, Title, Provider, Menu, IconButton, Modal, Card, Paragraph, Checkbox } from 'react-native-paper';
import * as Progress from 'react-native-progress';

import { Col, Row, Grid } from "react-native-easy-grid";

import {Picker} from '@react-native-picker/picker';

import { ScrollView } from 'react-native-gesture-handler';

import { GraficoBarYear, GraficoBarMesAno, GraficoGroup } from '../../Components/Graficos';

import { ModalDate } from '../../Components/ModalDate';
import { 
    sortObject, 
    filterdataMesAno, 
    filterdataAno, 
    countDezenasByAno, 
    countDezenasByMesAno, 
    getLatestMeses  } from '../../utils'

moment.locale('pt-br');

const CircleNumber = (props) => {
    return (
        <View style={styles.circleFacil}>
            <Text style={{ color: "#fff", alignSelf: "center", fontWeight: "bold" }}>{props.number}</Text>
        </View>
    )
}

const dataYear = Array.from({ length: 20 }, (v, k) => k + 2003).reverse()
const dataMes = Array.from({ length: 12 }, (v, k) => k + 1)


export default function EstatisticaFacil() {

    const [selected, setStateBtn] = React.useState(0)

    const [tableMega, setTableMega] = React.useState([])

    const [tableMegaAnalise, setTableMegaAnalise] = React.useState([])

    const [megaChart, setMegaChart] = React.useState([])

    const [megaChartSeq, setMegaChartSeq] = React.useState([])

    const [megaChartAtraso, setMegaChartAtraso] = React.useState([])

    const [megaSomaParImpar, setMegaSomaParImpar] = React.useState([])

    const [megaSomaPercent, setMegaSomaPercent] = React.useState()
    const [allDataMega, SetAlldataMega] = React.useState([]);
    const [filterDataMesAno, setFilterDataMesAno] = React.useState([]);
    const [filterDataAno, setFilterDataAno] = React.useState([]);
    const [mesAno, setMesAno] = React.useState('');

    const [countDezByAno, setCountDezenasByAno] = React.useState([]);
    const [countDezByMesAno, setCountDezenasByMesAno] = React.useState([]);

    const [selectGroup, setSelectGroup] = React.useState(0);
    const [visible, setVisible] = React.useState(false);

    const [checked, setChecked] = React.useState(true);
    const [checkedDetail, setCheckedDetail] = React.useState(false);
    const [CheckedFreqMA, setCheckedFreqMA] = React.useState(false);
    const [CheckedFreqA, setCheckedFreqA] = React.useState(false);

    const [selectedMesesCompare, setSelectedMesesCompare] = React.useState('');
    const [selectedAnoCompare, setSelectedAnoCompare] = React.useState('');
    const [compareArray, setCompareArray] = React.useState([]);

    

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    function getDate(date){
        setMesAno(date)
        let mes = parseInt(date.substr(5, 7))-1
        let ano = parseInt(date.substr(0, 4))
        setFilterDataMesAno(filterdataMesAno(allDataMega, mes, ano))
        setCountDezenasByMesAno(sortObject(countDezenasByMesAno(allDataMega, mes, ano)))
        setSelectedYear('')
        setSelectGroup(1)
    }

    function filterDateYear(){
        setFilterDataAno(filterdataAno(allDataMega, selectedYear))
        setCountDezenasByAno(sortObject(countDezenasByAno(allDataMega, selectedYear)))
        setSelectGroup(2)
    }

    function filterCompareMesAno(){
        if(selectedMesesCompare && selectedAnoCompare){
            setCompareArray(getLatestMeses(allDataMega, selectedMesesCompare, selectedAnoCompare))
        }
    }

    function filterCompareMesAnobyM(){
        if(selectedMesesCompare && selectedAnoCompare){
            setCompareArray(getLatestMeses(allDataMega, selectedMesesCompare, selectedAnoCompare))
        }
    }


    React.useEffect(() => {
        EstatisFacil().then((value) => {
            SetAlldataMega(value.allFacil)
            setTableMega(value.ocorrencias);
            setMegaChart(value.ocorrencias.slice(0, 10));
            setTableMegaAnalise(value.estatisAtrasoSeq)
            setMegaChartAtraso(value.estatisAtrasoSeq)
            setMegaSomaParImpar(value.somaParImpar.slice(value.somaParImpar.length - 100, value.somaParImpar.length))
            setMegaSomaPercent(value.percentSoma)
        });
    }, [])


    const [selectedLanguage, setSelectedLanguage] = React.useState('ocorrencias');
    const pickerRef = React.useRef();

    function open() {
    pickerRef.current.focus();
    }

    function close() {
    pickerRef.current.blur();
    } 

    const [selectedYear, setSelectedYear] = React.useState('');
    const pickerRefYear = React.useRef();

    function openYear() {
    pickerRefYear.current.focus();
    }

    function closeYear() {
    pickerRefYear.current.blur();
    }   
     

    const [menuMesAno, setMenuMesAno] = React.useState(true);
    const [menuAno, setMenuAno] = React.useState(false);
    const [menuCompararMesAno, setMenuCompararMesAno] = React.useState(false);

    const MenuAgrupamentos = () => {
        const [visible, setVisible] = React.useState(false);
        const openMenu = () => setVisible(true);      
        const closeMenu = () => setVisible(false);

        function MenuMesAno(){
            setMenuMesAno(!menuMesAno)
            setMenuAno(false)
            setMenuCompararMesAno(false)
        }

        function MenuAno(){
            setMenuAno(!menuAno)
            setMenuMesAno(false)
            setMenuCompararMesAno(false)
        }

        function MenuCompararMesAno(){
            setMenuCompararMesAno(!menuCompararMesAno)
            setMenuMesAno(false)
            setMenuAno(false)
        }
      
        return (
            <View
               style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<Button mode='outlined' style={styles.btnGeral} onPress={openMenu}>Menu de Agrupamentos</Button>}>
                <Menu.Item onPress={MenuMesAno} title="Agrupar por Mês/Ano" />
                <Menu.Item onPress={MenuAno} title="Agrupar por Ano" />
                <Menu.Item onPress={MenuCompararMesAno} title="Comparar por Mês/Ano" />
                <Divider />
              </Menu>
            </View>
        );
    };

    return (
        <>
            <View style={{ marginBottom: 0, marginTop: 10, marginLeft: 5, marginRight: 5 }}>
                <Picker
                ref={pickerRef}
                mode="dialog"
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="Ocorrências" value="ocorrencias" />
                <Picker.Item label="Atrasos" value="atrasos" />
                <Picker.Item label="Sequências" value="sequencias" />
                <Picker.Item label="Combinações Par - Impar" value="par-impar" />
                <Picker.Item label="Agrupamentos por datas" value="agrupamentos" />
                </Picker>
            </View>
 
            <ScrollView>
                 {selectedLanguage === 'ocorrencias' ?
                    <>
                    {
                        megaChart.length === 0 && tableMega.length === 0 ?
                        <View style={{ flex: 1, height: Dimensions.get('screen').height / 2, justifyContent: "center", alignContent: "center" }}>
                            <Text style={{ color: Colors.black, fontWeight: "bold", textAlign: "center" }}>Carregando dados ...</Text>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                        :
                        <>
                        <View>
                            <MyBarChart color="#930989" dezenas={megaChart} tituloBar="Maior Ocorrências" subtituloBar="10 dezenas Mais sorteadas" />
                        </View>
                        <DataTable>
                            <DataTable.Header style={{}}>
                                <DataTable.Title >Dezena</DataTable.Title>
                                <DataTable.Title >Ocorrências</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {tableMega.map((elem, index) =>
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell ><CircleNumber number={elem[0]}/></DataTable.Cell>
                                        <DataTable.Cell >{elem[1]}</DataTable.Cell>
                                    </DataTable.Row>
                                )}
                            </ScrollView>
                        </DataTable>
                        </>
                    }   
                        
                    </>
                    :  selectedLanguage === 'atrasos'  ?
                    <>
                        <View>
                            <MyBarChartAtraso color="#930989" dezenas={megaChartAtraso} tituloBar="Maiores Atrasos" subtituloBar="10 dezenas Mais atrasadas" />
                        </View>
                        <DataTable>
                            <DataTable.Header style={{}}>
                                <DataTable.Title >Dezena</DataTable.Title>
                                <DataTable.Title >Atraso</DataTable.Title>
                                <DataTable.Title >Max Atraso</DataTable.Title>
                                <DataTable.Title >Média Atraso</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {tableMegaAnalise.map((elem, index) =>
                                    <DataTable.Row key={index + elem.dezena}>
                                        <DataTable.Cell ><CircleNumber number={elem.dezena}/></DataTable.Cell>
                                        <DataTable.Cell >{elem.atraso}</DataTable.Cell>
                                        <DataTable.Cell >{elem.maxAtraso}</DataTable.Cell>
                                        <DataTable.Cell >{elem.mediaAtraso} %</DataTable.Cell>
                                    </DataTable.Row>
                                )}
                            </ScrollView>
                        </DataTable>
                    </>
                    : selectedLanguage === 'sequencias'  ? 
                    <>
                        <View>
                        <MyBarChartSequencia color="#930989" dezenas={megaChartAtraso} tituloBar="Maiores Sequências" subtituloBar="Máximo de sequências da Mega Sena" />
                        </View>
                        <DataTable>
                            <DataTable.Header style={{}}>
                                <DataTable.Title >Dezena</DataTable.Title>
                                <DataTable.Title >Sequência</DataTable.Title>
                                <DataTable.Title >Max Seq</DataTable.Title>
                                <DataTable.Title >Média Seq</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {tableMegaAnalise.map((elem, index) =>
                                    <DataTable.Row key={index + elem.dezena}>
                                        <DataTable.Cell ><CircleNumber number={elem.dezena}/></DataTable.Cell>
                                        <DataTable.Cell >{elem.sequencia}</DataTable.Cell>
                                        <DataTable.Cell >{elem.maxSequencia}</DataTable.Cell>
                                        <DataTable.Cell >{elem.mediaSequencia} %</DataTable.Cell>
                                    </DataTable.Row>
                                )}
                            </ScrollView>
                        </DataTable>
                    </>
                    : selectedLanguage === 'par-impar'  ?
                    <>
                    <View style={{  }}>
                            <Text style={{ textAlign: "center", marginBottom: 10, fontWeight: "bold" }}>Combinações de Dezenas Pares e Ímpares</Text>
                        </View>

                        <View style={{ alignSelf: "center", marginTop: 0 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>7 pares e 8 ímpares: {megaSomaPercent.equal.jogos} jogos</Text>
                                <Text>{megaSomaPercent.equal.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.equal.porcentagem / 100} color='#930989' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>8 pares e 7 ímpares: {megaSomaPercent.Combinada_1.jogos} jogos</Text>
                                <Text>{megaSomaPercent.Combinada_1.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.Combinada_1.porcentagem / 100} color='#930989' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>6 pares e 9 ímpares: {megaSomaPercent.Combinada_2.jogos} jogos</Text>
                                <Text>{megaSomaPercent.Combinada_2.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.Combinada_2.porcentagem/100} color='#930989' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>9 pares e 6 ímpares: {megaSomaPercent.Combinada_3.jogos} jogos</Text>
                                <Text>{megaSomaPercent.Combinada_3.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.Combinada_3.porcentagem/100} color='#930989' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>5 pares e 10 ímpares: {megaSomaPercent.Combinada_4.jogos} jogos</Text>
                                <Text>{megaSomaPercent.Combinada_4.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.Combinada_4.porcentagem/100} color='#930989' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>10 pares e 5 ímpares: {megaSomaPercent.Combinada_5.jogos} jogos</Text>
                                <Text>{megaSomaPercent.Combinada_5.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.Combinada_5.porcentagem/100} color='#930989' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>4 pares e 11 ímpares: {megaSomaPercent.Combinada_6.jogos} jogos</Text>
                                <Text>{megaSomaPercent.Combinada_6.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.Combinada_6.porcentagem/100} color='#930989' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>11 pares e 4 ímpares: {megaSomaPercent.Combinada_7.jogos} jogos</Text>
                                <Text>{megaSomaPercent.Combinada_7.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.Combinada_7.porcentagem/100} color='#930989' height={10} width={Dimensions.get('screen').width - 40} />
                        </View>
                        <View style={{marginTop: 15, marginBottom: 5}}>
                        <Text style={{ textAlign: "center", marginBottom: 10, fontWeight: "bold" }}>Tabela dos Números Pares e Ímpares</Text>
                        </View>


                        <View style={{marginTop: 15, marginBottom: 5}}>
                        <Text style={{ textAlign: "center", marginBottom: 10, fontWeight: "bold" }}>Tabela dos Números Pares e Ímpares</Text>
                        </View>
                        <DataTable>
                            <DataTable.Header style={{}}>
                                <DataTable.Title >Concurso</DataTable.Title>
                                <DataTable.Title numeric>Impares</DataTable.Title>
                                <DataTable.Title numeric>Pares</DataTable.Title>
                                <DataTable.Title numeric>Soma</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {megaSomaParImpar.reverse().map((elem, index) =>
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell ><Text style={{ fontWeight: "bold" }}>{elem.concurso}</Text></DataTable.Cell>
                                        <DataTable.Cell numeric>{elem.impar}</DataTable.Cell>
                                        <DataTable.Cell numeric>{elem.par}</DataTable.Cell>
                                        <DataTable.Cell numeric>{elem.soma}</DataTable.Cell>
                                    </DataTable.Row>
                                )}
                            </ScrollView>
                        </DataTable>
                    </>
                    : selectedLanguage === 'agrupamentos'  ?
                    <View>
                    <MenuAgrupamentos />
                    {
                        menuMesAno ?
                        <>
                        <ModalDate getdate={(date) => getDate(date)} visible={visible} hideModal={hideModal}></ModalDate>
                        <Text style={{ textAlign: "center", margin: 5, fontWeight: "bold" }}>Agrupamentos por Meses/Ano</Text>
                        <Text style={{ margin: 5, textAlign: "center" }}>Selcione a data e uma das opões abaixo</Text>
                        <Button mode='outlined' style={{ borderColor: "blue", margin: 5 }} onPress={showModal}>Mês/Ano</Button>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <Checkbox.Item
                                label='Versão Compacta'
                                style={{ margin: 0 }}
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                    setCheckedDetail(false);
                                    setCheckedFreqMA(false)
                                    setCheckedFreqA(false)
                                }}
                            />
                            <Checkbox.Item
                                label='Versão Detalhada'
                                status={checkedDetail ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheckedDetail(!checkedDetail);
                                    setChecked(false);
                                    setCheckedFreqMA(false)
                                    setCheckedFreqA(false)
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center"  }}>
                            <Checkbox.Item
                                label='Frequência Mês/Ano'
                                status={CheckedFreqMA ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheckedFreqMA(!CheckedFreqMA);
                                    setChecked(false);
                                    setCheckedDetail(false)
                                    setCheckedFreqA(false)
                                }}
                            />

                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", alignContent: "center" }}>
                        {
                            checked ?
                                <DataTable>
                                    <Text style={{ fontWeight: "bold", marginLeft: 15 }}>Mês - Ano: {moment.months(mesAno.substr(5, 7) - 1)} de {mesAno.substr(0, 4)}</Text>
                                    <DataTable.Header style={{}}>
                                        <DataTable.Title >Concurso</DataTable.Title>
                                        <DataTable.Title numeric>Par</DataTable.Title>
                                        <DataTable.Title numeric>Impar</DataTable.Title>
                                        <DataTable.Title numeric>Soma</DataTable.Title>
                                        <DataTable.Title numeric>Primos</DataTable.Title>
                                    </DataTable.Header>
                                    <ScrollView>
                                        {filterDataMesAno.map((elem, index) =>
                                            <DataTable.Row key={index}>
                                                <DataTable.Cell ><Text style={{ fontWeight: "bold" }}>{elem.concurso}</Text></DataTable.Cell>
                                                <DataTable.Cell numeric>{elem.pares}</DataTable.Cell>
                                                <DataTable.Cell numeric>{elem.impar}</DataTable.Cell>
                                                <DataTable.Cell numeric>{elem.soma}</DataTable.Cell>
                                                <DataTable.Cell numeric>{elem.primos.length}</DataTable.Cell>
                                            </DataTable.Row>
                                        )}
                                    </ScrollView>
                                </DataTable>
                                : checkedDetail ?
                                    <ScrollView>
                                        {filterDataMesAno.map((elem, index) =>
                                            <View key={index} style={styles.cardShadow}>
                                                <Grid style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                                    <Col>
                                                        <Text style={{ fontWeight: "bold" }}>Concurso {elem.concurso}</Text>
                                                    </Col>
                                                    <Col>
                                                        <Text>Par</Text>
                                                        <Row><Text>{elem.pares}</Text></Row>
                                                    </Col>
                                                    <Col>
                                                        <Text>Impar</Text>
                                                        <Row><Text>{elem.impar}</Text></Row>
                                                    </Col>
                                                    <Col>
                                                        <Text>Soma</Text>
                                                        <Row><Text>{elem.soma}</Text></Row>
                                                    </Col>
                                                </Grid>
                                                <View style={{ marginTop: 10, justifyContent: "center", alignContent: "center" }}>
                                                    <Grid>
                                                        <Row><Text style={{ fontWeight: "bold" }}>Dezenas Sorteadas - {elem.data}</Text></Row>
                                                        <Col style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                            {
                                                                elem.dezenas.map(dezena => <CircleNumber key={dezena} number={dezena} />)
                                                            }
                                                        </Col>
                                                        <Row><Text>Números Primos</Text></Row>
                                                        <Col style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                            {
                                                                elem.primos.map(primo => <CircleNumber key={primo} number={primo} />)
                                                            }
                                                        </Col>
                                                    </Grid>
                                                </View>
                                            </View>
                                        )}
                                    </ScrollView>
                                    : CheckedFreqMA ?
                                    <View>
                                        <GraficoBarMesAno color="#930989" dezenas={countDezByMesAno.slice(0,10)} data={mesAno} />
                                        <DataTable>
                                    <Text style={{ fontWeight: "bold", marginLeft: 15 }}>Mês - Ano: {moment.months(mesAno.substr(5, 7) - 1)} de {mesAno.substr(0, 4)}</Text>
                                    <DataTable.Header style={{}}>
                                        <DataTable.Title >Concurso</DataTable.Title>
                                        <DataTable.Title numeric>Par</DataTable.Title>
                                        <DataTable.Title numeric>Impar</DataTable.Title>
                                        <DataTable.Title numeric>Soma</DataTable.Title>
                                        <DataTable.Title numeric>Primos</DataTable.Title>
                                    </DataTable.Header>
                                    <ScrollView>
                                        {filterDataMesAno.map((elem, index) =>
                                            <DataTable.Row key={index}>
                                                <DataTable.Cell ><Text style={{ fontWeight: "bold" }}>{elem.concurso}</Text></DataTable.Cell>
                                                <DataTable.Cell numeric>{elem.pares}</DataTable.Cell>
                                                <DataTable.Cell numeric>{elem.impar}</DataTable.Cell>
                                                <DataTable.Cell numeric>{elem.soma}</DataTable.Cell>
                                                <DataTable.Cell numeric>{elem.primos.length}</DataTable.Cell>
                                            </DataTable.Row>
                                        )}
                                    </ScrollView>
                                </DataTable>
                                    </View>
                                  : null
                        }
                        </View>
                        </>
                        : menuAno ?
                        <>
                        <View style={{ justifyContent: "center" }}>
                        <Text style={{ textAlign: "center", margin: 5, fontWeight: "bold" }}>Agrupamentos por Ano</Text>
                        <Text style={{ textAlign: "center", margin: 5 }}>Selecione o ano e uma das opções abaixo</Text>
                        <Picker
                        style={{ width: "60%", marginLeft: 10, borderColor: "blue", borderWidth: 1, justifyContent: "center"  }}
                        ref={pickerRefYear}
                        mode="dropdown"
                        selectedValue={selectedYear}
                        onBlur={filterDateYear}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedYear(itemValue)
                        }>
                            <Picker.Item label="Selecione ano" />
                        {
                            dataYear.map((year) => 
                            <Picker.Item key={year} label={"Ano " + year} value={year} />
                            )
                        }
                        </Picker>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <Checkbox.Item
                                label='Versão Compacta'
                                style={{ margin: 0 }}
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                    setCheckedDetail(false);
                                    setCheckedFreqMA(false)
                                    setCheckedFreqA(false)
                                }}
                            />
                            <Checkbox.Item
                                label='Versão Detalhada'
                                status={checkedDetail ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheckedDetail(!checkedDetail);
                                    setChecked(false);
                                    setCheckedFreqMA(false)
                                    setCheckedFreqA(false)
                                }}
                            />
                            
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <Checkbox.Item
                                label='Frequência por ano'
                                status={CheckedFreqA ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCheckedFreqA(!CheckedFreqA);
                                    setCheckedFreqMA(false)
                                    setChecked(false);
                                    setCheckedDetail(false)
                                }}
                            />
                        </View>
                        {
                            checked ? 
                            <DataTable>
                            <Text style={{ fontWeight: "bold", marginLeft: 15 }}>Ano: {selectedYear}</Text>
                            <DataTable.Header style={{}}>
                                <DataTable.Title >Concurso</DataTable.Title>
                                <DataTable.Title numeric>Par</DataTable.Title>
                                <DataTable.Title numeric>Impar</DataTable.Title>
                                <DataTable.Title numeric>Soma</DataTable.Title>
                                <DataTable.Title numeric>Primos</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {filterDataAno.map((elem, index) =>
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell ><Text style={{ fontWeight: "bold" }}>{elem.concurso}</Text></DataTable.Cell>
                                        <DataTable.Cell numeric>{elem.pares}</DataTable.Cell>
                                        <DataTable.Cell numeric>{elem.impar}</DataTable.Cell>
                                        <DataTable.Cell numeric>{elem.soma}</DataTable.Cell>
                                        <DataTable.Cell numeric>{elem.primos.length}</DataTable.Cell>
                                    </DataTable.Row>
                                )}
                            </ScrollView>
                            </DataTable>
                            : checkedDetail ?
                            <View>
                                <Text style={{ margin: 5, fontWeight: "bold" }}>Concursos realizados no ano de {selectedYear}</Text>
                            <ScrollView>
                                    {filterDataAno.map((elem, index) =>
                                        <View key={index} style={styles.cardShadow}>
                                            <Grid style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                                <Col>
                                                    <Text style={{ fontWeight: "bold" }}>Concurso {elem.concurso}</Text>
                                                </Col>
                                                <Col>
                                                    <Text>Par</Text>
                                                    <Row><Text>{elem.pares}</Text></Row>
                                                </Col>
                                                <Col>
                                                    <Text>Impar</Text>
                                                    <Row><Text>{elem.impar}</Text></Row>
                                                </Col>
                                                <Col>
                                                    <Text>Soma</Text>
                                                    <Row><Text>{elem.soma}</Text></Row>
                                                </Col>
                                            </Grid>
                                            <View style={{ marginTop: 10, justifyContent: "center", alignContent: "center" }}>
                                                <Grid>
                                                    <Row><Text style={{ fontWeight: "bold" }}>Dezenas Sorteadas - {elem.data}</Text></Row>
                                                    <Col style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                        {
                                                            elem.dezenas.map(dezena => <CircleNumber key={dezena} number={dezena}/>)
                                                        }
                                                    </Col>
                                                    <Row><Text>Números Primos</Text></Row>
                                                    <Col style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                        {
                                                            elem.primos.map(primo => <CircleNumber key={primo} number={primo}/>)
                                                        }
                                                    </Col>
                                                </Grid>
                                            </View>
                                        </View>
                                    )}
                                </ScrollView>
                            </View>
                            : CheckedFreqA ?
                            <View>
                                <GraficoBarYear color="#930989" dezenas={countDezByAno.slice(0,10)} ano={selectedYear}/>
                                <DataTable>
                                <Text style={{ padding: 5, fontWeight: "bold" }}>Quantidade de vezes que a dezena foi sorteada no ano de {selectedYear}</Text>
                                <DataTable.Header style={{}}>
                                    <DataTable.Title >Dezena</DataTable.Title>
                                    <DataTable.Title >Frequência</DataTable.Title>
                                </DataTable.Header>
                                <ScrollView>
                                    {countDezByAno.map((elem, index) =>
                                        <DataTable.Row key={index}>
                                             <DataTable.Cell ><CircleNumber key={index} number={Object.keys(elem)[0]}/></DataTable.Cell>
                                             <DataTable.Cell >{Object.values(elem)[0]}</DataTable.Cell>
                                         </DataTable.Row>
                                    )}
                                </ScrollView>
                                </DataTable>
                            </View> 
                            : null
                        }
                        </>
                        : menuCompararMesAno ? 
                        <>
                        <Text style={{ textAlign: "center", margin: 5, fontWeight: "bold" }}>Comparar por Meses/Ano</Text>
                        <Text style={{ margin: 5, }}>Distribuição da dezena mais sortedas por meses anteriores</Text>
                        <Text style={{ margin: 5, }}>Selecione a quantidade de meses que deseja verificar e o ano</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", margin: 5 }}>
                        <Picker
                        style={{ width: "50%", marginLeft: 10, borderColor: "blue", borderWidth: 1, justifyContent: "center"  }}
                        ref={pickerRefYear}
                        mode="dropdown"
                        selectedValue={selectedMesesCompare}
                        onBlur={filterCompareMesAnobyM}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedMesesCompare(itemValue)
                        }>
                            <Picker.Item label="Selecione meses" />
                        {
                            dataMes.map((mes) => 
                            <Picker.Item key={mes} label={"Meses " + mes} value={mes} />
                            )
                        }
                        </Picker>
                        <Picker
                        style={{ width: "50%", marginLeft: 10, borderColor: "blue", borderWidth: 1, justifyContent: "center"  }}
                        ref={pickerRefYear}
                        mode="dropdown"
                        selectedValue={selectedAnoCompare}
                        onBlur={filterCompareMesAno}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedAnoCompare(itemValue)
                        }>
                            <Picker.Item label="Selecione ano" />
                        {
                            dataYear.map((year) => 
                            <Picker.Item key={year} label={"Ano " + year} value={year} />
                            )
                        }
                        </Picker>
                        </View>
                        <ScrollView>
                            <GraficoGroup color="#930989" ano={selectedAnoCompare} dezenas={compareArray}/>
                        <DataTable>
                            <Text style={{ fontWeight: "bold", marginLeft: 15 }}>Dezena mais sorteadas por mes e ano - {selectedAnoCompare}</Text>
                            <DataTable.Header style={{}}>
                                <DataTable.Title >Meses</DataTable.Title>
                                <DataTable.Title numeric>Dezena</DataTable.Title>
                                <DataTable.Title numeric>Frequência</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {compareArray.length !== 0 ? compareArray.map((elem, index) =>
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell ><Text style={{ fontWeight: "bold" }}>{elem.mes}</Text></DataTable.Cell>
                                        <DataTable.Cell numeric><CircleNumber key={index} number={Object.keys(elem.dezena)}/></DataTable.Cell>
                                        <DataTable.Cell numeric>{Object.values(elem.dezena)}</DataTable.Cell>
                                    </DataTable.Row>
                                ) : null}
                            </ScrollView>
                            </DataTable>
                        </ScrollView>
                        </>
                        : null
                    }   
                    </View>
                    : null}
            </ScrollView>
        </>
    )
}

export const styles = StyleSheet.create({
    circleFacil: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#930989' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 5
    },
      chart: {
        flex: 1
      },
      cardShadow :{
        padding: 20,
        margin: 5,
        backgroundColor: Colors.white, 
        borderRadius: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.9,
        shadowRadius: 2,  
        elevation: 9
    },
      containerCarousel: {
        backgroundColor: '#fff', 
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      btnGeral: {
        borderColor: "blue", 
        margin: 5 
      }
});

