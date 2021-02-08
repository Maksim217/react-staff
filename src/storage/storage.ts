export class LocalStorage {
  static $inject = ['$window'];
  constructor($window) {
    if ($window.localStorage) {
      this.storage = $window.localStorage;
    } else {
      this.storage = {
        items: [],
        getItem: function (key) {
          return this.items[key];
        },
        setItem: function (key, value) {
          this.items[key] = value;
        },
      };
    }
  }

  storage: any;

  get(key) {
    return this.storage.getItem(key);
  }

  set(key, value) {
    this.storage.setItem(key, value);
  }
}
