import * as React from 'react';
import { StyleSheet  } from 'react-native';
import { Colors } from 'react-native-paper'

export const styles = StyleSheet.create({
    surfaceMega: {
        padding: 8,
        height: 80,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#209869",
        elevation: 4,
        margin: 5,
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 10,
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
    circle: {
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        backgroundColor: Colors.red300,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 5
    },
    surfaceFacil: {
        padding: 8,
        height: 80,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#930989",
        elevation: 4,
        margin: 5,
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 10,
    },
    surfaceMania: {
        padding: 8,
        height: 80,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F78100",
        elevation: 4,
        margin: 5,
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 10,
    },
    surfaceQuina: {
        padding: 8,
        height: 80,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#260085",
        elevation: 4,
        margin: 5,
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 10,
    },
    surfaceText:{
        color: "#fff"
    },
    fontText: {
        color: "#fff", 
        alignSelf: "center",
        fontWeight: "bold" ,
        textAlign: "center",
    },
    cardShadow :{
        padding: 20, 
        backgroundColor: Colors.white, 
        borderRadius: 10, 
        marginBottom: 10, 
        paddingTop: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 7
    }
});