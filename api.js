const axios = require('axios')
const BaseURL = 'https://como-fazer-ba8af.firebaseio.com/'
const auth = 'lRzgYpK04akknr6TBtpavNT89fDIcBp7papJJx0x'
//enviando para o zeit

const list = async (key) => {
    const { data } = await axios.get(BaseURL + key +".json?auth="+auth)

    if(data) {
        console.log('key ',key)
         const categorias = Object.keys(data).map(item => ( { id:item,categoria:data[ item ]['categoria'] || data[item] } ))
        console.log('categorias',categorias)
         return categorias
    }else{
        return []
    }
}

const apagar = async (key,id) => {
    console.log(`URL- ${BaseURL}${key}/${id}.json?auth=${auth}`)
    await axios.delete(`${BaseURL}${key}/${id}.json`)
    return true
}

const get = async (key,catId = '',id) => {
    const { data } = key == 'publicacoes' 
    ? await axios.get(`${BaseURL}/${key}/${catId}/${id}.json?auth=${auth}`)
    : await axios.get(`${BaseURL}/${key}/${id}.json`)

    console.log('get api',data)
     const  [ categoria ]   = Object.keys(data).map(item => ({ id,categoria: data[item] }) )
     return  key == 'publicacoes' ? { data, catId, id } : categoria
}

const update = async (key,{ categoria, id },{ titulo , conteudo}) => {
    //console.log(`${BaseURL}${key}/${categoria}/${id}.json`,'DATA ',data)
    // console.log(titulo,conteudo)
    await axios.put(`${BaseURL}${key}/${categoria}/${id}.json?auth=${auth}`,{ titulo, conteudo })
    return true
}

const create = async (key,categoria) => {
   key == 'categorias' 
   && axios.post(`${BaseURL}/${key}.json`, { categoria })
   || await axios.post(`${BaseURL}/${key}.json?auth=${auth}`, categoria)
}

module.exports = { list, apagar, get, update, create }