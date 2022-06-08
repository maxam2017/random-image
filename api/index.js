const path = require('path');

const { encodePNGToStream, make, registerFont } = require('pureimage');
const randomColor = require('randomcolor');

const getTimestamp = require('../lib/getTimestamp.js');

module.exports = async (_, res) => {
	const size = 600;
	const bitmap = make(size, size);
	const ctx = bitmap.getContext('2d');

	const font = registerFont(
		path.join(__dirname, '..', 'static', 'SourceSansPro-Regular.ttf'),
		'Source Sans Pro'
	);
	font.loadSync();

	// render background
	ctx.fillStyle = randomColor();
	ctx.fillRect(0, 0, size, size);

	// render text
	ctx.font = "28px 'Source Sans Pro'";
	ctx.fillStyle = '#ffffff';
	const text = getTimestamp();
	ctx.fillText(text, 24, 300);

	// raw rgb channel data --> png
	res.setHeader('Content-Type', 'image/apng');
	await encodePNGToStream(bitmap, res);
	res.end();
};
