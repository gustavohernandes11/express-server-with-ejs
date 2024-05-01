import { Router } from "express";
import { hello } from "../lib/language.js";

export const helloRouter = Router();

helloRouter.get("/:name", (req, res) =>
	res.render("message", { title: `${hello.en}, ${req.params.name}` })
);

helloRouter.get("/:lang/:name", (req, res) =>
	res.render("message", {
		title: `${hello[req.params.lang] || hello.en}, ${req.params.name}`,
	})
);
