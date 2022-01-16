import * as React from 'react';
import { Surface, Text, Title, IconButton, Colors , Checkbox, Chip, TextInput, Snackbar, Button, Paragraph, Dialog, Portal, Provider} from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Keyboard, Share } from 'react-native';

import { styles } from '../styles'
import FiltroDb from '../../../Model/FiltroDb';
import FavoritosDataBase from '../../../Model/FavoritosDataBase';
import { returnDataFiltro } from '../../../services/filtros';
import { EstatisMega } from '../../../services/estatisticas';


import {
    ResultadoMegaSena,
    ResultadoLotoFacil,
    ResultadoLotoMania,
    ResultadoQuina
} from '../../../services';

const GeradorMegaSena = ({ route }) => {

    const [selected, setStateBtn] = React.useState(0)
    const [loteriaMega, setloteriaMega] = React.useState({ nome: '', numeros: '' });

    const [state, setstate] = React.useState()
    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const [checked, setChecked] = React.useState(false)
    const [text, setText] = React.useState('');
    const [filterDB, setFilterDB] = React.useState([])
    const [SelectedDB, setSelectedDB] = React.useState([])
    const [enableBtnGerar, setEnableBtnGerar] = React.useState(false)

    const [visibleModal, setVisibleModal] = React.useState(false);
      
    const showDialog = () => setVisibleModal(true);
  
    const hideDialog = () => setVisibleModal(false);

    async function savedData() {
        try {
            FavoritosDataBase.create({ titulo: text, numeros: JSON.stringify(loteriaMega.numeros), associar: checked, concurso: parseInt(megasena.proxConcurso), loteria: 'megasena', dataProxConcurso: megasena.dataProxConcurso })
                .then(id => {
                    console.log('Fav created with id: ' + id);
                    setText('');
                    setChecked(false)
                    onToggleSnackBar()
                    Keyboard.dismiss()
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.error(error)
        }
    }


    function generate(min, max, quantidade) {
        let numbers = []
        while(numbers.length < quantidade){
            min = Math.ceil(min);
            max = Math.floor(max);
            let aleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
            if(numbers.indexOf(aleatorio + ' ') === -1) numbers.push(aleatorio + ' ');
        }
        return numbers.sort((a, b) => {return a-b});
    } 

    function returnMSG(){
        let message = `Palpite Mega Sena para o concurso ${megasena.proxConcurso}:`
        loteriaMega.numeros.filter(elem => message = message + ' ' + elem)
        return message;
    }
 
    const onShare = async () => {
        try {
          const result = await Share.share({
            message: returnMSG(),
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    function setGenerate(){
        setloteriaMega({ nome: 'Mega Sena', numeros: generate(1, 60, 6) })
    }

    function removeFilter(){
        setSelectedDB([])
        setEnableBtnGerar(false)
    }

    async function getFilters(){
        try {
            const filters = await FiltroDb.findByloteria('megasena');
            setFilterDB(filters)
            setVisibleModal(true);
        } catch (error) {
            console.error(error);
        }
    }

    async function returnIdChildrenAplicarFiltro(id){
        setSelectedDB([])
        const data = filterDB.filter(filter => filter.id === id);
        setSelectedDB(data)
        setloteriaMega({ nome: 'Mega Sena', numeros: await returnDataFiltro(data[0].maiorocorrencia, data[0].menorocorrencia, data[0].maioratraso, data[0].menoratraso, data[0].qtadepar, data[0].qtadeimpar, data[0].qtadedezenas, EstatisMega) })
        setEnableBtnGerar(true)
    }


    let [megasena, setMega] = React.useState({
        acumuladaProxConcurso: '', acumulou: '',
        concurso: '', dataProxConcurso: '', dezenas: [], estadosPremiados: [],
        local: '', premiacoes: [], loteria: '', nome: '', data: '', proxConcurso: ''
    });


    React.useEffect(() => {
        async function loadDataMega() {
            const data = await ResultadoMegaSena();
            setMega(data.data)
        }
        loadDataMega();
    }, []);

    React.useEffect(() => {
        function initial(){
            setloteriaMega({ nome: 'Mega Sena', numeros: generate(1, 60, 6) })
        }
        initial()
    }, []);


    // modal filter
    const ModalFilter = (props) => {
        
        const [stateCheck, setCheck] = React.useState('')

        function getFilter(id){
            setCheck(id)
        }

        function fechar(){
            props.func(stateCheck)
            props.hideDialog()
        }

        return (
            <View>
              <Portal>
                <Dialog visible={props.visible} onDismiss={props.hideDialog}>
                  <Dialog.Title style={{ textAlign: "center", color: Colors.green600 }}>Filtros Mega Sena</Dialog.Title>
                  <Dialog.Content>
                    <ScrollView>
                  {props.filterDB.map((filter)=>
                  <View key={filter.id} style={{ flexDirection: "row", alignItems: "center" }}>
                    <Checkbox status={filter.id === stateCheck ? 'checked' : 'unchecked'} 
                    onPress={() => getFilter(filter.id)}/>
                    <Paragraph onPress={() => getFilter(filter.id)}>{filter.nome}</Paragraph>
                  </View>
                    )}
                    </ScrollView>
                    </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={fechar}>Aplicar Filtro</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
        );
      };

    return (
        <> 
            <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: 'center', marginBottom: 10 }}>
                <View style={{ justifyContent: "center", alignItems: "flex-end", marginTop: 25 }}>
                    <Title style={{ textAlign: "center", fontSize: 18 }}>Surpresinha Mega Sena</Title>
                </View>
                <TouchableOpacity onPress={getFilters}>
                    <View onc style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                        <IconButton
                            icon="filter-menu-outline"
                            style={{ marginRight: 0 }}
                            color={Colors.black}
                            size={20}
                        />
                        <Text style={{ fontSize: 14 }}>Filtros</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ModalFilter func={(e) => returnIdChildrenAplicarFiltro(e)} filterDB={filterDB} visible={visibleModal}  showDialog={showDialog} hideDialog={hideDialog}/>

            <ScrollView>
            <TextInput mode="outlined" style={{ marginLeft: 5, marginRight: 5 }} value={text} onChangeText={text => setText(text)} label="Titulo" />
            <View style={{ marginTop: 30, alignItems: "center"}}>

            <View style={{ justifyContent: "center", alignContent: "space-around", flexDirection: "row" }}>
                {SelectedDB.length !== 0 ?
                    <Chip icon="close" onPress={removeFilter} style={{ alignItems: "baseline", backgroundColor: '#209869', height: 40 }}><Text style={{ color: "#fff", textAlign: "center", textAlignVertical: "center" }}>{SelectedDB[0].nome}</Text></Chip>
                : null}
            </View>

                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10, justifyContent: "center" }}>
                    {loteriaMega.numeros !== undefined && loteriaMega.numeros.length !== 0 ? loteriaMega.numeros.map((dezena, index) =>
                        <View key={index} style={styles.circleMega}>
                            {dezena < 10 ?
                                <Text style={styles.fontText}>{'0' + dezena}</Text>
                                :
                                <Text style={styles.fontText}>{dezena}</Text>
                            }
                        </View>
                    ) : <Text></Text>}
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => { setChecked(!checked) }}
                    />
                    <Text onPress={() => { setChecked(!checked) }} style={{ textAlign: "center" }}>Associar ao próximo concurso: {megasena.proxConcurso}</Text>
                </View>
                <Text style={{ textAlign: "center" }}>Data próximo sorteio: {megasena.dataProxConcurso}</Text>
            </View>

            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", marginBottom: 10, marginTop: 10 }}>
                <View style={{ flexDirection: "row" }}>
                <Button icon="share" mode="contained" style={{ borderRadius: 5, width: '50%', marginLeft: 10, marginRight: 10 }} onPress={onShare}>Compartilhar</Button>
                <Button icon="refresh" mode="contained" disabled={enableBtnGerar} style={{ borderRadius: 5, width: '30%', marginLeft: 10, marginRight: 10 }} onPress={setGenerate}>Gerar</Button>
                </View>
                <Button icon="content-save-outline" mode="contained" style={{ borderRadius: 5, width: '85%', margin: 10, marginTop: 15  }} onPress={savedData}>Salvar favoritos</Button>
            </View>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Fechar',
                    onPress: () => { onDismissSnackBar },
                }}>
                Números da {loteriaMega.title} salvo nos Favoritos.
            </Snackbar>
            </ScrollView>
        </>
    );
}

export default GeradorMegaSena;