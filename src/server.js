const bodyParser     = require('body-parser');
const path           = require('path');
const cookieParser   = require('cookie-parser');
const logger         = require('morgan');
const express        = require('express');
const jsPackTools    = require('js-packtools');
const mime           = require('mime-types');
const wiki           = require('wikijs').default;
const {decryptMedia} = require('./lib/DECRYPT');
const settings       = require('./config/index');
const fs             = require('fs');

const app            = express();
const port           = 5001;


const {botDataSet} = settings;
const {customDate, createFolders} = jsPackTools();

const dataSet      = botDataSet;
const brainExact   = sentence => dataSet.find(obj => obj.exact.find(ex => ex.toLowerCase() === sentence.toLowerCase()));
const brainPartial = sentence => dataSet.find(obj => obj.contains.find(ex => sentence.toLowerCase().search(ex.toLowerCase()) > -1));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/save-image', async (req, res) => {
	const {original}   = req.body;
	const message      = original;
	const mediaData    = await decryptMedia(message);
	const filename     = `${message.t}.${mime.extension(message.mimetype)}`;
	const folderNumber = message.sender.id.split('@')[0];
	const folderName   = ('name' in message.sender) ? message.sender.name.replace(/ /g, '_').toLowerCase() : 'unknown';
	const folder       = `${folderName} ${folderNumber}`;
	
	createFolders(`./downloads/${folder}`);
	
	fs.writeFile(`./downloads/${folder}/${filename}`, mediaData, function(err) {
		if (err) {
			// res.send(err);
			return console.log(err);
		}
		console.log(`The file was saved! - ${folder}/${filename}`);
		res.send(`The file was saved! - ${filename}`);
	});
});

app.post('/bot', (req, res) => {
	const {text} = req.body;
	let textLowerCase = text.toLowerCase();
	
	if(textLowerCase.search('wiki') === 0){
		let content = textLowerCase.replace(/wiki\:|quien|que| es |cual|como|[?=]|[¿=]/g, '');
		console.log('wiki-content: ', content)
		wiki({
			apiUrl: 'https://es.wikipedia.org/w/api.php',
			format:'jsonfm'
		})
			.page(content)
			.then(page => page.summary())
			.then(response => {
				console.log('wiki response:', response);
				if(!response) res.json([{text: '🧞‍♂ No lo se todo... pero intenta hacer mas simple la pregunta'}])
				
				let result =`🧞‍♂ Has preguntado por: *${content.trim()}* \n`;
					result += "```"+response+"```";
				res.json([{text:result, type: 'message'}])
			})
			.catch(e =>{
				res.json([{text: `🔮 Up's algo no anda bien... \n *${e}*`, type: 'message'}]);
			});
	}
	
	const exact   = brainExact(text);
	const partial = brainPartial(text);

	console.log('===: sentence : ===>', text)
	
	if(exact){
		let send = {
			text: exact.response,
			files: exact.file,
			type: 'message'
		}
		res.json([send]);
	}else if(partial){
		let send = {
			text: partial.response,
			files: partial.file,
			type: 'message'
		}
		res.json([send]);
	}
	
	
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})