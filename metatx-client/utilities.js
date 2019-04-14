import leftPad from 'left-pad'

let utilities = {
  add0x: (input) => {
    if (typeof (input) !== 'string') {
      return input
    } else if (input.length < 2 || input.slice(0, 2) !== '0x') {
      return '0x' + input
    } else {
      return input
    }
  },
  strip0x: (input) => {
    if (input.slice(0, 2) === '0x') {
      return input.slice(2)
    }
    return input
  }
}

utilities.pad = (input) => {
  if (input.startsWith('0x')) {
    input = utilities.strip0x(input)
  }
  return leftPad(input, '64', '0')
}

export default utilities
