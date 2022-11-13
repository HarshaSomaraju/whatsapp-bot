import * as functions from "firebase-functions";

import * as express from "express";
import cors = require("cors");

const app = express();
import sms from "./whatsapp/controllers/sms";

// Automatically allow cross-origin requests
app.use(cors({origin: true}));
app.use(express.raw());

app.use("/", sms);

export const widgets = functions.https.onRequest(app);

