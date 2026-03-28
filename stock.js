// Dans ta boucle forEach :
let statutClass = produit.quantite < 5 ? "stock-bas" : "stock-ok";
let statutTexte = produit.quantite < 5 ? "Alerte" : "Disponible";

let ligne = `
    <tr>
        <td>${produit.nom}</td>
        <td><strong>${produit.quantite}</strong></td>
        <td><span class="badge ${statutClass}">${statutTexte}</span></td>
        <td>
            <button class="btn-action btn-achat" onclick="enregistrerAchat('${produit.nom}', 1)">+1</button>
            <button class="btn-action btn-vente" onclick="enregistrerVente('${produit.nom}', 1)">-1</button>
        </td>
    </tr>
`;