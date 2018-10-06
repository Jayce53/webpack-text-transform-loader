'use strict';

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};

var loaderUtils = require('loader-utils');

function textTransformLoader(srcContent) {
    var loaderOptions = loaderUtils.getOptions(this);

    var _ref = this.options || {},
        _ref$textTransformLoa = _ref.textTransformLoader,
        compilerOptions = _ref$textTransformLoa === undefined ? {} : _ref$textTransformLoa;

    if (typeof compilerOptions === 'function') {
        compilerOptions = compilerOptions.call(this, this);
    }

    var _loaderOptions$pack = loaderOptions.pack,
        pack = _loaderOptions$pack === undefined ? 'default' : _loaderOptions$pack;


    var options = _extends({}, pack in compilerOptions ? compilerOptions[pack] : compilerOptions, loaderOptions);

    if (typeof this.cacheable === 'function') {
        this.cacheable(!compilerOptions.noCache);
    }

    var content = srcContent;

    const exclude = options.exclude && options.exclude.test(this.resourcePath);
    const include = !options.include || options.include.test(this.resourcePath);
    if (include && !exclude) {
        var prependText = options.prependText,
            appendText = options.appendText,
            transformText = options.transformText;

        if (typeof transformText === 'function') {
            content = transformText(content, loaderOptions);
        }
        if (prependText) {
            content = prependText + content;
        }
        if (appendText) {
            content += appendText;
        }
    }
    return content;
}

module.exports = textTransformLoader;
