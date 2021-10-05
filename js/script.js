const elList = document.querySelector('.films__card-wrapper');
const elCheck = document.querySelector('.button');
const elForm = document.querySelector('.form');
const elInputSearch = selectElem('.films__input-serach', elForm);
const elSelect = selectElem('.films__select', elForm);
const elDiv = document.querySelector('.modal')
const elBtn = document.querySelector('.btn')
const elFilter = selectElem('.films__filter', elForm);
const elTemplate = document.querySelector('#template').content;
const elDivWrapper = document.querySelector('.modal-wrapper');
const elDivWrapperInner = document.querySelector('.modal-wrapper-inner');
const elIcon = document.querySelector('.btn-icon');
const elFa = document.querySelector('.fa-regular');
const elSolid = document.querySelector('.fa-solid')

let modalArray = []


function renderMovies(filmsArr, element){
    element.innerHTML = null;
    
    filmsArr.forEach((films) =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        selectElem('.films__img', cloneTemplate).src = films.poster
        selectElem('.films__card-title', cloneTemplate).textContent = films.title
        selectElem('.films__card-genre', cloneTemplate).textContent = films.genres
        selectElem('.films__release-date', cloneTemplate).release_date = films.release_date;

        cloneTemplate.querySelector('.btn-icon').dataset.itemId = films.id
        cloneTemplate.querySelector('.fa-regular').dataset.itemId = films.id
        cloneTemplate.querySelector('.delete_btn').dataset.deleteId = films.id
        cloneTemplate.querySelector('.fa-solid').dataset.deleteId = films.id

        element.appendChild(cloneTemplate);
    })
}

renderMovies(films, elList);

function renderGenres(filmsArr, element){
    
    let result = [];
    
    filmsArr.forEach((films) => {
        films.genres.forEach(genres =>{
            if(!result.includes(genres)){
                result.push(genres)
            }
        })
    })
    
    result.forEach(genres =>{
        let newOption = createDOM('option');
        newOption.textContent = genres;
        newOption.value = genres;
        
        element.appendChild(newOption)
    })
}

renderGenres(films, elSelect)

elForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const inputValue = elInputSearch.value.trim();
    const selectValue = elSelect.value.trim();
    const filterValue = elFilter.value.trim();
    
    const regex = new RegExp(inputValue, 'gi');
    
    const filteredFilms = films.filter((films) => films.title.match(regex));
    
    let foundFilms = [];
    
    if(selectValue === 'All'){
        foundFilms = filteredFilms
    }else{
        foundFilms = filteredFilms.filter(films => films.genres.includes(selectValue))
    }
    
    if(filterValue === 'a_z'){
        foundFilms.sort((a, b) =>{
            if(a.title > b.title){
                return 1
            }else if(a.title < b.title){
                return -1
            }else{
                return 0
            }
        })
    }else if(filterValue === 'z_a'){
            foundFilms.sort((a, b) =>{
                if(a.title > b.title){
                    return -1
                }else if(a.title < b.title){
                    return 1
                }else{
                    return 0
                }
            })
    }else if(filterValue === 'old__new'){
        foundFilms.sort((a, b) =>{
            if(a.release_date > b.release_date){
                return 1
            }else if(a.release_date < b.release_date){
                return -1
            }else{
                return 0
            }
        })
}else if(filterValue === 'new__old'){
    foundFilms.sort((b, a) =>{
        if(a.release_date > b.release_date){
            return 1
        }else if(a.release_date < b.release_date){
            return -1
        }else{
            return 0
        }
    })
}

    elInputSearch.value = null;

    renderMovies(foundFilms, elList);
});
elCheck.addEventListener('click', function() {

    if(elCheck) {
        elDiv.style.display = 'flex';
        elDivWrapper.style.display = 'block';
        
    }
})
elBtn.addEventListener('click', function() {

    if(elBtn) {
        elDiv.style.display = 'none';
        elDivWrapper.style.display = 'none';
    }
})
// elVedro.addEventListener('click', function() {
//       elLi.style.display = 'none';
// })

function setModal(){

    elDivWrapperInner.innerHTML = "";
    modalArray.forEach((item) => {
        const cloneTemplate = elTemplate.cloneNode(true);
        
        selectElem('.films__img', cloneTemplate).src = item.poster
        selectElem('.films__card-title', cloneTemplate).textContent = item.title
        selectElem('.films__card-genre', cloneTemplate).textContent = item.genres
        selectElem('.films__release-date', cloneTemplate).release_date = item.release_date;

        cloneTemplate.querySelector('.btn-icon').dataset.itemId = item.id
        cloneTemplate.querySelector('.fa-regular').dataset.itemId = item.id
        cloneTemplate.querySelector('.delete_btn').dataset.itemId = item.id
        cloneTemplate.querySelector('.fa-solid').dataset.itemId = item.id
        
        
        elDivWrapperInner.appendChild(cloneTemplate);
    })
}


elList.addEventListener('click', function(event) {
    films.forEach((item) => {
        if(event.target.dataset.itemId == item.id){
            modalArray.push(item)
           
        }
    })
    
    console.log(modalArray)
    setModal()
    
});

function deletefilms(index){
    modalArray.splice(index,1)
}


elDivWrapperInner.addEventListener('click', function(event) {
  if(event.target.matches('.delete_btn')){
    deletefilms(Number(event.target.dataset.deleteId))
    setModal()
  }
})
elDivWrapperInner.addEventListener('click', function(event) {
    if(event.target.matches('.fa-solid')){
      deletefilms(Number(event.target.dataset.deleteId))
      setModal()
    }
  })