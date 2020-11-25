import { QueryFilter as CrudQueryFilter } from '@nestjsx/crud-request';
import { TypeOrmCrudService as BaseTypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ComparisonOperator, QueryFilter } from '@nestpkg/crud-request';
import { ObjectLiteral } from 'typeorm';

export class TypeOrmCrudService<T> extends BaseTypeOrmCrudService<T> {
  protected mapOperatorsToQuery(
    cond: QueryFilter | CrudQueryFilter,
    param: any
  ): {
    str: string;
    params: ObjectLiteral;
  } {
    if (this.isValidJsonOperator(cond.operator as ComparisonOperator)) {
      let str: string;

      // eslint-disable-next-line no-case-declarations
      const [property, propertyValue] = cond.value.toString().trim().split('$');

      let params: ObjectLiteral = { [param.toString()]: propertyValue };

      const field = this.getFieldWithAlias(cond.field);

      switch (cond.operator) {
        case '$jsoncont':
          str = `JSON_EXTRACT(${field}, "$.${property}") LIKE :${param}`;
          params = { [param.toString()]: `%${propertyValue}%` };
          break;
        default:
          str = `JSON_EXTRACT(${field}, "$.${property}") = :${param}`;
          break;
      }

      //console.log(str, params, field, property, propertyValue);

      return { str, params };
    } else {
      return super.mapOperatorsToQuery(cond as CrudQueryFilter, param);
    }
  }

  private isValidJsonOperator(operator: ComparisonOperator): boolean {
    return -1 !== ['$jsoneq', '$jsoncont'].indexOf(operator);
  }
}
