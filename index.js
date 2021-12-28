

const mega = require('./Json/allmega.json')


function atrasosCustom(arr, numero){
   return arr.reverse().slice(Math.max(arr.length-numero,0))
}

export default function filtersAllCustom(array, findDezena, periodo) {
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

