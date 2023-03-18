const formRg = document.querySelector('.reg');
formRg.addEventListener('submit', event => {
	event.preventDefault();
	const formData = new FormData(formRg);
	const data = Object.fromEntries(formData);
	fetchLink = `http://127.0.0.1:5500/register`
	fetch(fetchLink, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
})