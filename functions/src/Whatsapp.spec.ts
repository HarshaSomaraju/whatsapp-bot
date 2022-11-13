import {expect} from "chai";
import * as mocha from "mocha";
import sinon = require("sinon");
import {Dialogflow} from "./Diagflow";
import {WhatsappCreator} from "./WhatsappCreator";

mocha.describe("Whatsapp", () => {
  it.only("should return a string", async () => {
    const dialogflow = sinon.createStubInstance(Dialogflow);
    const body = "ABC";
    dialogflow.detectIntent.returns(new Promise((resolve) => resolve(body)));
    const whatsapp = new WhatsappCreator(dialogflow);
    const response = await whatsapp.create("a", "a");
    // eslint-disable-next-line max-len
    const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message><Body>${body}</Body></Message></Response>`;
    expect(response).to.equal(xml);
  });
});
