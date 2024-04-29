const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()


const port = process.env.PORT || 3000;
main().then(()=>{
    console.log("db connected successfully")
}).catch(err => console.log(err));


async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/test');

  await mongoose.connect('mongodb+srv://sanjeet620395:yRFYdLvYue9gKAmf@cluster0.akod5d9.mongodb.net/Blog-Website');
//   await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.if75gpt.mongodb.net/Testing`);
}
app.set("views", "./view")
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req, res) => {
    const articles =await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(port,()=>{
    console.log(`port is lising at ${port}`)
})
