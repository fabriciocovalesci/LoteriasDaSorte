

import {
    AllResultFacil,
    AllResultMania,
    AllResultMega,
    AllResultQuina
} from './index';


const EstatisMega = async () =>{
    try {
        const allMega = await AllResultMega();
        let dezenas = []
        const counts = {};
        allMega.filter(elem => dezenas.push(...elem.dezenas))
        dezenas.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        let crescente = Object.entries(counts).sort((a,b) => b[1]-a[1])
        return crescente;       
    } catch (error) {
        console.error(`ERROR get alll results mega ${error}`)
    }
};

export default EstatisMega;