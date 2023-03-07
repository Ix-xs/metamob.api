/* eslint-disable no-async-promise-executor */

// Config APIKey && data monsters
const config = require("./private/config.json");
const monsters = require("./data/monsters.json");

// RateLimits function && Save
const isRateLimited = require("./controllers/isRateLimited");
const Save = require("./controllers/Save");

const MetamobAPI = {

	/**
     * Enregistre la clé API du developpeur pour le dossier en cours
     * @param {string} apiKey Clé API Metamob
     * @returns {Promise<string|void>} "✅ Clé API Metamob enregistrée."
     * @example
     * MetamobAPI.config("clé_api").then(response => console.log(response));
     */

	async config(apiKey) {

		return await new Promise((resolve, reject) => {

			try {
				config.APIKey = apiKey;
				Save("private/config.json");
				resolve("✅ Clé API Metamob enregistrée.");
			}

			catch (error) {
				reject(new Error(error));
			}

		});

	},

	GET:{

		/**
         * Récupère les informations d'un utilisateur. Non sensible à la casse.
         * @param {string} pseudo Pseudo de l'utilisateur.
         * @returns {Promise<{pseudo:string, contact:string, presentation:string, image:string, image_url:string, etape:number, serveur:string, derniere_connexion:Date, lien:string}|void>}
         * @example
         * MetamobAPI.GET.user("popop").then(data => console.log(data));
         */

		async user(pseudo) {

			return await new Promise(async (resolve, reject) => {

				try {

					if (!config.APIKey || config.APIKey === false) {
						reject(new Error("❌ Clé API non fournie, utilisez MetamobAPI.config(\"votre_clé_API\")."));
					}

					if (isRateLimited()) {
						reject(new Error("❌ Trop de requêtes effectuées en 1 minute. Les appels vers l'api de metamob sont limités à 60/minute max."));
					}

					const link = `https://api.metamob.fr/utilisateurs/${pseudo}`;

					const response = await fetch(link, {
						method:"GET",
						headers:{
							"HTTP-X-APIKEY":config.APIKey,
						},
					});

					const data = JSON.parse(JSON.stringify(await response.json()));

					resolve(data);

				}

				catch (error) {
					reject(error);
				}

			});

		},

		/**
		 * Récupère les monstres d'un utilisateur. Le nom d'utilisateur n'est pas sensible à la casse.
         * @param {string} pseudo Pseudo de l'utilisateur.
 		 * @param {"Arakne"|"Arakne malade"|"Boufton blanc"|"Boufton noir"|"Crabe"|"Flammèche air"|"Flammèche eau"|"Flammèche feu"|"Flammèche terre"|"Larve bleue"|"Moskito"|"Piou bleu"|"Piou jaune"|"Piou rose"|"Piou rouge"|"Piou vert"|"Piou violet"|"Souris grise"|"Tofu"|"Tofu maléfique"|"Arakne des égoûts"|"Bandit du clan des Roublards"|"Bandit manchot"|"Black tiwabbit"|"Bouftou"|"Boulanger sombre"|"Champ champ"|"Gelée bleue"|"Gelée menthe"|"Gobet"|"Kolérat"|"Kwoan"|"Larve orange"|"Larve verte"|"Pissenlit diabolique"|"Rose démoniaque"|"Tiwabbit"|"Tiwabbit kiafin"|"Tofu malade"|"Tournesol sauvage"|"Berger Porkass"|"Biblop coco"|"Biblop griotte"|"Biblop indigo"|"Biblop reinette"|"Boo"|"Champa vert"|"Chef de Guerre Bouftou"|"Cochon de Lait"|"Crowneille"|"Gob-trotteur"|"Milirat Strubien"|"Nodkoko"|"Prespic"|"Sanglier"|"Tikoko"|"Tortue Jaune"|"Trukikol"|"Vampire"|"Wabbit"|"Bambouto"|"Bwork Mage"|"Corbac"|"Croc Gland"|"Croc Gland enragé"|"Etoile de la Mer d'Asse"|"Floristile"|"Fourbasse"|"Larve Jaune"|"Maître Vampire"|"Milimulou"|"Minoskito"|"Noeul"|"Pichon Blanc"|"Pichon Bleu"|"Pichon Orange"|"Pichon Vert"|"Tortue Bleue"|"Tortue rouge"|"Tortue Verte"|"Abraknyde"|"Black Wabbit"|"Bwork"|"Bwork Archer"|"Chafer Invisible"|"Champa Bleu"|"Champa Marron"|"Champa Rouge"|"Craqueboule"|"Craqueleur"|"Dragodinde Amande Sauvage"|"Gargrouille"|"Gelée Fraise"|"Ishigro PakeKraméléhon"|"Mandrine"|"Mineur Sombre"|"Rose Obscure"|"Wabbit Squelette"|"Abrakne"|"Blop Coco"|"Blop Griotte"|"Blop Indigo"|"Blop Reinette"|"Boomba"|"Chafer"|"Chafer Fantassin"|"Cochon de Farle"|"Crocodaille"|"Pichon Kloune"|"Rib"|"Scarafeuille Blanc"|"Scarafeuille Bleu"|"Scarafeuille Rouge"|"Scarafeuille Vert"|"Scaratos"|"Scélérat Strubien"|"Scorbute"|"Tronknyde"|"Aboub"|"Akakwa"|"Amlub"|"Arakne Majeure"|"Bulbuisson"|"Cavalier Porkass"|"Codem"|"Crustorail Kouraçao"|"Crustorail Malibout"|"Crustorail Morito"|"Crustorail Passaoh"|"Dragodinde Rousse Sauvage"|"Forgeron Sombre"|"Gink"|"Grand Pa Wabbit"|"Kirevam"|"Let Emoliug"|"Nebgib"|"Nipul"|"Wo Wabbit"|"Abraknyde Vénérable"|"Chafer Archer"|"Chafer d'élite"|"Chafer Lancier"|"Craqueleur des plaines"|"DoK Alako"|"Fangshu"|"Gamino"|"Koalak Immature"|"Kokoko"|"La Ouassingue"|"Le Ouassingue"|"Le Ouassingue Entourbé"|"Osurc"|"Palmifleur Malibout"|"Palmifleur Morito"|"Palmifleur Passaoh"|"Ramane d'Egoutant"|"Sanglier Des Plaines"|"Susej"|"Chafer Draugr"|"Crachefoux"|"Craqueboule Poli"|"Dragacé"|"Ino-Naru"|"Kanniboul Ark"|"Kanniboul Eth"|"Kanniboul Jav"|"Kanniboul Sarbak"|"Kwak de Flamme"|"Kwak de Glace"|"Kwak de Terre"|"Kwak de Vent"|"Macien"|"Maître Bolet"|"Palmifleur Kouraçao"|"Porsalu"|"Rat d'Egoutant"|"Sarkapwane"|"Vétauran"|"Betto"|"Canondorf"|"Corailleur"|"Don Duss Ang"|"Dragoeuf Ardoise"|"Dragoeuf Argile"|"Dragoeuf Calcaire"|"DragOeuf Charbon"|"Félygiène"|"Koalak Coco"|"Koalak Griotte"|"Koalak Indigo"|"Koalak Reinette"|"Lolojiki"|"Moumoule"|"Nakunbra"|"Rat d'Hyoactif"|"Raul Mops"|"Serpiplume"|"Sparo"|"Barbroussa"|"Bitouf des plaines"|"Chef Crocodaille"|"Chiendent"|"Craqueleur poli"|"Don Dorgan"|"Fantôme Apero"|"Fantôme Aux Plates"|"Fantôme Egérie"|"Fantôme Hicide"|"Kanigrou"|"Kido"|"Kilibriss"|"Kurookin"|"Larve Champêtre"|"Mufafah"|"MulouNerbe"|"Serpentin"|"Souris Verte"|"Abrakne sombre"|"Abraknyde sombre"|"Alhyène"|"Bourdard"|"Chevaucheur koalak"|"Dragodinde Dorée sauvage"|"Dragueuse"|"Fossoyeur koalak"|"Foufayteur"|"Gloutovore"|"Guerrier koalak"|"Koalak forestier"|"Kokom"|"Meupette"|"Orfélin"|"Panthègros"|"Parashukouï"|"Pékeualak"|"Piralak"|"Warko marron"|"Bitouf sombre"|"Bizarbwork"|"Bourbassingue"|"Brouture"|"Disciple zoth"|"Dragnarok"|"Draguaindrop"|"Fécorce"|"Floribonde"|"Gamine zoth"|"Grenufar"|"Guerrier zoth"|"Koalak farouche"|"Koalak sanguin"|"Krambwork"|"Mama koalak"|"Médibwork"|"Mégabwork"|"Momie koalak"|"Warko violet"|"Abrakleur sombre"|"Boumbardier"|"Dragoss Ardoise"|"Dragoss Argile"|"Dragoss Calcaire"|"Dragoss Charbon"|"Drakoalak"|"Fauchalak"|"Kaniblou"|"Maître koalak"|"Malle Outillée"|"Poolay"|"Robionicle"|"Robot Fléau"|"Rouquette"|"Tétonuki"|"Tourbassingue"|"Troollaraj"|"Abrakleur clair"|"Bakazako"|"Bitouf aérien"|"Champ à gnons"|"Champaknyde"|"Champbis"|"Champmane"|"Champodonte"|"Jiangshi-nobi"|"Kaskargo"|"Lichangoro"|"Madura"|"Maître Zoth"|"Onabu-geisha"|"Pétartifoux"|"Roissingue"|"Sergent zoth"|"Tambouraï"|"Tromperelle"|"Tsukinochi"|"Kaonashi"|"Tsume-Bozu"|"Blop Coco Royal"|"Blop Griotte Royal"|"Blop Indigo Royal"|"Blop Reinette Royal"|"Bouftou Royal"|"Bworkette"|"Déminoboule"|"Dragon Cochon"|"Gelée Royale Bleue"|"Gelée Royale Menthe"|"Minotoror"|"Mob l'Eponge"|"Mominotor"|"Rat Blanc"|"Rat Noir"|"Scarabosse Doré"|"Shin Larve"|"Tofu Royal"|"Tournesol Affamé"|"Wabbit GM"|"Abraknyde ancestral"|"Blop multicolore royal"|"Corailleur magistral"|"Craqueleur légendaire"|"Gardienne des égouts"|"Gelée Royale Fraise"|"Gourlo le terrible"|"Hanshi"|"Hell Mina"|"Koulosse"|"Maître corbac"|"Meulou"|"Moon"|"Skeunk"|"Tanukoui San"|"Tynril ahuri"|"Tynril consterné"|"Tynril déconcerté"|"Tynril perfide"|"Wa wabbit"|"Bworker"|"Chêne mou"|"Crocabulia"|"Founamboul"|"Gelée Royale Citron"|"Haute Truche"|"Kimbo"|"Minotot"|"Ougah"|"Silf le rasboul majeur"|"Sphincter cell"|"Arachitik la Souffreteuse"|"Araknay la Galopante"|"Arakule la Revancharde"|"Boudalf le Blanc"|"Boulgourvil le Lointain"|"Chamchie le Difficile"|"Craraboss le Féérique"|"Larvonika l'Instrument"|"Mosketère le Dévoué"|"Pioufe la Maquillée"|"Pioukas la Plante"|"Pioulbrineur le Mercenaire"|"Pioulette la Coquine"|"Pioussokrim le Délétère"|"Pioustone le Problème"|"Pissdane l'Insipide"|"Sourizoto le Collant"|"Tofuldebeu l'Explosif"|"Tofumanchou l'Empereur"|"Tofurapin le Pétri"|"Bandapar l'Exclu"|"Bandson le Tonitruant"|"Boudur le Raide"|"Boufdégou le Refoulant"|"Gelanal le Huileux"|"Geloliaine l'Aérien"|"Gobstiniais le Têtu"|"Kolforthe l'Indécollable"|"Kwoanneur le Frimeur"|"Larchimaide la Poussée"|"Larvapstrè le Subjectif"|"Nodkoku le Trahi"|"Roz la Magicienne"|"Serpistol l'Illustre"|"Tikosto le Mousse"|"Tiwa'Missou le Gateux"|"Tiwalpé le Dévêtu"|"Tiwoflan le Lâche"|"Tour le Vice"|"Trukul le Lent"|"Bi le Partageur"|"Bilvoezé le Bonimenteur"|"Bistou le Quêteur"|"Bistou le Rieur"|"Boostif l'Affamé"|"Bouflet le Puéril"|"Champayr le Disjoncté"|"Chevaustine le Reconstruit"|"Chonstip la Passagère"|"Cromikay le Néophyte"|"Étoilette la Bouchée"|"Milipussien le Géant"|"Porfavor le Quémandeur"|"Preskapwal le Tendancieux"|"Robiolego l'Assemblé"|"Sangria le Fruité"|"Tortenssia la Fleurie"|"Torthur la Lutte"|"Vampunor le Glacial"|"Wabbitud le Constant"|"Bambouské le Camouflé"|"Barchwork le Multicolore"|"Bwormage le Respectueux"|"Corpat le Vampire"|"Crognan le Barbare"|"Fourapin le Chaud"|"Maître Amboat le Moqueur"|"Milipatte la Griffe"|"Minoskour le Sauveur"|"Minsinistre l'Elu"|"Neufedur le Flottant"|"Pichakoté le Dégoûtant"|"Pichdourse le Puissant"|"Pichduitre le Totem"|"Pichtoire l'Erudit"|"Robocoop l'Échangé"|"Rostensyl la Cuisinière"|"Tortilleur le Coulé"|"Tortorak le Cornu"|"Wagnagnah le Sanglant"|"Abrakroc l'Edenté"|"Bworkasse le Dégoûtant"|"Chafalfer l'Optimiste"|"Chamdblé le Cultivé"|"Chamflay le Ballonné"|"Champayt l'Odorant"|"Crakmitaine le Faucheur"|"Craquetuss le Piquant"|"Draglida la Disparue"|"Garsim le Mort"|"Gelaviv le Glaçon"|"Krapahut le Randonneur"|"Mallopiée l'Épineuse"|"Mandalo l'Aqueuse"|"Ribibi le Cher"|"Scapé l'Epée"|"Scaramel le Fondant"|"Scarfayss le Balafré"|"Scarouarze l'Epopée"|"Watdogue le Bien Nommé"|"Abrakadnuzar"|"Blof l'Apathique"|"Bloporte le Veule"|"Blordur l'Infect"|"Blorie l'Assourdissante"|"Boombata le Garde"|"Bulsavon le Gonflé"|"Chafemal le Bagarreur"|"Chaffoin le Sournois"|"Crolnareff l'Exilé"|"Cruskof le Rustre"|"Crustensyl le Pragmatique"|"Crustterus l'Organique"|"Dragnoute l'Irascible"|"Farlon l'Enfant"|"Larvomatik le Propre"|"Radoutable le Craint"|"Scaratyn l'Huître"|"Scorpitène l'Enflammé"|"Tronkoneuz la Tranchante"|"Aboudbra le Porteur"|"Ameur la Laide"|"Arabord la Cruche"|"Cavordemal le Sorcier"|"Chafmarcel le Fêtard"|"Chalan le Commerçant"|"Codenlgaz le Problème"|"Crusmeyer le Pervers"|"Floriste la Cannibale"|"Forboyar l'Enigmatique"|"Ginsenk le Stimulant"|"Grandilok le Clameur"|"Kiroyal le Sirupeux"|"Koktèle le Secoué"|"Let le Rond"|"Nelvin le Boulet"|"Nipulnislip l'Exhibitionniste"|"Osuxion le Vampirique"|"Susbewl l'Hypocrite"|"Wokènrôl le Danseur"|"Abrakildas le Vénérable"|"Chafrit le Barbare"|"Cramikaz le Suicidaire"|"Craquetou le Fissuré"|"Doktopuss le Maléfique"|"Germinol l'Indigent"|"Grenuche la Gentille"|"Kannibal le Lecteur"|"Kapota la Fraise"|"Koalastrof la Naturelle"|"Koko la Violente"|"Maître Onom le Régulier"|"Ouashouash l'Exubérant"|"Ouassébo l'Esthète"|"Ouature la Mobile"|"Palmiche le Serein"|"Palmiflette le Convivial"|"Palmito le Menteur"|"Ramitant le Dilettante"|"Sampi l'Eternel"|"Akaka le Souillé"|"Bebetto l'Intellectuel"|"Corboyard l'Enigmatique"|"Dragioli le Succulent"|"Kannémik le Maigre"|"Kannisterik le Forcené"|"Kwakamole l'Appétissant"|"Kwaké le Piraté"|"Kwakolak le Chocolaté"|"Kwakwatique le Trempé"|"Moumoute la Douce"|"Ougaould le Parasite"|"Palmbytch la Bronzée"|"Parapadkouï l'Émasculé"|"Porsalé le Râleur"|"Ratlbol l'Aigri"|"Rauligo le Sale"|"Sarkastik l'Incompris"|"Serpistule le Purulent"|"Vétaurine L'énergisé"|"Barebourd le Comte"|"Caboume l'Artilleur"|"Chiendanlémin l'Illusionniste"|"Dragkouine la Déguisée"|"Dragmoclaiss le Fataliste"|"Dragnostik le Sceptique"|"Dragstayr le Fonceur"|"Fandanleuil le Précis"|"Fanlabiz le Véloce"|"Fantoch le Pantin"|"Fantrask la Rêveuse"|"Koakofrui le Confit"|"Koamaembair le Coulant"|"Koarmit la Batracienne"|"Koaskette la Chapelière"|"Nakuneuye le Borgne"|"Nerdeubeu le Flagellant"|"Ratéhaifaim le Professeur"|"Sparoket le Lanceur"|"Tilolo la Bien Moulée"|"Alhoui le Répondeur"|"Bonpake le Chavireur"|"Bourde le Maladroit"|"Crathdogue le Cruel"|"Crok le Beau"|"Dragonienne l'Econome"|"Félyssion la Gourmande"|"Fouflay le Retombé"|"Guerrite le Veilleur"|"Kanasukr le Mielleux"|"Kanibière l'Encordée"|"Kido l'Âtre"|"Kilimanj'haro le Grimpeur"|"Larvaloeil l'Émue"|"Mufguedin le Suprême"|"Muloufok l'Hilarant"|"Orfélyre le Charmeur"|"Pantacour le Long"|"Souristiti l'Immortalisée"|"Toufou le Benêt"|"Abrakanette l'Encapsulé"|"Abraklette le Fondant"|"Bitoven le Musicien"|"Brouste l'Humiliant"|"Craquecrac l'Endurant"|"Diskord le Belliqueux"|"Dragdikal le Décisif"|"Dragobert le Monarque"|"Fossamoel le Juteux"|"Gloubibou le Gars"|"Inopenope le Négatif"|"Koamag'oel le Défiguré"|"Koasossyal le Psychopathe"|"Lichangora l'Immaculée"|"Meuroup le Prêtre"|"Pékeutar le Tireur"|"Piradain le Pingre"|"Rooroku l'Imposant"|"Tétonée la Plantureuse"|"Warkolad l'Etreinte"|"Abrakine le Sombre"|"Bouliver le Géant"|"Drageaufol la Joyeuse"|"Dragminster le Magicien"|"Dragtarus le Bellâtre"|"Drakolage le Tentateur"|"Draquetteur le Voleur"|"Ecorfé la Vive"|"Fangshui la Dysorthographiée"|"Faufoll la Joyeuse"|"Floanna la Blonde"|"Gastroth la Contagieuse"|"Guerumoth le Collant"|"Koalaboi le Calorifère"|"Koalvissie le Chauve"|"Mamakomou l'Âge"|"Momikonos la Bandelette"|"Pétarfoutu le Mouillé"|"Tourbiket le Virevoletant"|"Wara l'Amer"|"Abrinos le Clair"|"Bigbadaboum l'Élémentaire"|"Chamiléro le Malchanceux"|"Chamoute le Duveteux"|"Champmé le Méchant"|"Champolyon le Polyglotte"|"Champoul l'Illuminé"|"Crachefouxtre le Surpris"|"Don Kizoth l'Obstiné"|"Jiankor le Radoteur"|"Kaskapointhe la Couverte"|"Maître Koantik le Théoricien"|"Onabuémangé la Rassasiée"|"Poolopo la Traditionnelle"|"Seripoth l'Ennemi"|"Tambouille le Gastronome"|"Toutouf le Velu"|"Tromplamor le Survivant"|"Trooyé l'Oxydé"|"Tsucékoi la Colporteuse"|"Bakaglace le Congelé"|"Kaonucléair l'Instable"|"Madgang le Docteur"|"Roy le Merlin"|"Tronquette la Réduite"|"Tsumani l'Inondeur"} [monstre] Le nom du monstre à filtrer.
         * @param {1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34} [etape] L'étape sur laquelle filtrer.
         * @param {"monstre"|"archimonstre"|"boss"} [type] Le type de monstre à afficher.
         * @param {string} [quantite] Pour n'afficher que les monstres dont l'utilisateur possède la quantité indiquée.
		 * * Si la valeur saisie commence par "<" alors les monstres affichées seront ceux dont la quantité est strictement inférieure à la valeur saisie.
		 * * Si la valeur saisie commence par ">" alors les monstres affichées seront ceux dont la quantité est strictement supérieure à la valeur saisie.
		 *
		 * Exemple:
		 *
		 * * "<5"
		 *
		 * n'affichera que les monstres dont la quantité est strictement inférieure à 5.
         * @param {"recherche"|"propose"} [etat] Pour filtrer les monstres à l'état recherchés ou proposés.
		 *
		 * Exemple:
		 *
		 *  * "recherche"
		 *
		 * n'affichera que les monstres recherchés
		 * @example
		 * * MetamobAPI.GET.userMonsters("Popop").then(data => console.log(data));
		 * // Renvoi la liste de tout les monstres de l'utilisateur.
		 * * MetamobAPI.GET.userMonsters("Popop", null, null, "archimonstre", null, "propose").then(data => console.log(data));
		 * // Renvoi la liste des archimonstres à l'état proposé de l'utilisateur.
		 * * MetamobAPI.GET.userMonsters("Popop", null, 20, null, ">2").then(console.log());
		 * // Renvoi la liste de tout les monstres de l'étape 20 que l'utilisateur possède en + de 2 exemplaire.
		 * @returns {Promise<{id:number, nom:string, slug:string, type:string, image_url:string, etape:number, zone:string, souszone:string, nom_normal:string}[]|void>}
         */

		async userMonsters(pseudo, monstre, etape, type, quantite, etat) {

			return await new Promise(async (resolve, reject) => {

				try {

					if (!config.APIKey || config.APIKey === false) {
						reject(new Error("❌ Clé API non fournie, utilisez MetamobAPI.config(\"votre_clé_API\")."));
					}

					if (isRateLimited()) {
						reject(new Error("❌ Trop de requêtes effectuées en 1 minute. Les appels vers l'api de metamob sont limités à 60/minute max."));
					}

					let link = `https://api.metamob.fr/utilisateurs/${pseudo}/monstres`;

					if (monstre) {
						link += `?nom=${monstre}`;
					}
					if (etape) {
						link += `${monstre ? "&" : "?"}etape=${etape}`;
					}
					if (type) {
						link += `${monstre || etape ? "&" : "?"}type=${type}`;
					}
					if (quantite) {
						link += `${monstre || etape || type ? "&" : "?"}quantite=${quantite}`;
					}
					if (etat) {
						if (etat === "propose") { etat = "propose=1"; }
						if (etat === "recherche") { etat = "recherche=1"; }
						link += `${monstre || etape || type || quantite ? "&" : "?"}${etat}`;
					}

					const response = await fetch(link, {
						method:"GET",
						headers:{
							"HTTP-X-APIKEY":config.APIKey,
						},
					});

					const data = JSON.parse(JSON.stringify(await response.json()));

					resolve(data);

				}

				catch (error) {
					reject(error);
				}

			});

		},

		/**
		 * Récupère les monstres.
         * @param {"Arakne"|"Arakne malade"|"Boufton blanc"|"Boufton noir"|"Crabe"|"Flammèche air"|"Flammèche eau"|"Flammèche feu"|"Flammèche terre"|"Larve bleue"|"Moskito"|"Piou bleu"|"Piou jaune"|"Piou rose"|"Piou rouge"|"Piou vert"|"Piou violet"|"Souris grise"|"Tofu"|"Tofu maléfique"|"Arakne des égoûts"|"Bandit du clan des Roublards"|"Bandit manchot"|"Black tiwabbit"|"Bouftou"|"Boulanger sombre"|"Champ champ"|"Gelée bleue"|"Gelée menthe"|"Gobet"|"Kolérat"|"Kwoan"|"Larve orange"|"Larve verte"|"Pissenlit diabolique"|"Rose démoniaque"|"Tiwabbit"|"Tiwabbit kiafin"|"Tofu malade"|"Tournesol sauvage"|"Berger Porkass"|"Biblop coco"|"Biblop griotte"|"Biblop indigo"|"Biblop reinette"|"Boo"|"Champa vert"|"Chef de Guerre Bouftou"|"Cochon de Lait"|"Crowneille"|"Gob-trotteur"|"Milirat Strubien"|"Nodkoko"|"Prespic"|"Sanglier"|"Tikoko"|"Tortue Jaune"|"Trukikol"|"Vampire"|"Wabbit"|"Bambouto"|"Bwork Mage"|"Corbac"|"Croc Gland"|"Croc Gland enragé"|"Etoile de la Mer d'Asse"|"Floristile"|"Fourbasse"|"Larve Jaune"|"Maître Vampire"|"Milimulou"|"Minoskito"|"Noeul"|"Pichon Blanc"|"Pichon Bleu"|"Pichon Orange"|"Pichon Vert"|"Tortue Bleue"|"Tortue rouge"|"Tortue Verte"|"Abraknyde"|"Black Wabbit"|"Bwork"|"Bwork Archer"|"Chafer Invisible"|"Champa Bleu"|"Champa Marron"|"Champa Rouge"|"Craqueboule"|"Craqueleur"|"Dragodinde Amande Sauvage"|"Gargrouille"|"Gelée Fraise"|"Ishigro PakeKraméléhon"|"Mandrine"|"Mineur Sombre"|"Rose Obscure"|"Wabbit Squelette"|"Abrakne"|"Blop Coco"|"Blop Griotte"|"Blop Indigo"|"Blop Reinette"|"Boomba"|"Chafer"|"Chafer Fantassin"|"Cochon de Farle"|"Crocodaille"|"Pichon Kloune"|"Rib"|"Scarafeuille Blanc"|"Scarafeuille Bleu"|"Scarafeuille Rouge"|"Scarafeuille Vert"|"Scaratos"|"Scélérat Strubien"|"Scorbute"|"Tronknyde"|"Aboub"|"Akakwa"|"Amlub"|"Arakne Majeure"|"Bulbuisson"|"Cavalier Porkass"|"Codem"|"Crustorail Kouraçao"|"Crustorail Malibout"|"Crustorail Morito"|"Crustorail Passaoh"|"Dragodinde Rousse Sauvage"|"Forgeron Sombre"|"Gink"|"Grand Pa Wabbit"|"Kirevam"|"Let Emoliug"|"Nebgib"|"Nipul"|"Wo Wabbit"|"Abraknyde Vénérable"|"Chafer Archer"|"Chafer d'élite"|"Chafer Lancier"|"Craqueleur des plaines"|"DoK Alako"|"Fangshu"|"Gamino"|"Koalak Immature"|"Kokoko"|"La Ouassingue"|"Le Ouassingue"|"Le Ouassingue Entourbé"|"Osurc"|"Palmifleur Malibout"|"Palmifleur Morito"|"Palmifleur Passaoh"|"Ramane d'Egoutant"|"Sanglier Des Plaines"|"Susej"|"Chafer Draugr"|"Crachefoux"|"Craqueboule Poli"|"Dragacé"|"Ino-Naru"|"Kanniboul Ark"|"Kanniboul Eth"|"Kanniboul Jav"|"Kanniboul Sarbak"|"Kwak de Flamme"|"Kwak de Glace"|"Kwak de Terre"|"Kwak de Vent"|"Macien"|"Maître Bolet"|"Palmifleur Kouraçao"|"Porsalu"|"Rat d'Egoutant"|"Sarkapwane"|"Vétauran"|"Betto"|"Canondorf"|"Corailleur"|"Don Duss Ang"|"Dragoeuf Ardoise"|"Dragoeuf Argile"|"Dragoeuf Calcaire"|"DragOeuf Charbon"|"Félygiène"|"Koalak Coco"|"Koalak Griotte"|"Koalak Indigo"|"Koalak Reinette"|"Lolojiki"|"Moumoule"|"Nakunbra"|"Rat d'Hyoactif"|"Raul Mops"|"Serpiplume"|"Sparo"|"Barbroussa"|"Bitouf des plaines"|"Chef Crocodaille"|"Chiendent"|"Craqueleur poli"|"Don Dorgan"|"Fantôme Apero"|"Fantôme Aux Plates"|"Fantôme Egérie"|"Fantôme Hicide"|"Kanigrou"|"Kido"|"Kilibriss"|"Kurookin"|"Larve Champêtre"|"Mufafah"|"MulouNerbe"|"Serpentin"|"Souris Verte"|"Abrakne sombre"|"Abraknyde sombre"|"Alhyène"|"Bourdard"|"Chevaucheur koalak"|"Dragodinde Dorée sauvage"|"Dragueuse"|"Fossoyeur koalak"|"Foufayteur"|"Gloutovore"|"Guerrier koalak"|"Koalak forestier"|"Kokom"|"Meupette"|"Orfélin"|"Panthègros"|"Parashukouï"|"Pékeualak"|"Piralak"|"Warko marron"|"Bitouf sombre"|"Bizarbwork"|"Bourbassingue"|"Brouture"|"Disciple zoth"|"Dragnarok"|"Draguaindrop"|"Fécorce"|"Floribonde"|"Gamine zoth"|"Grenufar"|"Guerrier zoth"|"Koalak farouche"|"Koalak sanguin"|"Krambwork"|"Mama koalak"|"Médibwork"|"Mégabwork"|"Momie koalak"|"Warko violet"|"Abrakleur sombre"|"Boumbardier"|"Dragoss Ardoise"|"Dragoss Argile"|"Dragoss Calcaire"|"Dragoss Charbon"|"Drakoalak"|"Fauchalak"|"Kaniblou"|"Maître koalak"|"Malle Outillée"|"Poolay"|"Robionicle"|"Robot Fléau"|"Rouquette"|"Tétonuki"|"Tourbassingue"|"Troollaraj"|"Abrakleur clair"|"Bakazako"|"Bitouf aérien"|"Champ à gnons"|"Champaknyde"|"Champbis"|"Champmane"|"Champodonte"|"Jiangshi-nobi"|"Kaskargo"|"Lichangoro"|"Madura"|"Maître Zoth"|"Onabu-geisha"|"Pétartifoux"|"Roissingue"|"Sergent zoth"|"Tambouraï"|"Tromperelle"|"Tsukinochi"|"Kaonashi"|"Tsume-Bozu"|"Blop Coco Royal"|"Blop Griotte Royal"|"Blop Indigo Royal"|"Blop Reinette Royal"|"Bouftou Royal"|"Bworkette"|"Déminoboule"|"Dragon Cochon"|"Gelée Royale Bleue"|"Gelée Royale Menthe"|"Minotoror"|"Mob l'Eponge"|"Mominotor"|"Rat Blanc"|"Rat Noir"|"Scarabosse Doré"|"Shin Larve"|"Tofu Royal"|"Tournesol Affamé"|"Wabbit GM"|"Abraknyde ancestral"|"Blop multicolore royal"|"Corailleur magistral"|"Craqueleur légendaire"|"Gardienne des égouts"|"Gelée Royale Fraise"|"Gourlo le terrible"|"Hanshi"|"Hell Mina"|"Koulosse"|"Maître corbac"|"Meulou"|"Moon"|"Skeunk"|"Tanukoui San"|"Tynril ahuri"|"Tynril consterné"|"Tynril déconcerté"|"Tynril perfide"|"Wa wabbit"|"Bworker"|"Chêne mou"|"Crocabulia"|"Founamboul"|"Gelée Royale Citron"|"Haute Truche"|"Kimbo"|"Minotot"|"Ougah"|"Silf le rasboul majeur"|"Sphincter cell"|"Arachitik la Souffreteuse"|"Araknay la Galopante"|"Arakule la Revancharde"|"Boudalf le Blanc"|"Boulgourvil le Lointain"|"Chamchie le Difficile"|"Craraboss le Féérique"|"Larvonika l'Instrument"|"Mosketère le Dévoué"|"Pioufe la Maquillée"|"Pioukas la Plante"|"Pioulbrineur le Mercenaire"|"Pioulette la Coquine"|"Pioussokrim le Délétère"|"Pioustone le Problème"|"Pissdane l'Insipide"|"Sourizoto le Collant"|"Tofuldebeu l'Explosif"|"Tofumanchou l'Empereur"|"Tofurapin le Pétri"|"Bandapar l'Exclu"|"Bandson le Tonitruant"|"Boudur le Raide"|"Boufdégou le Refoulant"|"Gelanal le Huileux"|"Geloliaine l'Aérien"|"Gobstiniais le Têtu"|"Kolforthe l'Indécollable"|"Kwoanneur le Frimeur"|"Larchimaide la Poussée"|"Larvapstrè le Subjectif"|"Nodkoku le Trahi"|"Roz la Magicienne"|"Serpistol l'Illustre"|"Tikosto le Mousse"|"Tiwa'Missou le Gateux"|"Tiwalpé le Dévêtu"|"Tiwoflan le Lâche"|"Tour le Vice"|"Trukul le Lent"|"Bi le Partageur"|"Bilvoezé le Bonimenteur"|"Bistou le Quêteur"|"Bistou le Rieur"|"Boostif l'Affamé"|"Bouflet le Puéril"|"Champayr le Disjoncté"|"Chevaustine le Reconstruit"|"Chonstip la Passagère"|"Cromikay le Néophyte"|"Étoilette la Bouchée"|"Milipussien le Géant"|"Porfavor le Quémandeur"|"Preskapwal le Tendancieux"|"Robiolego l'Assemblé"|"Sangria le Fruité"|"Tortenssia la Fleurie"|"Torthur la Lutte"|"Vampunor le Glacial"|"Wabbitud le Constant"|"Bambouské le Camouflé"|"Barchwork le Multicolore"|"Bwormage le Respectueux"|"Corpat le Vampire"|"Crognan le Barbare"|"Fourapin le Chaud"|"Maître Amboat le Moqueur"|"Milipatte la Griffe"|"Minoskour le Sauveur"|"Minsinistre l'Elu"|"Neufedur le Flottant"|"Pichakoté le Dégoûtant"|"Pichdourse le Puissant"|"Pichduitre le Totem"|"Pichtoire l'Erudit"|"Robocoop l'Échangé"|"Rostensyl la Cuisinière"|"Tortilleur le Coulé"|"Tortorak le Cornu"|"Wagnagnah le Sanglant"|"Abrakroc l'Edenté"|"Bworkasse le Dégoûtant"|"Chafalfer l'Optimiste"|"Chamdblé le Cultivé"|"Chamflay le Ballonné"|"Champayt l'Odorant"|"Crakmitaine le Faucheur"|"Craquetuss le Piquant"|"Draglida la Disparue"|"Garsim le Mort"|"Gelaviv le Glaçon"|"Krapahut le Randonneur"|"Mallopiée l'Épineuse"|"Mandalo l'Aqueuse"|"Ribibi le Cher"|"Scapé l'Epée"|"Scaramel le Fondant"|"Scarfayss le Balafré"|"Scarouarze l'Epopée"|"Watdogue le Bien Nommé"|"Abrakadnuzar"|"Blof l'Apathique"|"Bloporte le Veule"|"Blordur l'Infect"|"Blorie l'Assourdissante"|"Boombata le Garde"|"Bulsavon le Gonflé"|"Chafemal le Bagarreur"|"Chaffoin le Sournois"|"Crolnareff l'Exilé"|"Cruskof le Rustre"|"Crustensyl le Pragmatique"|"Crustterus l'Organique"|"Dragnoute l'Irascible"|"Farlon l'Enfant"|"Larvomatik le Propre"|"Radoutable le Craint"|"Scaratyn l'Huître"|"Scorpitène l'Enflammé"|"Tronkoneuz la Tranchante"|"Aboudbra le Porteur"|"Ameur la Laide"|"Arabord la Cruche"|"Cavordemal le Sorcier"|"Chafmarcel le Fêtard"|"Chalan le Commerçant"|"Codenlgaz le Problème"|"Crusmeyer le Pervers"|"Floriste la Cannibale"|"Forboyar l'Enigmatique"|"Ginsenk le Stimulant"|"Grandilok le Clameur"|"Kiroyal le Sirupeux"|"Koktèle le Secoué"|"Let le Rond"|"Nelvin le Boulet"|"Nipulnislip l'Exhibitionniste"|"Osuxion le Vampirique"|"Susbewl l'Hypocrite"|"Wokènrôl le Danseur"|"Abrakildas le Vénérable"|"Chafrit le Barbare"|"Cramikaz le Suicidaire"|"Craquetou le Fissuré"|"Doktopuss le Maléfique"|"Germinol l'Indigent"|"Grenuche la Gentille"|"Kannibal le Lecteur"|"Kapota la Fraise"|"Koalastrof la Naturelle"|"Koko la Violente"|"Maître Onom le Régulier"|"Ouashouash l'Exubérant"|"Ouassébo l'Esthète"|"Ouature la Mobile"|"Palmiche le Serein"|"Palmiflette le Convivial"|"Palmito le Menteur"|"Ramitant le Dilettante"|"Sampi l'Eternel"|"Akaka le Souillé"|"Bebetto l'Intellectuel"|"Corboyard l'Enigmatique"|"Dragioli le Succulent"|"Kannémik le Maigre"|"Kannisterik le Forcené"|"Kwakamole l'Appétissant"|"Kwaké le Piraté"|"Kwakolak le Chocolaté"|"Kwakwatique le Trempé"|"Moumoute la Douce"|"Ougaould le Parasite"|"Palmbytch la Bronzée"|"Parapadkouï l'Émasculé"|"Porsalé le Râleur"|"Ratlbol l'Aigri"|"Rauligo le Sale"|"Sarkastik l'Incompris"|"Serpistule le Purulent"|"Vétaurine L'énergisé"|"Barebourd le Comte"|"Caboume l'Artilleur"|"Chiendanlémin l'Illusionniste"|"Dragkouine la Déguisée"|"Dragmoclaiss le Fataliste"|"Dragnostik le Sceptique"|"Dragstayr le Fonceur"|"Fandanleuil le Précis"|"Fanlabiz le Véloce"|"Fantoch le Pantin"|"Fantrask la Rêveuse"|"Koakofrui le Confit"|"Koamaembair le Coulant"|"Koarmit la Batracienne"|"Koaskette la Chapelière"|"Nakuneuye le Borgne"|"Nerdeubeu le Flagellant"|"Ratéhaifaim le Professeur"|"Sparoket le Lanceur"|"Tilolo la Bien Moulée"|"Alhoui le Répondeur"|"Bonpake le Chavireur"|"Bourde le Maladroit"|"Crathdogue le Cruel"|"Crok le Beau"|"Dragonienne l'Econome"|"Félyssion la Gourmande"|"Fouflay le Retombé"|"Guerrite le Veilleur"|"Kanasukr le Mielleux"|"Kanibière l'Encordée"|"Kido l'Âtre"|"Kilimanj'haro le Grimpeur"|"Larvaloeil l'Émue"|"Mufguedin le Suprême"|"Muloufok l'Hilarant"|"Orfélyre le Charmeur"|"Pantacour le Long"|"Souristiti l'Immortalisée"|"Toufou le Benêt"|"Abrakanette l'Encapsulé"|"Abraklette le Fondant"|"Bitoven le Musicien"|"Brouste l'Humiliant"|"Craquecrac l'Endurant"|"Diskord le Belliqueux"|"Dragdikal le Décisif"|"Dragobert le Monarque"|"Fossamoel le Juteux"|"Gloubibou le Gars"|"Inopenope le Négatif"|"Koamag'oel le Défiguré"|"Koasossyal le Psychopathe"|"Lichangora l'Immaculée"|"Meuroup le Prêtre"|"Pékeutar le Tireur"|"Piradain le Pingre"|"Rooroku l'Imposant"|"Tétonée la Plantureuse"|"Warkolad l'Etreinte"|"Abrakine le Sombre"|"Bouliver le Géant"|"Drageaufol la Joyeuse"|"Dragminster le Magicien"|"Dragtarus le Bellâtre"|"Drakolage le Tentateur"|"Draquetteur le Voleur"|"Ecorfé la Vive"|"Fangshui la Dysorthographiée"|"Faufoll la Joyeuse"|"Floanna la Blonde"|"Gastroth la Contagieuse"|"Guerumoth le Collant"|"Koalaboi le Calorifère"|"Koalvissie le Chauve"|"Mamakomou l'Âge"|"Momikonos la Bandelette"|"Pétarfoutu le Mouillé"|"Tourbiket le Virevoletant"|"Wara l'Amer"|"Abrinos le Clair"|"Bigbadaboum l'Élémentaire"|"Chamiléro le Malchanceux"|"Chamoute le Duveteux"|"Champmé le Méchant"|"Champolyon le Polyglotte"|"Champoul l'Illuminé"|"Crachefouxtre le Surpris"|"Don Kizoth l'Obstiné"|"Jiankor le Radoteur"|"Kaskapointhe la Couverte"|"Maître Koantik le Théoricien"|"Onabuémangé la Rassasiée"|"Poolopo la Traditionnelle"|"Seripoth l'Ennemi"|"Tambouille le Gastronome"|"Toutouf le Velu"|"Tromplamor le Survivant"|"Trooyé l'Oxydé"|"Tsucékoi la Colporteuse"|"Bakaglace le Congelé"|"Kaonucléair l'Instable"|"Madgang le Docteur"|"Roy le Merlin"|"Tronquette la Réduite"|"Tsumani l'Inondeur"} [monstre] Le nom du monstre à filtrer.
         * @param {1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34} [etape] L'étape sur laquelle filtrer.
         * @param {"monstre"|"archimonstre"|"boss"} [type] Le type de monstre à afficher.
		 * @example
		 * * MetamobAPI.GET.monsters().then(data => console.log(data));
		 * // Renvoi la liste de tout les monstres.
		 * * MetamobAPI.GET.monsters("Arakne").then(data => console.log(data));
		 * // Renvoi les informations du monstre Arakne.
		 * * MetamobAPI.GET.monsters(null, 20).then(data => console.log(data));
		 * // Renvoi la liste des monstres de l'étape 20.
		 * @returns {Promise<{id:number, nom:string, slug:string, image_url:string, etape:number, zone:string, souzone:string, nom_normal:string}[]|void>}
         */

		async monsters(monstre, etape, type) {

			return await new Promise(async (resolve, reject) => {

				try {

					if (!config.APIKey || config.APIKey === false) {
						reject(new Error("❌ Clé API non fournie, utilisez MetamobAPI.config(\"votre_clé_API\")."));
					}

					if (isRateLimited()) {
						reject(new Error("❌ Trop de requêtes effectuées en 1 minute. Les appels vers l'api de metamob sont limités à 60/minute max."));
					}

					const link = `https://api.metamob.fr/monstres?${monstre ? `nom=${monstre}&` : ""}${etape ? `etape=${etape}&` : ""}${type ? `type=${type}` : ""}`;

					const response = await fetch(link, {
						method:"GET",
						headers:{
							"HTTP-X-APIKEY":config.APIKey,
						},
					});

					const data = JSON.parse(JSON.stringify(await response.json()));

					resolve(data);

				}

				catch (error) {
					reject(error);
				}

			});

		},

		/**
		 * Récupère les serveurs.
         * @param {"Draconiros"|"HellMina"|"Imagiro"|"Ombre"|"Orukam"|"Oto-Mustam"|"Rosal"|"Rushu"|"TalKasha"|"Temporis"|"Tylezia"|"Brutas"|"Dodge"|"Grandapan"|"Herdegrize"|"Oshimo"|"Terra Cogita"|"Crail"|"Eratz"|"Galgarion"|"Henual"} [nom] Le nom du serveur.
		 * @example
		 * * MetamobAPI.GET.servers().then(data => console.log(data));
		 * // Renvoi la liste de tout les serveurs.
		 * * MetamobAPI.GET.servers("Tylezia").then(data => console.log(data));
		 * // Renvoi les informations du serveur Tylezia.
		 * @returns {Promise<{id:number, nom:string, communaute:string, plateforme:string}[]|void>}
         */

		async servers(nom) {

			return await new Promise(async (resolve, reject) => {

				try {

					if (!config.APIKey || config.APIKey === false) {
						reject(new Error("❌ Clé API non fournie, utilisez MetamobAPI.config(\"votre_clé_API\")."));
					}

					if (isRateLimited()) {
						reject(new Error("❌ Trop de requêtes effectuées en 1 minute. Les appels vers l'api de metamob sont limités à 60/minute max."));
					}

					const link = `https://api.metamob.fr/serveurs?${nom ? `nom=${encodeURIComponent(nom)}` : ""}`;

					const response = await fetch(link, {
						method:"GET",
						headers:{
							"HTTP-X-APIKEY":config.APIKey,
						},
					});

					const data = JSON.parse(JSON.stringify(await response.json()));

					resolve(data);

				}

				catch (error) {
					reject(error);
				}

			});

		},

		/**
		 * Récupère les kralamoures.
		 * @param {"Draconiros"|"HellMina"|"Imagiro"|"Ombre"|"Orukam"|"Oto-Mustam"|"Rosal"|"Rushu"|"TalKasha"|"Temporis"|"Tylezia"|"Brutas"|"Dodge"|"Grandapan"|"Herdegrize"|"Oshimo"|"Terra Cogita"|"Crail"|"Eratz"|"Galgarion"|"Henual"} [serveur] Le nom du serveur à filtrer.
		 * @param {string} [date_debut] La date de début du filtrage, au format YYYY-MM-DD.
		 * @param {string} [date_fin] La date de fin du filtrage, au format YYYY-MM-DD.
		 * @example
		 * * MetamobAPI.GET.kralamoures().then(data => console.log(data));
		 * // Renvoi la liste de toutes les ouvertures prévues entre la date du jour et 1 mois plus tard.
		 * * MetamobAPI.GET.kralamoures("Tylezia").then(data => console.log(data));
		 * // Renvoi la liste des ouvertures prévues sur le serveur Tylezia entre la date du jour et 1 mois plus tard.
		 * * MetamobAPI.GET.kralamoures("Tylezia", null, "2023-12-31").then(data => console.log(data));
		 * // Renvoi la liste des ouvertures prévues sur le serveur Tylezia entre la date du jour et le 31 décembre 2023.
		 * @returns {Promise<{id:number, date:Date, url:string, serveur:string, createur:string, description:string, nombre_utilisateurs:number, nombre_comptes:number}[]|void>}
		 */

		async kralamoures(serveur, date_debut, date_fin) {

			return await new Promise(async (resolve, reject) => {

				try {

					if (!config.APIKey || config.APIKey === false) {
						reject(new Error("❌ Clé API non fournie, utilisez MetamobAPI.config(\"votre_clé_API\")."));
					}

					if (isRateLimited()) {
						reject(new Error("❌ Trop de requêtes effectuées en 1 minute. Les appels vers l'api de metamob sont limités à 60/minute max."));
					}

					const regex = /^\d{4}-\d{2}-\d{2}$/;

					if (date_debut) {
						if (!regex.test(date_debut)) {
							reject(new Error(`❌ Invalid regex => ${date_debut}`));
						}
						date_debut = new Date(date_debut);
					}
					if (date_fin) {
						if (!regex.test(date_fin)) {
							reject(new Error(`❌ Invalid regex => ${date_fin}`));
						}
						date_fin = new Date(date_fin);
					}

					const link = `https://api.metamob.fr/kralamoures?${serveur ? `serveur=${serveur}` : ""}${date_debut ? `&date_debut=${date_debut}` : ""}${date_fin ? `&date_fin=${date_fin}` : ""}`;

					const response = await fetch(link, {
						method:"GET",
						headers:{
							"HTTP-X-APIKEY":config.APIKey,
						},
					});

					const data = JSON.parse(JSON.stringify(await response.json()));

					resolve(data);

				}

				catch (error) {
					reject(error);
				}

			});

		},

		/**
		 * Récupère les zones.
         * @param {"Amakna"|"Astrub"|"Baie de Sufokia"|"Bonta"|"Brakmar"|"Forêt des Abraknydes"|"Île d'Otomaï"|"Île de Grobe"|"Île de Moon"|"Île de Pandala"|"Île des Wabbits"|"Île du Minotoror"|"Labyrinthe du Dragon Cochon"|"Landes de Sidimote"|"Montagnes des Koalaks"|"Plaines de Cania"} [nom] Le nom de la zone à filtrer.
		 * @example
		 * * MetamobAPI.GET.zones().then(data => console.log(data));
		 * // Renvoi la liste de toutes les zones.
		 * * MetamobAPI.GET.zones("Astrub").then(data => console.log(data));
		 * // Renvoi les informations sur la zone Astrub.
		 * @returns {Promise<{id:number, label:string, slug:string}[]|void>}
         */

		async zones(nom) {

			return await new Promise(async (resolve, reject) => {

				try {

					if (!config.APIKey || config.APIKey === false) {
						reject(new Error("❌ Clé API non fournie, utilisez MetamobAPI.config(\"votre_clé_API\")."));
					}

					if (isRateLimited()) {
						reject(new Error("❌ Trop de requêtes effectuées en 1 minute. Les appels vers l'api de metamob sont limités à 60/minute max."));
					}

					const link = `https://api.metamob.fr/zones${nom ? `?nom=${nom}` : ""}`;

					const response = await fetch(link, {
						method:"GET",
						headers:{
							"HTTP-X-APIKEY":config.APIKey,
						},
					});

					const data = JSON.parse(JSON.stringify(await response.json()));

					resolve(data);

				}

				catch (error) {
					reject(error);
				}

			});

		},

		/**
		 * Récupère les souszones.
         * @param {"Amakna"|"Astrub"|"Baie de Sufokia"|"Bonta"|"Brakmar"|"Forêt des Abraknydes"|"Île d'Otomaï"|"Île de Grobe"|"Île de Moon"|"Île de Pandala"|"Île des Wabbits"|"Île du Minotoror"|"Labyrinthe du Dragon Cochon"|"Landes de Sidimote"|"Montagnes des Koalaks"|"Plaines de Cania"} [zone] La zone avec laquelle filtrer les résultats.
         * @param {"Aerdala"|"Akwadala"|"Antre de Crocabulia"|"Antre du Dragon Cochon"|"Arbre de Moon"|"Arche d'Otomaï"|"Atelier du Tanukouï San"|"Baie de Cania"|"Bambusaie de Damadrya"|"Bibliothèque du Maître corbac"|"Bois de Litneg"|"Bord de la forêt maléfique"|"Bordure de Brakmar"|"Calanques d'Astrub"|"Cale de l'arche d'otomaï"|"Canopée du Kimbo"|"Canyon sauvage"|"Caverne des Fungus"|"Caverne du Koulosse"|"Centre du labyrinthe du Minotoror"|"Champ des Ingalsse"|"Champs de Cania"|"Château du Wa Wabbit"|"Château Ensablé"|"Chemin du Crâne"|"Cimetière d'Amakna"|"Cimetière d'Astrub"|"Cimetière de Grobe"|"Cimetière des Torturés"|"Cimetière primitif"|"Cité d'Astrub"|"Clairière de Brouce Boulgoure"|"Clairière du Chêne Mou"|"Clos des Blops"|"Coin des Bouftous"|"Cour du Bouftou Royal"|"Cryptes du cimetière"|"Dents de Pierre"|"Désolation de Sidimote"|"Dojo du Vent"|"Domaine Ancestral"|"Domaine des Fungus"|"Donjon des Bworks"|"Donjon des Larves"|"Donjon des Rats du Château d'Amakna"|"Donjon des Scarafeuilles"|"Égouts d'Astrub"|"Entrailles de Brakmar"|"Épreuve de Draegnerys"|"Fabrique de foux d'artifice"|"Feudala"|"Forêt d'Amakna"|"Forêt de Kaliptus"|"Forêt des masques"|"Forêt maléfique"|"Forêt Sombre"|"Gelaxième dimension"|"Goulet du Rasboul"|"Grange du Tournesol Affamé"|"Grotte du Bworker"|"Grotte Hesque"|"Hauts des hurlements"|"Île de la Cawotte"|"Île du Minotoror"|"Îlot de la Couronne"|"îlot des Tombeaux"|"Jungle Interdite"|"Jungle Obscure"|"Laboratoire de Brumen Tinctorias"|"Laboratoire du Tynril"|"Labyrinthe du Dragon Cochon"|"Labyrinthe du Minotoror"|"Lac de Cania"|"Lacs enchantés"|"Marécages nauséabonds"|"Massif de Cania"|"Mont des Tombeaux"|"Montagne basse des Craqueleurs"|"Montagne des Craqueleurs"|"Orée de la forêt des Abraknydes"|"Passage vers Brakmar"|"Pénates du Corbac"|"Péninsule des gelées"|"Pics de Cania"|"Pitons Rocheux des Craqueleurs"|"Plage de Corail"|"Plage de la Tortue"|"Plaine des Porkass"|"Plaine des Scarafeuilles"|"Plaines herbeuses"|"Plaines Rocheuses"|"Plantala"|"Port de Madrestam"|"Presqu'île des Dragoeufs"|"Repaire de Skeunk"|"Repaire du Kharnozor"|"Rivage sufokien"|"Rives iridescentes"|"Routes Rocailleuses"|"Sanctuaire des Dragoeufs"|"Souterrains d'Astrub"|"Souterrains des Wabbits"|"Souterrains du Château d'Amakna"|"Sufokia"|"Tainéla"|"Tanière du Meulou"|"Temple du Grand Ougah"|"Terrdala"|"Territoire des Bandits"|"Territoire des Dragodindes Sauvages"|"Territoire des Porcos"|"Tofulailler royal"|"Tourbière sans fond"|"Tronc de l'arbre Hakam"|"Vallée de la Morh'kitu"|"Village de la Canopée"|"Village des dopeuls"|"Village des Dopeuls"|"Village des Dragoeufs"|"Volière de la Haute Truche"} [nom] Le nom de la sous-zone à filtrer.
		 * @example
		 * MetamobAPI.GET.souszones(null, "Village des Dopeuls").then(data => console.log(data));
		 * // Renvoi les informations de la souszone Village des Dopeuls.
		 * @returns {Promise<{id:number, label:string, slug:string, zone_libelle:string, zone_slug:string}[]|void>}
         */

		async souszones(zone, nom) {

			return await new Promise(async (resolve, reject) => {

				try {

					if (!config.APIKey || config.APIKey === false) {
						reject(new Error("❌ Clé API non fournie, utilisez MetamobAPI.config(\"votre_clé_API\")."));
					}

					if (isRateLimited()) {
						reject(new Error("❌ Trop de requêtes effectuées en 1 minute. Les appels vers l'api de metamob sont limités à 60/minute max."));
					}

					if (zone) {
						if (zone === "Amakna") { zone = 5;}
						if (zone === "Astrub") { zone = 6;}
						if (zone === "Baie de Sufokia") { zone = 13;}
						if (zone === "Bonta") { zone = 16;}
						if (zone === "Brakmar") { zone = 12;}
						if (zone === "Forêt des Abraknydes") { zone = 2;}
						if (zone === "Labyrinthe du Dragon Cochon") { zone = 15;}
						if (zone === "Landes de Sidimote") { zone = 11;}
						if (zone === "Montagnes des Koalaks") { zone = 9;}
						if (zone === "Plaines de Cania") { zone = 1;}
						if (zone === "Île d'Otomaï") { zone = 3;}
						if (zone === "Île de Grobe") { zone = 7;}
						if (zone === "Île de Moon") { zone = 10;}
						if (zone === "Île de Pandala") { zone = 4;}
						if (zone === "Île des Wabbits") { zone = 8;}
						if (zone === "Île du Minotoror") { zone = 14;}
					}

					const link = `https://api.metamob.fr/souszones?${zone ? `&zone=${zone}` : ""}${nom ? `&nom=${nom}` : ""}`;

					const response = await fetch(link, {
						method:"GET",
						headers:{
							"HTTP-X-APIKEY":config.APIKey,
						},
					});

					const data = JSON.parse(JSON.stringify(await response.json()));

					resolve(data);

				}

				catch (error) {
					reject(error);
				}

			});

		},

	},

	PUT:{

		/**
		 * Met à jour les informations de monstre d'un compte utilisateur.
		 * @param {string} pseudo_utilisateur Pseudo de l'utilisateur.
		 * @param {string} clé_unique_utilisateur Identifiant unique de l'utilisateur.
		 * @param {{monstre:"Arakne"|"Arakne malade"|"Boufton blanc"|"Boufton noir"|"Crabe"|"Flammèche air"|"Flammèche eau"|"Flammèche feu"|"Flammèche terre"|"Larve bleue"|"Moskito"|"Piou bleu"|"Piou jaune"|"Piou rose"|"Piou rouge"|"Piou vert"|"Piou violet"|"Souris grise"|"Tofu"|"Tofu maléfique"|"Arakne des égoûts"|"Bandit du clan des Roublards"|"Bandit manchot"|"Black tiwabbit"|"Bouftou"|"Boulanger sombre"|"Champ champ"|"Gelée bleue"|"Gelée menthe"|"Gobet"|"Kolérat"|"Kwoan"|"Larve orange"|"Larve verte"|"Pissenlit diabolique"|"Rose démoniaque"|"Tiwabbit"|"Tiwabbit kiafin"|"Tofu malade"|"Tournesol sauvage"|"Berger Porkass"|"Biblop coco"|"Biblop griotte"|"Biblop indigo"|"Biblop reinette"|"Boo"|"Champa vert"|"Chef de Guerre Bouftou"|"Cochon de Lait"|"Crowneille"|"Gob-trotteur"|"Milirat Strubien"|"Nodkoko"|"Prespic"|"Sanglier"|"Tikoko"|"Tortue Jaune"|"Trukikol"|"Vampire"|"Wabbit"|"Bambouto"|"Bwork Mage"|"Corbac"|"Croc Gland"|"Croc Gland enragé"|"Etoile de la Mer d'Asse"|"Floristile"|"Fourbasse"|"Larve Jaune"|"Maître Vampire"|"Milimulou"|"Minoskito"|"Noeul"|"Pichon Blanc"|"Pichon Bleu"|"Pichon Orange"|"Pichon Vert"|"Tortue Bleue"|"Tortue rouge"|"Tortue Verte"|"Abraknyde"|"Black Wabbit"|"Bwork"|"Bwork Archer"|"Chafer Invisible"|"Champa Bleu"|"Champa Marron"|"Champa Rouge"|"Craqueboule"|"Craqueleur"|"Dragodinde Amande Sauvage"|"Gargrouille"|"Gelée Fraise"|"Ishigro PakeKraméléhon"|"Mandrine"|"Mineur Sombre"|"Rose Obscure"|"Wabbit Squelette"|"Abrakne"|"Blop Coco"|"Blop Griotte"|"Blop Indigo"|"Blop Reinette"|"Boomba"|"Chafer"|"Chafer Fantassin"|"Cochon de Farle"|"Crocodaille"|"Pichon Kloune"|"Rib"|"Scarafeuille Blanc"|"Scarafeuille Bleu"|"Scarafeuille Rouge"|"Scarafeuille Vert"|"Scaratos"|"Scélérat Strubien"|"Scorbute"|"Tronknyde"|"Aboub"|"Akakwa"|"Amlub"|"Arakne Majeure"|"Bulbuisson"|"Cavalier Porkass"|"Codem"|"Crustorail Kouraçao"|"Crustorail Malibout"|"Crustorail Morito"|"Crustorail Passaoh"|"Dragodinde Rousse Sauvage"|"Forgeron Sombre"|"Gink"|"Grand Pa Wabbit"|"Kirevam"|"Let Emoliug"|"Nebgib"|"Nipul"|"Wo Wabbit"|"Abraknyde Vénérable"|"Chafer Archer"|"Chafer d'élite"|"Chafer Lancier"|"Craqueleur des plaines"|"DoK Alako"|"Fangshu"|"Gamino"|"Koalak Immature"|"Kokoko"|"La Ouassingue"|"Le Ouassingue"|"Le Ouassingue Entourbé"|"Osurc"|"Palmifleur Malibout"|"Palmifleur Morito"|"Palmifleur Passaoh"|"Ramane d'Egoutant"|"Sanglier Des Plaines"|"Susej"|"Chafer Draugr"|"Crachefoux"|"Craqueboule Poli"|"Dragacé"|"Ino-Naru"|"Kanniboul Ark"|"Kanniboul Eth"|"Kanniboul Jav"|"Kanniboul Sarbak"|"Kwak de Flamme"|"Kwak de Glace"|"Kwak de Terre"|"Kwak de Vent"|"Macien"|"Maître Bolet"|"Palmifleur Kouraçao"|"Porsalu"|"Rat d'Egoutant"|"Sarkapwane"|"Vétauran"|"Betto"|"Canondorf"|"Corailleur"|"Don Duss Ang"|"Dragoeuf Ardoise"|"Dragoeuf Argile"|"Dragoeuf Calcaire"|"DragOeuf Charbon"|"Félygiène"|"Koalak Coco"|"Koalak Griotte"|"Koalak Indigo"|"Koalak Reinette"|"Lolojiki"|"Moumoule"|"Nakunbra"|"Rat d'Hyoactif"|"Raul Mops"|"Serpiplume"|"Sparo"|"Barbroussa"|"Bitouf des plaines"|"Chef Crocodaille"|"Chiendent"|"Craqueleur poli"|"Don Dorgan"|"Fantôme Apero"|"Fantôme Aux Plates"|"Fantôme Egérie"|"Fantôme Hicide"|"Kanigrou"|"Kido"|"Kilibriss"|"Kurookin"|"Larve Champêtre"|"Mufafah"|"MulouNerbe"|"Serpentin"|"Souris Verte"|"Abrakne sombre"|"Abraknyde sombre"|"Alhyène"|"Bourdard"|"Chevaucheur koalak"|"Dragodinde Dorée sauvage"|"Dragueuse"|"Fossoyeur koalak"|"Foufayteur"|"Gloutovore"|"Guerrier koalak"|"Koalak forestier"|"Kokom"|"Meupette"|"Orfélin"|"Panthègros"|"Parashukouï"|"Pékeualak"|"Piralak"|"Warko marron"|"Bitouf sombre"|"Bizarbwork"|"Bourbassingue"|"Brouture"|"Disciple zoth"|"Dragnarok"|"Draguaindrop"|"Fécorce"|"Floribonde"|"Gamine zoth"|"Grenufar"|"Guerrier zoth"|"Koalak farouche"|"Koalak sanguin"|"Krambwork"|"Mama koalak"|"Médibwork"|"Mégabwork"|"Momie koalak"|"Warko violet"|"Abrakleur sombre"|"Boumbardier"|"Dragoss Ardoise"|"Dragoss Argile"|"Dragoss Calcaire"|"Dragoss Charbon"|"Drakoalak"|"Fauchalak"|"Kaniblou"|"Maître koalak"|"Malle Outillée"|"Poolay"|"Robionicle"|"Robot Fléau"|"Rouquette"|"Tétonuki"|"Tourbassingue"|"Troollaraj"|"Abrakleur clair"|"Bakazako"|"Bitouf aérien"|"Champ à gnons"|"Champaknyde"|"Champbis"|"Champmane"|"Champodonte"|"Jiangshi-nobi"|"Kaskargo"|"Lichangoro"|"Madura"|"Maître Zoth"|"Onabu-geisha"|"Pétartifoux"|"Roissingue"|"Sergent zoth"|"Tambouraï"|"Tromperelle"|"Tsukinochi"|"Kaonashi"|"Tsume-Bozu"|"Blop Coco Royal"|"Blop Griotte Royal"|"Blop Indigo Royal"|"Blop Reinette Royal"|"Bouftou Royal"|"Bworkette"|"Déminoboule"|"Dragon Cochon"|"Gelée Royale Bleue"|"Gelée Royale Menthe"|"Minotoror"|"Mob l'Eponge"|"Mominotor"|"Rat Blanc"|"Rat Noir"|"Scarabosse Doré"|"Shin Larve"|"Tofu Royal"|"Tournesol Affamé"|"Wabbit GM"|"Abraknyde ancestral"|"Blop multicolore royal"|"Corailleur magistral"|"Craqueleur légendaire"|"Gardienne des égouts"|"Gelée Royale Fraise"|"Gourlo le terrible"|"Hanshi"|"Hell Mina"|"Koulosse"|"Maître corbac"|"Meulou"|"Moon"|"Skeunk"|"Tanukoui San"|"Tynril ahuri"|"Tynril consterné"|"Tynril déconcerté"|"Tynril perfide"|"Wa wabbit"|"Bworker"|"Chêne mou"|"Crocabulia"|"Founamboul"|"Gelée Royale Citron"|"Haute Truche"|"Kimbo"|"Minotot"|"Ougah"|"Silf le rasboul majeur"|"Sphincter cell"|"Arachitik la Souffreteuse"|"Araknay la Galopante"|"Arakule la Revancharde"|"Boudalf le Blanc"|"Boulgourvil le Lointain"|"Chamchie le Difficile"|"Craraboss le Féérique"|"Larvonika l'Instrument"|"Mosketère le Dévoué"|"Pioufe la Maquillée"|"Pioukas la Plante"|"Pioulbrineur le Mercenaire"|"Pioulette la Coquine"|"Pioussokrim le Délétère"|"Pioustone le Problème"|"Pissdane l'Insipide"|"Sourizoto le Collant"|"Tofuldebeu l'Explosif"|"Tofumanchou l'Empereur"|"Tofurapin le Pétri"|"Bandapar l'Exclu"|"Bandson le Tonitruant"|"Boudur le Raide"|"Boufdégou le Refoulant"|"Gelanal le Huileux"|"Geloliaine l'Aérien"|"Gobstiniais le Têtu"|"Kolforthe l'Indécollable"|"Kwoanneur le Frimeur"|"Larchimaide la Poussée"|"Larvapstrè le Subjectif"|"Nodkoku le Trahi"|"Roz la Magicienne"|"Serpistol l'Illustre"|"Tikosto le Mousse"|"Tiwa'Missou le Gateux"|"Tiwalpé le Dévêtu"|"Tiwoflan le Lâche"|"Tour le Vice"|"Trukul le Lent"|"Bi le Partageur"|"Bilvoezé le Bonimenteur"|"Bistou le Quêteur"|"Bistou le Rieur"|"Boostif l'Affamé"|"Bouflet le Puéril"|"Champayr le Disjoncté"|"Chevaustine le Reconstruit"|"Chonstip la Passagère"|"Cromikay le Néophyte"|"Étoilette la Bouchée"|"Milipussien le Géant"|"Porfavor le Quémandeur"|"Preskapwal le Tendancieux"|"Robiolego l'Assemblé"|"Sangria le Fruité"|"Tortenssia la Fleurie"|"Torthur la Lutte"|"Vampunor le Glacial"|"Wabbitud le Constant"|"Bambouské le Camouflé"|"Barchwork le Multicolore"|"Bwormage le Respectueux"|"Corpat le Vampire"|"Crognan le Barbare"|"Fourapin le Chaud"|"Maître Amboat le Moqueur"|"Milipatte la Griffe"|"Minoskour le Sauveur"|"Minsinistre l'Elu"|"Neufedur le Flottant"|"Pichakoté le Dégoûtant"|"Pichdourse le Puissant"|"Pichduitre le Totem"|"Pichtoire l'Erudit"|"Robocoop l'Échangé"|"Rostensyl la Cuisinière"|"Tortilleur le Coulé"|"Tortorak le Cornu"|"Wagnagnah le Sanglant"|"Abrakroc l'Edenté"|"Bworkasse le Dégoûtant"|"Chafalfer l'Optimiste"|"Chamdblé le Cultivé"|"Chamflay le Ballonné"|"Champayt l'Odorant"|"Crakmitaine le Faucheur"|"Craquetuss le Piquant"|"Draglida la Disparue"|"Garsim le Mort"|"Gelaviv le Glaçon"|"Krapahut le Randonneur"|"Mallopiée l'Épineuse"|"Mandalo l'Aqueuse"|"Ribibi le Cher"|"Scapé l'Epée"|"Scaramel le Fondant"|"Scarfayss le Balafré"|"Scarouarze l'Epopée"|"Watdogue le Bien Nommé"|"Abrakadnuzar"|"Blof l'Apathique"|"Bloporte le Veule"|"Blordur l'Infect"|"Blorie l'Assourdissante"|"Boombata le Garde"|"Bulsavon le Gonflé"|"Chafemal le Bagarreur"|"Chaffoin le Sournois"|"Crolnareff l'Exilé"|"Cruskof le Rustre"|"Crustensyl le Pragmatique"|"Crustterus l'Organique"|"Dragnoute l'Irascible"|"Farlon l'Enfant"|"Larvomatik le Propre"|"Radoutable le Craint"|"Scaratyn l'Huître"|"Scorpitène l'Enflammé"|"Tronkoneuz la Tranchante"|"Aboudbra le Porteur"|"Ameur la Laide"|"Arabord la Cruche"|"Cavordemal le Sorcier"|"Chafmarcel le Fêtard"|"Chalan le Commerçant"|"Codenlgaz le Problème"|"Crusmeyer le Pervers"|"Floriste la Cannibale"|"Forboyar l'Enigmatique"|"Ginsenk le Stimulant"|"Grandilok le Clameur"|"Kiroyal le Sirupeux"|"Koktèle le Secoué"|"Let le Rond"|"Nelvin le Boulet"|"Nipulnislip l'Exhibitionniste"|"Osuxion le Vampirique"|"Susbewl l'Hypocrite"|"Wokènrôl le Danseur"|"Abrakildas le Vénérable"|"Chafrit le Barbare"|"Cramikaz le Suicidaire"|"Craquetou le Fissuré"|"Doktopuss le Maléfique"|"Germinol l'Indigent"|"Grenuche la Gentille"|"Kannibal le Lecteur"|"Kapota la Fraise"|"Koalastrof la Naturelle"|"Koko la Violente"|"Maître Onom le Régulier"|"Ouashouash l'Exubérant"|"Ouassébo l'Esthète"|"Ouature la Mobile"|"Palmiche le Serein"|"Palmiflette le Convivial"|"Palmito le Menteur"|"Ramitant le Dilettante"|"Sampi l'Eternel"|"Akaka le Souillé"|"Bebetto l'Intellectuel"|"Corboyard l'Enigmatique"|"Dragioli le Succulent"|"Kannémik le Maigre"|"Kannisterik le Forcené"|"Kwakamole l'Appétissant"|"Kwaké le Piraté"|"Kwakolak le Chocolaté"|"Kwakwatique le Trempé"|"Moumoute la Douce"|"Ougaould le Parasite"|"Palmbytch la Bronzée"|"Parapadkouï l'Émasculé"|"Porsalé le Râleur"|"Ratlbol l'Aigri"|"Rauligo le Sale"|"Sarkastik l'Incompris"|"Serpistule le Purulent"|"Vétaurine L'énergisé"|"Barebourd le Comte"|"Caboume l'Artilleur"|"Chiendanlémin l'Illusionniste"|"Dragkouine la Déguisée"|"Dragmoclaiss le Fataliste"|"Dragnostik le Sceptique"|"Dragstayr le Fonceur"|"Fandanleuil le Précis"|"Fanlabiz le Véloce"|"Fantoch le Pantin"|"Fantrask la Rêveuse"|"Koakofrui le Confit"|"Koamaembair le Coulant"|"Koarmit la Batracienne"|"Koaskette la Chapelière"|"Nakuneuye le Borgne"|"Nerdeubeu le Flagellant"|"Ratéhaifaim le Professeur"|"Sparoket le Lanceur"|"Tilolo la Bien Moulée"|"Alhoui le Répondeur"|"Bonpake le Chavireur"|"Bourde le Maladroit"|"Crathdogue le Cruel"|"Crok le Beau"|"Dragonienne l'Econome"|"Félyssion la Gourmande"|"Fouflay le Retombé"|"Guerrite le Veilleur"|"Kanasukr le Mielleux"|"Kanibière l'Encordée"|"Kido l'Âtre"|"Kilimanj'haro le Grimpeur"|"Larvaloeil l'Émue"|"Mufguedin le Suprême"|"Muloufok l'Hilarant"|"Orfélyre le Charmeur"|"Pantacour le Long"|"Souristiti l'Immortalisée"|"Toufou le Benêt"|"Abrakanette l'Encapsulé"|"Abraklette le Fondant"|"Bitoven le Musicien"|"Brouste l'Humiliant"|"Craquecrac l'Endurant"|"Diskord le Belliqueux"|"Dragdikal le Décisif"|"Dragobert le Monarque"|"Fossamoel le Juteux"|"Gloubibou le Gars"|"Inopenope le Négatif"|"Koamag'oel le Défiguré"|"Koasossyal le Psychopathe"|"Lichangora l'Immaculée"|"Meuroup le Prêtre"|"Pékeutar le Tireur"|"Piradain le Pingre"|"Rooroku l'Imposant"|"Tétonée la Plantureuse"|"Warkolad l'Etreinte"|"Abrakine le Sombre"|"Bouliver le Géant"|"Drageaufol la Joyeuse"|"Dragminster le Magicien"|"Dragtarus le Bellâtre"|"Drakolage le Tentateur"|"Draquetteur le Voleur"|"Ecorfé la Vive"|"Fangshui la Dysorthographiée"|"Faufoll la Joyeuse"|"Floanna la Blonde"|"Gastroth la Contagieuse"|"Guerumoth le Collant"|"Koalaboi le Calorifère"|"Koalvissie le Chauve"|"Mamakomou l'Âge"|"Momikonos la Bandelette"|"Pétarfoutu le Mouillé"|"Tourbiket le Virevoletant"|"Wara l'Amer"|"Abrinos le Clair"|"Bigbadaboum l'Élémentaire"|"Chamiléro le Malchanceux"|"Chamoute le Duveteux"|"Champmé le Méchant"|"Champolyon le Polyglotte"|"Champoul l'Illuminé"|"Crachefouxtre le Surpris"|"Don Kizoth l'Obstiné"|"Jiankor le Radoteur"|"Kaskapointhe la Couverte"|"Maître Koantik le Théoricien"|"Onabuémangé la Rassasiée"|"Poolopo la Traditionnelle"|"Seripoth l'Ennemi"|"Tambouille le Gastronome"|"Toutouf le Velu"|"Tromplamor le Survivant"|"Trooyé l'Oxydé"|"Tsucékoi la Colporteuse"|"Bakaglace le Congelé"|"Kaonucléair l'Instable"|"Madgang le Docteur"|"Roy le Merlin"|"Tronquette la Réduite"|"Tsumani l'Inondeur", quantite?:string, etat?:"propose"|"recherche"|"aucun"}[]} data Monstres, quantités, états.
		 * @example
		 * * MetamobAPI.PUT.userMonsters("Popop", "123a45-6b789c-d12345-6ef789-1g23h4", [
		 * { monstre:"Arakne", quantite:"5", etat:"recherche" }
		 * ]).then(data => console.log(data));
		 * // Le monstre Arakne sera marqué à 5 exemplaires, même s'il était à 0 ou 10 avant, et passera à l'état recherché.
		 * * MetamobAPI.PUT.userMonsters("Popop", "123a45-6b789c-d12345-6ef789-1g23h4", [
		 * { monstre:"Arakne", quantite:"+3" }
		 * ]).then(data => console.log(data));
		 * // La quantité du monstre Arakne sera incrémenter de 3.
		 * * MetamobAPI.PUT.userMonsters("Popop", "123a45-6b789c-d12345-6ef789-1g23h4", [
		 * { monstre:"Arakne", quantite:"-2" }
		 * ]).then(data => console.log(data));
		 * // La quantité du monstre Arakne sera décrémenter de 2.
		 * @returns {Promise<{ reussite: Record<string, string[]>, erreurs: string[]}|void>}
		 */

		async userMonsters(pseudo_utilisateur, clé_unique_utilisateur, data) {

			return await new Promise(async (resolve, reject) => {

				try {

					if (!config.APIKey || config.APIKey === false) {
						reject(new Error("❌ Clé API non fournie, utilisez MetamobAPI.config(\"votre_clé_API\")."));
					}

					if (isRateLimited()) {
						reject(new Error("❌ Trop de requêtes effectuées en 1 minute. Les appels vers l'api de metamob sont limités à 60/minute max."));
					}

					const dataResult = [];

					for (let i = 0; i < data.length; i++) {
						if (data[i].etat && data[i].quantite) {
							dataResult.push({ id:monsters.find(x => x.nom === data[i].monstre).id, quantite:data[i].quantite, etat:data[i].etat });
						}
						if (data[i].etat && !data[i].quantite) {
							dataResult.push({ id:monsters.find(x => x.nom === data[i].monstre).id, etat:data[i].etat });
						}
						if (!data[i].etat && data[i].quantite) {
							dataResult.push({ id:monsters.find(x => x.nom === data[i].monstre).id, quantite:data[i].quantite });
						}
					}

					const link = `https://api.metamob.fr/utilisateurs/${pseudo_utilisateur}/monstres`;

					const response = await fetch(link, {
						method:"PUT",
						headers:{
							"HTTP-X-APIKEY":config.APIKey,
							"HTTP-X-USERKEY":clé_unique_utilisateur,
						},
						body:JSON.stringify(dataResult),
					});

					const result = JSON.parse(JSON.stringify(await response.json()));

					resolve(result);

				}

				catch (error) {
					reject(error);
				}

			});

		},

		/**
		 * * Réinitialise les monstres sur le compte. Cela signifie que toutes les informations relatives aux monstres seront supprimées !
		 * * Les monstres seront mis à l'état aucun (ni recherché ni proposé), avec une quantité nulle (0).
		 * @param {string} pseudo_utilisateur Pseudo de l'utilisateur.
		 * @param {string} clé_unique_utilisateur Identifiant unique de l'utilisateur.
		 * @example
		 * MetamobAPI.PUT.userReset("Popop", "123a45-6b789c-d12345-6ef789-1g23h4").then(data => console.log(data));
		 * @returns {Promise<{ reussite: string, erreurs: string[]}|void>}
		 */

		async resetUserMonsters(pseudo_utilisateur, clé_unique_utilisateur) {

			return await new Promise(async (resolve, reject) => {

				try {

					if (!config.APIKey || config.APIKey === false) {
						reject(new Error("❌ Clé API non fournie, utilisez MetamobAPI.config(\"votre_clé_API\")."));
					}

					if (isRateLimited()) {
						reject(new Error("❌ Trop de requêtes effectuées en 1 minute. Les appels vers l'api de metamob sont limités à 60/minute max."));
					}

					const link = `https://api.metamob.fr/utilisateurs/${pseudo_utilisateur}/monstres/reinitialiser`;

					const response = await fetch(link, {
						method:"PUT",
						headers:{
							"HTTP-X-APIKEY":config.APIKey,
							"HTTP-X-USERKEY":clé_unique_utilisateur,
						},
					});

					const result = JSON.parse(JSON.stringify(await response.json()));

					resolve(result);

				}

				catch (error) {
					reject(error);
				}

			});

		},

	},

};

module.exports = MetamobAPI;