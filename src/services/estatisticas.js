

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

export const filterParImpar = (array) => {
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


export const filterParImparFacil = (array) => {
    const arrayLength = array.length;
    let loterias = []
    let equal = []
    let Combinada_1 = []
    let Combinada_2 = []
    let Combinada_3 = []
    let Combinada_4 = []
    let Combinada_5 = []
    let Combinada_6 = []
    let Combinada_7 = []
    array.reverse().filter((elem, index) => {
        let { par, impar } = countParImpar(elem.dezenas);
        if (par === 7 && impar === 8) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            equal.push(data);
        }
        if (par === 8 && impar === 7) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            Combinada_1.push(data);
        }
        if (par === 6 && impar === 9) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            Combinada_2.push(data);
        }
        if (par === 9 && impar === 6) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            Combinada_3.push(data);
        }
        if (par === 5 && impar === 10) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            Combinada_4.push(data);
        }
        if (par === 10 && impar === 5) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            Combinada_5.push(data);
        }
        if (par === 4 && impar === 11) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            Combinada_6.push(data);
        }
        if (par === 11 && impar === 4) {
            let data = {
                concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
                pares: par,
                impares: impar
            }
            Combinada_7.push(data);
        }
        let data = {
            concurso: elem.concurso < 10 ? "0" + String(elem.concurso) : String(elem.concurso),
            pares: par,
            impares: impar,
            equal: 0,
            Combinada_1: 0,
            Combinada_2:0,
            Combinada_3:0,
            Combinada_4:0,
            Combinada_5:0,
            Combinada_6:0,
            Combinada_7:0
        }
        loterias.push(data);
    })

    let estatisticasLot = {
        equal: {
            porcentagem: (equal.length / arrayLength * 100).toPrecision(3),
            jogos: equal.length
        },
        Combinada_1: {
            porcentagem: (Combinada_1.length / arrayLength * 100).toPrecision(3),
            jogos: Combinada_1.length
        },
        Combinada_2: {
            porcentagem: (Combinada_2.length / arrayLength * 100).toPrecision(3),
            jogos: Combinada_2.length
        },
        Combinada_3: {
            porcentagem: (Combinada_3.length / arrayLength * 100).toPrecision(3),
            jogos: Combinada_3.length
        },
        Combinada_4: {
            porcentagem: (Combinada_4.length / arrayLength * 100).toPrecision(3),
            jogos: Combinada_4.length
        },
        Combinada_5: {
            porcentagem: (Combinada_5.length / arrayLength * 100).toPrecision(3),
            jogos: Combinada_5.length
        },
        Combinada_6: {
            porcentagem: (Combinada_6.length / arrayLength * 100).toPrecision(3),
            jogos: Combinada_6.length
        },
        Combinada_7: {
            porcentagem: (Combinada_7.length / arrayLength * 100).toPrecision(3),
            jogos: Combinada_7.length
        }
    }
    return estatisticasLot;
}

export const EstatisticaSomaParImpar = (array) => {
    let loteriaSoma = []
    let arraySoma = []
    array.reverse().filter((elem, index) => {
        let { par, impar } = countParImpar(elem.dezenas);
        let data = {
            concurso: elem.concurso,
            soma: elem.dezenas.reduce((a, b) => parseInt(a) + parseInt(b)),
            par: par,
            impar: impar
        }
        arraySoma.push(elem.dezenas.reduce((a, b) => parseInt(a) + parseInt(b)))
        loteriaSoma.push(data)
    })
    return loteriaSoma;
    // let somaAll = []
    // loteriaSoma.forEach(element => {
    //     somaAll.push(element.soma)
    // });
    // somaAll.reduce((a, b) => parseInt(a) + parseInt(b)) / loteriaSoma.length;
    // return somaAll;
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

export const EstatisMegaSomaParImpar = async () =>{
    try {
        const allMega = await AllResultMega();
        let somaParImpar = EstatisticaSomaParImpar(allMega);
        console.log('=============somaParImpar=======================');
        console.log(somaParImpar);
        console.log('====================================');
        return somaParImpar;       
    } catch (error) {
        console.error(`ERROR get alll results mega ${error}`)
    }
};

export const EstatisMega = async () =>{
    try {
        const allMega = await AllResultMega();
        let somaParImpar = EstatisticaSomaParImpar(allMega);
        let percentSoma = filterParImpar(allMega);
        let dezenas = []
        const counts = {};
        allMega.filter(elem => dezenas.push(...elem.dezenas))
        dezenas.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        let ocorrencias = Object.entries(counts).sort((a,b) => b[1]-a[1])
        let estatisAtrasoSeq = []
        let dezenasMega = Array.from({length: 60}, (_, i) => i + 1);
        dezenasMega.forEach((element) => {
            if(element < 10){
                estatisAtrasoSeq.push(filtersAllCustom(allMega, "0"+element.toString()))
            }else{
                estatisAtrasoSeq.push(filtersAllCustom(allMega, element.toString()))
            }
        });
        return { 
            ocorrencias,
            somaParImpar,
            estatisAtrasoSeq,
            percentSoma
            };       
    } catch (error) {
        console.error(`ERROR get alll results mega ${error}`)
    }
};

export const EstatisFacil = async () =>{
    try {
        const allFacil = await AllResultFacil();
        // let dezenas = []
        // const counts = {};
        // allFacil.filter(elem => dezenas.push(...elem.dezenas))
        // dezenas.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        // let crescente = Object.entries(counts).sort((a,b) => b[1]-a[1])
        // return crescente;  
        let somaParImpar = EstatisticaSomaParImpar(allFacil);
        let percentSoma = filterParImparFacil(allFacil);
        let dezenas = []
        const counts = {};
        allFacil.filter(elem => dezenas.push(...elem.dezenas))
        dezenas.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        let ocorrencias = Object.entries(counts).sort((a,b) => b[1]-a[1])
        let estatisAtrasoSeq = []
        let dezenasMega = Array.from({length: 25}, (_, i) => i + 1);
        dezenasMega.forEach((element) => {
            if(element < 10){
                estatisAtrasoSeq.push(filtersAllCustom(allFacil, "0"+element.toString()))
            }else{
                estatisAtrasoSeq.push(filtersAllCustom(allFacil, element.toString()))
            }
        });
        return { 
            ocorrencias,
            somaParImpar,
            estatisAtrasoSeq,
            percentSoma
            };      
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

