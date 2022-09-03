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
                            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
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

document.getElementById('inputField').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processing(10);
    }
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


const loadPhoneDetails = async id => {
    const Url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(Url);
    const data = await res.json();
    displayDetails(data.data);

}

const displayDetails = phone => {
    let detailElement = document.getElementById('phone-info');
    detailElement.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
    <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>

    
    `

}


loadPhones('apple');