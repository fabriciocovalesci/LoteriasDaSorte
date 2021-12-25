import * as React from "react";
import { View, FlatList } from "react-native";
import { Text, FAB, Dialog, Portal, Provider, Title, Card, Paragraph, Button, Divider } from "react-native-paper";

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation, useIsFocused } from '@react-navigation/native'

import FavoritosDataBase from "../../Model/FavoritosDataBase";
import ModalAddFav from "../../Components/ModalAddFav";
import TopBar from "../../Components/TopBar";
import DeleteModal from "../../Components/deleteModal";
import { styles } from './styles'

const Stack = createNativeStackNavigator();


const Favoritos = ({ navigation, route }) => {

    const [dataLoteria, setLoteria] = React.useState([])

    const [selectedId, setSelectedId] = React.useState(null);

    const [stateDelete, setstateDelete] = React.useState({ _id: '', titulo: '' })

    const [isVisibleDelete, setVisibleDelete] = React.useState(false);

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

    const isFocused = useIsFocused()

    React.useEffect(() => {
        getDataBase()
    }, [isFocused])

    const CardList = ({ item }) => {

        const { id, titulo, numeros } = item;

        function deleteFavorito() {
            setstateDelete({ _id: id, titulo: titulo })
            showModalDelete(!isVisibleDelete)
            // setSelectedId(id)  
            console.log('deletando fav id ', id)
        }

        function editFavorito() {
            setSelectedId(id)
            console.log('editando fav id ', id)
        }

        return (
            <>
                <View key={id}>
                    <Card style={{ margin: 10 }}>
                        <Card.Content>
                            <Title>{titulo}</Title>
                            <View style={{ flexDirection: "row" }}>
                                {JSON.parse(numeros).map(elem => (<Paragraph key={elem}>{elem} </Paragraph>))}
                            </View>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={editFavorito} icon="pencil" style={{ borderColor: "blue", margin: 5 }} mode="outlined">Editar</Button>
                            <Button onPress={deleteFavorito} icon="delete-forever-outline" style={{ borderColor: "red", margin: 5 }} mode="outlined">Excluir</Button>
                        </Card.Actions>
                    </Card>
                </View>
            </>
        )
    }


    return (
        <React.Fragment>

            <Provider>

                <Title style={{ alignSelf: "center", marginTop: 10 }}>Meus números</Title>

                <View>
                    <FlatList data={dataLoteria} keyExtractor={item => item.id}
                        renderItem={CardList} extraData={selectedId}
                    />
                </View>

                <DeleteModal id={stateDelete._id} title={stateDelete.titulo} isVisibleDelete={isVisibleDelete} hideModalDelete={hideModalDelete} />

                <Portal>
                    <FAB.Group
                        open={open}
                        icon={open ? 'clover' : 'plus'}
                        actions={[
                            {
                                icon: 'plus',
                                label: 'Mega Sena',
                                onPress: () => navigation.navigate('CriarFavorito', { loteira: 'Mega Sena', numeros: 60 }),
                            }, {
                                icon: 'plus',
                                label: 'Loto Fácil',
                                onPress: () => navigation.navigate('CriarFavorito', { loteira: 'Loto Fácil', numeros: 25 })
                            },
                            {
                                icon: 'plus',
                                label: 'Loto Mania',
                                onPress: () => navigation.navigate('CriarFavorito', { loteira: 'Loto Mania', numeros: 50 }),
                            },
                            {
                                icon: 'plus',
                                label: 'Quina',
                                onPress: () => navigation.navigate('CriarFavorito', { loteira: 'Quina', numeros: 80 }),
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
    )
}

export default Favoritos;

