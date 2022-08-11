import pets from './pets.json' assert { type: "json" };
window.onload = function() {
    const page = document.querySelector('body');
    const pageWidth = document.documentElement.scrollWidth;
    const burger = document.querySelector('.burger');
    const darkField = document.getElementById('dark_field');
    const menu = document.querySelector('#hiddenMenu');
    const menuItems = document.querySelectorAll('.hidden_nav_item');
    const mainShelterTitle = document.querySelector('.main_shelter_title');
    let nodeListOfExamples = document.querySelectorAll('.pet_example');
    let petsListA = Array.from(nodeListOfExamples);
    let petsList = petsListA.filter(el => el.style.display !== "none");
    console.log(petsListA);
    let petsPhotos = document.querySelectorAll('.pet_photo');
    let petsNames = document.querySelectorAll('.pet_name');
    let arrowButtons = document.querySelectorAll('.arrow');
    const popup = document.getElementById('popup');
    const popupPhoto = document.getElementById('popup_photo');
    const popupName = document.getElementById('popup_name');
    let namesArr = Array.from(petsNames).map(el => el = el.innerHTML);
    const popupType = document.getElementById('popup_type');
    const popupText = document.getElementById('popup_text');
    const popupField = document.getElementById('popup_field');
    const popupPetDiscription = document.getElementById('pet_discription');
    const age = document.getElementById('age');
    const inoculations = document.getElementById('inoculations');
    const diseases = document.getElementById('diseases');
    const parasites = document.getElementById('parasites');
    const closeBtn = document.getElementById('to_close');
    const petsArr = pets.concat(pets, pets, pets, pets, pets);
    const arrowStart = document.querySelector('.arrow_start');
    const arrowPrevious = document.querySelector('.arrow_previous');
    const arrowNext = document.querySelector('.arrow_next');
    const arrowEnd = document.querySelector('.arrow_end');
    const selectedPage = document.querySelector('.selected_page');
    let currentPetsList = [];
    let usedNumbers = [];
    let lastPage = Math.ceil(petsArr.length / petsList.length);
    let usedNames = [];
    let pagesStructure = []
    let pagesNumbers = [];

    burger.addEventListener('click', toggleMenu);
    darkField.addEventListener('click', toggleMenu);
    menuItems.forEach(menuItem => 
        menuItem.addEventListener('click', toggleMenu)
    );
    window.addEventListener(`resize`, widthCheck);
    petsList.forEach(pet => 
        pet.addEventListener('click', popupToggle)
    );
    popupField.addEventListener('click', closePopup);
    arrowButtons.forEach(btn => 
        btn.addEventListener('click', disableArrowToggle)
    );
    arrowButtons.forEach(btn => 
        btn.addEventListener('click', changePage)
    );
    popupPetDiscription.onmouseout = function(e) {
        closeBtn.style.backgroundColor = '#FDDCC4';
    }
    popupPetDiscription.onmouseover = function(e) {
        closeBtn.style.backgroundColor = 'transparent';
    }
    
    
    widthCheck()
    petsListScroll();
    console.log(petsList);

    function toggleMenu() {
        burger.classList.toggle('open');
        darkField.classList.toggle('open');
        if (menu.classList.contains('open')) {
            menu.classList.toggle('open');
            setTimeout(() => {
                menu.style.display = 'none';
                page.classList.toggle('open');
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
        if (pageWidth < 1235 && pageWidth > 670) {
            petsListA[7].style.display = "none";
            petsListA[6].style.display = "none";
            petsList = petsListA.filter(el => el.style.display !== "none");
            lastPage = Math.ceil(petsArr.length / petsList.length);
        }
        if (pageWidth < 671) {
            petsListA[7].style.display = "none";
            petsListA[6].style.display = "none";
            petsListA[5].style.display = "none";
            petsListA[4].style.display = "none";
            petsListA[3].style.display = "none";
            petsList = petsListA.filter(el => el.style.display !== "none");
            lastPage = Math.ceil(petsArr.length / petsList.length);
        }
    }
    
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        petsNames = document.querySelectorAll('.pet_name');
        namesArr = Array.from(petsNames).map(el => el = el.innerHTML);
        while (pets.length >= petsList.length) {
            let n = Math.floor(Math.random() * (max - min + 1)) + min;
            if (usedNumbers.indexOf(n) > -1) continue;
            if (usedNames.includes(petsArr[n].name)) continue;
            usedNumbers.push(n);
            usedNames.push(petsArr[n].name);
            return n;
        }
    }

    function petsListScroll() {
        petsList.forEach(el => {el.style.opacity = "0";
        })
        currentPetsList = [];
        usedNames = [];
        
        let checker;
        pagesStructure.forEach(el => {
            if (el[0] === +selectedPage.textContent && el[1].length > 0 ) {
                return checker = pagesStructure.indexOf(el);
            }
        })
        if (!pagesNumbers.includes(+selectedPage.textContent)) {
            pagesStructure.push([+selectedPage.textContent, []]);
            console.log(pagesStructure)
        }
        setTimeout(() => {
            for (let i = 0; i < petsList.length; i++) {
                if (checker > -1) {
                    petsNames[i].textContent = pagesStructure[checker][1][i].name;
                    petsPhotos[i].src = pagesStructure[checker][1][i].src;
                } else {
                    pagesNumbers.push(+selectedPage.textContent);
                    let n = getRandomInt(0, petsArr.length-1); 
                    petsNames[i].textContent = petsArr[n].name;
                    petsPhotos[i].src = petsArr[n].img;
                    currentPetsList.push(petsArr[n]);
                    pagesStructure[pagesStructure.length-1][1].push({name:petsNames[i].textContent, src:petsPhotos[i].src});
                    }
                    console.log(pagesStructure)
            }}, 1000)
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
        popup.scrollIntoView({block: "center", behavior: "smooth"});
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
        if (e.target !== popupPetDiscription && e.target !== popupPhoto) {
            page.classList.toggle('open');
            popup.classList.toggle('open');
            popupField.classList.toggle('open');
        }
    }
    function disableArrowToggle (e) {
        if (e.currentTarget === arrowStart) {
            if (+selectedPage.textContent === lastPage) {
                arrowNext.classList.remove('disabled_arrow');
                arrowEnd.classList.remove('disabled_arrow');
            }
            arrowPrevious.classList.add('disabled_arrow');
            arrowStart.classList.add('disabled_arrow');
        }
        if (e.currentTarget === arrowPrevious) {
            if (selectedPage.textContent === '2') {
                arrowPrevious.classList.add('disabled_arrow');
                arrowStart.classList.add('disabled_arrow'); 
            }
            if (+selectedPage.textContent === lastPage) {
                arrowNext.classList.remove('disabled_arrow');
                arrowEnd.classList.remove('disabled_arrow');
            }
        }
        if (e.currentTarget === arrowNext) {
            if (selectedPage.textContent === '1') {
                arrowPrevious.classList.remove('disabled_arrow');
                arrowStart.classList.remove('disabled_arrow'); 
            }
            if (+selectedPage.textContent === lastPage - 1) {
                arrowNext.classList.add('disabled_arrow');
                arrowEnd.classList.add('disabled_arrow');
            }
        }
        if (e.currentTarget === arrowEnd) {
            if (selectedPage.textContent === '1') {
                arrowPrevious.classList.remove('disabled_arrow');
                arrowStart.classList.remove('disabled_arrow'); 
            }
            arrowNext.classList.add('disabled_arrow');
            arrowEnd.classList.add('disabled_arrow');
        }        
    }

    function changePage(e) {
        changeNumber(e.currentTarget);
        petsListScroll();
    }

    function changeNumber(target) {
        if (target === arrowStart && arrowStart.classList.contains('disabled_arrow')) {
            selectedPage.textContent = "1";
        }
        if (target === arrowEnd && arrowEnd.classList.contains('disabled_arrow')) {
            selectedPage.textContent = `${lastPage}`;
        }
        if (target === arrowPrevious) {
            selectedPage.textContent = +selectedPage.textContent - 1;
        }
        if (target === arrowNext) {
            selectedPage.textContent = +selectedPage.textContent + 1;
        }
    }
    
}