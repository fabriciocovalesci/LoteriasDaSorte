import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text, Button, Paragraph, DataTable } from "react-native-paper";

const ResultCardMega = (props) => {

    console.log('-> ', Object.keys(props).length);
    if(Object.keys(props).length !== 8){
  return (
    <React.Fragment>
      <Card style={styles.container}>
        <Card.Content style={{ flexDirection: "row" }}>
          <Image source={require('../../../assets/logo-megasena.png')} style={styles.img} />
          <Paragraph style={{ marginTop: 15 }}>
            <Text style={{ fontWeight: "bold" }}>{props.title}</Text>
          </Paragraph>
        </Card.Content>
        <Card.Content>
          <Paragraph>
            Concurso: {props.concurso} - Data: {props.data}
          </Paragraph>
          <Paragraph>
            {props.acumulou === true ?
              <View>
                <View style={styles.statusSorteio}>
                  <Text >Acumulou !!!!</Text>
                </View>
              </View>
              : ''}
            <View>
              <Text >Sorteio realizado: {props.local}</Text>
            </View>
          </Paragraph>
        </Card.Content>

        <Card.Content>
          <Paragraph>
            Dezenas sorteadas: {props.dezenas[0]} - {props.dezenas[1]} -{props.dezenas[2]} - {props.dezenas[3]} - {props.dezenas[4]} -{props.dezenas[5]}
          </Paragraph>
        </Card.Content>

        <Card.Content>
          <View>
            <Text>
              Estimativa de prêmio do
            </Text>
            <Text>
              próximo concurso {props.acumuladaProxConcurso}
            </Text>
          </View>
        </Card.Content>

        <Card.Content style={styles.horizontalLine} />

        <Card.Actions style={styles.action}>
          <Button icon="table-eye" onPress={() => alert('Pressed')} name="thumb-up-outline" text="Like">Premiação</Button>
        </Card.Actions>
      </Card>
    </React.Fragment>
  );
}else {
    return (<></>)
}
};


export default ResultCardMega;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#4169E1",
  },
  statusSorteio: {
    alignSelf: "center",
    alignContent: "center"

  },
  contentStart: { flexDirection: "row", alignItems: "flex-start" },
  contentEnd: { flexDirection: "row", alignItems: "flex-end" },
  horizontalLine: {
    width: 335,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginHorizontal: 15,
    paddingVertical: 5,
  },
  action: { flexDirection: "row", paddingTop: 5, justifyContent: "center" },
});