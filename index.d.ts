declare module 'axe-testcafe' {
  import { ElementContext, RunOnly, AxeResults, Result } from 'axe-core';
  import 'testcafe';

  interface AxeTestCafeResult {
    error: Error | null;
    violations?: Result[];
  }

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
  ): Promise<AxeTestCafeResult>;

  export function createReport(violations: Result[]): string;
}