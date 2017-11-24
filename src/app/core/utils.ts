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

  static generateRandomString(length) {
    let text = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < length; i += 1)
      text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    return text;
  }
}
