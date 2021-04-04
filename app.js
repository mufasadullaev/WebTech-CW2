const express = require('express')
const app = express()

const fs = require('fs')

app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))

// localhost:8000
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/create', (req, res) => {
    res.render('create')
})
app.post('/create', (req, res) =>{
    const imginput = req.body.imginput
    const imgtitle = req.body.imgtitle
    const imgdescription = req.body.imgdescription

    if (imgtitle.trim() ===  '' && imgdescription.trim() === '') {
        res.render('create', {error: true})

    } else{
        fs.readFile('./data/posts.json', (err, data) => {
            if (err) throw err

            const posts = JSON.parse(data)

            posts.push({
                id: id(),
                imginput: imginput,
                imgtitle: imgtitle,
                imgdescription: imgdescription,
            })

            fs.writeFile('./data/posts.json', JSON.stringify(posts), err => {
                if (err) throw err

                res.render('create', {success : true})
            })
        })
    }
})

const posts = ['Image-1', 'Image-2']

app.get('/posts', (req, res) => {
    res.render('posts', {posts: posts})
})

app.get('/posts/details', (req, res) => {
    res.render('details')
})

app.listen(8000, err => {
    if (err) console.log(err)

    console.log('Server is running on port 8000...')
})

function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };