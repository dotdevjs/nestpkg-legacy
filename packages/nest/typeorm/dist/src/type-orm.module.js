"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
class TypeOrmModule {
    static forTest(options) {
        options = Object.assign({ type: 'sqlite', database: ':memory:', autoLoadEntities: true, dropSchema: true, synchronize: true, logging: false }, (options || []));
        return typeorm_1.TypeOrmModule.forRoot(options);
    }
}
exports.TypeOrmModule = TypeOrmModule;
//# sourceMappingURL=type-orm.module.js.map