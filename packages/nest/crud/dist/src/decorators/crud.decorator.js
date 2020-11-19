"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crud = void 0;
const fp = require("lodash/fp");
const crud_1 = require("@nestjsx/crud");
exports.Crud = (options) => {
    const defaultOptions = {
        query: {
            alwaysPaginate: true,
        },
        routes: {
            createOneBase: {
                returnShallow: true,
            },
            updateOneBase: {
                returnShallow: true,
            },
            replaceOneBase: {
                returnShallow: true,
            },
        },
        serialize: {
            create: options.serializeAll || false,
            createMany: options.serializeAll || false,
            delete: options.serializeAll || false,
            get: options.serializeAll || false,
            getMany: options.serializeAll || false,
            replace: options.serializeAll || false,
            update: options.serializeAll || false,
        },
    };
    options = fp.merge(defaultOptions, options);
    return crud_1.Crud(options);
};
//# sourceMappingURL=crud.decorator.js.map