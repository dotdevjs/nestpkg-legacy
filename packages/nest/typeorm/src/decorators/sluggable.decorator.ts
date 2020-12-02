/* eslint-disable @typescript-eslint/ban-types */
import slugify from 'slugify';
import {
  ColumnOptions,
  EntityMetadata,
  EntitySubscriberInterface,
  EventSubscriber,
  getMetadataArgsStorage,
  InsertEvent,
  ObjectLiteral,
  UpdateEvent,
} from 'typeorm';
import { ColumnMetadataArgs } from 'typeorm/metadata-args/ColumnMetadataArgs';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { Logger } from '@nestjs/common';

export interface Sluggable {
  slug?: string | undefined;
}

export type SluggableValue = Sluggable['slug'];

export const SLUGGABLE_METADATA = 'SLUGGABLE_METADATA';

export interface SluggableColumnOptions extends ColumnOptions {
  /**
   * This column will be used for slug source value.
   */
  source: string;
  /**
   * Slugify lib options
   * */
  slugify?: {
    replacement?: string;
    remove?: RegExp;
    lower?: boolean;
    strict?: boolean;
    locale?: string;
  };
}

/**
 * This column will store an slug of the specified object column.
 * This slug is being updated each time you persist the object.
 */
export const SluggableColumn = (
  options?: SluggableColumnOptions
): PropertyDecorator => {
  return (target, propertyKey) => {
    options = {
      type: 'varchar',
      nullable: false,
      update: true,
      ...options,
    };

    Reflect.defineMetadata(
      SLUGGABLE_METADATA,
      { [propertyKey]: options },
      target.constructor
    );

    getMetadataArgsStorage().columns.push({
      target: target.constructor,
      propertyName: propertyKey,
      mode: 'regular',
      options,
    } as ColumnMetadataArgs);
  };
};

@EventSubscriber()
export class SluggableSubscriber implements EntitySubscriberInterface {
  beforeInsert(
    event: InsertEvent<ObjectLiteral>
  ): Promise<ObjectLiteral> | void {
    if (!Reflect.hasMetadata(SLUGGABLE_METADATA, event.metadata.target)) {
      Logger.debug('[TypeOrm] SluggableSubscriber: Skip beforeInsert');
      return;
    }

    const { sluggableColumns, sluggableMetadata } = this.getSluggableMetadata(
      event.metadata
    );

    for (const column of sluggableColumns) {
      SluggableSubscriber.updateSluggableColumn(
        event.entity,
        column,
        sluggableMetadata[column.propertyName]
      );
    }
  }

  beforeUpdate(
    event: UpdateEvent<ObjectLiteral>
  ): Promise<ObjectLiteral> | void {
    if (!Reflect.hasMetadata(SLUGGABLE_METADATA, event.metadata.target)) {
      Logger.debug('[TypeOrm] SluggableSubscriber: Skip beforeUpdate');
      return;
    }

    const { sluggableColumns, sluggableMetadata } = this.getSluggableMetadata(
      event.metadata
    );

    for (const column of sluggableColumns) {
      SluggableSubscriber.updateSluggableColumn(
        event.entity,
        column,
        sluggableMetadata[column.propertyName]
      );
    }
  }

  private static updateSluggableColumn(
    entity: ObjectLiteral,
    column: ColumnMetadata,
    options: SluggableColumnOptions
  ): void {
    // if (false === options.update) {
    //   return;
    // }

    const sourceData = entity[options.source];
    const slug = slugify(sourceData, options.slugify);

    Object.assign(entity, {
      [column.propertyName]: slug,
    });
  }

  private getSluggableMetadata(metadata: EntityMetadata) {
    const sluggableMetadata =
      Reflect.getMetadata(SLUGGABLE_METADATA, metadata.target) || {};

    const sluggableKeys = Object.keys(sluggableMetadata);

    const sluggableColumns = metadata.columns.filter(
      (column) => sluggableKeys.indexOf(column.propertyName) !== -1
    );

    return { sluggableMetadata, sluggableColumns };
  }
}
