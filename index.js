class HashMap {
  constructor() {
    this._bucketArray = [];
    this._numberOfElements = 0;
    this._defaultBucketSize = 16;
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this._defaultBucketSize;
    }

    return hashCode;
  }

  #resizeArray() {
    let entries = this.entries();
    this._defaultBucketSize *= 2;
    this._numberOfElements = 0;
    this.clear();

    entries.forEach((element) => this.set(element[0], element[1]));
  }

  set(key, value) {
    if (this._numberOfElements > this._defaultBucketSize * 0.75)
      this.#resizeArray();

    let index = this.#hash(key);

    if (this._bucketArray[index]) {
      this._bucketArray[index].forEach((element) => {
        if (element.key === key) element.value = value;
        else {
          this._bucketArray[index].push({ key, value });
          this._numberOfElements++;
        }
      });
    } else {
      this._bucketArray[index] = [{ key, value }];
      this._numberOfElements++;
    }
  }

  get(key) {
    let index = this.#hash(key);
    if (!this._bucketArray[index]) return false;
    else if (this._bucketArray[index][0].key === key)
      return this._bucketArray[index][0];

    for (let element of this._bucketArray[index]) {
      if (element.key === key) return element;
    }
  }

  has(key) {
    if (this.get(key)) return true;

    return false;
  }

  remove(key) {
    let index = this.#hash(key);
    if (!this._bucketArray[index]) return false;
    else if (this._bucketArray[index][0].key === key) {
      this._bucketArray[index].splice(0, 1);
      this._numberOfElements--;
      return true;
    }

    for (let element in this._bucketArray[index]) {
      if (this._bucketArray[index][element].key === key) {
        this._bucketArray[index].splice(element, 1);
        this._numberOfElements--;
        return true;
      }
    }
  }

  get length() {
    return this._numberOfElements;
  }

  clear() {
    this._bucketArray = [];
  }

  keys() {
    let keys = this.entries().map((element) => element[0]);

    return keys;
  }

  values() {
    let values = this.entries().map((element) => element[1]);

    return values;
  }

  entries() {
    let entries = [];
    for (let element of this._bucketArray) {
      if (element) {
        element.forEach((obj) => entries.push([obj.key, obj.value]));
      }
    }

    return entries;
  }
}

let test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("apple", "green");
test.set("moon", "silver");
test.set("asdasda", "silver");

console.log(test._bucketArray);
