// import {
//   BedrockRuntimeClient,
//   InvokeModelCommand,
// } from "@aws-sdk/client-bedrock-runtime";
// import { fromEnv } from "@aws-sdk/credential-providers";
// import fs from "fs";

// // Step 0: Config
// const imagePath = "./image.png"; // Your table image
// const outputJsonPath = "./output.json";

// const client = new BedrockRuntimeClient({
//   region: "eu-north-1",
//   credentials: fromEnv(),
// });
// const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });
// // Step 1: Start conversation
// let chatHistory = [
//   {
//     role: "user",
//     content: [
//       {
//         type: "text",
//         text: "Hi! Can you tell me what kind of layout this image shows? Just say one of: 'table', 'cards', 'form', or 'list'.",
//       },
//       {
//         type: "image",
//         source: {
//           type: "base64",
//           media_type: "image/png",
//           data: imageBase64,
//         },
//       },
//     ],
//   },
// ];
// // Helper to send message to Claude
// async function sendClaudeMessage() {
//   const command = new InvokeModelCommand({
//     modelId:
//       "arn:aws:bedrock:eu-north-1:905418341083:inference-profile/eu.anthropic.claude-3-7-sonnet-20250219-v1:0",
//     contentType: "application/json",
//     accept: "application/json",
//     body: JSON.stringify({
//       anthropic_version: "bedrock-2023-05-31",
//       messages: chatHistory,
//       max_tokens: 4096,
//       temperature: 0.2,
//     }),
//   });

//   const response = await client.send(command);
//   const result = JSON.parse(Buffer.from(response.body).toString());
//   return result.content[0].text;
// }

// // Step 2: Detect layout
// const layoutType = await sendClaudeMessage();
// console.log("Detected layout:", layoutType);
// chatHistory.push({
//   role: "assistant",
//   content: [{ type: "text", text: layoutType }],
// });

// // Step 3: Ask for full extraction
// chatHistory.push({
//   role: "user",
//   content: [
//     {
//       type: "text",
//       text:
//         "Please extract the table from the image as a JSON array, but only include primary rows — do not extract sub-rows, nested rows, or continuation lines as separate objects." +
//         "Instead, merge sub-rows into the parent row, combining their contents into the appropriate field(s) — typically the description field or another related property." +
//         "Use your judgment to determine if a row is a sub-row (e.g., if it appears indented, lacks key fields, or continues the line above)." +
//         "The final JSON should only contain one object per logical row, with any relevant content from sub-rows merged into that row’s properties." +
//         "At the end, explain briefly if you skipped any rows and why (e.g., they were nested, continuation lines, etc).",
//       // "Each row should include all the fields visible, even if a value is missing. " +
//       // "Be extremely accurate — don’t skip or merge rows. Return just a JSON array with clean values.",
//     },
//   ],
// });

// const rawJsonText = await sendClaudeMessage();
// chatHistory.push({
//   role: "assistant",
//   content: [{ type: "text", text: rawJsonText }],
// });

// // Step 4: Validate
// chatHistory.push({
//   role: "user",
//   content: [
//     {
//       type: "text",
//       text:
//         "Please validate the data. Check if all rows are extracted, none are missing, and that all objects have the same fields. " +
//         "Also report if any fields are empty or clearly malformed.",
//     },
//   ],
// });
// const validation = await sendClaudeMessage();
// chatHistory.push({
//   role: "assistant",
//   content: [{ type: "text", text: validation }],
// });

// console.log("Validation Result:\n", validation);

// // Step 5: Save JSON to file (robust parsing)
// let extractedData;
// try {
//   const match = rawJsonText.match(/(\[.*\])/s); // crude but practical
//   if (!match) throw new Error("Could not find JSON array in response");
//   extractedData = JSON.parse(match[1]);
//   fs.writeFileSync(outputJsonPath, JSON.stringify(extractedData, null, 2));
//   console.log(`✅ Saved parsed data to: ${outputJsonPath}`);
// } catch (err) {
//   console.error("❌ Failed to parse JSON:", err.message);
// }


