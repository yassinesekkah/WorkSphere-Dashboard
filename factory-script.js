// ===>> DOM Elements
const experienceOpenButton = document.getElementById("experienceOpenFormButton");
const bigModal = document.querySelector(".modal");
const experienceForm = document.getElementById("experienceForm");
const openForm = document.querySelector(".ajouterButton");
const cancelButtonForm = document.getElementById("cancelButtonForm");
const ajouterButtonForm = document.getElementById("ajouterButtonForm");

const nonEffectueContainer = document.getElementById("nonEffeContain");
const moreInfoAssignPopup = document.getElementById("moreInfoAssignPopup");
const moreInfoPopupList = document.getElementById("moreInfoPopupList");

const assignPopup = document.getElementById("assignPopup");
const popupList = document.getElementById("popupList");
const fermerPopup = document.getElementById("fermerPopup");
const rooms = document.querySelectorAll(".roomCard");

let nonEffectueArray = [];
let experienceArray = [];

const roomRoles = [
    ["Manager", "Nettoyage"],          // Salle de conférence
    ["Technicien IT", "Manager"],    // Salle d'archives
    ["Réceptionniste(e)", "Manager", "Nettoyage"],    // Réception
    ["Manager", "Nettoyage", "Autres rôle", "Réceptionniste(e)", "sécurité", "Technicien IT"],   // Salle du personnel
    ["Technicien IT", "Manager", "Nettoyage"],    // Salle des serveurs
    ["sécurité", "Manager", "Nettoyage"]         // Salle de sécurité
];

///=====>>>> for open the big form <<<<=====\\\
openForm.addEventListener("click", function () {
    bigModal.classList.remove("hideModel");
});
///=====>>>> for close the big form <<<<=====\\\
cancelButtonForm.addEventListener("click", function () {
    // clear inputs
    document.getElementById("nameInput").value = "";
    document.getElementById("roleSelect").value = "";
    document.getElementById("photoInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("phoneInput").value = "";
    document.getElementById("expList").innerHTML = "";
    experienceArray = [];
    document.getElementById("expJob").value = "";
    document.getElementById("expCompany").value = "";
    document.getElementById("expYears").value = "";
    bigModal.classList.add("hideModel");
});
///=====>>>> for toggle the experience form <<<<=====\\\
experienceOpenButton.addEventListener("click", function () {
    experienceForm.classList.toggle("showForm");
});

///=====>>>> for add a new experience <<<<=====\\\
function confirmExperience() {
    const job = document.getElementById("expJob").value;
    const company = document.getElementById("expCompany").value;
    const years = document.getElementById("expYears").value;

    if (!job || !company || !years) {
        alert("Veuillez remplir tous les champs de l'expérience.");
        return;
    }
    const expId = Date.now();
    //===> experience object
    experienceArray.push({
        expId: expId,
        jobName: job,
        companyName: company,
        periode: years
    });

    const expList = document.getElementById("expList");
    const wrapper = document.createElement("div");
    wrapper.className = "experienceItem";
    wrapper.setAttribute("data-id", expId);

    wrapper.innerHTML = `<strong>${job}</strong> — ${company} (${years})
    <button class="removeExp" onclick="removeExperience(this)">X</button>`;

    expList.appendChild(wrapper);

    document.getElementById("expJob").value = "";
    document.getElementById("expCompany").value = "";
    document.getElementById("expYears").value = "";
}
///=====>>>> for remove experience <<<<=====\\\
function removeExperience(btn) {
    let item = btn.parentElement;
    let id = Number(item.getAttribute("data-id"));
    experienceArray = experienceArray.filter(exp => exp.expId !== id);
    item.remove();
}

///====> function for create card
function createWorkerCard(worker) {
    let divContainCard = document.createElement("div");
    divContainCard.className = "divContainCard";

    let cardPhoto = document.createElement("img");
    cardPhoto.src = worker.photo || "./assets/avatar.png";
    cardPhoto.className = "cardPhoto";
    divContainCard.appendChild(cardPhoto);

    let nameAndRoleContainer = document.createElement("div");
    nameAndRoleContainer.className = "nameAndRoleContainer";
    divContainCard.appendChild(nameAndRoleContainer);

    let cardName = document.createElement("p");
    cardName.textContent = worker.name;
    cardName.className = "cardName"
    nameAndRoleContainer.appendChild(cardName);

    let roleAndIconContainer = document.createElement("div");
    roleAndIconContainer.className = "roleAndIconContainer";
    nameAndRoleContainer.appendChild(roleAndIconContainer);

    let cardRole = document.createElement("p");
    cardRole.textContent = worker.role;
    cardRole.className = "cardRole"
    roleAndIconContainer.appendChild(cardRole);

    let moreIcon = document.createElement("img");
    moreIcon.src = "./assets/More.png";
    moreIcon.className = "moreIcon"
    roleAndIconContainer.appendChild(moreIcon);


    // add listener for more info
    moreIcon.addEventListener("click", function () {
        openMoreInfoModal(worker);
    });

    return divContainCard;
}

///==== function for create card inside rooms
function createRoomWorkerCard(worker) {
    let workerCard = document.createElement("div");
    workerCard.className = "divContainCardInsideRoom";

    workerCard.innerHTML =
        `
      <img class="cardPhotoInsideRoom" src="${worker.photo || './assets/avatar.png'}">
      
        <p class="cardNameInsideRoom cardName">${worker.name}</p>
        <span class="closeBtnInsideRoom">X</span>
      
        <p class="cardRoleInsideRoom cardRole">${worker.role}</p>
        <img src="./assets/More.png" class="moreIcon">
   `;

    // =====> more info
    const roomMoreIcon = workerCard.querySelector(".moreIcon");
    roomMoreIcon.addEventListener("click", function () {
        openMoreInfoModal(worker);
    });

    return workerCard;
}

///====> function for return card to sideBar
function returnWorkerToNonEffectue(workerCard, worker) {

    workerCard.remove();
    worker.zone = null;

    if (!nonEffectueArray.includes(worker)) {
        nonEffectueArray.push(worker);
    }

    let newCard = createWorkerCard(worker);
    nonEffectueContainer.appendChild(newCard);
}

//====> regex validation variables
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;
const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[0-9]{8,12}$/;

//===> validation pour valide avec regex
function validateForm() {
    let name = document.getElementById("nameInput").value.trim();
    let email = document.getElementById("emailInput").value.trim();
    let phone = document.getElementById("phoneInput").value.trim();
    let role = document.getElementById("roleSelect").value.trim();

    let errors = "";

    if (!nameRegex.test(name)) {
        errors += "- Le nom doit contenir au moins 3 lettres.\n";
    }
    if (role === "") {
        errors += "- Choisir un rôle.\n";
    }
    if (!emailRegex.test(email)) {
        errors += "- Email invalide.\n";
    }
    // if (!phoneRegex.test(phone)) {
    //     errors += "- Numéro de téléphone invalide.\n";
    // }
    if (errors !== "") {
        alert(errors);
        return false;
    }
    return true;
}


ajouterButtonForm.addEventListener("click", function () {
    if (!validateForm()) {
        return;
    }
    const worker = {
        name: document.getElementById("nameInput").value.trim(),
        role: document.getElementById("roleSelect").value.trim(),
        photo: document.getElementById("photoInput").value.trim(),
        email: document.getElementById("emailInput").value.trim(),
        phone: document.getElementById("phoneInput").value.trim(),
        experience: [...experienceArray],
        zone: null
    };

    nonEffectueArray.push(worker);
    nonEffectueContainer.appendChild(createWorkerCard(worker));

    // reset form
    document.getElementById("nameInput").value = "";
    document.getElementById("roleSelect").value = "";
    document.getElementById("photoInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("phoneInput").value = "";
    document.getElementById("expList").innerHTML = "";
    experienceArray = [];

    bigModal.classList.add("hideModel");
});

for (let i = 0; i < rooms.length; i++) {
    let room = rooms[i];
    let plusButton = room.querySelector(".selectIcon");

    plusButton.addEventListener("click", function () {
        //==> affichage dyal popup avec remove HidePopup class
        assignPopup.classList.remove("hidePopup");
        //===> clear popup
        popupList.innerHTML = "";
        //==> kol room b role dyalha f array lfo9 msatfin bnafs indice number
        let roomRole = roomRoles[i];
        //===> boucle pour affichi les carts on the popUp
        for (let j = 0; j < nonEffectueArray.length; j++) {
            let worker = nonEffectueArray[j];
            //==> condition pour filtre
            if (worker.zone === null && roomRole.includes(worker.role)) {
                //==> creation d'affichage div
                let workerDiv = createWorkerCard(worker);
                popupList.appendChild(workerDiv);

                workerDiv.addEventListener("click", function () {
                    let roomContainerCards = room.querySelector(".effectWorkersContainer");
                    // create card inside room
                    let workerCard = createRoomWorkerCard(worker);
                    roomContainerCards.appendChild(workerCard);

                    // remove from sidebar
                    let sidebarCards = nonEffectueContainer.querySelectorAll(".divContainCard");
                    for (let i = 0; i < sidebarCards.length; i++) {
                        let div = sidebarCards[i];
                        let name = div.querySelector("p").textContent;
                        
                        if (name === worker.name) {
                            div.remove();
                        }
                    }

                    // update arrays
                    worker.zone = i;
                    // nonEffectueArray = nonEffectueArray.filter(w => w !== worker);
                    // workerDiv.remove();

                    // close btn to return card to nonEffectue
                    const closeBtn = workerCard.querySelector(".closeBtnInsideRoom");
                    closeBtn.addEventListener("click", function () {
                        returnWorkerToNonEffectue(workerCard, worker);
                    });

                    assignPopup.classList.add("hidePopup");
                });
            }
        }
    });
}


fermerPopup.addEventListener("click", function () {
    assignPopup.classList.add("hidePopup");
});

function openMoreInfoModal(worker) {
    document.getElementById("moreInfoPhoto").src = worker.photo || "./assets/avatar.png";
    document.getElementById("moreInfoName").textContent = worker.name;
    document.getElementById("moreInfoRole").textContent = "Role : " + worker.role;
    document.getElementById("moreInfoEmail").textContent = "Email : " + worker.email;
    document.getElementById("moreInfoPhone").textContent = "Phone : " + worker.phone;

    const expContainer = document.getElementById("moreInfoExpList");
    expContainer.innerHTML = "";
    for (let i = 0; i < worker.experience.length; i++) {
        let exp = worker.experience[i];
        let item = document.createElement("div");
        item.textContent = `${exp.jobName} — ${exp.companyName} (${exp.periode})`;

        expContainer.appendChild(item);
    }

    document.getElementById("moreInfoModal").classList.remove("hidePopup");
}

document.getElementById("closeMoreInfo").addEventListener("click", function () {
    document.getElementById("moreInfoModal").classList.add("hidePopup");
});

