const experienceOpenButton = document.getElementById("experienceOpenFormButton");
const bigModal = document.querySelector(".modal");
const experienceForm = document.getElementById("experienceForm");
const openForm = document.querySelector(".ajouterButton");
const cancelButtonForm = document.getElementById("cancelButtonForm");
const ajouterButtonForm = document.getElementById("ajouterButtonForm");


const nonEffectueContainer = document.getElementById("nonEffeContain");
let nonEffectueArray = [];
///=====>>>> for open the big form <<<<=====\\\
openForm.addEventListener("click", function () {
  bigModal.classList.remove("hideModel")
})
///=====>>>> for close the big form <<<<=====\\\
cancelButtonForm.addEventListener("click", function () {
  bigModal.classList.add("hideModel")
})
///=====>>>> for toggle the experience form <<<<=====\\\
experienceOpenButton.addEventListener("click", function () {
  experienceForm.classList.toggle("showForm");
});

///=====>>>> for toggle the experience form <<<<=====\\\
function confirmExperience() {
  const job = document.getElementById("expJob").value;
  const company = document.getElementById("expCompany").value;
  const years = document.getElementById("expYears").value;

  if (!job || !company || !years) {
    alert("Veuillez remplir tous les champs de l'expérience.");
    return;
  }

  const expList = document.getElementById("expList");

  const wrapper = document.createElement("div");
  wrapper.className = "experienceItem";

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
  btn.parentElement.remove();
}

///=====>>>> for ajouter non effectue employes <<<<=====\\\
ajouterButtonForm.addEventListener("click", function () {
  /// big form input variable
  const nameInput = document.getElementById("nameInput").value.trim();
  const roleSelect = document.getElementById("roleSelect").value.trim();
  const photoInput = document.getElementById("photoInput").value.trim();
  const emailInput = document.getElementById("emailInput").value.trim();
  const phneInput = document.getElementById("phoneInput").value.trim();

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

  let cardRole = document.createElement("p");
  cardRole.textContent = roleSelect;
  cardRole.className = "cardRole"
  nameAndRoleContainer.appendChild(cardRole);

  nonEffectueContainer.appendChild(divContainCard);

})

