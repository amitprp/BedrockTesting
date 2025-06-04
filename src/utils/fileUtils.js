import fs from "fs";
import { CONFIG } from "../config.js";

export const fileUtils = {
  readImageAsBase64() {
    try {
      return fs.readFileSync(CONFIG.FILES.IMAGE_PATH, { encoding: "base64" });
    } catch (error) {
      console.error("Error reading image file:", error);
      throw new Error(`Failed to read image file: ${error.message}`);
    }
  },

  saveJsonToFile(data) {
    try {
      fs.writeFileSync(CONFIG.FILES.OUTPUT_PATH, JSON.stringify(data, null, 2));
      console.log(`✅ Saved parsed data to: ${CONFIG.FILES.OUTPUT_PATH}`);
    } catch (error) {
      console.error("Error saving JSON file:", error);
      throw new Error(`Failed to save JSON file: ${error.message}`);
    }
  },

  extractJsonFromText(text) {
    try {
      const match = text.match(/(\[.*\])/s);
      if (!match) throw new Error("Could not find JSON array in response");
      return JSON.parse(match[1]);
    } catch (error) {
      console.error("Error parsing JSON from text:", error);
      throw new Error(`Failed to parse JSON from text: ${error.message}`);
    }
  },
}; 