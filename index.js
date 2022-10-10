const express = require("express");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const moesif = require("moesif-nodejs");
const Stripe = require("stripe");
// npm install @aws-sdk/client-api-gateway
const {
	APIGatewayClient,
	CreateApiKeyCommand,
	CreateUsagePlanKeyCommand,
} = require("@aws-sdk/client-api-gateway");

const jsonParser = bodyParser.json();
const app = express();
const port = 5000;
app.use(express.static(path.join(__dirname, "/src")));

const config = {
	invokeUrl: process.env.AWS_INVOKE_URL,
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
};
const client = new APIGatewayClient(config);

const stripe = Stripe(process.env.STRIPE_KEY);

const moesifMiddleware = moesif({
	applicationId: process.env.MOESIF_APPLICATION_ID,
});

app.use(moesifMiddleware);

app.post("/register", jsonParser, async (req, res) => {
	console.log(req.body);

	// Generate API key
	const params = {
		name: req.body.email,
		enabled: true,
	};
	const command = new CreateApiKeyCommand(params);
	const response = await client.send(command);
	const awsApiKeyId = response.id;
	const awsApiKey = response.value;
	console.log(response);
});

app.get("/", function (_req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
	res.sendFile(path.join(__dirname, "app.js"));
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
