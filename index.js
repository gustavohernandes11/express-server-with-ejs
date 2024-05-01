import express from "express";
import path, { dirname, sep } from "path";
import { fileURLToPath } from "url";
import { helloRouter } from "./routes/helloRouter.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;

const config = {
	port: process.env.PORT || 3000,
	dir: {
		root: __dirname,
		views: path.join(__dirname, "/views", sep),
	},
};

app.set("view engine", "ejs");
app.set("views", config.dir.views);

app.use("/hello", helloRouter);
app.listen(config.port, () => {
	console.log(`Express server running at port ${config.port}.`);
});
