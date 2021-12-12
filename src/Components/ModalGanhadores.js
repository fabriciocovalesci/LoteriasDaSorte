
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

import {
    Card,
    Text,
    Button,
    Paragraph,
    DataTable,
    Modal,
    Portal,
    Provider
} from "react-native-paper";

const ModalGanhadores = (props) => {

    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 15 };

    return (
        <React.Fragment>
            <View style={{ flex: 1 }}>
                <Portal>
                    <Modal visible={props.isVisible} onDismiss={props.onDismiss} contentContainerStyle={containerStyle}>
                        <View >
                            <Text style={{ alignSelf: "center" }}>Ganhadores {props.name}</Text>
                        </View>
                        <View>

                            <DataTable >
                                <DataTable.Header>
                                    <DataTable.Title >Acertos</DataTable.Title>
                                    <DataTable.Title >Ganhadores</DataTable.Title>
                                    <DataTable.Title >Prêmio</DataTable.Title>
                                </DataTable.Header>

                                {props.premiacoes.map((elem, index) =>
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell  >{elem.acertos}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 50 }}>{elem.vencedores}</DataTable.Cell>
                                        <DataTable.Cell  >R$ {elem.premio}</DataTable.Cell>
                                    </DataTable.Row>
                                )}

                            </DataTable>
                        </View>
                        <View>
                            <Button onPress={() => props.onDismiss()}>Fechar</Button>
                        </View>
                    </Modal>
                </Portal>
            </View>
        </React.Fragment>
    )
}

export default ModalGanhadores;


const styles = StyleSheet.create({
    horizontalLine: {
        width: 335,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginHorizontal: 15,
        paddingVertical: 5,
    }
})