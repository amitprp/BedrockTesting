export const PROMPTS = {
  LAYOUT_DETECTION: {
    role: "user",
    content: [
      {
        type: "text",
        text:
          "This image contains a full webpage. Before extracting any data, first identify where the records or data table is located." +
          " Describe briefly what part of the image contains the actual tabular data (e.g., 'center section under the Filings heading')." +
          " Then, proceed with identifying its layout (table, list, etc.). once you have identified the layout, provide me in the response the layout type (e.g., 'table', 'list', etc.), and thats it. no more words, just the layout type.",
      },
    ],
  },
  DATA_EXTRACTION: {
    role: "user",
    content: [
      {
        type: "text",
        text:
          "Please extract the table from the image as a JSON array, but only include primary rows — do not extract sub-rows, nested rows, or continuation lines as separate objects. " +
          "Instead, merge sub-rows into the parent row, combining their contents into the appropriate field(s) — typically the description field or another related property. " +
          "Use your judgment to determine if a row is a sub-row (e.g., if it appears indented, lacks key fields, or continues the line above). " +
          "The final JSON should only contain one object per logical row, with any relevant content from sub-rows merged into that row's properties. " +
          "At the end, explain briefly if you skipped any rows and why (e.g., they were nested, continuation lines, etc).",
      },
    ],
  },
  VALIDATION: {
    role: "user",
    content: [
      {
        type: "text",
        text:
          "Please validate the data. Check if all rows are extracted, none are missing, and that all objects have the same fields. " +
          "Also report if any fields are empty or clearly malformed.",
      },
    ],
  },
  EXTRACTION_INSTRUCTIONS: {
    role: "user",
    content: [
      {
        type: "text",
        text:
          "Please extract the table from the image as a JSON array, but only include primary rows — do not extract sub-rows, nested rows, or continuation lines as separate objects. " +
          "Instead, merge sub-rows into the parent row, combining their contents into the appropriate field(s) — typically the description field or another related property. " +
          "Use your judgment to determine if a row is a sub-row (e.g., if it appears indented, lacks key fields, or continues the line above). " +
          "The final JSON should only contain one object per logical row, with any relevant content from sub-rows merged into that row's properties. " +
          "At the end, explain briefly if you skipped any rows and why (e.g., they were nested, continuation lines, etc)." +
          "Please extract the table from the image as a JSON array, but only include primary rows — do not extract sub-rows, nested rows, or continuation lines as separate objects. " +
          "Instead, merge sub-rows into the parent row, combining their contents into the appropriate field(s) — typically the description field or another related property. " +
          "Use your judgment to determine if a row is a sub-row (e.g., if it appears indented, lacks key fields, or continues the line above). " +
          "The final JSON should only contain one object per logical row, with any relevant content from sub-rows merged into that row's properties. " +
          "At the end, explain briefly if you skipped any rows and why (e.g., they were nested, continuation lines, etc)." +
          "Please validate the data. Check if all rows are extracted, none are missing, and that all objects have the same fields. " +
          "Also report if any fields are empty or clearly malformed." +
          "So your output should be the following: JSON array of objects. so I can parse it directly with JSON.parse()",
      },
    ],
  },
};
