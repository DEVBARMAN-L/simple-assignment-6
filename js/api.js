const planConatainer = document.getElementById("level-container");
const buttonContainer = document.getElementById("mid_container");

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
        const buttonEl = document.createElement("button");  
        buttonEl.className ="btn btn-wide m-1 flex";
        buttonEl.textContent =btn.category_name;

         buttonEl.addEventListener("click", () => {
          midBox(btn.category_name);
         })

        levelContainer.append(buttonEl);
    }
};





const midBox = (categoryName = null) => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
     .then((json) => {
     if(json.plants && Array.isArray(json.plants)){
      let plants = json.plants;

      if(categoryName){
        plants = plants.filter(p => p.category === categoryName);
      }else{
        plants=plants.slice(0, 6);
      }
      displayBox(plants);

     }else{
      console.error("api data is no an array", json);
     } 

     })
      .catch((err) => console.error("API fetch error:", err));

    };


const displayBox = (plantss) => {
  if(!Array.isArray(plantss)){
      console.error("cards is not array:", plantss);
      return;
  }


    const midcontainer = document.getElementById("mid_container");
  midcontainer.innerHTML="" ;

    for(let plant of plantss){
        const btnDiv = document.createElement("div");  

        btnDiv.innerHTML=`

        <div class="card bg-base-100  shadow-sm p-3 mt-5 w-full sm:w-[45%] md:w-[87%] ">
        <figure>
        <img src="${plant.image}" alt="${plant.name}" class="w-full h-48 object-cover" />
        </figure>
  <div class="card-body">
    
    <h2 class="card-title">${plant.name}</h2>
   <p class="small_description line-clamp-2 text-sm md:text-base"> ${plant.description}</p>
   <div class="flex justify-evenly "> 
    <p class="bg-green-200 w-7 rounded-xl mb-4 semibold text-xl text-left">${plant.name}</p>
   <p class="text-end mb-4 font-bold text-xl">${plant.price}</p>
      </div>
     
     <div class="card-actions justify-center ">
      <button class="btn btn-primary  w-[150px] h-[40px] md:w-[350px] rounded-[50px] p-3 btn-buy">Buy Now</button>
    </div>
  </div>
</div>

        `;
       
   const buyBtn =btnDiv.querySelector(".btn-buy");
   if(buyBtn){
    buyBtn.addEventListener("click", () => {
      addToCart(plant);
      alert("!buying");
    });
   }

      midcontainer.append(btnDiv);
   
   
      }
};
  
    

btnLoad();
midBox();

const joinBtn = document.getElementById("Involved-btn").addEventListener("click",() => {
  alert("YOU Involved To Green-Earth");
})


let cart = [];
const addToCart = (plant) =>{
const existing = cart.find(p => p.id === plant.id);
if(existing){
  existing.quantity += 1;
}else{
  cart.push({...plant, quantity:1});
}
   updateCartDiv();
};

const updateCartDiv = () =>{

  const cartDiv = document.querySelector(".right_div");
  cartDiv.innerHTML=`<h2 class="font-bold text-xl mt-2"
   <button id="clear-cart" class="bg-red-500 text-white px-2 py-1 rounded text-sm"><i class="fa-solid fa-xmark"></i></button> 
  `;
 cartDiv.querySelector("#clear-cart").addEventListener("click", () => {
  cart =[];
  updateCartDiv();
 });

  let total = 0;
  cart.forEach(item => {
    total += (item.price) * item.quantity;
    const itemDiv =document.createElement("div");
    itemDiv.className = "flex justify-between p-2 border-b";
    itemDiv.innerHTML =`
     <span>${item.name} x ${item.quantity}</span>
     <span>${item.price * item.quantity}</span>
    `;
    cartDiv.append(itemDiv);
  });
  const totalDiv = document.createElement("div");
  totalDiv.className = "flex justify-between p-2 font-bold";
  totalDiv.innerHTML =`<span> total</span><span>${total}</span>`;
  cartDiv.append(totalDiv);
}; 

