

import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { EstatisMega } from '../../services/estatisticas';
import MyBarChart from '../../Components/BarChart'
import { DataTable } from 'react-native-paper';

export default function EstatisticaMega() {

    const [tableMega, setTableMega] = React.useState([])

    const [megaChart, setMegaChart] = React.useState([])

    const [megaChartMenor, setMegaChartMenor] = React.useState([])


    React.useEffect(() => {
        EstatisMega().then((value) => {
            setTableMega(value);
            setMegaChart(value.slice(0,10));
            setMegaChartMenor(value.slice(value.length-10, value.length))
        });
    }, [])

    return (
        <>
        <ScrollView>
            <View>
                <View>
                    <MyBarChart dezenas={megaChart} tituloBar="Maior Ocorrências" subtituloBar="10 dezenas Mais sorteadas" />
                </View>
                <View>
                    <MyBarChart dezenas={megaChartMenor} tituloBar="Menor Ocorrências" subtituloBar="10 dezenas Menos sorteadas" />
                </View>
            </View>
            
                <DataTable style={{  }}>
                    <DataTable.Header style={{}}>
                        <DataTable.Title numeric>Dezena</DataTable.Title>
                        <DataTable.Title numeric>Ocorrências</DataTable.Title>
                    </DataTable.Header>

                    {tableMega.map((elem, index) =>
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
