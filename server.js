const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.REACT_APP_BACKEND_SERVER_PORT;
const app = express();

app.use(express.json());
app.use(cors());

const travelController = require("./controllers/travel.controllers");

app.use("/tours", travelController);

// default route

app.use("/", (req, res) => {
	res
		.status(200)
		.send(
			`<h2 style="color:green;font-size:26px;margin:20px auto;">Welcome to travel backend API</h2>`,
		);
});

app.listen(port, async function () {
	try {
		console.log(`server is running on port ${port}`);
	} catch (er) {
		console.log("server err", er);
	}
});

module.exports=app;