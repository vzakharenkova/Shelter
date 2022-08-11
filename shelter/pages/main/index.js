import pets from '../pets/pets.json' assert { type: "json" };
console.log(pets);
window.onload = function() {
    const page = document.querySelector('body');
    const pageWidth = document.documentElement.scrollWidth;
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('#hiddenMenu');
    const darkField = document.getElementById('dark_field');
    const menuItems = document.querySelectorAll('.hidden_nav_item');
    const mainShelterTitle = document.querySelector('.main_shelter_title');
    let petsList = document.querySelectorAll('.pet_example');
    let petsPhotos = document.querySelectorAll('.pet_photo');
    let petsNames = document.querySelectorAll('.pet_name');
    let arrowButtons = document.querySelectorAll('.arrow_button');
    const popup = document.getElementById('popup');
    const popupPhoto = document.getElementById('popup_photo');
    const popupName = document.getElementById('popup_name');
    const popupType = document.getElementById('popup_type');
    const popupText = document.getElementById('popup_text');
    const popupField = document.getElementById('popup_field');
    const popupPetDiscription = document.getElementById('pet_discription');
    const age = document.getElementById('age');
    const inoculations = document.getElementById('inoculations');
    const diseases = document.getElementById('diseases');
    const parasites = document.getElementById('parasites');
    const closeBtn = document.getElementById('to_close');

    burger.addEventListener('click', toggleMenu);
    darkField.addEventListener('click', toggleMenu);
    menuItems.forEach(menuItem => 
        menuItem.addEventListener('click', toggleMenu)
    );
    window.addEventListener(`resize`, widthCheck);
    arrowButtons.forEach(button => button.addEventListener('click', petsListScroll));
    petsList.forEach(pet => 
        pet.addEventListener('click', popupToggle)
    );
    popupField.addEventListener('click', closePopup);
    popupPetDiscription.onmouseout = function(e) {
        closeBtn.style.backgroundColor = '#FDDCC4';
    }
    popupPetDiscription.onmouseover = function(e) {
        closeBtn.style.backgroundColor = 'transparent';
    }
    
    function toggleMenu() {
        burger.classList.toggle('open');
        darkField.classList.toggle('open');
        if (menu.classList.contains('open')) {
            menu.classList.toggle('open');
            setTimeout(() => {
                page.classList.toggle('open');
                menu.style.display = 'none';
            }, 500)
        } else {
            menu.style.display = 'flex';
            setTimeout(() => {
                menu.classList.toggle('open');
                page.classList.toggle('open');
            }, 0)
        }
        mainShelterTitle.classList.toggle('open');
    }

    function widthCheck() {
        if (pageWidth > 767 && burger.classList.contains('open')) {
            toggleMenu();
        }
    }

    let usedNumbers = [];
    let slicer = pets.length % petsNames.length;
    function getRandomInt(min, max) {
        if (usedNumbers.length === pets.length - slicer) {
            usedNumbers = usedNumbers.slice(slicer);
        }
        min = Math.ceil(min);
        max = Math.floor(max);
        while (pets.length >= usedNumbers.length) {
            let n = Math.floor(Math.random() * (max - min + 1)) + min;
            if (usedNumbers.indexOf(n) > -1) continue;
                usedNumbers.push(n);
                return n;
        }
    }
    let currentPetsList = [];

    petsListScroll();
    function petsListScroll() {
        currentPetsList = [];
        petsList.forEach(el => {el.style.opacity = "0";
        })
        setTimeout(() => {
            for (let i = 0; i < petsNames.length; i++) {
                let n = getRandomInt(0, pets.length-1);
                petsNames[i].textContent = pets[n].name;
                petsPhotos[i].src = pets[n].img
                currentPetsList.push(pets[n]);
            }
            }, 1000)
        petsList.forEach(el => {setTimeout(() => {
            el.style.opacity = "1";
            el.style.transition = "transition: all 0.5s ease-in 0.5s;"
        }, 1000)
        })
    }

    function popupToggle(e) {
        page.classList.toggle('open');
        popup.classList.toggle('open');
        popupField.classList.toggle('open');
        popupPetDiscription.scrollIntoView({block: "center", behavior: "smooth"});
        for (let  i = 0; i < currentPetsList.length; i++) {
            if (petsList[i] === e.currentTarget) {
                popupPhoto.src = currentPetsList[i].img;
                popupName.textContent = currentPetsList[i].name;
                popupType.textContent = currentPetsList[i].type + " - " + currentPetsList[i].breed;
                popupText.textContent = currentPetsList[i].description;
                age.textContent = "Age: " + currentPetsList[i].age;
                inoculations.textContent = "Inoculations: " + currentPetsList[i].inoculations.join(", ");
                diseases.textContent = "Diseases: " + currentPetsList[i].diseases;
                parasites.textContent = "Parasites: " + currentPetsList[i].parasites;
                return
            } else continue;
        }
    }

    function closePopup (e) {
        console.log(e.target);
        if (e.target !== popupPetDiscription && e.target !== popupPhoto) {
            page.classList.toggle('open');
            popup.classList.toggle('open');
            popupField.classList.toggle('open');
        }
    }
}

