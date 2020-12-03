import { Module } from '@nestjs/common';

import { IsValidEntityConstraint } from './constraints/is-valid-entity.constraint';

@Module({
  providers: [IsValidEntityConstraint],
  exports: [IsValidEntityConstraint],
})
export class CrudModule {}
