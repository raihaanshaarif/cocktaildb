const searchCocktail = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';
    // console.log(searchText);
    const link = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(link)
    .then(res => res.json())
    .then(data => loadCocktail(data.drinks))
}

const loadCocktail = (cocktail) => {
    // console.log(cocktail);
    const itemContainer = document.getElementById('item-container')
    itemContainer.innerText = '';
    cocktail.forEach(item => {
        console.log(item);
        const div = document.createElement('col')
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${item.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.strDrink}</h5>
                    <p class="card-text">${item.strInstructions}</p>
                </div>
                <div class="card-footer">
                <button onclick="loadDetail(${item.idDrink})" id="detail-btn" class="btn btn-success"> Details</button>
                </div>
            </div>
        `
        itemContainer.appendChild(div)
    });
}
const loadDetail = (id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => showDetail(data.drinks[0]))   
}

const showDetail = (detail) => {
    const drinkContainer = document.getElementById('detail-container')
    drinkContainer.innerText ='';
    const div = document.createElement('div')
    div.innerHTML = `
            <div class="card mb-3" style="max-width: 740px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${detail.strDrinkThumb}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${detail.strDrink}</h5>
                            <p class="card-text">${detail.strInstructions}</p>
                            <p class="card-text"><small class="text-muted">Date Modified: ${detail.dateModified}</small></p>
                        </div>
                    </div>
                </div>
            </div>
    `
    drinkContainer.appendChild(div)
}

