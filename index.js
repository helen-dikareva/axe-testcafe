var fs       = require('fs');
var path     = require('path');
var testcafe = require('testcafe');

var ClientFunction = testcafe.ClientFunction;

var AXE_DIR_PATH = path.dirname(require.resolve('axe-core'));
var AXE_SCRIPT   = fs.readFileSync(path.join(AXE_DIR_PATH, 'axe.min.js')).toString();

function AxeError (message) {
    Error.call(this, message);

    this.name    = 'AxeError';
    this.message = message;

    if (typeof Error.captureStackTrace === 'function')
        Error.captureStackTrace(this, AxeError);
    else
        this.stack = (new Error(message)).stack;
}

AxeError.prototype = Object.create(Error.prototype);

var hasAxe = ClientFunction(function () {
    return !!(window.axe && window.axe.run);
});

var injectAxe = ClientFunction(function () {
    eval(AXE_SCRIPT);
}, { dependencies: { AXE_SCRIPT: AXE_SCRIPT } });

var runAxe = ClientFunction(function (context, options) {
    return new Promise(function (resolve) {
        axe.run(context || document, options || {}, function (err, results) {
            if (err)
                return resolve(err.message);

            var errors = '';

            if (results.violations.length !== 0) {
                results.violations.forEach(function (violation) {
                    errors += violation.help + '\n\tnodes:\n';

                    violation.nodes.forEach(function (node) {
                        var targetNodes = node.target.map(function (target) {
                            return '"' + target + '"';
                        }).join(', ');

                        errors += '\t\t' + targetNodes + '\n';
                    });
                });
            }

           return resolve(errors);
        });
    })
});

module.exports = function axeCheck (t, context, options) {
    return hasAxe.with({ boundTestRun: t })()
        .then(function (result) {
            if (!result)
                return injectAxe.with({ boundTestRun: t })();

            return Promise.resolve();
        })
        .then(function () {
            return runAxe.with({ boundTestRun: t })(context, options);
        })
        .then(function (error) {
            if (error)
                throw new AxeError('\n' + error);
        });
};