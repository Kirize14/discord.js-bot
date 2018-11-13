

//================== BOT TOKEN ! ========================
const token ='INSERT Your token here';

//================== Header (Required Don't edit anything in this area please) ====================
var mysql = require('mysql');
const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
var musiclist = [];
let queue = {};
var gametime = 0;
var gamecooldown = 0;
var exec = require('child_process').exec;
var answer = 'qweofmqwecfnwekrjgnlwkescjfndlsa';

//================== Connect MySQL ====================
var con = mysql.createConnection({
	host: "localhost",
	user: "dbuser",
	password: "dbpass",
	database: "dbname"
  });

//================== Time Section (Don't edit if possible please) ====================
Array.prototype.myJoin = function(seperator,start,end){
    if(!start) start = 0;
    if(!end) end = this.length - 1;
    end++;
    return this.slice(start,end).join(seperator);
};
function gametimecount()
{
	gametime += 1;
	gamecooldown = gamecooldown - 1;
}

//================== Random for Gaming Q&A Area ====================
function random (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
//================== Bot When ready run command below ====================
bot.on('ready', () => {
	con.query("SELECT var_ans FROM bot_info WHERE var = 'status'", function (err, result, fields) {
		bot.user.setActivity(result[0].var_ans);
	});
  	console.log('I am ready!');
	setInterval(function(){gametimecount()},1000);
});



//================== Bot is listen on this section. Don't delete the old one ====================
bot.on('message', message => {
	if(message.channel.type != 'dm')
	{
		var msg = message.content.split(' ');
		if(message.member.id == 'Insert bot id')
		{
            //To prevent bot talk with them self
		}
		else
		{
            //================== Text Message Section (Everyone can use this area) ====================
            
            //======= TALK Zone (If user message is match one in db then bot talk back)
			con.query("SELECT reply FROM `whatever` WHERE listening = '"+message.content+"' LIMIT 1", function (err, result, fields) {
				if(result[0])
				{
					message.channel.send(result[0].reply);
				}
            });
            
            //======= Game Zone 
			if (message.content === '!!game')
			{
				if(gamecooldown >= 0)
				{
					message.channel.send('Please wait for '+ gamecooldown +' second');
				}
				else
				{
					gamecooldown = 3600;
					gametime = 0;
						con.query("SELECT * FROM `qanda` ORDER BY `qanda`.`id` DESC LIMIT 1", function (err, result, fields) {
							var max_rand = result[0].id;
							con.query("SELECT * FROM qanda", function (err, result, fields) {
								q = random(1,max_rand);
								console.log('Random int and result is '+q);
								message.channel.send(result[q].question);
								answer = result[q].answer;
							});
						});
					
				}
			}
			if (message.content == answer)
			{
				if(gametime > 300)
				{
					message.channel.send(message.member+' answer is correct! But you answer too late :( ');
					answer = 'ajkenckjtniweuhcgamsdpaiocgj,oeriwxj,aokjgscir';
				}
				else
				{
					message.channel.send(message.member+' answered correct! I will sent the code to your private chat.');
					answer = 'qweofmqwecfnwekrjgnlwkescjfndlsa';
						con.query("SELECT * FROM code WHERE used = 0 LIMIT 1", function (err, result, fields) {
							if(result[0])
							{
								message.author.sendMessage('Your code is '+result[0].code+'. Tell me what game did you got !');
								con.query("UPDATE `code` SET `used` = '1' WHERE `code`.`id` = '"+result[0].id+"';", function (err, result, fields) {

								});
							}
							else
							{
								message.author.sendMessage('Sorry but the we don\'t have any code left :( ask admin to add a new code.');
								
							}
							
						});
				}
				
            }
            //
            
            

			//================== Voice Channel Area ====================

			
			if (msg[0] === '!!music'){
				
				if(msg[1] == 'play')  
				{
					if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Please add music to the list by using !!music add [url]`);
					if (!message.guild.voiceConnection)
					{
						message.member.voiceChannel.join();
					}
					if (queue[message.guild.id].playing) return message.channel.sendMessage('I\'m playing!');
					let dispatcher;
					queue[message.guild.id].playing = true;
			
					console.log(queue);
					(function play(song) {
						console.log(song);
						if (song === undefined) return message.channel.sendMessage('Queue is now empty').then(() => {
							queue[message.guild.id].playing = false;
							//message.member.voiceChannel.leave();
						});
						message.channel.sendMessage(`Playing: **${song.title}** requested by: **${song.requester}**`);
						dispatcher = message.guild.voiceConnection.playStream(ytdl(song.url, { audioonly: true }));
						let collector = message.channel.createCollector(m => m);
						collector.on('message', m => {
							if (m == ('!!music pause')) {
								message.channel.sendMessage('Pausing').then(() => {dispatcher.pause();});
							} else if (m == ('!!music resume')){
								message.channel.sendMessage('Resuming').then(() => {dispatcher.resume();});
							} else if (m == ('!!music skip')){
								message.channel.sendMessage('Skipping').then(() => {dispatcher.end();});
							} else if (m == ('!!music time')){
								message.channel.sendMessage(`Current time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
							}
						});
						dispatcher.on('end', () => {
							collector.stop();
							play(queue[message.guild.id].songs.shift());
						});
						dispatcher.on('error', (err) => {
							return message.channel.sendMessage('error: ' + err).then(() => {
								collector.stop();
								play(queue[message.guild.id].songs.shift());
							});
						});
					})(queue[message.guild.id].songs.shift());
				}
				else if(msg[1] == 'add')  
			 	{
					let url = msg[2];
					if (url == '' || url === undefined) return message.channel.sendMessage(`Please enter Youtube valid link`);
					ytdl.getInfo(url, (err, info) => {
						if(err) return message.channel.sendMessage('Youtube link request failed, Please check the link again: ' + err);
						if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
						queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username});
						message.channel.sendMessage(`Added **${info.title}** to the list`);
					});
					message.delete();
				}
				else if(msg[1] == 'list')  
	 			{
					if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Music queue is empty, add one by using !!music add [url]`);
					let tosend = [];
					queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - By: ${song.requester}`);});
					message.channel.sendMessage(`__** Music queue of ${message.guild.name} :**__ Right now have **${tosend.length}** music in the queue  ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
				}
				else if(msg[1] == 'help')
				{
					message.channel.send(`__**คำสั่งที่ใช้ฟังเพลงกับบอทปิ๊งเลดี้**__	\`\`\`
					!!music add -> add music to the list (!!music -add [ลิ้งค์ยูทูป])
					!!music list -> list queue
					!!music skip -> skip the music
					!!music pause -> pause after this song
					!!music play -> play the music
					!!music resume -> resume the music after pause
					!!music time -> Current time
								\`\`\``);
				}
						
			}
			if (message.content === '!!go away'){
				const channel = message.member.voiceChannel;
				if(!channel)
					{
						//channel(connection => {connection.disconnect()});
						//bot.leaveVoiceChannel(message.author.voiceChannel);						
						message.channel.send('Nope');
						//message.channel.send('อยู่ระหว่างเรียนอยู่และศึกษางับ ใครรู้ PM มาที่ Kirize14@7552 หน่อย ');
						console.log(message.member+' used !!go away but he is not in the room');
					}
				else
					{
						wanttoplay = 0;
						nowisplay = 0;
						message.channel.send('Going .... ');
						channel.join().then(connection => {connection.disconnect()});
						console.log(message.member+' used !!go away');
					}
			}
			if (message.content === '!!move here')
			{
				const channel = message.member.voiceChannel;
				if(!channel)
					{
						message.channel.send('Enter the room first');
						console.log(message.member+' used !!move here but he is not in the room');
					}
				else
					{
						message.channel.send('Hi, I\'m here!');
						channel.join();	
						console.log(message.member+' used !!move here');
					}
			}
			
			
			//================== Admin Command ====================
			
			if (msg[0] == '!!admin')
			{
                // GET USER ROLE BY MENTION THEM 
				if(message.member.roles.has('327682679506075648') || message.member.roles.has('286763258143047680')) 
				{
					//================== Every admin command ====================
					if (msg[1] == 'addcom')
					{
						
						var listening = msg[2];
						if(!msg[3])
						{
							message.channel.send('Command Usage : !!admin addcom [Trigger word] [Answer]')
						}
						else
						{
							var reply = msg.myJoin(" ",3);
							con.query("INSERT INTO whatever (listening,reply) VALUES ('"+listening+"','"+reply+"')", function (err, result, fields) {
								message.channel.send('Command Save!');
							});
						}
					}
					if(msg[1] == 'reload')
					{
                        // Not actually a function but when I need to reload them.
						bot.disconnect();
						bot.login(token);
					}
					
					if (msg[1] == 'status')
					{
						if (!msg[2])
						{
							message.channel.send('No status insert');
						}
						else
						{
							var set_status = msg.myJoin(" ",2);
							con.query("UPDATE `bot_info` SET `var_ans` = '"+set_status+"' WHERE `bot_info`.`var` = 'status';", function (err, result, fields) {
								bot.user.setActivity(msg[2]);
							});
							message.channel.send('Status Updated');
						}
					}
				} 
				else 
				{
					message.channel.send('No Permission :(');
					console.log(message.member+' used !!admin');
				}
			}

		}	
	}
});
bot.login(token);

