const loadPhones = async (searchPhones) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhones}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);

}

const displayPhones = phones => {
    console.log(phones);
    const phoneElement = document.getElementById('phone-container');
    phoneElement.textContent = '';


    phones = phones.slice(0, 10);


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


    });


}


document.getElementById('getSearchValues').addEventListener('click', function () {

    const searchField = document.getElementById('inputField')
    const searchValue = searchField.value;
    loadPhones(searchValue);
})

