export class DomainHelper {

  static updateEntity<T>(entity: T, attributes): T {

    Object.keys(attributes).forEach((key, index) => {
      if (attributes[key] !== null && this.checkIfAttributeExists(entity, key)) {
        entity[index] = attributes[index];
      }
    });

    return entity;
  }

  private static checkIfAttributeExists(object: any, attribute: string): boolean {
    return Object?.keys(object).some(key => key === attribute);
  }
}