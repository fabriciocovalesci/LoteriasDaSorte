import * as React from "react";
import { render } from "react-dom";
import { View } from 'react-native'
import { Title, Text, Button, Paragraph, Card } from 'react-native-paper';


export default function CardFav({item}) {
    let array = item.item
    // console.log('====================================');
    // console.log(array);
    // console.log('====================================');
    const { numeros, titulo } = item.item;
    
        return(
        <>
        {
        array.map((item) => {
            console.log(JSON.parse(item.numeros));
        <View>
            <Card style={{ margin: 10 }}>
                <Card.Content>
                    <Title>{item.titulo}</Title>
                    <View style={{flexDirection: "row"}}> 
                    {JSON.parse(item.numeros).map(elem => (<Paragraph>{elem } </Paragraph>))}
                    </View>
                </Card.Content>
                <Card.Actions>
                    <Button>Editar</Button>
                    <Button>Excluir</Button>
                    <Button>Cancel</Button>
                </Card.Actions>
            </Card>
        </View>
        })
    }
    </>   
    )
}
