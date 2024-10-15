export interface GenericRepository<T, C, U> {
  create(dto: C): Promise<T>;
  findAll(): Promise<T[]>;
  findBy(key: string, value: number | string): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  existsBy(key: string, value: string): Promise<boolean>;
  update(id: string, dto: U): Promise<T>;
  delete(id: string): Promise<void>;
}

export const ModelRepository = Symbol('ModelRepository');
