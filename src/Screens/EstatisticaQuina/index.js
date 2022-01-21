
import React from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import { EstatisQuina } from '../../services/estatisticas';
import { MyBarChart, MyBarChartAtraso, BarChartSomaPercent } from '../../Components/BarChart';
import MyPieChart from '../../Components/PieChart';
import { DataTable, Divider, Colors } from 'react-native-paper';

import * as Progress from 'react-native-progress';

import SegmentedControlTab from "react-native-segmented-control-tab";

const CircleNumber = (props) => {
    return (
        <View style={styles.circleQuina}>
            <Text style={{ color: "#fff", alignSelf: "center", fontWeight: "bold" }}>{props.number}</Text>
        </View>
    )
}

export default function EstatisticaMega() {

    const [selected, setStateBtn] = React.useState(0)

    const [tableQuina, setTableQuina] = React.useState([])

    const [tableQuinaAnalise, setTableQuinaAnalise] = React.useState([])

    const [QuinaChart, setQuinaChart] = React.useState([])

    const [facilChartAtraso, setQuinaChartAtraso] = React.useState([])

    const [QuinaSomaParImpar, setQuinaSomaParImpar] = React.useState([])

    const [QuinaSomaPercent, setQuinaSomaPercent] = React.useState()


    React.useEffect(() => {
        EstatisQuina().then((value) => {
            setTableQuina(value.ocorrencias);
            setQuinaChart(value.ocorrencias.slice(0, 10));
            setTableQuinaAnalise(value.estatisAtrasoSeq)
            setQuinaChartAtraso(value.estatisAtrasoSeq.slice(value.estatisAtrasoSeq.length - 10, value.estatisAtrasoSeq.length))
            setQuinaSomaParImpar(value.somaParImpar.slice(value.somaParImpar.length - 100, value.somaParImpar.length))
            setQuinaSomaPercent(value.percentSoma)
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
                          QuinaChart.length === 0 && tableQuina.length === 0 ?
                          <View style={{ flex: 1, height: Dimensions.get('screen').height / 2, justifyContent: "center", alignContent: "center" }}>
                              <Text style={{ color: Colors.black, fontWeight: "bold", textAlign: "center" }}>Carregando dados ...</Text>
                              <ActivityIndicator size="large" color="#0000ff" />
                          </View>
                          :
                          <>
                        <View>
                            <MyBarChart dezenas={QuinaChart} tituloBar="Maior Ocorrências" subtituloBar="10 dezenas Mais sorteadas" />
                        </View>
                        <DataTable>
                            <DataTable.Header style={{}}>
                                <DataTable.Title >Dezena</DataTable.Title>
                                <DataTable.Title >Ocorrências</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {tableQuina.map((elem, index) =>
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
                    : null }
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
                                {tableQuinaAnalise.map((elem, index) =>
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
                                {tableQuinaAnalise.map((elem, index) =>
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
                                <Text>3 pares e 2 ímpares: {QuinaSomaPercent.equal.jogos} jogos</Text>
                                <Text>{QuinaSomaPercent.equal.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={QuinaSomaPercent.equal.porcentagem / 100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>2 pares e 3 ímpares: {QuinaSomaPercent.Combinada_1.jogos} jogos</Text>
                                <Text>{QuinaSomaPercent.Combinada_1.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={QuinaSomaPercent.Combinada_1.porcentagem / 100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>4 pares e 1 ímpares: {QuinaSomaPercent.Combinada_2.jogos} jogos</Text>
                                <Text>{QuinaSomaPercent.Combinada_2.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={QuinaSomaPercent.Combinada_2.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>1 pares e 4 ímpares: {QuinaSomaPercent.Combinada_3.jogos} jogos</Text>
                                <Text>{QuinaSomaPercent.Combinada_3.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={QuinaSomaPercent.Combinada_3.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>0 pares e 5 ímpares: {QuinaSomaPercent.Combinada_4.jogos} jogos</Text>
                                <Text>{QuinaSomaPercent.Combinada_4.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={QuinaSomaPercent.Combinada_4.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
                            <Divider style={{marginBottom: 10}}/>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <Text>5 pares e 0 ímpares: {QuinaSomaPercent.Combinada_5.jogos} jogos</Text>
                                <Text>{QuinaSomaPercent.Combinada_5.porcentagem} %</Text>
                            </View>
                            <Progress.Bar progress={QuinaSomaPercent.Combinada_5.porcentagem/100} color='red' height={10} width={Dimensions.get('screen').width - 40} />
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
                                {QuinaSomaParImpar.reverse().map((elem, index) =>
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
    circleQuina: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#058ce1' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 5
    },
});