const url = "https://rickandmortyapi.com/api/character";

const getPersonajes = async () =>{

    try {
        const response = await fetch(url);
        if(!response.ok){
            throw Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data.results);
        return data.results;
    } catch (error) {
        console.error(error);
    }
}

const generarCard = (personaje) =>{
    const url = `https://rickandmortyapi.com/api/character/avatar/${personaje.id}.jpg`;
    const elemento = document.createElement("div");
    elemento.className = "card text-white bg-dark mb-3";
    elemento.style = "max-width: 540px";
    elemento.innerHTML =`
    <div class="row g-0">
      <div class="col-md-4">
        <img src=${personaje.image} class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${personaje.name}</h5>
          <p class="card-text">${personaje.gender}</p>
          <p class="card-text"><small class="text-muted" >${personaje.location.name}</small></p>
        </div>
      </div>
    </div>
  </div>
  `;



    return elemento;
}

const cargarContainer = async (id) => {
    const container = document.querySelector(id);
    const personajes = await getPersonajes();

    //console.log(personajes);

     personajes.forEach((personaje)=>{
         container.appendChild(generarCard(personaje))
     });
}

cargarContainer('#container_cards');
getPersonajes();