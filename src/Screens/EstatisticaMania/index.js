

import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { EstatisMania } from '../../services/estatisticas';
import { MyBarChart } from '../../Components/BarChart';
import { DataTable } from 'react-native-paper';

export default function EstatisticaMania() {

    const [tableMania, setTableMania] = React.useState([])

    const [maniaChartMaior, setManiaChart] = React.useState([])

    const [maniaChartMenor, setManiaChartMenor] = React.useState([])


    React.useEffect(() => {
        EstatisMania().then((value) => {
            setTableMania(value)
            setManiaChart(value.slice(0,10));
            setManiaChartMenor(value.slice(value.length-10, value.length))
        });
    }, [])

    return (
        <>
        <ScrollView>
            <View>
                <View>
                    <MyBarChart dezenas={maniaChartMaior} tituloBar="Maior Ocorrências" subtituloBar="10 dezenas Mais sorteadas" />
                </View>
                <View>
                    <MyBarChart dezenas={maniaChartMenor} tituloBar="Menor Ocorrências" subtituloBar="10 dezenas Menos sorteadas" />
                </View>
            </View>
            
                <DataTable style={{  }}>
                    <DataTable.Header style={{}}>
                        <DataTable.Title numeric>Dezena</DataTable.Title>
                        <DataTable.Title numeric>Qtade</DataTable.Title>
                    </DataTable.Header>

                    {tableMania.map((elem, index) =>
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
