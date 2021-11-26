const main = document.querySelector('main');
const homeSection = document.createElement('div');
homeSection.classList.add('home-section');
const shopSection = document.createElement('div')
shopSection.classList.add('shop-section');
const productSection = document.createElement('div')
productSection.classList.add('product-info-section');
main.append(homeSection);

// shopping card state===================================
let shopping_basketState = {
    selectedItems: [],
    filter:{
        collection: [],
        color: {
            'Pink': false,
            'Blue': false,
            'White': false,
            'Green': false,
            'Beige': false,
            'Black': false,
            'Brown': false,
            'Yellow': false,
            'Grey': false,
            'Lavender': false
        },
        category: []
    }
};

// update state=========================================
const updateState = (newState) => {
    shopping_basketState = {...shopping_basketState, ...newState};
    console.log(shopping_basketState);
}

// product info ====================================
const productInfos = {
    text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus sed facilis ullam, a alias voluptas similique nesciunt qui vel?voluptas similique nesciunt laboriosam natus aliquid nam blanditiis esse autem omnis incidunt voluptate? Dicta, qui vel?',
    size: [
        'Dimensions: W: 207 cm D:56 cm H:221 cm',
        'Seat Dimensions: W: 184 cm D:134 cm H:175 cm',
        'Weight: 5 kg',
        'Materials: Metal, Steel',
        'Filling materials: Concrete, Frozen, Fresh, Steel',
        'Comfort level: Medium'
    ]
}

// filtere items==================================
const filterItems = {
    collection: ['Spring-Summer', 'Autumn-Winter'],
    color: ['Pink', 'Blue', 'White', 'Green', 'Beige', 'Black', 'Brown', 'Yellow', 'Grey','Lavender'],
    category: ['Chair', 'Table', 'Bed','Lamp','Sofa'],
}

// server=========================================
const serverURL = 'http://localhost:3000/';
const productsURL = serverURL + 'products/';

// create hero section============================
const heroSectionFn = () => {
    const heroSection = document.createElement('section');
    heroSection.classList.add('hero-section');
    homeSection.append(heroSection);
    const heroText = document.createElement('div');
    heroText.classList.add('hero-section__text');
    const heroContainer = document.createElement('div');
    heroContainer.classList.add('hero-container');
    heroText.append(heroContainer);
    const heroTitle = document.createElement('h1');
    heroTitle.innerText = 'The unique furniture for your special house';
    heroTitle.classList.add('hero-section__text--title');
    const heroBtn = document.createElement('button');
    heroBtn.innerText = 'Shop Now';
    heroBtn.classList.add('hero-section__text--btn');
    heroContainer.append(heroTitle, heroBtn)
    const heroImage = document.createElement('div');
    heroImage.classList.add('hero-section__img');
    const heroImg = document.createElement('img');
    heroImg.src = './src/assets/images/chair1.jpg';
    heroImg.setAttribute('alt', 'chair image');
    heroImage.append(heroImg);
    heroSection.append(heroText, heroImage);
}

// create random class============================
const randomFn = () => {
    const starClass = Math.floor(Math.random()*2)+1;
    return starClass === 1 ? 'fas fa-star-half-alt' : 'fas fa-star';
}

// create Hero Image =============================
const createHeroImageSection = (filteredArr,featureContainer) => {
    featureContainer.innerHTML = filteredArr.map(el => {
        return`
        <div class="features-item">
            <img src="${el.img}" alt="${el.title}">
            <div class="sub-img">
                <p class="sub-img__title">${el.title}</p>
                <div class="sub-img__star">
                    <div class="stars">
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="${randomFn()}"></i></span>
                    </div>
                    <p>£${el.price}</p>
                </div>
                <button class="sub-img__btn">More Details</button>
            </div>
        </div>
        `;
            
    }).join('');
}

// fetch images for feature section=======================
const fetchFeatureImages = async (featureContainer) => {
    try{
        const res = await fetch(`${productsURL}`);
        const data = await res.json();
        const filteredArr = data.filter(el => el.feature === true);
        createHeroImageSection(filteredArr,featureContainer)
    }
    catch(e){
        console.log('something went wrong', e);
    }
}

// create feature section================================
const featuresSectionFn = () => {
    const featureSection = document.createElement('section');
    featureSection.classList.add('features-section');
    const h2El = document.createElement('h2');
    h2El.innerText = 'Best selling furniture';
    const featureContainer = document.createElement('div');
    featureContainer.classList.add('features-container');
    featureSection.append(h2El, featureContainer);
    homeSection.append(featureSection);
    fetchFeatureImages(featureContainer);
}

// listen to shop btn=====================================
const listenToShopBtn = () => {
    const shopBtn = document.querySelector('.hero-section__text--btn');
    shopBtn.addEventListener('click', ()=>{
        shopPageFn();
    });
}

// listen to Logo =======================================
const listenToShopBtnNavbar = () => {
    const shopBtnNavbar = document.querySelector('#shopBtn');
    shopBtnNavbar.addEventListener('click', ()=>{
        shopPageFn();
    });
}

// back to home function=================================
const backToHomeFn = () => {
    const navbarLogo = document.querySelector('.navbar__logo');
    const home = document.querySelector('.home-page');

    navbarLogo.addEventListener('click',() =>{
        main.innerHTML = '';
        main.append(homeSection);
    });

    home.addEventListener('click',() =>{
        main.innerHTML = '';
        main.append(homeSection);
    })
}

// init app=======================================
const init = () => {
    heroSectionFn();
    featuresSectionFn();
    listenToShopBtn();
    listenToShopBtnNavbar();
    backToHomeFn();
}
init();


// shop page functions==============================
const shopPageFn = () => {
    main.innerHTML = '';
    shopSection.innerHTML = '';
    main.append(shopSection);
    SearchSectionFn();
    filterSectionFn();
}

// create search shop section=========================
const SearchSectionFn = () => {
    const searchContainer = document.createElement('section');
    searchContainer.classList.add('search-container');
    shopSection.append(searchContainer);
    const search = document.createElement('div');
    search.classList.add('search');
    searchContainer.append(search);
    const searchInput = document.createElement('input');
    searchInput.classList.add('search__input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'search');
    const searchSort = document.createElement('div');
    searchSort.classList.add('search__sort');
    search.append(searchInput,searchSort);
    const sortBtn = document.createElement('button');
    sortBtn.classList.add('search__sort--btn');
    sortBtn.innerText = 'Sort By';
    searchSort.append(sortBtn);
}

// create filter section============================
const filterSectionFn = () => {
    const container = document.createElement('section');
    container.classList.add('container');
    shopSection.append(container);
    const filterContainer = document.createElement('div');
    filterContainer.classList.add('filter-container');
    container.append(filterContainer);
    const h2El = document.createElement('h2');
    h2El.innerText = 'Filtered by';
    const form = document.createElement('form');
    form.classList.add('filter__collection');
    filterContainer.append(h2El,form);
    filteredFormSectionFn(form);
    filterPriceSection(form);
    createProductSection(container);
}

// create form filter section========================
const filteredFormSectionFn = (form) => {
    form.innerHTML = Object.keys(filterItems).map(key => {
        return `<div class="${key}__menu">
            <span>${key}</span>
            <span class="icon-${key}"><i class="fas fa-chevron-down"></i></span>
        </div>
        `
    }).join('');
}

// create price filter section==========================
const filterPriceSection = (form) => {
    const priceMenu = document.createElement('div');
    priceMenu.classList.add('price__menu');
    const priceName = document.createElement('span');
    priceName.classList.add('price-name');
    priceName.innerText = 'Price Range';
    priceMenu.appendChild(priceName);
    const priceList = document.createElement('div');
    priceList.classList.add('price__list');
    const rangeContainer = document.createElement('div');
    rangeContainer.classList.add('range-container');
    rangeContainer.innerHTML = `
        <input type="range" id="min-price" name="min-price" value="0" min="0" max="1000" step="1">
        <input type="range" id="max-price" name="max-price" value="1000" min="0" max="1000" step="1">
    `
    const priceText = document.createElement('div');
    priceText.classList.add('price-text');
    priceList.append(rangeContainer,priceText);
    priceText.innerHTML = `
        <div class="min-text">
            <span>£</span>
            <input type="number" value="0" min="0" max="1000">
        </div>
        <div class="max-text">
            <span>£</span>
            <input type="number" value="1000" min="0" max="1000">
        </div>
    `
    const searchFilterBtn = document.createElement('input');
    searchFilterBtn.classList.add('search__filterBtn');
    searchFilterBtn.setAttribute('type', 'submit');
    searchFilterBtn.setAttribute('value', 'search');
    form.append(priceMenu,priceList);
    filterSearchFom(form);
}

const filterSearchFom = (form) => {
    const filterButton = document.createElement('button');
    filterButton.innerText = 'Search';
    filterButton.setAttribute('type', 'submit');
    filterButton.classList.add('search-btn');
    form.append(filterButton);
    listenToClickFilterFn();
}

// create product section==============================
const createProductSection = (container) => {
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');
    container.append(productContainer);
    fetchProducts(productContainer);
}

// create random product for product section=================
const randomFnForProducts = (num) => {
    let numIndex = []
    while(numIndex.length < 6){
        const randomNum = Math.floor(Math.random() * num) + 1;
        if(numIndex.indexOf(randomNum) === -1) numIndex.push(randomNum);
    }
    return numIndex;
}

// fetch products from db.json file==========================
const fetchProducts = async (productContainer) => {
    try{
        const res = await fetch(`${productsURL}`);
        const data = await res.json();
        const productArr = randomFnForProducts(42);
        for(let i=0; i<productArr.length; i++){
            const item = productArr[i];
            createProductItem(productContainer, data, item)
        }
    }
    catch(e){
        console.log('something went wrong', e);
    }
}

// create product items html==================================
const createProductItem = (productContainer, data, item) => {
    const eachItem = data.find(el => data.indexOf(el) === item);
    const product = document.createElement('div');
    product.classList.add('product');
    product.innerHTML = `
        <img class="product__img" src="${eachItem.img}" alt="${eachItem.title}">
        <p class="product__name">${eachItem.title}</p>
        <div class="product__stars">
            <div class="stars">
                <span><i class="fas fa-star"></i></span>
                <span><i class="fas fa-star"></i></span>
                <span><i class="fas fa-star"></i></span>
                <span><i class="fas fa-star"></i></span>
                <span><i class="${randomFn()}"></i></span>
            </div>
            <p class="product__price">£${eachItem.price}</p>
        </div>
        <button class="product__btn" dataId="${eachItem.id}">More Details</button>
    `
    productContainer.insertAdjacentElement('beforeend', product);
    const detailBtn = document.querySelector('.product__btn');
    listenToMoreDetailsBtn(detailBtn,eachItem);
}
    

// listen for filter functions=================================
const listenToClickFilterFn = () => {
    listenToClickCollectionIcon();
    listenToClickColorIcon();
    listenToClickCategoryIcon();
}

// listen To Click Collection Icon==========================
const listenToClickCollectionIcon = () => {
    const collectionMenu = document.querySelector('.collection__menu');
    const parent = collectionMenu.parentNode;
    const iconCollection = document.querySelector('.icon-collection');
    const collectionList = document.createElement('ul');
    collectionList.classList.add('collection__list');
    collectionList.innerHTML = filterItems.collection.map(item => {
        return `<li>${item}</li>`
    }).join('');
    parent.insertBefore(collectionList, collectionMenu.nextSibling);
    iconCollection.addEventListener('click', () => {
        collectionList.classList.toggle('show');
        collectionMenu.classList.toggle('removeBorder');
    });
    fetchFilterProducts()
}

// listen To Click Color Icon==============================
const listenToClickColorIcon = () => {
    const colorMenu = document.querySelector('.color__menu');
    const parent = colorMenu.parentNode;
    const iconColor = document.querySelector('.icon-color');
    const colorList = document.createElement('div');
    colorList.classList.add('color__list');
    colorList.innerHTML = filterItems.color.map(item => {
        return `
            <div class="color-group">
                <input type="checkbox" id="${item}">
                <label for="${item}">${item}</label>
            </div>
        `
    }).join('');
    parent.insertBefore(colorList, colorMenu.nextSibling);
    iconColor.addEventListener('click', () => {
        colorList.classList.toggle('show');
        colorMenu.classList.toggle('removeBorder');
    })
}

// listen To Click Category Icon==============================
const listenToClickCategoryIcon = () => {
    const categoryMenu = document.querySelector('.category__menu');
    const parent = categoryMenu.parentNode;
    const iconCategory = document.querySelector('.icon-category');
    const categoryList = document.createElement('div');
    categoryList.classList.add('category__list');
    categoryList.innerHTML = filterItems.category.map(item => {
        return `
            <div class="category-group">
                <input type="checkbox" id="category-${item}">
                <label for="category-${item}">${item}</label>
            </div>
        `
    }).join('');
    parent.insertBefore(categoryList, categoryMenu.nextSibling);
    iconCategory.addEventListener('click', () => {
        categoryList.classList.toggle('show');
        categoryMenu.classList.toggle('removeBorder');
    })
}

// listen to more details button=======================
const listenToMoreDetailsBtn = (detailBtn,eachItem) => {
    detailBtn.addEventListener('click', () => {
        main.innerHTML = '';
        main.append(productSection);
        const btnId = detailBtn.attributes[1].value;
        if(eachItem.id === Number(btnId)){
            createProductInfo(eachItem);
        }
    })
}

// create product info /html==================
const createProductInfo = (eachItem) => {
    productSection.innerHTML = '';
    const productItem = document.createElement('section');
    productItem.classList.add('product-item');
    productSection.append(productItem);
    const productImgContainer = document.createElement('div');
    productImgContainer.classList.add('productImg-container');
    productImgContainer.innerHTML = `
        <img src="${eachItem.img}" alt="${eachItem.title}">
        <div class="small-images">
            <span class="arrow-left"><i class="fas fa-chevron-left"></i></span>
            <img src="./src/assets/images/sofa3.jpg" alt="">
            <img src="./src/assets/images/table3.jpg" alt="">
            <img src="./src/assets/images/sofa1.jpg" alt="">
            <img src="./src/assets/images/table5.jpg" alt="">
            <span class="arrow-right"><i class="fas fa-chevron-right"></i></span>
        </div>
    `
    const productInfoContainer = document.createElement('div');
    productInfoContainer.classList.add('productInfo-container');
    productItem.append(productImgContainer, productInfoContainer);
    createProductInfoText(productInfoContainer,eachItem);
}

// create product info text======================================
const createProductInfoText = (productInfoContainer,eachItem) => {
    productInfoContainer.innerHTML = `
    <h2 class="productInfo-title">${eachItem.title}</h2>
    <h3 class="productInfo-price">£${eachItem.price}</h3>
    <p class="productInfo-text">${productInfos.text}</p>
    `;
    const productInfoSize = document.createElement('ul');
    productInfoSize.classList.add('productInfo-size');
    productInfoSize.innerHTML = productInfos.size.map(el => {
        return `<li>${el}</li>`
    }).join('');
    
    const productInfoColors = document.createElement('div');
    productInfoColors.classList.add('productInfo-colors');
    productInfoColors.innerHTML = filterItems.color.map(el => {
        return `<span class="circle ${el}"></span>`
    }).join('');

    const productInfoSelect = document.createElement('div');
    productInfoSelect.classList.add('productInfo-select');
    productInfoSelect.innerHTML = 
    `
        <input type="number" name="num" id="num" class="num">
        <button class="add-btn" id="${eachItem.id}">Add to basket</button>
    `;
    productInfoContainer.append(productInfoSize, productInfoColors,productInfoSelect);
    
    listenToAddToBasket();
    listenToShopBtnNavbar();
}

// listen to add to basket button============================
const listenToAddToBasket = () => {
    const addBtn = document.querySelector('.add-btn');
    const numInput = document.querySelector('.num');
    
    addBtn.addEventListener('click', () => {
        const quantityValue = Number(numInput.value);
        const itemId = Number(addBtn.id);
        showNumsOnBasket(quantityValue, itemId);
        numInput.value = '';
    })
}

// show nums on basket===================================
const showNumsOnBasket = (quantityValue, itemId) => {
    const basketNum = document.querySelector('.basket-num');
    basketNum.classList.add('show');
    let val = Number(basketNum.innerText);
    basketNum.innerText = `${val += quantityValue}`;
    listenToClickBasket(quantityValue, itemId);
}


let basketArr =[];
// listen to click shopping basket===============================
const listenToClickBasket = (quantityValue, itemId) => {
    const navbarIcon = document.querySelector('.navbar__icon');
    navbarIcon.addEventListener('click', () => {
        fetch(`${productsURL}`)
            .then(res => res.json())
            .then(data => {
                data.map(el => {
                    if(el.id === itemId){
                        el.quantity += quantityValue
                        el.total = Number((el.quantity * el.price).toFixed(2));
                        shopping_basketState.selectedItems = [];
                        basketArr.push(el);
                    }
                });
                
                let unique = ([...new Set(basketArr.map(JSON.stringify))]).map(JSON.parse);
                let newState = {selectedItems: unique}
                updateState(newState);
                createShoppingCart();
            })
    })
}

// empty popup ==============================================
const emptyPopUp =() => {
    const popup = document.querySelector('.popup');
    if(popup !== null){
        popup.remove();
    }
}
// create shoping basket======================================
const createShoppingCart = () => {
    emptyPopUp();
    const popup = document.createElement('div');
    popup.classList.add('popup');
    main.append(popup);
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup__container');
    popup.append(popupContainer);
    const popupTop = document.createElement('div');
    popupTop.classList.add('popup__top');
    popupTop.innerHTML = `
        <h1 class="popup__name">Shopping Bag</h1>
        <a href="#" class="popup__close">&times;</a>
    `;
    const popupContentContainer = document.createElement('div');
    popupContentContainer.classList.add('popup__content-container');
    popupContainer.append(popupTop, popupContentContainer);
    listenToCloseBasket();
    calcualteTotal(popupContentContainer);
}

// listen to close basket=================================
const listenToCloseBasket = ()=> {
    const closeShoppingCart = document.querySelector('.popup__close');
    const popUp = document.querySelector('.popup');
    closeShoppingCart.addEventListener('click', () => {
        popUp.classList.add('hidden');
    })
}

// calculate total and items quantity ==============================
const calcualteTotal = (popupContentContainer) => {
    const cartItems = shopping_basketState.selectedItems;

    cartItems.map(el => {
        const price = (el.price * el.quantity).toFixed(2);
        el.total = Number(price);
    });

    const totalArr = cartItems.map(el => el.total);
    const totalItems = totalArr.reduce((acc,curr) => acc+curr);

    const QuantityArr = cartItems.map(el => el.quantity);
    const totalQuantity = QuantityArr.reduce((acc,curr) => acc+curr);

    createPopupContents(popupContentContainer, cartItems);
    createPopupContentSecond(cartItems, popupContentContainer);
    createPopupContentThird(popupContentContainer, totalQuantity, totalItems)
}

// create Popup Contents============================
const createPopupContents = (popupContentContainer, cartItems) => {
    popupContentContainer.innerHTML = cartItems.map(el =>
        `
        <div class="popup__content">
            <div class="img-container">
                <img src="${el.img}" alt="${el.title}" class="popup__content--img">
                <div class="popup__content--info">
                    <h3 class="popup-title">${el.title}</h3>
                    <p class="popup-price">£${el.price}</p>
                </div>
            </div>
        </div>
        `
    ).join('');
}

// create second part of popup content==============================
const createPopupContentSecond = (cartItems, popupContentContainer) => {
    cartItems.map(el => {
        const popupContent = document.querySelector('.popup__content');

        const popupQuantity = document.createElement('div');
        popupQuantity.classList.add('popup-quantity');
        popupQuantity.setAttribute('id', `${el.id}`);
        
        const popupMinus = document.createElement('span');
        popupMinus.classList.add('popup-minus');
        popupMinus.innerHTML = `<i class="fas fa-minus-circle"></i>`;

        const popupPlus = document.createElement('span');
        popupPlus.classList.add('popup-plus');
        popupPlus.innerHTML = `<i class="fas fa-plus-circle"></i>`;

        const quantity = document.createElement('input');
        quantity.classList.add('quantity');
        quantity.setAttribute('id', `${el.id}`);
        quantity.setAttribute('value', `${el.quantity}`);
        quantity.setAttribute('type', 'text');

        popupQuantity.append(popupMinus, quantity, popupPlus);

        const finalPrice = document.createElement('p');
        finalPrice.classList.add('final-price');
        finalPrice.innerText= `£${el.total}`;

        popupContent.append(popupQuantity, finalPrice);

        popupPlus.addEventListener('click', () => {
            listenToPlusButton(quantity, finalPrice);
        });
        popupMinus.addEventListener('click', () => {
            listenToMinusButton(quantity, finalPrice);
        });
        popupContentContainer.append(popupContent);
    });
}

// create third part of popupContent================================
const createPopupContentThird = (popupContentContainer, totalQuantity, totalItems) => {
    const totalContainer = document.createElement('div');
    totalContainer.classList.add('total-container');
    totalContainer.innerHTML = `
        <div class="total-title">
            <span>Items</span>
            <span>Total</span>
        </div>
        <div class="total-input">
            <span class="total-quantity">${totalQuantity}</span>
            <span class="total-input-item">£${totalItems}</span>
        </div>
    `;
    const checkOutBtn = document.createElement('button');
    checkOutBtn.classList.add('checkout-btn');
    checkOutBtn.innerText = 'Continue To Checkout';
    popupContentContainer.append(totalContainer, checkOutBtn);
}

// listen to plus button=======================================
const listenToPlusButton = (quantity, finalPrice) => {
    const elementId = Number(quantity.parentElement.id);
    const updatedArr = basketArr.map(el => {
        if(el.id === elementId){
            el.quantity += 1
            el.total = Number((el.quantity * el.price).toFixed(2));
            quantity.value = el.quantity;
            finalPrice.innerText = `£${el.total}`;
        }
        return el;
    });

    let unique = ([...new Set(updatedArr.map(JSON.stringify))]).map(JSON.parse);
    let newState = {selectedItems: unique}
    updateState(newState);
    
    const cartItems = shopping_basketState.selectedItems;
    const updateTotalArr = cartItems.map(el => Number(el.total));
    const updatedTotal = updateTotalArr.reduce((acc,curr) => acc+curr);
        
    const updateQuantityArr = cartItems.map(el => el.quantity);
    const updatedQuantity = updateQuantityArr.reduce((acc,curr) => acc+curr);

    const totalQuantity = document.querySelector('.total-quantity');
    const totalInput = document.querySelector('.total-input-item');

    totalInput.innerText = `£${updatedTotal}`;
    totalQuantity.innerText = updatedQuantity;
}

// listen to minus button==========================================
const listenToMinusButton = (quantity, finalPrice) => {
    const elementId = Number(quantity.parentElement.id);
    const basketNum = document.querySelector('.basket-num');
    
    basketArr.map(el => {
        if(el.id === elementId){
            if(el.quantity > 1){
                el.quantity -= 1
                el.total = Number((el.quantity * el.price).toFixed(2));
                quantity.value = el.quantity;
                finalPrice.innerText = `£${el.total}`;
                let newState = {selectedItems: basketArr}
                updateState(newState);
                
            }
            else if(el.quantity <= 1){
                const idx = basketArr.indexOf(el);
                basketArr.splice(idx,1);
                finalPrice.parentElement.remove();
                let newState = {selectedItems: basketArr}
                updateState(newState);
            }
        }
        return el;
    });

    let cartItems = shopping_basketState.selectedItems;
    if(cartItems.length === 0){
        const container = document.querySelector('.popup__content-container');
        container.innerHTML = '';
        basketArr = [];
        basketNum.innerText = 0;
        basketNum.classList.remove('show');
        const h2El = document.createElement('h2');
        h2El.innerText = 'Hi, Your shopping basket is empty!';
        container.append(h2El);
        let newState = {selectedItems: basketArr}
        updateState(newState);
    }
    
    const updateTotalArr = cartItems.map(el => Number(el.total));
    const updatedTotal = updateTotalArr.reduce((acc,curr) => acc+curr);

    const updateQuantityArr = cartItems.map(el => el.quantity);
    const updatedQuantity = updateQuantityArr.reduce((acc,curr) => acc+curr);

    if(updatedQuantity >= 1){
        basketNum.innerText = updatedQuantity;
    }
    
    const totalQuantity = document.querySelector('.total-quantity');
    const totalInput = document.querySelector('.total-input-item');
    totalInput.innerText = `£${updatedTotal}`;
    totalQuantity.innerText = updatedQuantity;
}

// Filter section**************************************************

// listen to click collection======================================
const fetchFilterProducts = async () => {
    const res = await fetch(`${productsURL}`);
    const data = await res.json()
    
    filterCollectionClick(data);
    filterColorClick(data);
}

// filter collection 1==============================================
const filterCollectionClick = (data) => {
    const liElements = document.querySelectorAll('.collection__list li');
    liElements.forEach(li => {
        li.addEventListener('click', () => {
            const text = li.textContent;
            const filteredArr = data.filter(el => el.collection === text);
            let newState = {filter: {collection: filteredArr}};
            updateState(newState);
            let arr = shopping_basketState.filter.collection;
            updateProductContainerWithCollection(arr);
        })
    })
}

// filter collection 2==============================================
const updateProductContainerWithCollection = (filteredArr) => {
    const productContainer = document.querySelector('.product-container');
    const productArr = randomFnForProducts(filteredArr.length);
    productContainer.innerHTML = '';
    for(let i=0; i< productArr.length; i++){
        const itemIdx = productArr[i];
        createProductItem(productContainer, filteredArr, itemIdx)
    }
}

// filter color 1================================================
const filterColorClick = (data) => {
    const colorGroup = document.querySelectorAll('.color-group');
    colorGroup.forEach(group => {
        const inputEl = group.querySelectorAll('input');
        inputEl.forEach(input => {
            input.addEventListener('change', (e) => {
                if(input.checked){
                    const inputId = input.id;
                    shopping_basketState.filter.color[inputId] = true;
                    
                    console.log(shopping_basketState);
                    const filteredArr = data.filter(el => {
                        if(shopping_basketState.filter.color[inputId]=== true){
                            return el.color === inputId
                        }
                    });
                    
                    // let newState = {filter: {color: {}}};
                    // updateState(newState);
                    
                    updateProductContainerWithColor(filteredArr);
                }
                
            })
        })
    })
}

const removeUncheckedColorValue = (input) => {
    const text = input.id;
    let stateColorArr = shopping_basketState.filter.color;
    const findUncheckedValue = stateColorArr.filter(el => el.color === text);
    console.log(findUncheckedValue);
    const arrayOfIndex = findUncheckedValue.map(item => stateColorArr.indexOf(item));
    stateColorArr = stateColorArr.filter(function(value, index) {
        return arrayOfIndex.indexOf(index) === -1;
    });
    let newState = {breweries: stateColorArr};
    updateState(newState);
}

// filter color 2================================================
const updateProductContainerWithColor = (filteredArr) => {
    const productContainer = document.querySelector('.product-container');
    if(filteredArr.length <= 6){
        productContainer.innerHTML = '';
        const productArr = filteredArr.map(el => filteredArr.indexOf(el));
        for(let i=0; i< productArr.length; i++){
            const itemIdx = productArr[i];
            createProductItem(productContainer, filteredArr, itemIdx)
        }
    }else{
        productContainer.innerHTML = '';
        const productArr = randomFnForProducts(filteredArr.length);
        for(let i=0; i< productArr.length; i++){
            const itemIdx = productArr[i];
            createProductItem(productContainer, filteredArr, itemIdx)
        }
    }
}
