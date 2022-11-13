/* eslint-disable linebreak-style */

import express = require("express");
import {Dialogflow} from "../../Diagflow";
import {WhatsappCreator} from "../../WhatsappCreator";
// eslint-disable-next-line new-cap
const router = express.Router();

interface BodyTwilio {
    SmsMessageSid: string;
    NumMedia: string;
    SmsSid: string;
    SmsStatus: string;
    Body: string;
    To: string;
    NumSegments: string;
    MessageSid: string;
    AccountSid: string;
    From: string;
    ApiVersion: string;
}

router.get("/", async (request:any, response:any, next:any) => {
  const body: BodyTwilio = request.body;
  const whatsappCreator = new WhatsappCreator(new Dialogflow());
  const xml: string = await whatsappCreator.create(body.Body, body.From);
  response.setHeader("Content-Type", "text/xml");
  return response.send(xml);
});

export default router;
