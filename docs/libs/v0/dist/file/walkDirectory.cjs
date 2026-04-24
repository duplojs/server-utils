'use strict';

var utils = require('@duplojs/utils');
var GG = require('@duplojs/utils/generator');
var EE = require('@duplojs/utils/either');
var PP = require('@duplojs/utils/pattern');
var implementor = require('../implementor.cjs');
var fileInterface = require('./fileInterface.cjs');
var folderInterface = require('./folderInterface.cjs');
var unknownInterface = require('./unknownInterface.cjs');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var GG__namespace = /*#__PURE__*/_interopNamespaceDefault(GG);
var EE__namespace = /*#__PURE__*/_interopNamespaceDefault(EE);
var PP__namespace = /*#__PURE__*/_interopNamespaceDefault(PP);

/**
 * {@include file/walkDirectory/index.md}
 */
const walkDirectory = implementor.implementFunction("walkDirectory", {
    NODE: async (path, params) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.readdir(path, {
            recursive: params?.recursive ?? false,
            withFileTypes: true,
        })
            .then(utils.innerPipe(GG__namespace.map(utils.innerPipe(PP__namespace.when((dirent) => dirent.isFile(), ({ parentPath, name }) => fileInterface.createFileInterface(`${parentPath}/${name}`)), PP__namespace.when((dirent) => dirent.isDirectory(), ({ parentPath, name }) => folderInterface.createFolderInterface(`${parentPath}/${name}`)), PP__namespace.otherwise(({ parentPath, name }) => unknownInterface.createUnknownInterface(`${parentPath}/${name}`)))), EE__namespace.success))
            .catch((value) => EE__namespace.left("file-system-walk-directory", value));
    },
});

exports.walkDirectory = walkDirectory;
