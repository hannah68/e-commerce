const main = document.querySelector('main');
const homeSection = document.createElement('div');
homeSection.classList.add('home-section');
const shopSection = document.createElement('div')
shopSection.classList.add('shop-section');
main.append(homeSection);

// filtere items======================================
const filterItems = {
    collection: ['Spring-Summer', 'Autumn-Winter'],
    color: ['Pink', 'Blue', 'White', 'Green', 'Beige', 'Black', 'Brown', 'Yellow', 'Grey','Lavender'],
    category: ['Chair', 'Table', 'Bed','Lamp','Sofa']
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
    heroImg.src = './assets/images/chair1.jpg';
    heroImg.setAttribute('alt', 'chair image');
    heroImage.append(heroImg);
    heroSection.append(heroText, heroImage);
}

// create random class============================
const randomFn = () => {
    const starClass = Math.floor(Math.random()*2)+1;
    return starClass === 1 ? 'fas fa-star-half-alt' : 'fas fa-star';
}

// fetch images for feature section===============================
const fetchFeatureImages = async (featureContainer) => {
    try{
        const res = await fetch(`${productsURL}`);
        const data = await res.json();
        const filteresArr = data.filter(el => el.feature);
        featureContainer.innerHTML = filteresArr.map(el =>
            `
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
            `
        ).join('');
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
        homeSection.classList.add('hidden');
        shopPageFn();
    });
}

// init app=======================================
const init = () => {
    heroSectionFn();
    featuresSectionFn();
    listenToShopBtn()
}
init()

// ===============================================

const shopPageFn = () => {
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
    // create form
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

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
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
const randomFnForProducts = () => {
    let numIndex = []
    while(numIndex.length < 6){
        const randomNum = Math.floor(Math.random() * 42) + 1;
        if(numIndex.indexOf(randomNum) === -1) numIndex.push(randomNum);
    }
    return numIndex;
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
        <button class="product__btn">More Details</button>
    `
    productContainer.insertAdjacentElement('beforeend', product);
}

// fetch products from db.json file==========================
const fetchProducts = async (productContainer) => {
    try{
        const res = await fetch(`${productsURL}`);
        const data = await res.json();
        console.log(data);
        const productArr = randomFnForProducts();
        for(let i=0; i<productArr.length; i++){
            const item = productArr[i];
            createProductItem(productContainer, data, item)
        }
    }
    catch(e){
        console.log('something went wrong', e);
    }
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
    })
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
                <input type="checkbox" id="color-${item}">
                <label for="color-${item}">${item}</label>
            </div>
        `
    }).join('');
    parent.insertBefore(colorList, colorMenu.nextSibling);
    iconColor.addEventListener('click', () => {
        colorList.classList.toggle('show');
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
    })
}

// listen for filter functions=================================
const listenToClickFilterFn = () => {
    listenToClickCollectionIcon();
    listenToClickColorIcon();
    listenToClickCategoryIcon();
}





