const discord = require('discord.js');
const dscl = new discord.Client();
const prefix = "^";
const token = process.env.token;
const moment = require('moment');
require("moment-duration-format");
require("moment-timezone");

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
let version = 'Version 2.2.0 Patch Data : 2019/08/12'
let CalcArr = ["+", "-", "×", "÷"]
let ColorArr = ['#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#008000', '#87ceeb', '#0000FF', '#800080', '#FFC0CB', '#ffffff', '#000000', '#808080'] 
                //빨강, 주황, 노랑, 연두(라임), 초록, 하늘(skyblue), 파랑, 보라, 분홍, 하얀, 검정, 회색
let answer = null
let WaitAnswer = 0
let ErrorCode = 0
let answerid = null
let NowUser = null
const hook = new discord.WebhookClient('608647893724692538', 'va4gc3u3pp84rdEzxcEFCoufOlHIMD30eZcJJ98G8-oJ7wfVfviGUBZfPFTc8fPwawyl')
const Addhook = new discord.WebhookClient('610055937008599044', 'Jc47IzVQTVaPMqzoK3Ac1FQ7t9riLyaM1LGZA86F9hBBgmQKT-uNWguzXVfdt4xd4Q6A')
//let Activity = `${dscl.guilds.array().length}개의 서버에서 ${dscl.guilds.memberCount}명이 사용중!` //총 길드 수와 총 멤버들 구하기

dscl.on("ready", () => {
    console.log(`${dscl.user.username}is Online!`);
    dscl.user.setActivity('Making Server | ^도움말', {type: "PLAYING"});
});

dscl.on("message", (message)=> {

    if(message.channel == "dm") {
        return message.author.send(`${message.author} 나랑 1:1 대화는 불가능 하지롱~`)
    }
    if(message.author.bot) return;

    //const member = message.mentions.users.first();

    let check = message.content.split("")
    let msg = message.content.split(" ")
    let select = message.content.split(".")
    let cmd = msg[0];
    let add = msg[1];
    let i = 0;

    const filter = m => m.content.split(" ") == `${prefix}연산`
    if (WaitAnswer == 1) {
        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
            .then(collected => console.log(``))
            .catch(collected => message.channel.send(`문제를 입력한지 30초가 지났습니다. 공용 사용을 위해 문제를 종료합니다.`) );
        WaitAnswer = 0
        }

    if (check[0] == "^") {
        if (message.channel != "dm") {
            if (check[1] == " ") hook.send(`${message.guild.name} 서버에서 ${message.channel.name} 채널에서 ${message.author.username} - ${message.author.id} 님이 ${message.content} 을(를) 사용하셨습니다.`)
        }
    }
    if (cmd == `${prefix}안녕`) {
        //console.log(message.mentions.user.id)
        return message.channel.send(HelloArr[RandInt(1)]);

    } else if (cmd == `${prefix}체크`) {
        if (add == "출석") {
            return message.channel.send(`${message.author} 출석 체크 되었습니다!`);
        } else if (add == "서버") {

            return message.channel.send(`${message.author} 이 서버는 ${message.guild.name} 이며, 현재 총 인원수는(봇 포함) ${message.guild.memberCount}명 입니다.`);
        } else {

            return message.channel.send(`${message.author} 알수 없는 인수입니다. "^도움말 체크" 를 사용해 주세요.`);
        }

    } else if (cmd == `${prefix}정보`) {
        let User = message.mentions.users.first() || message.author
        if (User.id == '538681468679880736') {
        let InfoEmbed = new discord.RichEmbed()
            .setColor(ColorArr[RandInt(11)])
            .setAuthor('Eru', 'https://i.imgur.com/5L8PU24.png', 'https://i.imgur.com/U0ZyRXa.png')
            .setTitle('정보')
            .setDescription('소통을 위한 봇')
            .setThumbnail("https://i.imgur.com/U0ZyRXa.png")
            .addField("기본 명령", "명령어를 사용하기 위한 기본은 \"^\"를 사용합니다")
            .addBlankField()
            .addField("명령어", "명령어를 보시려면 ^도움말를 이용해주세요")
            .addField("추가 명령어", "추가 명령어 문의는 ^추가요청 를 이용해 주세요")
            .setFooter(version)

        return message.channel.send(InfoEmbed)
    }
        var usertime = moment(message.guild.members.get(User.id).user.createdAt).tz('Asia/Seoul');
        var membertime = moment(message.member.joinedAt).tz('Asia/Seoul');
        let UserInfoEmbed = new discord.RichEmbed()
            .setTitle(`${User.username}님의 정보`)
            .setColor(ColorArr[RandInt(11)])
            .setImage(`${User.displayAvatarURL}`)
            .addField('이름', `${User.username}`, false)
            .addField('아이디', `${User.id}`, true)
            .addField('서버 가입일', `${membertime.format('YYYY MMM Do, h:mm:ss a')}`, false)
            .addField('계정 생성일', `${usertime.format('YYYY MMM Do, h:mm:ss a')}`, true)
        message.channel.send(UserInfoEmbed)

    } else if (cmd == `${prefix}도움말`) {
        if(add == '체크') {
            let checkHelp = new discord.RichEmbed()
                .setColor(ColorArr[RandInt(11)])
                .setTitle('^체크 [인수]')
                .setAuthor('도움말 [체크]', 'https://i.imgur.com/wjV4Ab1.png')
                .addBlankField()
                .addField('^체크 출석', '서버에서 출석을 할수 있습니다. ~~아직 무의미 합니다.~~')
                .addField('^체크 관리자', '서버의 최종 관리자를 알려드립니다. ~~불완전한 기능~~')
                .addField('^체크 서버', '서버에 대한 정보를 확인합니다.')

            message.author.send(checkHelp)

        } else if (add == '투표') {
            let voteHelp = new discord.RichEmbed()
                .setColor(ColorArr[RandInt(11)])
                .setTitle('^투표 ["인수"]')
                .setAuthor('도움말 [투표]', 'https://i.imgur.com/wjV4Ab1.png')
                .addBlankField()
                .addField('^투표 [주제]', '투표에 논할것을 주제에 정해 주십시오. 주제를 등록시 .(점)을 입력후 주제를 작성해 주세요. Yes/No를 선택할 수 있습니다. (많은 선택지는 "^선택" 을 사용해 주세요')
                .addField('예시 사용법', '^투표 .맑은 날씨다')

            message.author.send(voteHelp)

        } else if (add == '선택') {
            let chooseHelp = new discord.RichEmbed()
                .setColor(ColorArr[RandInt(11)])
                .setTitle('^선택 .[인수] .[인수1] .[인수2] .{인수3} .{인수4}')
                .setAuthor('도움말 [선택]', 'https://i.imgur.com/wjV4Ab1.png')
                .addBlankField()
                .addField('^선택 .[주제] .[선택항목1~4]', '주제에 따라 선택항목을 최대 10개까지 만들수 있습니다.')
                .addField('예시 사용법', '^선택 가장 맛있는 과일은? .오렌지 .사과 .귤 .감,...')
                .addField('주의!', '모든 인수는 .(점)를 기준으로 나누어 집니다. 그점 유의해서 인수값을 정해주시기 바랍니다.')
            //,(콤마)를 기준으로 나누는거 해결하기

            message.author.send(chooseHelp)

        } else if (add == null) {
            let helpEmbed = new discord.RichEmbed()
                .setColor(ColorArr[RandInt(11)])
                .setAuthor('도움말', 'https://i.imgur.com/wjV4Ab1.png')
                .addBlankField()
                .addField('안녕', '그저 봇이 당신에게 인사를 해줍니다.', true)
                .addField('체크', '여러가지를 확인할수 있습니다. 자세한건 "^도움말 체크" 를 사용해 주세요', true)
                .addField('정보', '봇의 정보를 보여줍니다.', true)
                .addField('말하기', '"^말하기 [원하는 말]" 로 사용합니다.', true)
                .addField('투표', '투표를 진행합니다. 자세한건 "^도움말 투표" 를 참고해 주세요.', true)
                .addField('주사위', '1~6까지의 숫자를 출력합니다', true)
                .addField('연산', '무작위 연산 문제를 출제합니다. 자세한건 "^도움말 연산" 을 참고해 주세요')
                .addField('선택', '주제에 대한 선택지를 선택합니다. 자세한건 "^도움말 선택" 을 참고해 주세요')
                .addField('가위바위보', '"^가위바위보 [가위 또는 바위 또는 보]"로 봇과 가위바위보를 할 수 있습니다!')
                .addField('잡기능', '"^토마스", "^샌즈" "^Embed"')
                .addField('코드 관련', '"^js" discord.js 문서 Url "^소스" Eru봇 소스입니다.')

            message.author.send(helpEmbed)

        } else if (add == '연산') {
            let CalcEmbed = new discord.RichEmbed()
                .setColor(ColorArr[RandInt(11)])
                .setTitle('^연산    ㅣ    ^답 [인수]')
                .setAuthor('도움말 [연산]', 'https://i.imgur.com/wjV4Ab1.png')
                .addBlankField()
                .addField('^연산', '간단한 연산 문제가 주어집니다.')
                .addField('^답 [정답]', '이 명령어를 사용하여 정답을 입력할 수 있습니다.')
                .addField('^답 skip', '너무 어렵나요? 스킵하시면 됩니다!')
                .addField('주의!', '다른 유저가 문제를 푸는 중일경우 문제를 받은 사람을 제외한 모든 사람은 ^연산 과 ^답 명령어를 사용할 수 없습니다. 반올림 시스템이 구현이 안되어 "÷"가 나왔을때 정확한 값(소숫점 16자리까지)을 입력해야 합니다.')

            message.author.send(CalcEmbed)

        } else {
            return message.channel.send(`${message.author} 알수 없는 인수입니다. "^help" 를 사용해 주세요`)
        }
        message.channel.send(`${message.author}님의 DM으로 전송되었습니다!`)

    } else if (cmd == `${prefix}말하기`) {
        message.channel.send(add);

    } else if (cmd == `${prefix}DM`) {
        message.author.send(`${message.author.id}`);

    } else if (cmd == `${prefix}투표`) {
        message.channel.send(select[1]).then(sentMessage => {
            sentMessage.react('✅')
                .then(() => sentMessage.react('❌'))
                .catch(() => console.log('투표 구문 에러 code:1 js 126~132'))
        }) .catch(() => message.channel.send(`${message.author} 인수를 찾을 수 없습니다. "^도움말 투표" 를 사용해 주세요`))

    } else if (cmd == `${prefix}선택`) {
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
                .setColor(ColorArr[RandInt(11)])
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
        else message.channel.send(`${message.author} "^도움말 선택" 을 참고해 주세요`);

    } else if (cmd == `${prefix}kick`) {
        if (roll.hasPermission('BAN_MEMBERS')) {
            console.log('이 유저는 ban이 불가능 합니다.');
            return;
        }
        console.log('이 유저는 ban이 가능합니다.');

    } else if (cmd == `${prefix}주사위`) {
        return message.channel.send(RollArr[RandInt(5)]);

    } else if (cmd == `${prefix}연산`) {
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
                message.channel.send(`예기치 않은 오류로 인해 종료됩니다.`)
            } else if (ErrorCode == -1) {
                message.channel.send(`변수 선언 오류 명령어를 다시 사용해주시길 바랍니다.`)
            }
        } else if (WaitAnswer == 1) {
            return message.channel.send(`${NowUser}님이 문제를 풀고 있습니다.`)
        }
    } else if (cmd == `${prefix}답` && WaitAnswer == 1 && message.author.id == answerid) {
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

    } else if (cmd == `${prefix}nsfw` || cmd == `${prefix}NSFW`) {
        if (message.channel.id == '457331588858904586') {
            message.member.addRole('476377978771603467')
            message.channel.send(`:white_check_mark: ${message.author}님에게 NSFW역할이 부여되었습니다!`)
        } else {
            message.channel.send('사용 가능한 채널 또는 서버가 아닙니다.')
        }

    } else if (cmd == `${prefix}가위바위보`) {
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

    } else if (cmd == `${prefix}말했기`) {
        if (select[1] == null) {
            return message.channel.send(`${message.author} 인수가 없습니다. .을 이용하여 인수를 설정해 주세요`)
        }
        message.delete(0)
        .then(() => message.channel.send(select[1]))
        .catch(() => hook.send(`${message.guild.name} 서버에서 채팅 지우기 권한이 존재하지 않습니다.`))

    } else if (cmd == `${prefix}반응`) {
        if (add == null) {
            return message.channel.send(`원하는 이모지를 써주세요 EX) :thinking:`)
        }
        message.react(add).then(() => message.channel.send(`${message.author} ${add}반응을 달았습니다!`))
            .catch(() => hook.send('349~354줄 반응 구문 오류'))
            
    } else if (message.isMentioned('538681468679880736')) {
        message.channel.send(`나불렀엉?`)

    } else if (cmd == `${prefix}타이핑`) {
        if (message.author.id == '378535260754935819') return message.channel.startTyping()
        else if (message.author.id != '378535260754935819') {
            message.channel.send(`${message.author} 봇 관리자 전용 메시지 입니다. 또는 실험중인 명령어 입니다.`)
        }

    } else if (cmd == `${prefix}중지`) {
        if (message.author.id == '378535260754935819') message.channel.stopTyping()
        else if (message.author.id != '378535260754935819') {
            message.channel.send(`${message.author} 봇 관리자 전용 메시지 입니다. 또는 실험중인 명령어 입니다.`)
        }

    } else if (cmd == `${prefix}js`) {
        message.channel.send('https://discord.js.org/')

    } else if (cmd == `${prefix}토마스`) {
        let TomasEmbed = new discord.RichEmbed()
            .setColor(ColorArr[RandInt(11)])
            .setImage('https://cdn.discordapp.com/attachments/447787026754830337/609992044122734612/20190810_192851.jpg')
        message.channel.send(TomasEmbed)

    } else if (cmd == `${prefix}추가요청`) {
        message.react(':thumbsup:')
        message.channel.send(`${message.author} 추가요청이 확인 되었습니다!`)
        let AddEmbed = new discord.RichEmbed()
            .setTitle('추가요청')
            .addField(`${message.author.username}님의 추가요청`, (`내용 : ${message.content}`))
        Addhook.send(AddEmbed)

    } else if (cmd == `${prefix}Embed`) {
        let RandomEmbed = new discord.RichEmbed()
            .setTitle('무작위 Embed 소환!')
            .setColor(ColorArr[RandInt(11)])
            .addField('내용', '없찌롱~', true)
        message.channel.send(RandomEmbed)

    } else if (cmd == `${prefix}샌즈`) {
        message.channel.send('https://giphy.com/gifs/UCkZPALajEs8M')
        message.channel.send('와! 샌즈!')

    } else if (cmd == `${prefix}AddRole`) {
        if (message.author.id == '378535260754935819') {
            if (select[1] == null || select[2]) `${message.author} 인수가 존재하지 않습니다.` 
            message.guild.createRole({
                name: select[1],
                color: select[2],
              })
              message.channel.send(`${message.author} ${select[2]} 색깔의 ${select[1]} 역할이 생성되었습니다`)
        }
        else if (message.author.id != '378535260754935819') {
            message.channel.send(`${message.author} 봇 관리자 전용 메시지 입니다. 또는 실험중인 명령어 입니다.`)
        }

    } else if (cmd == `${prefix}소스`) {
        message.author.send('https://github.com/Lukince/Eru/blob/master/index.js')
        message.author.send('현재 EruBot은 Node.js에 대해 오픈소스를 제공하고 있습니다. 복붙하시면 맞아 죽습니다^^')

    } else if (check[0] == prefix) {
        if (check[1] != " ") {
            message.channel.send(`> ${message.author} 아직은 그런거 모르는데..`)
        }
    }

    

    msg = ''
    ErrorCode = 0

});

dscl.login(token).catch(err => console.log(err));
