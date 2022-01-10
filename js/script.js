const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("lyrics");

const apiURL= "https://api.lyrics.ovh";


form.addEventListener("submit", e => {
  e.preventDefault();
 let searchLyrics = search.value.trim();

if (!searchLyrics){
  alert("Enter the value");
} else{
  searchValue(searchLyrics);
}

})

async function searchValue(searchLyrics)
{
const searchResult = await fetch(`${apiURL}/suggest/${searchLyrics}`);
const data = await searchResult.json();
  // console.log(data);
  data.data.forEach(element => {
    let div = document.createElement('div');
    div.classList.add("getList");
    div.innerHTML= `<div><b>${element.title}</b> - ${element.artist.name} </div>`;
    let btn = document.createElement("BUTTON");
    btn.addEventListener('click', e=>{
    //  console.log(element)
    getLyrics(element.artist.name , element.title);
    })    
    btn.classList.add("getBtn")
    btn.innerHTML = "Get Lyrics";
    div.append(btn); 
    result.append(div);
  });

}


function getLyrics(artist , songTitle){
  fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`)
  .then(data =>data.json())
  .then(data => {
    result.innerHTML ="";
    let heading = `<div class="heading"> <b>${artist}</b> - ${songTitle}</div>`;
    let lyrics = document.createElement("div");
    lyrics.innerText= data.lyrics;
    result.innerHTML = heading;
    result.append(lyrics);
    // result.innerText = data.lyrics;
   
  });
}
