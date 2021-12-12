import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'

import TopBar from '../../Components/TopBar'


const LoteriaFacil = () => {

    const [stateArray, setArray] = React.useState({ state: false, arraySelect: [] })
        
    function updateArray(number){
            setArray({ state: !stateArray.state, arraySelect: [...stateArray.arraySelect, number]})
        }
   
    const CircleNumber = (props) => {      
        return (
            <View onStartShouldSetResponder={() => {props.updateArray()}} style={props.stateArray.state ? styles.circle : styles.selectCircle}>
                <Text style={props.stateArray.state ? styles.notSelect : styles.selectText }>{props.number}</Text>
            </View>
        )
    }


    function seleSave(){
        console.log('arr'  , stateArray);
    }

 
    return (
        <React.Fragment>
        <TopBar subtitle="Meus números favoritos"/>
        <View style={styles.container}>
            <View style={styles.containerFacil}>
                {Array(25).fill().map((elem,index) =>
                    <CircleNumber stateArray={stateArray} updateArray={() => updateArray(index+1)} key={index+1}  number={index+1}/>
                )}
            </View>
            <Button onPress={seleSave}>salvar</Button>
        </View>
        </React.Fragment>
    )
}

export default LoteriaFacil


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignContent: "center"
    },
    containerFacil:{
        flexWrap: "wrap",
        flexDirection: "row",
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center"
    },
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
    notSelect:{
        color: "#000",  
        alignSelf: "center", 
        fontWeight: "bold" 
    },
    selectText: {
        color: "#fff",  
        alignSelf: "center", 
        fontWeight: "bold"  
    },
    selectCircle: {
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 5
    }
})