import { ConsoleHandler } from '@nestpkg/console';

describe('ConsoleHandler', () => {
  it('should be defined', () => {
    expect(ConsoleHandler).toBeDefined();
  });

  // @Module({
  //   imports: [CommandModule],
  // })
  // class AppModule {}
  //
  // it('should handle cli', () => {
  //   expect(async () => await ConsoleHandler(AppModule)).not.toThrow();
  // });
});
