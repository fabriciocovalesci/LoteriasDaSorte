import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';

import ModalGanhadores from './ModalGanhadores';

const CircleNumber = (props) => {

    return (
        <View style={styles.circle}>
            <Text style={{ color: "#000", alignSelf: "center", fontWeight: "bold" }}>{props.number}</Text>
        </View>
    )
}

export function CardFeedLoteriaMega(props) {

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <React.Fragment>
            <View>
                <ModalGanhadores isVisible={visible} onDismiss={hideModal} name={props.nome} premiacoes={props.premiacoes} />
            </View>
            <View style={{ flex: 1, height: 300 }}>
                <View style={{ backgroundColor: '#2b6212', height: 30, justifyContent: "center" }}>
                    <Text style={{ alignSelf: "center", color: "#fff" }}>Concurso: {props.concurso}  Data: {props.data}</Text>
                </View>
                <View style={{ backgroundColor: "#74c053", flexDirection: "column", flex: 1, justifyContent: 'center', alignItems: "center", alignContent: "center", flexWrap: "wrap", padding: 10 }}>

                    {props.acumulou ?
                        <View>
                            <Text style={{ flexWrap: "wrap", color: "#fff", alignSelf: "center" }}>
                                Acumulou !!
                            </Text>
                            <Text style={{ flexWrap: "wrap", color: "#fff" }}>
                                Estimativa de prêmio {props.acumuladaProxConcurso}
                            </Text>
                        </View> : <Text></Text>}


                    <View style={{ flexDirection: "row", flex: 1, justifyContent: 'center', alignItems: "center", alignContent: "center", flexWrap: "wrap" }}>
                        {props.dezenas.map((elem, index) =>
                            <CircleNumber key={index} number={elem} />
                        )}
                    </View>

                </View>
                <View style={{ backgroundColor: "#2b6212" }}>
                    <Button  icon="table-eye" color='#fff' name="thumb-up-outline" text="Like" onPress={showModal}>
                        <Text style={{ color: "#fff", alignSelf: "center", fontSize: 16 }}>Premiação {props.nome}</Text>
                    </Button>
                </View>
            </View>
        </React.Fragment>
    )
}

export function CardFeedLoteriaLotoFacil(props) {

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <React.Fragment>
            <View>
                <ModalGanhadores isVisible={visible} onDismiss={hideModal} name={props.nome} premiacoes={props.premiacoes} />
            </View>
            <View style={{ flex: 1, height: 300 }}>
                <View style={{ backgroundColor: '#930989', height: 30, justifyContent: "center" }}>
                    <Text style={{ alignSelf: "center", color: "#fff" }}>Concurso: {props.concurso}  Data: {props.data}</Text>
                </View>
                <View style={{ backgroundColor: "#be6bb8", flexDirection: "column", flex: 1, justifyContent: 'center', alignItems: "center", alignContent: "center", flexWrap: "wrap", padding: 10 }}>

                    {props.acumulou ?
                        <View>
                            <Text style={{ flexWrap: "wrap", color: "#fff" }}>
                                Acumulou !! Estimativa de prêmio {props.acumuladaProxConcurso}
                            </Text>
                        </View> : <Text></Text>}

                    <View style={{ flexDirection: "row", flex: 1, justifyContent: 'center', alignItems: "center", alignContent: "center", flexWrap: "wrap" }}>
                        {props.dezenas.map((elem, index) =>
                            <CircleNumber key={index} number={elem} />
                        )}
                    </View>

                </View>
                <View style={{ backgroundColor: "#930989" }}>
                    <Button icon="table-eye" color='#fff' name="thumb-up-outline" text="Like" onPress={showModal}>
                        <Text style={{ color: "#fff", alignSelf: "center", fontSize: 16 }}>Premiação {props.nome}</Text>
                    </Button>
                </View>
            </View>
        </React.Fragment>
    )
}


export function CardFeedLoteriaLotoMania(props) {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    return (
        <React.Fragment>
            <View>
                <ModalGanhadores isVisible={visible} onDismiss={hideModal} name={props.nome} premiacoes={props.premiacoes} />
            </View>
            <View style={{ flex: 1, height: 300 }}>
                <View style={{ backgroundColor: '#F78100', height: 30, justifyContent: "center" }}>
                    <Text style={{ alignSelf: "center", color: "#fff" }}>Concurso: {props.concurso}  Data: {props.data}</Text>
                </View>
                <View style={{ backgroundColor: "#ffb05a", flexDirection: "column", flex: 1, justifyContent: 'center', alignItems: "center", alignContent: "center", flexWrap: "wrap", padding: 10 }}>
                    {props.acumulou ?
                        <View>
                            <Text style={{ flexWrap: "wrap", color: "#fff" }}>
                                Acumulou !! Estimativa de prêmio {props.acumuladaProxConcurso}
                            </Text>
                        </View> : <Text></Text>}

                    <View style={{ flexDirection: "row", flex: 1, justifyContent: 'center', alignItems: "center", alignContent: "center", flexWrap: "wrap" }}>
                        {props.dezenas.map((elem, index) =>
                            <CircleNumber key={index} number={elem} />
                        )}
                    </View>

                </View>
                <View style={{ backgroundColor: "#F78100" }}>
                    <Button icon="table-eye" color='#fff' name="thumb-up-outline" text="Like" onPress={showModal}>
                        <Text style={{ color: "#fff", alignSelf: "center", fontSize: 16 }}>Premiação {props.nome}</Text>
                    </Button>
                </View>
            </View>
        </React.Fragment>
    )
}

export function CardFeedLoteriaQuina(props) {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    return (
        <React.Fragment>
            <View>
                <ModalGanhadores isVisible={visible} onDismiss={hideModal} name={props.nome} premiacoes={props.premiacoes} />
            </View>
            <View style={{ flex: 1, height: 300 }}>
                <View style={{ backgroundColor: '#260085', height: 30, justifyContent: "center" }}>
                    <Text style={{ alignSelf: "center", color: "#fff" }}>Concurso: {props.concurso}  Data: {props.data}</Text>
                </View>
                <View style={{ backgroundColor: "#26008596", flexDirection: "column", flex: 1, justifyContent: 'center', alignItems: "center", alignContent: "center", flexWrap: "wrap", padding: 10 }}>

                    {props.acumulou ?
                        <View>
                            <Text style={{ flexWrap: "wrap", color: "#fff", alignSelf: "center" }}>
                                Acumulou !!
                            </Text>
                            <Text style={{ flexWrap: "wrap", color: "#fff" }}>
                                Estimativa de prêmio {props.acumuladaProxConcurso}
                            </Text>
                        </View> : <Text></Text>}

                    <View style={{ flexDirection: "row", flex: 1, justifyContent: 'center', alignItems: "center", alignContent: "center", flexWrap: "wrap" }}>
                        {props.dezenas.map((elem, index) =>
                            <CircleNumber key={index} number={elem} />
                        )}
                    </View>

                </View>
                <View style={{ backgroundColor: "#260085" }}>
                    <Button icon="table-eye" color='#fff' name="thumb-up-outline" text="Like" onPress={showModal}>
                        <Text style={{ color: "#fff", alignSelf: "center", fontSize: 16 }}>Premiação {props.nome}</Text>
                    </Button>
                </View>
            </View>
        </React.Fragment>
    )
}


const styles = StyleSheet.create({
    circle: {
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 5
    }
})
