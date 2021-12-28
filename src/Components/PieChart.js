
import React from 'react'
import { Dimensions, View, Text, Button } from "react-native";

const screenWidth = Dimensions.get("window").width;

import { VictoryPie, VictoryChart, VictoryTooltip, VictoryTheme, VictoryLabel } from "victory-native";


export default function MyPieChart(props) {

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
                     
            <VictoryChart width={screenWidth} theme={VictoryTheme.material}>
            <VictoryPie
                    style={{ labels: { fill: "black" } }}
                    innerRadius={100}
                    labelRadius={120}
                    labels={({ datum }) => `${datum.y}`}
                    labelComponent={
                        <VictoryTooltip
                        {...props}
                        x={200} y={250}
                        orientation="top"
                        pointerLength={0}
                        cornerRadius={50}
                        flyoutWidth={100}
                        flyoutHeight={100}
                        flyoutStyle={{ fill: "black" }}
        />
                    }
                    data={[
                        { x: 1, y: 5 },
                        { x: 2, y: 4 },
                        { x: 3, y: 2 },
                        { x: 4, y: 3 },
                        { x: 5, y: 1 }
                    ]}
                    />
            </VictoryChart>             
            
        </View>
    )
}
