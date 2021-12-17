import * as React from "react";
import { View, FlatList } from "react-native";
import { Text, FAB, Dialog, Portal, Provider, Title, Card, Paragraph, Button, Divider } from "react-native-paper";

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {  useNavigation } from '@react-navigation/native'

import FavoritosDataBase from "../../Model/FavoritosDataBase";
import ModalAddFav from "../../Components/ModalAddFav";
import TopBar from "../../Components/TopBar";
import DeleteModal from "../../Components/deleteModal";
import { styles } from './styles'



const Stack = createNativeStackNavigator();




const Favoritos = ({ navigation, route }) => {

    const [dataLoteria, setLoteria] = React.useState([])

    // FavoritosDataBase.all().then(res => console.log("all ", res))

    // FavoritosDataBase.findByTitulo('se').then(res => console.log('like ', res))

    // FavoritosDataBase.find(2).then(res => console.log('res ', res))


    async function getDataBase (){
        try {
            await FavoritosDataBase.all().then(setLoteria)
            console.log('olaaa' , dataLoteria);
        } catch (error) {
            console.error(`Error: banco de dados ${error}`)
        }
    }

    function updateElement(){
        if(route.params !== undefined && route.params.objectLoteria){
            setLoteria(route.params.objectLoteria)
            console.log('ip ',dataLoteria);
        }
    }

    React.useEffect(() => {
      getDataBase()
    },[])   

    React.useEffect(() => {
        updateElement()
        console.log(dataLoteria);
    }, [dataLoteria])

    console.log('====================================');
    console.log(navigation, route);
    console.log(dataLoteria.length);
    console.log('====================================');

    const [selectedId, setSelectedId] = React.useState(null);

    const [stateDelete, setstateDelete] = React.useState({_id: '', titulo: ''})

    const [isVisibleDelete, setVisibleDelete] = React.useState(false);
   
    const [visibleMega, setVisibleMega] = React.useState(false);
    const [visibleFacil, setVisibleFacil] = React.useState(false);
    const [visibleMania, setVisibleMania] = React.useState(false);
    const [visibleQuina, setVisibleQuina] = React.useState(false);

    const showModalMega = () => setVisibleMega(true);
    const hideModalMega = () => setVisibleMega(false);

    const showModalFacil = () => setVisibleFacil(true);
    const hideModalFacil = () => setVisibleFacil(false);

    const showModalMania = () => setVisibleMania(true);
    const hideModalMania = () => setVisibleMania(false);

    const showModalQuina = () => setVisibleQuina(true);
    const hideModalQuina = () => setVisibleQuina(false);

    const showModalDelete = () => setVisibleDelete(true);
    const hideModalDelete = () => setVisibleDelete(false);



    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;


    const CardList = ({ item }) => {

        const {id, titulo, numeros} = item;

       function editFavorito(){
        setSelectedId(id)
        console.log('editando fav id ', id)
       }

       function deleteFavorito(){
        setstateDelete({ _id: id, titulo: titulo })
        showModalDelete(!isVisibleDelete)
        setSelectedId(id)  
        console.log('deletando fav id ', id)
       }  
  
        return (
            <>
            <View key={id}>
            <Card style={{ margin: 10 }}>
                <Card.Content>
                    <Title>{titulo}</Title>
                    <View style={{flexDirection: "row"}}> 
                    {JSON.parse(numeros).map(elem => (<Paragraph key={elem}>{elem} </Paragraph>))}
                    </View>
                </Card.Content>
                <Card.Actions>
                    <Button  onPress={editFavorito} icon="pencil" style={{ borderColor: "blue", margin: 5}} mode="outlined">Editar</Button>
                    <Button  onPress={deleteFavorito} icon="delete-forever-outline" style={{ borderColor: "red", margin: 5}} mode="outlined">Excluir</Button>
                </Card.Actions>
            </Card>
        </View>
        </>
        )
    }


    return (
        <React.Fragment>
            {/* <TopBar subtitle="Meus números favoritos"/> */}

            <Provider>
                
                <Title style={{ alignSelf: "center", marginTop: 10 }}>Favoritos</Title>

                <View>
                    <FlatList data={dataLoteria[0]} keyExtractor={item => item.id}
                    renderItem={CardList} extraData={selectedId}
                    />
                </View>

                <DeleteModal id={stateDelete._id} title={stateDelete.titulo} isVisibleDelete={isVisibleDelete} hideModalDelete={hideModalDelete}/>

                {/* 
                MODAIS INATIVOS
                <ModalAddFav title="Mega Sena" isVisible={visibleMega} hideModal={hideModalMega}/>

                <ModalAddFav title="Loto Fácil" isVisible={visibleFacil} hideModal={hideModalFacil}/>

                <ModalAddFav title="Loto Mania" isVisible={visibleMania} hideModal={hideModalMania}/>

                <ModalAddFav title="Quina" isVisible={visibleQuina} hideModal={hideModalQuina}/> */}

                    <Portal>
                        <FAB.Group
                            open={open}
                            icon={open ? 'clover' : 'plus'}
                            actions={[
                                { 
                                    icon: 'plus', 
                                    label: 'Mega Sena', 
                                    onPress: () => navigation.navigate('CriarFavorito', { loteira: 'Mega Sena', numeros: 60 }),
                                },{
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

