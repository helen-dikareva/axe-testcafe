# axe-testcafe
The TestCafe module that allows you to use the [aXe](https://github.com/dequelabs/axe-core) accessibility engine in TestCafe tests.

## Installation

```bash
npm install axe-testcafe
```

## How to use

You can write a TestCafe test with automated accessibility checks like this.

```js
import axeCheck from 'axe-testcafe';

fixture `TestCafe tests with Axe`
    .page `http://example.com`;

test('Automated accessibility testing', async t => {
    await axeCheck(t);
});
```

If any accessibility issues are found, you will see a detailed report.

![Accessibility errors](https://github.com/helen-dikareva/axe-testcafe/blob/master/errors.png)

## aXe options

The `axe-testcafe` module allows you to define the `context` and `options` [axe.run parameters](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axerun) in a TestCafe test.

```js
test('Automated accessibility testing', async () => {
    var axeContext = { exclude: [['select']] };
    var axeOptions = { rules: { 'html-has-lang': { enabled: false } } };

    await axeCheck(t, axeContext, axeOptions);
});
