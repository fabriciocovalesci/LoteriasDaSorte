

const axios = require('axios');


const Megalatest = 'https://loteriascaixa-api.herokuapp.com/api/mega-sena/latest'
const Facillatest = 'https://loteriascaixa-api.herokuapp.com/api/lotofacil/latest'
const Manialatest = 'https://loteriascaixa-api.herokuapp.com/api/lotomania/latest'
const Quinalatest = 'https://loteriascaixa-api.herokuapp.com/api/quina/latest'

const CORS = 'https://corsanywhere.herokuapp.com/'


export const ResultadoMegaSena = async () => {
    try {
        const response = await axios(CORS + Megalatest, { Headers: { 'Origin': Megalatest } })
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const ResultadoLotoFacil = async () => {
    try {
        const response = await axios(CORS + Facillatest, { Headers: { 'Origin': Facillatest } })
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const ResultadoLotoMania = async () => {
    try {
        const response = await axios(CORS + Manialatest, { Headers: { 'Origin': Manialatest } })
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const ResultadoQuina = async () => {
    try {
        const response = await axios(CORS + Quinalatest, { Headers: { 'Origin': Quinalatest } })
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}