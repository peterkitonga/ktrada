export interface BaseRepository<T> {
  create(item: T): Promise<boolean>;
  update(symbol: string, item: T): Promise<boolean>;
  delete(symbol: string): Promise<boolean>;
}
