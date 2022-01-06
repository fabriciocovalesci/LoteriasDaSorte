import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from "react-native-paper";
import { useNavigation, useIsFocused } from '@react-navigation/native'

export const CircleNumberFav = (props) => {

    const [state, setstate] = React.useState(false)

    const [stateUp, setUpdate] = React.useState([])

    const isFocused = useIsFocused();

    const [loading, setLoading] = React.useState(false);

    function select(){
        if(!props.isSelect){
            setstate(props.isSelect)
        }else{
            setstate(!state)
            props.getNumber(state, props.number)
        }
    }


    function color(){
        if(props.loteria === 'megasena'){
            return '#209869'
        }
        else if(props.loteria === 'lotofacil'){
            return '#930989'
        }
        else if(props.loteria === 'lotomania'){
            return '#F78100'
        }
        else if(props.loteria === 'quina'){
            return '#058ce1'
        }
    }



    function dezenasState(){
        if(props.numberSelected.length !== 0){
            if(props.numberSelected.includes(props.number)){
                setstate(!state)
            }
        }
    }
    

React.useEffect(() => {
}, [dezenasState])

    return (
        <View style={props.loteria === 'megasena' ? styles.circleMega : props.loteria === 'lotofacil' ? styles.circleFacil : props.loteria === 'lotomania' ? styles.circleMania : props.loteria === 'quina' ? styles.circleQuina : styles.circle}>
            <Text style={!state ? styles.fontText : styles.fontTextSelect}>{props.number}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#225123' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 2
    },
    circleQuina: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#058ce1' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 2
    },
    circleFacil: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#930989' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 2
    },
    circleMania: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#F78100' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 2
    },
    circleMega: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#209869' ,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 2
    },
    circleSelect: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: "#225123",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 2
    },
    fontText: {
        color: "#fff", 
        alignSelf: "center", 
        fontWeight: "bold" 
    },
    fontTextSelect: {
        color: "#fff", 
        alignSelf: "center", 
        fontWeight: "bold" 
    }
})
