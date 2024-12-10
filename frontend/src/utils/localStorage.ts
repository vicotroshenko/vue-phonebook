export class LocalStorage {
  private key: string;
  constructor(newKey: string) {
    this.key = newKey;
  }

  public set(data: unknown) {
    if (!data) {
      throw new Error("Data mustn't be null or undefined");
    }

    window.localStorage.setItem(this.key, JSON.stringify(data));
  }

  public get() {
    const result =  window.localStorage.getItem(this.key);
		if(!result) return null;
		return JSON.parse(result);
  }

  public remove() {
    window.localStorage.removeItem(this.key);
  }
}
