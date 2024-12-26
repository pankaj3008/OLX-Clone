// import{footer} from "./components/footer.js";
// import{navbar} from "./components/navbar.js";

// let navbar_div = document.getElementById("main-navbar");
// navbar_div.innerHTML = navbar();
// let footer_div = document.getElementById("main-footer");
// footer_div.innerHTML = footer();


getProducts();
let data;
async function getProducts(){
    let product_name = "mobiles";
    
    try{
        let response = await fetch(`https://636a74ebb10125b78fdbef78.mockapi.io/${product_name}`);
        console.log("response",response)
        let actual_data = await response.json();
        console.log("actualdata:",actual_data);
        data = actual_data;
        displayProducts(actual_data);
    }
    catch(err){
        console.log("err:",err)
    }
}

let selectprice = document.getElementById("sort");
// console.log(selectprice.value)

selectprice.addEventListener("change",sortbyPrice);
        
        function sortbyPrice(){
            let selectprice1 = document.getElementById("sort");
            console.log(selectprice1.value)
            if(selectprice1.value=="hl"){
              data.sort(function(a,b){
                // price = +price;
              return b.price-a.price;
            });
            // console.log(actual_data)
            displayProducts(data);
          } else if(selectprice.value=="lh"){
            data.sort(function(a,b){
            //   console.log("a-b")
            // price = +price;
              return a.price-b.price;
            });
            // console.log(actual_data)
            displayProducts(data);
          }
        };

function displayProducts(res){
    // console.log("res:",res);
    let cards =  document.querySelector("#cards")
     
    cards.innerHTML = "";
   
    // document.querySelector("#cards").innerHTML=null;
    // let loader_div = document.getElementById("loader_div");
    // loader_div.style.display="none";

    res.forEach(function(el){
        let div = document.createElement("div");
        div.className="card";
        // cards.innerHTML = `<div class="card" onClick ="setData()"></div>`

        let img_div = document.createElement("div");
        img_div.className = "cardimg"

        let distance = document.createElement("h4");
        distance.innerText = el.traveled;

        let title =document.createElement("h4");
        title.innerText = el.title;

        let img_src = document.createElement("img");
        img_src.src = el.image_src;
            
        
        let price = document.createElement("h2");
        price.innerText = "₹"+el.price;
        
        let date = document.createElement("h5");
        date.innerText = el.date;

        let location = document.createElement("h4");
        location.innerText = el.location;
        
        let button = document.createElement("button");
        button.classList.add("btn");
        button.innerText = "See Details";
        // button.style.Cursor="pointer";
        button.addEventListener("click",function(){
          setData(el);
          document.location.href="../productdetails.html";
        });

        img_div.append(img_src);

        
        div.append(img_div,price,title,location,date,button);
        cards.append(div);
        

        // let card = document.getElementsByClassName("card");
        
    });
    
        
}

function setData(el){
  let productData = [];
    // console.log(el)
    productData.push(el);
    console.log(productData);
    localStorage.setItem("local_Key",JSON.stringify(productData))
}




// let id;

// function debounce(func,delay){

//     if(id){
//         clearTimeout(id);
//     }

//     id = setTimeout(function(){
//         func();
//     },delay);
// }



// async function searchMovies(){
//   // let product_name = document.getElementById("searchField").value;
//   let movie_name = document.getElementById("searchField").value;
//   try{
//     // let response = await fetch(`https://636a74ebb10125b78fdbef78.mockapi.io/${product_name}`);
//       let response = await fetch(`https://www.omdbapi.com/?apikey=f3d5c71f&s=${movie_name}`);
//      // let response = await fetch(`https://api.hotstar.com/s/sniper/forerunner?q=${movie_name}&size=50&offset=0`)
//       let newdata = await response.json();
//       console.log("data:",newdata);
//       let dat = newdata.Search;
//       console.log("new",dat)
      
  
//       //console.log("actual_data:",actual_data);
//       displayProducts(newdata);;
//   }
//   catch(err){
//       console.log("err:","no data found");
//       // displayProducts(data);
//   }
// }

function search() {
  let input = document.getElementById("searchField").value;
  let newdata = data.filter(function (elem) {
      return elem.title.toLowerCase().includes(input.toLowerCase())
  })
  displayProducts(newdata)
}