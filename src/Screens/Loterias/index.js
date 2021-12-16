import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text, FAB, Dialog, Portal, Provider, Title, Card, Paragraph, Button, Divider, TextInput } from "react-native-paper";


import { CircleNumber } from '../../Components/CircleNumber'

export default function CriarFavorito({ navigation, route }) {

    console.log('====================================');
    console.log(route);
    console.log('====================================');

    const [text, setText] = React.useState('');

    function saveBack(){
        navigation.goBack()
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
                        <CircleNumber key={index+1} number={index+1}/>
                        )
                }
            </View>
            <Divider style={{ marginTop: 10 }}/>
            <Button onPress={saveBack}  icon="content-save" color='#fff' style={{ borderColor: "red", backgroundColor: "green", margin: 5, marginBottom: 20}} mode="outlined">Salvar</Button>
            </ScrollView>
        </View>
    )
}
