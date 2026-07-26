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
    groupAllowReply: [
        '1617735527@g.us',
        '1620836330@g.us',
        '120363043370524728@g.us'
    ],
    groupReply     : {
        '1617735527@g.us': [
            {
                'requestType': 'sticker',
                'contains'   : [],
                'exact'      : [],
                'response'   : '👆🏻 \n' +
                    '\n' +
                    '★━━━━━━━━━━━━━━━━━★\n' +
                    ' ░▒▓ JS & NᴏᴅᴇJS ▓▒░\n' +
                    '★━━━━━━━━━━━━━━━━━★\n' +
                    'Por favor, lee las reglas 👇🏻\n' +
                    '\n' +
                    '⚠️ PROHIBIDO ⚠️\n' +
                    '\n' +
                    '🚫 Subir ACORTADORES.\n' +
                    '\n' +
                    '🚫 Hacer SPAM.\n' +
                    '\n' +
                    '🚫 Stickers (Sin excepciones)\n' +
                    '\n' +
                    '🚫 Publicidad de ventas.\n' +
                    '\n' +
                    '🚫 Pornográfia.\n' +
                    '\n' +
                    '🚫 Insultar a otro miembro (Prohibido el bulling).\n' +
                    '\n' +
                    '🚫 Prohibido cualquier material audiovisual que no este relacionado con los intereses del grupo.'
            },
            {
                'requestType': 'chat',
                'contains'   : [],
                'exact'      : [],
                'response'   : '👆🏻 \n'
            }
        ],
        '1620836330@g.us': [
            {
                'requestType': 'sticker',
                'contains'   : [],
                'exact'      : [],
                'response'   : '🚫 Subir URL con ACORTADORES.\n' +
                    '🚫 Realizar SPAM o publicar Venta de cualquier tipo sin autorización de los Administradores.\n' +
                    '🚫 Prohibido el uso Stickers (Sin excepciones)\n' +
                    '🚫 Pornográfia.\n' +
                    '🚫 Insultar a otro miembro (y uso de malas palabras).\n' +
                    '🚫 Prohibido cualquier material audiovisual que no este relacionado con los intereses del grupo.'
            },
        ],
        '120363043370524728@g.us':[
            {
                'requestType': 'sticker',
                'contains'   : [],
                'exact'      : [],
                'response'   : '🚫 Subir URL con ACORTADORES.\n' +
                    '🚫 Realizar SPAM o publicar Venta de cualquier tipo sin autorización de los Administradores.\n' +
                    '🚫 Prohibido el uso Stickers (Sin excepciones)\n' +
                    '🚫 Pornográfia.\n' +
                    '🚫 Insultar a otro miembro (y uso de malas palabras).\n' +
                    '🚫 Prohibido cualquier material audiovisual que no este relacionado con los intereses del grupo.'
            },
            {
                'requestType': 'chat',
                'contains'   : [],
                'exact'      : [],
                'response'   : '👆🏻 \n'
            }
        ]
    }
});