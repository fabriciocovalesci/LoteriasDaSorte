import * as React from "react";
import { View, FlatList, Dimensions } from "react-native";
import { Text, FAB, Dialog,Chip, Portal, Provider, Title, Card, Paragraph, Button, Divider } from "react-native-paper";

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createNavigationContainerRef, useIsFocused, useNavigationBuilder } from '@react-navigation/native'

import FavoritosDataBase from "../../Model/FavoritosDataBase";
import TopBar from "../../Components/TopBar";
import DeleteModal from "../../Components/deleteModal";
import { styles } from './styles'
const Stack = createNativeStackNavigator();

export default function Filtro() {
    
    // console.log(navigation);
    // const navigation = createNavigationContainerRef()
    // console.log('====================================');
    // console.log(navigation.navigate());
    // console.log('====================================');

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

    return (
        <>
        <React.Fragment>
        <TopBar subtitle="Gerenciar filtros personalizados" />
            <Provider>
                <Title style={{ alignSelf: "center", marginTop: 10 }}>Filtros Personalizados</Title>

                {/* <View style={{ flex: 1, height: Dimensions.get('screen').height, justifyContent: "center", alignContent: 'center' }}>
                    <FlatList data={dataLoteria} keyExtractor={item => item.id}
                        renderItem={CardList} extraData={selectedId}
                    />
                </View> */}

                <Portal>
                <FAB
                    style={styles.fab}
                    small
                    icon="plus"
                    onPress={() => alert("criando filtros")}
                />
                </Portal>

            </Provider>
        </React.Fragment>
        </>
    )
}

