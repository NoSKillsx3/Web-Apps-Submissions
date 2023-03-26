const express=require('express')
const app = express()
app.listen(3000, ()=> console.log('listening at port 3000'))
app.use(express.static('public'))
app.use(express.json())
const path = require('path');

const postList=[]
defaultQtyPostsToSend=10

app.post('/newpost', (request, response)=>{
    console.log(request.body)
    let post=request.body
    postList.unshift(post)
    response.json({
        posts:postList.slice(0,defaultQtyPostsToSend)
    })
    
})

app.get('/get-posts', (request, response)=>{
    const qtyPosts = request.query.qty;
    response.json({
        posts:postList.slice(0,qtyPosts)
    })
})
