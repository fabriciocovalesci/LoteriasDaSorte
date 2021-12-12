import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dialog, Portal, Text, Badge, DataTable, Button, Provider, Paragraph } from 'react-native-paper';

const DataTableDynamic = (props) => {

    const [state, setstate] = React.useState([])

    function selectNumber(number) {
        setstate(prevArray => [...prevArray, number])
    
        console.log('numero selecionado ', state)
    }



    return (
        <DataTable>
            <DataTable.Row style={{ flex: 1, justifyContent: "center" }}>
                {
                    Array(10).fill().map((_, i) => i + parseInt(props.numberSequence)).map(i =>
                        <DataTable.Cell style={styles.rowTable} key={i} ><Badge onPress={() => selectNumber(i)} style={styles.badgeRow} size={50}><Text style={styles.textRow}>{i}</Text></Badge></DataTable.Cell>)
                }
            </DataTable.Row>
        </DataTable>
    );
};

export default DataTableDynamic;


const styles = StyleSheet.create({
    rowTable: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        width: 100
    },
    badgeRow: {
        backgroundColor: 'blue',
        width: 20,
        height: 20,
        borderRadius: 10
    },
    badgeRowSelect: {
        backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 10
    },
    textRow: {
        color: "#fffff",
        fontSize: 15
    },
    textRowS: {
        color: "#000",
        fontSize: 15
    }
});

