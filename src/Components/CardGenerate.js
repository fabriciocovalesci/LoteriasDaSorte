import * as React from 'react';
import { Dimensions, View, StyleSheet, Text, Keyboard } from 'react-native'
import { Button, Snackbar, Dialog, Portal, Paragraph, TextInput, Provider, Checkbox } from 'react-native-paper';

import FavoritosDataBase from '../Model/FavoritosDataBase';
import FiltroDb from '../Model/FiltroDb';


export default function CardGenerate(props) {

    const [state, setstate] = React.useState()
    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const [checked, setChecked] = React.useState(false)
    const [text, setText] = React.useState('');



    async function savedData() {
        try {
            FavoritosDataBase.create({ titulo: text, numeros: JSON.stringify(props.numeros), associar: checked, concurso: parseInt(props.proxConcurso), loteria: props.loteria, dataProxConcurso: props.proxDataConcurso })
                .then(id => {
                    console.log('Fav created with id: ' + id);
                    setText('');
                    setChecked(false)
                    onToggleSnackBar()
                    props.hideDialog();
                    Keyboard.dismiss()
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <View>
                <Text style={{ alignSelf: "center", fontSize: 16, margin: 10, fontWeight: "bold" }}>{props.title}</Text>
                <TextInput style={{ marginLeft: 5, marginRight: 5}} value={text} onChangeText={text => setText(text)} label="Titulo" mode="flat" />

                <View style={{  flexDirection: "row", flexWrap: "wrap", marginTop: 10, justifyContent: "center" }}>

                {props.numeros !== undefined && props.numeros.length !== 0 ? props.numeros.map((dezena, index) => 
                    <View key={index} style={props.loteria === 'megasena' ? styles.circleMega : props.loteria === 'lotofacil' ? styles.circleFacil : props.loteria === 'lotomania' ? styles.circleMania : props.loteria === 'quina' ? styles.circleQuina : styles.circle}>
                        { dezena < 10 ? 
                        <Text style={styles.fontText}>{'0' + dezena}</Text>
                        :
                        <Text style={styles.fontText}>{dezena}</Text>
                        }
                    </View>
                ): <Text></Text>}
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {setChecked(!checked)}}
                    />
                <Text onPress={() => {setChecked(!checked)}} style={{ textAlign: "center" }}>Associar ao próximo concurso: {props.proxConcurso}</Text>
                </View>
                <Text style={{ textAlign: "center" }}>Data próximo sorteio: {props.proxDataConcurso}</Text>
                <View style={{ margin: 5, alignItems: "center", justifyContent: "space-around", flexDirection: "row" }}>
                    <Button icon="content-save-outline" mode="contained" style={{ borderRadius: 5, width: '50%' }} onPress={savedData}>Salvar</Button>
                    <Button icon="refresh" mode="contained" style={{ borderRadius: 5, width: '30%' }} onPress={() => props.gerarNumeros(props.loteria)}>Gerar</Button>
                </View>
            </View>
            <View>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Fechar',
                    onPress: () => { onDismissSnackBar },
                }}>
                Números da {props.title} salvo nos Favoritos.
            </Snackbar>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    circle: {
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
        backgroundColor: "#3d85c6",
        justifyContent: "center",
        flexDirection: "row",
        padding: 0,
        margin: 5
    },
    circleQuina: {
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
        backgroundColor: '#058ce1' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 5
    },
    circleFacil: {
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
        backgroundColor: '#930989' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 5
    },
    circleMania: {
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
        backgroundColor: '#F78100' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 5
    },
    circleMega: {
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
        backgroundColor: '#209869' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 5
    },
    fontText: {
        color: "#fff", 
        alignSelf: "center",
        fontWeight: "bold" ,
        textAlign: "center",
    },
});