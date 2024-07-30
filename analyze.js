const fs = require('node:fs');

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
    .reduce((acc, [word, count]) => {
      return `${acc}\n${word}: ${count}`
    }, '')
}

const pathParam = process.argv[2]

if (!pathParam) {
  console.error('[Ошибка] Не указан путь к файлу')
  return
}

if(!fs.existsSync(pathParam)) {
  console.error('[Ошибка] Файл не найден')
  return
}

fs.readFile(pathParam, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err)
    return
  }

  const wordsCount = getWordsCount(data)
  const lettersCount = getLettersCount(data)

  console.log(`Топ 5 слов в файле: ${getTopWords(data)}`)

  console.log(`Количество слов в файле: ${wordsCount}`)
  console.log(`Количество букв в файле: ${lettersCount}`)
})