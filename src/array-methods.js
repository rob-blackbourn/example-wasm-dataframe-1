class ArrayMethods {
  constructor () {
    if (!ArrayMethods.instance) {
      this._methods = {}
      ArrayMethods.instance = this
    }

    return ArrayMethods.instance
  }

  set (name, method) {
    this._methods[name] = method
  }

  has (name) {
    return name in this._methods
  }

  get (name) {
    return this._methods[name]
  }
}

const instance = new ArrayMethods()
Object.freeze(instance)

// instance.set(Symbol.for('+'), (lhs, rhs) => lhs.array.map((value, index) => value + rhs.array[index]))
// instance.set(Symbol.for('-'), (lhs, rhs) => lhs.array.map((value, index) => value - rhs.array[index]))
// instance.set(Symbol.for('*'), (lhs, rhs) => lhs.array.map((value, index) => value * rhs.array[index]))
// instance.set(Symbol.for('/'), (lhs, rhs) => lhs.array.map((value, index) => value / rhs.array[index]))
// instance.set(Symbol.for('minus'), (lhs) => lhs.array.map((value, index) => -value))

export default instance
