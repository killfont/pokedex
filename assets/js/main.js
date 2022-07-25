let modal = document.querySelectorAll(".modal")

for (let i = 0; i < modal.length; i++) {
    modal[i].style.display = "none"
}

function modalDelete(index) {
    let modal = document.querySelectorAll(".modal") [parseInt(index) - 1]
    modal.style.display = "flex"
    let pokeId = modal.dataset.pokeid
    modal.querySelector("#linkDelete").href = `/deletePkmn/${pokeId}`
}