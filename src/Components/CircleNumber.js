import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from "react-native-paper";

export const CircleNumber = (props) => {
    return (
        <View style={styles.circle}>
            <Text style={styles.fontText}>{props.number}</Text>
        </View>
    )
}

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
    fontText: {
        color: "#000", 
        alignSelf: "center", 
        fontWeight: "bold" 
    }
})
