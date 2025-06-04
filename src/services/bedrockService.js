import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { fromEnv } from "@aws-sdk/credential-providers";
import { CONFIG } from "../config.js";

class BedrockService {
  constructor() {
    this.client = new BedrockRuntimeClient({
      region: CONFIG.AWS.REGION,
      credentials: fromEnv(),
    });
    this.chatHistory = [];
  }

  async sendMessage(messages) {
    try {
      // Add new messages to chat history
      this.chatHistory.push(...messages);

      const command = new InvokeModelCommand({
        modelId: CONFIG.AWS.MODEL_ID,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
          anthropic_version: "bedrock-2023-05-31",
          messages: this.chatHistory, // Send entire chat history for context
          max_tokens: CONFIG.MODEL.MAX_TOKENS,
          temperature: CONFIG.MODEL.TEMPERATURE,
        }),
      });

      const response = await this.client.send(command);
      const result = JSON.parse(Buffer.from(response.body).toString());
      const responseText = result.content[0].text;
      
      // Add assistant's response to chat history
      this.chatHistory.push({
        role: "assistant",
        content: [{ type: "text", text: responseText }],
      });

      return responseText;
    } catch (error) {
      console.error("Error in BedrockService.sendMessage:", error);
      throw new Error(`Failed to send message to Bedrock: ${error.message}`);
    }
  }

  getChatHistory() {
    return this.chatHistory;
  }

  clearChatHistory() {
    this.chatHistory = [];
  }
}

export const bedrockService = new BedrockService(); 