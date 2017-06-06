# axe-testcafe
The helper for using Axe in TestCafe tests

## How to install it?

```bash
npm install axe-testcafe
```

## How to use it?

You can write a TestCafe test with automated accessibility checks like this. 

```js
import axeCheck from 'axe-testcafe';

fixture `TestCafe tests with Axe`
    .page `http://example.com`;

test('Automated accessibility testing', async t => {
    await axeCheck(t);
});
```

If some accessibility problems are found, you will see the corresponding error.

![Accessibility errors](https://github.com/helen-dikareva/axe-testcafe/blob/master/errors.png)

## Axe options

Please see the [Axe run](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axerun) method API.
You can define `context` and `options` in a TestCafe test:

```js
test('Automated accessibility testing', async () => {
    var axeContext = { exclude: [['select']] };
    var axeOptions = { rules: { 'html-has-lang': { enabled: false } } };

    await axeCheck(t, axeContext, axeOptions);
});

```
