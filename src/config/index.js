module.exports = Object.freeze({
	appConfig : {
		headless    : false,
		isGroupReply: false
	},
	smartReply: ["Buen día equipo!", "Dame un momento porfa.", "\uD83D\uDE0A Gracias!"],
	botDataSet: [
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
	blocked   : [],
	scheduler  : []
});