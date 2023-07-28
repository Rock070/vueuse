import { toRef, toValue } from '../index'

import type { MaybeRef } from '../index'

export interface UseCounterOptions {
  min?: number
  max?: number
}

/**
 * Basic counter with utility functions.
 *
 * @see https://vueuse.org/useCounter
 * @param [initialValue=0]
 * @param {Object} options
 */
export function useCounter(initialValue: MaybeRef<number> = 0, options: UseCounterOptions = {}) {
  let _initialValue = toValue(initialValue)
  const count = toRef(initialValue)

  const {
    max = Number.POSITIVE_INFINITY,
    min = Number.NEGATIVE_INFINITY,
  } = options

  const inc = (delta = 1) => count.value = Math.min(max, count.value + delta)
  const dec = (delta = 1) => count.value = Math.max(min, count.value - delta)
  const get = () => count.value
  const set = (val: number) => (count.value = Math.max(min, Math.min(max, val)))
  const reset = (val = _initialValue) => {
    _initialValue = val
    return set(val)
  }

  return { count, inc, dec, get, set, reset }
}
