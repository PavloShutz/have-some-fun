function getRandomActivity() {
	let request = new XMLHttpRequest();
	request.open("GET", "http://www.boredapi.com/api/activity/");
	request.send();
	request.onload = () => {
		console.log(request);
		if (request.status === 200){
			console.log(JSON.parse(request.response));
			document.getElementById('activity').innerHTML = `Activity: ${JSON.parse(request.response).activity}`;
			document.getElementById('accessibility').innerHTML = `Accessibility: ${JSON.parse(request.response).accessibility}`;
			document.getElementById('type').innerHTML = `Type: ${JSON.parse(request.response).type}`;
			document.getElementById('price').innerHTML = `Price: ${JSON.parse(request.response).price}`;
			const link = JSON.parse(request.response).link
			document.getElementById('link').innerHTML = `Link: ${(link !== '') ? link : 'No link was provided'}`;
		}
		else {
			console.log(`error ${request.status} ${request.statusText}`)
		}
	}
}