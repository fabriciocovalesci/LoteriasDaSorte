import * as React from 'react';
import { View } from 'react-native';
import { Dialog, Portal, TextInput, Chip, Text, DataTable, Button, Provider, Paragraph, Badge } from 'react-native-paper';

import FavoritosDataBase from '../Model/FavoritosDataBase';


const ModalAddFav = (props) => {

    const [text, setText] = React.useState('');
    const [textTitulo, setTextTitulo] = React.useState('');
    const [newChip, setChip] = React.useState([])
    const [savedMega, setSavedMega] = React.useState([])

    const [updateMega, setUpdateMega] = React.useState([])

    const containerStyle = { backgroundColor: 'white', padding: 10 };

    function clearInput() {
        setText('')
    }

    function deleteChip(number) {
        // const index = savedMega.indexOf(number);
        //     if (index > -1) {
        //         savedMega.splice(index, 1);
        //     }
        //     setSavedMega(savedMega => [...savedMega, newNumber])
        console.log(newChip)
    }

    function addNumber() {
        setText(text)
        const newNumber = text
        setSavedMega(savedMega => [...savedMega, newNumber])
        setChip(newChip => [...newChip, (<Chip style={{ width: 75, height: 50, padding: 2, margin: 2, backgroundColor: "green" }} icon="close" key={newNumber} mode="outlined" onPress={() => deleteChip(newNumber)}>{newNumber}</Chip>)])
        clearInput()
    }


    const handleOnSubmit = async (title, desc) => {
        const note = { id: Date.now(), title, desc, time: Date.now() };
        const updatedNotes = [...notes, note];
        setUpdateMega(updatedNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      };

    async function savedMegaBD() {
        try {

            console.log('textTitulo ', textTitulo);
            console.log('save ',JSON.stringify(savedMega) );
            FavoritosDataBase.create({ titulo: textTitulo, numeros: JSON.stringify(savedMega) })
            .then( id => console.log('Fav created with id: '+ id) )
    .catch( err => console.log(err) )
            // .then( id => console.log('Favorito created with id: '+ id) )
            // .catch( err => console.log(err) )

        } catch (error) {
            console.error('ERROR salved mega ', error)
        }
        setText('')
        setTextTitulo('')
        setSavedMega([])
        setChip([])
        await props.hideModal()
    }

    return (
        <Provider>
            <Portal>
                <Dialog visible={props.isVisible} onDismiss={props.hideModal} contentContainerStyle={containerStyle}>
                    <Dialog.Title style={{ alignSelf: "center" }}>{props.title}</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Titulo"
                            value={textTitulo}
                            keyboardType="default"
                            mode="flat"
                            onChangeText={textTitulo => setTextTitulo(textTitulo)}
                        />
                    </Dialog.Content>
                    <Dialog.Content>

                        {/* <DataTableDynamic numberSequence={1} />
                    <DataTableDynamic numberSequence={11} />
                    <DataTableDynamic numberSequence={21} />
                    <DataTableDynamic numberSequence={31} />
                    <DataTableDynamic numberSequence={41} />
                    <DataTableDynamic numberSequence={51} /> */}
                        <View style={{ }}>
                            <TextInput
                                label="Adicionar"
                                value={text}
                                keyboardType="numeric"
                                mode="flat"
                                onChangeText={text => setText(text)}
                            />
                            <Button icon="plus" mode="contained" onPress={addNumber}>
                                Add numero
                            </Button>
                        </View>

                        <View style={{ margin: 10, flexDirection: "row", flexWrap: "wrap" }}>
                            {newChip}
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions style={{ justifyContent: "space-around" }}>
                        <Button icon="content-save-outline" mode="contained" onPress={savedMegaBD}>Salvar</Button>
                        <Button onPress={props.hideModal}>Fechar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Provider>
    );
};

export default ModalAddFav;


