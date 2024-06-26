import express from "express";
import path, { dirname, sep } from "path";
import { fileURLToPath } from "url";
import { helloRouter } from "./routes/helloRouter.js";
import { formRouter } from "./routes/formRouter.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;

export const config = {
	port: process.env.PORT || 3000,
	dir: {
		root: __dirname,
		views: path.join(__dirname, "/views", sep),
		uploads: path.join(__dirname, "/uploads", sep),
	},
};

app.set("view engine", "ejs");
app.set("views", config.dir.views);

app.use(express.static(config.dir.uploads));

app.use("/form", formRouter);
app.use("/hello", helloRouter);

app.listen(config.port, () => {
	console.log(`Express server running at http://localhost:${config.port}.`);
});
