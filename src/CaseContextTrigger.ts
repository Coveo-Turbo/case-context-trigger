import { Component, IComponentBindings, ComponentOptions } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface ICaseContextTriggerOptions {}

@lazyComponent
export class CaseContextTrigger extends Component {
    static ID = 'CaseContextTrigger';
    static options: ICaseContextTriggerOptions = {};

    constructor(public element: HTMLElement, public options: ICaseContextTriggerOptions, public bindings: IComponentBindings) {
        super(element, CaseContextTrigger.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, CaseContextTrigger, options);
    }
}