const loadPhones = async (searchPhones, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhones}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);

}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phoneElement = document.getElementById('phone-container');
    phoneElement.textContent = '';

    let showAllElement = document.getElementById('show-all');

    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAllElement.classList.remove('d-none');


    } else {
        showAllElement.classList.add('d-none');
    }




    const noPhone = document.getElementById('no-found-message')
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');

    }
    else {
        noPhone.classList.add('d-none');
    }


    phones.forEach(phone => {
        const phoneDivElement = document.createElement('div');
        phoneDivElement.classList.add('col');
        phoneDivElement.innerHTML = `
                <div class="card p-5">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
                    </div>
                </div>
           
    
    `
        phoneElement.appendChild(phoneDivElement);

        toggleSpiner(false);


    });


}


const processing = dataLimit => {
    const searchField = document.getElementById('inputField')
    const searchValue = searchField.value;
    loadPhones(searchValue, dataLimit);
}



document.getElementById('getSearchValues').addEventListener('click', function () {
    toggleSpiner(true);
    processing(10);


});
document.getElementById("btn-show-all").addEventListener('click', function () {
    processing();
});

const toggleSpiner = isLoading => {
    const toggleElement = document.getElementById('loader');
    if (isLoading) {
        toggleElement.classList.remove('d-none');
    }
    else {
        toggleElement.classList.add('d-none');
    }
}

