const newhero=document.getElementById('newhero')
const herodiv=document.getElementById('photo')
const search=document.getElementById('Search')
const name=document.getElementById('name')
const text=document.getElementById('TEXT')
const token = '229485596336811'
const url = `https://www.superheroapi.com/api.php/${token}`
const superHero = (id,name) => {
  // name -> url/search/batman
  // json.results[0].image.url
  
  //  id  -> url/id
  //  json.image.url
  fetch(`${url}/${id}`).then(response => response.json()).then(json => {
    const stats=getherostats(json);//powerstats
    const nameElement = `<h2>Name : ${json.name}</h2>`;
      const imageElement = `<img src="${json.image.url}" height="200" width="200"/>${stats}`;
      herodiv.innerHTML = `${nameElement}<div>${imageElement}</div>`;
  })
}

const stattoemoji={
  intelligence:'🧠',
  strength:'💪',
  speed:'⚡',
  durability:'🏋️‍♂️',
  power:'📊',
  combat:'🥷'
}

const getherostats=(character)=>{
  console.log(character.powerstats)
  const a=Object.keys(character.powerstats).map(stat=>{
    return `<p>${stattoemoji[stat]} ${stat.toUpperCase()} : ${character.powerstats[stat]}</p>`
  })
  console.log(a.join(''))
  return a.join('')
}

const searchsuperhero=(name)=>{
  fetch(`${url}/search/${name}`).then(response=>response.json()).then(json=>{
     const nameElement = `<h2>Name : ${name}</h2>`;
    const address=json.results[0]
    const stats_=getherostats(address);
     const imageElement = `<img src="${address.image.url}" alt="Not Found"height="200" width="200"/>${stats_}`;
    herodiv.innerHTML=`${nameElement}<div>${imageElement}</div>`
  })
}
const random=()=>{
  const no=Math.ceil(Math.random()*731)
  return no
}
newhero.onclick=()=>{
  superHero(random())
}
search.onclick=()=>{
  searchsuperhero(text.value)
}

