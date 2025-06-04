export const CONFIG = {
  AWS: {
    REGION: "eu-north-1",
    MODEL_ID: "arn:aws:bedrock:eu-north-1:905418341083:inference-profile/eu.anthropic.claude-3-7-sonnet-20250219-v1:0",
  },
  FILES: {
    IMAGE_PATH: "./src/assets/image.png",
    OUTPUT_PATH: "./src/results/output.json",
  },
  MODEL: {
    MAX_TOKENS: 4096,
    TEMPERATURE: 0.2,
  },
}; 