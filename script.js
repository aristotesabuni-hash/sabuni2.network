// Fonction pour mettre à jour le Total Général de la facture
function actualiserTotalFacture() {
    let table = document.getElementById("tbodyAchat");
    let totalCaisse = 0;
    
    for (let i = 0; i < table.rows.length; i++) {
        // On récupère la valeur de la colonne "Total" (index 4)
        let valeurLigne = table.rows[i].cells[4].innerText.replace(' $', '');
        totalCaisse += parseFloat(valeurLigne);
    }
    
    document.getElementById("grandTotalDisplay").innerHTML = "Total Général : " + totalCaisse.toFixed(2) + " $";
}

function ajouterAuPanier() {
    const marque = document.getElementById('marqueAchat').value;
    const produit = document.getElementById('nomProduitAchat').value;
    const qte = document.getElementById('qteAchat').value;
    const prix = document.getElementById('prixUnitAchat').value;

    if (produit.trim() === "" || qte === "" || prix === "") {
        alert("Veuillez remplir les champs obligatoires !");
        return;
    }

    const totalLigne = (parseFloat(qte) * parseFloat(prix)).toFixed(2);
    const tableBody = document.getElementById('tbodyAchat');

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${marque || "-"}</td>
        <td>${produit}</td>
        <td>${qte}</td>
        <td>${parseFloat(prix).toFixed(2)} $</td>
        <td>${totalLigne} $</td>
        <td>
            <button class="btn-edit" onclick="modifierLigne(this)">Modifier</button>
            <button class="btn-delete" onclick="supprimerLigne(this)">Supprimer</button>
        </td>
    `;

    tableBody.appendChild(row);
    
    // On vide les champs
    document.getElementById('marqueAchat').value = "";
    document.getElementById('nomProduitAchat').value = "";
    document.getElementById('qteAchat').value = "";
    document.getElementById('prixUnitAchat').value = "";

    actualiserTotalFacture();
}

function supprimerLigne(btn) {
    // Supprime la ligne
    btn.parentElement.parentElement.remove();
    // Recalcule le total
    actualiserTotalFacture();
}

function modifierLigne(btn) {
    const row = btn.parentElement.parentElement;
    
    // On récupère les données selon les nouveaux index (Marque est en 0)
    document.getElementById('marqueAchat').value = row.cells[0].innerText === "-" ? "" : row.cells[0].innerText;
    document.getElementById('nomProduitAchat').value = row.cells[1].innerText;
    document.getElementById('qteAchat').value = row.cells[2].innerText;
    document.getElementById('prixUnitAchat').value = row.cells[3].innerText.replace(' $', '');
    
    // On supprime la ligne et on actualise le total
    row.remove();
    actualiserTotalFacture();
}


function modifierAchat(btn) {
    const row = btn.parentElement.parentElement;
    
    document.getElementById('marqueAchat').value = row.cells[0].innerText !== "-" ? row.cells[0].innerText : "";
    document.getElementById('nomProduitAchat').value = row.cells[1].innerText;
    document.getElementById('qteAchat').value = row.cells[2].innerText;
    document.getElementById('prixUnitAchat').value = row.cells[3].innerText.replace(' $', '');
    
    row.remove();
}

function ajouterVente() {
    const client = document.getElementById('clientNom').value;
    const produit = document.getElementById('produitVente').value;
    const qte = document.getElementById('qteVente').value;
    const prix = document.getElementById('prixVente').value;

    if(produit.trim() === "" || qte === "" || prix === "") {
        alert("Veuillez remplir les informations du produit, quantité et prix !");
        return;
    }

    const total = (parseFloat(qte) * parseFloat(prix)).toFixed(2);
    const tableBody = document.getElementById('tbodyVente');

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${client === "" ? "Client Anonyme" : client}</td>
        <td>${produit}</td>
        <td>${qte}</td>
        <td>${parseFloat(prix).toFixed(2)} $</td>
        <td><strong>${total} $</strong></td>
        <td>
            <button class="btn-edit" onclick="modifierVente(this)">Modifier</button>
            <button class="btn-delete" onclick="this.parentElement.parentElement.remove()">Supprimer</button>
        </td>
    `;

    tableBody.appendChild(row);

    // Vider les champs produits mais garder le client (au cas où il achète plusieurs articles)
    document.getElementById('produitVente').value = "";
    document.getElementById('qteVente').value = "";
    document.getElementById('prixVente').value = "";
}

function modifierVente(btn) {
    const row = btn.parentElement.parentElement;
    
    document.getElementById('clientNom').value = row.cells[0].innerText;
    document.getElementById('produitVente').value = row.cells[1].innerText;
    document.getElementById('qteVente').value = row.cells[2].innerText;
    document.getElementById('prixVente').value = row.cells[3].innerText.replace(' $', '');
    
    row.remove();
}

function imprimerFacture() {
    // On peut ajouter un titre dynamique avant d'imprimer
    const numFact = document.getElementById('numFacture').value;
    const client = document.getElementById('nomFournisseur').value;
    
    if (numFact === "") {
        alert("Veuillez saisir un numéro de facture avant d'imprimer.");
        return;
    }

    // Lance la fenêtre d'impression du navigateur
    window.print();
}


// Initialiser la date du jour et l'échéance au chargement
window.onload = function() {
    let today = new Date().toISOString().split('T')[0];
    if(document.getElementById('dateCmd')){
        document.getElementById('dateCmd').value = today;
        majEcheance();
    }
};

function majEcheance() {
    let dateCmd = new Date(document.getElementById('dateCmd').value);
    if (!isNaN(dateCmd.getTime())) {
        // Ajouter 10 jours
        dateCmd.setDate(dateCmd.getDate() + 10);
        
        // Formater la date en JJ/MM/AAAA pour l'affichage
        let jour = ("0" + dateCmd.getDate()).slice(-2);
        let mois = ("0" + (dateCmd.getMonth() + 1)).slice(-2);
        let annee = dateCmd.getFullYear();
        
        document.getElementById('dateEcheance').value = `${jour}/${mois}/${annee}`;
    }
}


// Au chargement, on met la date du jour et on calcule +10 jours
window.addEventListener('load', () => {
    if(document.getElementById('dateCmd')) {
        let today = new Date().toISOString().split('T')[0];
        document.getElementById('dateCmd').value = today;
        majEcheance();
    }
});

function majEcheance() {
    let dateSaisie = document.getElementById('dateCmd').value;
    if(dateSaisie) {
        let d = new Date(dateSaisie);
        d.setDate(d.getDate() + 10); // Ajout des 10 jours
        
        let jour = ("0" + d.getDate()).slice(-2);
        let mois = ("0" + (d.getMonth() + 1)).slice(-2);
        let annee = d.getFullYear();
        document.getElementById('dateEcheance').value = `${jour}/${mois}/${annee}`;
    }
}


// Initialisation au chargement
window.onload = function() {
    let dateInput = document.getElementById('dateCmd');
    if(dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
        majEcheance();
    }
};

// Calcul +10 jours
function majEcheance() {
    let dateCmd = new Date(document.getElementById('dateCmd').value);
    if (!isNaN(dateCmd.getTime())) {
        dateCmd.setDate(dateCmd.getDate() + 10);
        let jour = ("0" + dateCmd.getDate()).slice(-2);
        let mois = ("0" + (dateCmd.getMonth() + 1)).slice(-2);
        let annee = dateCmd.getFullYear();
        document.getElementById('dateEcheance').value = `${jour}/${mois}/${annee}`;
    }
}

function ajouterLigneCommande() {
    const marque = document.getElementById('marqueCmd').value;
    const produit = document.getElementById('prodCmd').value;
    const qte = document.getElementById('qteCmd').value;
    const prix = document.getElementById('prixCmd').value;

    if (produit === "" || qte <= 0 || prix === "") {
        alert("Veuillez remplir les champs !");
        return;
    }

    const total = (parseFloat(qte) * parseFloat(prix)).toFixed(2);
    const tableBody = document.getElementById('tbodyCommande');

    const row = document.createElement('tr');
    row.innerHTML = `
        <td style="padding:12px;">${marque || "-"}</td>
        <td style="padding:12px;">${produit}</td>
        <td style="padding:12px;">${qte}</td>
        <td style="padding:12px;">${parseFloat(prix).toFixed(2)} $</td>
        <td style="padding:12px;"><strong>${total} $</strong></td>
        <td style="padding:12px;"><button onclick="this.parentElement.parentElement.remove(); calculerTotal();" style="color:red; cursor:pointer; border:none; background:none;">Supprimer</button></td>
    `;
    tableBody.appendChild(row);
    calculerTotal();
}

function calculerTotal() {
    let table = document.getElementById("tbodyCommande");
    let total = 0;
    for (let i = 0; i < table.rows.length; i++) {
        let val = table.rows[i].cells[4].innerText.replace(' $', '');
        total += parseFloat(val);
    }
    document.getElementById("totalCommandeDisplay").innerText = "Total Général : " + total.toFixed(2) + " $";
}

let soldeGeneral = 0; // Variable globale pour suivre l'argent total

function enregistrerOperation() {
    const article = document.getElementById('articleCaisse').value;
    const flux = document.getElementById('fluxCaisse').value;
    const qte = parseFloat(document.getElementById('qteCaisse').value);
    const pu = parseFloat(document.getElementById('puCaisse').value);
    
    if (article === "" || isNaN(qte) || isNaN(pu)) {
        alert("Veuillez remplir tous les champs de l'article !");
        return;
    }

    const montantTotalLigne = qte * pu;
    const dateJour = new Date().toLocaleDateString('fr-FR');

    // Mise à jour du solde général
    if (flux === "ENTREE") {
        soldeGeneral += montantTotalLigne;
    } else {
        soldeGeneral -= montantTotalLigne;
    }

    // Ajout de la ligne dans le tableau
    const tableBody = document.getElementById('tbodyCaisse');
    const row = document.createElement('tr');
    
    // Style de couleur selon le flux
    const couleurClasse = (flux === "ENTREE") ? "color: #27ae60;" : "color: #e74c3c;";
    const signe = (flux === "ENTREE") ? "+" : "-";

    row.innerHTML = `
        <td style="padding: 12px;">${dateJour}</td>
        <td style="padding: 12px;">${article} (x${qte})</td>
        <td style="padding: 12px; font-weight: bold; ${couleurClasse}">${flux}</td>
        <td style="padding: 12px; font-weight: bold; ${couleurClasse}">${signe} ${montantTotalLigne.toFixed(2)} $</td>
        <td style="padding: 12px; font-weight: bold;">${soldeGeneral.toFixed(2)} $</td>
        <td style="padding: 12px;"><button onclick="supprimerMouvement(this, ${montantTotalLigne}, '${flux}')" style="border:none; background:none; color:red; cursor:pointer;">Annuler</button></td>
    `;

    tableBody.prepend(row); // Ajoute en haut du tableau (plus récent en premier)
    
    // Mise à jour de l'affichage du gros solde
    document.getElementById('soldeCaisseDisplay').innerText = soldeGeneral.toFixed(2) + " $";

    // Vider les champs pour l'article suivant
    document.getElementById('articleCaisse').value = "";
    document.getElementById('puCaisse').value = "";
    document.getElementById('articleCaisse').focus();
}

function supprimerMouvement(btn, montant, flux) {
    if (flux === "ENTREE") {
        soldeGeneral -= montant;
    } else {
        soldeGeneral += montant;
    }
    document.getElementById('soldeCaisseDisplay').innerText = soldeGeneral.toFixed(2) + " $";
    btn.parentElement.parentElement.remove();
}


// Initialisation des totaux au début du fichier
let sommeDebit = 0;
let sommeCredit = 0;

function ajouterEcriture() {
    console.log("Tentative d'ajout d'écriture..."); // Pour vérifier si la fonction est appelée

    // 1. Récupération des éléments
    const dateInput = document.getElementById('dateCompta');
    const compteInput = document.getElementById('numCompte');
    const libelleInput = document.getElementById('libelleCompta');
    const debitInput = document.getElementById('debitCompta');
    const creditInput = document.getElementById('creditCompta');
    const tableBody = document.getElementById('tbodyCompta');

    // 2. Vérification si les champs existent
    if (!dateInput || !compteInput || !tableBody) {
        console.error("Erreur : Certains IDs sont introuvables dans le HTML !");
        return;
    }

    // 3. Extraction des valeurs
    const date = dateInput.value;
    const compte = compteInput.value;
    const libelle = libelleInput.value;
    const debit = parseFloat(debitInput.value) || 0;
    const credit = parseFloat(creditInput.value) || 0;

    // 4. Validation simple
    if (date === "" || compte === "" || libelle === "") {
        alert("⚠️ Veuillez remplir la Date, le N° de Compte et le Libellé.");
        return;
    }

    if (debit === 0 && credit === 0) {
        alert("⚠️ Veuillez saisir un montant au Débit ou au Crédit.");
        return;
    }

    // 5. Création de la ligne dans le tableau
    const row = document.createElement('tr');
    row.innerHTML = `
        <td style="padding: 12px;">${date}</td>
        <td style="padding: 12px;"><strong>${compte}</strong></td>
        <td style="padding: 12px;">${libelle}</td>
        <td style="padding: 12px; text-align: right;">${debit > 0 ? debit.toFixed(2) + " $" : "-"}</td>
        <td style="padding: 12px; text-align: right;">${credit > 0 ? credit.toFixed(2) + " $" : "-"}</td>
        <td style="padding: 12px; text-align: center;">
            <button onclick="supprimerEcriture(this, ${debit}, ${credit})" style="color:red; border:none; background:none; cursor:pointer;">Supprimer</button>
        </td>
    `;

    tableBody.appendChild(row);

    // 6. Mise à jour des totaux globaux
    sommeDebit += debit;
    sommeCredit += credit;
    
    // Appel de la fonction de mise à jour de l'affichage
    actualiserTotauxAffichage();

    // 7. Nettoyage des champs pour la ligne suivante
    compteInput.value = "";
    libelleInput.value = "";
    debitInput.value = "";
    creditInput.value = "";
    compteInput.focus();
}

function actualiserTotauxAffichage() {
    const tdDebit = document.getElementById('totalDebit');
    const tdCredit = document.getElementById('totalCredit');
    const alerte = document.getElementById('alerteEquilibre');

    if (tdDebit) tdDebit.innerText = sommeDebit.toFixed(2) + " $";
    if (tdCredit) tdCredit.innerText = sommeCredit.toFixed(2) + " $";

    if (alerte) {
        alerte.style.display = "block";
        if (sommeDebit.toFixed(2) === sommeCredit.toFixed(2)) {
            alerte.innerText = "✅ Journal équilibré";
            alerte.style.backgroundColor = "#d4edda";
            alerte.style.color = "#155724";
        } else {
            alerte.innerText = "⚠️ Journal déséquilibré";
            alerte.style.backgroundColor = "#f8d7da";
            alerte.style.color = "#721c24";
        }
    }
}

function supprimerEcriture(btn, d, c) {
    sommeDebit -= d;
    sommeCredit -= c;
    btn.parentElement.parentElement.remove();
    actualiserTotauxAffichage();
}


// Simuler une liste d'utilisateurs
function creerUtilisateur() {
    const nom = document.getElementById('userName').value;
    const login = document.getElementById('userLogin').value;
    const pass = document.getElementById('userPass').value;

    if(nom === "" || login === "" || pass === "") {
        alert("Remplissez tous les champs !");
        return;
    }

    const table = document.getElementById('tbodyUsers');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td style="padding:10px;">${nom}</td>
        <td style="padding:10px;">${login}</td>
        <td style="padding:10px;"><span style="background:#d1ecf1; padding:3px 8px; border-radius:10px; font-size:12px;">Vendeur</span></td>
        <td style="padding:10px;"><button onclick="this.parentElement.parentElement.remove()" style="color:red; border:none; background:none; cursor:pointer;">Supprimer</button></td>
    `;
    table.appendChild(row);
    
    // Reset
    document.getElementById('userName').value = "";
    document.getElementById('userLogin').value = "";
    document.getElementById('userPass').value = "";
}

// Fonction de protection pour supprimer les articles
function nettoyerArticles() {
    const confirmation = prompt("⚠️ Attention ! Tapez votre mot de passe ADMIN pour tout supprimer :");
    
    if (confirmation === "admin123") { // Mot de passe de test
        alert("Base de données réinitialisée avec succès.");
        // Ici, tu ajouteras ton code pour vider la table PRODUIT
    } else {
        alert("Mot de passe incorrect. Action annulée.");
    }
}


// 1. Tes données (on simule quelques produits pour commencer)
let monInventaire = JSON.parse(localStorage.getItem('monStock')) || [
    { nom: "Panneau Solaire 200W", quantite: 15 },
    { nom: "Batterie Gel 100Ah", quantite: 8 },
    { nom: "Inverteur 1KVA", quantite: 5 }
];

// 2. La fonction qui remplit le tableau HTML
function afficherLeStock() {
    const tableau = document.getElementById('corps-tableau-stock');
    if(!tableau) return;

    // On vide le tableau avant de le redessiner
    tableau.innerHTML = "";

    monInventaire.forEach((produit) => {
        // Déterminer la couleur selon la quantité (Alerte si stock bas)
        let couleur = produit.quantite < 5 ? "red" : "green";

        // Création de la ligne (TR)
        let ligne = `
            <tr>
                <td>${produit.nom}</td>
                <td style="font-weight: bold;">${produit.quantite}</td>
                <td style="color: ${couleur}; font-weight: bold;">
                    ${produit.quantite < 5 ? "Réapprovisionner" : "En Stock"}
                </td>
            </tr>
        `;
        tableau.innerHTML += ligne;
    });
}

// 3. Lancer l'affichage au chargement de la page
window.onload = afficherLeStock;


document.getElementById('productSearch').addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll('.swiver-table tbody tr');

    rows.forEach(row => {
        // On cherche dans la colonne Référence (index 2) et Libellé (index 3)
        let ref = row.cells[2].textContent.toLowerCase();
        let name = row.cells[3].textContent.toLowerCase();
        
        if (ref.includes(filter) || name.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});