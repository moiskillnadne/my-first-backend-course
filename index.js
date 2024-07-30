const express = require('express');
const fs = require('fs')

const helper = require('./helper.js');
const app = express();

const UserCrudService = require('./entities/user.crud.js');

app.use(express.json())

app.get('/health-check', (req, res) => {
  res.send('I am alive');
})

app.post('/analyze', (req, res) => {
  if(!req.body.text) {
    return res.status(400).json({ error: 'Text is required!' })
  }

  const text = req.body.text

  const anaylytics = {
    wordsCount: helper.getWordsCount(text),
    lettersCount: helper.getLettersCount(text),
    topWords: Object.fromEntries(helper.getTopWords(text))
  }

  res.json({ message: 'Body is ok!', statistics: anaylytics })
})

app.get('/api/user/:userId', async (req, res) => {
  const user = await UserCrudService.getById(req.params.userId)

  if(!user) {
    return res.status(404).json({ error: 'User not found!' })
  }

  res.json({ user })
})

app.get('/api/user', async (req, res) => {
  const users = await UserCrudService.getAll()

  res.json({ users: users || [] })
})

app.post('/api/user', async (req, res) => {

  try {
    const result = await UserCrudService.createUser({
      firstName: req.body.firstName ?? null,
      lastName: req.body.lastName ?? null,
      age: req.body.age ?? null,
      email: req.body.email ?? null
    })

    console.log(result)

    return res.json({ message: 'User created!' })
  } catch(error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to create user!' })
  }
})

app.put('/api/user/:userId', async (req, res) => {
  try {
    const result = await UserCrudService.updateById(req.params.userId, {
      firstName: req.body.firstName ?? null,
      lastName: req.body.lastName ?? null,
      age: req.body.age ?? null,
      email: req.body.email ?? null
    })

    return res.json({ message: 'User updated!' })
  } catch(error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to update user!' })
  }
})

app.delete('/api/user/:userId', async (req, res) => {
  try {
    const result = await UserCrudService.deleteById(req.params.userId)

    return res.json({ message: 'User deleted!' })
  } catch(error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to delete user!' })
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})