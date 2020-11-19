"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceExplorer = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let ServiceExplorer = class ServiceExplorer {
    constructor(container) {
        this.container = container;
    }
    scan() {
        const values = [...this.container.getModules().values()];
        const components = values.map((module) => module.components);
        return lodash_1.chain(components.map((component) => [...component.values()].filter(({ metatype }) => !!metatype)))
            .flattenDeep()
            .compact()
            .value();
    }
};
ServiceExplorer = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [core_1.NestContainer])
], ServiceExplorer);
exports.ServiceExplorer = ServiceExplorer;
//# sourceMappingURL=service-explorer.service.js.map