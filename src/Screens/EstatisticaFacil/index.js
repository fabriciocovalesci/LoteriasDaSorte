

import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { EstatisFacil } from '../../services/estatisticas'
import MyBarChart from '../../Components/BarChart'
import { DataTable } from 'react-native-paper';

export default function EstatisticaFacil() {

    const [tableFacil, setTableFacil] = React.useState([])

    const [facilChart, setFacilChart] = React.useState([])

    const [facilChartMenor, setFacilChartMenor] = React.useState([])


    React.useEffect(() => {
        EstatisFacil().then((value) => {
            setTableFacil(value);
            setFacilChart(value.slice(0,10));
            setFacilChartMenor(value.slice(value.length-10, value.length))
        })
    }, [])

    return (
        <>
        <ScrollView>
            <View>
                <View>
                    <MyBarChart dezenas={facilChart} tituloBar="Maior Ocorrências" subtituloBar="10 dezenas Mais sorteadas" />
                </View>
                <View>
                    <MyBarChart dezenas={facilChartMenor} tituloBar="Menor Ocorrências" subtituloBar="10 dezenas Menos sorteadas" />
                </View>
            </View>
            
                <DataTable style={{  }}>
                    <DataTable.Header style={{}}>
                        <DataTable.Title numeric>Dezena</DataTable.Title>
                        <DataTable.Title numeric>Qtade</DataTable.Title>
                    </DataTable.Header>

                    {tableFacil.map((elem, index) =>
                        <DataTable.Row key={index}>
                            <DataTable.Cell numeric>{elem[0]}</DataTable.Cell>
                            <DataTable.Cell numeric>{elem[1]}</DataTable.Cell>
                        </DataTable.Row>
                    )
                    } 
                </DataTable>
            </ScrollView>
        </>
    )
}
