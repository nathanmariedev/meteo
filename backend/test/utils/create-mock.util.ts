import { Type } from '@nestjs/common';

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
export type MockInstance<T> = { [P in keyof T]: jest.Mock<ReturnType<T[P]>> };

export const getAllMethodNames = <T extends Type<any>>(obj: T) => {
  return Object.getOwnPropertyNames(obj.prototype)
    .filter((prop: string) => prop !== 'target')
    .filter((prop: string) => obj.prototype[prop] && typeof obj.prototype[prop] === 'function');
};

export const createMock = <T>(type: Type<T>): MockInstance<T> => {
  const instance = new type([]);
  const methods = getAllMethodNames(type);
  methods.forEach((method: string) => {
    instance[method] = jest.fn();
  });
  return instance as any as MockInstance<T>;
};
