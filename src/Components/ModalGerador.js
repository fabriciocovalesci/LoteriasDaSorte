import * as React from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native'
import { Button, Snackbar, Dialog, Portal, Paragraph, TextInput, Provider } from 'react-native-paper';

import FavoritosDataBase from '../Model/FavoritosDataBase';


const ModalGerador = (props) => {

    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const [text, setText] = React.useState('');

    function savedData() {
        try {
            FavoritosDataBase.create({ titulo: text, numeros: JSON.stringify(props.numeros) })
                .then(id => {
                    console.log('Fav created with id: ' + id);
                    setText('');
                    onToggleSnackBar()
                    props.hideDialog();
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        <Portal>
            <Dialog style={{ borderRadius: 5 }} visible={props.isVisible} onDismiss={props.hideDialog}>
                <Dialog.Title style={{ alignSelf: "center" }}>{props.title}</Dialog.Title>
                <Dialog.Content>
                    <TextInput value={text} onChangeText={text => setText(text)} label="Titulo" mode="flat" />
                </Dialog.Content>
                <Dialog.Content>
    
                <View style={{  flexDirection: "row", flexWrap: "wrap", marginTop: 10, justifyContent: "center" }}>

                    {props.numeros !== undefined && props.numeros.length !== 0 ? props.numeros.map((dezena, index) => 
                        <View key={index} style={styles.circle}>
                            <Text style={styles.fontText}>{dezena}</Text>
                        </View>
                    ): <Text></Text>}
                </View>
                
                <View style={{ marginTop: 10, justifyContent: "space-around" }}>
                    <Button icon="content-save-outline" mode="contained" style={{ borderRadius: 5 }} onPress={savedData}>Salvar</Button>
                    <Button onPress={props.hideDialog}>
                        <Text style={{ color: 'red' }}>Cancelar</Text>
                    </Button>
                </View>
                </Dialog.Content>
            </Dialog>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Fechar',
                    onPress: () => { onDismissSnackBar },
                }}>
                Números da {props.title} gravado nos Favoritos.
            </Snackbar>
        </Portal>
        </>
    );
};

export default ModalGerador;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        backgroundColor: "#3d85c6",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: 5,
        margin: 5
    },
    fontText: {
        color: "#fff", 
        alignSelf: "center", 
        fontWeight: "bold" ,
        textAlign: "center"
    },
});