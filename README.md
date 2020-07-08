# CaseContextTrigger

Disclaimer: This component was built by the community at large and is not an official Coveo JSUI Component. Use this component at your own risk.

## Getting Started

1. Install the component into your project.

```
npm i @coveops/case-context-trigger
```

2. Use the Component or extend it

Typescript:

```javascript
import { CaseContextTrigger, ICaseContextTriggerOptions } from '@coveops/case-context-trigger';
```

Javascript

```javascript
const CaseContextTrigger = require('@coveops/case-context-trigger').CaseContextTrigger;
```

3. You can also expose the component alongside other components being built in your project.

```javascript
export * from '@coveops/case-context-trigger'
```

4. Include the component in your template as follows:

Place the component after the last tab in the `coveo-tab-section`

```html
<div class="CoveoCaseContextTrigger"></div>
```

## Extending

Extending the component can be done as follows:

```javascript
import { CaseContextTrigger, ICaseContextTriggerOptions } from "@coveops/case-context-trigger";

export interface IExtendedCaseContextTriggerOptions extends ICaseContextTriggerOptions {}

export class ExtendedCaseContextTrigger extends CaseContextTrigger {}
```

## Contribute

1. Clone the project
2. Copy `.env.dist` to `.env` and update the COVEO_ORG_ID and COVEO_TOKEN fields in the `.env` file to use your Coveo credentials and SERVER_PORT to configure the port of the sandbox - it will use 8080 by default.
3. Build the code base: `npm run build`
4. Serve the sandbox for live development `npm run serve`