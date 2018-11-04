const express = require('express')
const ejs = require('ejs')
const axios = require('axios')
const app = express()
const bodyParser = require('body-parser')
const categorias = require('./routes/categorias')
const publicacoes = require('./routes/publicacoes')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs') 
app.use(bodyParser.urlencoded())

app.use('/categorias',categorias)
app.use('/publicacoes',publicacoes)


app.get('/', async (req,resp) => {
  const i = "node"
  const content  = await axios.get('https://como-fazer-ba8af.firebaseio.com/Home.json')
  console.log(content.data)
  resp.render('index',{ i, content })
})



app.listen(port,(err) => {
   if(err) console.log(err)
   console.log('servidor rodando na porta ' + port)
})