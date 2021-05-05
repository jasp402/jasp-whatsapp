const os             = require("os").platform();
const fetch          = require("node-fetch");
const ora            = require('ora');
const cliSpinners    = require('cli-spinners');
const _cliProgress   = require('cli-progress');
const http           = require("http");
const util           = require("util");
const ChromeLauncher = require("chrome-launcher");
const fs             = require('fs');
const mime           = require('mime');
const path           = require("path");
const constants      = require('./constants');
const { execSync } = require("child_process");

const getRequestAsync = util.promisify((options, callback) => {
	const request = http.get(options, (response) => {
		let data = ""
		response.on("data", (chunk) => {
			data += chunk
		})
		response.on("end", () => {
			if (response.statusCode === 200) {
				callback(null, JSON.parse(data))
			} else {
				callback(new Error(data))
			}
		})
	})
	request.setTimeout(10000, () => {
		request.abort()
	})
	request.on("error", callback)
})

class Utils {
	spinner() {
		return ora({
			spinner     : cliSpinners.dots2,
			discardStdin: false,
		});
	}
	
	progressBar() {
		return new _cliProgress.SingleBar({}, _cliProgress.Presets.shades_classic);
	}
	
	revChrome() {
		let chromePlatform = os;
		switch (os) {
			case "linux":
				chromePlatform = "Linux";
				break;
			case "win32":
				chromePlatform = "Win_x64";
				break;
			case "darwin":
				chromePlatform = "Mac";
				break;
		}
		return new Promise(resolve => {
			fetch(`https://www.googleapis.com/storage/v1/b/chromium-browser-snapshots/o?&delimiter=/&prefix=${chromePlatform}/&fields=prefixes`, {method: "get"})
				.then(res => res.json())
				.then(json => {
					let channel = json.prefixes[0].replace(chromePlatform, '').replace(/\//g, '');
					resolve(channel);
				})
				.catch(e => {
					throw new Error(e);
				});
		});
	}
	
	async findChromeVersion() {
		const chrome  = await ChromeLauncher.launch({
			chromeFlags: [
				"--no-sandbox",
				"--headless",
			]
		})
		const options = {
			host: "127.0.0.1",
			port: chrome.port,
			path: "/json/version",
		}
		const version = await getRequestAsync(options)
		
		chrome.kill();
		
		return /HeadlessChrome\/(.*)/.exec(version.Browser)[1];
	}
	
	getFileInBase64(filename, response='') {
		return new Promise((resolve, reject) => {
			try {
				filename = filename.trim();
				// get the mimetype
				const fileMime = mime.getType(filename);
				var file       = fs.readFileSync(filename, {encoding: 'base64'});
				resolve(`data:${fileMime};base64,${file}`);
			} catch (error) {
				reject(error);
			}
		});
	}
	
	saveFileFromBase64(base64Data, name, type){
		let extension = mime.getExtension(type)
		try {
			fs.writeFileSync(path.join(process.cwd(), name + "." + extension), base64Data, 'base64')
		} catch (error) {
			console.error("Unable to write downloaded file to disk")
		}
	}
	
	isChromium() {
		let files    = [];
		let response = {};
		let Folders  = undefined;
		
		try {
			files    = fs.readdirSync('../.bin');
			Folders  = files.filter(f => f !== 'chrome-data');
			response = {
				browser: 'chromium',
				version: (Folders.length) ? Folders[0].split('-')[1] : ''
			};
			return response;
		} catch (e) {
			return false;
		}
	}
	
	biblicalPicture(){
		//Todo - se debe internarlizar el proyecto como plugis (aun no se como hacer eso)
		let result = execSync("node C:\\Users\\Jasp402\\WebstormProjects\\1.-proyectos_jasp402\\Daily-biblical-image-generator\\app.js").toString();
		console.log(result);
		return result;
	}
}

module.exports = new Utils();
