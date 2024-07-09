class HashMap {
  constructor() {
    this._arraySet = [];
    this._arraySize = 0;
  }

  #hash(key, size = 16) {
    let hashCode = 0;

    if (this._arraySize > size * 0.75) size = size * 2;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
    }

    return hashCode;
  }

  set(key, value) {
    let index = this.#hash(key);

    if (this._arraySet[index]) {
      this._arraySet[index].forEach((element) => {
        if (element.key === key) element.value = value;
        else this._arraySet[index].append({ key, value });
      });
    } else {
      this._arraySet[index] = [{ key, value }];
    }

    this._arraySize++;
  }

  get(key) {
    let index = this.#hash(key);
    if (this._arraySet[index].length <= 1) return this._arraySet[index][0];
    for (let element of this._arraySet[index]) {
      if (element.key === key) return element;
    }
  }
}

let test = new HashMap();
test.set("Carlos", "this is a value");
test.set("Carlos", "this is a new value");
console.log(test.get("Carlos"));
