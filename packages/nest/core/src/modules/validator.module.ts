import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { getFromContainer, MetadataStorage, useContainer, Validator } from 'class-validator';

@Module({
  providers: [
    { provide: Validator, useFactory: () => getFromContainer(Validator) },
    {
      provide: MetadataStorage,
      useFactory: () => getFromContainer(MetadataStorage),
    },
  ],
  exports: [Validator, MetadataStorage],
})
export class ValidatorModule implements OnModuleInit {
  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    useContainer(
      {
        get: (token) => {
          return this.moduleRef.get(token, { strict: false });
        },
      },
      { fallback: true, fallbackOnErrors: true }
    );
  }
}
