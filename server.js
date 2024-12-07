import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000


app.use('/' , ( req , res ) => {
  res.send('server chal raha hy')
})
app.listen(PORT , () => {
  console.log(`Server iis running on port: http://localhost:${PORT}`)
}
)