import * as React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native'
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
        <Portal>
            <Dialog style={{ borderRadius: 5, height: Dimensions.get('window').height / 2, maxHeight: "auto" }} visible={props.isVisible} onDismiss={props.hideDialog}>
                <Dialog.Title style={{ alignSelf: "center" }}>{props.title}</Dialog.Title>
                <Dialog.Content>
                    <TextInput  keyboardType="default" value={text} onChangeText={text => setText(text)} label="Titulo" mode="flat" />
                </Dialog.Content>
                <Dialog.Content style={{ alignSelf: "center", marginTop: 10 }}>
                    <Paragraph style={{ fontSize: 16 }}>{props.numeros}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions style={{ flex: 1, justifyContent: "space-around" }}>
                    <Button icon="content-save-outline" mode="contained" style={{ borderRadius: 5 }} onPress={savedData}>Salvar</Button>
                    <Button onPress={props.hideDialog}>Cancelar</Button>
                </Dialog.Actions>
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
    );
};

export default ModalGerador;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});