const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    run().then(v => {
        res.render('index', { v })
    }).catch(console.error)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const uri = `mongodb+srv://admin:${process.env.PASSWORD}@sob.w9c6jzn.mongodb.net/?retryWrites=true&w=majority&appName=sob`;
const client = new MongoClient(uri, {serverApi: {version: ServerApiVersion.v1}})
async function run() {
    try {
        await client.connect()
        const database = client.db("sample_mflix")
        const sob = database.collection("movies")
        const answ = await sob.find({year: 1968}).toArray()
        return answ  
    } finally {
        await client.close()
    }
}

