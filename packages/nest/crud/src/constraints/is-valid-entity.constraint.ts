import { isObject } from 'util';
import { Injectable, Type } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationError,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection, ObjectLiteral } from 'typeorm';

export const IS_VALID_ENTITY_OPTIONS = 'IS_VALID_ENTITY_OPTIONS';

@ValidatorConstraint()
@Injectable()
export class IsValidEntityConstraint implements ValidatorConstraintInterface {
  constructor(private readonly conn: Connection) {}

  async validate(
    data: ObjectLiteral,
    args: ValidationArguments
  ): Promise<boolean> {
    const options = IsValidEntityConstraint.getConstraintOptions(
      args.constraints
    );

    if (!options.entity) {
      throw new ValidationError();
    }

    const metadata = this.conn.getMetadata(options.entity);
    const joinColumn =
      options.joinColumn || metadata.primaryColumns[0].propertyName; // 'id';
    const repository = this.conn.getRepository(options.entity);

    const value = isObject(data) ? data[joinColumn] : data;
    const dbEntity = await repository.findOneOrFail({
      where: {
        [joinColumn]: value,
      },
    });

    Object.assign(args.object, {
      [args.property]: dbEntity,
    });

    return true;
  }

  private static getConstraintOptions(
    constraints: any[]
  ): IsValidEntityOptions {
    return (
      constraints
        .filter(
          (constraint: Record<string, unknown>) =>
            constraint.name && constraint.name === IS_VALID_ENTITY_OPTIONS
        )
        .map((constraint) => constraint.options)[0] || {}
    );
  }
}

export interface IsValidEntityOptions extends ValidationOptions {
  entity: Type<ObjectLiteral>;
  joinColumn?: string;
}

export function IsValidEntity(validationOptions?: IsValidEntityOptions) {
  return function (object: ObjectLiteral, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [
        { name: IS_VALID_ENTITY_OPTIONS, options: validationOptions },
      ],
      validator: IsValidEntityConstraint,
      async: true,
    });
  };
}
