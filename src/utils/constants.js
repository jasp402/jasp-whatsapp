'use strict';
const path = require("path");

exports.CHROME_OPTION   = {
	ignoreDefaultFlags: true,
	chromeFlags       : [
		"--app=https://web.whatsapp.com",
		"--disable-gpu",
		"--renderer",
		"--no-sandbox",
		"--no-service-autorun",
		"--no-experiments",
		"--no-default-browser-check",
		"--disable-webgl",
		"--disable-threaded-animation",
		"--disable-threaded-scrolling",
		"--disable-in-process-stack-traces",
		"--disable-histogram-customizer",
		"--disable-gl-extensions",
		"--disable-extensions",
		"--disable-composited-antialiasing",
		"--disable-canvas-aa",
		"--disable-3d-apis",
		"--disable-accelerated-2d-canvas",
		"--disable-accelerated-jpeg-decoding",
		"--disable-accelerated-mjpeg-decode",
		"--disable-app-list-dismiss-on-blur",
		"--disable-accelerated-video-decode",
		"--num-raster-threads=1",
	],
	userDataDir       : path.join(process.cwd(), 'src', 'bin', 'chrome-data'),
	logLevel          : 'info',
	output            : 'json'
}
exports.GOTO_OPTION     = {
	waitUntil: 'networkidle0',
	timeout  : 0
}
exports.PATH_ASSETS     = file => path.join(process.cwd(), 'src', 'assets', file);
exports.PATH_BIN        = folder => path.join(process.cwd(), 'src', 'bin', folder || '');
exports.PATH_LIB        = file => path.join(process.cwd(), 'src', 'lib', file);
exports.PATH_CONFIG     = file => path.join(process.cwd(), 'src', 'config', file);
exports.WHATSAPP_URL    = 'https://web.whatsapp.com/';
exports.GET_CHROME_PORT = port => `http://localhost:${port}/json/version`