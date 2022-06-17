document.querySelector(".search").addEventListener("keydown", (event)=>{
    if (event.key === "Enter")
        apiRequest()
})


document.querySelector(".btn-search").addEventListener("click", ()=>{
    apiRequest()
})

function apiRequest(){
    document.querySelector(".container").textContent = "";
    const input = document.querySelector(".search").value
    const url = `https://api.unsplash.com/search/photos?query='${input}'&per_page=30&client_id=LIc2aV8fFZE9U5yGgHWawohBOUVRuOttqWdh1zCp8wE`

    fetch(url).then(response => {
        if (!response.ok) throw Error(response.statusText);
          return response.json();
       }).then((data)=>{
            loadImages(data)
        }).catch(error => {console.log(error)})
}

function loadImages(data){
    let input = document.querySelector(".search").value

    document.querySelector(".input-value").innerHTML = `Results for: "${input}"`
    for(let i = 0; i < data.results.length;i++){

        let image = document.createElement("div")
        image.className = "img"
        image.style.backgroundImage = `url(${data.results[i].urls.raw}&w=1366&h=768)`
        image.addEventListener("dblclick", ()=>{
            window.open(data.results[i].links.download, "_blank")
        })
        document.querySelector(".container").appendChild(image)
    }
}
