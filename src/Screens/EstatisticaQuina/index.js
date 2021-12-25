

import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { EstatisQuina } from '../../services/estatisticas';
import MyBarChart from '../../Components/BarChart'
import { DataTable } from 'react-native-paper';

export default function EstatisticaQuina() {

    const [tableQuina, setTableQuina] = React.useState([])


    React.useEffect(() => {
        EstatisQuina().then((value) => setTableQuina(value));
    }, [])

    return (
        <>
        <ScrollView>
            <View>
                <Text>Quina</Text>
                <View>
                    <MyBarChart tituloBar="Frequência por meses" subtituloBar="10 dezenas mais sorteadas" />
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
