import fs from 'fs'

import { Series } from './Series'
import arrayMethods from './array-methods'
import { DataFrame } from './DataFrame'
import { WasmFunctionManager } from './WasmFunctionManager'

function example () {
  'operator-overloading enabled'

  const s1 = new Series('s1', [1, 2, 3, 4], 'int')
  const s2 = new Series('s2', [5, 6, 7, 8], 'int')
  const s3 = s1 + s2
  console.log(s3.toString())

  // const height = new Series('height', [1.82, 1.72, 1.64, 1.88])
  // console.log(height)

  // const minusHeight = -height
  // console.log(minusHeight.toString())

  // arrayMethods.add(Symbol.for('**'), (lhs, rhs) => lhs.array.map((value, index) => value ** rhs))
  // const sqrHeight = height ** 2
  // console.log(sqrHeight.toString())

  // arrayMethods.add('max', (lhs) => Math.max(...height))
  // const maxHeight = height.max()
  // console.log(maxHeight)

  // console.log(`${height}`)
  // console.log(height.toString())

  // const weight = new Series('weight', [81.4, 72.3, 69.9, 79.5])
  // const ratio = weight / height
  // console.log(ratio.toString())

  // const s1 = new Series('numbers', [1, 2, 3, 4])
  // s1.push(5)
  // console.log(s1.toString())

  // const df = DataFrame.fromObject(
  //   [
  //     { col0: 'a', col1: 5, col2: 8.1 },
  //     { col0: 'b', col1: 6, col2: 3.2 }
  //   ]
  // )
  // console.log(df.toString())
  // df.col3 = df.col1 + df.col2
  // console.log(df.toString())
}

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


async function main () {
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
    (lhs, rhs) => {
      const bestType = guessBestType(lhs.type, rhs.type)

      if (bestType === 'int') {
        const result =  wasmFunctionManager.invokeBinaryFunction(
          addInt32Arrays,
          lhs.array,
          rhs.array,
          Int32Array
        )
        return [result, bestType]
      } else if (bestType === 'double') {
        const result = wasmFunctionManager.invokeBinaryFunction(
          addInt32Arrays,
          lhs.array,
          rhs.array,
          Float64Array
        )
        return [result, bestType]
      } else {
        const result = lhs.array.map((value, index) => value + rhs.array[index])
        return [result, bestType]
      }
    }
  )

  example()
}

main().then(() => console.log('Done')).catch(error => console.error(error))
