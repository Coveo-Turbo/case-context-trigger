import { Component, IComponentBindings, ComponentOptions, IResponsiveComponentOptions, IResultsComponentBindings } from 'coveo-search-ui';
import { ResponsiveCaseContextTrigger } from "./ResponsiveCaseContextTrigger";
import { lazyComponent } from '@coveops/turbo-core';

export interface ICaseContextTriggerOptions extends IResponsiveComponentOptions {
  caseSubject?: string;
  caseNumber?: string;
  enableNotificationMsg?: boolean;
  notificationMsg?:string;
}
/**
* The CaseContextTrigger component renders **ONLY** if a Trigger Rule has been added into the corresponding query pipeline. 
* The Trigger Rule must be an ``Execute`` Rule that will call the following JavaScript Function:
* 
* ``` JavaScript
* CaseContextTrigger(notification_msg, case_number, case_subject)
* ```
*
* Note: This Trigger Rule should ALWAYS be associated to a condition related to the current Context and you also do not want to see that notification if the query is not empty.
*
* This component will allow you to execute `CaseContextTrigger` JavasScript Function from a Trigger Rule in your pipeline.
* When the Trigger Rule is being executed, depending on its current mode (Large or Small), this component renders a Banner (Large mode) 
* or a Badge (Small mode) based on the infos passed to the JavaScript Function in order to notify the user that current query is using a certain context.
*  
* When `caseNumber` and/or `caseSubject` options are undefined, parameters `case_number` and `case_subject` that are passed 
* to the `CaseContextTrigger` Function will be considered as Key value of the current Context Object which mean the Subject that will be 
* displayed in the Banner will be the result of Context[case_subject].
*
*   - See [Trigger - Query Pipeline Feature](https://docs.coveo.com/en/1458/cloud-v2-developers/trigger-query-pipeline-feature)
*   - Refer also to [ResponsiveCaseContextTrigger](./ResponsiveCaseContextTrigger.ts)
*/
@lazyComponent
export class CaseContextTrigger extends Component {
    static ID = 'CaseContextTrigger';
    /**
     * The options for the component
     * @componentOptions
     */
    static options: ICaseContextTriggerOptions = {
        /**
        * Specifies the notification message of the Case Context Banner.
        *
        * Default value is the localized string ``CaseContextTrigger_NotificationMsg``.
        * 
        */
        notificationMsg: ComponentOptions.buildLocalizedStringOption({defaultValue: Coveo.l('CaseContextTrigger_NotificationMsg')}),
        /**
        * Specifies whether to display the notification message in the Case Context Banner when large mode is activated.
        *
        * Default value is true.
        * 
        */
        enableNotificationMsg: ComponentOptions.buildBooleanOption({defaultValue: true}),
        /**
        * Specifies the case Number that will be displayed in the Case Context Banner. 
        * This will not be visible when small mode is activated.
        *
        * Default value is ``undefined``.
        * 
        */
        caseNumber: ComponentOptions.buildStringOption(),
        /**
        * Specifies the case Subject / title that will be displayed in the Case Context Banner. 
        * This will not be visible when small mode is activated.
        *
        * Default value is ``undefined``.
        * 
        */
        caseSubject: ComponentOptions.buildStringOption(),

        /**
        * Specifies whether to enable responsive mode for CaseContextTrigger. 
        * Responsive mode makes overflowing Case Context Banner disappear, instead
        * making it available using a simple badge. Responsive CaseContextTrigger are enabled either when Case Context Banner overflow or when the
        * width of the search interface becomes too small.
        *
        * Default value is true.
        * 
        */
        enableResponsiveMode: ComponentOptions.buildBooleanOption({ defaultValue: true, section: 'ResponsiveOptions' }),
        responsiveBreakpoint: ComponentOptions.buildNumberOption({ defaultValue: 480, section: 'ResponsiveOptions'})
    };


    private trigger: Coveo.ITrigger<any>;
    private static caseContextClassName: string = 'coveo-case-context-activated';

    constructor(
        public element: HTMLElement,
        public options: ICaseContextTriggerOptions,
        bindings?: IResultsComponentBindings
    ) {

        super(element, CaseContextTrigger.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, CaseContextTrigger, options);

        this.deactivateCaseContext();
        this.bind.onRootElement(Coveo.QueryEvents.querySuccess, this.handleQuerySuccess);
        this.bind.onRootElement(Coveo.QueryEvents.queryError, () => this.deactivateCaseContext());

        ResponsiveCaseContextTrigger.init(this.root, this, this.options);

    }

    private activateCaseContext() {
        Coveo.$$(this.root).addClass(CaseContextTrigger.caseContextClassName)
    }
    private deactivateCaseContext() {
        Coveo.$$(this.root).removeClass(CaseContextTrigger.caseContextClassName)
    }

    private handleQuerySuccess(data: Coveo.IQuerySuccessEventArgs){
        this.render(data);
    }

    private render(data: Coveo.IQuerySuccessEventArgs){
        Coveo.$$(this.element).empty();
        this.trigger = this.getMatchingExecuteTrigger(data.results.triggers);
        if(this.trigger){
        this.activateCaseContext();
        Coveo.$$(this.element).append(this.buildContextInfo().el);
        } else {
        this.deactivateCaseContext();
        }
    }

    private buildContextInfo(){
        const container = Coveo.$$('div', {
        className: 'coveo-context-info-container'
        });
        const notificationMsg = Coveo.$$('div', {
        className: 'coveo-notification-msg'
        }, Coveo.l(this.trigger.content.params[0]) || this.options.notificationMsg);

        if(this.options.enableNotificationMsg){
        container.append(notificationMsg.el);
        }

        const case_number = this.options.caseNumber || this.searchInterface.getQueryContext()[this.trigger.content.params[1] || 'Case_Id'] || '';
        const case_subject = this.options.caseSubject || this.searchInterface.getQueryContext()[this.trigger.content.params[2] || 'Case_Subject'] || '';

        const icon = Coveo.$$('span', {
        className: 'coveo-icon case',
        title:'Case'
        });

        const title = case_subject ? (case_number ? `[${case_number}] - ${case_subject}`: `${case_subject}`) : '';
        if(title){
        const contextInfo = Coveo.$$('div', {
            className: 'coveo-context-info'
        });
        contextInfo.append(icon.el);
        contextInfo.append(Coveo.$$('span',{},title).el);
        container.append(contextInfo.el);
        }
        return container;
    }
    private getMatchingExecuteTrigger(triggers: Coveo.ITrigger<any>[]){
        return _.find(triggers, (t) => {
        return t.type === 'execute' && t.content && t.content.name === CaseContextTrigger.ID;
        });
    }
}
