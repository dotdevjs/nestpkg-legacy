"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestCoreModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const services_1 = require("./services");
let NestCoreModule = class NestCoreModule {
};
NestCoreModule = tslib_1.__decorate([
    common_1.Global(),
    common_1.Module({
        providers: [
            {
                provide: core_1.NestContainer,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                useFactory: (m) => m.container,
                inject: [core_1.ModuleRef],
            },
            services_1.ServiceExplorer,
            services_1.ModuleExplorer,
        ],
        exports: [core_1.NestContainer, services_1.ServiceExplorer, services_1.ModuleExplorer],
    })
], NestCoreModule);
exports.NestCoreModule = NestCoreModule;
//# sourceMappingURL=nest-core.module.js.map