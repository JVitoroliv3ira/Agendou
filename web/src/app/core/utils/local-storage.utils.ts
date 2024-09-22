export class LocalStorageUtils {
  public static add<T>(key: string, value: T): void {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }

  public static get<T>(key: string): T | null {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue) {
      try {
        return JSON.parse(serializedValue) as T;
      } catch (e) {
        return serializedValue as unknown as T;
      }
    }
    return null;
  }

  public static remove(key: string): void {
    localStorage.removeItem(key);
  }
}
