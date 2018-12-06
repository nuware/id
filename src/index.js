import {
  join,
  compose,
  toLower,
  trampoline
} from '@nuware/functions'

const ID = ((state) => {
  const generate = () => compose(toLower, join(''))([
    Date.now().toString(16),
    Math.random().toString(16).substr(2, 5)
  ])

  const recursion = () => {
    const id = generate()
    if ((String(state) < String(id))) {
      state = id
      return state
    } else {
      return () => recursion()
    }
  }

  const generateWith = trampoline(recursion)

  return () => generateWith(state)
})('')

export default ID
