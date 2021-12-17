import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Text, FAB, Dialog, Portal, Provider, Title, Card, Snackbar, Button, Divider, TextInput } from "react-native-paper";

import FavoritosDataBase from '../../Model/FavoritosDataBase'
import { CircleNumber } from '../../Components/CircleNumber'

export default function CriarFavorito({ navigation, route }) {

    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const [stateUp, setUpdate] = React.useState([])


    const [text, setText] = React.useState('');
    let myarray = []

    function removeItem(array, number) {
        const index = array.indexOf(number);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    function getNumber(selected, number) {
        if (!selected) {
            myarray.push(number);
            console.log(myarray);
        } else {
            removeItem(myarray, number)
        }
    }
    let objectLoteria ={
        titulo: '',
        numeros: []
    }

    function saveBack() {
        try {
           
            console.log(myarray.length);
            FavoritosDataBase.create({ titulos: text, numeros: JSON.stringify(myarray) })
                .then(id => {
                    console.log('Fav created with id: ' + id)
                    FavoritosDataBase.all().then(setUpdate)
                    onToggleSnackBar()
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'blue' }}>
            <View>
                <Text>{route.params.loteira}</Text>
                <TextInput style={{ margin: 10 }}
                    label="Titulo"
                    value={text}
                    onChangeText={text => setText(text)}
                />
                <Text>Selecione as dezenas</Text>
            </View>
            <ScrollView>
                <View style={{ justifyContent: "center", flexDirection: "row", flexWrap: "wrap" }}>
                    {
                        Array(route.params.numeros).fill().map((elem, index) =>
                            <CircleNumber getNumber={(e, i) => getNumber(e, i)} key={index + 1} number={index + 1} />
                        )
                    }
                </View>
                <Divider style={{ marginTop: 10 }} />
                <Button onPress={saveBack} icon="content-save" color='#fff' style={{ borderColor: "red", backgroundColor: "green", margin: 5, marginBottom: 20 }} mode="outlined">Salvar</Button>
            </ScrollView>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Fechar e voltar',
                    onPress: () => {
                        navigation.navigate('Favoritos', { addElement: stateUp })
                    },
                }}>
                Loteria {text} salva nos favoritos !!
            </Snackbar>

        </View>
    )
}


export const styles = StyleSheet.create({
    divider: {
        marginTop: 10,
        marginBottom: 10
    },
})
