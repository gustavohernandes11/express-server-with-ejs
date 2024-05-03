import { Router } from "express";
import formidable from "formidable";
import { config } from "../index.js";
import { parse } from "path";

export const formRouter = Router();

formRouter.all("/", (req, res, next) => {
	if (req.method === "GET" || req.method === "POST") {
		const form = formidable({
			uploadDir: config.dir.uploads,
			keepExtensions: true,
		});

		form.parse(req, (err, data, file) => {
			if (err) {
				next(err);
				return;
			}

			if (file && file.image && file.image.size > 0) {
				data.filename = file.image.originalFilename;
				data.filetype = file.image.mimetype;
				data.filesize = Math.ceil(file.image.size / 1024) + " KB";
				data.uploadto = file.image.filepath;
				data.imageurl = "/" + parse(file.image.filepath).base;
			}

			res.render("form", { title: "Parse HTTP POST file data", data });
		});
	} else {
		next();
	}
});
