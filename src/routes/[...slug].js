import { encodePNGToStream, make, registerFont } from 'pureimage';
import { PassThrough } from 'stream';
import randomColor from 'randomcolor';
import streamToBuffer from '../lib/streamToBuffer';
import getTimestamp from '../lib/getTimestamp';

const font = registerFont('./static/SourceSansPro-Regular.ttf', 'Source Sans Pro');
font.loadSync();

export const get = async () => {
	const size = 600;
	const bitmap = make(size, size);
	const ctx = bitmap.getContext('2d');

	// render background
	ctx.fillStyle = randomColor();
	ctx.fillRect(0, 0, size, size);

	// render text
	ctx.font = "28px 'Source Sans Pro'";
	ctx.fillStyle = '#ffffff';
	const text = getTimestamp();
	ctx.fillText(text, 24, 300);

	// raw rgb channel data --> png
	const stream = new PassThrough();
	const buffer = streamToBuffer(stream);
	await encodePNGToStream(bitmap, stream);

	return {
		status: 200,
		body: await buffer
	};
};
