
const mega = require('./allmega.json')


function atrasosCustom(arr, numero){
   return arr.reverse().slice(Math.max(arr.length-numero,0))
}

function filtersAllCustom(array, findDezena, periodo) {
    const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
    let atrasos = [];
    let sequencias = [];
    let dezena = findDezena;
    let dezenasEst = {
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
    return dezenasEst;
}



// console.log('atraso ', filtersAllCustom(mega, '11', 100));


function switchParImpar(numpar, numimpar) {
    let combinacoes = {
        equal: false,
        FourPTwoI: false,
        FourITwoP: false,
        FivePOneI: false,
        FiveIOneP: false,
        SixPZeroI: false,
        SixIZeroP: false,
    }
   if(numpar === 3 && numimpar === 3) combinacoes.equal = true;
   if(numpar === 4 && numimpar === 2) combinacoes.FourPTwoI = true;
   if(numpar === 2 && numimpar === 4) combinacoes.FourITwoP = true;
   if(numpar === 5 && numimpar === 1) combinacoes.FivePOneI = true;
   if(numpar === 1 && numimpar === 5) combinacoes.FiveIOneP = true;
   if(numpar === 6 && numimpar === 0) combinacoes.SixPZeroI = true;
   if(numpar === 0 && numimpar === 6) combinacoes.SixIZeroP = true;
    return combinacoes;
}


function countParImpar(array){
    let par = 0;
    let impar = 0;
    array.filter(num => {
        if(parseInt(num)%2===0) par++;
        else impar++;
    })
    return{
        par, impar
    }
}

function filterParImpar(array) {
    const arrayLength = array.length;
    let loterias = []
    let equal = []
    let FourPTwoI = []
    let FourITwoP = []
    let FivePOneI = []
    let FiveIOneP = []
    let SixPZeroI = []
    let SixIZeroP = []
    array.reverse().filter((elem, index) => {
        let { par, impar } = countParImpar(elem.dezenas);
        if (par === 3 && impar === 3) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            equal.push(data);
        }
        if (par === 4 && impar === 2) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            FourPTwoI.push(data);
        }
        if (par === 2 && impar === 4) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            FourITwoP.push(data);
        }
        if (par === 5 && impar === 1) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            FivePOneI.push(data);
        }
        if (par === 1 && impar === 5) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            FiveIOneP.push(data);
        }
        if (par === 6 && impar === 0) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            SixPZeroI.push(data);
        }
        if (par === 0 && impar === 6) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            SixIZeroP.push(data);
        }
        let data = {
            concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
            pares: par,
            impares: impar,
            equal: 0,
            FourPTwoI: 0,
            FourITwoP: 0,
            FivePOneI: 0,
            FiveIOneP: 0,
            SixPZeroI: 0,
            SixIZeroP: 0,
        }
        loterias.push(data);
    })

    let estatisticasLot = {
        equal: {
            porcentagem: (equal.length / arrayLength * 100).toPrecision(3),
            jogos: equal.length
        },
        FourPTwoI: {
            porcentagem: (FourPTwoI.length / arrayLength * 100).toPrecision(3),
            jogos: FourPTwoI.length
        },
        FourITwoP: {
            porcentagem: (FourITwoP.length / arrayLength * 100).toPrecision(3),
            jogos: FourITwoP.length
        },
        FivePOneI: {
            porcentagem: (FivePOneI.length / arrayLength * 100).toPrecision(3),
            jogos: FivePOneI.length
        },
        FiveIOneP: {
            porcentagem: (FiveIOneP.length / arrayLength * 100).toPrecision(3),
            jogos: FiveIOneP.length
        },
        SixPZeroI: {
            porcentagem: (SixPZeroI.length / arrayLength * 100).toPrecision(3),
            jogos: SixPZeroI.length
        },
        SixIZeroP: {
            porcentagem: (SixIZeroP.length / arrayLength * 100).toPrecision(3),
            jogos: SixIZeroP.length
        }
    }
    return estatisticasLot;
}


function EstatisticaSoma(array){
    let loteriaSoma = []
    let arraySoma = []
    array.reverse().filter((elem, index) => {

        let data = {
            consurso: elem.concurso,
            soma: elem.dezenas.reduce((a, b) => parseInt(a) + parseInt(b))
        }
        arraySoma.push(elem.dezenas.reduce((a, b) => parseInt(a) + parseInt(b)))
        loteriaSoma.push(data)
    })
    //return loteriaSoma;
    let somaAll = []
    loteriaSoma.forEach(element => {
        somaAll.push(element.soma)
    });
    console.log(somaAll.reduce((a, b) => parseInt(a) + parseInt(b)) / loteriaSoma.length);
}


console.log(EstatisticaSoma(mega));