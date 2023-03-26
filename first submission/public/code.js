let getposts = document.querySelector('#get-posts')
getposts.addEventListener('click', fetchData)

let postButton = document.querySelector('#postwords')
postButton.addEventListener('click', postWords)

let recentPosts=[]
let maxRecents=10
let currentWords=''
let recentPostList=document.querySelector("#recent-posts")

words.addEventListener('input',checkWords)

function checkWords(event){
    currentWords=event.target.value
}

function postWords(){
    let thisPost={
        post: currentWords
    }
    postTheseWords(thisPost)
}

function postTheseWords(wordsToPost){
    console.log("posting...")
    console.log(wordsToPost)
    removeEmptyElements(recentPosts)
    let options={
        method: 'POST',
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify(wordsToPost)
    }
    fetch('/newpost', options)
        .then(response=>response.json())
        .then(serverData=>handleDataFromServer(serverData))
        console.log("...Posted")
}

function fetchData(){
    let numberToFetch=10
    let getPostsParam=`/?qty=${numberToFetch}`
    fetch('/get-posts'+getPostsParam)
        .then(response=>response.json())
        .then(fetchedData=>handleDataFromServer(fetchedData))
}

function handleDataFromServer(data){
    console.log('data received from server')
    console.log(data)
    recentPosts=data.posts
    updateRecentPosts()
}

function updateRecentPosts(){
    recentPostList.innerHTML=''
    recentPosts.forEach(function(post){
        let li=document.createElement('li')
        let liText=document.createElement('p')
        liText.textContent=`${post.post}`
        li.appendChild(liText)
        recentPostList.appendChild(li)
    })
}
//function to remove empty posts
function removeEmptyElements(recentPosts) {
    for (let i = 0; i < recentPosts.length; i++) {
      if (recentPosts[i] === '' || recentPosts[i] === null || recentPosts[i] === undefined) {
        arr.splice(i, 1);
        i--;
      }
    }
}