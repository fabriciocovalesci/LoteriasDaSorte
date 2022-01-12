import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, Divider, DataTable } from 'react-native-paper';

import ActionSheet from "react-native-actions-sheet";
import { ScrollView } from 'react-native-gesture-handler';

import ModalGanhadores from './ModalGanhadores';

const CircleNumber = (props) => {

    return (
        <View style={styles.circle}>
            <Text style={{ color: "#000", alignSelf: "center", fontWeight: "bold" }}>{props.number}</Text>
        </View>
    )
}

export function CardFeedLoteriaMega(props) {

    const scrollViewRef = React.createRef()

    const DetalhesConcurso = () => (
        <>
            <View ref={scrollViewRef}
                style={{
                    backgroundColor: '#74c053',
                    padding: 16,
                    width: "100%",
                    height: "100%",
                }}
            >
                <FlatList data={props.premiacoes} keyExtractor={item => item.acertos}
                    renderItem={({ item }) => (
                        <View>
                            <Text>Acertos: {item.acertos}</Text>
                            <Text>Prêmio R$ {item.premio}</Text>
                            <Text>Vencedores: {item.vencedores}</Text>
                            <Divider style={{ margin: 10 }} />
                        </View>
                    )}
                />
            </View>
        </>
    );

      const actionSheetRef = React.createRef();

    return (
        <React.Fragment>
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
                    headerAlwaysVisible={true}
                    statusBarTranslucent
                    extraScroll={1}
                    bounceOnOpen={true}
                    drawUnderStatusBar={true}
                    bounciness={5}
                    gestureEnabled={true}
                    defaultOverlayOpacity={0.3}>
                    <ScrollView
                        ref={scrollViewRef}
                        nestedScrollEnabled={true}
                        scrollEnabled={true}
                        onScrollEndDrag={() =>
                            actionSheetRef.current?.handleChildScrollEnd()
                        }
                        onScrollAnimationEnd={() =>
                            actionSheetRef.current?.handleChildScrollEnd()
                        }
                        onMomentumScrollEnd={() =>
                            actionSheetRef.current?.handleChildScrollEnd()
                        }>
                        <View style={{ paddingHorizontal: 12, backgroundColor: "#2b6212" }}>
                            <Title style={{ textAlign: "center", fontSize: 16, color: "#fff" }}>Premiacões da {props.nome}</Title>
                            <DetalhesConcurso />
                        </View>
                    </ScrollView>
                </ActionSheet>
            </View>

        </React.Fragment>
    )
}

export function CardFeedLoteriaLotoFacil(props) {

    const scrollViewRef = React.createRef()

    const DetalhesConcurso = () => (
        <>
            <View ref={scrollViewRef}
                style={{
                    backgroundColor: '#be6bb8',
                    padding: 16,
                    width: "100%",
                    height: "100%",
                }}
            >
                <FlatList data={props.premiacoes} keyExtractor={item => item.acertos}
                    renderItem={({ item }) => (
                        <View>
                            <Text>Acertos: {item.acertos}</Text>
                            <Text>Prêmio R$ {item.premio}</Text>
                            <Text>Vencedores: {item.vencedores}</Text>
                            <Divider style={{ margin: 10 }} />
                        </View>
                    )}
                />
            </View>
        </>
    );

      const actionSheetRef = React.createRef();

    return (
        <React.Fragment>
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
                    <Button icon="table-eye" color='#fff' name="thumb-up-outline" text="Like" onPress={() => actionSheetRef.current?.setModalVisible()}>
                        <Text style={{ color: "#fff", alignSelf: "center", fontSize: 16 }}>Premiação {props.nome}</Text>
                    </Button>
                </View>
                <ActionSheet ref={actionSheetRef}
                    initialOffsetFromBottom={0.4}
                    headerAlwaysVisible={true}
                    statusBarTranslucent
                    extraScroll={1}
                    bounceOnOpen={true}
                    drawUnderStatusBar={true}
                    bounciness={5}
                    gestureEnabled={true}
                    defaultOverlayOpacity={0.3}>
                    <ScrollView
                        ref={scrollViewRef}
                        nestedScrollEnabled={true}
                        scrollEnabled={true}
                        onScrollEndDrag={() =>
                            actionSheetRef.current?.handleChildScrollEnd()
                        }
                        onScrollAnimationEnd={() =>
                            actionSheetRef.current?.handleChildScrollEnd()
                        }
                        onMomentumScrollEnd={() =>
                            actionSheetRef.current?.handleChildScrollEnd()
                        }>
                        <View style={{ paddingHorizontal: 12, backgroundColor: "#930989" }}>
                            <Title style={{ textAlign: "center", fontSize: 16, color: "#fff" }}>Premiacões da {props.nome}</Title>
                            <DetalhesConcurso />
                        </View>
                    </ScrollView>
                </ActionSheet>
            </View>
        </React.Fragment>
    )
}


export function CardFeedLoteriaLotoMania(props) {

    const scrollViewRef = React.createRef()

    const DetalhesConcurso = () => (
        <>
            <View ref={scrollViewRef}
                style={{
                    backgroundColor: "#ffb05a",
                    padding: 16,
                    width: "100%",
                    height: "100%"
                }}
            >
                <FlatList data={props.premiacoes} keyExtractor={item => item.acertos}
                    renderItem={({ item }) => (
                        <View>
                            <Text>Acertos: {item.acertos}</Text>
                            <Text>Prêmio R$ {item.premio}</Text>
                            <Text>Vencedores: {item.vencedores}</Text>
                            <Divider style={{ margin: 10 }} />
                        </View>
                    )}
                />
            </View>
        </>
    );

    const actionSheetRef = React.createRef();

    return (
        <React.Fragment>
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
                    <Button icon="table-eye" color='#fff' name="thumb-up-outline" text="Like" onPress={() => actionSheetRef.current?.setModalVisible()}>
                        <Text style={{ color: "#fff", alignSelf: "center", fontSize: 16 }}>Premiação {props.nome}</Text>
                    </Button>
                </View>
                <ActionSheet ref={actionSheetRef}
                    initialOffsetFromBottom={0.4}
                    headerAlwaysVisible={true}
                    statusBarTranslucent
                    extraScroll={1}
                    bounceOnOpen={true}
                    drawUnderStatusBar={true}
                    bounciness={4}
                    gestureEnabled={true}
                    defaultOverlayOpacity={0.3}
                    >
                    <ScrollView
                        ref={scrollViewRef}
                        nestedScrollEnabled={true}
                        scrollEnabled={true}
                        onScrollEndDrag={() =>
                            actionSheetRef.current?.handleChildScrollEnd()
                        }
                        onScrollAnimationEnd={() =>
                            actionSheetRef.current?.handleChildScrollEnd()
                        }
                        onMomentumScrollEnd={() =>
                            actionSheetRef.current?.handleChildScrollEnd()
                        }>
                        <View style={{ paddingHorizontal: 12, backgroundColor: "#F78100" }}>
                            <Title style={{ textAlign: "center", fontSize: 16, color: "#fff" }}>Premiacões da {props.nome}</Title>
                            <DetalhesConcurso />

                        </View> 
                    </ScrollView>
                </ActionSheet>
            </View>
        </React.Fragment>
    )
}

export function CardFeedLoteriaQuina(props) {

    const scrollViewRef = React.createRef()

    const DetalhesConcurso = () => (
        <>
            <View ref={scrollViewRef}
                style={{
                    backgroundColor: '#9F79FE',
                    padding: 16,
                    width: "100%",
                    height: "100%",
                }}
            >
                <FlatList data={props.premiacoes} keyExtractor={item => item.acertos}
                    renderItem={({ item }) => (
                        <View>
                            <Text>Acertos: {item.acertos}</Text>
                            <Text>Prêmio R$ {item.premio}</Text>
                            <Text>Vencedores: {item.vencedores}</Text>
                            <Divider style={{ margin: 10 }} />
                        </View>
                    )}
                />
            </View>
        </>
    );

      const actionSheetRef = React.createRef();

    return (
        <React.Fragment>
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
                    <Button icon="table-eye" color='#fff' name="thumb-up-outline" text="Like" onPress={() => actionSheetRef.current?.setModalVisible()}>
                        <Text style={{ color: "#fff", alignSelf: "center", fontSize: 16 }}>Premiação {props.nome}</Text>
                    </Button>
                </View>
                <ActionSheet ref={actionSheetRef}
                    initialOffsetFromBottom={0.4}
                    headerAlwaysVisible={true}
                    statusBarTranslucent={false}
                    extraScroll={1}
                    bounceOnOpen={true}
                    drawUnderStatusBar={true}
                    bounciness={5}
                    gestureEnabled={true}
                    defaultOverlayOpacity={0.3}>
                    <ScrollView
                        ref={scrollViewRef}
                        nestedScrollEnabled={true}
                        scrollEnabled={true}
                        onScrollEndDrag={() =>
                            actionSheetRef.current?.handleChildScrollEnd()
                        }
                        onScrollAnimationEnd={() =>
                            actionSheetRef.current?.handleChildScrollEnd()
                        }
                        onMomentumScrollEnd={() =>
                            actionSheetRef.current?.handleChildScrollEnd()
                        }>
                        <View style={{ paddingHorizontal: 12, backgroundColor: "#260085" }}>
                            <Title style={{ textAlign: "center", fontSize: 16, color: "#fff" }}>Premiacões da {props.nome}</Title>
                            <DetalhesConcurso />

                        </View>
                    </ScrollView>
                </ActionSheet>
            </View>
        </React.Fragment>
    )
}
// #058ce1 quina bolas

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
