# CaseContextTrigger

The CaseContextTrigger component renders **ONLY** if a Trigger Rule has been added into the corresponding query pipeline. 
The Trigger Rule must be an ``Execute`` Rule that will call the following JavaScript Function:

``` JavaScript
CaseContextTrigger(notification_msg, case_number, case_subject)
```

![image](https://share.getcloudapp.com/items/d5uW2BmQ/download)

Note: This Trigger Rule should ALWAYS be associated to a condition related to the current Context and you also do not want to see that notification if the query is not empty.

This component will allow you to execute `CaseContextTrigger` JavasScript Function from a Trigger Rule in your pipeline.
When the Trigger Rule is being executed, depending on its current mode (Large or Small), this component renders a Banner (Large mode) 
or a Badge (Small mode) based on the infos passed to the JavaScript Function in order to notify the user that current query is using a certain context.
 
When `caseNumber` and/or `caseSubject` options are undefined, parameters `case_number` and `case_subject` that are passed 
to the `CaseContextTrigger` Function will be considered as Key value of the current Context Object which mean the Subject that will be 
displayed in the Banner will be the result of Context[case_subject].

  - See [Trigger - Query Pipeline Feature](https://docs.coveo.com/en/1458/cloud-v2-developers/trigger-query-pipeline-feature)
  - Refer also to [ResponsiveCaseContextTrigger](./ResponsiveCaseContextTrigger.ts)

| CaseContextTrigger (Large Mode)                                        |
| ---------------------------------------------------------------------- |
| ![image](https://share.getcloudapp.com/items/4gujW065/download)        |

| CaseContextTrigger (Small Mode)                                        |
| ---------------------------------------------------------------------- |
| ![image](https://share.getcloudapp.com/items/7KumnB7v/download)        |


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

4. Or for quick testing, you can add the script from unpkg

```html
<script src="https://unpkg.com/@coveops/case-context-trigger@latest/dist/index.min.js"></script>
```

> Disclaimer: Unpkg should be used for testing but not for production.

5. Include the component in your template as follows:

Add the following markup to your template:

```html
<div class="CoveoCaseContextTrigger"></div>
```
## Options

The following options can be configured:

|         Option          | Required |       Type       |               Default                |                                                     Notes                                                      |
| ----------------------- | -------- | ---------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `notificationMsg`       | No       | localized string | `CaseContextTrigger_NotificationMsg` | Specifies the notification message of the Case Context Banner.                                                 |
| `enableNotificationMsg` | No       | boolean          | `true`                               | Specifies whether to display the notification message in the Case Context Banner when large mode is activated. |
| `caseNumber`            | No       | string           | ` `                                  | Specifies the case Number that will be displayed in the Case Context Banner.                                   |
| `caseSubject`           | No       | string           | ` `                                  | Specifies the case Subject / title that will be displayed in the Case Context Banner.                          |
| `enableResponsiveMode`  | No       | boolean          | `true`                               | Specifies whether to enable responsive mode for CaseContextTrigger                                             |

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
