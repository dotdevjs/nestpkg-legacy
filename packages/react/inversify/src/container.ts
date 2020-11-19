import {
  injectable as Injectable,
  inject as Inject,
  interfaces,
  Container as InversifyContainer,
  ContainerModule,
} from 'inversify';

export const Container = new InversifyContainer({
  autoBindInjectable: true,
});

Container.bind<InversifyContainer>(InversifyContainer).toConstantValue(
  Container
);

export { InversifyContainer, Injectable, Inject, ContainerModule, interfaces };
