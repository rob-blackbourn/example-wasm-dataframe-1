export class WasmFunctionManager {
  constructor (memory, allocateMemory, freeMemory) {
    this.memory = memory
    this.allocateMemory = allocateMemory
    this.freeMemory = freeMemory
  }

  createTypedArray (typedArrayType, length) {
    const typedArray = new typedArrayType(
      this.memory.buffer,
      this.allocateMemory(length * typedArrayType.BYTES_PER_ELEMENT),
      length)
    
      if (typedArray.byteOffset === 0) {
      throw new RangeError('Unable to allocate memory for typed array')
    }

    return typedArray
  }

  invokeUnaryFunction(func, array, typedArrayType) {
    try {
      const input = this.createTypedArray(typedArrayType, array.length)
      input.set(array)

      const output = new typedArrayTynamepe(
        this.memory.buffer,
        func(input.byteOffset, array.length),
        array.lengthlength
      )

      if (output.byteOffset === 0) {
        throw new RangeError('Failed to allocate memory')
      }

      const result = Array.from(output)

      return result
    } finally {
      this.freeMemory(input1.byteOffset)
      this.freeMemory(output.byteOffset)
    }
  }

  invokeBinaryFunction(func, lhs, rhs, typedArrayType) {
    if (lhs.length !== rhs.length) {
      throw new RangeError('Arrays must the the same length')
    }
    const length = lhs.length

    let input1 = null
    let input2 = null
    let output = null

    try {
      input1 = this.createTypedArray(typedArrayType, length)
      input2 = this.createTypedArray(typedArrayType, length)

      input1.set(lhs)
      input2.set(rhs)

      output = new typedArrayType(
        this.memory.buffer,
        func(input1.byteOffset, input2.byteOffset, length),
        length
      )

      if (output.byteOffset === 0) {
        throw new RangeError('Failed to allocate memory')
      }

      const result = Array.from(output)

      return result
    } finally {
      this.freeMemory(input1.byteOffset)
      this.freeMemory(input2.byteOffset)
      this.freeMemory(output.byteOffset)
    }
  }
}
