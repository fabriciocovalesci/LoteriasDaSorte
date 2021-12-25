
import React from 'react'
import { Dimensions, View, Text } from "react-native";

const screenWidth = Dimensions.get("window").width;


import PureChart from 'react-native-pure-chart';
import {
    BarChart,
    LineChart,
    StackedBarChart
} from "react-native-chart-kit";

export default function MyBarChart(props) {

    let sampleData = [
        {
          seriesName: 'series1',
          labels: 'teste',
          data: [
            {x: '32', y: 30},
            {x: '34', y: 28},
            {x: '36', y: 28},
            {x: '19', y: 27},
            {x: '16', y: 26}
          ],
          color: '#297AB1'
        }
      ]

      let sampleData1 = [
        
          {seriesName: 'series1', data: [30, 200, 170, 250, 10], color: '#297AB1'},
          {seriesName: 'series2', data: [20, 100, 150, 130, 15], color: 'yellow'}
        
    ]

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43]
          }
        ]
      };
      const data1 = {
        labels: ["Test1", "Test2"],
        legend: ["L1", "L2", "L3"],
        data: [
          [60, 60, 60],
          [30, 30, 60]
        ],
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
      };

      const chartConfig = {
        backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(255, 000, 125, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    return (
        <View>
            <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "bold" }}>{ props.tituloBar }</Text>
            <Text style={{ textAlign: "center", fontSize: 12 }}>{ props.subtituloBar }</Text>
            {/* <PureChart data={sampleData} type='line' /> */}
            <PureChart data={sampleData} width={'100%'} height={200} type='bar' />
            

            
            
        </View>
    )
}
