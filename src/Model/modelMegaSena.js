import AsyncStorage_MegaSena from '@react-native-async-storage/async-storage';


// var countries = AsyncStorage.getItem('countries');
// AsyncStorage.setItem('countries', countries.concat(country));



export const GetMegaSena = async () => {
    try {
        let value = await AsyncStorage_MegaSena.getItem('megasena')
        return value
    } catch (e) {
        console.error(e)
    }
}


export const SetMegaSena = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage_MegaSena.setItem('megasena', jsonValue)
        // let getMegasena = await AsyncStorage_MegaSena.getItem('megasena')
        // console.log('getMegasena ', getMegasena)
        //     if(getMegasena !== undefined && getMegasena !== null){
        //      await AsyncStorage_MegaSena.setItem('megasena', getMegasena.concat(jsonValue))
        // } else {
        //     await AsyncStorage_MegaSena.setItem('megasena', jsonValue)
        // }
        // console.log('====================================');
        // console.log(jsonValue);
        // console.log('====================================');
    } catch (e) {
        console.error(e)
    }
}

export const ClearMegaSena = async () => {
    try {
        await AsyncStorage_MegaSena.clear()
    } catch(e) {
        console.error(e)
    }
    console.log('Done.')
}


const SetLotoFacil = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('lotofacil', jsonValue)
    } catch (e) {
        console.error(e)
    }
}



const SetLotoMania = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('lotomania', jsonValue)
    } catch (e) {
        console.error(e)
    }
}


const SetQuina = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('quina', jsonValue)
    } catch (e) {
        console.error(e)
    }
}
