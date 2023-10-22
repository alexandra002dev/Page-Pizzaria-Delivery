let cart = [];
let modalKey = 0;
let pizzaSize=0;
let modalQt = 1;
const c =(el)=> document.querySelector(el);
const cs = (el)=> document.querySelectorAll(el);


pizzaJson.map((item,index)=>{
    let pizzaItem = c(".models .pizza-item").cloneNode(true);
    
    pizzaItem.setAttribute("data-key", index);
    pizzaItem.querySelector(".pizza-item--img img").src = item.img;
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;
    pizzaItem.querySelector(".pizza-item--price").innerHTML= `R$: ${item.price.toFixed(2)}`;
    //abrir Modal
    pizzaItem.querySelector("a").addEventListener("click", (e)=>{
        e.preventDefault();
        let key= e.target.closest(".pizza-item").getAttribute("data-key");
        modalQt = 1;
        modalKey = key;
        c(".left .imagem img").src = pizzaJson[key].img;
        c(".descricao .titulo").innerHTML = pizzaJson[key].name;
        c(".descricao .desc").innerHTML = pizzaJson[key].description;
        c(".pizzaInfo--pricearea .pizzaInfo--actualPrice").innerHTML = `R$: ${pizzaJson[key].price.toFixed(2)}`;
        c(".pizzaInfo--size.selected").classList.remove("selected");
        //Tamanho das Pizzas
        cs(".pizzaInfo--size").forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add("selected");
            }
            size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        c(".pizzaInfo--qt").innerHTML = modalQt;
        
        c(".modal").style.display="flex";
        c(".modal").style.opacity= 0;
        setTimeout(()=>{
            c(".modal").style.opacity= 1;
        },200);
    });
    c(".pizza-area").append(pizzaItem);

});
//Fechar Modal
c(".pizzaInfo--cancelButton").addEventListener("click", ()=>{
    c(".modal").style.opacity= 0;
    setTimeout(()=>{
        c(".modal").style.display="none";
    },500);
});

//Botão de mais e menos(Quantidades)
c(".pizzaInfo--qtmais").addEventListener("click",()=>{      
    modalQt ++;
    c(".pizzaInfo--qt").innerHTML = modalQt;
});
c(".pizzaInfo--qtmenos").addEventListener("click",()=>{
    if(modalQt >1){ 
        modalQt --;
        c(".pizzaInfo--qt").innerHTML = modalQt; 
    }     
});  
//Tamanho da pizza
cs(".pizzaInfo--size").forEach((size, sizeIndex)=>{
    size.addEventListener("click", (e)=>{
        c(".pizzaInfo--size.selected").classList.remove("selected");
        size.classList.add("selected");
        pizzaSize = sizeIndex;
    });
});  
//Botão Adicionar
c(".pizzaInfo--addButton").addEventListener("click",()=>{
    let identifier = pizzaJson[modalKey].id + "@" + pizzaSize;
    let key = cart.findIndex((item)=>item.identifier == identifier);
    if(key > -1){
        cart[key].quantidade += modalQt;
    }else{
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            tamanho:pizzaSize,
            quantidade:modalQt
        });
    }
    updateCart();
    c(".modal").style.opacity= 0;
    setTimeout(()=>{
    c(".modal").style.display="none";
    },500);
    console.log(cart)
});
c(".menu-openner").addEventListener("click", ()=>{
    if(cart.length > 0){
        c("aside").style.display = "flex";
    }   
});
c(".menu-closer").addEventListener("click",()=>{
    c("aside").style.display = "none";
});
function updateCart(){
    c(".menu-openner span").innerHTML = cart.length;
    if(cart.length > 0){
        c("aside").classList.add("show");
        c(".cart").innerHTML = "";
        let subTotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            subTotal += pizzaItem.price * cart[i].quantidade;
            let cartItem = c(".models .cart--item").cloneNode(true);
            let pizzaSizeName= cart[i].tamanho;

            switch(cart[i].tamanho){
                case 0:
                    pizzaSizeName = "P";
                    break;
                case 1:
                    pizzaSizeName = "M";
                    break;
                case 2:
                    pizzaSizeName = "G";
                    break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            cartItem.querySelector(".cart--item-nome").innerHTML = pizzaName;
            cartItem.querySelector(".cart--item img").src = pizzaItem.img;
            cartItem.querySelector(".cart--item--qt").innerHTML = modalQt;
            cartItem.querySelector(".cart--item--qt").innerHTML = cart[i].quantidade;
            cartItem.querySelector(".cart--item-qtmenos").addEventListener("click",()=>{
                if(cart[i].quantidade > 1){
                    cart[i].quantidade--;
                }else{
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector(".cart--item-qtmais").addEventListener("click",()=>{
                cart[i].quantidade++;
                updateCart();
            });
            c(".cart").append(cartItem);

        }
        desconto = subTotal *0.1;
        total = subTotal - desconto;
        c(".subtotal span:last-child").innerHTML = `R$ ${subTotal.toFixed(2)}`;
        c(".desconto span:last-child").innerHTML = `R$ ${desconto.toFixed(2)}`;
        c(".total span:last-child").innerHTML = `R$ ${total.toFixed(2)}`;
    }else{
        c("aside").classList.remove("show");
    }
}


//scroll Suave
function scrollTo(e){
    document.querySelector(e).scrollIntoView({behavior: "smooth"});
}
document.querySelector(".button").addEventListener("click",(e)=>{
    e.preventDefault();
    scrollTo(".banner2");
})