const submitBtn = document.getElementById("submit");
const apikey = document.getElementById("apikey-output");

submitBtn.addEventListener("click", submitRegistration);

async function submitRegistration() {
	const email = document.getElementById("email-input").value;
	const firstname = document.getElementById("firstname-input").value;
	const lastname = document.getElementById("lastname-input").value;

	let body = { email, firstname, lastname };
	console.log(body);

	const URL = "http://localhost:8000/register";
	let response = await fetch(URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	let data = await response.json();
	console.log(data);

	apikey.innerHTML = `
		<h1 class="text-l font-semibold">Your API Key:</h1>
		<p class="mt-2">${data.apikey}</p>
	`;
}
