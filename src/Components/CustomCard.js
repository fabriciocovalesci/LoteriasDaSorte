import * as React from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";

import {
  Card,
  Text,
  Button,
  Paragraph,
  DataTable,
  Modal,
  Portal,
  Provider
} from "react-native-paper";

import ModalGanhadores from "./ModalGanhadores";

const CustomCardMega = (props) => {

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 10 };

  return (
    <React.Fragment>

      <View>
        <ModalGanhadores isVisible={visible} onDismiss={hideModal} name={props.name} premiacoes={props.premiacoes} />
      </View>

      <Card style={styles.container}>
        <Card.Content style={{ flexDirection: "row" }}>
          <Image source={require('../../assets/logo-megasena.png')} style={styles.img} />
          <Paragraph style={{ marginTop: 15, marginLeft: 15 }}>
            <Text style={{ fontWeight: "bold"}}>{props.title}</Text>
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
              : <Text></Text>}
          </Paragraph>
          <Paragraph>
          Sorteio realizado: {props.local}
          </Paragraph>
        </Card.Content>

        <Card.Content>
          <Paragraph>
            Dezenas sorteadas: {props.dezenas[0]} - {props.dezenas[1]} -{props.dezenas[2]} - {props.dezenas[3]} - {props.dezenas[4]} -{props.dezenas[5]}
          </Paragraph>
        </Card.Content>

        <Card.Content>
          <View>
            <Text style={{ flexWrap: "wrap" }}>
              Estimativa de prêmio do próximo concurso {props.acumuladaProxConcurso}
            </Text>
          </View>
        </Card.Content>

        <Card.Content style={styles.horizontalLine} />

        <Card.Actions style={styles.action}>
          <Button icon="table-eye" onPress={showModal} name="thumb-up-outline" text="Like">Premiação</Button>
        </Card.Actions>
      </Card>
    </React.Fragment>
  );
};


const CustomCardLotoFacil = (props) => {

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <React.Fragment>

      <View>
        <ModalGanhadores isVisible={visible} onDismiss={hideModal} name={props.name} premiacoes={props.premiacoes} />
      </View>

      <Card style={styles.container}>
        <Card.Content style={{ flexDirection: "row" }}>
          <Image source={require('../../assets/logo-lotofacil.png')} style={styles.img} />
          <Paragraph style={{ marginTop: 15, marginLeft: 15 }}>
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
              : <Text></Text>}
          </Paragraph>
          <Paragraph>
          Sorteio realizado: {props.local}
          </Paragraph>
        </Card.Content>

        <Card.Content>
          <Paragraph>
            Dezenas sorteadas:
          </Paragraph>

        </Card.Content>

        <Card.Content style={styles.tabelaSorteio}>
        <DataTable.Row >
            <DataTable.Cell numeric>{props.dezenas[0]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[1]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[2]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[3]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[4]}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell numeric>{props.dezenas[5]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[6]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[7]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[8]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[9]}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell numeric>{props.dezenas[10]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[11]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[12]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[13]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[14]}</DataTable.Cell>
          </DataTable.Row>
        </Card.Content>

        <Card.Content>
          <View>
            <Text style={{ flexWrap: "wrap" }}>
              Estimativa de prêmio do próximo concurso {props.acumuladaProxConcurso}
            </Text>
          </View>
        </Card.Content>

        <Card.Content style={styles.horizontalLine} />

        <Card.Actions style={styles.action}>
          <Button icon="table-eye" onPress={showModal} name="thumb-up-outline" text="Like">Premiação</Button>
        </Card.Actions>
      </Card>
    </React.Fragment>
  );
};


const CustomCardLotoMania = (props) => {

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <React.Fragment>

      <View>
        <ModalGanhadores isVisible={visible} onDismiss={hideModal} name={props.name} premiacoes={props.premiacoes} />
      </View>

      <Card style={styles.container}>
        <Card.Content style={{ flexDirection: "row" }}>
          <Image source={require('../../assets/logo-lotomania.png')} style={styles.img} />
          <Paragraph style={{ marginTop: 15, marginLeft: 15 }}>
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
              : <Text></Text>}
          </Paragraph>
          <Paragraph>
          Sorteio realizado: {props.local}
          </Paragraph>
        </Card.Content>

        <Card.Content>
          <Paragraph>
            Dezenas sorteadas:
          </Paragraph>
          </Card.Content>
          <Card.Content style={styles.tabelaSorteio}>
          <DataTable.Row>
            <DataTable.Cell numeric>{props.dezenas[0]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[1]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[2]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[3]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[4]}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell numeric>{props.dezenas[5]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[6]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[7]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[8]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[9]}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell numeric>{props.dezenas[10]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[11]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[12]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[13]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[14]}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell numeric>{props.dezenas[15]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[16]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[17]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[18]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.dezenas[19]}</DataTable.Cell>
          </DataTable.Row>
        </Card.Content>

        <Card.Content>
          <View>
            <Text style={{ flexWrap: "wrap" }}>
              Estimativa de prêmio do próximo concurso {props.acumuladaProxConcurso}
            </Text>
          </View>
        </Card.Content>

        <Card.Content style={styles.horizontalLine} />

        <Card.Actions style={styles.action}>
          <Button icon="table-eye" onPress={showModal} name="thumb-up-outline" text="Like">Premiação</Button>
        </Card.Actions>
      </Card>
    </React.Fragment>
  );
};


const CustomCardQuina = (props) => {

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <React.Fragment>

      <View>
        <ModalGanhadores loteria={props.title} isVisible={visible} onDismiss={hideModal} name={props.name} premiacoes={props.premiacoes} />
      </View>

      <Card style={styles.container}>
        <Card.Content style={{ flexDirection: "row" }}>
          <Image source={require('../../assets/logo-quina.png')} style={styles.img} />
          <Paragraph style={{ marginTop: 15, marginLeft: 15 }}>
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
              : <Text></Text>}
          </Paragraph>
          <Paragraph>
          Sorteio realizado: {props.local}
          </Paragraph>
        </Card.Content>

        <Card.Content>
          <Paragraph>
            Dezenas sorteadas: {props.dezenas[0]} - {props.dezenas[1]} -{props.dezenas[2]} - {props.dezenas[3]} - {props.dezenas[4]}
          </Paragraph>
        </Card.Content>

        <Card.Content>
          <View>
            <Text style={{ flexWrap: "wrap" }}>
              Estimativa de prêmio do próximo concurso {props.acumuladaProxConcurso}
            </Text>
          </View>
        </Card.Content>

        <Card.Content style={styles.horizontalLine} />

        <Card.Actions style={styles.action}>
          <Button icon="table-eye" onPress={showModal} name="thumb-up-outline" text="Like">Premiação</Button>
        </Card.Actions>
      </Card>
    </React.Fragment>
  );
};

export default { CustomCardLotoFacil, CustomCardMega, CustomCardLotoMania, CustomCardQuina }

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
  tabelaSorteio: {
    marginRight: Dimensions.get("window").width / 8
  }
});