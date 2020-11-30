import { Type } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';

export const ConsoleHandler = async (
  module: Type<any>,
  options?: NestApplicationContextOptions
) => {
  const app = await NestFactory.createApplicationContext(module, {
    logger: false,
    ...options,
  });
  app.select(CommandModule).get(CommandService).exec();
};
