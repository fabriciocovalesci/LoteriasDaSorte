import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, Divider, DataTable, IconButton, Colors } from 'react-native-paper';

import ActionSheet from "react-native-actions-sheet";
import { ScrollView } from 'react-native-gesture-handler';

import { GetBeforeConcurso } from '../services';

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

    const DetalhesConcurso = () => {

        const [stateConcurso, setstateConcurso] = React.useState(parseInt(props.concurso))
        const [findConcurso, setFindConcurso] = React.useState([])
        const [premiacoes, setstatePremiacoes] = React.useState(props.premiacoes)
        const [estatistica, setEstaristica] = React.useState({soma: '', pares: '', impares: '', dezenas: []})
        const [info, setInfo] = React.useState({acumuladaProxConcurso: '', acumulou: '', data: '', dataProxConcurso: ''})

        function clearData(){
            setEstaristica({soma: '', pares: '', impares: ''});
            setInfo({acumuladaProxConcurso: '', acumulou: '', data: '', dataProxConcurso: ''})
        }

        function resultEstatistica(arr) {
            let pares = 0;
            let impares = 0
            let dezenas = arr
            var soma = arr.reduce(function (soma, i) {
                return parseInt(soma) + parseInt(i);
            });
            arr.filter(elem => {
                if (parseInt(elem) % 2 == 0) pares++
                else if (parseInt(elem) % 2 !== 0) impares++
            })
            return {
                soma,
                pares,
                impares,
                dezenas
            }
        }
        
       async function beforeConcurso(){
            setstateConcurso(stateConcurso - 1)
            const data = await GetBeforeConcurso('mega-sena',stateConcurso-1)
            setstatePremiacoes(data.premiacoes)
            clearData()
            setEstaristica(resultEstatistica(data.dezenas))
            setInfo({acumuladaProxConcurso: data.acumuladaProxConcurso, acumulou: data.acumulou, data: data.data, dataProxConcurso: data.dataProxConcurso})
        }
        
       async function afterConcurso(){
            setstateConcurso(stateConcurso + 1);
            const data = await GetBeforeConcurso('mega-sena',stateConcurso+1)
            setstatePremiacoes(data.premiacoes)
            clearData()
            setEstaristica(resultEstatistica(data.dezenas))
            setInfo({acumuladaProxConcurso: data.acumuladaProxConcurso, acumulou: data.acumulou, data: data.data, dataProxConcurso: data.dataProxConcurso})
        }

        React.useEffect(() => {
            clearData()
            setInfo({acumuladaProxConcurso: props.acumuladaProxConcurso, acumulou: props.acumulou, data: props.data, dataProxConcurso: props.dataProxConcurso })
            setEstaristica(resultEstatistica(props.dezenas))
        }, [])

        return(
        <>
            <View ref={scrollViewRef}
                style={{
                    backgroundColor: '#FFF',
                    padding: 16,
                    width: "100%",
                    height: "100%",
                }}
            >
                <View style={{ justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
                    <IconButton
                        icon="arrow-left-circle"
                        color={Colors.green400}
                        size={24}
                        disabled={setstateConcurso === 0 ? true : false}
                        onPress={beforeConcurso}
                    />
                    <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>Concurso {stateConcurso}</Text>
                    <IconButton
                        icon="arrow-right-circle"
                        color={Colors.green400}
                        size={24}
                        disabled={stateConcurso >= props.concurso ? true : false}
                        onPress={afterConcurso}
                    />
                </View>

                <View>
                    <Text style={{ fontWeight: "800", textAlign: "center" }}>{info.acumuladaProxConcurso !== "" ? `Estimativa de prêmio: ${info.acumuladaProxConcurso}` : null}</Text>
                </View>

                <View style={{  flexDirection: "row", flexWrap: "wrap", marginTop: 10, marginBottom: 10, justifyContent: "center" }}>
                {estatistica.dezenas !== undefined && estatistica.dezenas.length !== 0 ? estatistica.dezenas.map((dezena, index) => 
                    <View key={index} style={styles.circleMega}>
                        <Text style={styles.fontText}>{dezena}</Text>
                    </View>
                ): null}
                </View>

                <DataTable style={styles.containerTable}>
                <DataTable.Header style={{ backgroundColor: Colors.green200 }}>
                    <DataTable.Title style={styles.headerText}>Soma</DataTable.Title>
                    <DataTable.Title style={styles.headerText} numeric>Pares</DataTable.Title>
                    <DataTable.Title style={styles.headerText} numeric>Ímpares</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell>{estatistica.soma}</DataTable.Cell>
                    <DataTable.Cell numeric>{estatistica.pares}</DataTable.Cell>
                    <DataTable.Cell numeric>{estatistica.impares}</DataTable.Cell>
                </DataTable.Row>
                </DataTable>
                
                <Text style={{ color: Colors.blueGrey900, fontSize: 16, fontWeight: "bold", textAlign: "center", margin: 5, backgroundColor: Colors.green200 }}>Premiações</Text>
                <FlatList data={premiacoes} keyExtractor={item => item.acertos}
                    renderItem={({ item }) => (
                        <View style={{ marginLeft: 20 }}> 
                            <Text style={{ fontWeight: "800" }} >Acertos: {item.acertos}</Text>
                            <Text >Prêmio R$ {item.premio}</Text>
                            <Text>Vencedores: {item.vencedores}</Text>
                            <Divider style={{ margin: 10 }} />
                        </View>
                    )}
                />
            </View>
        </>
    );
    }

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
                        <View style={{ paddingHorizontal: 12 }}>
                            <Title style={{ textAlign: "center", fontSize: 16, backgroundColor: Colors.green200, color: Colors.blueGrey900 }}>Premiacões da {props.nome}</Title>
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

    const DetalhesConcurso = () => {

        const [stateConcurso, setstateConcurso] = React.useState(parseInt(props.concurso))
        const [findConcurso, setFindConcurso] = React.useState([])
        const [premiacoes, setstatePremiacoes] = React.useState(props.premiacoes)
        const [estatistica, setEstaristica] = React.useState({soma: '', pares: '', impares: '', dezenas: []})
        const [info, setInfo] = React.useState({acumuladaProxConcurso: '', acumulou: '', data: '', dataProxConcurso: ''})

        function clearData(){
            setEstaristica({soma: '', pares: '', impares: ''});
            setInfo({acumuladaProxConcurso: '', acumulou: '', data: '', dataProxConcurso: ''})
        }

        function resultEstatistica(arr) {
            let pares = 0;
            let impares = 0
            let dezenas = arr
            var soma = arr.reduce(function (soma, i) {
                return parseInt(soma) + parseInt(i);
            });
            arr.filter(elem => {
                if (parseInt(elem) % 2 == 0) pares++
                else if (parseInt(elem) % 2 !== 0) impares++
            })
            return {
                soma,
                pares,
                impares,
                dezenas
            }
        }
        
       async function beforeConcurso(){
            setstateConcurso(stateConcurso - 1)
            const data = await GetBeforeConcurso('lotofacil',stateConcurso-1)
            setstatePremiacoes(data.premiacoes)
            clearData()
            setEstaristica(resultEstatistica(data.dezenas))
            setInfo({acumuladaProxConcurso: data.acumuladaProxConcurso, acumulou: data.acumulou, data: data.data, dataProxConcurso: data.dataProxConcurso})
        }
        
       async function afterConcurso(){
            setstateConcurso(stateConcurso + 1);
            const data = await GetBeforeConcurso('lotofacil',stateConcurso+1)
            setstatePremiacoes(data.premiacoes)
            clearData()
            setEstaristica(resultEstatistica(data.dezenas))
            setInfo({acumuladaProxConcurso: data.acumuladaProxConcurso, acumulou: data.acumulou, data: data.data, dataProxConcurso: data.dataProxConcurso})
        }

        React.useEffect(() => {
            clearData()
            setInfo({acumuladaProxConcurso: props.acumuladaProxConcurso, acumulou: props.acumulou, data: props.data, dataProxConcurso: props.dataProxConcurso })
            setEstaristica(resultEstatistica(props.dezenas))
        }, [])

        return(
        <>
            <View ref={scrollViewRef}
                style={{
                    backgroundColor: '#FFF',
                    padding: 16,
                    width: "100%",
                    height: "100%",
                }}
            >
                <View style={{ justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
                    <IconButton
                        icon="arrow-left-circle"
                        color={Colors.deepPurple400}
                        size={24}
                        disabled={setstateConcurso === 0 ? true : false}
                        onPress={beforeConcurso}
                    />
                    <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>Concurso {stateConcurso}</Text>
                    <IconButton
                        icon="arrow-right-circle"
                        color={Colors.deepPurple400}
                        size={24}
                        disabled={stateConcurso >= props.concurso ? true : false}
                        onPress={afterConcurso}
                    />
                </View>

                <View>
                    <Text style={{ fontWeight: "800", textAlign: "center" }}>{info.acumuladaProxConcurso !== "" ? `Estimativa de prêmio: ${info.acumuladaProxConcurso}` : null}</Text>
                </View>

                <View style={{  flexDirection: "row", flexWrap: "wrap", marginTop: 10, marginBottom: 10, justifyContent: "center" }}>
                {estatistica.dezenas !== undefined && estatistica.dezenas.length !== 0 ? estatistica.dezenas.map((dezena, index) => 
                    <View key={index} style={styles.circleFacil}>
                        <Text style={styles.fontText}>{dezena}</Text>
                    </View>
                ): null}
                </View>

                <DataTable style={styles.containerTable}>
                <DataTable.Header style={{ backgroundColor: Colors.purple200 }}>
                    <DataTable.Title style={styles.headerText}>Soma</DataTable.Title>
                    <DataTable.Title style={styles.headerText} numeric>Pares</DataTable.Title>
                    <DataTable.Title style={styles.headerText} numeric>Ímpares</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell>{estatistica.soma}</DataTable.Cell>
                    <DataTable.Cell numeric>{estatistica.pares}</DataTable.Cell>
                    <DataTable.Cell numeric>{estatistica.impares}</DataTable.Cell>
                </DataTable.Row>
                </DataTable>
                
                <Text style={{ color: Colors.white, fontSize: 16, fontWeight: "bold", textAlign: "center", margin: 5, backgroundColor: Colors.purple400 }}>Premiações</Text>
                <FlatList data={premiacoes} keyExtractor={item => item.acertos}
                    renderItem={({ item }) => (
                        <View style={{ marginLeft: 20 }}> 
                            <Text style={{ fontWeight: "800" }} >Acertos: {item.acertos}</Text>
                            <Text >Prêmio R$ {item.premio}</Text>
                            <Text>Vencedores: {item.vencedores}</Text>
                            <Divider style={{ margin: 10 }} />
                        </View>
                    )}
                />
            </View>
        </>
    );
    }

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
                        <View style={{ paddingHorizontal: 12 }}>
                            <Title style={{ textAlign: "center", fontSize: 16, backgroundColor: Colors.purple400, color: Colors.white  }}>Premiacões da {props.nome}</Title>
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

    const DetalhesConcurso = () => {

        const [stateConcurso, setstateConcurso] = React.useState(parseInt(props.concurso))
        const [findConcurso, setFindConcurso] = React.useState([])
        const [premiacoes, setstatePremiacoes] = React.useState(props.premiacoes)
        const [estatistica, setEstaristica] = React.useState({soma: '', pares: '', impares: '', dezenas: []})
        const [info, setInfo] = React.useState({acumuladaProxConcurso: '', acumulou: '', data: '', dataProxConcurso: ''})

        function clearData(){
            setEstaristica({soma: '', pares: '', impares: ''});
            setInfo({acumuladaProxConcurso: '', acumulou: '', data: '', dataProxConcurso: ''})
        }

        function resultEstatistica(arr) {
            let pares = 0;
            let impares = 0
            let dezenas = arr
            var soma = arr.reduce(function (soma, i) {
                return parseInt(soma) + parseInt(i);
            });
            arr.filter(elem => {
                if (parseInt(elem) % 2 == 0) pares++
                else if (parseInt(elem) % 2 !== 0) impares++
            })
            return {
                soma,
                pares,
                impares,
                dezenas
            }
        }
        
       async function beforeConcurso(){
            setstateConcurso(stateConcurso - 1)
            const data = await GetBeforeConcurso('lotomania',stateConcurso-1)
            setstatePremiacoes(data.premiacoes)
            clearData()
            setEstaristica(resultEstatistica(data.dezenas))
            setInfo({acumuladaProxConcurso: data.acumuladaProxConcurso, acumulou: data.acumulou, data: data.data, dataProxConcurso: data.dataProxConcurso})
        }
        
       async function afterConcurso(){
            setstateConcurso(stateConcurso + 1);
            const data = await GetBeforeConcurso('lotomania',stateConcurso+1)
            setstatePremiacoes(data.premiacoes)
            clearData()
            setEstaristica(resultEstatistica(data.dezenas))
            setInfo({acumuladaProxConcurso: data.acumuladaProxConcurso, acumulou: data.acumulou, data: data.data, dataProxConcurso: data.dataProxConcurso})
        }

        React.useEffect(() => {
            clearData()
            setInfo({acumuladaProxConcurso: props.acumuladaProxConcurso, acumulou: props.acumulou, data: props.data, dataProxConcurso: props.dataProxConcurso })
            setEstaristica(resultEstatistica(props.dezenas))
        }, [])

        return(
        <>
            <View ref={scrollViewRef}
                style={{
                    backgroundColor: '#FFF',
                    padding: 16,
                    width: "100%",
                    height: "100%",
                }}
            >
                <View style={{ justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
                    <IconButton
                        icon="arrow-left-circle"
                        color={Colors.orange400}
                        size={24}
                        disabled={setstateConcurso === 0 ? true : false}
                        onPress={beforeConcurso}
                    />
                    <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>Concurso {stateConcurso}</Text>
                    <IconButton
                        icon="arrow-right-circle"
                        color={Colors.orange400}
                        size={24}
                        disabled={stateConcurso >= props.concurso ? true : false}
                        onPress={afterConcurso}
                    />
                </View>

                <View>
                    <Text style={{ fontWeight: "800", textAlign: "center" }}>{info.acumuladaProxConcurso !== "" ? `Estimativa de prêmio: ${info.acumuladaProxConcurso}` : null}</Text>
                </View>

                <View style={{  flexDirection: "row", flexWrap: "wrap", marginTop: 10, marginBottom: 10, justifyContent: "center" }}>
                {estatistica.dezenas !== undefined && estatistica.dezenas.length !== 0 ? estatistica.dezenas.map((dezena, index) => 
                    <View key={index} style={styles.circleMania}>
                        <Text style={styles.fontText}>{dezena}</Text>
                    </View>
                ): null}
                </View>

                <DataTable style={styles.containerTable}>
                <DataTable.Header style={{ backgroundColor: Colors.orange200 }}>
                    <DataTable.Title style={styles.headerText}>Soma</DataTable.Title>
                    <DataTable.Title style={styles.headerText} numeric>Pares</DataTable.Title>
                    <DataTable.Title style={styles.headerText} numeric>Ímpares</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell>{estatistica.soma}</DataTable.Cell>
                    <DataTable.Cell numeric>{estatistica.pares}</DataTable.Cell>
                    <DataTable.Cell numeric>{estatistica.impares}</DataTable.Cell>
                </DataTable.Row>
                </DataTable>
                
                <Text style={{ color: Colors.blueGrey700, fontSize: 16, fontWeight: "bold", textAlign: "center", margin: 5, backgroundColor: Colors.orange200 }}>Premiações</Text>
                <FlatList data={premiacoes} keyExtractor={item => item.acertos}
                    renderItem={({ item }) => (
                        <View style={{ marginLeft: 20 }}> 
                            <Text style={{ fontWeight: "800" }} >Acertos: {item.acertos}</Text>
                            <Text >Prêmio R$ {item.premio}</Text>
                            <Text>Vencedores: {item.vencedores}</Text>
                            <Divider style={{ margin: 10 }} />
                        </View>
                    )}
                />
            </View>
        </>
    );
    }

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
                        <View style={{ paddingHorizontal: 12 }}>
                            <Title style={{ textAlign: "center", fontSize: 16, backgroundColor: Colors.orange400, color: Colors.white }}>Premiacões da {props.nome}</Title>
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

    const DetalhesConcurso = () => {

        const [stateConcurso, setstateConcurso] = React.useState(parseInt(props.concurso))
        const [findConcurso, setFindConcurso] = React.useState([])
        const [premiacoes, setstatePremiacoes] = React.useState(props.premiacoes)
        const [estatistica, setEstaristica] = React.useState({soma: '', pares: '', impares: '', dezenas: []})
        const [info, setInfo] = React.useState({acumuladaProxConcurso: '', acumulou: '', data: '', dataProxConcurso: ''})

        function clearData(){
            setEstaristica({soma: '', pares: '', impares: ''});
            setInfo({acumuladaProxConcurso: '', acumulou: '', data: '', dataProxConcurso: ''})
        }

        function resultEstatistica(arr) {
            let pares = 0;
            let impares = 0
            let dezenas = arr
            var soma = arr.reduce(function (soma, i) {
                return parseInt(soma) + parseInt(i);
            });
            arr.filter(elem => {
                if (parseInt(elem) % 2 == 0) pares++
                else if (parseInt(elem) % 2 !== 0) impares++
            })
            return {
                soma,
                pares,
                impares,
                dezenas
            }
        }
        
       async function beforeConcurso(){
            setstateConcurso(stateConcurso - 1)
            const data = await GetBeforeConcurso('quina',stateConcurso-1)
            setstatePremiacoes(data.premiacoes)
            clearData()
            setEstaristica(resultEstatistica(data.dezenas))
            setInfo({acumuladaProxConcurso: data.acumuladaProxConcurso, acumulou: data.acumulou, data: data.data, dataProxConcurso: data.dataProxConcurso})
        }
        
       async function afterConcurso(){
            setstateConcurso(stateConcurso + 1);
            const data = await GetBeforeConcurso('quina',stateConcurso+1)
            setstatePremiacoes(data.premiacoes)
            clearData()
            setEstaristica(resultEstatistica(data.dezenas))
            setInfo({acumuladaProxConcurso: data.acumuladaProxConcurso, acumulou: data.acumulou, data: data.data, dataProxConcurso: data.dataProxConcurso})
        }

        React.useEffect(() => {
            clearData()
            setInfo({acumuladaProxConcurso: props.acumuladaProxConcurso, acumulou: props.acumulou, data: props.data, dataProxConcurso: props.dataProxConcurso })
            setEstaristica(resultEstatistica(props.dezenas))
        }, [])

        return(
        <>
            <View ref={scrollViewRef}
                style={{
                    backgroundColor: '#FFF',
                    padding: 16,
                    width: "100%",
                    height: "100%",
                }}
            >
                <View style={{ justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
                    <IconButton
                        icon="arrow-left-circle"
                        color={Colors.blue400}
                        size={24}
                        disabled={setstateConcurso === 0 ? true : false}
                        onPress={beforeConcurso}
                    />
                    <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>Concurso {stateConcurso}</Text>
                    <IconButton
                        icon="arrow-right-circle"
                        color={Colors.blue400}
                        size={24}
                        disabled={stateConcurso >= props.concurso ? true : false}
                        onPress={afterConcurso}
                    />
                </View>

                <View>
                    <Text style={{ fontWeight: "800", textAlign: "center" }}>{info.acumuladaProxConcurso !== "" ? `Estimativa de prêmio: ${info.acumuladaProxConcurso}` : null}</Text>
                </View>

                <View style={{  flexDirection: "row", flexWrap: "wrap", marginTop: 10, marginBottom: 10, justifyContent: "center" }}>
                {estatistica.dezenas !== undefined && estatistica.dezenas.length !== 0 ? estatistica.dezenas.map((dezena, index) => 
                    <View key={index} style={styles.circleQuina}>
                        <Text style={styles.fontText}>{dezena}</Text>
                    </View>
                ): null}
                </View>

                <DataTable style={styles.containerTable}>
                <DataTable.Header style={{ backgroundColor: Colors.blue400 }}>
                    <DataTable.Title style={styles.headerText}>Soma</DataTable.Title>
                    <DataTable.Title style={styles.headerText} numeric>Pares</DataTable.Title>
                    <DataTable.Title style={styles.headerText} numeric>Ímpares</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell>{estatistica.soma}</DataTable.Cell>
                    <DataTable.Cell numeric>{estatistica.pares}</DataTable.Cell>
                    <DataTable.Cell numeric>{estatistica.impares}</DataTable.Cell>
                </DataTable.Row>
                </DataTable>
                
                <Text style={{ color: Colors.white, fontSize: 16, fontWeight: "bold", textAlign: "center", margin: 5, backgroundColor: "#260085" }}>Premiações</Text>
                <FlatList data={premiacoes} keyExtractor={item => item.acertos}
                    renderItem={({ item }) => (
                        <View style={{ marginLeft: 20 }}> 
                            <Text style={{ fontWeight: "800" }} >Acertos: {item.acertos}</Text>
                            <Text >Prêmio R$ {item.premio}</Text>
                            <Text>Vencedores: {item.vencedores}</Text>
                            <Divider style={{ margin: 10 }} />
                        </View>
                    )}
                />
            </View>
        </>
    );
    }

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
                        <View style={{ paddingHorizontal: 12 }}>
                            <Title style={{ textAlign: "center", fontSize: 16, backgroundColor: '#260085', color: Colors.white }}>Premiacões da {props.nome}</Title>
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
    headerText: {
          color: Colors.white
    },
    containerTable: {
        marginBottom: 10, 
        borderBottomColor: Colors.green400, 
        borderStyle: "solid", 
        borderWidth: 0.5 
    },
    circleQuina: {
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
        backgroundColor: '#058ce1' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 5
    },
    circleFacil: {
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
        backgroundColor: '#930989' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 5
    },
    circleMania: {
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
        backgroundColor: '#F78100' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 5
    },
    circleMega: {
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
        backgroundColor: '#209869' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 5
    },
    fontText: {
        color: "#fff", 
        alignSelf: "center",
        fontWeight: "bold" ,
        textAlign: "center",
    },
})
