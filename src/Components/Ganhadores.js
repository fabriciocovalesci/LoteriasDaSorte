
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

import {
    Card,
    Text,
    Button,
    Paragraph,
    DataTable,
    Modal,
    Portal,
    Provider,
    Divider,
} from "react-native-paper";

const GanhadoresMegaSena = (props) => {
    return (
        <React.Fragment>
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title numeric>Calories</DataTable.Title>
        <DataTable.Title numeric>Fat</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>Frozen yogurt</DataTable.Cell>
        <DataTable.Cell numeric>159</DataTable.Cell>
        <DataTable.Cell numeric>6.0</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
        <DataTable.Cell numeric>237</DataTable.Cell>
        <DataTable.Cell numeric>8.0</DataTable.Cell>
      </DataTable.Row>
      </DataTable>
            {/* <View style={{ padding: 10, flexWrap: "wrap" }}>
                <View >
                    {props.acumulou ? <Text>Não houve ganhadores</Text> :
                        <View>
                            <Text>{props.premiacoes[0].acertos} {props.premiacoes[0].vencedores} apostas ganhadoras </Text>
                            <Text>R$ {props.premiacoes[0].premio}</Text>
                        </View>
                    }
                </View>
                <Divider style={{ marginBottom: 10 }}/>
                <View>
                    <View>
                        <Text>{props.premiacoes[1].acertos} {props.premiacoes[1].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[1].premio}</Text>
                    </View>
                </View>
                <Divider style={{ marginBottom: 10 }}/>
                <View>
                    <View>
                        <Text>{props.premiacoes[2].acertos} {props.premiacoes[2].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[2].premio}</Text>
                    </View>
                </View>
            </View> */}
        </React.Fragment>
    )
}


const GanhadoresQuina = (props) => {
    return (
        <React.Fragment>
            <View >
                <View >
                    {props.acumulou ? 
                    <View>
                        <Text>Não houve ganhadores</Text> 
                    </View>
                    :
                        <View>
                            <Text>{props.premiacoes[0].acertos} {props.premiacoes[0].vencedores} apostas ganhadoras </Text>
                            <Text>R$ {props.premiacoes[0].premio}</Text>
                        </View>
                    }
                </View>
                <Divider style={{ marginBottom: 10 }}/>
                <View>
                    <View>
                        <Text>{props.premiacoes[1].acertos} {props.premiacoes[1].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[1].premio}</Text>
                    </View>
                </View>
                <Divider style={{ marginBottom: 10 }}/>
                <View>
                    <View>
                        <Text>{props.premiacoes[2].acertos} {props.premiacoes[2].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[2].premio}</Text>
                    </View>                
                </View>
                <Divider style={{ marginBottom: 10 }}/>
                <View>
                    <View>
                        <Text>{props.premiacoes[3].acertos} {props.premiacoes[3].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[3].premio}</Text>
                    </View>
                </View>
            </View>
        </React.Fragment>
    )
}


const GanhadoresLotoMania = (props) => {
    return (
        <React.Fragment>
            <View style={{ padding: 10 }}>
                <View >
                    {props.acumulou ?  <Text>Não houve ganhadores</Text> :
                        <View>
                            <Text>{props.premiacoes[0].acertos} {props.premiacoes[0].vencedores} apostas ganhadoras </Text>
                            <Text>R$ {props.premiacoes[0].premio}</Text>
                        </View>
                    }
                </View>
                <Divider style={{ marginBottom: 10 }}/>
                <View>
                    <View>
                        <Text>{props.premiacoes[1].acertos} {props.premiacoes[1].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[1].premio}</Text>
                    </View>
                </View>
                <Divider style={{ marginBottom: 10 }}/>
                <View>
                    <View>
                        <Text>{props.premiacoes[2].acertos} {props.premiacoes[2].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[2].premio}</Text>
                    </View>                
                </View>
                <Divider style={{ marginBottom: 10 }}/>
                <View>
                    <View>
                        <Text>{props.premiacoes[3].acertos} {props.premiacoes[3].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[3].premio}</Text>
                    </View>
                </View>
                <Divider style={{ marginBottom: 10 }}/>
                <View>
                    <View>
                        <Text>{props.premiacoes[4].acertos} {props.premiacoes[4].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[4].premio}</Text>
                    </View>
                </View>
                <Divider style={{ marginBottom: 10 }}/>
                <View>
                    <View>
                        <Text>{props.premiacoes[5].acertos} {props.premiacoes[5].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[5].premio}</Text>
                    </View>                
                </View>
                <Divider style={{ marginBottom: 10 }}/>
                <View>
                    <View>
                        <Text>{props.premiacoes[6].acertos} {props.premiacoes[6].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[6].premio}</Text>
                    </View>
                </View>
            </View>
        </React.Fragment>
    )
}


const GanhadoresLotoFacil = (props) => {
    return (
        <React.Fragment>
            <View style={{ padding: 10 }}>
                <View >
                    {props.acumulou ? <Text>Não houve ganhadores</Text> :
                        <View>
                            <Text>{props.premiacoes[0].acertos} {props.premiacoes[0].vencedores} apostas ganhadoras </Text>
                            <Text>R$ {props.premiacoes[0].premio}</Text>
                        </View>
                    }
                </View>
                <Divider style={{ marginBottom: 10 }}/>
                <View>
                    <View>
                        <Text>{props.premiacoes[1].acertos} {props.premiacoes[1].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[1].premio}</Text>
                    </View>
                </View>
                <Divider style={{ marginBottom: 10 }} />
                <View>
                    <View>
                        <Text>{props.premiacoes[2].acertos} {props.premiacoes[2].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[2].premio}</Text>
                    </View>                
                </View>
                <Divider style={{ marginBottom: 10 }}/>
                <View>
                    <View>
                        <Text>{props.premiacoes[3].acertos} {props.premiacoes[3].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[3].premio}</Text>
                    </View>
                </View>
                <Divider style={{ marginBottom: 10 }}/>
                <View>
                    <View>
                        <Text>{props.premiacoes[4].acertos} {props.premiacoes[4].vencedores} apostas ganhadoras </Text>
                        <Text>R$ {props.premiacoes[4].premio}</Text>
                    </View>
                </View>
            </View>
        </React.Fragment>
    )
}
export default { GanhadoresMegaSena, GanhadoresLotoFacil, GanhadoresLotoMania, GanhadoresQuina };


const styles = StyleSheet.create({
    horizontalLine: {
        width: "100%",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginHorizontal: 15,
        paddingVertical: 5,
    }
})