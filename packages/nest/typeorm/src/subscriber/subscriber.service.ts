export {};

// private registerEventSubscribers(): void {
//   const subscribersTypeOrm = getMetadataArgsStorage().entitySubscribers.map(
//     (s) => s.target
//   );

//   const subscribers = this.discoveryService
//     .getProviders()
//     .filter((wrapper) => {
//       return subscribersTypeOrm.indexOf(wrapper.metatype) !== -1;
//     })
//     .map((wrapper) => wrapper.instance);

//   subscribers.forEach((subscriber) => {
//     this.connection.subscribers.push(subscriber);
//   });
// }
