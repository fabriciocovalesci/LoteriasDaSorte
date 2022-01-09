
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
        let mariosOcorrencia = await findMaiorOcorrencia(result[0].maiorocorrencia, 10)
        let menoresOcorrencia = await findMenorOcorrencia(result[0].menorocorrencia, 10)
        let maiorAtrasos = await findMaiorAtraso(result[0].maioratraso, 10)
        let menorAtraso = await findMenorAtraso(result[0].menoratraso, 10)
        console.log('mariosOcorrencia ', mariosOcorrencia);
        console.log('menoresOcorrencia ', menoresOcorrencia);
        console.log('maiorAtrasos ', maiorAtrasos);
        console.log('menorAtraso ', menorAtraso);
        // findMaiorAtraso(result[0].maioratraso, resultLoteria)
        // console.log( EstatisMegaAnalise);
        // console.log(result[0].maioratraso);
        // console.log(resultLoteria.length)
        console.log('====================================');
        return result
    }).catch((err) => {
        console.error(err);  
    })
}

