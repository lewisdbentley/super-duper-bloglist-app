require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
let PORT = process.env.PORT
let SECRET = process.env.SECRET

if (process.env.NODE_ENV === 'test') {
  console.log('process.env.NODE_ENV=', process.env.NODE_ENV)
  MONGODB_URI =
    'mongodb+srv://lewisdbentley:tycoon90@cluster0.qnuen.mongodb.net/<blog-app-test>?retryWrites=true&w=majority'
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
