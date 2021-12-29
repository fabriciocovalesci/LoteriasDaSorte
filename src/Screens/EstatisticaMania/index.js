import React from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import { EstatisMania } from '../../services/estatisticas';
import { MyBarChart, MyBarChartAtraso, BarChartSomaPercent } from '../../Components/BarChart';
import MyPieChart from '../../Components/PieChart';
import { DataTable, Divider } from 'react-native-paper';

const megaAll = require('../../../Json/allmega.json')

import * as Progress from 'react-native-progress';

import SegmentedControlTab from "react-native-segmented-control-tab";

export default function EstatisticaMega() {

    const [selected, setStateBtn] = React.useState(0)

    const [tableMania, setTableMania] = React.useState([])

    const [tableManiaAnalise, setTableManiaAnalise] = React.useState([])

    const [maniaChart, setManiaChart] = React.useState([])

    const [facilChartAtraso, setManiaChartAtraso] = React.useState([])

    const [maniaSomaParImpar, setManiaSomaParImpar] = React.useState([])

    const [maniaSomaPercent, setManiaSomaPercent] = React.useState()


    React.useEffect(() => {
        EstatisMania().then((value) => {
            setTableMania(value.ocorrencias);
            setManiaChart(value.ocorrencias.slice(0, 10));
            setTableManiaAnalise(value.estatisAtrasoSeq)
            setManiaChartAtraso(value.estatisAtrasoSeq.slice(value.estatisAtrasoSeq.length - 10, value.estatisAtrasoSeq.length))
            setManiaSomaParImpar(value.somaParImpar.slice(value.somaParImpar.length - 100, value.somaParImpar.length))
            setManiaSomaPercent(value.percentSoma)
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
                            <MyBarChart dezenas={maniaChart} tituloBar="Maior Ocorrências" subtituloBar="10 dezenas Mais sorteadas" />
                        </View>
                        <DataTable>
                            <DataTable.Header style={{}}>
                                <DataTable.Title >Dezena</DataTable.Title>
                                <DataTable.Title >Ocorrências</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {tableMania.map((elem, index) =>
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell >{elem[0]}</DataTable.Cell>
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
                            {/* <MyBarChartAtraso dezenas={facilChartAtraso} tituloBar="Maiores Atrasos" subtituloBar="10 dezenas Mais atrasadas" /> */}
                        </View>
                        <DataTable>
                            <DataTable.Header style={{}}>
                                <DataTable.Title >Dezena</DataTable.Title>
                                <DataTable.Title >Atraso</DataTable.Title>
                                <DataTable.Title >Max Atraso</DataTable.Title>
                                <DataTable.Title >Média Atraso</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {tableManiaAnalise.map((elem, index) =>
                                    <DataTable.Row key={index + elem.dezena}>
                                        <DataTable.Cell >{elem.dezena}</DataTable.Cell>
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
                                {tableManiaAnalise.map((elem, index) =>
                                    <DataTable.Row key={index + elem.dezena}>
                                        <DataTable.Cell >{elem.dezena}</DataTable.Cell>
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
                                <Text>10 pares e 10 ímpares: {maniaSomaPercent.equal.jogos} jogos</Text>
                                <Text>{maniaSomaPercent.equal.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={maniaSomaPercent.equal.porcentagem / 100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>9 pares e 11 ímpares: {maniaSomaPercent.Combinada_1.jogos} jogos</Text>
                                <Text>{maniaSomaPercent.Combinada_1.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={maniaSomaPercent.Combinada_1.porcentagem / 100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>11 pares e 9 ímpares: {maniaSomaPercent.Combinada_2.jogos} jogos</Text>
                                <Text>{maniaSomaPercent.Combinada_2.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={maniaSomaPercent.Combinada_2.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>8 pares e 12 ímpares: {maniaSomaPercent.Combinada_3.jogos} jogos</Text>
                                <Text>{maniaSomaPercent.Combinada_3.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={maniaSomaPercent.Combinada_3.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>12 pares e 8 ímpares: {maniaSomaPercent.Combinada_4.jogos} jogos</Text>
                                <Text>{maniaSomaPercent.Combinada_4.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={maniaSomaPercent.Combinada_4.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>13 pares e 7 ímpares: {maniaSomaPercent.Combinada_5.jogos} jogos</Text>
                                <Text>{maniaSomaPercent.Combinada_5.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={maniaSomaPercent.Combinada_5.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>7 pares e 13 ímpares: {maniaSomaPercent.Combinada_6.jogos} jogos</Text>
                                <Text>{maniaSomaPercent.Combinada_6.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={maniaSomaPercent.Combinada_6.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>6 pares e 14 ímpares: {maniaSomaPercent.Combinada_7.jogos} jogos</Text>
                                <Text>{maniaSomaPercent.Combinada_7.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={maniaSomaPercent.Combinada_7.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>14 pares e 6 ímpares: {maniaSomaPercent.Combinada_8.jogos} jogos</Text>
                                <Text>{maniaSomaPercent.Combinada_8.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={maniaSomaPercent.Combinada_8.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>15 pares e 5 ímpares: {maniaSomaPercent.Combinada_9.jogos} jogos</Text>
                                <Text>{maniaSomaPercent.Combinada_9.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={maniaSomaPercent.Combinada_9.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>5 pares e 15 ímpares: {maniaSomaPercent.Combinada_10.jogos} jogos</Text>
                                <Text>{maniaSomaPercent.Combinada_10.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={maniaSomaPercent.Combinada_10.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>16 pares e 4 ímpares: {maniaSomaPercent.Combinada_11.jogos} jogos</Text>
                                <Text>{maniaSomaPercent.Combinada_11.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={maniaSomaPercent.Combinada_11.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>4 pares e 16 ímpares: {maniaSomaPercent.Combinada_12.jogos} jogos</Text>
                                <Text>{maniaSomaPercent.Combinada_12.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={maniaSomaPercent.Combinada_12.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
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
                                {maniaSomaParImpar.map((elem, index) =>
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell >{elem.concurso}</DataTable.Cell>
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
