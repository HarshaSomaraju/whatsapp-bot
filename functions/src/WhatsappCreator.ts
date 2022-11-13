/* eslint-disable require-jsdoc */
import {NaturalProcessorLanguage} from "./NaturalProcessorLanguage";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MessagingResponse = require("twilio").twiml.MessagingResponse;

export class WhatsappCreator {
  private twiml = new MessagingResponse();
  private message = this.twiml.message();
  constructor(private naturalProcessorLanguage: NaturalProcessorLanguage) {
  }
  async create(text: string, sessionId: string): Promise<string> {
    // eslint-disable-next-line max-len
    const fulfillmentText = await this.naturalProcessorLanguage.detectIntent(text, sessionId);
    this.message.body(fulfillmentText);
    this.setMedia(this.naturalProcessorLanguage.getMedia());
    return this.twiml.toString();
  }
  private setMedia(media: string) {
    if (media) {
      this.message.media(media);
    }
  }
}
