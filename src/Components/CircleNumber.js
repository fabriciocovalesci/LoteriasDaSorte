import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from "react-native-paper";
import { useNavigation, useIsFocused } from '@react-navigation/native'

export const CircleNumber = (props) => {

    const [state, setstate] = React.useState(false)

    const [stateUp, setUpdate] = React.useState([])

    const isFocused = useIsFocused();

    const [loading, setLoading] = React.useState(true);

    function select(){
        if(!props.isSelect){
            if(props.numberSelected.includes(props.number)){
                console.log('oi');
                setstate(props.isSelect)
            }
        }else{
            setstate(!state)
            props.getNumber(state, props.number)
        }
    }

    // const select = React.useCallback(() => {
    //     if(props.isSelect && props.hasOwnProperty('numberSelected') && props.numberSelected.length !== 0){
    //         console.log('====================================');
    //         console.log('oiii');
    //         console.log('====================================');
    //         if(props.numberSelected.indexOf(...props.number) !== -1){
    //             console.log('oi');
    //             setstate(true)
    //         }
    //     }else{
    //         setstate(!state)
    //         props.getNumber(state, props.number)
    //     }
    // })

    

React.useEffect(() => {
    const exec = async () => {
        setLoading(false)
    }
    exec()
}, [loading])
    return (
        <View onStartShouldSetResponder={select} style={state && props.loteria === 'megasena' ? styles.circleMega : state && props.loteria === 'lotofacil' ? styles.circleFacil : state && props.loteria === 'lotomania' ? styles.circleMania : state && props.loteria === 'quina' ? styles.circleQuina : styles.circleSelect }>
            <Text style={!state ? styles.fontText : styles.fontTextSelect}>{props.number}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: "#3d85c6",
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
        color: "#000", 
        alignSelf: "center", 
        fontWeight: "bold" 
    },
    fontTextSelect: {
        color: "#fff", 
        alignSelf: "center", 
        fontWeight: "bold" 
    }
})
