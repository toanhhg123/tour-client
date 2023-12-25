export default class LocalStore {
  static saveToStore(key: string, data: unknown) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  static remove(key: string) {
    localStorage.removeItem(key)
  }

  static getItem<T>(key: string): T | null {
    try {
      const dataLocal = localStorage.getItem(key)
      if (!dataLocal) throw new Error('not found data')

      return JSON.parse(dataLocal) as T
    } catch (error) {
      return null
    }
  }
}
