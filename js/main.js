const shop = document.getElementById('shop');
 
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Produktdatat finns i variabeln shopData (se data.js)


const generateShop = () => {
    // Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()
    // Använd denna markup för varje produktkort - den korresponderar mot CSS:en

    return (shop.innerHTML= shopData.map((x)=>{
        let {id, title, price, description, image } = x;
        return `
        <div id=product-id-${id} class="item">
             <img width="220" src=${image} alt=""> 
             <div class="details">
                 <h3>${title}</h3>
                 <p>${description}</p>
                 <div class="price-quantity">
                 <h2>${price}</h2>
                 <div class="buttons">
                     <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                     <div id=${id} class="quantity"></div>
                     <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                 </div>
                 </div>
             </div>
         </div>
        `;
    }).join(""));
};

generateShop();

const increment = (id) => {
    // Om användaren klickar på + på produkten 
    let itemSel = id;
    let search = basket.find((x) => x.id === itemSel);

    if(search === undefined){
        basket.push({
            id:itemSel,
            item: 1, 
        });
    }else{
        search.item += 1;
    }

    /* console.log(basket); */
    update(itemSel);
}

const decrement = (id) => {
    // Om användaren klickar på - på produkten 
    let itemSel = id;
    let search = basket.find((x) => x.id === itemSel);

    if(search.item === 0) return;
    else{
        search.item -= 1;
    }

   /*  console.log(basket); */
    update(itemSel);
}

const update = (id) => {
    let search = basket.find ((x) => x.id === id)
    /* console.log(search.item); */
    document.getElementById(id).innerHTML = search.item;
    cartUpdating();
}

const cartUpdating = () => {
    let IconCart = document.getElementById("cartAmount");
    IconCart.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
