import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from "react-native-paper";
import { useNavigation, useIsFocused } from '@react-navigation/native'

export const CircleNumber = (props) => {

    const [state, setstate] = React.useState(false)

    const [stateUp, setUpdate] = React.useState([])

    const isFocused = useIsFocused();

    const [loading, setLoading] = React.useState(false);

    function select(){
        setstate(!state)
        props.getNumber(state, props.number)
    }



    function dezenasState(){
        if(props.numberSelected.length !== 0){
            if(props.numberSelected.includes(props.number)){
                console.log('oi');
                setstate(!state)
            }
        }
    }
    

React.useEffect(() => {
}, [dezenasState])

    return (
        <View onStartShouldSetResponder={select} style={!state ? styles.circle : styles.circleSelect}>
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
