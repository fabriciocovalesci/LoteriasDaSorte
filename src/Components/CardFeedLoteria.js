import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';

import ActionSheet from "react-native-actions-sheet";


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

    console.log('====================================');
    console.log(props);
    console.log('====================================');
    /*
    
    Object {
  "acumuladaProxConcurso": "R$ 3 Milhões",
  "acumulou": false,
  "concurso": 2440,
  "data": "31/12/2021",
  "dezenas": Array [
    "12",
    "15",
    "23",
    "32",
    "33",
    "46",
  ],
  "nome": "Mega-Sena",
  "premiacoes": Array [
    Object {
      "acertos": "Sena",
      "premio": "189.062.363,74",
      "vencedores": 2,
    },
    Object {
      "acertos": "Quina",
      "premio": "50.861,33",
      "vencedores": 1712,
    },
    Object {
      "acertos": "Quadra",
      "premio": "866,88",
      "vencedores": 143494,
    },
  ],
}

    
    */

    const DetalhesConcurso = () => (
        <>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 16,
            height: 450,
            alignSelf: "center"
          }}
        >
          <Text style={{ }}>Premiacões da {props.nome}</Text>
          {props.premiacoes.map(item => 
            <View key={item.acertos}>
                <View>
                <Text>Acertos {item.acertos}</Text>
                <Text>Prêmio R$ {item.premio}</Text>
                <Text>Vencedores {item.vencedores}</Text>
                </View>
            </View>
            )}
        </View>
        </>
      );

      const sheetRef = React.useRef(null);

      const actionSheetRef = React.createRef();

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
                    <Button  icon="table-eye" color='#fff' name="thumb-up-outline" text="Like" onPress={() => actionSheetRef.current?.setModalVisible()}>
                        <Text style={{ color: "#fff", alignSelf: "center", fontSize: 16 }}>Premiação {props.nome}</Text>
                    </Button>
                </View>

            <ActionSheet ref={actionSheetRef}
            initialOffsetFromBottom={0.4}
            statusBarTranslucent
            bounceOnOpen={true}
            drawUnderStatusBar={true}
            bounciness={5}
            gestureEnabled={true}
            defaultOverlayOpacity={0.3}>
            <View style={{ paddingHorizontal: 12 }}>
            <View style={styles.container}>
                < DetalhesConcurso />
            </View>
            </View>
            </ActionSheet>
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
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
      },
})
