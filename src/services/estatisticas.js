

import {
    AllResultFacil,
    AllResultMania,
    AllResultMega,
    AllResultQuina
} from './index';


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

