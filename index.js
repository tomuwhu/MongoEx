const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express()
app.use(express.static('public'))
const port = 3000
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    run().then(v => {
        res.render('index', { v })
    }).catch(console.error)
})

app.get('/:year', (req, res) => {
    run(req.params.year).then(v => {
        res.render('index', { v, year: req.params.year })
    }).catch(console.error)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const uri = `mongodb+srv://admin:${process.env.PASSWORD}@sob.w9c6jzn.mongodb.net/?retryWrites=true&w=majority&appName=sob`;
const client = new MongoClient(uri, {serverApi: {version: ServerApiVersion.v1}})
async function run(year) {
    try {
        if (!year) year = 2000
        else year = Number(year)
        await client.connect()
        const database = client.db("sample_mflix")
        const sob = database.collection("movies")
        const answ = await sob.find({year}).sort({"title": 1}).toArray()
        return answ  
    } finally {
        await client.close()
    }
}

