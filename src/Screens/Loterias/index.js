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

    const [valores, setValores] = React.useState(0.00)
    const [myarray1, setArray] = React.useState({ valor: '0.00', array: [] })

    const [text, setText] = React.useState('');
    let myarray = []

    function removeItem(array, number) {
        const index = array.indexOf(number);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    function valoresLoterias(loteria, arr) {
        switch (loteria) {
            case 'Loto Fácil':
                if (myarray1.array.length + 1 < 15) {
                    setArray({ valor: '0,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 15) {
                    setArray({ valor: '2,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 16) {
                    setArray({ valor: '40,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 17) {
                    setArray({ valor: '340,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 18) {
                    setArray({ valor: '2.040,00', array: arr })
                }
                else {
                    setArray({ valor: '0,00', array: arr })
                }
                break;
            case 'Mega Sena':
                if (myarray1.array.length + 1 < 6) {
                    setArray({ valor: '0,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 6) {
                    setArray({ valor: '4,50', array: arr })
                }
                else if (myarray1.array.length + 1 === 7) {
                    setArray({ valor: '31,50', array: arr })
                }
                else if (myarray1.array.length + 1 === 8) {
                    setArray({ valor: '126,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 9) {
                    setArray({ valor: '378,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 10) {
                    setArray({ valor: '945,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 11) {
                    setArray({ valor: '2.079,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 12) {
                    setArray({ valor: '4.158,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 13) {
                    setArray({ valor: '7.722,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 14) {
                    setArray({ valor: '13.513,50', array: arr })
                }
                else if (myarray1.array.length + 1 === 15) {
                    setArray({ valor: '22.522,50', array: arr })
                }
                else {
                    setArray({ valor: '0,00', array: arr })
                }
                break;
            case 'Loto Mania':
                if (myarray1.array.length + 1 < 50) {
                    setArray({ valor: '0,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 50) {
                    setArray({ valor: '2,50', array: arr })
                }
                else {
                    setArray({ valor: '0,00', array: arr })
                }
                break;
            case 'Quina':
                if (myarray1.array.length + 1 < 5) {
                    setArray({ valor: '0,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 5) {
                    setArray({ valor: '2,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 6) {
                    setArray({ valor: '12,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 7) {
                    setArray({ valor: '42,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 8) {
                    setArray({ valor: '112,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 9) {
                    setArray({ valor: '252,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 10) {
                    setArray({ valor: '504,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 11) {
                    setArray({ valor: '924,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 12) {
                    setArray({ valor: '1.584,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 13) {
                    setArray({ valor: '2.574,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 14) {
                    setArray({ valor: '4.004,00', array: arr })
                }
                else if (myarray1.array.length + 1 === 15) {
                    setArray({ valor: '6.006,00', array: arr })
                }
                else {
                    setArray({ valor: '0,00', array: arr })
                }
                break;
            default:
                break;
        }
    }


    function getNumber(selected, number) {
        if (!selected) {
            let arr = [...myarray1.array]
            arr.push(number)
            valoresLoterias(route.params.loteira, arr)
        } else {
            removeItem(myarray1.array, number)
        }
    }

    React.useEffect(() => {
        console.log('Updated State', myarray1)
    }, [myarray1])


    function saveBack() {
        try {
            console.log('text ', text)
            FavoritosDataBase.create({ titulo: text, numeros: JSON.stringify(myarray1.array) })
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
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View>
                <Text>{route.params.loteira}</Text>
                <TextInput style={{ margin: 10 }}
                    label="Titulo"
                    value={text}
                    onChangeText={text => setText(text)}
                />
                <Text style={styles.textSubTitle}>Selecione as dezenas qtde: {myarray1.array.length}</Text>
                <View style={{ justifyContent: "space-around", flexDirection: "row" }}>
                    <Text >Soma: {myarray1.array !== undefined && myarray1.array.length !== 0 ? myarray1.array.reduce((acumulador, elemento) => acumulador + elemento) : 0}</Text>
                    <Text >Pares: {myarray1.array !== undefined && myarray1.array.length !== 0 ? myarray1.array.filter(elem => elem % 2 === 0).length : 0}</Text>
                    <Text >Ímpares: {myarray1.array !== undefined && myarray1.array.length !== 0 ? myarray1.array.filter(elem => elem % 2 !== 0).length : 0}</Text>
                    <Text >R$ {myarray1.valor}</Text>
                </View>
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
    textSubTitle: {
        textAlign: "center",
        padding: 5,
        fontSize: 16
    }
})
