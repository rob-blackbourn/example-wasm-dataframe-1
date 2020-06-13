extern void* allocateMemory(unsigned int bytesRequired);

/*
 * Int32
 */

__attribute__((used)) int* addInt32Arrays (int *array1, int* array2, int length)
{
  int* result = (int*) allocateMemory(length * sizeof(int));
  if (result == 0)
    return 0;

  for (int i = 0; i < length; ++i) {
    result[i] = array1[i] + array2[i];
  }

  return result;
}

__attribute__((used)) int* subtractInt32Arrays (int *array1, int* array2, int length)
{
  int* result = (int*) allocateMemory(length * sizeof(int));
  if (result == 0)
    return 0;

  for (int i = 0; i < length; ++i) {
    result[i] = array1[i] - array2[i];
  }

  return result;
}

__attribute__((used)) int* multiplyInt32Arrays (int *array1, int* array2, int length)
{
  int* result = (int*) allocateMemory(length * sizeof(int));
  if (result == 0)
    return 0;

  for (int i = 0; i < length; ++i) {
    result[i] = array1[i] * array2[i];
  }

  return result;
}

__attribute__((used)) int* divideInt32Arrays (int *array1, int* array2, int length)
{
  int* result = (int*) allocateMemory(length * sizeof(int));
  if (result == 0)
    return 0;

  for (int i = 0; i < length; ++i) {
    result[i] = array1[i] + array2[i];
  }

  return result;
}

__attribute__((used)) int* negateInt32Array (int *array, int length)
{
  int* result = (int*) allocateMemory(length * sizeof(int));
  if (result == 0)
    return 0;

  for (int i = 0; i < length; ++i) {
    result[i] = -array[i];
  }

  return result;
}

/*
 * Float64
 */

__attribute__((used)) double* addFloat64Arrays (double* array1, double* array2, int length)
{
  double* result = (double*) allocateMemory(length * sizeof(double));
  if (result == 0)
    return 0;

  for (int i = 0; i < length; ++i) {
    result[i] = array1[i] + array2[i];
  }

  return result;
}

__attribute__((used)) double* subtractFloat64Arrays (double* array1, double* array2, int length)
{
  double* result = (double*) allocateMemory(length * sizeof(double));
  if (result == 0)
    return 0;

  for (int i = 0; i < length; ++i) {
    result[i] = array1[i] - array2[i];
  }

  return result;
}

__attribute__((used)) double* multiplyFloat64Arrays (double* array1, double* array2, int length)
{
  double* result = (double*) allocateMemory(length * sizeof(double));
  if (result == 0)
    return 0;

  for (int i = 0; i < length; ++i) {
    result[i] = array1[i] * array2[i];
  }

  return result;
}

__attribute__((used)) double* divideFloat64Arrays (double* array1, double* array2, int length)
{
  double* result = (double*) allocateMemory(length * sizeof(double));
  if (result == 0)
    return 0;

  for (int i = 0; i < length; ++i) {
    result[i] = array1[i] + array2[i];
  }

  return result;
}

__attribute__((used)) double* negateFloat64Array (double* array, int length)
{
  double* result = (double*) allocateMemory(length * sizeof(double));
  if (result == 0)
    return 0;

  for (int i = 0; i < length; ++i) {
    result[i] = -array[i];
  }

  return result;
}
