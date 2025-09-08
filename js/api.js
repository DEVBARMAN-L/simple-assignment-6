const btnLoad = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
     .then((json) => {
      if(json.categories && Array.isArray(json.categories)){
        displyLoadBtn(json.categories);
      }else{
        console.error("API data is not an array:", json);
      }

     })
      .catch((err) => console.error("API fetch error:", err));

    };


const displyLoadBtn = (btns) => {
  if(!Array.isArray(btns)){
      console.error("btns is not array:", btns);
      return;
  }


    const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML="" ;

    for(let btn of btns){
        const btnDiv = document.createElement("div");  

        btnDiv.innerHTML=`

         <button class="btn btn-wide m-1">${btn.category_name}</button>

        `;

        levelContainer.append(btnDiv);
    }
};

btnLoad();


const midBox = () => {
    fetch("https://openapi.programming-hero.com/api/category/1")
    .then((res) => res.json())
     .then((json) => {
      if(json.plants && Array.isArray(json.plants)){
        displayBox(json.plants);
      }else{
        console.error("API data is not an array:", json);
      }

     })
      .catch((err) => console.error("API fetch error:", err));

    };


const displayBox = (plantss) => {
  if(!Array.isArray(plantss)){
      console.error("cards is not array:", cards);
      return;
  }


    const midcontainer = document.getElementById("mid_container");
  midcontainer.innerHTML="" ;

    for(let plant of plantss){
        const btnDiv = document.createElement("div");  

        btnDiv.innerHTML=`

        <div class="card bg-base-100 w-96 shadow-sm m-2 p-3">
        <figure>
        <img src="${plant.image}" alt="${plant.name}" class="w-full h-48 object-cover" />
        </figure>
  <div class="card-body">
    
    <h2 class="card-title">${plant.name}</h2>
    <p class="text-end mb-4 font-bold text-xl">${plant.price}</p>
     <div class="card-actions justify-center ">
      <button class="btn btn-primary w-[350px] h-[40px] rounded-[50px] p-3">Buy Now</button>
    </div>
  </div>
</div>

        `;

        midcontainer.append(btnDiv);
    }
};

midBox();








