function openModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";

    const plantList = document.getElementById("plant-list");

    plantList.innerHTML = "";
    plantData.forEach(plant => {
        const plantItem = document.createElement("div");
        plantItem.classList.add("plant-item");

        const plantIcon = document.createElement("img");
        plantIcon.src = `assets/plants-icons/${plant.icon}`;
        plantIcon.alt = plant.name;

        const plantName = document.createElement("p");
        plantName.textContent = plant.name;

        plantItem.appendChild(plantIcon);
        plantItem.appendChild(plantName);

        plantList.appendChild(plantItem);
    });
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
});

document.querySelector('#dataset').addEventListener('click', () => {
    openModal();
});
