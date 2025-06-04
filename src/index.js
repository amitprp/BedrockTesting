import { PROMPTS } from "./prompts.js";
import { bedrockService } from "./services/bedrockService.js";
import { fileUtils } from "./utils/fileUtils.js";

async function main() {
  try {
    // Clear any existing chat history
    bedrockService.clearChatHistory();

    // Read image
    const imageBase64 = fileUtils.readImageAsBase64();

    // Step 1: Detect layout
    // const layoutPrompt = {
    //   ...PROMPTS.LAYOUT_DETECTION,
    //   content: [
    //     PROMPTS.LAYOUT_DETECTION.content[0],
    //     {
    //       type: "image",
    //       source: {
    //         type: "base64",
    //         media_type: "image/png",
    //         data: imageBase64,
    //       },
    //     },
    //   ],
    // };
    // const layoutType = await bedrockService.sendMessage([layoutPrompt]);
    // console.log("Detected layout:", layoutType);

    // // Step 2: Extract data
    // const extractionPrompt = {
    //   ...PROMPTS.DATA_EXTRACTION,
    //   content: [
    //     PROMPTS.DATA_EXTRACTION.content[0],
    //     {
    //       type: "image",
    //       source: {
    //         type: "base64",
    //         media_type: "image/png",
    //         data: imageBase64,
    //       },
    //     },
    //   ],
    // };
    // const rawJsonText = await bedrockService.sendMessage([extractionPrompt]);

    // // Step 3: Validate
    // const validationResult = await bedrockService.sendMessage([
    //   PROMPTS.VALIDATION,
    // ]);
    // console.log("Validation Result:\n", validationResult);

    const extractionPrompt = {
      ...PROMPTS.EXTRACTION_INSTRUCTIONS,
      content: [
        PROMPTS.EXTRACTION_INSTRUCTIONS.content[0],
        {
          type: "image",
          source: {
            type: "base64",
            media_type: "image/png",
            data: imageBase64,
          },
        },
      ],
    };
    const extractionInstructions = await bedrockService.sendMessage([
      extractionPrompt,
    ]);
    // console.log("Extraction Instructions:\n", extractionInstructions);

    // Step 4: Save results
    const extractedData = fileUtils.extractJsonFromText(extractionInstructions);
    fileUtils.saveJsonToFile(extractedData);
    console.log("Finished successfully");
  } catch (error) {
    console.error("❌ Error in main process:", error);
    process.exit(1);
  }
}

main();
