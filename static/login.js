const formLg = document.querySelector('.login');
formLg.addEventListener('submit', event => {
	event.preventDefault();
	const formData = new FormData(formLg);
	const data = Object.fromEntries(formData);
	fetchLink = `http://127.0.0.1:5500/login`
	fetch(fetchLink, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
})