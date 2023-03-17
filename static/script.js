function getRandomActivity() {
	const request = sendRequestToGetActivity();
	request.onload = () => {
		console.log(request);
		if (request.status === 200){
			console.log(JSON.parse(request.response));
			changeActivityContent(request);
		}
		else {
			console.log(`error ${request.status} ${request.statusText}`)
		}
	}
}

function sendRequestToGetActivity() {
	let request = new XMLHttpRequest();
	request.open("GET", "http://www.boredapi.com/api/activity/");
	request.send();
	return request;
}

function changeActivityContent(request) {
	document.getElementById('activity').innerHTML = `Activity: ${JSON.parse(request.response).activity}`;
	document.getElementById('accessibility').innerHTML = `Accessibility: <b>${JSON.parse(request.response).accessibility}</b>`;
	document.getElementById('type').innerHTML = `Type: <b>${JSON.parse(request.response).type}</b>`;
	document.getElementById('price').innerHTML = `Price: <b>${JSON.parse(request.response).price}</b>`;
	const link = JSON.parse(request.response).link
	document.getElementById('link').innerHTML = `Link: ${(link !== '') ? `<a href=${link} target=_blank>${link}</a>` : 'No link was provided'}`;
}