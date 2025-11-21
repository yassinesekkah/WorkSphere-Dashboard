const experienceOpenButton = document.getElementById("experienceOpenFormButton");
const bigModal = document.querySelector(".modal");
const experienceForm = document.getElementById("experienceForm");
const openForm = document.querySelector(".ajouterButton");
const cancelButtonForm = document.getElementById("cancelButtonForm");
const ajouterButtonForm = document.getElementById("ajouterButtonForm");

const nonEffectueContainer = document.getElementById("nonEffeContain");
let nonEffectueArray = [];
let experienceArray = [];

const assignPopup = document.getElementById("assignPopup");
const popupList = document.getElementById("popupList");
const fermerPopup = document.getElementById("fermerPopup");
const rooms = document.querySelectorAll(".roomCard");

const roomRoles = [
  ["Manager", "Nettoyage"],          // Salle de conférence
  ["Technicien IT", "Manager"],    // Salle d'archives
  ["Réceptionniste(e)", "Manager", "Nettoyage"],    // Réception
  ["Manager", "Nettoyage", "Autres rôle", "Réceptionniste(e)", "sécurité", "Technicien IT"],   // Salle du personnel
  ["Technicien IT", "Manager", "Nettoyage"],    // Salle des serveurs
  ["sécurité", "Manager", "Nettoyage"]         // Salle de sécurité
];

const moreInfoAssignPopup = document.getElementById("moreInfoAssignPopup");
const moreInfoPopupList = document.getElementById("moreInfoPopupList");



///=====>>>> for open the big form <<<<=====\\\
openForm.addEventListener("click", function () {
  bigModal.classList.remove("hideModel")
})
///=====>>>> for close the big form <<<<=====\\\
cancelButtonForm.addEventListener("click", function () {
  //====> clear the inputs
  document.getElementById("nameInput").value = "";
  document.getElementById("roleSelect").value = "";
  document.getElementById("photoInput").value = "";
  document.getElementById("emailInput").value = "";
  document.getElementById("phoneInput").value = "";
  document.getElementById("expList").innerHTML = "";

  document.getElementById("expJob").value = "";
  document.getElementById("expCompany").value = "";
  document.getElementById("expYears").value = "";
  bigModal.classList.add("hideModel");
})
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
  })
  console.log("hada experienceArray", experienceArray);

  const expList = document.getElementById("expList");

  const wrapper = document.createElement("div");
  wrapper.className = "experienceItem";
  wrapper.setAttribute("data-id", expId);

  wrapper.innerHTML = `
    <strong>${job}</strong> — ${company} (${years})
    <button class="removeExp" onclick="removeExperience(this)">X</button>
  `;

  expList.appendChild(wrapper);

  // clear inputs
  document.getElementById("expJob").value = "";
  document.getElementById("expCompany").value = "";
  document.getElementById("expYears").value = "";
}

function removeExperience(btn) {
  let item = btn.parentElement;
  let id = Number(item.getAttribute("data-id"));
  //====> filter expArray with item id
  experienceArray = experienceArray.filter(exp => exp.expId !== id);
  //======> remove the item in UI
  item.remove();

  console.log("hada l array mn ba3d lremove", experienceArray);
}

///=====>>>> for ajouter non effectue employes <<<<=====\\\
ajouterButtonForm.addEventListener("click", function () {
  /// big form input variable
  const nameInput = document.getElementById("nameInput").value.trim();
  const roleSelect = document.getElementById("roleSelect").value.trim();
  const photoInput = document.getElementById("photoInput").value.trim();
  const emailInput = document.getElementById("emailInput").value.trim();
  const phoneInput = document.getElementById("phoneInput").value.trim();

  let divContainCard = document.createElement("div");
  divContainCard.className = "divContainCard";

  let cardPhoto = document.createElement("img");
  cardPhoto.src = photoInput || "./assets/avatar.png";
  cardPhoto.className = "cardPhoto";
  divContainCard.appendChild(cardPhoto);

  let nameAndRoleContainer = document.createElement("div");
  nameAndRoleContainer.className = "nameAndRoleContainer";
  divContainCard.appendChild(nameAndRoleContainer);

  let cardName = document.createElement("p");
  cardName.textContent = nameInput;
  nameAndRoleContainer.appendChild(cardName);

  let roleAndIconContainer = document.createElement("div");
  roleAndIconContainer.className = "roleAndIconContainer"
  nameAndRoleContainer.appendChild(roleAndIconContainer);

  let cardRole = document.createElement("p");
  cardRole.textContent = roleSelect;
  cardRole.className = "cardRole"
  roleAndIconContainer.appendChild(cardRole);

  let moreIcon = document.createElement("img");
  moreIcon.src = "./assets/More.png";
  moreIcon.className = "moreIcon"
  roleAndIconContainer.appendChild(moreIcon);


  nonEffectueContainer.appendChild(divContainCard);
  console.log(nonEffectueContainer);
  //===> cart object
  let cardObject = {
    name: nameInput,
    role: roleSelect,
    photo: photoInput,
    email: emailInput,
    phone: phoneInput,
    experience: experienceArray,
    zone: null
  }
  console.log("thaat", cardObject);
  //====> push to the no effectue array
  nonEffectueArray.push(cardObject);
  console.log("this is the array ", nonEffectueArray);
  //=====> more Icon click
  moreIcon.addEventListener("click", function () {
    openMoreInfoModal(cardObject);
  });

  //====> clear the inputs
  document.getElementById("nameInput").value = "";
  document.getElementById("roleSelect").value = "";
  document.getElementById("photoInput").value = "";
  document.getElementById("emailInput").value = "";
  document.getElementById("phoneInput").value = "";
  document.getElementById("expList").innerHTML = "";

  document.getElementById("expJob").value = "";
  document.getElementById("expCompany").value = "";
  document.getElementById("expYears").value = "";

  //====> close the big form
  bigModal.classList.add("hideModel");

})

for (let i = 0; i < rooms.length; i++) {

  let room = rooms[i];
  let plusButton = room.querySelector(".selectIcon");
  console.log("hado les plus button", plusButton);

  plusButton.addEventListener("click", function () {
    //==> affichage dyal popup avec remove HidePopup class
    assignPopup.classList.remove("hidePopup");
    //===> clear popup
    popupList.innerHTML = "";
    //==> kol room b role dyalha f array lfo9 msatfin bnafs indice number
    let roomRole = roomRoles[i];

    //===> boucle pour affichi les carts
    for (let j = 0; j < nonEffectueArray.length; j++) {
      let worker = nonEffectueArray[j];
      //==> condition pour filtre
      if (worker.zone === null && roomRole.includes(worker.role)) {
        //==> creation d'affichage div
        let workerDiv = document.createElement("div");
        workerDiv.className = "divContainCard"
        workerDiv.innerHTML = `
           <img class="cardPhotoInsideRoom" src="${worker.photo || './assets/avatar.png'}">
            <div class="nameAndRoleContainerInsideRoom">
                <p class="cardNameInsideRoom">${worker.name}</p>
                <div class="roleAndIconContainer">
                  <p class="cardRoleInsideRoom">${worker.role}</p>
                  <img src="./assets/More.png" class="moreIcon">
                </div>
            </div>
        `;
        popupList.appendChild(workerDiv);


        workerDiv.addEventListener("click", function () {
          let roomContainer = room.querySelector(".effectWorkersContainer");
          let workerCard = document.createElement("div");
          workerCard.className = "divContainCardInsideRoom";
          workerCard.innerHTML =
            `
              <img class="cardPhotoInsideRoom" src="${worker.photo || './assets/avatar.png'}">
              <div class="nameAndRoleContainerInsideRoom">
              <div class = "NameAndXInsideRoom">
                <p class="cardNameInsideRoom">${worker.name}</p>
                <span id="closeMoreInfo" class="closeBtnInsideRoom">X</span>
              </div>
              <div class="roleAndIconContainer">
                  <p class="cardRoleInsideRoom">${worker.role}</p>
                  <img src="./assets/More.png" class="moreIcon">
              </div>
            </div>
           `;
          roomContainer.appendChild(workerCard);
          /////==========>>>>>>>>>>> l click 3la supprimer cart on the room
          const closeBtn = workerCard.querySelector(".closeBtnInsideRoom");
          closeBtn.addEventListener("click", function () {

            workerCard.remove();
            worker.zone = null;
            ////nradoh lel array dyal non effectuer workers
            if (!nonEffectueArray.includes(worker)) {
              nonEffectueArray.push(worker);
            }
            console.log("lat", nonEffectueArray);

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
            nameAndRoleContainer.appendChild(cardName);

            let roleAndIconContainer = document.createElement("div");
            roleAndIconContainer.className = "roleAndIconContainer"
            nameAndRoleContainer.appendChild(roleAndIconContainer);

            let cardRole = document.createElement("p");
            cardRole.textContent = worker.role;
            cardRole.className = "cardRole"
            roleAndIconContainer.appendChild(cardRole);

            let moreIcon = document.createElement("img");
            moreIcon.src = "./assets/More.png";
            moreIcon.className = "moreIcon"
            roleAndIconContainer.appendChild(moreIcon);

            // add event listener l moreIcon
            moreIcon.addEventListener("click", function () {
              openMoreInfoModal(worker);
            });

            nonEffectueContainer.appendChild(divContainCard);
          });
          ///====> more info inside rooms
          const roomMoreIcon = workerCard.querySelector(".moreIcon");
          roomMoreIcon.addEventListener("click", function () {
            openMoreInfoModal(worker);
          });

          worker.zone = i;
          let indexNonEffectue = nonEffectueArray.indexOf(worker);
          console.log("hada howa index", indexNonEffectue);
          if (indexNonEffectue > -1) {
            nonEffectueArray.splice(indexNonEffectue, 1);
          }
          console.log("check the array", nonEffectueArray);


          //===> remove from no effectue liste
          let sidebarCards = nonEffectueContainer.querySelectorAll(".divContainCard");
          for (let i = 0; i < sidebarCards.length; i++) {
            let div = sidebarCards[i];
            let name = div.querySelector("p").textContent;
            console.log("this this thisss ", name);
            if (name === worker.name) {
              div.remove();
            }
          }
          assignPopup.classList.add("hidePopup");
        })
      }
    }
  });
}
fermerPopup.addEventListener("click", function () {
  assignPopup.classList.add("hidePopup");
})


//=====> more Info popup
function openMoreInfoModal(data) {
  document.getElementById("moreInfoPhoto").src = data.photo || "./assets/avatar.png";
  document.getElementById("moreInfoName").textContent = data.name;
  document.getElementById("moreInfoRole").textContent = "Role : " + data.role;
  document.getElementById("moreInfoEmail").textContent = "Email : " + data.email;
  document.getElementById("moreInfoPhone").textContent = "Phone : " + data.phone;
  const expContainer = document.getElementById("moreInfoExpList");
  expContainer.innerHTML = "";
  data.experience.forEach(exp => {
    let item = document.createElement("div");
    item.textContent = `${exp.jobName} — ${exp.companyName} (${exp.periode})`;
    expContainer.appendChild(item);
  });

  document.getElementById("moreInfoModal").classList.remove("hidePopup");
}
let closeMoreInfo = document.getElementById("closeMoreInfo");
closeMoreInfo.addEventListener("click", function () {
  document.getElementById("moreInfoModal").classList.add("hidePopup");
});


