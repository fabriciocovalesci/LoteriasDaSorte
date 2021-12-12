import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dialog, Portal, TextInput, Snackbar, Button, Provider } from 'react-native-paper';

import FavoritosDataBase from '../Model/FavoritosDataBase';

const DeleteModal = (props) => {

    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    // console.log('dell  ', props)
    function deleteFav() {
        FavoritosDataBase.remove(props.id)
            .then((res) => {
                console.log('deletado com sucesso ', res)
                props.hideModalDelete()
                onToggleSnackBar()
            })
            .catch((err) => (console.error(err)))
    }

    return (
        <Provider>
            <Portal>
                <Dialog visible={props.isVisibleDelete} onDismiss={props.hideModalDelete}>
                    <Dialog.Title style={{ alignSelf: "center" }}>Deletar {props.title}</Dialog.Title>

                    <Dialog.Actions style={{ justifyContent: "space-around" }}>
                        <Button style={{ backgroundColor: '#DB3D13' }} onPress={deleteFav} icon="delete-forever-outline" mode="contained" >Deletar</Button>
                        <Button onPress={props.hideModalDelete}>Cancelar</Button>
                    </Dialog.Actions>
                </Dialog>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Fechar',
                        onPress: () => { props.hideModalDelete },
                    }}>
                    Favorito {props.title} deletado com sucesso !!
                </Snackbar>
            </Portal>
        </Provider>
    )
}

export default DeleteModal

const styles = StyleSheet.create({})

