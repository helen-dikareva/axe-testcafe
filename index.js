const fs = require('fs');
const path = require('path');
const { ClientFunction } = require('testcafe');
const { red, green, reset } = require('chalk');

const AXE_DIR_PATH = path.dirname(require.resolve('axe-core'));
const AXE_SCRIPT = fs.readFileSync(path.join(AXE_DIR_PATH, 'axe.min.js'), 'utf8');

const hasAxe = ClientFunction(() => !!(window.axe && window.axe.run));

const injectAxe = ClientFunction(() => eval(AXE_SCRIPT), { dependencies: { AXE_SCRIPT } });

const runAxe = ClientFunction((context, options = {}) => {
    return new Promise((resolve) => {
        axe.run(context || document, options, (error, { violations }) => {
            resolve({ error, violations });
        });
    });
});

const createReport = violations => {
    if (!violations.length) {
        return green('0 violations found');
    }

    const report = violations.reduce((acc, { nodes, help }, i) => {

        acc += red(`${i+1}) ${help}\n`);
        
        acc += reset(nodes.reduce((e, { target }) => {
            const targetNodes = target.map((t) => `"${t}"`).join(', ');
            e += `\t${targetNodes}\n`;
            return e;
        },''));

        return acc;

    }, red(`${violations.length} violations found:\n`));

    return reset(report);
    
};

const axeCheck = async (t, context, options) => {
    const hasScript = await hasAxe.with({ boundTestRun: t })();
    if (!hasScript)
        await injectAxe.with({ boundTestRun: t })();

    try {
        return await runAxe.with({ boundTestRun: t })(context, options);
    } catch (e) {
        return { error: e };
    }
};

module.exports = {
    axeCheck,
    createReport
};