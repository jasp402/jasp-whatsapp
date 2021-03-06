module.exports = Object.freeze({
	appConfig      : {
		headless    : false,
		isGroupReply: false
	},
	smartReply     : ["Buen dÃ­a equipo!", "Dame un momento porfa.", "\uD83D\uDE0A Gracias!"],
	smartReplyV2:{
		'ð': 'ð Hola!',
		'ðââï¸': 'ðââï¸ buenos dias!',
		'ð§ð»âð¼': 'ð§ð»âð¼ Buenos dias Equipo!',
		'ð¥³': 'ð¥³ Feliz cumpleaÃ±os! ð',
		'ð': 'ð Dame un momento por favor',
		'ð': 'ð Muchas Gracias!',
		'ð¼ï¸': '{{getBiblicalPicture}}',
		'ð°': '{{getNoticies}}'
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
			"response": "Michhami Dukkadam ð"
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
			"contains": ["àª¶à«àª­àªàª¾àª®àª¨àª¾", "àªàª¨à«àª®àª¦àª¿àª¨"],
			"exact"   : [],
			"response": "àªàª­àª¾àª° ð"
		},
		{
			"contains": ["janmdin", "hardik", "shubhkaamna"],
			"exact"   : [],
			"response": "aabhar ð"
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
			"response": "this is sample of variables:\nHey [#name] ð, [#greetings]. \nThis is your phone number, [#phoneNumber]"
		}
	],
	blocked        : [],
	scheduler      : [
		{
			timer   : '7:35',
			sender  : ['573008626251', '51915199237', '573172749748'],
			response: `ð Muy Buenos dÃ­as!`,
		},
		{
			timer   : '12:30',
			sender  : ['51915199237', '573008626251', '51959029726', '573172749748'],
			response: `ð {Buen {provecho| apetito} ð}`,
		},
		{
			timer   : '15:00',
			sender  : ['51959029726', '56948828296'],
			response: `ð Epale negrita! Â¿Como estas? ð`,
		},
		{
			timer   : '21:00',
			sender  : ['51915199237'],
			response: `ð¥±ð´ Es hora de dormir; descanza!`,
		},
		{
			timer   : '9:30',
			sender: ['584243560060', '51915199237', '51959029726', '56948828296', '573008626251', '573172749748', '584167162016', '56930750213'],
			response: ``,
			script  : 'getBiblicalPicture'
		},
		{
			timer   : '9:10',
			sender: ['51926466715', '584167162016', '584243061610', '56930750213'],
			response: ``,
			script  : 'getBiblicalPicture'
		},
	],
	groupAllowReply: [
		'1617735527@g.us',
		'1620836330@g.us'
	],
	groupReply     : {
		'1617735527@g.us': [
			{
				'requestType': 'sticker',
				'contains'   : [],
				'exact'      : [],
				'response'   : 'ðð» \n' +
					'\n' +
					'âââââââââââââââââââ\n' +
					' âââ JS & Ná´á´á´JS âââ\n' +
					'âââââââââââââââââââ\n' +
					'Por favor, lee las reglas ðð»\n' +
					'\n' +
					'â ï¸ PROHIBIDO â ï¸\n' +
					'\n' +
					'ð« Subir ACORTADORES.\n' +
					'\n' +
					'ð« Hacer SPAM.\n' +
					'\n' +
					'ð« Stickers (Sin excepciones)\n' +
					'\n' +
					'ð« Publicidad de ventas.\n' +
					'\n' +
					'ð« PornogrÃ¡fia.\n' +
					'\n' +
					'ð« Insultar a otro miembro (Prohibido el bulling).\n' +
					'\n' +
					'ð« Prohibido cualquier material audiovisual que no este relacionado con los intereses del grupo.'
			},
			{
				'requestType': 'chat',
				'contains'   : [],
				'exact'      : [],
				'response'   : 'ðð» \n'
			}
		],
		'1620836330@g.us':[
			{
				'requestType': 'sticker',
				'contains'   : [],
				'exact'      : [],
				'response'   : 'ð« Subir URL con ACORTADORES.\n' +
					'ð« Realizar SPAM o publicar Venta de cualquier tipo sin autorizaciÃ³n de los Administradores.\n' +
					'ð« Prohibido el uso Stickers (Sin excepciones)\n' +
					'ð« PornogrÃ¡fia.\n' +
					'ð« Insultar a otro miembro (y uso de malas palabras).\n' +
					'ð« Prohibido cualquier material audiovisual que no este relacionado con los intereses del grupo.'
			},
		]
	}
});