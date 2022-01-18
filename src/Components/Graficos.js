import { BarChart, AreaChart, Grid, XAxis } from 'react-native-svg-charts'
import { Dimensions, View } from 'react-native'

export const BarChartScreen = (props) => {

    function FrequenciaAll(array, dezenas){
        dezenas = dezenas.map(elem => String(elem.trim()))
        let  sampleArray = [];
        let distribuicao = []
        array.slice(Math.max(array.length-10,0)).filter(elem => { sampleArray = sampleArray.concat(elem.dezenas)})
        const counts = {};
        sampleArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
            Object.entries(counts).filter((dezena, index) => {
                if(dezenas.some(elem => elem == dezena[0])) {
                    let _data = {
                        "dezena": dezena[0],
                        "frequencia": dezena[1],
                        "porcentagem": ((dezena[1]*100)/25).toFixed(2)+' %'
                    }
                    distribuicao.push(_data)
                }
            }) 
        distribuicao.sort((a, b) => b.frequencia - a.frequencia)
        return distribuicao
    }

    let data = []
    let data2 = []
    if(props.hasOwnProperty('array') && props.array.length !== 0 && props.hasOwnProperty('dezenas') && props.dezenas.length !== 0){
        data = props.dezenas.map(el => parseInt(el.trim()));

        console.log('====================================');
        data2 = FrequenciaAll(props.array, props.dezenas)
        data2 = data2.map(el => el.frequencia)
        console.log(data2);
        console.log('====================================');
    }

    return (
        <View style={{ height: 200, width: Dimensions.get('window').width - 20, padding: 20 }}>
        <XAxis
          style={{ marginTop: 10, padding: 5 }}
          data={ data }
          contentInset={{ top: 20, bottom: 20 }}
          formatLabel={ value => `${value}ºC` }
          yAccessor={({ index }) => index}
          labelStyle={ { color: 'black' } }
        />
        <BarChart
          style={{ flex: 1 }}
          data={data2}
          gridMin={1}
          svg={{ fill: 'rgb(134, 65, 244)' }}
        />
        <XAxis
          style={{ marginTop: 10 }}
          data={ data }
        svg={{ rotation: 30 }}
          formatLabel={ (value, index) => value }
          labelStyle={ { color: 'black' } }
        />
      </View>
            )
}


