import * as React from 'react';
import { Dimensions, View, StyleSheet, Text, Keyboard } from 'react-native'
import { Button, Snackbar, Dialog, Portal, Paragraph, TextInput, Provider, Checkbox } from 'react-native-paper';

import FavoritosDataBase from '../Model/FavoritosDataBase';

import { 
    ResultadoLotoFacil,
    ResultadoLotoMania,
    ResultadoMegaSena,
    ResultadoQuina
} from '../services';


const ModalGerador = (props) => {

    console.log(props.title);

    const [state, setstate] = React.useState()
    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const [checked, setChecked] = React.useState(false)
    const [text, setText] = React.useState('');
    const [proxConcurso, setProxConc] = React.useState('')
    const [proxDataConcurso, setProxDataConc] = React.useState('')
    const [loteria, setLoteria] = React.useState('')

    React.useEffect(() => {
        async function getLatestLoteria() {
            try {
                if (props.title) {
                    if (props.title.includes('Mega')) {
                        let mega = await ResultadoMegaSena()
                        setProxConc(mega.data.proxConcurso)
                        setProxDataConc(mega.data.dataProxConcurso)
                        setLoteria('megasena')
                    }
                    if (props.title.includes('Fácil')) {
                        let facil = await ResultadoLotoFacil()
                        setProxConc(facil.data.proxConcurso)
                        setProxDataConc(facil.data.dataProxConcurso)
                        setLoteria('lotofacil')
                    }
                    if (props.title.includes('Mania')) {
                        let mania = await ResultadoLotoMania()
                        setProxConc(mania.data.proxConcurso)
                        setProxDataConc(mania.data.dataProxConcurso)
                        setLoteria('lotomania')
                    }
                    if (props.title.includes('Quina')) {
                        let quina = await ResultadoQuina()
                        setProxConc(quina.data.proxConcurso)
                        setProxDataConc(quina.data.dataProxConcurso)
                        setLoteria('quina')
                    }
                }   
            } catch (error) {
                console.log("Error get latest concurso");
            }
        }
        getLatestLoteria()
    },[])



    async function savedData() {
        try {
            FavoritosDataBase.create({ titulo: text, numeros: JSON.stringify(props.numeros), associar: checked, concurso: parseInt(proxConcurso), loteria: loteria })
            // FavoritosDataBase.create({ titulo: text, numeros: JSON.stringify(props.numeros), associar: checked ? 1 : 0, concurso: '2121' })
                .then(id => {
                    console.log('Fav created with id: ' + id);
                    setText('');
                    setProxDataConc('')
                    setProxConc('')
                    setLoteria('')
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

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {setChecked(!checked)}}
                    />
                <Text onPress={() => {setChecked(!checked)}} style={{ textAlign: "center" }}>Associar ao próximo concurso: {proxConcurso}</Text>
                </View>
                <Text style={{ textAlign: "center" }}>Data próximo sorteio: {proxDataConcurso}</Text>
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