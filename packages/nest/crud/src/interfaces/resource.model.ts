export type ResourceId = number | string | undefined;

export abstract class ResourceModel {
  id?: ResourceId;
  uuid?: ResourceId;
}
