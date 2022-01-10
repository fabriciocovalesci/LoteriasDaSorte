import * as React from "react";
import { View, FlatList, Dimensions } from "react-native";
import { Text, FAB, Dialog,Chip, Portal, Provider, Title, Card, Paragraph, Button, Divider } from "react-native-paper";

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createNavigationContainerRef, useIsFocused, useNavigationBuilder } from '@react-navigation/native'

import FavoritosDataBase from "../../Model/FavoritosDataBase";
import TopBar from "../../Components/TopBar";
import DeleteModal from "../../Components/deleteModal";
import { styles } from '../Filtro/styles'
const Stack = createNativeStackNavigator();

import FiltroDb from "../../Model/FiltroDb";

import CardFilter from "../../Components/CardFilter";

export default function ListarFiltro({ route }) {
    
    const [dataLoteria, setLoteria] = React.useState([])

    const [selectedId, setSelectedId] = React.useState('');

    const [stateDelete, setstateDelete] = React.useState({ _id: '', titulo: '' })

    const [isVisibleDelete, setVisibleDelete] = React.useState(false);


    const [filtros, setFiltros] = React.useState([])
    const [loading, setLoading] = React.useState(true);

    const showModalDelete = () => setVisibleDelete(true);
    const hideModalDelete = () => setVisibleDelete(false);

    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    const getObject = React.useCallback(() => {
        FiltroDb.all().then((res) => {
            setFiltros(res)
        }).catch((err) => console.error(err))
    });

    React.useEffect(() => {
        getObject()
    }, [getObject])

    const CardListFiltro = ({ item }) => {

        // nome: nome,
        // loteria: loteria,
        // qtadepar: sliderMegaPar,
        // qtadeimpar: sliderMegaImpar,
        // qtadedezenas: sliderDezenas,
        // soma: '0',
        // maiorocorrencia: maiorOcorrencia,
        // menorocorrencia: menorOcorrencia,
        // maioratraso: maiorAtraso,
        // menoratraso: menorAtraso,
        // valoraposta: valor,
        // ultimosconcurso: ultimosconcurso

        function editFiltro(id, loteria){

            console.log(id, loteria);
        }

        function deleteFitro(id){
            console.log(id);
            FiltroDb.remove(id)
            .then((res) => {
                console.log(`deletado com sucesso id ${id} - ${res}`)
                getObject()
            })
            .catch((err) => (console.error(err)))
        }

        function viewFiltro(id){
            console.log(id);
        }


        const { id, nome, loteria, qtadedezenas, qtadepar, qtadeimpar } = item;
        return (
            <>
                <View key={id}>
                    <Card style={{ margin: 5, borderColor: 'blue', borderStyle: "solid", borderWidth: 0.5 }}>
                        <Card.Content>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Title numberOfLines={1} ellipsizeMode="tail" style={{ width: 200 }}>{nome}</Title>
                            { loteria === 'megasena' ? 
                            <Chip icon="information" style={{ backgroundColor: '#209869' }}><Text style={{ color: "#fff" }}>Mega Sena</Text></Chip>
                            : loteria === 'lotofacil' ?
                            <Chip icon="information" style={{ backgroundColor: '#930989' }}><Text style={{ color: "#fff" }}>Loto Fácil</Text></Chip>
                            : loteria === 'lotomania' ?
                            <Chip icon="information" style={{ backgroundColor: '#F78100' }}><Text style={{ color: "#fff" }}>Loto Mania</Text></Chip>
                            :  loteria === 'quina' ?
                            <Chip icon="information" style={{ backgroundColor: '#058ce1', width: 100 }}><Text style={{ color: "#fff" }}>Quina</Text></Chip>
                            : null
                            }
                            </View>
                            
                            <View>
                                <Text style={{paddingTop: 5, paddingBottom: 5 }}>Quantidade de dezenas: {qtadedezenas}</Text> 
                                <Text style={{paddingTop: 5, paddingBottom: 5 }}>Quantidade de Pares: {qtadepar}</Text> 
                                <Text style={{paddingTop: 5, paddingBottom: 5 }}>Quantidade de Impares: {qtadeimpar}</Text> 
                            </View>
        
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => viewFiltro(id)} icon="eye" style={{ borderColor: "blue", margin: 5 }} mode="outlined">Detalhes</Button>
                            <Button onPress={() => editFiltro(id, loteria)} icon="pencil" style={{ borderColor: "blue", margin: 5 }} mode="outlined">Editar</Button>
                            <Button onPress={() => deleteFitro(id)} icon="delete-forever-outline" style={{ borderColor: "red", margin: 5 }} mode="outlined">Excluir</Button>
                        </Card.Actions>
                    </Card>
                </View>
            </>
        )
    }

    return (
        <>
        <React.Fragment>
            <Provider>
                <Title style={{ alignSelf: "center", margin: 10 }}>Filtros Personalizados</Title>

                 <View style={{ flex: 1, height: Dimensions.get('screen').height, justifyContent: "center", alignContent: 'center' }}>
                    <FlatList data={filtros} keyExtractor={item => item.id}
                        renderItem={CardListFiltro} 
                    />
                </View> 

            </Provider>
        </React.Fragment>
        </>
    )
}

