setNavMenuFromCookie();
removePreload();
startAdChanger();

document.getElementById('main-nav-burger-menu').addEventListener('click', toggleBurgerMenu);
document.querySelector('#main-nav #cover').addEventListener('click', toggleBurgerMenu);








//------------------ Actions

function setNavMenuFromCookie(){
    const cookieValue = getCookie('main-nav-burger-menu').toLowerCase();
    //on mobile always close the menu, on Desktop always open when no cookie is set. if cookie is set set so value of cookie.
    let state = window.matchMedia('(max-width: 1023px)').matches ? false : (cookieValue === '' ? true : cookieValue === 'true');
    toggleBurgerMenuElement(state);
}

function removePreload(){
    setTimeout(function() {
        document.getElementsByTagName('html')[0].classList.remove('preload');
    }, 25); //after animation/tailwind, incase js loads instantly.
}

function toggleBurgerMenu(){
    let state = toggleBurgerMenuElement();
    setCookie('main-nav-burger-menu', state, 365);
}

//------------------ Helpers

/**
 * 
 * @param {boolean} state force toggle
 * @returns current state
 */
function toggleBurgerMenuElement(state = undefined) {
    return document.getElementById('main-nav').classList.toggle('open', state);
}


//------------------ COOKIE
/**
 * 
 * @param {string} cname key
 * @param {*} cvalue value
 * @param {int} exdays day till expiration
 */
function setCookie(cname, cvalue, exdays){
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * 
 * @param {string} cname key
 * @returns {string} cookie value
 */
function getCookie(cname){
    let name = cname + "=";
    let ca = document.cookie.split(';');

    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' '){
            c = c.substring(1);
        }

        if(c.indexOf(name) == 0){
            return c.substring(name.length, c.length);
        }
    }

    return "";
}


//------------------ Advertising

function startAdChanger() {
    let item = processAdChanger();
    loopAdChanger(item);
}

function loopAdChanger(lastAd = null){
    setTimeout(() => {
        let item = processAdChanger(lastAd);

        loopAdChanger(item);
    }, 20000); //20s
}

function processAdChanger(lastAd = null){
    //hide previous ad
    lastAd && lastAd.classList.add('hidden');

    //get all ads
    let items = Array.from(document.querySelectorAll('[class*="ad-item"]'));
    //remove previous ad
    lastAd && items.splice(items.indexOf(lastAd), 1);
    //select random ad
    let selectedItem = items[Math.floor(Math.random()*items.length)];
    //show new ad
    selectedItem.classList.remove('hidden');

    return selectedItem;
}