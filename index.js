document.querySelector('#animal-form').addEventListener('submit', handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    console.log(e.target) // Optional debug
    let animalObj = {
        name: e.target.name.value,
        imageURL: e.target.image_url.value,
        description: e.target.description.value,
        donation: 0
    }
    renderOneAnimal(animalObj)
    HandleAddAdopt(animalObj)
}

function renderOneAnimal(animal) {
    let card= document.createElement('li')
    card.className='card'
    card.innerHTML=`
        <img src="${animal.imageURL}"/>
        <div class="content">
            <h4>${animal.name}</h4>
            <p>
                $<span class="donation-count">${animal.donation}</span> Donated
            </p>
            <p>${animal.description}</p>
        </div>
        <div class="buttons">
            <button id="donate10" class='donate'> Donate $10 </button>
            <button id="setfee" class='setfe' > Set Fee </button>
        </div>
    `
    // card.querySelector('.donate10').addEventListener('click', () => addDonate(card,animal));
    card.querySelector('#donate10').addEventListener('click', () => {
        animal.donation+=10;
        card.querySelector('span').innerText = animal.donation
        UpdateDonation(animal)
    })
    card.querySelector('#setfee').addEventListener('click',() =>{
        card.remove()
        HandleDelete(animal.id)
    } )
    
    document.querySelector('#animal-list').appendChild(card)
   
}

//initial Render
//get Data and Render our animals to the DOM
function initialize(){
    // AnimalData.forEach(animal => renderOneAnimal(animal))
    fetch('http://localhost:3000/animalData')
    .then(res => res.json())
    .then(data => data.forEach(animal => renderOneAnimal(animal)))
}

initialize()

// function addDonate(card, animal) {
//     let donation = card.donation+= 10
//     console.log(donation)
//     card.querySelector('span').textContent = donation
//     // let donationSpan = card.querySelector('.donation-count');
//     // let currentAmount = parseInt(donationSpan.textContent);
//     // let newAmount = currentAmount + 10;
//     // donationSpan.textContent = newAmount;
// }

function HandleDelete(id) {
    fetch(`http://localhost:3000/animalData/${id}`,{
        method: 'DELETE',
        headers : {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

function UpdateDonation(animalObj) {
    console.log(animalObj)
    fetch(`http://localhost:3000/animalData/${animalObj.id}`,{
         method: 'PATCH',
         headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalObj)
    })
    .then(res=>res.json())
    // .then(animal=> console.log(animal))
}

function HandleAddAdopt(animalObj) {
    fetch('http://localhost:3000/animalData',{
         method: 'POST',
         headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalObj)
    })
    .then(res=>res.json())
    // .then(animal=> console.log(animal))
}
