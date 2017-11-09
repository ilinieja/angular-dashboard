export class Utils {
  static safeUnsubscribe(subscription) {
    if (subscription && typeof subscription.unsubscribe === 'function') {
      subscription.unsubscribe();
    }
  }

  static getLocalStorageItem(key) {
    return localStorage.getItem(key);
  }

  static setLocalStorageItem(key, value) {
    localStorage.setItem(key, value);
  }
}
