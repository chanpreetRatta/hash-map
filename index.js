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
    this._arraySize++;

    if (this._arraySet[index]) {
      this._arraySet[index].forEach((element) => {
        if (element.key === key) element.value = value;
        else this._arraySet[index].push({ key, value });
      });
    } else {
      this._arraySet[index] = [{ key, value }];
    }
  }

  get(key) {
    let index = this.#hash(key);
    if (!this._arraySet[index]) return false;
    else if (this._arraySet[index][0].key === key)
      return this._arraySet[index][0];

    for (let element of this._arraySet[index]) {
      if (element.key === key) return element;
    }
  }

  has(key) {
    if (this.get(key)) return true;

    return false;
  }

  remove(key) {
    let index = this.#hash(key);
    if (!this._arraySet[index]) return false;
    else if (this._arraySet[index][0].key === key) {
      this._arraySet[index].splice(0, 1);
      this._arraySize--;
      return true;
    }

    for (let element in this._arraySet[index]) {
      if (this._arraySet[index][element].key === key) {
        this._arraySet[index].splice(element, 1);
        this._arraySize--;
        return true;
      }
    }
  }

  get length() {
    return this._arraySize;
  }
}

let test = new HashMap();
test.set("A", "this is A");
test.set("Q", "this is Q");

console.log(test.length);
