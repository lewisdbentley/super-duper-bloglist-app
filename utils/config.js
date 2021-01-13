require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
let PORT = process.env.PORT
let SECRET = process.env.SECRET

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

// eslint-disable-next-line eqeqeq
if (PORT == null || PORT == '') {
  PORT = 5000
}

console.log('MONGODB_URI', MONGODB_URI)

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
}
