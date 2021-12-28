

import {
    AllResultFacil,
    AllResultMania,
    AllResultMega,
    AllResultQuina
} from './index';


function atrasosCustom(arr, numero){
    return arr.reverse().slice(Math.max(arr.length-numero,0))
 }

 export const filtersAllCustom = (array, findDezena, periodo) => {
    const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
    let atrasos = [];
    let sequencias = [];
    let dezena = findDezena;
    let dezenasEst = {
        dezena: '',
        atraso: 0,
        maxAtraso: 0,
        maxSequencia: 0,
        mediaAtraso: 0,
        mediaSequencia: 0,
        sequencia: 0
    }
    if (periodo !== null && periodo !== undefined) {
        array.reverse().slice(Math.max(array.length - periodo, 0)).filter((elem, index) => {
            if (elem.dezenas.indexOf(dezena) === -1) {
                dezenasEst.atraso = dezenasEst.atraso + 1;
                atrasos.push(dezenasEst.atraso)
                dezenasEst.sequencia = 0;
            }
            if (elem.dezenas.indexOf(dezena) !== -1) {
                sequencias.push(dezenasEst.sequencia)
                dezenasEst.sequencia = dezenasEst.sequencia + 1;
                dezenasEst.atraso = 0;
            }
        })
        dezenasEst.maxAtraso = Math.max(...atrasos);
        dezenasEst.maxSequencia = Math.max(...sequencias)
        dezenasEst.mediaAtraso = parseFloat(average(atrasos).toPrecision(3))
        dezenasEst.mediaSequencia = parseFloat(average(sequencias).toPrecision(3));
        dezenasEst.dezena = findDezena;
        return dezenasEst;
    }
    array.reverse().filter((elem, index) => {
        if (elem.dezenas.indexOf(dezena) === -1) {
            dezenasEst.atraso = dezenasEst.atraso + 1;
            sequencias.push(dezenasEst.sequencia)
            dezenasEst.sequencia = 0;
        }
        if (elem.dezenas.indexOf(dezena) !== -1) {
            atrasos.push(dezenasEst.atraso)
            dezenasEst.sequencia = dezenasEst.sequencia + 1;
            dezenasEst.atraso = 0;
        }
    })
    dezenasEst.maxAtraso = Math.max(...atrasos);
    dezenasEst.maxSequencia = Math.max(...sequencias)
    dezenasEst.mediaAtraso = parseFloat(average(atrasos).toPrecision(3))
    dezenasEst.mediaSequencia = parseFloat(average(sequencias).toPrecision(3))
    dezenasEst.dezena = findDezena;
    return dezenasEst;
}
 

export const EstatisMegaAnalise = async () =>{
    try {
        const allMega = await AllResultMega();
        let estatisticasMega = []
        let dezenasMega = Array.from({length: 60}, (_, i) => i + 1);
        dezenasMega.forEach((element) => {
            if(element < 10){
                estatisticasMega.push(filtersAllCustom(allMega, "0"+element.toString()))
            }else{
                estatisticasMega.push(filtersAllCustom(allMega, element.toString()))
            }
        })
        return estatisticasMega;       
    } catch (error) {
        console.error(`ERROR get alll results mega ${error}`)
    }
};

export const EstatisMega = async () =>{
    try {
        const allMega = await AllResultMega();
        let dezenas = []
        const counts = {};
        allMega.filter(elem => dezenas.push(...elem.dezenas))
        dezenas.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        let crescente = Object.entries(counts).sort((a,b) => b[1]-a[1])
        return crescente;       
    } catch (error) {
        console.error(`ERROR get alll results mega ${error}`)
    }
};

export const EstatisFacil = async () =>{
    try {
        const allFacil = await AllResultFacil();
        let dezenas = []
        const counts = {};
        allFacil.filter(elem => dezenas.push(...elem.dezenas))
        dezenas.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        let crescente = Object.entries(counts).sort((a,b) => b[1]-a[1])
        return crescente;       
    } catch (error) {
        console.error(`ERROR get alll results facil ${error}`)
    }
};


export const EstatisMania = async () =>{
    try {
        const allMania = await AllResultMania();
        let dezenas = []
        const counts = {};
        allMania.filter(elem => dezenas.push(...elem.dezenas))
        dezenas.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        let crescente = Object.entries(counts).sort((a,b) => b[1]-a[1])
        return crescente;       
    } catch (error) {
        console.error(`ERROR get alll results mania ${error}`)
    }
};


export const EstatisQuina = async () =>{
    try {
        const allQuina = await AllResultQuina();
        let dezenas = []
        const counts = {};
        allQuina.filter(elem => dezenas.push(...elem.dezenas))
        dezenas.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        let crescente = Object.entries(counts).sort((a,b) => b[1]-a[1])
        return crescente;       
    } catch (error) {
        console.error(`ERROR get alll results quina ${error}`)
    }
};

