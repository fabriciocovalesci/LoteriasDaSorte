import moment from 'moment';
import "moment/locale/pt-br"
moment.locale('pt-br');


function convertToInt(array) {
    let arr = array.map(i => Number(i));
    return arr;
}

function countParImpar(arr) {
    let par = 0;
    let impar = 0;
    arr.forEach(element => {
        if (element % 2 === 0) par++
        else if (element % 2 !== 0) impar++
    });
    return {
        par, impar
    }
}


const isPrime = (num) => {
    for (let i = 2; i < num; i++)
        if (num % i === 0) {
            return false;
        }
    return num > 1;
}


function findPrime(array) {
    let primos = []
    array.forEach(element => {
        if (isPrime(parseInt(element))) {
            primos.push(element)
        }
    })
    return primos
}

export function sortObject(obj) {
    return Object.keys(obj)
        .sort((c, b) => {
            return obj[b] - obj[c]
        })
        .reduce((acc, cur) => {
            let o = {}
            o[cur] = obj[cur]
            acc.push(o)
            return acc
        }, [])
}



function randomByArray(array, tam) {
    let selecionado = []
    for (let index = 0; index < array.length; index++) {
        if (selecionado.length === tam) break;
        let indice = Math.floor(Math.random() * array.length)
        if (!selecionado.includes(array[indice])) {
            selecionado.push(array[indice])
        }
    }
    return selecionado;
}

export function DezenasMaisMenosSorteadas(concursosAnteriores, quantDez) {
    const quantMax = Math.abs(quantDez - 5)
    let menosSorteados = sortObject(countDezenasByConcurso(concursosAnteriores)).slice(15, 25)
    let maisSorteados = sortObject(countDezenasByConcurso(concursosAnteriores)).slice(0, 15)
    let result = randomByArray(menosSorteados, 5).concat(randomByArray(maisSorteados, quantMax))
    while (result.length !== quantDez) {
        result = randomByArray(menosSorteados, 5).concat(randomByArray(maisSorteados, quantMax))
    }
    return result
}

export const filterdataMesAno = (array, mes, ano) => {
    let filter = []
    array.filter((jogos) => {
        if (moment(jogos.data, "DD/MM/YYYY").month() == mes && moment(jogos.data, "DD/MM/YYYY").year() == ano) {
            let data = {
                'data': jogos.data,
                'concurso': jogos.concurso,
                'dezenas': convertToInt(jogos.dezenas),
                'soma': convertToInt(jogos.dezenas).reduce((total, numero) => total + numero, 0),
                'pares': countParImpar(convertToInt(jogos.dezenas)).par,
                'impar': countParImpar(convertToInt(jogos.dezenas)).impar,
                'primos': findPrime(jogos.dezenas)
            }
            filter.push(data)
        }
    })
    return filter;
}

export const filterdataAno = (array, ano) => {
    let filterYear = []
    array.filter((jogos) => {
        if (moment(jogos.data, "DD/MM/YYYY").year() == ano) {
            let data = {
                'data': jogos.data,
                'concurso': jogos.concurso,
                'dezenas': convertToInt(jogos.dezenas),
                'soma': convertToInt(jogos.dezenas).reduce((total, numero) => total + numero, 0),
                'pares': countParImpar(convertToInt(jogos.dezenas)).par,
                'impar': countParImpar(convertToInt(jogos.dezenas)).impar,
                'primos': findPrime(jogos.dezenas)
            }
            filterYear.push(data)
        }
    })
    return filterYear;
}

export function countDezenasByAno(array, ano) {
    const counts = {};
    filterdataAno(array, ano).forEach((elem, index) => {
        elem.dezenas.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    })
    return counts
}

export function countDezenasByMesAno(array, mes, ano) {
    const counts = {};
    filterdataMesAno(array, mes, ano).forEach((elem, index) => {
        elem.dezenas.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    })
    return counts
}

export function getLatestMeses(array, mes, ano) {
    let meses = Array(mes).fill(null).map((_, i) => Math.abs(i - 11));
    let filters = []
    for (let index = 0; index < meses.length; index++) {
        const element = meses[index];
        let data = {
            "mes": moment().month(element).format("MMMM"),
            "dezena": sortObject(countDezenasByMesAno(array, element, ano))[0]
        }
        filters.push(data)
    }
    return filters
}   