import {
  BaseRoute,
  BaseRouteName,
  CrudOptions,
  CrudRequest,
  MergedCrudOptions,
} from '@nestjsx/crud';
import {
  isFalse,
  isArrayFull,
  isObjectFull,
  isFunction,
  objKeys,
  isIn,
  isEqual,
  getOwnPropNames,
  isNil,
  isUndefined,
} from '@nestjsx/util';
import { RequestMethod } from '@nestjs/common';

export class CrudRoutesFactory {
  protected options: MergedCrudOptions;

  constructor(private target: any, options: CrudOptions) {
    this.options = options;
    this.create();
  }

  static create(target: any, options: CrudOptions) {
    return new CrudRoutesFactory(target, options);
  }

  private create() {
    const routesSchema = this.getRoutesSchema();
    this.createRoutes(routesSchema);
  }

  private get targetProto(): any {
    return this.target.prototype;
  }

  private getRoutesSchema(): BaseRoute[] {
    return [
      {
        name: 'getOneBase',
        path: '/',
        method: RequestMethod.GET,
        enable: false,
        override: false,
        withParams: true,
      },
      {
        name: 'getManyBase',
        path: '/',
        method: RequestMethod.GET,
        enable: false,
        override: false,
        withParams: false,
      },
      {
        name: 'createOneBase',
        path: '/',
        method: RequestMethod.POST,
        enable: false,
        override: false,
        withParams: false,
      },
      {
        name: 'createManyBase',
        path: '/bulk',
        method: RequestMethod.POST,
        enable: false,
        override: false,
        withParams: false,
      },
      {
        name: 'updateOneBase',
        path: '/',
        method: RequestMethod.PATCH,
        enable: false,
        override: false,
        withParams: true,
      },
      {
        name: 'replaceOneBase',
        path: '/',
        method: RequestMethod.PUT,
        enable: false,
        override: false,
        withParams: true,
      },
      {
        name: 'deleteOneBase',
        path: '/',
        method: RequestMethod.DELETE,
        enable: false,
        override: false,
        withParams: true,
      },
    ];
  }

  private getManyBase(name: BaseRouteName) {
    this.targetProto[name] = function getManyBase(req: CrudRequest) {
      return this.service.getMany(req);
    };
  }

  private getOneBase(name: BaseRouteName) {
    this.targetProto[name] = function getOneBase(req: CrudRequest) {
      return this.service.getOne(req);
    };
  }

  private createOneBase(name: BaseRouteName) {
    this.targetProto[name] = function createOneBase(
      req: CrudRequest,
      dto: any
    ) {
      return this.service.createOne(req, dto);
    };
  }

  private createManyBase(name: BaseRouteName) {
    this.targetProto[name] = function createManyBase(
      req: CrudRequest,
      dto: any
    ) {
      return this.service.createMany(req, dto);
    };
  }

  private updateOneBase(name: BaseRouteName) {
    this.targetProto[name] = function updateOneBase(
      req: CrudRequest,
      dto: any
    ) {
      return this.service.updateOne(req, dto);
    };
  }

  private replaceOneBase(name: BaseRouteName) {
    this.targetProto[name] = function replaceOneBase(
      req: CrudRequest,
      dto: any
    ) {
      return this.service.replaceOne(req, dto);
    };
  }

  private deleteOneBase(name: BaseRouteName) {
    this.targetProto[name] = function deleteOneBase(req: CrudRequest) {
      return this.service.deleteOne(req);
    };
  }

  private getPrimaryParams(): string[] {
    return objKeys(this.options.params).filter(
      (param) =>
        this.options.params[param] && this.options.params[param].primary
    );
  }

  private createRoutes(routesSchema: BaseRoute[]) {
    const primaryParams = this.getPrimaryParams().filter(
      (param) => !this.options.params[param].disabled
    );

    routesSchema.forEach((route) => {
      if (this.canCreateRoute(route.name)) {
        // create base method
        this[route.name](route.name);
        route.enable = true;
        // set metadata
        this.setBaseRouteMeta(route.name);
      }

      if (route.withParams && primaryParams.length > 0) {
        route.path = primaryParams.map((param) => `/:${param}`).join('');
      }
    });
  }

  private canCreateRoute(name: string) {
    const only = this.options.routes.only;
    const exclude = this.options.routes.exclude;

    if (isArrayFull(only)) {
      return only.some((route) => route === name);
    }

    if (isArrayFull(exclude)) {
      return !exclude.some((route) => route === name);
    }

    return true;
  }

  private setBaseRouteMeta(name: BaseRouteName) {
    // this.setRouteArgs(name);
    // this.setRouteArgsTypes(name);
    // this.setInterceptors(name);
    // this.setAction(name);
    // this.setSwaggerOperation(name);
    // this.setSwaggerPathParams(name);
    // this.setSwaggerQueryParams(name);
    // this.setSwaggerResponseOk(name);
    // // set decorators after Swagger so metadata can be overwritten
    // this.setDecorators(name);
  }
  // private overrideRoutes(routesSchema: BaseRoute[]) {
  //   getOwnPropNames(this.targetProto).forEach((name) => {
  //     const override = R.getOverrideRoute(this.targetProto[name]);
  //     const route = routesSchema.find((r) => isEqual(r.name, override));
  //
  //     if (override && route && route.enable) {
  //       // get metadata
  //       const interceptors = R.getInterceptors(this.targetProto[name]);
  //       const baseInterceptors = R.getInterceptors(this.targetProto[override]);
  //       const baseAction = R.getAction(this.targetProto[override]);
  //       const operation = Swagger.getOperation(this.targetProto[name]);
  //       const baseOperation = Swagger.getOperation(this.targetProto[override]);
  //       const swaggerParams = Swagger.getParams(this.targetProto[name]);
  //       const baseSwaggerParams = Swagger.getParams(this.targetProto[override]);
  //       const responseOk = Swagger.getResponseOk(this.targetProto[name]);
  //       const baseResponseOk = Swagger.getResponseOk(
  //         this.targetProto[override]
  //       );
  //       // set metadata
  //       R.setInterceptors(
  //         [...baseInterceptors, ...interceptors],
  //         this.targetProto[name]
  //       );
  //       R.setAction(baseAction, this.targetProto[name]);
  //       Swagger.setOperation(
  //         { ...baseOperation, ...operation },
  //         this.targetProto[name]
  //       );
  //       Swagger.setParams(
  //         [...baseSwaggerParams, ...swaggerParams],
  //         this.targetProto[name]
  //       );
  //       Swagger.setResponseOk(
  //         { ...baseResponseOk, ...responseOk },
  //         this.targetProto[name]
  //       );
  //       this.overrideParsedBodyDecorator(override, name);
  //       // enable route
  //       R.setRoute(route, this.targetProto[name]);
  //       route.override = true;
  //     }
  //   });
  // }
  //
  // private enableRoutes(routesSchema: BaseRoute[]) {
  //   routesSchema.forEach((route) => {
  //     if (!route.override && route.enable) {
  //       R.setRoute(route, this.targetProto[route.name]);
  //     }
  //   });
  // }
}
