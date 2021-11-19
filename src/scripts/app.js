const main = document.querySelector('main');
const homeSection = document.createElement('div');
homeSection.classList.add('home-section');
main.append(homeSection);

const serverURL = 'http://localhost:3000/';
const productsURL = serverURL + 'products/';


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


const fetchFeatureeImages = async (featureItem) => {
    try{
        const res = await fetch(`${productsURL}`);
        const data = await res.json();
        const filteresArr = data.filter(el => el.feature);
        console.log(filteresArr);
        const starClass = Math.floor(Math.random()*2)+1;
        starClass === 1 ? 'fa-star-half-alt': 'fa-star';
        console.dir(featureItem);
        featureItem.innerHTML = filteresArr.map(el => 
            `
            <img src="${el.img}" alt="${el.title}">
            <div class="sub-img">
                <p class="sub-img__title">${el.title}</p>
                <div class="sub-img__star">
                    <div class="stars">
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas ${starClass}"></i></span>
                    </div>
                    <p>${el.price}</p>
                </div>
                <button class="sub-img__btn">More Details</button>
            </div>
            `
        ).join('');
        
    }
    catch(e){
        console.log('something went wrong', e);
    }
}


const featuresSectionFn = () => {
    const featureSection = document.createElement('section');
    featureSection.classList.add('features-section');
    const h2El = document.createElement('h2');
    h2El.innerText = 'Best selling furniture';
    const featureContainer = document.createElement('div');
    featureContainer.classList.add('features-container');
    featureSection.append(h2El, featureContainer);
    const featureItem = document.createElement('div');
    featureItem.classList.add('features-item');
    featureContainer.append(featureItem);
    homeSection.append(featureSection);
    fetchFeatureeImages(featureItem);
}

heroSectionFn();
featuresSectionFn();