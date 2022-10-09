const express = require("express");
const path = require("path");

const app = express();
const port = 5000;
app.use(express.static(path.join(__dirname, "/src")));

app.get("/", function (_req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
	res.sendFile(path.join(__dirname, "app.js"));
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
