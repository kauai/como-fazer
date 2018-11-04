const api = require('../api')


const novaForm = async (req,res) => {
    const categorias = await api.list('categorias')
    res.render('publicacoes/nova',{ categorias })
 }

 const nova =  async (req,res) => {
    await api.create('publicacoes/' + req.body.categoria,{
        titulo:req.body.titulo,
        conteudo:req.body.conteudo,
    })

    res.redirect('/publicacoes/categoria/'+ req.body.categoria)
}

const list =  async (req,res) => {
    const categorias = req.params.categoria
    const publicacoes = await api.list('publicacoes/'+categorias)
    res.render('publicacoes/index',{ publicacoes, categorias })
}


const excluir =  async (req,res) => {
    console.log('EXCLUIR ',req.params)
    await api.apagar('publicacoes/'+ req.params.categoria,req.params.id)
    res.redirect('/publicacoes/categoria/'+req.params.categoria)
}

const editarForm = async (req,res) => {
    const categoria = await api.get('publicacoes',req.params.categoria,req.params.id)
    res.render('publicacoes/editar',{ categoria })
 }

 const editar =  async (req,res) => {
     console.log('EDITAR',req.params)
    await api.update('publicacoes',req.params,req.body)
    res.redirect('/publicacoes/categoria/'+req.params.categoria)
}

 module.exports = { novaForm, nova, list, excluir, editarForm, editar }