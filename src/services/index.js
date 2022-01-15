

const axios = require('axios');


const Megalatest = 'https://loteriascaixa-api.herokuapp.com/api/mega-sena/latest'
const Facillatest = 'https://loteriascaixa-api.herokuapp.com/api/lotofacil/latest'
const Manialatest = 'https://loteriascaixa-api.herokuapp.com/api/lotomania/latest'
const Quinalatest = 'https://loteriascaixa-api.herokuapp.com/api/quina/latest'


let latestfacil = `http://www.loterias.caixa.gov.br/wps/portal/loterias/landing/lotofacil/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbz8vTxNDRy9_Y2NQ13CDA0sTIEKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wBmoxN_FydLAGAgNTKEK8DkRrACPGwpyQyMMMj0VAcySpRM!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_61L0H0G0J0VSC0AC4GLFAD2003/res/id=buscaResultado/c=cacheLevelPage/?timestampAjax=`
let latestmega = `http://www.loterias.caixa.gov.br/wps/portal/loterias/landing/megasena/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbwMPI0sDBxNXAOMwrzCjA0sjIEKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wNnUwNHfxcnSwBgIDUyhCvA5EawAjxsKckMjDDI9FQE-F4ca/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_HGK818G0KO6H80AU71KG7J0072/res/id=buscaResultado/c=cacheLevelPage/?timestampAjax=`
let latestquina = `http://www.loterias.caixa.gov.br/wps/portal/loterias/landing/lotomania/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbz8vTxNDRy9_Y2NQ13CDA38jYEKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wBmoxN_FydLAGAgNTKEK8DkRrACPGwpyQyMMMj0VAajYsZo!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_61L0H0G0JGJVA0AKLR5T3K00V0/res/id=buscaResultado/c=cacheLevelPage/?timestampAjax=`
let latestmania = `http://www.loterias.caixa.gov.br/wps/portal/loterias/landing/quina/!ut/p/a1/jc69DoIwAATgZ_EJepS2wFgoaUswsojYxXQyTfgbjM9vNS4Oordd8l1yxJGBuNnfw9XfwjL78dmduIikhYFGA0tzSFZ3tG_6FCmP4BxBpaVhWQuA5RRWlUZlxR6w4r89vkTi1_5E3CfRXcUhD6osEAHA32Dr4gtsfFin44Bgdw9WWSwj/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_HGK818G0K8ULB0QT4MEM8L0086/res/id=buscaResultado/c=cacheLevelPage/?timestampAjax=`

const MegaAll = 'https://loteriascaixa-api.herokuapp.com/api/mega-sena'
const FacilAll = 'https://loteriascaixa-api.herokuapp.com/api/lotofacil'
const ManiaAll = 'https://loteriascaixa-api.herokuapp.com/api/lotomania'
const QuinaAll = 'https://loteriascaixa-api.herokuapp.com/api/quina'


const concursosAnteriores = `https://loteriascaixa-api.herokuapp.com/api/`

const CORS = 'https://corsanywhere.herokuapp.com/'


export const LatestMegaSena = async () => {
    try {
        const response = await axios(`${latestmega}${Date.now()}`)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const LatestLotoFacil= async () => {
    try {
        const response = await axios(`${latestfacil}${Date.now()}`)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const LatestLotoMania = async () => {
    try {
        const response = await axios(`${latestmania}${Date.now()}`)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}



export const LatestQuina = async () => {
    try {
        const response = await axios(`${latestquina}${Date.now()}`)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const ResultadoMegaSena = async () => {
    try {
        const response = await axios(Megalatest, { Headers: { 'Origin': Megalatest } })
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const GetBeforeConcurso = async(loteria,concurso) => {
    try {
        const response = await axios(`${concursosAnteriores}${loteria}/${concurso}`)
        return response.data;
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