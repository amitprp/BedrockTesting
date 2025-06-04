# AI-Driven Scraper Framework: Implementation Plan

**Reference:** [AI-Driven Scraper Framework Notion Doc](https://www.notion.so/montopay/AI-Driven-Scraper-Framework-207efff0eed6809fbb57e8fef9b5dec5?source=copy_link)

---

## 1. Modules & Core Files

### A. Core Modules
- **Step Planner & Executor**
  - `planner/aiStepPlanner.ts`
  - `executor/stepExecutor.ts`
- **Model Routing**
  - `bedrock/modelRouter.ts`
- **Step Definitions & Interfaces**
  - `steps/stepTypes.ts`
  - `steps/stepRegistry.ts`
- **Scraper Orchestration**
  - `scraper/scraper.ts`
  - `scraper/config.json`
- **Utilities & Common**
  - `utils/logger.ts`
  - `utils/http.ts`
  - `types/common.ts`
- **Entry Point**
  - `index.ts`

---

## 2. File Purpose, Functionality & Example

### 1. `planner/aiStepPlanner.ts`
- **Purpose:** Unified interface to Bedrock models for planning next scraping steps.
- **Functionality:**
  - Accepts current scraper state/context.
  - Calls appropriate Bedrock model via `modelRouter`.
  - Returns a list of planned steps (e.g., `goto`, `click`, `extractTable`).
- **Example:**
  ```ts
  const plan = await aiStepPlanner.planNextSteps({
    url: 'https://example.com',
    lastStep: 'goto',
    data: {}
  });
  // plan = [ { type: 'click', selector: '#login' }, ... ]
  ```

### 2. `executor/stepExecutor.ts`
- **Purpose:** Executes planned steps using Puppeteer/Playwright.
- **Functionality:**
  - Receives step list and browser context.
  - Dispatches each step to the correct handler (from `stepRegistry`).
  - Handles errors, retries, and step results.
- **Example:**
  ```ts
  await stepExecutor.executeSteps(plan, browserContext);
  ```

### 3. `bedrock/modelRouter.ts`
- **Purpose:** Routes requests to the correct Bedrock model based on config or step type.
- **Functionality:**
  - Abstracts model selection logic.
  - Handles API calls, authentication, and error handling.
- **Example:**
  ```ts
  const response = await modelRouter.callModel('claude', prompt);
  ```

### 4. `steps/stepTypes.ts`
- **Purpose:** Defines TypeScript interfaces/types for all supported step actions.
- **Functionality:**
  - E.g., `GotoStep`, `ClickStep`, `ExtractTableStep`, etc.
- **Example:**
  ```ts
  export interface GotoStep { type: 'goto'; url: string; }
  export interface ClickStep { type: 'click'; selector: string; }
  export interface ExtractTableStep { type: 'extractTable'; selector: string; }
  ```

### 5. `steps/stepRegistry.ts`
- **Purpose:** Maps step types to their executor functions.
- **Functionality:**
  - Registry pattern for step handlers.
  - Easy to add new step types.
- **Example:**
  ```ts
  stepRegistry.register('click', clickHandler);
  stepRegistry.register('extractTable', extractTableHandler);
  ```

### 6. `scraper/scraper.ts`
- **Purpose:** Orchestrates the scraping flow: loads config, invokes planner, executes steps.
- **Functionality:**
  - Loads `config.json`.
  - Initializes browser.
  - Loops: plan → execute → update state.
- **Example:**
  ```ts
  const config = loadConfig('scraper/config.json');
  await runScraper(config);
  ```

### 7. `scraper/config.json`
- **Purpose:** Declarative config for scraper flows.
- **Functionality:**
  - Defines target URLs, step sequences, model preferences, etc.
- **Example:**
  ```json
  {
    "startUrl": "https://example.com",
    "steps": [
      { "type": "goto", "url": "https://example.com/login" },
      { "type": "click", "selector": "#login" }
    ],
    "model": "claude"
  }
  ```

### 8. `utils/logger.ts`
- **Purpose:** Centralized logging utility.
- **Functionality:**
  - Handles log levels, formatting, and output.
- **Example:**
  ```ts
  logger.info('Step executed', { step });
  logger.error('Step failed', { error });
  ```

### 9. `utils/http.ts`
- **Purpose:** HTTP helpers for model API calls, retries, etc.
- **Example:**
  ```ts
  const data = await http.post(url, payload);
  ```

### 10. `types/common.ts`
- **Purpose:** Shared types/interfaces (e.g., scraper state, model response).
- **Example:**
  ```ts
  export interface ScraperState { url: string; data: any; }
  export interface ModelResponse { steps: Step[]; }
  ```

### 11. `index.ts`
- **Purpose:** Entry point; parses CLI args, starts the scraper.
- **Example:**
  ```ts
  // index.ts
  import { runScraper } from './scraper/scraper';
  const configPath = process.argv[2] || 'scraper/config.json';
  runScraper(configPath);
  ```

---

## 3. TODOs & Scaffolded Blocks

### A. Step Planner & Executor
- [ ] Implement `aiStepPlanner` to call Bedrock models and parse responses.
- [ ] Design `stepExecutor` to handle step dispatch, error handling, and result aggregation.

### B. Model Routing
- [ ] Build `modelRouter` to abstract Bedrock model selection and API calls.

### C. Step Definitions
- [ ] Define TypeScript interfaces for all step types in `stepTypes.ts`.
- [ ] Register step handlers in `stepRegistry.ts`.

### D. Scraper Orchestration
- [ ] Implement config loader and validation.
- [ ] Build main orchestration loop in `scraper.ts`.

### E. Utilities
- [ ] Set up logging and HTTP utilities.
- [ ] Define shared types in `common.ts`.

### F. Entry Point
- [ ] Parse CLI args and start the main scraper flow.

---

## 4. Special Focus Areas

### A. Unified AI Step Planner & Executor
- Modularize planner and executor for easy extension.
- Ensure planner can handle dynamic, config-driven flows.

### B. Bedrock Model Routing
- Clean abstraction for model selection and API integration.
- Support for multiple models and fallback logic.

### C. Step Definitions & Interfaces
- Strong typing for all step actions.
- Easy to add new step types and handlers.

### D. Config-Driven Flows
- Support for both static and dynamic (AI-planned) step sequences.
- Clear schema for `config.json`.

---

## 5. Summary Table

| Module/Folder      | File(s)                  | Purpose/Notes                                  |
|--------------------|--------------------------|------------------------------------------------|
| planner/           | aiStepPlanner.ts         | AI-driven step planning                        |
| executor/          | stepExecutor.ts          | Step execution logic                           |
| bedrock/           | modelRouter.ts           | Bedrock model routing                          |
| steps/             | stepTypes.ts, stepRegistry.ts | Step definitions & registry               |
| scraper/           | scraper.ts, config.json  | Orchestration & config                         |
| utils/             | logger.ts, http.ts       | Logging & HTTP utilities                       |
| types/             | common.ts                | Shared types/interfaces                        |
| .                  | index.ts                 | Entry point                                    |

---

**Reference:**  [AI-Driven Scraper Framework Notion Doc](https://www.notion.so/montopay/AI-Driven-Scraper-Framework-207efff0eed6809fbb57e8fef9b5dec5?source=copy_link) 