import { encodePNGToStream, make, registerFont } from 'pureimage';
import { PassThrough } from 'stream';
import randomColor from 'randomcolor';

const font = registerFont('./static/SourceSansPro-Regular.ttf', 'Source Sans Pro');
font.loadSync();

export const get = async () => {
	const size = 600;
	const bitmap = make(size, size);
	const ctx = bitmap.getContext('2d');

	// background
	const bg = randomColor();
	ctx.fillStyle = bg;
	ctx.fillRect(0, 0, size, size);

	// config text
	const fontSize = size / 20;
	const x = size * 0.02;
	const y = size * 0.5;
	ctx.font = `${fontSize}px 'Source Sans Pro'`;
	ctx.fillStyle = '#ffffff';

	// render text
	const now = new Date();
	const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' });
	const text = formatter.format(now);
	ctx.fillText(text, x, y);

	// transform to array buffer
	const stream = new PassThrough();
	const promisedImg = (async () => {
		return new Promise((resolve, reject) => {
			const buffers = [];
			stream.on('error', reject);
			stream.on('data', (data) => buffers.push(data));
			stream.on('end', () => resolve(Buffer.concat(buffers)));
		});
	})();

	await encodePNGToStream(bitmap, stream);

	return {
		status: 200,
		headers: { 'Content-Type': 'image/apng' },
		body: await promisedImg
	};
};
