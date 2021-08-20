import {
  ObjectType,
  InputType,
  Field,
  ArgsType,
  Args,
  Int,
} from '@nestjs/graphql';
import {
  QueryFilter,
  QueryJoin,
  QueryFields,
  ComparisonOperator,
} from '@nestjsx/crud-request/lib/types/request-query.types';

@ObjectType()
export class Breadcrumb {
  @Field()
  id: string;
  @Field()
  label: string;
}

@ObjectType()
export class GetManyDefaultResponse<T> {
  data: T[];

  @Field()
  count: number;

  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  pageCount: number;
}

@InputType()
export class GetManyArgsSearch {
  @Field()
  field: string;

  @Field(() => String)
  operator: ComparisonOperator;

  @Field(() => String, {
    nullable: true,
  })
  value?: string;
}

@InputType()
export class GetManyArgsJoin {
  @Field()
  field: string;

  @Field(() => [String])
  select?: QueryFields;
}

@ArgsType()
export class GetManyArgs {
  @Field(() => Int, {
    defaultValue: 1,
  })
  page?: number;

  @Field(() => Int, {
    defaultValue: 1,
  })
  limit?: number;

  @Field(() => [GetManyArgsSearch], {
    nullable: true,
  })
  filter?: QueryFilter[];

  @Field(() => [GetManyArgsJoin], {
    nullable: true,
  })
  join?: QueryJoin[];
}

@InputType()
export class GetByIds {
  @Field(() => [String])
  ids: string[];
}

export function GetByIdsArgs() {
  return Args({ name: 'ids', type: () => [String] });
}
