const Discord = require("discord.js");
const { watchFile } = require("fs");
const bot = new Discord.Client();
const token = "nono:)";
const prefix = "!";

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);



bot.login(token);
bot.on("ready", () =>{
    console.log("Bot online as "+ bot.user.tag);
    bot.user.setPresence({ status: 'online', game: { name: 'Sentient' } });
})



let bannedWords = ["idiot", "noob"]

bot.on("message", msg=>                                             
{


  CheckForBannedWords(msg);


  let args = msg.content.substring(prefix.length).split(" ");

  switch (args[0]) 
  {

    case "banWord":
      BanWord(msg, args[1]);
      break;

    case "ping":
      Ping(msg);
      break;

    case "clear":
      ClearChat(true, msg, args[1]);
      break;

  }
})



function CheckForBannedWords(msg)
{
  let usedBannedWord = false;
  let RandoLetterList = ["/" , "%" , "!" , "$" , "&",];

  if(msg.author.id != bot.user.id)
  {
      let split = msg.content.split(" ");
    
      var j = 0;
      split.forEach(word => 
      {
        var i;
        for (i = 0; i < bannedWords.length; i++) 
        {
          if(word.toUpperCase().includes(bannedWords[i].toUpperCase())) 
          {
            usedBannedWord = true;

            let newWord = "";
            for (let index = 0; index < word.length; index++) 
            {

              if(index == 0)
              {
                newWord += word[0];
              }
              else if(index == word.length - 1)
              {
                newWord += word[index];
              }
              else
              {
                
                newWord += RandoLetterList[index % RandoLetterList.length];
              }
              
            }
            split[j] = newWord;
          }
        }
        j++;
      });

      if(usedBannedWord)
      {

        let newMessage = "";
        split.forEach(word => {
          newMessage += word + " ";
        });
        
        msg.channel.send("Forbidden word/s used by " + msg.author + "! New message: \n" + newMessage);
        msg.delete(1);
      }
  }
}


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   

function BanWord(msg, word)
{
  if(word)
  {
    bannedWords.push(word);
    msg.reply("Added word to banned list!");
    return;
  }
  else
  {
    msg.reply("Please provide a word you want to ban!");
    return;
  }
}


function Ping(msg)
{
  msg.channel.send(`Fetching!`).then(m => {
    m.edit(`**Bot** - ` + (m.createdTimestamp - msg.createdTimestamp) + `ms.` + ` \n**Discord API** - ` + Math.round(bot.ping) + `ms.`);
});
}

function ClearChat(hasAdminRights, msg, clearNumber)
{
  if(hasAdminRights)
  {
    if(!clearNumber) return msg.reply("pls define number of messages to be deleted.")
    msg.channel.bulkDelete(clearNumber);
    return;
   }
   else 
  {
    msg.reply("you don't have permission to use this command.");
    return;
  }      
}
