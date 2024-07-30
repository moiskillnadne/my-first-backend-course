const getWordsCount = (text) => {
  const space = ' '

  return text.split(space).filter((word) => word.length > 0).length
}

const getLettersCount = (text) => {
  const space = ' '

  return text.split('').filter(letter => letter !== space).length
}

const getTopWords = (text) => {
  const space = ' '
  const words = text.toLowerCase().split(space).filter((word) => word.length > 0)

  const wordsCount = {}

  words.forEach((word) => {
    if (wordsCount[word]) {
      wordsCount[word] += 1
    } else {
      wordsCount[word] = 1
    }
  })

  return Object.entries(wordsCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
}

module.exports = {
  getWordsCount,
  getLettersCount,
  getTopWords
}