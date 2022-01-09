
import FiltroDb from "../Model/FiltroDb";

import {
    AllResultFacil,
    AllResultMania,
    AllResultMega,
    AllResultQuina
} from './index';

import { filtersAllCustom, EstatisMegaAnalise, EstatisMega } from "./estatisticas";

/*
    return from data base
  Object {
    "id": 3,
    "loteria": "quina",
    "maioratraso": 0,
    "maiorocorrencia": 0,
    "menoratraso": 1,
    "menorocorrencia": 0,
    "nome": "filtro quina",
    "qtadedezenas": 5,
    "qtadeimpar": 3,
    "qtadepar": 2,
    "soma": "0",
    "ultimosconcurso": 70,
    "valoraposta": "12,00",
  },

*/


const findMaiorAtraso = async (status, quantidadeAtrasos) => {
    let atrasos = null;
    if (status === 1) {
        // get N maiores atrasos
        atrasos = (await EstatisMega()).estatisAtrasoSeq
        atrasos = atrasos.sort((a, b) =>  a.atraso < b.atraso).slice(0, quantidadeAtrasos)
        atrasos = atrasos.map((atrs) => atrs.dezena)
    }
    return atrasos;
}

const findMenorAtraso = async (status, quantidadeAtrasos) => {
    let atrasos = null;
    if (status === 1) {
        // get N menores atrasos
        atrasos = (await EstatisMega()).estatisAtrasoSeq
        atrasos = atrasos.sort((a, b) =>  a.atraso > b.atraso).slice(0, quantidadeAtrasos)
        atrasos = atrasos.map((atrs) => atrs.dezena)
    }
    return atrasos;
}

const findMenorOcorrencia = async(status, quantidadeDezenas) => {
    let ocorrencias = null;
    if (status === 1) {
        // get N menores ocorrencias
        let ests = (await EstatisMega()).ocorrencias
        ocorrencias = ests.reverse().slice(0, quantidadeDezenas)
        ocorrencias = ocorrencias.map((elem) => elem[0])
    }
    return ocorrencias;
}

const findMaiorOcorrencia = async(status, quantidadeDezenas) => {
    let ocorrencias = null;
    if (status === 1) {
        // get N maiores ocorrencias
        let ests = (await EstatisMega()).ocorrencias
        ocorrencias = ests.slice(0, quantidadeDezenas)
        ocorrencias = ocorrencias.map((elem) => elem[0])
    }
    return ocorrencias
}

export const getFilter = async (select) => {

    const loterias = {
        "megasena" : 0,
        "lotofacil": 1,
        "lotomania": 2,
        "quina": 3
    }
    
    let loteria  = Object.entries(loterias).find((key, value) => value === select)

    var resultLoteria = null;

    switch (loteria[0]) {
        case 'megasena':
            resultLoteria = await AllResultMega();
            break;
        case 'lotofacil':
            resultLoteria = await AllResultMania();
            break;
        case 'lotomania':
            resultLoteria = await AllResultMania();
            break;
        case 'quina':
            resultLoteria = await AllResultQuina();
            break;
        default:
            break;
    }


    FiltroDb.findByloteria(loteria[0]).then(async(result) => {
        console.log('====================================');
        let dezenas = []
        let mariosOcorrencia = await findMaiorOcorrencia(result[0].maiorocorrencia, result[0].qtadedezenas+4)
        let menoresOcorrencia = await findMenorOcorrencia(result[0].menorocorrencia, result[0].qtadedezenas+4)
        let maiorAtrasos = await findMaiorAtraso(result[0].maioratraso, result[0].qtadedezenas+4)
        let menorAtraso = await findMenorAtraso(result[0].menoratraso, result[0].qtadedezenas+4)

        if(maiorAtrasos !== null) dezenas = dezenas.concat(maiorAtrasos)
        if(menorAtraso !== null) dezenas = dezenas.concat(menorAtraso)
        if(mariosOcorrencia !== null) dezenas = dezenas.concat(mariosOcorrencia)
        if(menoresOcorrencia !== null) dezenas = dezenas.concat(menoresOcorrencia)
       
        dezenas = [...new Set(dezenas)]
        console.log('dezenas ', dezenas);

        console.log('====================================');
        console.log(result[0].qtadedezenas);
        console.log(typeof result[0].qtadepar);
        console.log('qtadeimpar ', result[0].qtadeimpar);
        console.log('====================================');

        let sorteadas = []
        let pares = []
        for (let index = 0; index < result[0].qtadedezenas; index++) {
            let Generate = Math.floor((Math.random() * dezenas.length));
            if(pares.length === result[0].qtadepar) break
            else if(dezenas[Generate]%2===0 && pares.indexOf(dezenas[Generate]) === -1){
                pares.push(dezenas[Generate])
            }else continue;
        }

        let impares = []
        for (let index = 0; index < result[0].qtadedezenas; index++) {
            let Generate = Math.floor((Math.random() * dezenas.length));
            if(impares.length === result[0].qtadeimpar) break
            else if(dezenas[Generate]%2!==0 && impares.indexOf(dezenas[Generate]) === -1){
                impares.push(dezenas[Generate])
            }else continue;
        }

        console.log('pares ', pares);
        console.log('impares ', impares);

        sorteadas = sorteadas.concat(pares, impares).sort()

        console.log('sorteadas ', sorteadas);
       

        console.log('====================================');
        return result
    }).catch((err) => {
        console.error(err);  
    })
}

