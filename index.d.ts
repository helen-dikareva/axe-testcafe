declare module 'axe-testcafe' {
  import { ElementContext, RunOnly, AxeResults, Result } from 'axe-core';
  import 'testcafe';

  export function axeCheck(
    t: TestController,
    context?: ElementContext,
    options?: {
      runOnly?: RunOnly;
      rules?: Object;
      iframes?: Boolean;
      elementRef?: Boolean;
      selectors?: Boolean;
    }
  ): Promise<AxeResults>;

  export function createReport(violations: Result[]): string;
}