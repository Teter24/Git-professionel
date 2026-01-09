
const produits = [
  { id: 1, nom: "Nike Air Max", categorie: "Homme", ancienPrix: 150, nouveauPrix: 99 },
  { id: 2, nom: "Nike Dunk Low", categorie: "Femme", ancienPrix: 120, nouveauPrix: 79 },
  { id: 3, nom: "Nike Pegasus", categorie: "Homme", ancienPrix: 140, nouveauPrix: 89 },
  { id: 4, nom: "Nike Revolution", categorie: "Enfant", ancienPrix: 70, nouveauPrix: 49 },
];

function calculerReduction(p) {
  const reduction = ((p.ancienPrix - p.nouveauPrix) / p.ancienPrix) * 100;
  return Math.round(reduction);
}

function afficherProduits(liste) {
  const container = document.getElementById("liste-produits");
  if (!container) return;

  if (liste.length === 0) {
    container.innerHTML = `<p>Aucun produit ne correspond à vos filtres.</p>`;
    return;
  }

  container.innerHTML = liste
    .map((p) => {
      const reduc = calculerReduction(p);
      return `
        <article class="produit">
          <h2>${p.nom}</h2>
          <p class="ancien-prix">${p.ancienPrix} €</p>
          <p class="nouveau-prix">${p.nouveauPrix} €</p>
          <span class="badge">-${reduc}%</span>
        </article>
      `;
    })
    .join("");
}

function appliquerFiltres() {
  const selectCategorie = document.getElementById("filtre-categorie");
  const selectTri = document.getElementById("tri-prix");

  const categorieChoisie = selectCategorie ? selectCategorie.value : "Toutes";
  const triChoisi = selectTri ? selectTri.value : "croissant";

  let resultat = [...produits];
  if (categorieChoisie !== "Toutes") {
    resultat = resultat.filter((p) => p.categorie === categorieChoisie);
  }

  resultat.sort((a, b) => {
    if (triChoisi === "croissant") return a.nouveauPrix - b.nouveauPrix;
    return b.nouveauPrix - a.nouveauPrix;
  });

  afficherProduits(resultat);
}


document.addEventListener("DOMContentLoaded", () => {
  afficherProduits(produits);

  const selectCategorie = document.getElementById("filtre-categorie");
  const selectTri = document.getElementById("tri-prix");

  if (selectCategorie) selectCategorie.addEventListener("change", appliquerFiltres);
  if (selectTri) selectTri.addEventListener("change", appliquerFiltres);
});
