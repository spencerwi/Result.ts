(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Results = (function () {
        function Results() {
        }
        Results.success = function (value) {
            return { isSuccess: true, value: value };
        };
        Results.failure = function (reason) {
            return { isSuccess: false, reason: reason };
        };
        Results.attempt = function (thingToAttempt) {
            try {
                var t = thingToAttempt();
                return Results.success(t);
            }
            catch (e) {
                return Results.failure(e.toString());
            }
        };
        return Results;
    }());
    exports.Results = Results;
});
