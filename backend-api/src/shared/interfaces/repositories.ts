export interface BaseRepository<T> {
  create(item: T): Promise<boolean>;
  update(id: number, item: T): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
