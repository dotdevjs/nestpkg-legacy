export type ResourceId = number | string | undefined;

export abstract class ResourceModel {
  /**
   * Entity primary key
   */
  id?: ResourceId;

  /**
   * Entity UUID
   */
  uuid?: ResourceId;
}
