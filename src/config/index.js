let groupConfig = {
    groupAllowReply: [],
    groupReply: {}
};

try {
    groupConfig = require('./groups.local');
} catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
        throw error;
    }
}

module.exports = Object.freeze({
    appConfig      : {
        headless    : false,
        isGroupReply: false
    },
    smartReply     : ["Buen día equipo!", "Dame un momento porfa.", "\uD83D\uDE0A Gracias!"],
    smartReplyV2   : {
        '👋'     : '👋 Hola!',
        '🙋‍♂️'  : '🙋‍♂️ buenos dias!',
        '🧑🏻‍💼': '🧑🏻‍💼 Buenos dias Equipo!',
        '🥳'     : '🥳 Feliz cumpleaños! 🎉',
        '🕐'     : '🕐 Dame un momento por favor',
        '😊'     : '😊 Muchas Gracias!',
        '🖼️'    : '{{getBiblicalPicture}}',
        '📰'     : '{{getNoticies}}'
    },
    botDataSet     : [
        {
            "contains": [],
            "exact"   : ["stikertest"],
            "response": "sticker de prueba",
            "file"    : "STK0170.webp"
        },
        {
            "contains": [],
            "exact"   : ["tienes github?"],
            "response": "https://github.com/jasp402",
            "file"    : "github.png"
        },
        {
            "contains": [],
            "exact"   : ["hiee"],
            "response": "hi"
        },
        {
            "contains": [],
            "exact"   : ["hey"],
            "response": "hi"
        },
        {
            "contains": ["michhami", "dukkadam"],
            "exact"   : [],
            "response": "Michhami Dukkadam 🙏"
        },
        {
            "contains": ["happy", "birthday", "bday"],
            "exact"   : [],
            "response": "Thank you"
        },
        {
            "contains": [],
            "exact"   : ["how are you"],
            "response": "i am {good {thanks| thank you}|great}. How about you?"
        },
        {
            "contains": [],
            "exact"   : ["hbd"],
            "response": "Thank you"
        },
        {
            "contains": ["શુભકામના", "જન્મદિન"],
            "exact"   : [],
            "response": "આભાર 🙏"
        },
        {
            "contains": ["janmdin", "hardik", "shubhkaamna"],
            "exact"   : [],
            "response": "aabhar 🙏"
        },
        {
            "contains": [],
            "exact"   : ["github"],
            "response": "Git Hub Logo",
            "file"    : "{github.png|github-two.png}"
        },
        {
            "contains": [],
            "exact"   : ["variables"],
            "response": "this is sample of variables:\nHey [#name] 👋, [#greetings]. \nThis is your phone number, [#phoneNumber]"
        }
    ],
    blocked        : [],
    scheduler      : [
        {
            timer   : '7:35',
            sender  : ['****', '****', '****'],
            response: `🌄 Muy Buenos días!`,
        },
        {
            timer   : '12:30',
            sender  : ['****', '****', '****', '****'],
            response: `🍜 {Buen {provecho| apetito} 😋}`,
        },
        {
            timer   : '15:00',
            sender  : ['****', '****'],
            response: `👋 Epale negrita! ¿Como estas? 😋`,
        },
        {
            timer   : '21:00',
            sender  : ['****'],
            response: `🥱😴 Es hora de dormir; descanza!`,
        },
        {
            timer   : '9:30',
            sender  : ['****', '****', '****', '****', '****', '****', '****', '****'],
            response: ``,
            script  : 'getBiblicalPicture'
        },
        {
            timer   : '9:10',
            sender  : ['****', '****', '****', '****'],
            response: ``,
            script  : 'getBiblicalPicture'
        },
    ],
    groupAllowReply: groupConfig.groupAllowReply,
    groupReply     : groupConfig.groupReply
});