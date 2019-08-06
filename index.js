const config = require('./config.json');
const discord = require('discord.js');
const dscl = new discord.Client();
const prefix = config.prefix;
const ytdl = require('ytdl-core')
const ffmpeg = require('ffmpeg-binaries');

function RandInt(max) {
    return Math.round(Math.random() * max);
}

/*
function print() {
    console.log(Discription)
} */ //로그 남기는 용으로 사용하는 Function

let PaperArr = ["가위", "바위", "보"]
let HelloArr = ["안녕 난 이루야 :kissing_heart:", "안녀엉! :laughing:"]
let RollArr = ["1", "2", "3", "4", "5", "6"]
let version = 'Version 1.3.0 Patch Data : 2019/07/31'
let CalcArr = ["+", "-", "×", "÷"]
let answer = null
let WaitAnswer = 0
let ErrorCode = 0
let answerid = null
let NowUser = null

dscl.on("ready", () => {
    console.log(`${dscl.user.username}is Online!`);
    dscl.user.setActivity("Making Servers", {type: "PLAYING"});
});

dscl.on("message", (message)=> {

    if(message.channel == "dm") return;
    if(message.author.bot) return;

    //const member = message.mentions.users.first();

    let check = message.content.split("")
    let msg = message.content.split(" ")
    let select = message.content.split(".")
    let cmd = msg[0];
    let add = msg[1];
    let i = 0;
    //let choose = message.content.split('"')  "를 기준으로 나눠서 선택과 투표 메세지 구현하기

    if (cmd == `${prefix}안녕`) {
        //console.log(message.mentions.user.id)
        return message.channel.send(HelloArr[RandInt(2)]);
    }

    if (cmd == `${prefix}체크`) {
        if (add == "출석") {

            return message.channel.send(`${message.author} 출석 체크 되었습니다!`);
        } else if (add == "서버") {

            return message.channel.send(`${message.author} 이 서버는 ${message.guild.name} 이며, 현재 총 인원수는(봇 포함) ${message.guild.memberCount}명 입니다.`);
        } else {

            return message.channel.send(`${message.author} 알수 없는 인수입니다. ">help 체크" 를 사용해 주세요.`);
        }
    }

    if (cmd == `${prefix}정보`) {
        let InfoEmbed = new discord.RichEmbed()
            .setColor('#63a4ff')
            .setAuthor('Eru', 'https://i.imgur.com/nXfwiVs.png', 'https://i.imgur.com/U0ZyRXa.png')
            .setTitle('정보')
            .setDescription('소통을 위한 봇')
            .setThumbnail("https://i.imgur.com/U0ZyRXa.png")
            .addField("기본 명령", "명령어를 사용하기 위한 기본은 \">\"를 사용합니다")
            .addBlankField()
            .addField("명령어", "명령어를 보시려면 >help를 이용해주세요")
            .addField("추가 명령어", "추가 명령어 문의는 단비에게 DM으로 해주세요")
            .setFooter(version)

        message.author.send(InfoEmbed)
    }

    if (cmd == `${prefix}help`) {
        message.channel.send(`${message.author}님의 DM으로 전송되었습니다!`)
        if(add == '체크') {

            let checkHelp = new discord.RichEmbed()
                .setColor("#ff9900")
                .setTitle('>체크 [인수]')
                .setAuthor('도움말 [체크]', 'https://i.imgur.com/wjV4Ab1.png')
                .addBlankField()
                .addField('>체크 출석', '서버에서 출석을 할수 있습니다. ~~아직 무의미 합니다.~~')
                .addField('>체크 관리자', '서버의 최종 관리자를 알려드립니다. ~~불완전한 기능~~')
                .addField('>체크 서버', '서버에 대한 정보를 확인합니다.')

            message.author.send(checkHelp)
        } else if (add == '투표') {
            let voteHelp = new discord.RichEmbed()
                .setColor('#08ff00')
                .setTitle('>투표 ["인수"]')
                .setAuthor('도움말 [투표]', 'https://i.imgur.com/wjV4Ab1.png')
                .addBlankField()
                .addField('>투표 [주제]', '투표에 논할것을 주제에 정해 주십시오. 주제를 등록시 .(점)을 입력후 주제를 작성해 주세요. Yes/No를 선택할 수 있습니다. (많은 선택지는 ">선택" 을 사용해 주세요')
                .addField('예시 사용법', '>투표 .맑은 날씨다')

            message.author.send(voteHelp)
        } else if (add == '선택') {
            let chooseHelp = new discord.RichEmbed()
                .setColor('#aa00ff')
                .setTitle('>선택 .[인수] .[인수1] .[인수2] .{인수3} .{인수4}')
                .setAuthor('도움말 [선택]', 'https://i.imgur.com/wjV4Ab1.png')
                .addBlankField()
                .addField('>선택 .[주제] .[선택항목1~4]', '주제에 따라 선택항목을 최대 10개까지 만들수 있습니다.')
                .addField('예시 사용법', '>선택 가장 맛있는 과일은? .오렌지 .사과 .귤 .감,...')
                .addField('주의!', '모든 인수는 .(점)를 기준으로 나누어 집니다. 그점 유의해서 인수값을 정해주시기 바랍니다.')
            //,(콤마)를 기준으로 나누는거 해결하기

            message.author.send(chooseHelp)
        }
        else if (add == null) {
            let helpEmbed = new discord.RichEmbed()
                .setColor('#ff0000')
                .setAuthor('도움말', 'https://i.imgur.com/wjV4Ab1.png')
                .addBlankField()
                .addField('안녕', '그저 봇이 당신에게 인사를 해줍니다.', true)
                .addField('체크', '여러가지를 확인할수 있습니다. 자세한건 ">help 체크" 를 사용해 주세요', true)
                .addField('정보', '봇의 정보를 보여줍니다.', true)
                .addField('말하기', '">말하기 [원하는 말]" 로 사용합니다.', true)
                .addField('투표', '투표를 진행합니다. 자세한건 ">help 투표" 를 참고해 주세요.', true)
                .addField('주사위', '1~6까지의 숫자를 출력합니다', true)
                .addField('연산', '무작위 연산 문제를 출제합니다. 자세한건 ">help 연산" 을 참고해 주세요')
                .addField('선택', '주제에 대한 선택지를 선택합니다. 자세한건 ">help 선택" 을 참고해 주세요')

            message.author.send(helpEmbed)
        } else if (add == '연산') {
            let CalcEmbed = new discord.RichEmbed()
                .setColor('#00e5ff')
                .setTitle('>연산    ㅣ    >답 [인수]')
                .setAuthor('도움말 [연산]', 'https://i.imgur.com/wjV4Ab1.png')
                .addBlankField()
                .addField('>연산', '간단한 연산 문제가 주어집니다.')
                .addField('>답 [정답]', '이 명령어를 사용하여 정답을 입력할 수 있습니다.')
                .addField('>답 skip', '너무 어렵나요? 스킵하시면 됩니다!')
                .addField('주의!', '다른 유저가 문제를 푸는 중일경우 문제를 받은 사람을 제외한 모든 사람은 >연산 과 >답 명령어를 사용할 수 없습니다. 반올림 시스템이 구현이 안되어 "÷"가 나왔을때 정확한 값(소숫점 16자리까지)을 입력해야 합니다.')

            message.author.send(CalcEmbed)
        } else {
            return message.channel.send(`${message.author} 알수 없는 인수입니다. ">help" 를 사용해 주세요`)
        }
    }

    if (cmd == `${prefix}말하기`) {
        message.channel.send(add);
    }

    if (cmd == `${prefix}DM`) {
        message.author.send(`${message.author.id}`);
    }

    if (cmd == `${prefix}투표`) {
        message.channel.send(select[1]).then(sentMessage => {
            sentMessage.react('✅')
                .then(() => sentMessage.react('❌'))
                .catch(() => console.log('투표 구문 에러 code:1 js 126~132'))
        }) .catch(() => message.channel.send(`${message.author} 인수를 찾을 수 없습니다. ">help 투표" 를 사용해 주세요`))
    }

    if (cmd == `${prefix}선택`) {
        console.log(select[0])
        console.log(select[1])
        console.log(select[2])
        console.log(select[3])
        console.log(select[4])
        let topic = `주제는 "${select[1]}" 입니다.`;
        if (select[1] == null) message.channel.send(`${message.author} 주제가 설정되지 않았습니다.`)
        else if (select[2] == null) message.channel.send(`${message.author} 인수 값이 없습니다. 또는 인수값(주제)이 .(점)로 나뉘지 않았습니다.`)
        else if (select[3] == null) message.channel.send(`${message.author} 인수는 최소 2개 이상이여야 합니다. 또는 인수값이 .(점)로 나뉘지 않았습니다.`)
        else if (select[4] == null) {
            let selectEmbed = new discord.RichEmbed()
                .addField(topic, `목록:\nA:${select[2]}\nB:${select[3]}`);

            message.channel.send(selectEmbed).then(sentMessage => {
                sentMessage.react('🇦')
                    .then(() => sentMessage.react('🇧'))
                    .catch(() => console.log('선택 구문 에러 code:1 js 138~146'));
            });

        } else if(select[5] == null) {
            let selectEmbed = new discord.RichEmbed()
                .addField(topic, `목록:\nA:${select[2]}\nB:${select[3]}\nC:${select[4]}`);

            message.channel.send(selectEmbed).then(sentMessage => {
                sentMessage.react('🇦')
                    .then(() => sentMessage.react('🇧'))
                    .then(() => sentMessage.react('🇨'))
                    .catch(() => console.log('선택 구문 에러 code:2 js 148~157'));
            });

        } else if (select[6] == null) {
            let selectEmbed = new discord.RichEmbed()
                .addField(topic, `목록:\nA:${select[2]}\nB:${select[3]}\nC:${select[4]}\nD:${select[5]}`);

            message.channel.send(selectEmbed).then(sentMessage => {
                sentMessage.react('🇦')
                    .then(() => sentMessage.react('🇧'))
                    .then(() => sentMessage.react('🇨'))
                    .then(() => sentMessage.react('🇩'))
                    .catch(() => console.log('선택 구문 에러 code:3 js 159~169'));
            });

        } else if (select[6] != null) message.channel.send(`${message.author} 인수 값의 최대는 4개 입니다.`);
        else message.channel.send(`${message.author} ">help 선택" 을 참고해 주세요`);
    }

    if (check[0] == ">") {
        if (message.channel != "dm") {
            console.log(`${message.guild.name} 서버에서 ${message.author.username} - ${message.author.id} 님이 ${message.content} 을(를) 사용하셨습니다.`)
        }
    }

    if (cmd == `${prefix}kick`) {
        if (roll.hasPermission('BAN_MEMBERS')) {
            console.log('이 유저는 ban이 불가능 합니다.');
            return;
        }
        console.log('이 유저는 ban이 가능합니다.');
    }

    if (cmd == `${prefix}주사위`) {
        return message.channel.send(RollArr[RandInt(5)]);
    }

    if (cmd == `${prefix}연산`) {
        if (WaitAnswer == 0) {
            NowUser = message.author.username
            answerid = message.author.id
            FirstNum = RandInt(100)
            SecondNum = RandInt(100)
            Calc = CalcArr[RandInt(3)]
            if (Calc == "÷" && SecondNum == 0) {
                ErrorCode = -1
            }
            if (Calc == "+") {
                answer = FirstNum + SecondNum
            } else if (Calc == "-") {
                answer = FirstNum - SecondNum
            } else if (Calc == "×") {
                answer = FirstNum * SecondNum
            } else if (Calc == "÷") {
                answer = FirstNum / SecondNum
            } else {
                ErrorCode = 1
            }
            if (ErrorCode == 0){
                message.channel.send(`${FirstNum} ${Calc} ${SecondNum} = 🤔`)
                WaitAnswer = 1
            } else if (ErrorCode == 1) {
                message.channel.send(`예기치 않은 오류로 인해 종료됩니다. 오류코드 : ${ErrorCode} 오류 코드 문의 : >오류코드`)
            } else if (ErrorCode == -1) {
                message.channel.send(`변수 선언 오류 명령어를 다시 사용해주시길 바랍니다. 오류코드 : ${ErrorCode} 오류 코드 문의 : >오류코드`)
            }
        } else if (WaitAnswer == 1) {
            return message.channel.send(`${NowUser}님이 문제를 풀고 있습니다.`)
        }
    }

    if (cmd == `${prefix}답` && WaitAnswer == 1 && message.author.id == answerid) {
        if (add == null) {
            message.channel.send("답을 입력해 주세요.")
        } else if (add == "skip") {
            WaitAnswer = 0
            return message.channel.send(`Skip되었습니다. 정답은 ${answer}이였습니다.`)
        } else {
            if (add == answer) {
                message.channel.send(`:white_check_mark:정답입니다! 나의 답 : ${add} 정답 : ${answer}`)
                WaitAnswer = 0
            } else if (add != answer) {
                message.channel.send(`:x:틀렸습니다. 나의 답 : ${add} 정답 : ${answer}`)
                WaitAnswer = 0
            }
        }
    } else if (cmd == `${prefix}답` && WaitAnswer == 1) {
        console.log(message.author.id)
        console.log(answerid)
        message.channel.send(`${message.author} 문제 출제자만 정답을 입력할 수 있습니다.`)
    } else if (cmd == `${prefix}답` && WaitAnswer == 0) {
        message.channel.send(`문제를 푸는중이 아닙니다!`)
    }

    if (cmd == `${prefix}nsfw` || cmd == `${prefix}NSFW`) {
        if (message.channel.id == '457331588858904586') {
            message.member.addRole('476377978771603467')
            message.channel.send(`:white_check_mark: ${message.author}님에게 NSFW역할이 부여되었습니다!`)
        } else {
            message.channel.send('사용 가능한 채널 또는 서버가 아닙니다.')
        }
    }

    if (cmd == `${prefix}가위바위보`) {
        let Paper = 0
        let BotPaper = PaperArr[RandInt(2)]
        if (add != PaperArr[0] && add != PaperArr[1] && add != PaperArr[2]) {
            return message.channel.send(`${message.author} "가위" 또는 "바위" 또는 "보"로 인수를 정해주세요`)
        }
        message.channel.send(BotPaper)
        if (add == PaperArr[0]) {
            Paper = 1
            if (BotPaper == PaperArr[0]) {
                return message.channel.send(`${message.author} 비겼네요 :cold_sweat:`)
            } else if (BotPaper == PaperArr[1]) {
                return message.channel.send(`${message.author} 제가 이겼네요 :sunglasses:`)
            } else if (BotPaper == PaperArr[2]) {
                return message.channel.send(`${message.author} 제가 졌어요.. :sob:`)
            } else {
                return message.channel.send(`${message.author} 이런! 알수 없는 오류가 발생했내요`)
            }
        } else if (add == PaperArr[1]) {
            Paper = 2
            if (BotPaper == PaperArr[1]) {
                return message.channel.send(`${message.author} 비겼네요 :cold_sweat:`)
            } else if (BotPaper == PaperArr[2]) {
                return message.channel.send(`${message.author} 제가 이겼네요 :sunglasses:`)
            } else if (BotPaper == PaperArr[0]) {
                return message.channel.send(`${message.author} 제가 졌어요.. :sob:`)
            } else {
                return message.channel.send(`${message.author} 이런! 알수 없는 오류가 발생했내요`)
            }
        } else if (add == PaperArr[2]) {
            Paper = 3
            if (BotPaper == PaperArr[2]) {
                return message.channel.send(`${message.author} 비겼네요 :cold_sweat:`)
            } else if (BotPaper == PaperArr[0]) {
                return message.channel.send(`${message.author} 제가 이겼네요 :sunglasses:`)
            } else if (BotPaper == PaperArr[1]) {
                return message.channel.send(`${message.author} 제가 졌어요.. :sob:`)
            } else {
                return message.channel.send(`${message.author} 이런! 알수 없는 오류가 발생했내요`)
            }
        }
    }

    msg = ''
    ErrorCode = 0

});

dscl.login(config.Token);