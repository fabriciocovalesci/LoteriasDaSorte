
import cron from 'node-cron'

/*
Config cron

* * * * * *
| | | | | |
| | | | | day of week
| | | | month
| | | day of month
| | hour
| minute
second ( optional )


0 domingo
1 segunda
2 terça
3 quarta
4 quinta
5 sexta
6 sabado
7 domingo
*/

// retorna os dados de maneira automatica
const megaLatest =  cron.schedule('* 33 1 * * 3-7', () => {
    console.log('retorna os dados mais recente da loteria');
}, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
});

