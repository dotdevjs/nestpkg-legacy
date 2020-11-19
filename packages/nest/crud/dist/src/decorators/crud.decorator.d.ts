import { Type } from '@nestjs/common';
import { CrudOptions as BaseCrudOptions } from '@nestjsx/crud';
export declare type CrudOptions = {
    serializeAll?: Type<unknown> | false;
} & BaseCrudOptions;
export declare const Crud: (options?: CrudOptions) => (target: Object) => void;
