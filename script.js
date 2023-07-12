const motE1 = document.getElementById("mot");
const mauvaisesLettres = document.getElementById("mauvaiselettres");
const rejouerBtn = document.getElementById("play-bouton");
const popup = document.getElementById("popup-content");
const notification = document.getElementById("notification-content");
const messageFinal = document.getElementById("message-final");

const figurePart = document.querySelectorAll(".figure-part");

const mots = [
  "chorizo",
  "chocolat",
  "pizza",
  "voiture",
  "lunettes",
  "Egypte",
  "Diagramme",
  "Exaspérer",
  "Inclinaison",
  "Immersion",
  "Députés",
  "Propagation",
  "Soutien",
  "Drapeau",
  "Boisson",
];

let motSelectionne = mots[Math.floor(Math.random() * mots.length)];

const bonnesLettresArr = [];
const mauvaisesLettresArr = [];

let jeuTermine = false; // Variable pour stocker l'état du jeu

function afficherMot() {
  motE1.innerHTML = `
        ${motSelectionne
          .split("")
          .map(
            (lettre) => `
                    <span class="lettre">
                        ${bonnesLettresArr.includes(lettre) ? lettre : ""}
                    </span>
                `
          )
          .join("")}
    `;

  const motInterne = motE1.innerText.replace(/\n/g, "");

  if (motInterne === motSelectionne) {
    jeuTermine = true;
    setTimeout(() => {
      messageFinal.innerText = "Bravo tu as gagné!";
      popup.style.display = "flex";
    }, 500); // Délai de 2 secondes (20000 millisecondes)
  }
}

function updateMauvaisesLettresE1() {
  mauvaisesLettres.innerHTML = `
        ${mauvaisesLettresArr.map((lettre) => `<span>${lettre}</span> `)}
    `;

  figurePart.forEach((part, index) => {
    const erreurs = mauvaisesLettresArr.length;

    if (index < erreurs) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (mauvaisesLettresArr.length === figurePart.length) {
    messageFinal.innerText = "Tu as perdu !";
    popup.style.display = "flex";
  }
}

function afficherNotification() {
  notification.classList.add("afficher");

  setTimeout(() => {
    notification.classList.remove("afficher");
  }, 2000);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const lettre = e.key;

    if (motSelectionne.includes(lettre)) {
      if (!bonnesLettresArr.includes(lettre)) {
        bonnesLettresArr.push(lettre);
        afficherMot();
      } else {
        afficherNotification();
      }
    } else {
      if (!mauvaisesLettresArr.includes(lettre)) {
        mauvaisesLettresArr.push(lettre);
        updateMauvaisesLettresE1();
      } else {
        afficherNotification();
      }
    }
  }
});

rejouerBtn.addEventListener("click", () => {
  bonnesLettresArr.splice(0);
  mauvaisesLettresArr.splice(0);

  if (jeuTermine) {
    clearTimeout();
    jeuTermine = false;
  }

  motSelectionne = mots[Math.floor(Math.random() * mots.length)];

  afficherMot();
  updateMauvaisesLettresE1();

  popup.style.display = "none";
});

afficherMot();
