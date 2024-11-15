let ApiData;
let allCategories = [];
console.log(allCategories);

async function getApidata() {
    const url = "https://fakestoreapi.com/products";
    let responce = await fetch(url);
    let dataInjson = await responce.json();
    ApiData = dataInjson
    cardMaker(dataInjson)
    // console.log(ApiData);
    // allApiData = dataInjson
    // console.log(Object.keys(dataInjson[0]));
    console.log("new line of code")
   

};


// let allApiData = [];
// console.log(allApiData);


// this function making card on the basis of select value/option 
function getValue(val) {
    let optionVal = val.value;
    console.log(optionVal);    
   let filteredItems = ApiData.filter((product)=>{
    if (product.category === optionVal) {
        return product;
    }

})
if (optionVal=== "all-categories" ) {
    cardMaker(ApiData)
}
else{
   cardMaker(filteredItems)

}
   console.log(ApiData);
    // let CardsCountainer = document.getElementById("cards");


    }

function cardMaker(dataInjson) {
    let CardsCountainer = document.getElementById("cards");
   CardsCountainer.innerHTML = "";

    let categoriesDDL = document.getElementById("selectContainer") ;
    dataInjson.map((obj) => {
        let id = obj.id
        let imgUrl = obj.image
        let title = obj.title
        let price = obj.price
        let description = obj.description
        let category = obj.category
        let rate = obj.rating.rate
        let count = obj.rating.count;

        if (!allCategories.includes(category)) {
            allCategories.push(category)
            categoriesDDL.innerHTML += `<option value="${category}">${category}</option>`
        }

        

        let card = `<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img class="p-8 h-[230px] rounded-t-lg" src="${imgUrl}" alt="product image" />
        </a>
        <div class="px-5 pb-5">
            <a href="#">
                <h5 class="text-xl  h-[110px] font-semibold tracking-tight text-gray-900 dark:text-white">${title}</h5>
            </a>
            <div class="flex items-center mt-2.5 mb-5">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    <i class="material-icons text-yellow-400">star</i> 
                </div>
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">${price}$</span>
                <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
            </div>
        </div>
    </div>`
        CardsCountainer.innerHTML += card;
    });
}
// calling function
getApidata();
console.log(ApiData)
