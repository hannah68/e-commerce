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
        console.log(data);
    }
    catch(e){console.log('something went wrong', e);}
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
    fetchFeatureeImages(featureItem);
}

heroSectionFn();
featuresSectionFn();