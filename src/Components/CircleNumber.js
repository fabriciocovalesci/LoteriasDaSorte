import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from "react-native-paper";

export const CircleNumber = (props) => {

    const [state, setstate] = React.useState(false)

    function select(){
        setstate(!state)
        props.getNumber(state, props.number)
    }

    return (
        <View onStartShouldSetResponder={select} style={!state ? styles.circle : styles.circleSelect}>
            <Text style={!state ? styles.fontText : styles.fontTextSelect}>{props.number}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 38,
        height: 38,
        borderRadius: 38 / 2,
        backgroundColor: "#3d85c6",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 5
    },
    circleSelect: {
        width: 38,
        height: 38,
        borderRadius: 38 / 2,
        backgroundColor: "#225123",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 5
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
