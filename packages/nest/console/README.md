# nest-console

This library was generated with [Nx](https://nx.dev).

## Installation

### Create tsconfig.cli.json

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2015",
    "module": "commonjs"
  }
}
```

### Create cli.ts

```typescript
import { ConsoleHandler } from '@nestpkg/console';

import { AppModule } from './app/app.module';

(async () => await ConsoleHandler(AppModule))();
```

## Running unit tests

Run `nx test nest-console` to execute the unit tests via [Jest](https://jestjs.io).
