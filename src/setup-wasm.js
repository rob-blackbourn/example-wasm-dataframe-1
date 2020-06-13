import fs from 'fs'

import arrayMethods from './array-methods'
import { WasmFunctionManager } from './WasmFunctionManager'

function guessBestType(lhsType, rhsType) {
  if (lhsType === 'int' && rhsType == 'int') {
    return 'int'
  } else if (
    (lhsType === 'int' && rhsType === 'double') || 
    (lhsType === 'double' && rhsType === 'int')) {
    return 'double'
  } else {
    return 'object'
  }
}

function makeBinaryOperation(wasmFunctionManager, intFunc, doubleFunc, defaultFunc) {
  return (lhs, rhs) => {
    const bestType = guessBestType(lhs.type, rhs.type)

    if (bestType === 'int') {
      const result =  wasmFunctionManager.invokeBinaryFunction(
        intFunc,
        lhs.array,
        rhs.array,
        Int32Array
      )
      return [result, bestType]
    } else if (bestType === 'double') {
      const result = wasmFunctionManager.invokeBinaryFunction(
        doubleFunc,
        lhs.array,
        rhs.array,
        Float64Array
      )
      return [result, bestType]
    } else {
      const result = defaultFunc(lhs, rhs)
      return [result, bestType]
    }
  }
}

export async function setupWasm () {
  // Read the wasm file.
  const buf = fs.readFileSync('./src-wasm/data-frame.wasm')

  // Instantiate the wasm module.
  const res = await WebAssembly.instantiate(buf, {})

  // Get the memory exports from the wasm instance.
  const {
    memory,
    allocateMemory,
    freeMemory,

    addInt32Arrays,
    subtractInt32Arrays,
    multiplyInt32Arrays,
    divideInt32Arrays,
    negateInt32Array,

    addFloat64Arrays,
    subtractFloat64Arrays,
    multiplyFloat64Arrays,
    dividedFloat64Arrays,
    negateFloat64Array

  } = res.instance.exports

  const wasmFunctionManager = new WasmFunctionManager(memory, allocateMemory, freeMemory)

  arrayMethods.set(
    Symbol.for('+'),
    makeBinaryOperation(
      wasmFunctionManager,
      addInt32Arrays,
      addFloat64Arrays,
      (lhs, rhs) => lhs.array.map((value, index) => value + rhs.array[index])
    )
  )
}
