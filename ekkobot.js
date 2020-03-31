/*————EKKOBOT - TO DO LIST 
  - create database leaderboard on sqlite
  - push new row if user not added yet when mastery role gets added
  - refresh command to update mastery
  - leaderboard command in embed
  - quotes with FetchMessages() and something like collection.find(3) — depricated
  - jungle update,
  - search by role id instead of name
*/

const Discord = require("discord.js");
const client = new Discord.Client({ autoReconnect: true });
const config = require("./config.json");
const champlist = require("./championlist.json");
var apiai = require('apiai');
var app = apiai(config.Dialogflow);

/*
const mastery = require("./mastery.json");
const profile = require("./profile.json");
const loluser = require("./loluser.json");
const runepage = require("./runepage.json");
const status = require("./status.json");
*/
const fs = require("fs");
const async = require('async');
const request = require('request');
const shortid = require('shortid');
let google = require('googleapis');
const schedule = require('node-schedule');
const riotAPIKey = "RGAPI-9d88a4a8-a832-49df-9891-f068e513595f";
const twitchClientID = process.env.TWITCH_CLIENT_ID;
const snekfetch = require('snekfetch');
const fetch = require('node-fetch');
const streamChannel = "billboard";
const iso3166 = require("iso-3166-2"); //country codes
const botCenter =  '336486260300447744'  //botcenter
const matchupChan = '543144937537929244'
//const Canvas = require('canvas');
// const SQLite = require("better-sqlite3");
// const sql = new SQLite('./ekkomains.sqlite');
var GoogleSpreadsheet = require('google-spreadsheet');
 
// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('2PACX-1vRXtMGLgYOogM6uBhyFY3DbfRKZm4kSERd8_TnpUfjh7BQMVO4oCTYEB10DO6DtMsGL4zQDW0H-2x0O');
var sheet;



//momentJS (time converter for uptime)
var moment = require('moment');
moment().format();






client.on("ready", () => {

  

//scores
// const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
// if (!table['count(*)']) {
//   sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
//   sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
//   sql.pragma("synchronous = 1");
//   sql.pragma("journal_mode = wal");
// }

// client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
// client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");


  /*automatically purges chat
  var j = schedule.scheduleJob({hour: 02, minute: 14}, function() {
    const chan = client.channels.find('id', '342734341782372352');
    let messagecount = parseInt(20);
    chan.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
    chan.send("purged the channel");
  });*/

  const chan = client.channels.find('id', '377258752635699200');
  chan.send("Reboot successful.");

  let streamOnline = "offline";

  function twitchSchedule(streamOnline) {
    let channelNameSchedule = "ninja";
    const twitchAPISchedule = 'https://api.twitch.tv/kraken/streams?client_id=' + twitchClientID + '&channel=' + channelNameSchedule;
    snekfetch.get(twitchAPISchedule).then(o => {

      let body4200 = o.body
      console.log(streamOnline);

      if (streamOnline == "offline") {
        if (body4200._total == '1') {
          let channelNameSchedule = "ninja";
          const chan2 = client.channels.find('id', '377258752635699200');
          chan2.send("**" + channelNameSchedule + "**" + " is live playing **" + body4200.streams[0].game + "** for **" + body4200.streams[0].viewers + " viewers!**\n\nhttps://twitch.tv/" + channelNameSchedule);
          streamOnline = "online"
          console.log(streamOnline);
        }
      }

      else if (streamOnline === "online") {
        if (body4200._total == '0') {
          var streamOnline = "offline"
        }
        else {
          return
        }
      }

    })
  }
  setInterval(twitchSchedule, 20000);



});







//welcome script
client.on('guildMemberAdd', member => {
  member.addRole(member.guild.roles.find("name", "muted"));
  const channel = member.guild.channels.find('name', 'welcome');
  if (!channel) return;
  channel.send(`Welcome to the Ekkomains Discord, ${member}!\nPlease request your desired roles with **.help**\n\n**Please read the rules here: <#369131046555353088> and type .accept in <#336486260300447744> if you agree with them\nor you won't be able to type in other channels!**\n\nGet ranked-ready in season 9 in <#245662195189415936> & <#245672371829211146>`);


})



client.on("message",  message => {

  //playground
  if (message.author.id === config.ownerID) {
    if (Math.random() < .10) {
      message.react(message.guild.emojis.get('418191440057860096'));
    }
  }

  if (message.content.startsWith(config.prefix+'vs')) {
    if (message.channel.id  === botCenter || message.channel.id === matchupChan) {
    let input20 = message.content.split(" ").slice(1);
    var champInput = input20.join(" ");
    champInputCap = champInput.charAt(0).toUpperCase() + champInput.substr(1);
    champOutput = "404"

    switch (champInputCap) {
      case "Aatrox":
        champOutput = "0";
        break;
      case "Ahri":
        champOutput = "1";
        break;
      case "Akali":
        champOutput = "2";
        break;
      case "Anivia":
        champOutput = "3";
        break;
      case "Annie":
        champOutput = "4";
        break;
      case "Aurelion Sol":
        champOutput = "5";
        break;
      case "Azir":
        champOutput = "6";
        break;
      case "Brand":
        champOutput = "7";
        break;
      case "Cassiopeia":
        champOutput = "8";
        break;
      case "Chogath":
        champOutput = "9";
        break;
      case "Corki":
        champOutput = "10";
        break;
        case "Diana":
        champOutput = "11";
        break;
        case "Ekko":
        champOutput = "12";
        break;
        case "Ezreal":
        champOutput = "13";
        break;
        case "Fiddlesticks":
        champOutput = "14";
        break;
        case "Fiora":
        champOutput = "15";
        break;
        case "Fizz":
        champOutput = "16";
        break;
        case "Galio":
        champOutput = "17";
        break;
        case "Gangplank":
        champOutput = "18";
        break;
        case "Gnar":
        champOutput = "19";
        break;
        case "Gragas":
        champOutput = "20";
        break;
        case "Heimerdinger":
        champOutput = "21";
        break;
        case "Illaoi":
        champOutput = "22";
        break;
        case "Irelia":
        champOutput = "23";
        break;
        case "Jayce":
        champOutput = "24";
        break;
        case "Karma":
        champOutput = "25";
        break;
        case "Karthus":
        champOutput = "26";
        break;
        case "Katarina":
        champOutput = "27";
        break;
        case "Kassadin":
        champOutput = "28";
        break;
        case "Kennen":
        champOutput = "29";
        break;
        case "Kled":
        champOutput = "30";
        break;
        case "Leblanc":
        champOutput = "31";
        break;
        case "Lissandra":
        champOutput = "32";
        break;
        case "Lucian":
        champOutput = "33";
        break;
        case "Lulu":
        champOutput = "34";
        break;
        case "Lux":
        champOutput = "35";
        break;
        case "Malzahar":
        champOutput = "36";
        break;
        case "Morgana":
        champOutput = "37";
        break;
        case "Nautilus":
        champOutput = "38";
        break;
        case "Neeko":
        champOutput = "39";
        break;
        case "Orianna":
        champOutput = "40";
        break;
        case "Pantheon":
        champOutput = "41";
        break;
        case "Quinn":
        champOutput = "42";
        break;
        case "Riven":
        champOutput = "43";
        break;
        case "Ryze":
        champOutput = "44";
        break;
        case "Swain":
        champOutput = "45";
        break;
        case "Sylas":
        champOutput = "46";
        break;
        case "Syndra":
        champOutput = "47";
        break;
        case "Taliyah":
        champOutput = "48";
        break;
        case "Talon":
        champOutput = "49";
        break;
        case "Teemo ":
        champOutput = "50";
        break;
        case "Twisted Fate":
        champOutput = "51";
        break;
        case "Varus":
        champOutput = "52";
        break;
        case "Veigar":
        champOutput = "53";
        break;
        case "Velkoz":
        champOutput = "54";
        break;
        case "Viktor":
        champOutput = "55";
        break;
        case "Vladimir":
        champOutput = "56";
        break;
        case "Xerath":
        champOutput = "57";
        break;
        case "Yasuo":
        champOutput = "58";
        break;
        case "Zed":
        champOutput = "59";
        break;
        case "Ziggs":
        champOutput = "60";
        break;
        case "Zilean":
        champOutput = "61";
        break;
        case "Zoe":
        champOutput = "62";
        break;
        case "Zyra":
        champOutput = "63";
        break;
    }
    
    const sheetUrl = 'http://gsx2json.com/api?id=1Sa75l11BPLdHXIHPxuQNzWW0M26nSKdZVoe5al2gAZQ' 
     snekfetch.get(sheetUrl).then(lo => {

      let champInfo = lo.body.columns
      console.log(lo +champInputCap+champOutput+ " gewoon zomaar");
      if(champOutput=="404") {
        message.channel.send("This champion hasn't been added to the database or you spelled it incorrectly.")
      } else {
      message.channel.send("**Champion:** "+champInfo.matchup[champOutput]+"\n**Difficulty: **" +champInfo.difficulty[champOutput]+"\n**When to fight: **"+ champInfo.whentofight[champOutput]+"\n**Keystone: **"+champInfo.keystone[champOutput]+"\n**Early build path: **"+ champInfo.earlybuildpath[champOutput]+"\n\n**Tips:** "+champInfo.tips[champOutput].replace( /(\.\s+)/g, "$1\n"))
    }
  })
    } else {
      message.channel.send('Please keep Ekkomains spam free. \nUse this command in <#543144937537929244> or <#336486260300447744>.')
    }
}
  
  if (message.content.includes('dab')) {
    message.react(message.guild.emojis.get('430039460734828544'));
  }
  if (message.content.includes('oof')) {
    message.react(message.guild.emojis.get('530827438817542144'));
  }


  if (message.content.includes('pog')) {
    message.react(message.guild.emojis.get('418191440057860096'));
  }

  if (message.content.includes('POG')) {
    message.react(message.guild.emojis.get('418191440057860096'));
  }

  if (message.content.includes('Pog')) {
    message.react(message.guild.emojis.get('418191440057860096'));
  }

  if (message.content.includes('YEET')) {
    message.react(message.guild.emojis.get('522941246663163908'));
  }

  if (message.content.includes('yeet')) {
    message.react(message.guild.emojis.get('522941246663163908'));
  }

  if (message.content.includes('Yeet')) {
    message.react(message.guild.emojis.get('522941246663163908'));
  }
  //artificial intelligence ai
  if((message.cleanContent.startsWith("@" + client.user.username) || message.channel.type == 'dm') && client.user.id != message.author.id){
    var mess = remove(client.user.username, message.cleanContent);
    //console.log(mess);
    const user = message.author.id;
    var promise = new Promise(function(resolve, reject) {
        var request = app.textRequest(mess, {
            sessionId: user
        });
        request.on('response', function(response) {
            console.log(response);
            var rep = response.result.fulfillment.speech;
            resolve(rep);
        });

        request.on('error', function(error) {
            resolve(null);
        });

        request.end();
    });

    (async function(){
        var result = await promise;
        if(result){
            message.reply(result);
        } else{
            message.reply("nothing here");
        }
    }());

}





  if (message.content === "F") {
    message.channel.send({ files: ['F.jpg'] })
  }
  if (message.content === "good bot") {
    message.channel.send('<:EkkoHeart:395321646883405824>');
  }
  if (message.content === "bad bot") {
    message.channel.send('no u');
  }

  if (message.content === "???") {
    message.channel.send({ files: ['question.jpg'] })
  }

  if (message.content === "ehh") {
    if (message.author.id !== config.ownerID) return;
    message.delete()
    message.channel.send({ files: ['ehh.jpg'] })
  }

  //end of playground

  //rewrite of point system
  // if (message.guild) {
  //   score = client.getScore.get(message.author.id, message.guild.id);
  //   if (!score) {
  //     score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
  //   }
  //   score.points++;
  //   const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
  //   if(score.level < curLevel) {
  //     score.level++;
  //     message.reply(`Yeet, you've leveled up to level **${curLevel}**!`);
  //   }
  //   client.setScore.run(score);
  // }
  // if (message.content.indexOf(config.prefix) !== 0) return;
 /*
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();*/

  const channel2 = client.channels.find('id', '336486260300447744');
  if (!channel2) return;

  if (message.author.bot) return; // Ignore bots.
  if (message.channel.type === "dm") return; //ignore DMs

  if (message.isMentioned(client.users.get('95998422150053888'))) {
    message.channel.send("Please dont <@95998422150053888>")
  }

  if (message.isMentioned('245660967357251585')) {
    message.channel.send("Summoning moderators, please stand by.");
  }

  if (!message.content.startsWith(config.prefix)) return;

  if (!message.content.startsWith(config.prefix) || message.author.bot) return;



  // if(message.content.startsWith(config.prefix+"ldb")) {
  //   const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
 
  // const embed = new Discord.RichEmbed()
  //   .setTitle("Leaderboard")
  //   .setAuthor(client.user.username, client.user.avatarURL)
  //   .setDescription("Top 10 activity leaderboard")
  //   .setColor(0x00AE86);
 
  // for(const data of top10) {
  //   embed.addField(client.users.get(data.user).tag, `${data.points} points (lev el ${data.level})`);
  // }
  // return message.channel.send({embed});
  // }

  if(message.content.startsWith(config.prefix+"give")) {
    if (message.author.id !== config.ownerID) return;
   
    const user = message.mentions.users.first() || client.users.get(args[0]);
    if(!user) return message.reply("You must mention someone or give their ID!");
   
    const pointsToAdd = parseInt(args[1], 10);
    if(!pointsToAdd) return message.reply("You didn't tell me how many points to give...")
   
    let userscore = client.getScore.get(user.id, message.guild.id);
    if (!userscore) {
      userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 }
    }
    userscore.points += pointsToAdd;
   
    let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
    userscore.level = userLevel;

    client.setScore.run(userscore);
   
    return message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userscore.points} points.`);
  }
  //icon tests
  if (message.content.startsWith(config.prefix + "icon")) {
    var inputUser = message.content.toLowerCase()
    var capital = inputUser.charAt(6).toUpperCase() + inputUser.slice(7)
    message.channel.send({ files: ['./data/9.2.1/img/champion/' + capital + '.png'] })
  }
  if (message.content.startsWith(config.prefix + "kiko")) {
    message.channel.send("https://i.imgur.com/xhof4yG.png");
  }

  if (message.content.startsWith(config.prefix + "avatar")) {
    message.channel.send(message.author.displayAvatarURL)
  }

  if (message.content.startsWith(config.prefix + "dragontool")) {
    var input = message.content.split(" ").splice(1)
    if (input == '') return
    var inputUser = message.content.toLowerCase()
    var capital = inputUser.charAt(10).toUpperCase() + inputUser.slice(11)

    champIcon = "http://ddragon.leagueoflegends.com/cdn/9.2.1/img/champion/" + capital + ".png"

    message.channel.send(champIcon);
  }

  
  if (message.content.startsWith(config.prefix + "accept")) {

    let role3 = message.guild.roles.find("name", "muted");
    let member = message.member;

    if (message.member.roles.has(role3.id)) {
      member.removeRole(role3).catch(console.error);
      message.channel.send("You've accepted the rules.\nYou can now post in all channels. Enjoy your stay!");
    }
    else {
      message.channel.send("You have already accepted the rules, you silly billy!");
    }
  }


  // if (message.content.startsWith(config.prefix + "champion")) {
  //   var input = message.content.split(" ").splice(1)
  //   if (input == '') return
  //   var inputUser = message.content.toLowerCase()
  //   var capital = inputUser.charAt(10).toUpperCase() + inputUser.slice(11)

  //   champIcon = "http://ddragon.leagueoflegends.com/cdn/9.2.1/img/champion/" + capital + ".png"

  //   var url = "http://ddragon.leagueoflegends.com/cdn/9.2.1/data/en_US/champion.json"

  //   request({
  //     url: url,
  //     json: true
  //   }, function (error, response, body) {

  //     var returnID = body.data[capital].key
  //     console.log(returnID)
  //     var urlchampgg = "http://api.champion.gg/v2/champions/" + returnID + "?&limit=1&?sort=playRate-desc&api_key=99e45ea10efb88854d7e76589f9f8b1f"

  //     request({
  //       url: urlchampgg,
  //       json: true
  //     }, function (error, response, output) {
  //       console.log(output['0'])
  //       if (output['1'] == null) {

  //         //calculations
  //         var firstWinRate = output['0'].winRate.toString()
  //         var secondWinRate = firstWinRate * 100
  //         var thirdWinRate = (Math.round(secondWinRate * 100) / 100).toFixed(2);;

  //         var firstPlayRate = output['0'].playRate.toString()
  //         var secondPlayRate = firstPlayRate * 100
  //         var thirdPlayRate = (Math.round(secondPlayRate * 100) / 100).toFixed(2);;

  //         var firstBanRate = output['0'].banRate.toString()
  //         var secondBanRate = firstBanRate * 100
  //         var thirdBanRate = (Math.round(secondBanRate * 100) / 100).toFixed(2);;


  //         const embed = new Discord.RichEmbed()
  //           .setAuthor(message.author.username, message.author.displayAvatarURL)
  //           .setTitle(capital + " " + body.data[capital].title)

  //           .addField("Champion class: ", body.data[capital].tags[0] + ", " + body.data[capital].tags[1])
  //           .setColor(0x00AE86)
  //           .setThumbnail(champIcon)

  //           .addField("Winrate", thirdWinRate + "%", true)
  //           .addField("Pickrate", thirdPlayRate + "%", true)
  //           .addField("Banrate", thirdBanRate + "%", true)
  //           .addField("Main role", output[0].role, true)
  //           .addField("—————————————", ".")
  //           .addField("Health", body.data[capital].stats.hp, true)
  //           .addField("Attack damage", body.data[capital].stats.attackdamage, true)
  //           .addField("Health regen", body.data[capital].stats.hpregen, true)
  //           .addField("Attack speed", body.data[capital].stats.attackspeedperlevel, true)
  //           .addField("Mana", body.data[capital].stats.mp, true)
  //           .addField("Armor", body.data[capital].stats.armor, true)
  //           .addField("Mana regen", body.data[capital].stats.mpregen, true)
  //           .addField("Magic resist", body.data[capital].stats.spellblock, true)
  //           .addField("Autoattack range", body.data[capital].stats.attackrange, true)
  //           .addField("Movement speed", body.data[capital].stats.movespeed, true)
  //           .setTimestamp()
  //         message.channel.send({ embed });

  //       } else if ((output['0'].playRate) < (output['1'].playRate)) {
  //         var firstWinRate = output['1'].winRate.toString()
  //         var secondWinRate = firstWinRate * 100
  //         var thirdWinRate = (Math.round(secondWinRate * 100) / 100).toFixed(2);;

  //         var firstPlayRate = output['1'].playRate.toString()
  //         var secondPlayRate = firstPlayRate * 100
  //         var thirdPlayRate = (Math.round(secondPlayRate * 100) / 100).toFixed(2);;

  //         var firstBanRate = output['1'].banRate.toString()
  //         var secondBanRate = firstBanRate * 100
  //         var thirdBanRate = (Math.round(secondBanRate * 100) / 100).toFixed(2);;


  //         const embed = new Discord.RichEmbed()
  //           .setAuthor(message.author.username, message.author.displayAvatarURL)
  //           .setTitle(capital)
  //           .setDescription(body.data[capital].title)
  //           .addField("CHAMPION CLASS: ", body.data[capital].tags[1] + ", " + body.data[capital].tags[1])
  //           .setColor(0x00AE86)
  //           .setThumbnail(champIcon)

  //           .addField("WINRATE", thirdWinRate + "%", true)
  //           .addField("PICKRATE", thirdPlayRate + "%", true)
  //           .addField("BANRATE", thirdBanRate + "%", true)
  //           .addField("MAIN ROLE", output[1].role, true)
  //           .addBlankField()
  //           .addField("HEALTH", body.data[capital].stats.hp, true)
  //           .addField("ATTACK DAMAGE", body.data[capital].stats.attackdamage, true)
  //           .addField("HEALTH REGEN", body.data[capital].stats.hpregen, true)
  //           .addField("ATTACK SPEED", body.data[capital].stats.attackspeedperlevel, true)
  //           .addField("MANA", body.data[capital].stats.mp, true)
  //           .addField("ARMOR", body.data[capital].stats.armor, true)
  //           .addField("MANA REGEN", body.data[capital].stats.mpregen, true)
  //           .addField("MAGIC RESIST", body.data[capital].stats.spellblock, true)
  //           .addField("AUTOATTACK RANGE", body.data[capital].stats.attackrange, true)
  //           .addField("MOVEMENT SPEED", body.data[capital].stats.movespeed, true)
  //           .setTimestamp()
  //         message.channel.send({ embed });
  //       }
  //       else {
  //         var firstWinRate = output['0'].winRate.toString()
  //         var secondWinRate = firstWinRate * 100
  //         var thirdWinRate = (Math.round(secondWinRate * 100) / 100).toFixed(2);;

  //         var firstPlayRate = output['0'].playRate.toString()
  //         var secondPlayRate = firstPlayRate * 100
  //         var thirdPlayRate = (Math.round(secondPlayRate * 100) / 100).toFixed(2);;

  //         var firstBanRate = output['0'].banRate.toString()
  //         var secondBanRate = firstBanRate * 100
  //         var thirdBanRate = (Math.round(secondBanRate * 100) / 100).toFixed(2);;


  //         const embed = new Discord.RichEmbed()
  //           .setAuthor(message.author.username, message.author.displayAvatarURL)
  //           .setTitle(capital)
  //           .setDescription(body.data[capital].title)
  //           .addField("CHAMPION CLASS: ", body.data[capital].tags[0] + ", " + body.data[capital].tags[1])
  //           .setColor(0x00AE86)
  //           .setThumbnail(champIcon)

  //           .addField("WINRATE", thirdWinRate + "%", true)
  //           .addField("PICKRATE", thirdPlayRate + "%", true)
  //           .addField("BANRATE", thirdBanRate + "%", true)
  //           .addField("MAIN ROLE", output[0].role, true)
  //           .addBlankField()
  //           .addField("HEALTH", body.data[capital].stats.hp, true)
  //           .addField("ATTACK DAMAGE", body.data[capital].stats.attackdamage, true)
  //           .addField("HEALTH REGEN", body.data[capital].stats.hpregen, true)
  //           .addField("ATTACK SPEED", body.data[capital].stats.attackspeedperlevel, true)
  //           .addField("MANA", body.data[capital].stats.mp, true)
  //           .addField("ARMOR", body.data[capital].stats.armor, true)
  //           .addField("MANA REGEN", body.data[capital].stats.mpregen, true)
  //           .addField("MAGIC RESIST", body.data[capital].stats.spellblock, true)
  //           .addField("AUTOATTACK RANGE", body.data[capital].stats.attackrange, true)
  //           .addField("MOVEMENT SPEED", body.data[capital].stats.movespeed, true)
  //           .setTimestamp()
  //         message.channel.send({ embed });
  //       }

  //     })
  //   })
  // }


  //opgg
  if (message.content.startsWith(config.prefix + "opgg")) {
    let region = message.content.split(" ").splice(1, 1)
    let usernameInput = message.content.split(" ").splice(2)
    let usernameOutput = usernameInput.join("");
    let url = "https://" + region + ".op.gg/summoner/userName=" + usernameOutput

    message.channel.send(url)
  }
  //role remover
  if (message.content.startsWith(config.prefix + "remove role")) {
    let input = message.content.split(" ").slice(2);
    let output = input.join(" ");
    let role = message.guild.roles.find("name", output);
    if (!role) return message.channel.send("This role doesn't exist.\nKeep in mind that roles are case sensitive!");
    let member = message.member;

    if (message.member.roles.has(role.id)) {
      member.removeRole(role).catch(console.error);
      message.channel.send("Removed the following role: " + role);
    }
    else {
      message.channel.send("You don't have this role!");
    }
  }

  if (message.content.startsWith(config.prefix + "removerole")) {
    let input = message.content.split(" ").slice(1);
    let output = input.join(" ");
    let role = message.guild.roles.find("name", output);
    if (!role) return message.channel.send("This role doesn't exist.\nKeep in mind that roles are case sensitive!");
    let member = message.member;

    if (message.member.roles.has(role.id)) {
      member.removeRole(role).catch(console.error);
      message.channel.send("Removed the following role: " + role);
    }
    else {
      message.channel.send("You don't have this role!");
    }
  }

  if (message.content.startsWith(config.prefix + "roll")) {
    
    if (message.channel.id  === botCenter) {
     
     
    var ekkoSkins = ['Base skin', 'Sandstorm Ekko', 'Academy Ekko', 'Project: Ekko', 'Trick or Treat Ekko', 'SKT T1 Ekko'];
    var ekkoChromasSandstorm = ['Citrine', 'Obsidian', 'Pearl', 'Peridot', 'Rose Quartz', 'Sandstone', 'Tanzanite', 'No chroma'];
    var ekkoChromasToT = ['Amethyst', 'Emerald', 'Golden', 'Obsidian', 'Rose Quartz', 'Ruby', 'No chroma'];
    var randSkin = ekkoSkins[Math.floor(Math.random() * ekkoSkins.length)];
    if (randSkin === 'Sandstorm Ekko') {
      var randChromaSandstorm = ekkoChromasSandstorm[Math.floor(Math.random() * ekkoChromasSandstorm.length)];
      message.channel.send("**Skin: **" + randSkin + "\n**Chroma: **" + randChromaSandstorm);
    } else if (randSkin === 'Trick or Treat Ekko') {
      var randChromaToT = ekkoChromasToT[Math.floor(Math.random() * ekkoChromasToT.length)];
      message.channel.send("**Skin: **" + randSkin + "\n**Chroma:** " + randChromaToT);
    } else {
      message.channel.send("**Skin: **" + randSkin);
    }
  } else {
    message.channel.send('Please keep Ekkomains spam free. \nUse this command in <#336486260300447744>.')
  }
}}



 
  //connect4
  if (message.content.startsWith(config.prefix + "connect4")) {
    let player1 = message.content.split(" ").slice(1, 2)
    let player2 = message.content.split(" ").slice(2)
    if (player1 == "" || player2 == "") {
      message.channel.send("Please add to players like so: .connect4 @Jordy" + "<:Thinking_Ekko:334058993272094720>")
    }

    else {

      message.channel.send("Match started" + "\nPlayer 1: " + player1 + "\nPlayer2: " + player2 +
        "\n\n" + "\x09" + "A" + "\x09\x20" + "B" + "\x09" + "C" + "\x09\x20" + "D" + "\x09\x20" + "E" + "\x09" + "F" + "\x09\x20" + "G\n" +
        "1  ⚪⚪⚪⚪⚪⚪⚪\n" +
        "2 ⚪⚪⚪⚪⚪⚪⚪\n" +
        "3 ⚪⚪⚪⚪⚪⚪⚪\n" +
        "4 ⚪⚪⚪⚪⚪⚪⚪\n" +
        "5 ⚪⚪⚪⚪⚪⚪⚪\n" +
        "6 ⚪⚪⚪⚪⚪⚪⚪");
    }

    message.channel.fetchMessages({ limit: 2 })
      .then(messages => message.channel.send(messages))
      .catch(console.error);
  }

  if (message.content.startsWith(config.prefix + "trump")) {
    const trumpAPI = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';
    snekfetch.get(trumpAPI).then(s => {
      message.channel.send("```" + s.body.message + "```");
    })
  }



  if (message.content.startsWith(config.prefix + "nasa")) {
    const nasaAPI = 'https://api.nasa.gov/planetary/apod?api_key=FLJ0bMYJK7KGw2U740w9jFDjXYAfQQuQL9zaFYRL';
    snekfetch.get(nasaAPI).then(u => {
      message.channel.send("Current astronomy picture of the day:\n\n**" + u.body.title + "**", {
        file: u.body.hdurl
      })
    })
  }
/*
  if (message.content.startsWith(config.prefix + "canvastest")) {

    const applyText = (canvas, text) => {
      const ctx = canvas.getContext('2d');

      // Declare a base size of the font
      let fontSize = 70;

      do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
      } while (ctx.measureText(text).width > canvas.width - 300);

      // Return the result to use in the actual canvas
      return ctx.font;
    };

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./wallpaper.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);


    // Slightly smaller text placed above the member's display name
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = '1';
    ctx.font = 'bold 35px times-new-roman';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Gold 1 100 LP\nMastery 7\n1.2M points | EUW', canvas.width / 2.5, canvas.height / 3.5);
    ctx.strokeText('Gold 1 100 LP\nMastery 7\n1.2M points | EUW', canvas.width / 2.5, canvas.height / 3.5);

    // Assign the decided font to the canvas
    ctx.strokeStyle = '#000000',
      ctx.lineWidth = '1';
    ctx.font = "bold 28px comic-sans-ms";
    ctx.fillStyle = '#ffffff';
    ctx.strokeText(message.author.username, canvas.width / 2.5, canvas.height / 1.2);
    ctx.fillText(message.author.username, canvas.width / 2.5, canvas.height / 1.2);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const { body: buffer } = await snekfetch.get(message.author.displayAvatarURL);
    const avatar = await Canvas.loadImage(buffer);
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

    message.channel.send(attachment);

  }*/
  //spreadsheet matchups

  if (message.content.startsWith(config.prefix + "matchup")) {
    message.channel.send("https://docs.google.com/spreadsheets/d/1Sa75l11BPLdHXIHPxuQNzWW0M26nSKdZVoe5al2gAZQ/edit?usp=sharing");

  }


  //Twitch stream notifier
  if (message.content.startsWith(config.prefix + "twitch")) {

    let channelName = message.content.split(" ").slice(1, 2)[0];
    const twitchAPI = 'https://api.twitch.tv/kraken/streams?client_id=' + twitchClientID + '&channel=' + channelName;
    snekfetch.get(twitchAPI).then(o => {
      let body420 = o.body

      if (body420._total == '0') {
        message.channel.send(channelName + " is offline.")
      } else if (body420._total == '1') {
        message.channel.send("**" + channelName + "**" + " is live playing **" + body420.streams[0].game + "** for **" + body420.streams[0].viewers + " viewers!**\n\nhttps://twitch.tv/" + channelName);
      } else {
        message.channel.send("This Twitch channel doesn't exist.");
      }
    })
  }

  //linking
  if (message.content.startsWith(config.prefix + "link")) {
    var randomID = shortid.generate();
    message.channel.send("Rename a runepage to " + randomID);
    fs.writeFileSync("./runepage.json", JSON.stringify(randomID), (err) => console.error);
  }

  //repeater
  if (message.content.startsWith(config.prefix + "me")) {
    if (message.author.id !== config.ownerID) return;
    let input = message.content.split(" ").slice(1);
    var output = input.join(" ");
    message.delete()
    message.channel.send(output);
  }

  //cats
  if (message.content.startsWith(config.prefix + "cat")) {
    if (message.channel.id  === botCenter) {
    request({
      url: "http://edgecats.net/random",
      json: true
    }, function (error, response, body) {
      message.channel.send(body);
    })
  } else {
    message.channel.send('Please keep Ekkomains spam free. \nUse this command in <#336486260300447744>.')
  }
}



  //reacts to message with emoji
  if (message.content.startsWith(config.prefix + "react")) {
    if (message.author.id !== config.ownerID) return;
    let input = message.content.split(" ").slice(1);
    var emoji = input.join(" ");
    message.react(emoji);
  }

  //wiki
  if (message.content.startsWith(config.prefix + "wiki")) {
    let input = message.content.split(" ").slice(1);
    var output = input.join("_");
    message.channel.send("http://leagueoflegends.wikia.com/wiki/" + output);
  }

  //rswiki
  if (message.content.startsWith(config.prefix + "rs")) {
    let input = message.content.split(" ").slice(1);
    var output = input.join("_");
    message.channel.send("http://oldschoolrunescape.wikia.com/wiki/" + output);
  }

  //minecraft
  if (message.content.startsWith(config.prefix + "mc")) {
    let input = message.content.split(" ").slice(1);
    var output = input.join("_");
    message.channel.send("https://minecraft.gamepedia.com/" + output);
  }


  //joined at
  if (message.content.startsWith(config.prefix + "joined")) {
    if (message.author.id == config.ownerID) {
      message.channel.send("Mon Apr 4 2020 00:04:20 GMT+0000 (UTC)");
    } else {
      var date = message.member.joinedAt.toString();
      message.channel.send(date);
    }

  }

  if (message.content.startsWith(config.prefix + "runes")) {
    message.channel.send("This is the standard runepage.\n\nFor a CDR runepage, use `.cdr`\nFor grasp into melee matchups, use `.grasp`",{ files: ['runes.png'] });
  }

  if (message.content.startsWith(config.prefix + "cdr")) {
    message.channel.send({ files: ['cdr.png'] });
  }

  if (message.content.startsWith(config.prefix + "grasp")) {
    message.channel.send({ files: ['grasp.png'] });
  }



  //meme pics
  if (message.content.startsWith(config.prefix + "b8")) {
    message.channel.send({ files: ['bait.png'] });
  }
  if (message.content.startsWith(config.prefix + "sandwich")) {
    message.channel.send({ files: ['sandwich.jpg'] });
  }
  if (message.content.startsWith(config.prefix + "lowb8")) {
    message.channel.send({ files: ['lowbait.jpg'] });
  }
  if (message.content.startsWith(config.prefix + "feelsgood")) {
    message.channel.send({ files: ['feelsgood.jpg'] });
  }
  if (message.content.startsWith(config.prefix + "feelsbad")) {
    message.channel.send({ files: ['feelsbad.jpg'] });
  }
  if (message.content.startsWith(config.prefix + "superb8")) {
    message.channel.send({ files: ['superbait.png'] });
  }
  if (message.content.startsWith(config.prefix + "unlimitedb8")) {
    message.channel.send({ files: ['unlimitedbait.png'] });
  }
  if (message.content.startsWith(config.prefix + "rewind")) {
    message.channel.send({ files: ['rewind.png'] });
  }

  // LEADERBOARD CODE DOESNT WORK. Left up in case we go back in and try to make it work again
  // //update leaderboard JP
  // if (message.content.startsWith(config.prefix+"leaderboard update JP")) {
  //    const k = KindredAPI.QuickStart('apikey', REGIONS.JAPAN, debug);
  //       let input = message.content.split(" ").slice(3);
  //       if (input == ("")) return;
  //       var summonername = input.join(" ");

  //       k.Summoner.get({ name: summonername }).then(result => {

  //       let summonerID = result.id;
  //       console.log(summonerID);

  //     const config = {
  //       playerId: summonerID,
  //         championId: 245
  //       }

  // k.ChampionMastery.get(config).then(result => {
  //     let truePoints = result.championPoints;
  //     message.channel.send("You have "+truePoints.toLocaleString()+" mastery points on Ekko.");
  //     sql.get(`SELECT * FROM leaderboard WHERE userId ="${message.author.id}"`).then(row => {
  //           if (!row) {
  //           (message.channel.send("You haven't been added to the leaderboard yet.\nPlease use .mastery <region> <rank> to add yourself."))
  //           } else {
  //               sql.run(`UPDATE leaderboard SET mastery = ${truePoints} WHERE userId = ${message.author.id}`);
  //               message.channel.send("Your masterypoints have been updated!")
  //                }
  //           }).catch(() => {
  //           console.error;
  //            });
  //   });

  // })
  //       }



  //adding ranks
  if (message.content.startsWith(config.prefix + "rank")) {
    if (message.channel.id  === botCenter) {
    const rankedInput = message.content.split(" ").slice(2);
    let rankedRegion = message.content.split(" ").slice(1, 2)[0].toUpperCase();
    const rankedSummonerName = encodeURI(rankedInput.join(" "));

    switch (rankedRegion) {
      case "EUW":
        rankedRegionCode = "EUW1";
        break;
      case "EUNE":
        rankedRegionCode = "EUN1";
        break;
      case "NA":
        rankedRegionCode = "NA1";
        break;
      case "LAN":
        rankedRegionCode = "LA1";
        break;
      case "LAS":
        rankedRegionCode = "LA2";
        break;
      case "TR":
        rankedRegionCode = "TR1";
        break;
      case "RU":
        rankedRegionCode = "RU";
        break;
      case "KR":
        rankedRegionCode = "KR";
        break;
      case "BR":
        rankedRegionCode = "BR1";
        break;
      case "OCE":
        rankedRegionCode = "OC1";
        break;
      case "JP":
        rankedRegionCode = "JP1";
        break;
    }

    const ranktestbySummoner = `https://${rankedRegionCode}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${rankedSummonerName}?api_key=${riotAPIKey}`
    fetch(ranktestbySummoner).then(res => res.json()).then(data => {
      console.log(data);
      let body1 = data;

      const ranktestbyID = `https://${rankedRegionCode}.api.riotgames.com/lol/summoner/v4/summoners/${body1.id}?api_key=${riotAPIKey}`
      fetch(ranktestbyID).then(res => res.json()).then(data => {
        let body2 = data;
        if (body2.profileIconId == "23") {

          const finalRank = `https://${rankedRegionCode}.api.riotgames.com/lol/league/v4/positions/by-summoner/${body1.id}?api_key=${riotAPIKey}`
          fetch(finalRank).then(res => res.json()).then(data => {
            console.log(data);
            let rankData = data;

            if (rankData.length === 0){
              message.channel.send(`${body1.name}, you must finish your placements to get a role!`)
            }

            for (let i = 0; i < rankData.length; i++) {

              if (rankData[i].queueType === "RANKED_SOLO_5x5") {

                if (rankData[i].position !== "NONE") {
                  message.channel.send(`Position: ${rankData[i].position}`);
                }

                message.channel.send(`${rankData[i].leagueName} ${rankData[i].tier} ${rankData[i].rank} ${rankData[i].leaguePoints}LP`);

                if (rankData[i].tier === "MASTER") {
                  let role = message.guild.roles.find("name", "Master tier");
                  let member = message.member;
                  if (message.member.roles.has(role.id)) {
                    message.channel.send("You already have this role.");
                  }
                  else {
                    member.addRole(role).catch(console.error);
                    message.channel.send("Verification successful.");
                    message.channel.send("Added Master tier to your roles!");
                  }
                }

                else {
                  let rankTier = rankData[i].tier[0] + rankData[i].tier.slice(1).toLowerCase();

                  let role = message.guild.roles.find('name', `${rankTier}`);
                  let member = message.member;
                  if (message.member.roles.has(role.id)) {
                    message.channel.send('You already have this role.');
                  }
                  else {
                    member.addRole(role).catch(console.error);
                    message.channel.send('Verification successful.');
                    message.channel.send(`Added ${rankTier} to your roles!`);
                  }
                }

              }
            }
          })
        }

        else {
          message.channel.send("Please change your Summoner Icon to the plant icon for verification and try again.\n")
          message.channel.send({ files: ['plant.png'] });
        }
      })
    })
  } else {
    message.channel.send('Please keep Ekkomains spam free. \nUse this command in <#336486260300447744>.')
  }
}

  //prefix changer
  if (message.content.startsWith(config.prefix + "prefix")) {
    //checks if author is owner
    if (message.author.id == config.ownerID) {
      //gets the prefix from command
      let newPrefix = message.content.split(" ").slice(1, 2)[0];
      //replace old prefix
      config.prefix = newPrefix;

      //writing to config.json
      fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
      message.channel.send("Succesfully changed prefix to " + config.prefix);
    }

    else {
      (message.channel.send("Access denied, please contact @Jordy#8250"));
    }
  }

  //kill bot

  if (message.content.startsWith(config.prefix + "reboot")) {
    if (message.author.id == (config.ownerID)) {
      message.channel.send("Rebooting Ekkobot...").then(() => process.exit())
    }
    else if (message.author.id == (config.jimboID)) {
      message.channel.send("Rebooting Ekkobot...").then(() => process.exit())
    }
    else {
      return;
    }
  }

  //uptime 
  if (message.content.startsWith(config.prefix + "uptime")) {
    var x = client.uptime;
    var tempTime = moment.duration(x);
    var days = tempTime.days();
    var hours = tempTime.hours();
    var minutes = tempTime.minutes();
    var seconds = tempTime.seconds();

    message.channel.send(`I've been running for: ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);;
  }



  //builds
  if (message.content.startsWith(config.prefix + "2q")) {
    message.channel.send("Goodnight sweet prince <:heart:377973921170849801>")
  }

  //frostqueens 
  if (message.content.startsWith(config.prefix + "fqc")) {
    message.channel.send("Goodnight sweet prince <:heart:377973921170849801>")
  }

  //ludens 

  if (message.content.startsWith(config.prefix + "luden")) {
    message.channel.send("https://www.reddit.com/r/ekkomains/comments/aay1cg/why_does_ekko_build_protobelt_instead_of_ludens/")
  }

  //goodshit
  if (message.content.startsWith(config.prefix + "goodshit")) {
    if (message.author.id !== config.ownerID) return;
    message.channel.send("👌👀👌👀👌👀👌👀👌👀 good shit go౦ԁ sHit👌 thats ✔ some good👌👌shit right👌👌there👌👌👌 right✔there ✔✔if i do ƽaү so my self 💯 i say so 💯 thats what im talking about right there right there (chorus: ʳᶦᵍʰᵗ ᵗʰᵉʳᵉ) mMMMMᎷМ💯 👌👌 👌НO0ОଠOOOOOОଠଠOoooᵒᵒᵒᵒᵒᵒᵒᵒᵒ👌 👌👌 👌 💯 👌 👀 👀 👀 👌👌Good shit")
  }

  //highIQ
  if (message.content.startsWith(config.prefix + "highiq")) {
    if (message.author.id !== config.ownerID) return;
    message.channel.send("Wu:b:️:b:️a Lu:b:️:b:️a Du:b:️ Du:b:")
  }
  //gunblade
  if (message.content.startsWith(config.prefix + "gunblade")) {
    message.channel.send("This item is niche and you shouldn't build it every game. \n\nYou can build Gunblade if you got an early kill in laning phase and want to estabilish your lead.\nDon't buy it if you think your opponent is scared and your chances of killing him again are low, in this case it's better to get a frostqueens. If you get an early gunblade you want to destroy your enemy laner and make him useless. This will draw a lot of jungle attention which makes laning easier for your other lanes, but be careful and use wards properly. Never buy it when you're losing your lane, it's better to just pick up Protobelt then.");
  }

  //jungle
  if (message.content.startsWith(config.prefix + "jungle")) {
   //needs update
    message.channel.send("Same as top lane Ekko, anything below diamond can work although this doesn't mean Ekko jungle is optimal.\nHis clears are slow, but semi-healthy. He can get invaded and counterjungled easily and early game he doesn't really have the tools available to fight back current meta junglers.\nHe can provide pretty good ganks at level 3, but so can other early game junglers like Lee or Elise, and they can do it better.\nIn other words, I don't recommend top/jungle Ekko to people new to him, but it can work if you have some experience already.\n\nIn general, you want to play Ekko on midlane only.\n\nBuild suggestions: Full AP runics into protobelt. Use attack speed marks and start W.\nMiniguide on Ekko jungle here:\nhttps://reddit.com/r/ekkomains/comments/6jrvof/jungle_ekko_yay_or_nay/djgp9yk/");
  }

  //top
  if (message.content.startsWith(config.prefix + "top")) {
    message.channel.send("First thing's first, if you're below diamond, you can play anything.\nPeople don't punish as hard so you should be able to do your thing.\nHowever, Ekko top isn't nearly as good as the current meta toplaners.\nTank Ekko got nerfed hard, and after the mini-rework during the assassins patch it's not recommended to play him full tank. This is because Ekko needs some AP to waveclear efficiently, since Riot gutted his base stats and made him scale better with ability power items.\n\nSome people go either full AP top, the classic Protobelt/Lichbane combo, or take some alternative items to make up for the lack of his base stats, like Gunblade or Rod of Ages. If you still want to play tank Ekko, I recommend at least 1 AP item. For matchups, please refer to the spreadsheet which we will post soon^tm\n\n\nBuild suggestions by /u/dangiuz:\n\nStandard splitpush build: http://i.imgur.com/UL54gid.png\nScaling build: http://i.imgur.com/C7IiCAC.png\nVs other tanks: http://i.imgur.com/qi6gmcI.png\nBuild Rod of Ages into bad matchups.")
  }

  //wiki
  if (message.content.startsWith(config.prefix + "ekkowiki")) {
    message.channel.send("https://reddit.com/r/ekkomains/wiki");
  }

  //reddit
  if (message.content.startsWith(config.prefix + "reddit")) {
    message.channel.send("https://reddit.com/r/ekkomains");
  }

  //invite 
  if (message.content.startsWith(config.prefix + "invite")) {
    message.channel.send("https://discord.gg/3PT4Xdp");
  }

  // all commands
  if (message.content.startsWith(config.prefix + "commands")) {
    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      /*
      * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
      */
      .setTitle("Ekkobot commands")
      .setDescription("Don't forget to use a prefix in front of your command.\nCurrent prefix: " + config.prefix)
      .setColor(0x00AE86)
      .setThumbnail(message.guild.iconURL)
      /*
      * Takes a Date object, defaults to current date.
      */
      .setTimestamp()

      .addField("rank <region> <summonername>", "Gives you a role based on your soloQ rank\nRegions: BR, EUNE, EUW, KR, LAN, LAS, NA, OCE, RU, TR, JP")
      .addField("mastery <region> <summonername>", "Gives you a role based on your Ekko masterypoints")
      .addField("region <region>", "Gives you a server region (NA, EUW, etc) role")
      .addField("help", "Use " + config.prefix + "help for info", true)
      .addField("removerole", "Example: removerole Silver", true)
      //   .addField("2Q", "Gives the 2Q setup",true)
      .addField("anime", "Gives you anime role")
      .addField("regular", "Gives you regular role (need to be on this server for 1 week+)")
      .addField("gunblade", "Gives the gunblade build", true)
      .addField("jungle", "Current state of Ekko jungle", true)
      .addField("top", "Current state of Ekko top", true)
      .addField("ekkowiki", "Gives you a link to the wiki", true)
      .addField("uptime", "Bot uptime", true)
      .addField("invite", "Gives you an invite link", true)
      .addField("joined", "Tells you when you joined", true)
      // .addField("status", "Gives you server info", true)
      .addField("wiki", "Example: .wiki deathcap", true)
      //   .addField("leaderboard show","Shows top 10 players",true)
      .addField("opgg", "Example: .opgg na Dyrus", true)
      //   .addField("icon <champion>","shows champion icon",true)
      //.addField("champion <champion>", "gives detailed champion info", true)
      .addField("matchups", "Links matchup sheet (in process of being updated)", true)
      .addField("nasa", "Shows the current Nasa astronomy picture of the day", true)
      .addField("vs, Gives you info on a certain Ekko matchup (example: .vs Aurelion Sol)", true)

    message.channel.send({ embed });
  }

  //help
  if (message.content.startsWith(config.prefix + "help")) {
    message.author.send("You can add the following roles by using .region (example: .region EUW):\n" + "BR, EUNE, EUW, KR, LAN, LAS, NA, OCE, RU, TR, JP. \n\nYou can also add your soloQ ranking and your mastery points on Ekko:\n`.rank <region> <summonername>` (example: .rank NA Dyrus) \n`.mastery <region> <summonername> ` (example: .mastery EUW Anivia Kid\n\nKeep in mind that roles are case sensitive! \n\nTo see more commands, use .commands");
  }

  //status
  if (message.content.startsWith(config.prefix + "status")) {
    var checkAmount = client.users.size;
    var tempOldamount = parseInt(status.amount);
    var difference = (client.users.size - tempOldamount);
    status.amount = checkAmount;
    fs.writeFile("./status.json", JSON.stringify(status), (err) => console.error);
    message.channel.send("Ekkomains currently has " + checkAmount + " users.\n" + difference + " users have joined since last check.");
  }

  //kick
  if (message.content.startsWith(config.prefix + "kick")) {
    let role = message.guild.roles.find("name", "Moderators");
    if (message.member.roles.has(role.id)) {
      let input = message.content.split(" ").slice(1);
      var reason = input.join(" ");
      let user = message.mentions.users.first();
      let modlog = client.channels.find('name', 'mod_chat');
      if (!modlog) return message.reply('I cannot find a mod_chat channel');
      if (reason.length < 1) return message.reply('You must supply a reason for the kick.');
      if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);

      if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
      message.guild.member(user).kick();
      message.channel.send("You have succesfully kicked " + user + " for the following reason: " + reason);

      const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .addField('Action:', 'kick')
        .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason', reason);
      return client.channels.get(modlog.id).sendEmbed(embed);
    };


    exports.conf = {
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: 0
    };

    exports.help = {
      name: 'kick',
      description: 'Kicks the mentioned user.',
      usage: 'kick [mention] [reason]'
    }
  };

  //ban
  if (message.content.startsWith(config.prefix + "ban")) {
    let role = message.guild.roles.find("name", "Moderators");
    if (message.member.roles.has(role.id)) {
      let input = message.content.split(" ").slice(2);
      var reason = input.join(" ");
      let user = message.mentions.users.first();
      let modlog = client.channels.find('name', 'mod_chat');
      if (!modlog) return message.reply('I cannot find a mod_chat channel');
      if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
      if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);

      if (!message.guild.member(user).kickable) return message.reply('I cannot ban that member');
      message.guild.member(user).ban();
      message.channel.send("You have succesfully banned " + user + " for the following reason: " + reason);

      const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .addField('Action:', 'ban')
        .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason', reason);
      return client.channels.get(modlog.id).sendEmbed(embed);
    };


    exports.conf = {
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: 0
    };

    exports.help = {
      name: 'kick',
      description: 'Kicks the mentioned user.',
      usage: 'kick [mention] [reason]'
    }
  };
  //request roles + add by bot

  //addrole command
  if (message.content.startsWith(config.prefix + "addrole")) {
    if (message.author.id !== config.ownerID) return;
    let input = message.content.split(" ").slice(1);
    var output = input.join(" ");
    let role = message.guild.roles.find("name", output);
    let member = message.mentions.members.first();

    if (message.member.roles.has(role.id)) {
      message.channel.send("User already has this role.");
    } else {
      member.addRole(role).catch(console.error);
    }
  }




  //euw | eu > na :lul:
  if (message.content.startsWith(config.prefix + "region EUW")) {
    let role = message.guild.roles.find("name", "EUW");
    let member = message.member;

    if (message.member.roles.has(role.id)) {
      message.channel.send("You already have this role.");
    } else {
      member.addRole(role).catch(console.error);
      message.channel.send("Added EUW to your roles!");
    }
  }



  //NA
  if (message.content.startsWith(config.prefix + "region NA")) {
    let role = message.guild.roles.find("name", "NA");
    let member = message.member;

    if (message.member.roles.has(role.id)) {
      message.channel.send("You already have this role.");
    } else {
      member.addRole(role).catch(console.error);
      message.channel.send("Added NA to your roles!");
    }
  }
  //eune
  if (message.content.startsWith(config.prefix + "region EUNE")) {
    let role = message.guild.roles.find("name", "EUNE");
    let member = message.member;

    if (message.member.roles.has(role.id)) {
      message.channel.send("You already have this role.");
    } else {
      member.addRole(role).catch(console.error);
      message.channel.send("Added EUNE to your roles!");
    }
  }
  //korea
  if (message.content.startsWith(config.prefix + "region KR")) {
    let role = message.guild.roles.find("name", "KOREA");
    let member = message.member;

    if (message.member.roles.has(role.id)) {
      message.channel.send("You already have this role.");
    } else {
      member.addRole(role).catch(console.error);
      message.channel.send("Added KOREA to your roles!");
    }
  }

  //LAN
  if (message.content.startsWith(config.prefix + "region LAN")) {
    let role = message.guild.roles.find("name", "LAN");
    let member = message.member;

    if (message.member.roles.has(role.id)) {
      message.channel.send("You already have this role.");
    } else {
      member.addRole(role).catch(console.error);
      message.channel.send("Added LAN to your roles!");
    }
  }
  //OCE
  if (message.content.startsWith(config.prefix + "region OCE")) {
    let role = message.guild.roles.find("name", "OCE");
    let member = message.member;

    if (message.member.roles.has(role.id)) {
      message.channel.send("You already have this role.");
    } else {
      member.addRole(role).catch(console.error);
      message.channel.send("Added OCE to your roles!");
    }
  }

  //Brazil
  if (message.content.startsWith(config.prefix + "region BR")) {
    let role = message.guild.roles.find("name", "BRAZIL");
    let member = message.member;

    if (message.member.roles.has(role.id)) {
      message.channel.send("You already have this role.");
    } else {
      member.addRole(role).catch(console.error);
      message.channel.send("Added BRAZIL to your roles!");
    }
  }

  //Turkey
  if (message.content.startsWith(config.prefix + "region TR")) {
    let role = message.guild.roles.find("name", "TURKEY");
    let member = message.member;

    if (message.member.roles.has(role.id)) {
      message.channel.send("You already have this role.");
    } else {
      member.addRole(role).catch(console.error);
      message.channel.send("Added TURKEY to your roles!");
    }
  }

  //las
  if (message.content.startsWith(config.prefix + "region LAS")) {
    let role = message.guild.roles.find("name", "LAS");
    let member = message.member;

    if (message.member.roles.has(role.id)) {
      message.channel.send("You already have this role.");
    } else {
      member.addRole(role).catch(console.error);
      message.channel.send("Added LAS to your roles!");
    }
  }

  //RU
  if (message.content.startsWith(config.prefix + "region RU")) {
    let role = message.guild.roles.find("name", "RUSSIA");
    let member = message.member;

    if (message.member.roles.has(role.id)) {
      message.channel.send("You already have this role.");
    } else {
      member.addRole(role).catch(console.error);
      message.channel.send("Added RUSSIA to your roles!");
    }
  }
  if (message.content.startsWith(config.prefix + "region JP")) {
    let role = message.guild.roles.find("name", "JAPAN");
    let member = message.member;

    if (message.member.roles.has(role.id)) {
      message.channel.send("You already have this role.");
    } else {
      member.addRole(role).catch(console.error);
      message.channel.send("Added JAPAN to your roles!");
    }
  }

  //anime
  if (message.content.startsWith(config.prefix + "anime")) {
    let role = message.guild.roles.find("name", "anime");
    let member = message.member;

    if (message.member.roles.has(role.id)) {
      message.channel.send("You already have this role.");
    } else {
      member.addRole(role).catch(console.error);
      message.channel.send("Added anime to your roles!");
    }
  }


  if (message.content.startsWith(config.prefix + "regular")) {
    let role = message.guild.roles.find("name", "Regular");
    let member = message.member;
    var newDate = message.member.joinedAt;
    var finalDate = moment((newDate)).fromNow(true);
    //timeFormat days, weeks, months, years
    let timeFormat = finalDate.split(" ").slice(1)[0];
    let actualTime = finalDate.split(" ").slice(0)[0];
    // console.log(timeFormat);
    if (message.member.roles.has(role.id)) {
      message.channel.send("You already have this role");
    } else
      if ((timeFormat === "days" & actualTime >= 7) || timeFormat === "month" || timeFormat === "months" || timeFormat === "year" || timeFormat === "years") {
        member.addRole(role).catch(console.error);
        message.channel.send("Added Regular to your roles!");
      } else {
        message.channel.send("You need to be part of Ekkomains for more than 1 week.\nUse `.joined` to check your join date");
      }
  }

  //check roleID in console
  /*let myRole = message.guild.roles.find("name", "euw");
  console.log([myRole]);*/

  if (message.content.startsWith(config.prefix + "roles")) {

    message.guild.roles.map(r => r.name).join(", ");
    //message.channel.send(server.iconURL);
  }



  const clean = text => {
    if (typeof (text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
      return text;
  }


  //setting mastery


  if (message.content.startsWith(config.prefix + "mastery")) {
    if (message.channel.id  === botCenter) {
    const masteryInput = message.content.split(" ").slice(2);
    const masteryRegion = message.content.split(" ").slice(1, 2)[0].toUpperCase();
    const masterySummonerName = encodeURI(masteryInput.join(" "));

    switch (masteryRegion) {
      case "EUW":
        masteryRegionCode = "EUW1";
        break;
      case "EUNE":
        masteryRegionCode = "EUN1";
        break;
      case "NA":
        masteryRegionCode = "NA1";
        break;
      case "LAN":
        masteryRegionCode = "LA1";
        break;
      case "LAS":
        masteryRegionCode = "LA2";
        break;
      case "TR":
        masteryRegionCode = "TR1";
        break;
      case "RU":
        masteryRegionCode = "RU";
        break;
      case "KR":
        masteryRegionCode = "KR";
        break;
      case "BR":
        masteryRegionCode = "BR1";
        break;
      case "OCE":
        masteryRegionCode = "OC1";
        break;
      case "JP":
        masteryRegionCode = "JP1";
        break;
    }

    console.log(masteryRegion);
    console.log(masteryRegionCode);
    console.log(masterySummonerName);

    const masteryBySummoner = `https://${masteryRegionCode}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${masterySummonerName}?api_key=${riotAPIKey}`;
    fetch(masteryBySummoner).then(res => res.json()).then(data => {
      console.log(data);
      let body1 = data;
      const masteryByID = `https://${masteryRegionCode}.api.riotgames.com/lol/summoner/v4/summoners/${body1.id}?api_key=${riotAPIKey}`;

      fetch(masteryByID).then(res => res.json()).then(data => {
        let body2 = data;

        if (body2.profileIconId == "23") {
          const finalMastery = `https://${masteryRegionCode}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${body1.id}/by-champion/245?api_key=${riotAPIKey}`;
          fetch(finalMastery).then(res => res.json()).then(data => {
            console.log(data);
            let masteryData = data;
            const numMasteryPoints = masteryData.championPoints;
            message.channel.send(`You have ${numMasteryPoints.toLocaleString()} Ekko mastery points.`);
            message.channel.send("Verification successful.");

            if (numMasteryPoints >= 3000000) {
              let role = message.guild.roles.find("name", "Ekko God");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added Ekko God to your roles!!"
                );
              }
            }

            else if (numMasteryPoints >= 2750000) {
              let role = message.guild.roles.find("name", "2.75M+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 2.75M+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 2500000) {
              let role = message.guild.roles.find("name", "2.50M+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 2.50M+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 2250000) {
              let role = message.guild.roles.find("name", "2.25M+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 2.25M+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 2000000) {
              let role = message.guild.roles.find("name", "2M+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 2M+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 1750000) {
              let role = message.guild.roles.find("name", "1.75M+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 1.75M+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 1500000) {
              let role = message.guild.roles.find("name", "1.50M+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 1.50M+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 1250000) {
              let role = message.guild.roles.find("name", "1.25M+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 1.25M+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 1000000) {
              let role = message.guild.roles.find("name", "1M+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 1M+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 900000) {
              let role = message.guild.roles.find("name", "900K+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 900K+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 800000) {
              let role = message.guild.roles.find("name", "800K+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 800K+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 700000) {
              let role = message.guild.roles.find("name", "700K+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 700K+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 600000) {
              let role = message.guild.roles.find("name", "600K+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 600K+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints > 500000) {
              let role500k = message.guild.roles.find(
                "name",
                "500K+ Masterypoints"
              );
              let member500k = message.member;
              if (message.member.roles.has(role500k.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member500k.addRole(role500k).catch(console.error);
                message.channel.send(
                  "Added 500k+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 400000) {
              let role = message.guild.roles.find("name", "400K+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 400K+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 300000) {
              let role = message.guild.roles.find("name", "300K+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 300K+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 200000) {
              let role = message.guild.roles.find("name", "200K+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 200K+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 100000) {
              let role = message.guild.roles.find("name", "100K+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 100K+ Mastery points to your roles!"
                );
              }
            }

            else if (numMasteryPoints >= 50000) {
              let role = message.guild.roles.find("name", "50K+ Masterypoints");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added 50K+ Mastery points to your roles!"
                );
              }
            }

            else {
              let role = message.guild.roles.find("name", "Ekko Apprentice");
              let member = message.member;
              if (message.member.roles.has(role.id)) {
                message.channel.send("You already have the corresponding role.");
              }
              else {
                member.addRole(role).catch(console.error);
                message.channel.send(
                  "Added Ekko Apprentice to your roles!"
                );
              }
            }
          });
        }
        else {
          message.channel.send("Please change your Summoner Icon to the plant icon for verification and try again.\n");
          message.channel.send({ files: ["plant.png"] });
        }
      });
    });
  } else {
    message.channel.send('Please keep Ekkomains spam free. \nUse this command in <#336486260300447744>.')
  }
}

  if (message.content.startsWith(config.prefix + "tag")) {
    message.channel.send('Please dont <@95998422150053888>');
  }

  if (message.content.startsWith(config.prefix + "jordy")) {
    message.channel.send("I miss the old Jordy, straight from the 'Go Jordy\nChop up the soul Jordy, set on his goals Jordy\nI hate the new Jordy, the bad mood Jordy\nThe always rude Jordy, spaz in the news Jordy\nI miss the sweet Jordy, chop up the beats Jordy\nI gotta to say at that time I'd like to meet Jordy\nSee I invented Jordy, it wasn't any Jordys\nAnd now I look and look around and there's so many Jordys\nI used to love Jordy, I used to love Jordy\nI even had the pink polo, I thought I was Jordy\nWhat if Jordy made a song about Jordy\nCalled 'I Miss The Old Jordy', man that would be so Jordy\nThat's all it was Jordy, we still love Jordy\nAnd I love you like Jordy loves Jordy");
  }

  if (message.content.startsWith(config.prefix + "uno")) {
    message.channel.send("i think its **hilarious** u kids talking shit about Moderator numero **UNO**. \nu wouldnt say this shit to him at lan, hes jacked. \nnot only that but he wears the freshest clothes, \neats at the chillest restaurants \nand hangs out with the hottest dudes. \n\nyall are pathetic lol")
  }

  if (message.content.startsWith(config.prefix + "fra")) {
    message.channel.send("hi every1 im new!!!!!!! *holds up spork* my name is fra but u can call me t3h f33d3r 0f m1dl4n3!!!!!!!! lol…as u can see im very random!!!! thats why i came here, 2 meet random ppl like me ^_^… im 13 years old (im mature 4 my age tho!!) i like 2 watch int mid w/ my husbando Ekko (im bi if u dont like it deal w/it) i always do a tyler1 impression and go full alahu akbar!!! bcuz its SOOOO random!!!! hes random 2 of course but i want 2 meet more random ppl =) like they say the more the merrier!!!! lol…neways i hope 2 make alot of freinds here so give me lots of commentses!!!! DOOOOOMMMM!!!!!!!!!!!!!!!! <— me bein random again ^_^ hehe…toodles!!!!!\n\nlove and waffles,\n\nt3h f33d3r 0f m1dl4n3")
  }
  if (message.content.startsWith(config.prefix + "viper")) {
    message.channel.send({ files: ['viper.jpg'] })
  }

  if (message.content.startsWith(config.prefix + "weather")) {
    const input = message.content.split(' ').slice(1).join(' ');
    console.log(input);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&APPID=243c48092f34816e15f9ae95e3cefb01`)
      .then(res => res.json()).then(data => {
        console.log(data);

        let city = data.name;
        let countryCode = data.sys.country;
        let country = iso3166.country(countryCode).name;
        let temperature = data.main.temp;
        let weatherDescription = data.weather[0].description;
        let weather = weatherDescription[0].toUpperCase() + weatherDescription.slice(1);

        message.channel.send(`Currently in ${city}, ${country}:`);
        message.channel.send(`Weather: **${weather}**\nTemperature: **${Math.round(temperature)} °C**`);
      })
  }

  //eval — DONT TOUCH!
  client.on("message", message => {
    const args = message.content.split(" ").slice(1);

    if (message.author.bot) return;
    if (message.content.startsWith(config.prefix + "eval")) {
      if (message.author.id !== config.ownerID) return;
      try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), { code: "xl" });
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
  });
  client.on("error", (e) => console.error(e));
  client.on("warn", (e) => console.warn(e));
  client.on("debug", (e) => console.info(e));
} });

function remove(username, text){
  return text.replace("@" + username + " ", "");
  }

client.login(config.token);