
import React from 'react'
import { Dimensions, View, Text, Button } from "react-native";

const screenWidth = Dimensions.get("window").width;

import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from "victory-native";

import {
    BarChart,
    LineChart,
    StackedBarChart
} from "react-native-chart-kit";

export default function MyBarChart(props) {

    const data = []

    if(props !== undefined && props.dezenas !== undefined && props.dezenas.length !== 0){
        props.dezenas.forEach(elem => {
            data.push({ dezenas: elem[0] , earnings: elem[1] })
        });
    }


    return (
        <View>
            <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "bold" }}>{ props.tituloBar }</Text>
            <Text style={{ textAlign: "center", fontSize: 12 }}>{ props.subtituloBar }</Text>
                     
            <VictoryChart  horizontal offset={10} width={screenWidth} theme={VictoryTheme.material}>
            <VictoryLabel x={10} y={25} text="Dezenas"  />
            <VictoryBar style={{ data: { fill: "#c43a31" } }} alignment='start' animate={{
                              onLoad: {duration: 1000},
                              duration: 1000, 
                              easing: "bounce"
                            }} data={data} x="dezenas" y="earnings" />
            <VictoryLabel
                x={screenWidth/1.5}
                y={25}
                textAnchor="middle"
                text="Ocorrências"
            />
            </VictoryChart>             
            
        </View>
    )
}
