

import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { EstatisMania } from '../../services/estatisticas';
import MyBarChart from '../../Components/BarChart'
import { DataTable } from 'react-native-paper';

export default function EstatisticaMania() {

    const [tableMania, setTableMania] = React.useState([])


    React.useEffect(() => {
        EstatisMania().then((value) => setTableMania(value));
    }, [])

    return (
        <>
        <ScrollView>
            <View>
                <Text>Loto Mania</Text>
                <View>
                    <MyBarChart tituloBar="Frequência por meses" subtituloBar="10 dezenas mais sorteadas" />
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
