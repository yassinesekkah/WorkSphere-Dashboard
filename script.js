const experienceOpenButton = document.getElementById("experienceOpenFormButton");
const bigModal = document.querySelector(".modal");
const experienceForm = document.getElementById("experienceForm");
const openForm = document.querySelector(".ajouterButton");
const cancelButtonForm = document.getElementById("cancelButtonForm");
const ajouterButtonForm = document.getElementById("ajouterButtonForm");

const nonEffectueContainer = document.getElementById("nonEffeContain");
let nonEffectueArray = [];
let experienceArray = [];

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
    expId : expId,
    jobName : job,
    companyName : company,
    periode : years
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
  experienceArray =  experienceArray.filter(exp => exp.expId !== id);
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

  let cardRole = document.createElement("p");
  cardRole.textContent = roleSelect;
  cardRole.className = "cardRole"
  nameAndRoleContainer.appendChild(cardRole);

  nonEffectueContainer.appendChild(divContainCard);
  //===> cart object
  let cardObject = {
    name: nameInput,
    role: roleSelect,
    photo: photoInput,
    email: emailInput,
    phone: phoneInput,
    experience :experienceArray
  }
  console.log("thaat", cardObject);
  //====> push to the no effectue array
  nonEffectueArray.push(cardObject);
  console.log("this is the array ", nonEffectueArray);

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

