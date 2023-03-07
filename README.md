<div align="center">
    <img src="https://i.ibb.co/rdDQQSb/kta.gif" loop autoplay><br>
    <a href="https://discord.gg/dystopia-tylezia">
    <img src="https://img.shields.io/discord/932030929621368862?color=%236a329f&label=Dystopia&logo=Dystopia&logoColor=%236a329f&style=plastic">
    </a><br>
<i><b>metamob.api</b> est un package npm dédié à la gestion des monstres pour la quête du dofus ocre dans le jeu en ligne Dofus. Il fournit toutes les fonctionnalités nécessaires pour récupérer les données de monstres, telles que leurs noms, niveaux, types, emplacements, etc., à partir de l'API Metamob. Ce package est conçu pour simplifier la gestion des données de monstres pour les joueurs de Dofus qui cherchent à compléter la quête du dofus ocre, en leur offrant une solution clé en main pour récupérer ces données via l'API Metamob</i>.
<br><br>    
</div>

# ⚙ Installation
1. `npm install metamob.api`

# ✨ Utilisation
1. Commencez par renseigner la clé API fourni par [metamob](https://metamob.fr/utilisateur/mon_profil#)<br>
```js
const MetamobAPI = require("metamob.api");

MetamobAPI.config("clé_api_metamob");
```
![](https://i.ibb.co/1nNMDRN/image-2023-02-24-112015649.png)
2. Liste des appels possibles :<br>
| **Appel** | **Options** | **Description** |
| --- | --- | --- |
| **`MetamobAPI.config()`** | `APIKey` _Clé API metamob_ | Sauvegarde la clé API du développeur pour le dossier. |
| **`MetamobAPI.GET.user()`** | `pseudo` _Pseudo de l'utilisateur_ | Récupère les informations d'un utilisateur. Non sensible à la casse. |
| **`MetamobAPI.GET.userMonsters()`** | `pseudo` _Pseudo de l'utilisateur_<br>`monstre` _Le nom du monstre à filtrer_<br>`etape` _L'étape sur laquelle filtrer_<br>`type` _Le type de monstre à afficher_<br>`quantite` _Pour n'afficher que les monstres dont l'utilisateur possède la quantité indiquée_ | Récupère les monstres d'un utilisateur. Le nom d'utilisateur n'est pas sensible à la casse. |
| **`MetamobAPI.GET.monsters()`** | `monstre` _Le nom du monstre à filtrer_<br>`etape` _L'étape sur laquelle filtrer_<br>`type` _Le type de monstre à afficher_ | Récupère les monstres. |
| **`MetamobAPI.GET.servers()`** | `nom` _Le nom du serveur_ | Récupère les serveurs. |
| **`MetamobAPI.GET.kralamoures()`** | `serveur` _Le nom du serveur à filtrer_<br>`date_debut` _La date de début du filtrage, au format YYYY-MM-DD_<br>`date_fin` _La date de fin du filtrage, au format YYYY-MM-DD_ | Récupère les kralamoures. |
| **`MetamobAPI.GET.zones()`** | `nom` _Le nom de la zone à filtrer_ | Récupère les zones. |
| **`MetamobAPI.GET.souszones()`** | `zone` _La zone avec laquelle filtrer les résultats_<br>`nom` _Le nom de la sous-zone à filtrer_ | Récupère les zones. |
| **`MetamobAPI.PUT.userMonsters()`** | `pseudo_utilisateur` _Pseudo de l'utilisateur_<br>`clé_unique_utilisateur` _Identifiant unique de l'utilisateur_<br>`data` _Monstres, quantités, états_ | Met à jour les informations de monstre d'un compte utilisateur. |
| **`MetamobAPI.PUT.userReset()`** | `pseudo_utilisateur` _Pseudo de l'utilisateur_<br>`clé_unique_utilisateur` _Identifiant unique de l'utilisateur_ | Réinitialise les monstres sur le compte. Cela signifie que toutes les informations relatives aux monstres seront supprimées !<br>Les monstres seront mis à l'état aucun (ni recherché ni proposé), avec une quantité nulle (0). |

# 👀 Exemples
```js
const MetamobAPI = require("metamob.api");

MetamobAPI.config("Clé_API_Metamob");// Sauvegarde la clé API du développeur pour ce dossier.

MetamobAPI.GET.user("Popop").then(data => console.log(data)); // Récupère les informations d'un utilisateur. Non sensible à la casse.

MetamobAPI.GET.userMonsters("Popop", null, 20, null, ">1").then(data => console.log(data)); // Renvoi la liste de tout les monstres de l'étape 20 que l'utilisateur possède en + de 1 exemplaire

MetamobAPI.GET.monsters(null, 20).then(data => console.log(data)); // Renvoi la liste des monstres de l'étape 20

MetamobAPI.GET.servers("Tylezia").then(data => console.log(data));

MetamobAPI.GET.kralamoures("Tylezia", null, "2023-12-31").then(data => console.log(data)); // Renvoi la liste des ouvertures prévues sur le serveur Tylezia entre la date du jour et le 31 décembre 2023

MetamobAPI.GET.zones().then(data => console.log(data)); // Renvoi la liste de toutes les zones

MetamobAPI.GET.souszones(null, "Village des Dopeuls").then(data => console.log(data)); // Renvoi les informations de la souszone Village des Dopeuls

MetamobAPI.PUT.userMonsters("Popop", "Clé_unique_utilisateur", [
    { monstre:"Arakne", quantite:"-2", etat:"recherche" },
    { monstre:"Porsalé le Râleur", quantite:"3" },
    { monstre:"Abraknyde ancestral", quantite:"+5", etat:"propose" },
]).then(data => console.log(data));
// La quantité du mon Arakne sera décrémenter de 2 et l'état passera à recherché.
// La quantité du monstre Porsalé le Râleur passera à 3.
// La quantité du monstre Abraknyde ancestral sera incrémenter de 5 et l'état passera à proposé.

MetamobAPI.PUT.resetUserMonsters("Popop", "Clé_unique_utilisateur").then(data => console.log(data))
// Réinitialise les monstres sur le compte. Cela signifie que toutes les informations relatives aux monstres seront supprimées !
// Les monstres seront mis à l'état aucun (ni recherché ni proposé), avec une quantité nulle (0).
```