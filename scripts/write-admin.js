require('dotenv').config()
const bcrypt = require('bcrypt')
const db = require('../api-server/models')

async function insertUser (username, password) {
  try {
    await db.sequelize.sync()
    const hash = await bcrypt.hash(password, 10)
    const user = await db.User.create({ username, hash })
    await db.sequelize.close()
    console.log(user)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

async function compareUser (username, password) {
  await db.sequelize.sync()
  const user = await db.User.findById(username)
  const hash = user.get('hash')
  const eq = await bcrypt.compare(password, hash)
  console.log(eq)
  await db.sequelize.close()
}
