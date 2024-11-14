let allCategories = [];
let allApiData;
// async Fun getting data from Api...
(async function getApidata() {
    const url = "https://fakestoreapi.com/products"
    let responce = await fetch(url);
    let dataJson = await responce.json()
    allApiData = dataJson
    cardMaker(dataJson)
    // console.log(dataJson);
}());
// this Fun making card on the basis of Api Data...
function cardMaker(data) {
    let cardContainer = document.getElementById("cards")
    cardContainer.innerHTML = ""
    let selectContainer = document.getElementById("selectContainer")
    data.map((obj) => {
        let title = obj.title
        let id = obj.id
        let price = obj.price
        let description = obj.description
        let category = obj.category
        // console.log(category);
        let imgUrl = obj.image
        let rate = obj.rating.rate

        if (!allCategories.includes(category)) {

            allCategories.push(category)
            selectContainer.innerHTML += `<option value="${category}">${category}</option>`
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

        cardContainer.innerHTML += card

    })
};
// this Fun getting value from select and making card on the basis of select value...
function getValue(val) {
    let ddlValue = val.value
    let filtereditem = allApiData.filter((item) => {
        if (ddlValue === item.category) {
            return item
        }
    })

    if (ddlValue === "all-categories") {
        cardMaker(allApiData)
    }

    else {
        cardMaker(filtereditem)

    }
};
// this Fun making card on the basis of search text...
function searchOnText() {
    let inputVal = document.getElementById("inputTxt").value.toUpperCase();
    console.log(inputVal);
    let filteredTxt = allApiData.filter((item) => {
        let titleText = item.title.toUpperCase();
        if (titleText.indexOf(inputVal) > -1) {
            return item
        }
    });
    cardMaker(filteredTxt);

    if (inputVal === "") {
        cardMaker(allApiData);
    };
};
// this Fun making cards on the basis of search price...
function searchOnPrice() {
    let scrhPrice = document.getElementById("PriceInp").value;
    let cardsPrice = allApiData.filter((item) => {
        let itmPrice = item.price;
        if (scrhPrice >= itmPrice) {
            return item
        }
    })
    cardMaker(cardsPrice)
    if (scrhPrice == "") {
        cardMaker(allApiData)
    }
};