// import
const { Telegraf } = require('telegraf'); // importing telegraf.js
var bot = new Telegraf('5917166848:AAEMA1MDWXaiS1TV8HjCyxvUA_hLDKqT4es'); 
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// const os = require('os');
let queryNo = 0;

// get function
function get(link){
    fetch(link, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())

    return response;
}

// ip check function
function isValidIP(ip) {
    const pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return pattern.test(ip);
}

// start
bot.start(ctx => ctx.reply(`
    Hi, I'm a simple bot made by MM Chessman
`));

//help
// bot.help(ctx => ctx.reply(`
//     You will get help when needed!
// `));

//again
// bot.command('again',(ctx) =>  {
//     ctx.reply('Click /again to see this message again!');
//     let mid = ctx.message.message_id;
//     let cid = ctx.chat.id;
//     bot.telegram.deleteMessage(cid, mid);
// });

// again2
// bot.hears('again', ctx => ctx.reply('Click /again to see this message again!'));

//sticker reply
// bot.on('sticker', ctx => ctx.reply('😁'));

// send IP

//location
// bot.command('mydetails', async ctx =>  {
//     const user = await fetch(`https://api.ipify.org/?format=json`);
//     const userData = await user.json();
//     let dip = userData.ip;

//     queryNo++;
//     console.clear();
//     console.log(queryNo);
//     const url = `https://ipwho.is/` + dip;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         if(data.city !== undefined)
//                 ctx.reply(`Your IP: `+data.ip+`\nCity: `+data.city+`\nRegion: `+data.region+`\nCountry: `+data.country+`\nContinent: `+data.continent);
//     } catch (error) {
//         console.error(error);
//         ctx.reply('Error while fetching location information.');
//     }
// });

bot.on('message', async ctx => {
    let ip = ctx.message.text;
    
    if(isValidIP(ip)){
        queryNo++;
        console.clear();
        console.log(queryNo);
        const userIP = ip;
        const url = `https://ipwho.is/` + userIP;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if(data.success === true)
                ctx.reply(`Location information for `+data.ip+`:\nCity: `+data.city+`\nRegion: `+data.region+`\nCountry: `+data.country+`\nContinent: `+data.continent);
        } catch (error) {
            console.error(error);
            ctx.reply('Error while fetching location information.');
        }
    }
});


bot.launch();