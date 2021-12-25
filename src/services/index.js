

const axios = require('axios');


const Megalatest = 'https://loteriascaixa-api.herokuapp.com/api/mega-sena/latest'
const Facillatest = 'https://loteriascaixa-api.herokuapp.com/api/lotofacil/latest'
const Manialatest = 'https://loteriascaixa-api.herokuapp.com/api/lotomania/latest'
const Quinalatest = 'https://loteriascaixa-api.herokuapp.com/api/quina/latest'


const MegaAll = 'https://loteriascaixa-api.herokuapp.com/api/mega-sena'
const FacilAll = 'https://loteriascaixa-api.herokuapp.com/api/lotofacil'
const ManiaAll = 'https://loteriascaixa-api.herokuapp.com/api/lotomania'
const QuinaAll = 'https://loteriascaixa-api.herokuapp.com/api/quina'

const CORS = 'https://corsanywhere.herokuapp.com/'


export const ResultadoMegaSena = async () => {
    try {
        const response = await axios(Megalatest, { Headers: { 'Origin': Megalatest } })
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const ResultadoLotoFacil = async () => {
    try {
        const response = await axios(Facillatest, { Headers: { 'Origin': Facillatest } })
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const ResultadoLotoMania = async () => {
    try {
        const response = await axios(Manialatest, { Headers: { 'Origin': Manialatest } })
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const ResultadoQuina = async () => {
    try {
        const response = await axios(Quinalatest, { Headers: { 'Origin': Quinalatest } })
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const AllResultMega = async () => {
    try {
        const response = await axios(MegaAll, { Headers: { 'Origin': MegaAll } })
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const AllResultFacil = async () => {
    try {
        const response = await axios(FacilAll, { Headers: { 'Origin': FacilAll } })
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const AllResultMania = async () => {
    try {
        const response = await axios(ManiaAll, { Headers: { 'Origin': ManiaAll } })
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const AllResultQuina = async () => {
    try {
        const response = await axios(QuinaAll, { Headers: { 'Origin': QuinaAll } })
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}