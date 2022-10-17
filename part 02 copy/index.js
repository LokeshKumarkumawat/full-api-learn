const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

//GET REQUEST HEADER
const nfts = JSON.parse(fs.readFileSync(`${__dirname}/nft-data/data/nft-simple.json`))
console.log(nfts);
app.get('/api/v1/nfts', (req, res) => {
    res.status(200).json({
        status: "success",
        result: nfts.length,
        data: {
            nfts,
        }
    })  
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))