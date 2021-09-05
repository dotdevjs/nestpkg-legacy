import { Type } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { MODULE_METADATA } from '@nestjs/common/constants';

export const ConsoleHandler = async (
  module: Type<unknown>,
  options?: NestApplicationContextOptions
) => {
  // Inject CommandModule
  const imports = Reflect.getMetadata(MODULE_METADATA.IMPORTS, module) || [];
  if (!imports.filter((m: Type<unknown>) => m == CommandModule).length) {
    imports.unshift(CommandModule);
    Reflect.defineMetadata(MODULE_METADATA.IMPORTS, imports, module);
  }

  const app = await NestFactory.createApplicationContext(module, {
    // logger: false,
    ...options,
  });

  app.select(CommandModule).get(CommandService).exec();
};
