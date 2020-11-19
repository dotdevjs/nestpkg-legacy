"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleExplorer = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let ModuleExplorer = class ModuleExplorer {
    constructor(container) {
        this.container = container;
    }
    scan() {
        return [...this.container.getModules().values()];
    }
};
ModuleExplorer = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [core_1.NestContainer])
], ModuleExplorer);
exports.ModuleExplorer = ModuleExplorer;
//# sourceMappingURL=module-explorer.service.js.map