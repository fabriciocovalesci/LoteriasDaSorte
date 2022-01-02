import * as React from "react";
import { View, FlatList, Dimensions } from "react-native";
import { Text, FAB, Dialog,Chip, Portal, Provider, Title, Card, Paragraph, Button, Divider } from "react-native-paper";

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation, useIsFocused } from '@react-navigation/native'

import FavoritosDataBase from "../../Model/FavoritosDataBase";
import { CircleNumber } from "../../Components/CircleNumber";
import TopBar from "../../Components/TopBar";
import DeleteModal from "../../Components/deleteModal";
import { styles } from './styles'

const Stack = createNativeStackNavigator();


const Favoritos = ({ navigation, route }) => {

    const [dataLoteria, setLoteria] = React.useState([])

    const [selectedId, setSelectedId] = React.useState('');

    const [stateDelete, setstateDelete] = React.useState({ _id: '', titulo: '' })

    const [isVisibleDelete, setVisibleDelete] = React.useState(false);

    const [loading, setLoading] = React.useState(true);

    const showModalDelete = () => setVisibleDelete(true);
    const hideModalDelete = () => setVisibleDelete(false);

    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    async function getDataBase() {
        try {
            await FavoritosDataBase.all().then(setLoteria)
        } catch (error) {
            console.error(`Error: banco de dados ${error}`)
        }
    }

    const isFocused = useIsFocused();

    React.useEffect(() => {
        getDataBase()
    }, [isFocused])


    const deleteFavorito = (id) => {
        FavoritosDataBase.remove(id)
            .then((res) => {
                console.log(`deletado com sucesso id ${id} - ${res}`)
                getDataBase()
            })
            .catch((err) => (console.error(err)))
    }

    function editFavorito(id, loteria) {
        switch (loteria) {
            case 'megasena':
                navigation.navigate('CriarFavorito', { loteria: loteria, numeros: 60, id: id })
                break;
            case 'lotofacil':
                navigation.navigate('CriarFavorito', { loteria: loteria, numeros: 25, id: id })
                break;
            case 'lotomania':
                navigation.navigate('CriarFavorito', { loteria: loteria, numeros: 50, id: id })
                break;
            case 'quina':
                navigation.navigate('CriarFavorito', { loteria: loteria, numeros: 80, id: id })
                break;
            default:
                console.error("Error ao direcionar para edicao");
                break;
        }
    }

    const CardList = ({ item }) => {
        console.log(item);
        const { id, titulo, numeros, loteria, dataProxConcurso } = item;
        return (
            <>
                <View key={id}>
                    <Card style={{ margin: 5, borderColor: 'blue', borderStyle: "solid", borderWidth: 0.5 }}>
                        <Card.Content>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Title numberOfLines={1} ellipsizeMode="tail" style={{ width: 200 }}>{titulo}</Title>
                            { loteria === 'megasena' ? 
                            <Chip icon="information" style={{ backgroundColor: '#2b6212' }}><Text style={{ color: "#fff" }}>Mega Sena</Text></Chip>
                            : loteria === 'lotofacil' ?
                            <Chip icon="information" style={{ backgroundColor: '#930989' }}><Text style={{ color: "#fff" }}>Loto Fácil</Text></Chip>
                            : loteria === 'lotomania' ?
                            <Chip icon="information" style={{ backgroundColor: '#F78100' }}><Text style={{ color: "#fff" }}>Loto Mania</Text></Chip>
                            :  loteria === 'quina' ?
                            <Chip icon="information" style={{ backgroundColor: '#260085', width: 100 }}><Text style={{ color: "#fff" }}>Quina</Text></Chip>
                            : null
                            }
                            </View>
                            { item.associar === 1 ?
                            <View>
                                <Text style={{paddingTop: 5, paddingBottom: 5 }}>Vinculado ao concurso: {item.concurso}</Text> 
                                <Text style={{paddingTop: 5, paddingBottom: 5 }}>Próximo sorteio: {dataProxConcurso}</Text> 
                            </View>
                             : null}
                            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}>
                                {JSON.parse(numeros).map(elem => (<CircleNumber key={elem} isSelect={false} number={elem + 1} />))}
                            </View>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => editFavorito(id, loteria)} icon="pencil" style={{ borderColor: "blue", margin: 5 }} mode="outlined">Editar</Button>
                            <Button onPress={() => deleteFavorito(id)} icon="delete-forever-outline" style={{ borderColor: "red", margin: 5 }} mode="outlined">Excluir</Button>
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
                <Title style={{ alignSelf: "center", marginTop: 10 }}>Meus números</Title>

                {
                    dataLoteria.length !== 0 ?
                <View style={{ flex: 1, height: Dimensions.get('screen').height, justifyContent: "center", alignContent: 'center' }}>
                    <FlatList data={dataLoteria} keyExtractor={item => item.id}
                        renderItem={CardList} extraData={selectedId}
                    />
                </View>
                    : 
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ flexWrap: "wrap" }}>Voce ainda não possui nenhum jogo cadastrado !</Text>
                    </View>
                }

                <Portal>
                    <FAB.Group
                        open={open}
                        icon={open ? 'clover' : 'plus'}
                        actions={[
                            {
                                icon: 'plus',
                                label: 'Mega Sena',
                                onPress: () => navigation.navigate('CriarFavorito', { loteria: 'Mega Sena', numeros: 60 }),
                            }, {
                                icon: 'plus',
                                label: 'Loto Fácil',
                                onPress: () => navigation.navigate('CriarFavorito', { loteria: 'Loto Fácil', numeros: 25 })
                            },
                            {
                                icon: 'plus',
                                label: 'Loto Mania',
                                onPress: () => navigation.navigate('CriarFavorito', { loteria: 'Loto Mania', numeros: 50 }),
                            },
                            {
                                icon: 'plus',
                                label: 'Quina',
                                onPress: () => navigation.navigate('CriarFavorito', { loteria: 'Quina', numeros: 80 }),
                                small: true,
                            },
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {
                                // do something if the speed dial is open
                            }
                        }}
                    />
                </Portal>

            </Provider>
        </React.Fragment>
        </>
    )
}

export default Favoritos;

