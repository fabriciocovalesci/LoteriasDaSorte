import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Text, FAB, Dialog, Portal, Provider, Title, Card, Paragraph, Button, Divider, TextInput } from "react-native-paper";


import { CircleNumber } from '../../Components/CircleNumber'

export default function CriarFavorito({ navigation, route }) {

    // console.log('====================================');
    // console.log(route);
    // console.log('====================================');


    const [state, setstate] = React.useState(false)

    const [text, setText] = React.useState('');

    const [arraySelected, setArraySelected] = React.useState([])

    function saveBack(){
        navigation.goBack()
    }

    let myarray = []

    function removeItem(array,number){
        const index = array.indexOf(number);
        if (index > -1) {
        array.splice(index, 1);
        }
    }

    function getNumber(selected, number){
        if(!selected) {
            myarray.push(number);
            console.log(myarray);
        }else{
            removeItem(myarray, number)
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
            <View style={{  justifyContent: "center", flexDirection: "row", flexWrap: "wrap" }}>
                {
                    Array(route.params.numeros).fill().map((elem, index) => 
                        <CircleNumber getNumber={(e, i) => getNumber(e, i)} key={index+1} number={index+1}/>
                        )
                }
            </View>
            <Divider style={{ marginTop: 10 }}/>
            <Button onPress={saveBack}  icon="content-save" color='#fff' style={{ borderColor: "red", backgroundColor: "green", margin: 5, marginBottom: 20}} mode="outlined">Salvar</Button>
            </ScrollView>
        </View>
    )
}


export const styles = StyleSheet.create({
    divider: {
        marginTop: 10, 
        marginBottom: 10 
    },
})
