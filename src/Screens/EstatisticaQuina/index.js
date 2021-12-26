

import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { EstatisQuina } from '../../services/estatisticas';
import MyBarChart from '../../Components/BarChart'
import { DataTable } from 'react-native-paper';

export default function EstatisticaQuina() {

    const [tableQuina, setTableQuina] = React.useState([])

    const [quinaChartMaior, setQuinaChart] = React.useState([])

    const [quinaChartMenor, setQuinaChartMenor] = React.useState([])


    React.useEffect(() => {
        EstatisQuina().then((value) => {
            setTableQuina(value);
            setQuinaChart(value.slice(0,10));
            setQuinaChartMenor(value.slice(value.length-10, value.length))
        });
    }, [])

    return (
        <>
        <ScrollView>
            <View>
            <View>
                <MyBarChart dezenas={quinaChartMaior} tituloBar="Maior Ocorrências" subtituloBar="10 dezenas Mais sorteadas" />
                </View>
                <View>
                    <MyBarChart dezenas={quinaChartMenor} tituloBar="Menor Ocorrências" subtituloBar="10 dezenas Menos sorteadas" />
                </View>
            </View>
            
                <DataTable style={{  }}>
                    <DataTable.Header style={{}}>
                        <DataTable.Title numeric>Dezena</DataTable.Title>
                        <DataTable.Title numeric>Qtade</DataTable.Title>
                    </DataTable.Header>

                    {tableQuina.map((elem, index) =>
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
