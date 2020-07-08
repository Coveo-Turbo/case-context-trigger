import { 
  $$,
  Dom,
  Component,
  SearchInterface,
  ResponsiveComponentsManager,
  IResponsiveComponent, 
  IResponsiveComponentOptions } from 'coveo-search-ui';

import { CaseContextTrigger } from './CaseContextTrigger';

export class ResponsiveCaseContextTrigger implements IResponsiveComponent { 
  
  private smallCaseContextTriggerClassName: string = 'coveo-small-case-context-trigger';
  private static CASE_CONTEXT_BADGE_CSS_CLASS = 'coveo-case-context-trigger-badge';
  private static CASE_CONTEXT_HEADER_WRAPPER_CSS_CLASS = 'coveo-case-context-wrapper';

  private searchInterface: SearchInterface;
  private caseContextTrigger: CaseContextTrigger;
  private badge: Dom;
  private badgeHeaderLabel: string;
  private breakpoint: number;
  private searchBoxElement: HTMLElement;
  private caseContextHeaderWrapper: Dom;

  constructor(private coveoRoot: Dom, public ID: string, options: IResponsiveComponentOptions) {
    
    this.searchInterface = <SearchInterface>Component.get(this.coveoRoot.el, SearchInterface, false);
    this.caseContextTrigger = <CaseContextTrigger>Component.get(this.coveoRoot.find('.CoveoCaseContextTrigger'), CaseContextTrigger, false);
    this.searchBoxElement = this.getSearchBoxElement();

    this.caseContextHeaderWrapper = $$('div', {
        className: ResponsiveCaseContextTrigger.CASE_CONTEXT_HEADER_WRAPPER_CSS_CLASS
    });

    
    this.badgeHeaderLabel = Coveo.l(this.caseContextTrigger.options.notificationMsg);
    this.badge = this.buildBadge();
    this.breakpoint = options.responsiveBreakpoint;

  }

  public static init(root: HTMLElement, component: Component, options: IResponsiveComponentOptions) {
    ResponsiveComponentsManager.register(ResponsiveCaseContextTrigger, $$(root), CaseContextTrigger.ID, component, options);
  }

  handleResizeEvent(): void {
    this.addCaseContextHeaderWrapperIfNeeded();
    if (this.needSmallMode() && !this.isSmallCaseContextTriggerActivated(this.coveoRoot)) {
      this.changeToSmallMode();
    } else if (!this.needSmallMode() && this.isSmallCaseContextTriggerActivated(this.coveoRoot)) {
      this.changeToLargeMode();
    }
  }

  private buildBadge(): Dom {
    let baddgeElement = $$('div', {className: ResponsiveCaseContextTrigger.CASE_CONTEXT_BADGE_CSS_CLASS });
    let content = $$('p');
    content.text(this.badgeHeaderLabel);
    baddgeElement.el.appendChild(content.el);
    return baddgeElement;
  }
  private needSmallMode(): boolean {
    // Ignore everything if the responsiveMode is not auto.
    if (!this.searchInterface) {
      return this.shouldAutoModeResolveToSmall();
    }
    switch (this.searchInterface.responsiveComponents.getResponsiveMode()) {
      case 'small':
      case 'medium':
        return true;
      case 'auto':
      default:
        return this.shouldAutoModeResolveToSmall();
    }
  }

  private shouldAutoModeResolveToSmall() {
    const breakoutWidth = this.breakpoint;
    if (this.coveoRoot.width() <= breakoutWidth) {
      return true;
    } else if (!this.isSmallCaseContextTriggerActivated(this.coveoRoot)) {
      return this.isOverflowing(this.caseContextTrigger.element);
    } else {
      return this.isOverflowing(this.caseContextTrigger.element);
    }
  }

  private changeToSmallMode(): void {
    if(!$$(this.caseContextTrigger.element).hasClass('coveo-hidden')){
      $$(this.coveoRoot.find(`.${ResponsiveCaseContextTrigger.CASE_CONTEXT_HEADER_WRAPPER_CSS_CLASS}`)).append(
        this.badge.el
      );
    } else {
      this.badge.detach();
    }
    
    this.coveoRoot.addClass(this.smallCaseContextTriggerClassName);
    
  }

  private changeToLargeMode(): void {
    this.badge.detach();
    this.coveoRoot.removeClass(this.smallCaseContextTriggerClassName);
  }


  private isOverflowing(el: HTMLElement) {
    return el.clientWidth < el.scrollWidth;
  }

  private isSmallCaseContextTriggerActivated(root: Dom): boolean {
    return root.hasClass(this.smallCaseContextTriggerClassName);
  }

  private addCaseContextHeaderWrapperIfNeeded = function () {
      if (this.needSmallMode()) {
          
          if (this.searchBoxElement) {
              this.caseContextHeaderWrapper.insertBefore(this.searchBoxElement);
          }
          else {
              this.coveoRoot.prepend(this.caseContextHeaderWrapper.el);
          }
      }
  };
  private getSearchBoxElement = function () {
      var searchBoxElement = this.coveoRoot.find('.coveo-search-section');
      if (searchBoxElement) {
          return searchBoxElement;
      }
      else {
          return this.coveoRoot.find('.CoveoSearchbox');
      }
  };

  
}