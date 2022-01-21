import React from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import { EstatisFacil } from '../../services/estatisticas';
import { MyBarChart, MyBarChartAtraso, BarChartSomaPercent } from '../../Components/BarChart';
import MyPieChart from '../../Components/PieChart';
import { DataTable, Divider, Colors } from 'react-native-paper';

import * as Progress from 'react-native-progress';

import SegmentedControlTab from "react-native-segmented-control-tab";

const CircleNumber = (props) => {
    return (
        <View style={styles.circleFacil}>
            <Text style={{ color: "#fff", alignSelf: "center", fontWeight: "bold" }}>{props.number}</Text>
        </View>
    )
}


export default function EstatisticaMega() {

    const [selected, setStateBtn] = React.useState(0)

    const [tableFacil, setTableFacil] = React.useState([])

    const [tableFacilAnalise, setTableFacilAnalise] = React.useState([])

    const [facilChart, setFacilChart] = React.useState([])

    const [facilChartAtraso, setFacilChartAtraso] = React.useState([])

    const [facilSomaParImpar, setFacilSomaParImpar] = React.useState([])

    const [facilSomaPercent, setFacilSomaPercent] = React.useState()


    React.useEffect(() => {
        EstatisFacil().then((value) => {
            setTableFacil(value.ocorrencias);
            setFacilChart(value.ocorrencias.slice(0, 10));
            setTableFacilAnalise(value.estatisAtrasoSeq)
            setFacilChartAtraso(value.estatisAtrasoSeq.slice(value.estatisAtrasoSeq.length - 10, value.estatisAtrasoSeq.length))
            setFacilSomaParImpar(value.somaParImpar.slice(value.somaParImpar.length - 100, value.somaParImpar.length))
            setFacilSomaPercent(value.percentSoma)
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
                    {
                         facilChart.length === 0 && tableFacil.length === 0 ?
                         <View style={{ flex: 1, height: Dimensions.get('screen').height / 2, justifyContent: "center", alignContent: "center" }}>
                             <Text style={{ color: Colors.black, fontWeight: "bold", textAlign: "center" }}>Carregando dados ...</Text>
                             <ActivityIndicator size="large" color="#0000ff" />
                         </View>
                         :
                         <>
                        <View>
                            <MyBarChart dezenas={facilChart} tituloBar="Maior Ocorrências" subtituloBar="10 dezenas Mais sorteadas" />
                        </View>
                        <DataTable>
                            <DataTable.Header style={{}}>
                                <DataTable.Title >Dezena</DataTable.Title>
                                <DataTable.Title >Ocorrências</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {tableFacil.map((elem, index) =>
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
                                {tableFacilAnalise.map((elem, index) =>
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
                                {tableFacilAnalise.map((elem, index) =>
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
                                <Text>7 pares e 8 ímpares: {facilSomaPercent.equal.jogos} jogos</Text>
                                <Text>{facilSomaPercent.equal.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={facilSomaPercent.equal.porcentagem / 100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>8 pares e 7 ímpares: {facilSomaPercent.Combinada_1.jogos} jogos</Text>
                                <Text>{facilSomaPercent.Combinada_1.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={facilSomaPercent.Combinada_1.porcentagem / 100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>6 pares e 9 ímpares: {facilSomaPercent.Combinada_2.jogos} jogos</Text>
                                <Text>{facilSomaPercent.Combinada_2.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={facilSomaPercent.Combinada_2.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>9 pares e 6 ímpares: {facilSomaPercent.Combinada_3.jogos} jogos</Text>
                                <Text>{facilSomaPercent.Combinada_3.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={facilSomaPercent.Combinada_3.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>5 pares e 10 ímpares: {facilSomaPercent.Combinada_4.jogos} jogos</Text>
                                <Text>{facilSomaPercent.Combinada_4.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={facilSomaPercent.Combinada_4.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>10 pares e 5 ímpares: {facilSomaPercent.Combinada_5.jogos} jogos</Text>
                                <Text>{facilSomaPercent.Combinada_5.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={facilSomaPercent.Combinada_5.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>4 pares e 11 ímpares: {facilSomaPercent.Combinada_6.jogos} jogos</Text>
                                <Text>{facilSomaPercent.Combinada_6.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={facilSomaPercent.Combinada_6.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>11 pares e 4 ímpares: {facilSomaPercent.Combinada_7.jogos} jogos</Text>
                                <Text>{facilSomaPercent.Combinada_7.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={facilSomaPercent.Combinada_7.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
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
                                {facilSomaParImpar.reverse().map((elem, index) =>
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
    circleFacil: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#930989' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 5
    }
});