
import FiltroDb from "../Model/FiltroDb";

import {
    AllResultFacil,
    AllResultMania,
    AllResultMega,
    AllResultQuina
} from './index';

import { filtersAllCustom, EstatisMegaAnalise, EstatisMega, EstatisFacil, EstatisMania, EstatisQuina } from "./estatisticas";

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


const findMaiorAtraso = async (getDataLoteria, status, quantidadeAtrasos) => {
    let atrasos = null;
    if (status === 1) {
        // get N maiores atrasos
        atrasos = (await getDataLoteria()).estatisAtrasoSeq
        atrasos = atrasos.sort((a, b) =>  a.atraso < b.atraso).slice(0, quantidadeAtrasos)
        atrasos = atrasos.map((atrs) => atrs.dezena)
    }
    return atrasos;
}

const findMenorAtraso = async (getDataLoteria, status, quantidadeAtrasos) => {
    let atrasos = null;
    if (status === 1) {
        // get N menores atrasos
        atrasos = (await getDataLoteria()).estatisAtrasoSeq
        atrasos = atrasos.sort((a, b) =>  a.atraso > b.atraso).slice(0, quantidadeAtrasos)
        atrasos = atrasos.map((atrs) => atrs.dezena)
    }
    return atrasos;
}

const findMenorOcorrencia = async(getDataLoteria, status, quantidadeDezenas) => {
    let ocorrencias = null;
    if (status === 1) {
        // get N menores ocorrencias
        let ests = (await getDataLoteria()).ocorrencias
        ocorrencias = ests.reverse().slice(0, quantidadeDezenas)
        ocorrencias = ocorrencias.map((elem) => elem[0])
    }
    return ocorrencias;
}

const findMaiorOcorrencia = async(getDataLoteria, status, quantidadeDezenas) => {
    let ocorrencias = null;
    if (status === 1) {
        // get N maiores ocorrencias
        let ests = (await getDataLoteria()).ocorrencias
        ocorrencias = ests.slice(0, quantidadeDezenas)
        ocorrencias = ocorrencias.map((elem) => elem[0])
    }
    return ocorrencias
}


export const returnDataFiltro = async (maiorocorrencia, menorocorrencia, maioratraso, menoratraso, qtadepar, qtadeimpar, qtadedezenas, getDataLoteria) => {
    let dezenas = []
    let sorteadas = []
    let pares = []
    let impares = []

    let mariosOcorrencia = await findMaiorOcorrencia(getDataLoteria, maiorocorrencia, qtadedezenas+4)
    let menoresOcorrencia = await findMenorOcorrencia(getDataLoteria, menorocorrencia, qtadedezenas+4)
    let maiorAtrasos = await findMaiorAtraso(getDataLoteria, maioratraso, qtadedezenas+4)
    let menorAtraso = await findMenorAtraso(getDataLoteria, menoratraso, qtadedezenas+4)

    if(maiorAtrasos !== null) dezenas = dezenas.concat(maiorAtrasos)
    if(menorAtraso !== null) dezenas = dezenas.concat(menorAtraso)
    if(mariosOcorrencia !== null) dezenas = dezenas.concat(mariosOcorrencia)
    if(menoresOcorrencia !== null) dezenas = dezenas.concat(menoresOcorrencia)
   
    dezenas = [...new Set(dezenas)]
    dezenas.forEach(elem => {
        if(elem%2==0) pares.push(elem)
        else if(elem%2!==0) impares.push(elem)
    })
    pares = pares.slice(0, qtadepar)
    impares = impares.slice(0, qtadeimpar)
    sorteadas = sorteadas.concat(pares, impares).sort()
    return sorteadas
}

export const getFilter = async (select) => {

    const loterias = {
        "megasena" : 0,
        "lotofacil": 1,
        "lotomania": 2,
        "quina": 3
    }
    
    let loteria  = Object.entries(loterias).find((key, value) => value === select)

    FiltroDb.findByloteria(loteria[0]).then(async(result) => {
        let resultLoteria = null;
        
        switch (loteria[0]) {
            case 'megasena':
                resultLoteria = await returnDataFiltro(result[0].maiorocorrencia, result[0].menorocorrencia, result[0].maioratraso, result[0].menoratraso, result[0].qtadepar, result[0].qtadeimpar, result[0].qtadedezenas, EstatisMega);
                break;
            case 'lotofacil':
                resultLoteria = await returnDataFiltro(result[0].maiorocorrencia, result[0].menorocorrencia, result[0].maioratraso, result[0].menoratraso, result[0].qtadepar, result[0].qtadeimpar, result[0].qtadedezenas, EstatisFacil);
                break;
            case 'lotomania':
                resultLoteria = await returnDataFiltro(result[0].maiorocorrencia, result[0].menorocorrencia, result[0].maioratraso, result[0].menoratraso, result[0].qtadepar, result[0].qtadeimpar, result[0].qtadedezenas, EstatisMania);
                break;
            case 'quina':
                resultLoteria = await returnDataFiltro(result[0].maiorocorrencia, result[0].menorocorrencia, result[0].maioratraso, result[0].menoratraso, result[0].qtadepar, result[0].qtadeimpar, result[0].qtadedezenas, EstatisQuina);
                break;
            default:
                break;
        }

        console.log('resultLoteria ', resultLoteria);
        return resultLoteria;
    }).catch((err) => {
        console.error(err);  
    })
}

