let menu = document.getElementById("menu-bar");
const numFood = document.querySelector(".sb-cart-number");
let navbar = document.querySelector(".navbar");
let meunFood = document.getElementById("nav-toggle");
const btnCardShoping = document.querySelector(".btn-conatiner-shop");
const myFoodContainer = document.querySelector(".shoping-card-container");
const overlay = document.querySelector(".overlay");
const containerPopularFood = document.querySelector(".Popular");
const iconShopingCard = document.querySelector(".sb-icon");
const containerEmpty = document.querySelector(".container-empty");
const allBox = document.querySelectorAll(".box-popular-food");
const totalValues = document.querySelector(".sub-value");
const contentShopingCards = document.querySelector(
    ".cinatiner-main-ShopingCard"
);

let finalFoods = [];
let isAdult = false;
let prices = 0;
let openShopingCar = false;

console.log(openShopingCar);

//click menu humbarger
menu.addEventListener("click", function() {

    if (openShopingCar === false) {
        navbar.classList.toggle("active");
        menu.classList.toggle("fa-times");
    }

});

//icon multipy shoping card
meunFood.classList.toggle("active");

//hide shoping card
btnCardShoping.addEventListener("click", function() {
    myFoodContainer.style.left = "0px";
    overlay.classList.add("opacity");
});

//show shoping card

meunFood.addEventListener("click", function() {
    myFoodContainer.style.left = "-100%";
    overlay.classList.remove("opacity");
});

//show loader image pizza

function loader() {
    document.querySelector(".loader-container").classList.add("fade-out");
}

function fadeOut() {
    setInterval(loader, 2000);
}

window.onload = fadeOut();

containerPopularFood.addEventListener("click", buyFoodPopular);
document.addEventListener("DOMContentLoaded", loadMyFood);
document.addEventListener("DOMContentLoaded", counterFoodPopular);
iconShopingCard.addEventListener("click", updateShopingCard);
containerPopularFood.addEventListener("click", plusAddFood);
contentShopingCards.addEventListener("click", addFoodMinsFood);

//add to cart food popular
function buyFoodPopular(e) {
    let num = 0;

    const containerShoping = document.querySelector(
        ".cinatiner-main-ShopingCard"
    );
    e.preventDefault();
    let arryIds = JSON.parse(localStorage.getItem("idFoods"));
    let arrayFood = JSON.parse(localStorage.getItem("myFoods"));

    if (e.target.classList.contains("btn")) {
        const myFoods = checkLocalStorage();
        const testIds = checkIDsFood();
        const shopingCard = document.createElement("div");
        const contentFood = document.createElement("div");
        const containerImage = document.createElement("div");
        const imageFoodShoping = document.createElement("img");
        const containerFoodName = document.createElement("div");
        const nameFoodCard = document.createElement("div");
        let hedingNameFood = document.createElement("h3");
        const containerFoodPrice = document.createElement("div");
        const headingPriceFood = document.createElement("h3");
        const containerDelete = document.createElement("div");
        const spanDelete = document.createElement("span");
        const iteamDelete = document.createElement("i");
        const spanmins = document.createElement("span");
        const iteammins = document.createElement("i");
        const numberFood = document.createElement("p");
        numberFood.classList.add("number_food");
        containerDelete.appendChild(spanDelete);

        spanmins.classList.add("del-food");
        shopingCard.classList.add("shoping_card_food");
        contentFood.classList.add("container_card_food");
        containerImage.classList.add("img-card_container_food");
        imageFoodShoping.classList.add("img-card");
        containerFoodName.classList.add("container_content_food");
        nameFoodCard.classList.add("name-food_card");
        iteammins.classList.add("fa-solid", "fa-plus");
        spanmins.appendChild(iteammins);
        containerDelete.appendChild(numberFood);
        containerFoodPrice.classList.add("name-food_price");
        headingPriceFood.classList.add("price-card");
        containerDelete.classList.add("container-delete_iteam");
        spanDelete.classList.add("del-food");
        iteamDelete.classList.add("fa-solid", "fa-minus");
        containerDelete.appendChild(spanmins);
        spanDelete.appendChild(iteamDelete);
        const priceFood =
            e.target.parentElement.parentElement.children[0].innerText;
        let idFood = e.target.parentElement.parentElement.children[0];
        idFood = idFood.getAttribute("id");

        hedingNameFood.setAttribute("id", idFood);
        let imageFood = e.target.parentElement.parentElement.children[1];
        const nameFood = e.target.parentElement.parentElement.children[2].innerText;
        imageFood = imageFood.getAttribute("src");
        let nameImageOrginal = imageFood;
        nameImageOrginal = nameImageOrginal.slice(0, 10);
        imageFood = imageFood.slice(9, -4);
        imageFoodShoping.setAttribute(
            "src",
            `${nameImageOrginal}-${imageFood}.jpg`
        );
        hedingNameFood.textContent = nameFood;
        headingPriceFood.textContent = priceFood;

        let arrayFood = JSON.parse(localStorage.getItem("myFoods"));

        if (myFoods.length === 0) {
            myFoods.push({
                id: idFood,
                name: nameFood,
                price: priceFood,
                imgSource: `${nameImageOrginal}-${imageFood}.jpg`,
                numberFood: 1,
            });
            testIds.push(idFood);

            //add price firstValue
            let total = totalPrice();

            let newtotal = myFoods[0].price;

            newtotal = newtotal.split(" ");

            newtotal = newtotal.map((iteam) =>
                Number(iteam * Number(myFoods[0].numberFood))
            );

            newtotal.splice(1, 1);

            total.push({
                idNew: myFoods[0].id,
                price: newtotal[0],
                countFood: myFoods[0].numberFood,
            });

            //add price firstValue

            localStorage.setItem("myFoods", JSON.stringify(myFoods));
            localStorage.setItem("idFoods", JSON.stringify(testIds));
            localStorage.setItem("totalPrice", JSON.stringify(total));

            containerShoping.appendChild(shopingCard);
            containerShoping.appendChild(contentFood);
            contentFood.appendChild(containerImage);
            containerImage.appendChild(imageFoodShoping);
            contentFood.appendChild(containerFoodName);
            containerFoodName.appendChild(nameFoodCard);
            nameFoodCard.appendChild(hedingNameFood);
            contentFood.appendChild(containerDelete);
            containerFoodName.appendChild(containerFoodPrice);
            containerFoodPrice.appendChild(headingPriceFood);
            counterFoodPopular();
            loadCountFood();

            totalValues.textContent = newtotal[0] + " " + "هزار تومان";
        } else if (!arryIds.includes(idFood)) {
            myFoods.push({
                id: idFood,
                name: nameFood,
                price: priceFood,
                imgSource: `${nameImageOrginal}-${imageFood}.jpg`,
                numberFood: 1,
            });
            testIds.push(idFood);
            const indexId = testIds.indexOf(idFood);

            console.log(indexId);

            localStorage.setItem("myFoods", JSON.stringify(myFoods));
            localStorage.setItem("idFoods", JSON.stringify(testIds));

            //---------add price firstValue----------
            total = totalPrice();
            let newtotal = myFoods[indexId].price;

            newtotal = newtotal.split(" ");

            newtotal = newtotal.map((iteam) =>
                Number(iteam * Number(myFoods[indexId].numberFood))
            );

            newtotal.splice(1, 1);

            total.push({
                idNew: myFoods[indexId].id,
                price: newtotal[0],
                countFood: myFoods[indexId].numberFood,
            });

            localStorage.setItem("totalPrice", JSON.stringify(total));

            const priceAll = JSON.parse(localStorage.getItem("totalPrice"));

            console.log(priceAll);

            priceAll.forEach((element) => {
                console.log(element.price);

                num = num + element.price * element.countFood;
            });

            totalValues.textContent = num + " " + "هزار تومان";

            num = 0;

            //----------add price firstValue---------

            containerShoping.appendChild(shopingCard);
            containerShoping.appendChild(contentFood);
            contentFood.appendChild(containerImage);
            containerImage.appendChild(imageFoodShoping);
            contentFood.appendChild(containerFoodName);
            containerFoodName.appendChild(nameFoodCard);
            nameFoodCard.appendChild(hedingNameFood);
            contentFood.appendChild(containerDelete);
            containerFoodName.appendChild(containerFoodPrice);
            containerFoodPrice.appendChild(headingPriceFood);
            spanmins.classList.add("del-food");
            shopingCard.classList.add("shoping_card_food");
            contentFood.classList.add("container_card_food");
            containerImage.classList.add("img-card_container_food");
            imageFoodShoping.classList.add("img-card");
            containerFoodName.classList.add("container_content_food");
            nameFoodCard.classList.add("name-food_card");
            iteammins.classList.add("fa-solid", "fa-plus");
            spanmins.appendChild(iteammins);
            containerDelete.appendChild(numberFood);
            containerFoodPrice.classList.add("name-food_price");
            headingPriceFood.classList.add("price-card");
            containerDelete.classList.add("container-delete_iteam");
            spanDelete.classList.add("del-food");
            iteamDelete.classList.add("fa-solid", "fa-minus");
            containerDelete.appendChild(spanmins);
            spanDelete.appendChild(iteamDelete);
            counterFoodPopular();
            loadCountFood();
        } else {
            const newNumber = addCounterFood(idFood);

            numberFood.textContent = newNumber;

            e.target.parentElement.children[2].children[1].textContent =
                numberFood.textContent;
        }
    }
}

//check localStorage add food
function checkLocalStorage() {
    let myFoods = [];

    if (localStorage.getItem("myFoods") === null) {
        return myFoods;
    } else {
        return JSON.parse(localStorage.getItem("myFoods"));
    }
}

//check id foods
function checkIDsFood() {
    let idFoods = [];

    if (localStorage.getItem("idFoods") === null) {
        return idFoods;
    } else {
        return JSON.parse(localStorage.getItem("idFoods"));
    }
}

//check  totalrice foods
function totalPrice() {
    let total = [];

    if (localStorage.getItem("totalPrice") === null) {
        return total;
    } else {
        return JSON.parse(localStorage.getItem("totalPrice"));
    }
}

//Load my food in shopping cart

function loadMyFood() {
    let arrayFood = JSON.parse(localStorage.getItem("myFoods"));
    const containerShoping = document.querySelector(
        ".cinatiner-main-ShopingCard"
    );

    if (arrayFood !== null) {
        arrayFood.forEach((element) => {
            const shopingCard = document.createElement("div");
            const contentFood = document.createElement("div");
            const containerImage = document.createElement("div");
            const imageFoodShoping = document.createElement("img");
            const containerFoodName = document.createElement("div");
            const nameFoodCard = document.createElement("div");
            let hedingNameFood = document.createElement("h3");
            const containerFoodPrice = document.createElement("div");
            const headingPriceFood = document.createElement("h3");
            const containerDelete = document.createElement("div");
            const spanDelete = document.createElement("span");
            const iteamDelete = document.createElement("i");
            const spanmins = document.createElement("span");
            const iteammins = document.createElement("i");
            const iteamPlus = document.createElement("i");
            const numberFood = document.createElement("p");
            const spanPlus = document.createElement("span");
            const iteamnew = document.createElement("i");
            numberFood.classList.add("number_food");
            iteamnew.classList.add("fa-solid", "fa-minus");

            spanmins.classList.add("del-food");
            spanPlus.classList.add("del-food");
            shopingCard.classList.add("shoping_card_food");
            contentFood.classList.add("container_card_food");
            containerImage.classList.add("img-card_container_food");
            imageFoodShoping.classList.add("img-card");
            containerFoodName.classList.add("container_content_food");
            nameFoodCard.classList.add("name-food_card");
            iteammins.classList.add("fa-solid", "fa-plus");
            containerFoodPrice.classList.add("name-food_price");
            headingPriceFood.classList.add("price-card");
            containerDelete.classList.add("container-delete_iteam");
            spanDelete.classList.add("del-food");
            iteammins.classList.add("fa-solid", "fa-minus");
            iteamPlus.classList.add("fa-solid", "fa-plus");
            spanPlus.appendChild(iteammins);
            spanmins.appendChild(iteamnew);

            containerShoping.appendChild(shopingCard);
            containerShoping.appendChild(contentFood);
            contentFood.appendChild(containerImage);
            containerImage.appendChild(imageFoodShoping);
            contentFood.appendChild(containerFoodName);
            containerFoodName.appendChild(nameFoodCard);
            nameFoodCard.appendChild(hedingNameFood);
            contentFood.appendChild(containerDelete);
            containerFoodName.appendChild(containerFoodPrice);
            containerFoodPrice.appendChild(headingPriceFood);

            containerDelete.appendChild(spanmins);

            containerDelete.appendChild(numberFood);
            containerDelete.appendChild(spanPlus);

            imageFoodShoping.setAttribute("src", element.imgSource);
            hedingNameFood.textContent = element.name;
            headingPriceFood.textContent = element.price;
            numberFood.textContent = element.numberFood;
            counterFoodPopular();

            //load prices all -------------------------------
            const priceAll = JSON.parse(localStorage.getItem("totalPrice"));

            let num = 0;

            priceAll.forEach((element) => {
                num = num + element.price * element.countFood;
            });

            totalValues.textContent = num + " " + "هزار تومان";

            num = 0;
        });

        //load prices all -------------------------------
    }
    loadCountFood();
}

//load counter food popular
function counterFoodPopular(e) {
    const idFood = JSON.parse(localStorage.getItem("idFoods"));
    const myFoods = JSON.parse(localStorage.getItem("myFoods"));

    const allBox = document.querySelectorAll(".box-popular-food");

    if (idFood !== null) {
        allBox.forEach((element) => {
            const id = element.children[0].getAttribute("id");

            if (idFood.includes(id)) {
                element.children[4].children[1].classList.add("display");
                element.children[4].children[2].classList.remove("display_btn_new");

                const foodfound = myFoods.find((element) => element.id === id);
                element.children[4].children[2].children[1].textContent =
                    foodfound.numberFood;
            } else {
                element.children[4].children[1].classList.remove("display");
                element.children[4].children[2].classList.add("display_btn_new");
            }
        });
    } else {
        allBox.forEach((element) => {
            element.children[4].children[1].classList.remove("display");
        });
    }
}

//add number counter foods

function addCounterFood(idNumber) {
    let tempPrice;
    const foodsId = JSON.parse(localStorage.getItem("idFoods"));

    const myFoods = JSON.parse(localStorage.getItem("myFoods"));

    const myTotal = JSON.parse(localStorage.getItem("totalPrice"));

    let newNumFood;

    if (foodsId.includes(idNumber)) {
        const foundFood = myFoods.find((element) => element.id === idNumber);

        const foodCountCurrnt = foundFood.numberFood;

        myFoods.forEach((element) => {
            if (element.id === idNumber) {
                element.numberFood = foodCountCurrnt + Number(1);
                newNumFood = element.numberFood;
            }
        });

        //add count food in total---------------
        myTotal.forEach((element) => {
            if (element.idNew === idNumber) {
                element.countFood = newNumFood;
            }
        });

        //add count food in total---------------

        localStorage.setItem("myFoods", JSON.stringify(myFoods));
        localStorage.setItem("totalPrice", JSON.stringify(myTotal));

        return newNumFood;
    } else {
        return 1;
    }
}

//function update shoping Card()
function updateShopingCard() {

    openShopingCar = true;
    const containerCardFood = document.querySelectorAll(".container_card_food");

    const myFoods = JSON.parse(localStorage.getItem("myFoods"));

    const containerShoping = document.querySelector(
        ".cinatiner-main-ShopingCard"
    );

    if (myFoods !== null && myFoods.length !== 0) {
        console.log(myFoods);
        containerEmpty.classList.add("display");

        containerCardFood.forEach((element) => {
            element.remove();
        });

        let total = totalPrice();

        let num = 0;
        total.forEach((element) => {

            num = num + element.price * element.countFood;
        });

        totalValues.textContent = num + " " + "هزار تومان";

        num = 0;
        //total calculate

        myFoods.forEach((element) => {
            const shopingCard = document.createElement("div");
            const contentFood = document.createElement("div");
            const containerImage = document.createElement("div");
            const imageFoodShoping = document.createElement("img");
            const containerFoodName = document.createElement("div");
            const nameFoodCard = document.createElement("div");
            let hedingNameFood = document.createElement("h3");
            const containerFoodPrice = document.createElement("div");
            const headingPriceFood = document.createElement("h3");
            const containerDelete = document.createElement("div");
            const spanDelete = document.createElement("span");
            const iteamDelete = document.createElement("i");
            const spanmins = document.createElement("span");
            const iteammins = document.createElement("i");
            const iteamPlus = document.createElement("i");
            const numberFood = document.createElement("p");
            const spanPlus = document.createElement("span");
            const iteamnew = document.createElement("i");
            numberFood.classList.add("number_food");
            iteamnew.classList.add("fa-solid", "fa-minus");

            spanmins.classList.add("del-food");
            spanPlus.classList.add("del-food");
            shopingCard.classList.add("shoping_card_food");
            contentFood.classList.add("container_card_food");
            containerImage.classList.add("img-card_container_food");
            imageFoodShoping.classList.add("img-card");
            containerFoodName.classList.add("container_content_food");
            nameFoodCard.classList.add("name-food_card");
            iteammins.classList.add("fa-solid", "fa-plus");
            containerFoodPrice.classList.add("name-food_price");
            headingPriceFood.classList.add("price-card");
            containerDelete.classList.add("container-delete_iteam");
            spanDelete.classList.add("del-food");
            iteammins.classList.add("fa-solid", "fa-minus");
            iteamPlus.classList.add("fa-solid", "fa-plus");
            spanPlus.appendChild(iteammins);
            spanmins.appendChild(iteamnew);

            containerShoping.appendChild(shopingCard);
            containerShoping.appendChild(contentFood);
            contentFood.appendChild(containerImage);
            containerImage.appendChild(imageFoodShoping);
            contentFood.appendChild(containerFoodName);
            containerFoodName.appendChild(nameFoodCard);
            nameFoodCard.appendChild(hedingNameFood);
            contentFood.appendChild(containerDelete);
            containerFoodName.appendChild(containerFoodPrice);
            containerFoodPrice.appendChild(headingPriceFood);

            containerDelete.appendChild(spanmins);

            containerDelete.appendChild(numberFood);
            containerDelete.appendChild(spanPlus);

            imageFoodShoping.setAttribute("src", element.imgSource);
            hedingNameFood.textContent = element.name;
            headingPriceFood.textContent = element.price;
            numberFood.textContent = element.numberFood;
            counterFoodPopular();
        });
    } else if (
        JSON.parse(localStorage.getItem("myFoods") === null) ||
        myFoods.length === 0
    ) {
        const containerCardFood = document.querySelectorAll(".container_card_food");

        containerCardFood.forEach((element) => {
            element.remove();
        });

        console.log(containerEmpty);

        containerEmpty.classList.remove("display");
    }
}
//function addPlusmins popular food
function plusAddFood(e) {

    let num = 0;
    if (e.target.classList.contains("test-plus")) {

        const newNum = e.target.parentElement.parentElement.children[1].textContent;

        const valueId =
            e.target.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute(
                "id"
            );

        const myFoods = JSON.parse(localStorage.getItem("myFoods"));

        const findFood = myFoods.find((element) => element.id === valueId);

        findFood.numberFood = Number(newNum) + 1;

        //total calculate
        let total = totalPrice();

        console.log(total);

        const curentToral = total.find((element) => element.idNew === valueId);

        curentToral.countFood = findFood.numberFood;

        console.log(curentToral);

        localStorage.setItem("totalPrice", JSON.stringify(total));

        total.forEach((element) => {
            console.log(element.price);

            num = num + element.price * element.countFood;
        });

        totalValues.textContent = num + " " + "هزار تومان";

        num = 0;
        //total calculate

        e.target.parentElement.parentElement.children[1].textContent =
            findFood.numberFood;

        localStorage.setItem("myFoods", JSON.stringify(myFoods));
    } else if (e.target.classList.contains("test-mins")) {
        const newNum = e.target.parentElement.parentElement.children[1].textContent;

        const valueId =
            e.target.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute(
                "id"
            );

        const myFoods = JSON.parse(localStorage.getItem("myFoods"));

        const findFood = myFoods.find((element) => element.id === valueId);

        findFood.numberFood = Number(newNum) - 1;

        //total calculate
        let total = totalPrice();

        const curentToral = total.find((element) => element.idNew === valueId);

        curentToral.countFood = findFood.numberFood;

        console.log(curentToral);

        localStorage.setItem("totalPrice", JSON.stringify(total));

        total.forEach((element) => {
            console.log(element.price);

            num = num + element.price * element.countFood;
        });

        totalValues.textContent = num + " " + "هزار تومان";

        num = 0;
        //total calculate

        if (findFood.numberFood === 0) {
            const myFoods = JSON.parse(localStorage.getItem("myFoods"));

            const valueId =
                e.target.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute(
                    "id"
                );

            //--------total calculate------------
            let total = totalPrice();

            for (let i = 0; i < total.length; i++) {
                if (total[i].idNew === valueId) {
                    total.splice(i, 1);
                }
            }

            localStorage.setItem("totalPrice", JSON.stringify(total));

            total.forEach((element) => {
                console.log(element.price);

                num = num + element.price * element.countFood;
            });

            totalValues.textContent = num + " " + "هزار تومان";

            num = 0;
            //--------total calculate------------

            myFoods.forEach((element, index) => {
                if (element.id === valueId) {
                    myFoods.splice(index, 1);

                    console.log(e.target.parentElement.parentElement.parentElement);

                    e.target.parentElement.parentElement.parentElement.children[2].classList.add(
                        "display_btn_new"
                    );

                    e.target.parentElement.parentElement.parentElement.children[1].classList.remove(
                        "display"
                    );
                }
            });

            const idFood = JSON.parse(localStorage.getItem("idFoods"));

            const indexIteam = idFood.indexOf(valueId);

            idFood.splice(indexIteam, 1);

            localStorage.setItem("myFoods", JSON.stringify(myFoods));

            localStorage.setItem("idFoods", JSON.stringify(idFood));
            loadCountFood();
        } else {
            e.target.parentElement.parentElement.children[1].textContent =
                findFood.numberFood;

            localStorage.setItem("myFoods", JSON.stringify(myFoods));
        }
    }
}

//add or mins food in shooping card
function addFoodMinsFood(e) {
    let num = 0;
    if (
        e.target.classList.contains("fa-minus") &&
        !e.target.classList.contains("fa-plus")
    ) {
        const numberFoodCnter =
            e.target.parentElement.parentElement.children[1].textContent;

        const nameFood =
            e.target.parentElement.parentElement.parentElement.children[1].children[0]
            .children[0].textContent;

        const myFoods = JSON.parse(localStorage.getItem("myFoods"));

        const findFood = myFoods.find((element) => element.name === nameFood);

        findFood.numberFood = Number(numberFoodCnter) - 1;

        const id = findFood.id;
        //-------------total price-------------

        let total = totalPrice();

        const curentToral = total.find((element) => element.idNew === id);

        curentToral.countFood = findFood.numberFood;

        console.log(curentToral);

        localStorage.setItem("totalPrice", JSON.stringify(total));

        total.forEach((element) => {
            console.log(element.price);

            num = num + element.price * element.countFood;
        });

        totalValues.textContent = num + " " + "هزار تومان";

        num = 0;

        //-------------total price-------------

        if (findFood.numberFood === 0) {
            myFoods.forEach((element, index) => {
                if (element.name === nameFood) {
                    myFoods.splice(index, 1);
                    e.target.parentElement.parentElement.parentElement.remove();
                }
            });
            const idFood = JSON.parse(localStorage.getItem("idFoods"));

            const indexIteam = idFood.indexOf(id);

            allBox.forEach((element) => {
                if (element.children[0].getAttribute("id") === id) {
                    element.children[4].children[2].classList.add("display_btn_new");
                    element.children[4].children[1].classList.remove("display");
                }
            });

            if (myFoods.length === 0) {
                containerEmpty.classList.remove("display");
            }

            idFood.splice(indexIteam, 1);

            //--------total calculate------------
            let total = totalPrice();

            for (let i = 0; i < total.length; i++) {
                if (total[i].idNew === id) {
                    total.splice(i, 1);
                }
            }

            localStorage.setItem("totalPrice", JSON.stringify(total));

            total.forEach((element) => {
                console.log(element.price);

                num = num + element.price * element.countFood;
            });

            totalValues.textContent = num + " " + "هزار تومان";

            num = 0;
            //--------total calculate----------------------

            localStorage.setItem("myFoods", JSON.stringify(myFoods));

            localStorage.setItem("idFoods", JSON.stringify(idFood));
            loadCountFood();
        } else {
            let numberNewFood;

            myFoods.forEach((elemnet) => {
                if (elemnet.name === nameFood) {
                    elemnet.numberFood = findFood.numberFood;

                    numberNewFood = elemnet.numberFood;
                }
            });

            e.target.parentElement.parentElement.children[1].textContent =
                numberNewFood;

            localStorage.setItem("myFoods", JSON.stringify(myFoods));

            allBox.forEach((element) => {
                if (element.children[2].innerText === nameFood) {
                    let newNumber =
                        e.target.parentElement.parentElement.children[1].textContent;

                    const foodFound = myFoods.find(
                        (element) => element.name === nameFood
                    );

                    foodFound.numberFood = newNumber;

                    element.children[4].children[2].children[1].textContent =
                        foodFound.numberFood;
                }
            });
        }
    } else if (
        e.target.classList.contains("fa-minus") &&
        e.target.classList.contains("fa-plus")
    ) {
        const numberFoodCnter =
            e.target.parentElement.parentElement.children[1].textContent;

        const nameFood =
            e.target.parentElement.parentElement.parentElement.children[1].children[0]
            .children[0].textContent;

        const myFoods = JSON.parse(localStorage.getItem("myFoods"));

        const findFood = myFoods.find((element) => element.name === nameFood);

        findFood.numberFood = Number(numberFoodCnter) + 1;

        //total calculate-----------------
        let total = totalPrice();

        let id = findFood.id;

        console.log(total);

        const curentToral = total.find((element) => element.idNew === id);

        curentToral.countFood = findFood.numberFood;

        console.log(curentToral);

        localStorage.setItem("totalPrice", JSON.stringify(total));

        total.forEach((element) => {
            console.log(element.price);

            num = num + element.price * element.countFood;
        });

        totalValues.textContent = num + " " + "هزار تومان";

        num = 0;
        //total calculate-------------------

        let numberNewFood;

        myFoods.forEach((elemnet) => {
            if (elemnet.name === nameFood) {
                elemnet.numberFood = findFood.numberFood;

                numberNewFood = elemnet.numberFood;
            }
        });

        e.target.parentElement.parentElement.children[1].textContent =
            numberNewFood;

        localStorage.setItem("myFoods", JSON.stringify(myFoods));

        allBox.forEach((element) => {
            if (element.children[2].innerText === nameFood) {
                let newNumber =
                    e.target.parentElement.parentElement.children[1].textContent;

                const foodFound = myFoods.find((element) => element.name === nameFood);

                foodFound.numberFood = newNumber;

                element.children[4].children[2].children[1].textContent =
                    foodFound.numberFood;
            }
        });
    }
}

//load count foodOrder project

function loadCountFood() {
    let total = totalPrice();

    let countFoodOrder = total.length;

    numFood.textContent = countFoodOrder;
}

//--=====================Section orderfood Gallery=============================

//variablers------------------------------------------------------
const containerGallery = document.querySelector(".gallery");
const closeBtn = document.getElementById('nav-toggle');
const clearAll = document.querySelector('.btn-order-final')

//Lisner------------------------------------------------------------
containerGallery.addEventListener("click", buyFoodGallery);
document.addEventListener("DOMContentLoaded", loadMyFoodsGallery);
document.addEventListener("DOMContentLoaded", counterFoodGalery);
containerGallery.addEventListener("click", addMinsFoodGallery);
closeBtn.addEventListener('click', loadnfoCountFood);
clearAll.addEventListener('click', emptyShopingCard);




//add food to shoping card and local storage
function buyFoodGallery(e) {
    if (e.target.classList.contains("btn")) {
        //Check if the food array is in Local Storage?

        const myFood = checkLocalStorage();

        //Check if this food with this ID is available in Local Storage or not?
        const testIds = checkIDsFood();

        //Disable the tag property a
        e.preventDefault();

        //create Element shoping card
        const containerShoping = document.querySelector(
            ".cinatiner-main-ShopingCard"
        );
        const shopingCard = document.createElement("div");
        const contentFood = document.createElement("div");
        const containerImage = document.createElement("div");
        const imageFoodShoping = document.createElement("img");
        const containerFoodName = document.createElement("div");
        const nameFoodCard = document.createElement("div");
        let hedingNameFood = document.createElement("h3");
        const containerFoodPrice = document.createElement("div");
        const headingPriceFood = document.createElement("h3");
        const containerDelete = document.createElement("div");
        const spanDelete = document.createElement("span");
        const iteamDelete = document.createElement("i");
        const spanmins = document.createElement("span");
        const iteammins = document.createElement("i");
        const numberFood = document.createElement("p");
        numberFood.classList.add("number_food");
        containerDelete.appendChild(spanDelete);

        spanmins.classList.add("del-food");
        shopingCard.classList.add("shoping_card_food");
        contentFood.classList.add("container_card_food");
        containerImage.classList.add("img-card_container_food");
        imageFoodShoping.classList.add("img-card");
        containerFoodName.classList.add("container_content_food");
        nameFoodCard.classList.add("name-food_card");
        iteammins.classList.add("fa-solid", "fa-plus");
        spanmins.appendChild(iteammins);
        containerDelete.appendChild(numberFood);
        containerFoodPrice.classList.add("name-food_price");
        headingPriceFood.classList.add("price-card");
        containerDelete.classList.add("container-delete_iteam");
        spanDelete.classList.add("del-food");
        iteamDelete.classList.add("fa-solid", "fa-minus");
        containerDelete.appendChild(spanmins);
        spanDelete.appendChild(iteamDelete);
        //create Element shoping card

        //Extract food information
        const priceFood =
            e.target.parentElement.parentElement.parentElement.children[0]
            .textContent;

        const nameFood =
            e.target.parentElement.parentElement.children[0].textContent;

        const idFood =
            e.target.parentElement.parentElement.parentElement.children[0].getAttribute(
                "id"
            );

        let imgSrc =
            e.target.parentElement.parentElement.parentElement.children[1].getAttribute(
                "src"
            );

        imgSrc = imgSrc.slice(0, 11);

        //Attribute food information to shopping cart items

        imageFoodShoping.setAttribute("src", `${imgSrc}-${idFood}.jpg`);

        hedingNameFood.setAttribute("id", idFood);

        headingPriceFood.textContent = priceFood;

        let arryIds = JSON.parse(localStorage.getItem("idFoods"));


        //Check that food is not in the cart when food is first added

        if (myFood.length === 0) {
            //Add the first ordered food to the ordered food array
            myFood.push({
                id: idFood,
                name: nameFood,
                price: priceFood,
                imgSource: `${imgSrc}-${idFood}.jpg`,
                numberFood: 1,
            });

            //Call an array where food numbers are stored
            const idFooods = checkIDsFood();

            //Add the first ordered food ID to the ordered food ID
            idFooods.push(idFood);

            //Calculate the price of the first food ordered in the Local Storage cart in a new array

            let total = totalPrice();

            let newtotal = myFood[0].price;

            newtotal = newtotal.split(" ");

            newtotal = newtotal.map((iteam) =>
                Number(iteam * Number(myFood[0].numberFood))
            );

            newtotal.splice(1, 1);

            total.push({
                idNew: myFood[0].id,
                price: newtotal[0],
                countFood: myFood[0].numberFood,
            });

            //Add food information to the food array and add food IDs and add invoices for each food in Local Storage
            localStorage.setItem("myFoods", JSON.stringify(myFood));
            localStorage.setItem("idFoods", JSON.stringify(idFooods));
            localStorage.setItem("totalPrice", JSON.stringify(total));

            //Add food information to cart
            containerShoping.appendChild(shopingCard);
            containerShoping.appendChild(contentFood);
            contentFood.appendChild(containerImage);
            containerImage.appendChild(imageFoodShoping);
            contentFood.appendChild(containerFoodName);
            containerFoodName.appendChild(nameFoodCard);
            nameFoodCard.appendChild(hedingNameFood);
            contentFood.appendChild(containerDelete);
            containerFoodName.appendChild(containerFoodPrice);
            containerFoodPrice.appendChild(headingPriceFood);

            //The function of changing the button on any food that is in the food calories
            counterFoodGalery();

            //Check the number of foods added
            loadCountFood();

            //Add food prices in the aggregate section of the cart
            totalValues.textContent = newtotal[0] + " " + "هزار تومان";


            //Add food to the Local Storage cart if this food does not exist with this ID
        } else if (!arryIds.includes(idFood)) {

            let num = 0;

            myFood.push({
                id: idFood,
                name: nameFood,
                price: priceFood,
                imgSource: `${imgSrc}-${idFood}.jpg`,
                numberFood: 1,
            });

            //Add a food ID to the iS Food Array in Local Storage

            const idFooods = checkIDsFood();

            idFooods.push(idFood);

            //Extract our current food ID index from food IDs
            const indexId = idFooods.indexOf(idFood);

            //Add food information to Local Storage and add food IDs to a separate list in Local Storage
            localStorage.setItem("myFoods", JSON.stringify(myFood));
            localStorage.setItem("idFoods", JSON.stringify(idFooods));

            //---------add price firstValue----------
            total = totalPrice();
            let newtotal = myFood[indexId].price;

            newtotal = newtotal.split(" ");

            newtotal = newtotal.map((iteam) =>
                Number(iteam * Number(myFood[indexId].numberFood))
            );

            newtotal.splice(1, 1);

            total.push({
                idNew: myFood[indexId].id,
                price: newtotal[0],
                countFood: myFood[indexId].numberFood,
            });

            localStorage.setItem("totalPrice", JSON.stringify(total));

            const priceAll = JSON.parse(localStorage.getItem("totalPrice"));


            priceAll.forEach((element) => {
                console.log(element.price);

                num = num + element.price * element.countFood;
            });

            totalValues.textContent = num + " " + "هزار تومان";

            num = 0;

            //----------add price firstValue---------

            containerShoping.appendChild(shopingCard);
            containerShoping.appendChild(contentFood);
            contentFood.appendChild(containerImage);
            containerImage.appendChild(imageFoodShoping);
            contentFood.appendChild(containerFoodName);
            containerFoodName.appendChild(nameFoodCard);
            nameFoodCard.appendChild(hedingNameFood);
            contentFood.appendChild(containerDelete);
            containerFoodName.appendChild(containerFoodPrice);
            containerFoodPrice.appendChild(headingPriceFood);
            spanmins.classList.add("del-food");
            shopingCard.classList.add("shoping_card_food");
            contentFood.classList.add("container_card_food");
            containerImage.classList.add("img-card_container_food");
            imageFoodShoping.classList.add("img-card");
            containerFoodName.classList.add("container_content_food");
            nameFoodCard.classList.add("name-food_card");
            iteammins.classList.add("fa-solid", "fa-plus");
            spanmins.appendChild(iteammins);
            containerDelete.appendChild(numberFood);
            containerFoodPrice.classList.add("name-food_price");
            headingPriceFood.classList.add("price-card");
            containerDelete.classList.add("container-delete_iteam");
            spanDelete.classList.add("del-food");
            iteamDelete.classList.add("fa-solid", "fa-minus");
            containerDelete.appendChild(spanmins);
            spanDelete.appendChild(iteamDelete);
            counterFoodPopular();
            loadCountFood();
            counterFoodGalery();
        } else {
            const newNumber = addCounterFood(idFood);
            numberFood.textContent = newNumber;
            e.target.parentElement.children[2].children[1].textContent = numberFood.textContent;

            //2
            counterFoodGalery();
        }
    }
}

//Show and hide buttons in food gallery products
function counterFoodGalery(e) {

    const idFood = JSON.parse(localStorage.getItem("idFoods"));
    const myFoods = JSON.parse(localStorage.getItem("myFoods"));


    const boxGalleryFood = document.querySelectorAll('.box-Galley-food');

    if (idFood !== null) {

        boxGalleryFood.forEach((element) => {


            const id = element.children[0].getAttribute("id");


            if (idFood.includes(id)) {


                element.children[2].children[2].children[1].classList.add('display');
                element.children[2].children[2].children[2].classList.remove('display_btn_new');

                const foodfound = myFoods.find((element) => element.id === id);

                element.children[2].children[2].children[2].children[1].textContent = foodfound.numberFood


            } else {
                element.children[2].children[2].children[1].classList.remove('display');
                element.children[2].children[2].children[2].classList.add('display_btn_new');
            }

        })


    } else {

        boxGalleryFood.forEach((element) => {
            element.children[2].children[2].children[1].classList.remove('display');
        })

    }

}


//LoadyFoodsGallery in ShopingCard
function loadMyFoodsGallery() {

    //Read all the food added in Local Storage and return it as an array

    let arrayFood = JSON.parse(localStorage.getItem("myFoods"));

    const containerShoping = document.querySelector(
        ".cinatiner-main-ShopingCard"
    );

    if (arrayFood !== null) {
        arrayFood.forEach((element) => {
            const shopingCard = document.createElement("div");
            const contentFood = document.createElement("div");
            const containerImage = document.createElement("div");
            const imageFoodShoping = document.createElement("img");
            const containerFoodName = document.createElement("div");
            const nameFoodCard = document.createElement("div");
            let hedingNameFood = document.createElement("h3");
            const containerFoodPrice = document.createElement("div");
            const headingPriceFood = document.createElement("h3");
            const containerDelete = document.createElement("div");
            const spanDelete = document.createElement("span");
            const iteamDelete = document.createElement("i");
            const spanmins = document.createElement("span");
            const iteammins = document.createElement("i");
            const iteamPlus = document.createElement("i");
            const numberFood = document.createElement("p");
            const spanPlus = document.createElement("span");
            const iteamnew = document.createElement("i");
            numberFood.classList.add("number_food");
            iteamnew.classList.add("fa-solid", "fa-minus");

            spanmins.classList.add("del-food");
            spanPlus.classList.add("del-food");
            shopingCard.classList.add("shoping_card_food");
            contentFood.classList.add("container_card_food");
            containerImage.classList.add("img-card_container_food");
            imageFoodShoping.classList.add("img-card");
            containerFoodName.classList.add("container_content_food");
            nameFoodCard.classList.add("name-food_card");
            iteammins.classList.add("fa-solid", "fa-plus");
            containerFoodPrice.classList.add("name-food_price");
            headingPriceFood.classList.add("price-card");
            containerDelete.classList.add("container-delete_iteam");
            spanDelete.classList.add("del-food");
            iteammins.classList.add("fa-solid", "fa-minus");
            iteamPlus.classList.add("fa-solid", "fa-plus");
            spanPlus.appendChild(iteammins);
            spanmins.appendChild(iteamnew);

            containerShoping.appendChild(shopingCard);
            containerShoping.appendChild(contentFood);
            contentFood.appendChild(containerImage);
            containerImage.appendChild(imageFoodShoping);
            contentFood.appendChild(containerFoodName);
            containerFoodName.appendChild(nameFoodCard);
            nameFoodCard.appendChild(hedingNameFood);
            contentFood.appendChild(containerDelete);
            containerFoodName.appendChild(containerFoodPrice);
            containerFoodPrice.appendChild(headingPriceFood);

            containerDelete.appendChild(spanmins);

            containerDelete.appendChild(numberFood);
            containerDelete.appendChild(spanPlus);

            imageFoodShoping.setAttribute("src", element.imgSource);
            hedingNameFood.textContent = element.name;
            headingPriceFood.textContent = element.price;
            numberFood.textContent = element.numberFood;
            counterFoodPopular();

            //load prices all -------------------------------
            const priceAll = JSON.parse(localStorage.getItem("totalPrice"));

            let num = 0;

            priceAll.forEach((element) => {
                num = num + element.price * element.countFood;
            });

            totalValues.textContent = num + " " + "هزار تومان";

            num = 0;
        });

        //load prices all -------------------------------

    }
    loadCountFood();

}

//function add mins foods in gallery food
function addMinsFoodGallery(e) {

    let num = 0;

    e.preventDefault();


    if (e.target.classList.contains("test-plus")) {

        const newNum = e.target.parentElement.parentElement.children[1].textContent;
        const idValue = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('id');
        console.log(idValue);

        const myFoods = JSON.parse(localStorage.getItem("myFoods"));

        const findFood = myFoods.find((element) => element.id === idValue);

        findFood.numberFood = Number(newNum) + 1;

        //total calculate
        let total = totalPrice();


        const curentToral = total.find((element) => element.idNew === idValue);

        curentToral.countFood = findFood.numberFood;


        localStorage.setItem("totalPrice", JSON.stringify(total));

        total.forEach((element) => {

            num = num + element.price * element.countFood;
        });

        totalValues.textContent = num + " " + "هزار تومان";

        num = 0;
        //total calculate
        e.target.parentElement.parentElement.children[1].textContent = findFood.numberFood;
        localStorage.setItem("myFoods", JSON.stringify(myFoods));
    } else if (e.target.classList.contains("test-mins")) {

        const newNum = e.target.parentElement.parentElement.children[1].textContent;
        const idValue = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('id');

        const myFoods = JSON.parse(localStorage.getItem("myFoods"));

        const findFood = myFoods.find((element) => element.id === idValue);

        findFood.numberFood = Number(newNum) - 1;

        //total calculate
        let total = totalPrice();

        const curentToral = total.find((element) => element.idNew === idValue);

        curentToral.countFood = findFood.numberFood;


        localStorage.setItem("totalPrice", JSON.stringify(total));

        total.forEach((element) => {

            num = num + element.price * element.countFood;
        });

        totalValues.textContent = num + " " + "هزار تومان";

        num = 0;
        //total calculate

        if (findFood.numberFood === 0) {

            const myFoods = JSON.parse(localStorage.getItem("myFoods"));
            const idValue = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('id');

            //--------total calculate------------
            let total = totalPrice();

            for (let i = 0; i < total.length; i++) {
                if (total[i].idNew === idValue) {
                    total.splice(i, 1);
                }
            }

            localStorage.setItem("totalPrice", JSON.stringify(total));

            total.forEach((element) => {
                console.log(element.price);

                num = num + element.price * element.countFood;
            });

            totalValues.textContent = num + " " + "هزار تومان";

            num = 0;
            //--------total calculate------------

            myFoods.forEach((element, index) => {
                if (element.id === idValue) {
                    myFoods.splice(index, 1);
                }
            });

            e.target.parentElement.parentElement.parentElement.children[1].classList.remove('display');
            e.target.parentElement.parentElement.parentElement.children[2].classList.add('display_btn_new')


            const idFood = JSON.parse(localStorage.getItem("idFoods"));

            const indexIteam = idFood.indexOf(idValue);

            idFood.splice(indexIteam, 1);

            localStorage.setItem("myFoods", JSON.stringify(myFoods));

            localStorage.setItem("idFoods", JSON.stringify(idFood));
            loadCountFood();

        } else {

            e.target.parentElement.parentElement.children[1].textContent = findFood.numberFood;

            localStorage.setItem("myFoods", JSON.stringify(myFoods));

        }


    }

}

//loadnfoCountFood
function loadnfoCountFood() {

    openShopingCar = false;

    const myFoods = JSON.parse(localStorage.getItem("myFoods"));

    const GalleryFood = document.querySelectorAll('.box-Galley-food');


    GalleryFood.forEach((element) => {


        const idGallery = element.children[0].getAttribute('id');

        let coutNumber = element.children[2].children[2].children[2].children[1];

        console.log(idGallery);

        if (myFoods !== null || JSON.parse(localStorage.getItem("myFoods") !== null)) {

            myFoods.forEach((element) => {

                if (element.id === idGallery) {

                    coutNumber.textContent = element.numberFood
                }
            })

        } else {

            element.children[2].children[2].children[2].classList.add('display_btn_new');
            element.children[2].children[2].children[1].classList.remove('display');
        }


    })

}

//clear all food in shoping card
function emptyShopingCard() {


    const popularContainer = document.querySelectorAll('.box-popular-food')
    localStorage.clear('myFoods');
    localStorage.clear('idFoods');
    localStorage.clear('totalPrice');

    updateShopingCard();
    loadnfoCountFood();
    loadCountFood();


    popularContainer.forEach((element) => {

        console.log(element.children[4].children[1]);
        element.children[4].children[1].classList.remove('display');
        element.children[4].children[2].classList.add('display_btn_new')
    })

}