/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as dialogflow from "@google-cloud/dialogflow";
import {uuid} from "uuidv4";
import * as protos from "@google-cloud/dialogflow/build/protos/protos";
import {NaturalProcessorLanguage} from "./NaturalProcessorLanguage";

export class Dialogflow implements NaturalProcessorLanguage {
  private responses:
    [protos.google.cloud.dialogflow.v2.IDetectIntentResponse,
      protos.google.cloud.dialogflow.v2.IDetectIntentRequest | undefined, {} | undefined] | undefined;
  async detectIntent(text: string, sessionId: string = uuid()): Promise<string> {
    if (text.length > 250) {
      return new Promise((resolve) => resolve("Be shorter in your request"));
    }
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.projectAgentSessionPath("project-id ", sessionId);
    this.responses = await sessionClient.detectIntent({
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode: "en-US",
        },
      },
    });
    let resText = "";
    try {
      resText = this!.responses[0]!.queryResult!.fulfillmentText || "";
    } catch (_) {
      resText = "";
    }
    return resText;
  }
  getMedia(): string {
    if (this.responses![0]!.queryResult!.fulfillmentText === "Listen to how I am!") {
      return "https://firebasestorage.googleapis.com/v0/b/arsus-production.appspot.com/o/assets%2FWhatsApp%20Ptt%202020-07-17%20at%205.14.18%20PM.ogg?alt=media&token=b0de767c-e6b5-49d8-b916-275244ff3ed6";
    }
    return "";
  }
}
