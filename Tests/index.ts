import express from 'express'
 
const app = express();
 
const port = 6666
const hostname = 'localhost'
 console.log("gi" , __dirname);
 
const obj = {
    name: 'Dolex',
    age: 45,
    isTired: false,
    company: 'paragon',
}
 
const replacer = (key: string, value: unknown) => {
    if (typeof value === 'string' && key !== 'company') {
        return value.toUpperCase()
    }
    return value
}
console.log(JSON.stringify(obj, replacer, 15))
 
app.set('json spaces', 30)
app.set('json replacer', replacer)
 
app.get('/', (req, res) => {
    try {
        // const error = {
        //     status: 500,
        //     message: 'ohh no!'
        // }
        // throw error
        res.status(200).send('hello expresso!')
    } catch (error: any) {
        console.log(error)
        res.status(500).send(error)
    }
})
 
app.get('/send-null', (req, res) => {
    try {
        // const error = {
        //     status: 500,
        //     message: 'ohh no!'
        // }
        // throw error
        res.status(200).json(null)
    } catch (error: any) {
        console.log(error)
        res.status(500).json(error)
    }
})
 
app.get('/user', (req, res) => {
    try {
        res.status(200).json(obj)
    } catch (error: any) {
        console.log(error)
        res.status(500).json(error)
    }
})
 
app.get('/home', (req, res) => {
    try {
        res.status(200).sendFile(`${__dirname}/views/home.html`)
    } catch (error: any) {
        console.log(error)
        res.status(500).json('error')
    }
})
 
 
 
 
app.listen(port, hostname, () => console.log(`listening on port ${port}`))