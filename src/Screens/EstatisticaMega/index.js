

import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { EstatisMega, EstatisMegaAnalise } from '../../services/estatisticas';
import MyBarChart from '../../Components/BarChart'
import { DataTable } from 'react-native-paper';

const megaAll = require('../../../Json/allmega.json')

import SegmentedControlTab from "react-native-segmented-control-tab";

import { filtersAllCustom } from '../../services/estatisticas';




export default function EstatisticaMega() {

    const [selected, setStateBtn] = React.useState(0)

    const [tableMega, setTableMega] = React.useState([])

    const [tableMegaAnalise, setTableMegaAnalise] = React.useState([])

    const [megaChart, setMegaChart] = React.useState([])

    const [megaChartMenor, setMegaChartMenor] = React.useState([])



    React.useEffect(() => {
        EstatisMega().then((value) => {
            setTableMega(value);
            setMegaChart(value.slice(0, 10));
            setMegaChartMenor(value.slice(value.length - 10, value.length))
        });
    }, [])

    React.useEffect(() => {
        EstatisMegaAnalise().then((values) => {
            setTableMegaAnalise(values)
        })
    }, [])


    return (
        <>
            <View style={{ marginBottom: 10, marginTop: 10, marginLeft: 5, marginRight: 5 }}>
                <SegmentedControlTab
                    values={["Ocorrências", "Atrasos", "Sequências", "Combinações"]}
                    selectedIndex={selected}
                    onTabPress={index => setStateBtn(index)}
                />
            </View>
            <ScrollView>
                <View>
                    <View>
                        <MyBarChart dezenas={megaChart} tituloBar="Maior Ocorrências" subtituloBar="10 dezenas Mais sorteadas" />
                    </View>
                </View>

                {selected === 0 ?
                    <DataTable>
                        <DataTable.Header style={{}}>
                            <DataTable.Title >Dezena</DataTable.Title>
                            <DataTable.Title >Ocorrências</DataTable.Title>
                        </DataTable.Header>
                        <ScrollView>
                            {tableMega.map((elem, index) =>
                                <DataTable.Row key={index}>
                                    <DataTable.Cell >{elem[0]}</DataTable.Cell>
                                    <DataTable.Cell >{elem[1]}</DataTable.Cell>
                                </DataTable.Row>
                            )}
                        </ScrollView>
                    </DataTable>
                    : <Text></Text>}
                {selected === 1 ?
                    <DataTable>
                        <DataTable.Header style={{}}>
                            <DataTable.Title >Dezena</DataTable.Title>
                            <DataTable.Title >Atraso</DataTable.Title>
                            <DataTable.Title >Max Atraso</DataTable.Title>
                            <DataTable.Title >Média Atraso</DataTable.Title>
                        </DataTable.Header>
                        <ScrollView>
                            {tableMegaAnalise.map((elem, index) =>
                                <DataTable.Row key={index+elem.dezena}>
                                    <DataTable.Cell >{elem.dezena}</DataTable.Cell>
                                    <DataTable.Cell >{elem.atraso}</DataTable.Cell>
                                    <DataTable.Cell >{elem.maxAtraso}</DataTable.Cell>
                                    <DataTable.Cell >{elem.mediaAtraso} %</DataTable.Cell>
                                </DataTable.Row>
                            )}
                        </ScrollView>
                    </DataTable>
                    : <Text></Text>}
                {selected === 2 ?
                    <DataTable>
                    <DataTable.Header style={{}}>
                        <DataTable.Title >Dezena</DataTable.Title>
                        <DataTable.Title >Sequência</DataTable.Title>
                        <DataTable.Title >Max Seq</DataTable.Title>
                        <DataTable.Title >Média Seq</DataTable.Title>
                    </DataTable.Header>
                    <ScrollView>
                        {tableMegaAnalise.map((elem, index) =>
                            <DataTable.Row key={index+elem.dezena}>
                                <DataTable.Cell >{elem.dezena}</DataTable.Cell>
                                <DataTable.Cell >{elem.sequencia}</DataTable.Cell>
                                <DataTable.Cell >{elem.maxSequencia}</DataTable.Cell>
                                <DataTable.Cell >{elem.mediaSequencia} %</DataTable.Cell>
                            </DataTable.Row>
                        )}
                    </ScrollView>
                </DataTable>
                    : <Text></Text>}
            </ScrollView>
        </>
    )
}
