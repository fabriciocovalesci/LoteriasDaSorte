

import React from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { EstatisMega } from '../../services/estatisticas';
import { MyBarChart, MyBarChartAtraso, BarChartSomaPercent } from '../../Components/BarChart';
import MyPieChart from '../../Components/PieChart';
import { DataTable, Divider } from 'react-native-paper';


import * as Progress from 'react-native-progress';

import SegmentedControlTab from "react-native-segmented-control-tab";

const CircleNumber = (props) => {
    return (
        <View style={styles.circleMega}>
            <Text style={{ color: "#fff", alignSelf: "center", fontWeight: "bold" }}>{props.number}</Text>
        </View>
    )
}


export default function EstatisticaMega() {

    const [selected, setStateBtn] = React.useState(0)

    const [tableMega, setTableMega] = React.useState([])

    const [tableMegaAnalise, setTableMegaAnalise] = React.useState([])

    const [megaChart, setMegaChart] = React.useState([])

    const [megaChartAtraso, setMegaChartAtraso] = React.useState([])

    const [megaSomaParImpar, setMegaSomaParImpar] = React.useState([])

    const [megaSomaPercent, setMegaSomaPercent] = React.useState()


    React.useEffect(() => {
        EstatisMega().then((value) => {
            setTableMega(value.ocorrencias);
            setMegaChart(value.ocorrencias.slice(0, 10));
            setTableMegaAnalise(value.estatisAtrasoSeq)
            setMegaChartAtraso(value.estatisAtrasoSeq.slice(value.estatisAtrasoSeq.length - 10, value.estatisAtrasoSeq.length))
            setMegaSomaParImpar(value.somaParImpar.slice(value.somaParImpar.length - 100, value.somaParImpar.length))
            setMegaSomaPercent(value.percentSoma)
        });
    }, [])

    return (
        <>
            <View style={{ marginBottom: 0, marginTop: 10, marginLeft: 5, marginRight: 5 }}>
                <SegmentedControlTab
                    values={["Ocorrências", "Atrasos", "Sequências", "Combinações"]}
                    selectedIndex={selected}
                    onTabPress={index => setStateBtn(index)}
                />
            </View>
            <ScrollView>
                {selected === 0 ?
                    <>
                        <View>
                            <MyBarChart dezenas={megaChart} tituloBar="Maior Ocorrências" subtituloBar="10 dezenas Mais sorteadas" />
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
                    : <Text></Text>}
                {selected === 1 ?
                    <>
                        <View>
                            <MyBarChartAtraso dezenas={megaChartAtraso} tituloBar="Maiores Atrasos" subtituloBar="10 dezenas Mais atrasadas" />
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
                    : <Text></Text>}
                {selected === 2 ?
                    <>
                        <View>
                            {/* <MyBarChartAtraso dezenas={megaChartAtraso} tituloBar="Maiores Atrasos" subtituloBar="10 dezenas Mais atrasadas" /> */}
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
                    : <Text></Text>}
                {selected === 3 ?
                    <>
                    <View style={{  }}>
                            <Text style={{ textAlign: "center", marginBottom: 10, fontWeight: "bold" }}>Combinações de Dezenas Pares e Ímpares</Text>
                        </View>
                        <View style={{ alignSelf: "center", marginTop: 0 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>3 Pares e 3 Ímpares: {megaSomaPercent.equal.jogos} jogos</Text>
                                <Text>{megaSomaPercent.equal.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.equal.porcentagem / 100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>4 Pares e 2 Ímpares: {megaSomaPercent.FourPTwoI.jogos} jogos</Text>
                                <Text>{megaSomaPercent.FourPTwoI.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.FourPTwoI.porcentagem / 100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>2 Pares e 4 Ímpares: {megaSomaPercent.FourITwoP.jogos} jogos</Text>
                                <Text>{megaSomaPercent.FourITwoP.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.FourITwoP.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>5 Pares e 1 Ímpares: {megaSomaPercent.FivePOneI.jogos} jogos</Text>
                                <Text>{megaSomaPercent.FivePOneI.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.FivePOneI.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>1 Pares e 5 Ímpares: {megaSomaPercent.FiveIOneP.jogos} jogos</Text>
                                <Text>{megaSomaPercent.FiveIOneP.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.FiveIOneP.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>0 Pares e 6 Ímpares: {megaSomaPercent.SixIZeroP.jogos} jogos</Text>
                                <Text>{megaSomaPercent.SixIZeroP.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.SixIZeroP.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>6 Pares e 0 Ímpares: {megaSomaPercent.SixPZeroI.jogos} jogos</Text>
                                <Text>{megaSomaPercent.SixPZeroI.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={megaSomaPercent.SixPZeroI.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
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
                    : <Text></Text>}
            </ScrollView>
        </>
    )
}


export const styles = StyleSheet.create({
    circleMega: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#209869' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 2
    },
});