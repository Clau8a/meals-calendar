const express = require('express')
const app = express()
const PORT = 3000

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error listening: ', err)
    return
  }
  console.log(`listening at port :${PORT}`)
})
