
import React from 'react'
import { Dimensions, View, Text, Button, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from "victory-native";

import {
    BarChart,
    LineChart,
    StackedBarChart
} from "react-native-chart-kit";

export const MyBarChart = (props) => {

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
                     
         <VictoryChart horizontal offset={10} width={screenWidth} theme={VictoryTheme.material}>
            <VictoryLabel x={10} y={25} text="Ocorrências"  />
            <VictoryBar style={{ data: { fill: "green" } }} alignment='start' animate={{
                              onLoad: {duration: 1000},
                              duration: 1000, 
                              easing: "bounce"
                            }} 
                            data={data} x="dezenas" y="earnings" 
                            labels={({ datum }) => datum.x}
                            />
            <VictoryLabel
                x={screenWidth/1.5}
                y={25}
                textAnchor="middle"
                text="Dezenas"
            />
            </VictoryChart>
        </View>
    )
}


export const MyBarChartAtraso = (props) => {

    const data = []

    if(props !== undefined && props.dezenas !== undefined && props.dezenas.length !== 0){
        props.dezenas.forEach(elem => {
            data.push({ earnings: elem.mediaAtraso, dezenas: elem.dezena })
        });
    }

    return (
        <View>
            <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "bold" }}>{ props.tituloBar }</Text>
            <Text style={{ textAlign: "center", fontSize: 12 }}>{ props.subtituloBar }</Text>
                     
            <VictoryChart offset={10} width={screenWidth} theme={VictoryTheme.material}>
            <VictoryLabel x={10} y={25} text="Média Atrasos %"  />
            <VictoryBar style={{ data: { fill: "#c43a31" } }} alignment='start' animate={{
                              onLoad: {duration: 1000},
                              duration: 1000, 
                              easing: "bounce"
                            }} data={data} x="dezenas" y="earnings" />
            <VictoryLabel
                x={screenWidth/1.5}
                y={25}
                textAnchor="middle"
                text="Dezenas"
            />
            </VictoryChart>             
            
        </View>
    )
}


export const BarChartSomaPercent = (props) => {

    const data = []
    data.push({ earnings: props.dezenas.equal.jogos, dezenas: props.dezenas.equal.porcentagem })
    data.push({ earnings: props.dezenas.FiveIOneP.jogos, dezenas: props.dezenas.FiveIOneP.porcentagem })
    data.push({ earnings: props.dezenas.FivePOneI.jogos, dezenas: props.dezenas.FivePOneI.porcentagem })
    data.push({ earnings: props.dezenas.FourITwoP.jogos, dezenas: props.dezenas.FourITwoP.porcentagem })
    data.push({ earnings: props.dezenas.FourPTwoI.jogos, dezenas: props.dezenas.FourPTwoI.porcentagem })
    data.push({ earnings: props.dezenas.SixIZeroP.jogos, dezenas: props.dezenas.SixIZeroP.porcentagem })
    data.push({ earnings: props.dezenas.SixPZeroI.jogos, dezenas: props.dezenas.SixPZeroI.porcentagem })
   
    return (
        <View>
            <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "bold" }}>{ props.tituloBar }</Text>
            <Text style={{ textAlign: "center", fontSize: 12 }}>{ props.subtituloBar }</Text>
                     
            <VictoryChart offset={10} width={screenWidth} theme={VictoryTheme.material}>
            <VictoryLabel x={10} y={25} text="Média Atrasos %"  />
            <VictoryBar horizontal style={{ data: { fill: "#c43a31" } }} alignment='start' animate={{
                              onLoad: {duration: 1000},
                              duration: 1000, 
                              easing: "bounce"
                            }} data={data} x="dezenas" y="earnings" />
            <VictoryLabel
                x={screenWidth/1.5}
                y={25}
                textAnchor="middle"
                text="Dezenas"
            />
            </VictoryChart>             
            
        </View>
    )
}



export const graficoApp = () => {

    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <LineChart style={styles.chart}
            data={{dataSets:[{label: "demo", values: [{y: 1}, {y: 2}, {y: 1}]}]}}
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});