const Formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' });

export default function getTimestamp() {
	const now = new Date();
	const text = Formatter.format(now);

	return text;
}
