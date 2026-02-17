# COMMENT AJOUTER VOS PHOTOS DE PIZZAS

## Etape simple :

1. Prenez vos photos de pizzas
2. Placez-les dans le dossier : `frontend/public/images/pizzas/`
3. Nommez chaque photo avec l'identifiant de la pizza (voir liste ci-dessous)
4. Format : `.jpg` (vous pouvez aussi utiliser .png ou .webp en modifiant le code)

## Liste des noms de fichiers :

### Pizzas Traditionnelles
- `margherita.jpg`
- `marinara.jpg`
- `4-saisons.jpg`
- `4-fromages.jpg`
- `capriciosa.jpg`
- `romana.jpg`
- `jambon.jpg`
- `funghi.jpg`
- `jambon-salami.jpg`
- `jambon-champignon.jpg`
- `napoli.jpg`
- `vegetarienne.jpg`
- `al-tonno.jpg`
- `calzone.jpg`
- `calzone-farcito.jpg`
- `diavola.jpg`
- `parmigiana.jpg`
- `contadina.jpg`
- `hawaii.jpg`
- `carbonara.jpg`
- `al-pollo.jpg`
- `rucola.jpg`
- `fruit-de-mer.jpg`
- `boscaiola.jpg`
- `scampi.jpg`
- `regina.jpg`
- `vegan.jpg`

### Pizzas Speciales
- `tirolese.jpg`
- `terra-mare.jpg`
- `carpacio.jpg`
- `antica.jpg`
- `houba.jpg`
- `burratina.jpg`
- `cucciolo.jpg`
- `kefta.jpg`
- `supreme.jpg`
- `taktouka.jpg`
- `saporita.jpg`
- `spaccanapoli.jpg`

### Speciales Sans Tomate
- `agrodolce.jpg`
- `dotto.jpg`
- `al-tartufo.jpg`
- `delizia.jpg`
- `biancaneve.jpg`
- `popeye.jpg`
- `caprese-pizza.jpg`
- `fresca.jpg`
- `genovese.jpg`

### Salades & Entrees
- `salade-nicoise.jpg`
- `caprese-salad.jpg`
- `salade-cesar.jpg`
- `salade-chevre.jpg`
- `salade-scampi.jpg`
- `antipasto-carpaccio.jpg`
- `antipasto-charcuteries.jpg`
- `lasagne-maison.jpg`
- `polpette-napolitain.jpg`
- `antipasto-parmigiana.jpg`
- `focaccia-aromatisee.jpg`

### Panuozzi
- `panuozzo-salami.jpg`
- `panuozzo-viande.jpg`
- `panuozzo-thon.jpg`
- `panuozzo-bresaola.jpg`
- `panuozzo-poulet.jpg`
- `panuozzo-jambon.jpg`
- `boissons.jpg`

### Desserts
- `cannoli.jpg`
- `tiramisu-trad.jpg`
- `tiramisu-amaretti.jpg`
- `tiramisu-speculoos.jpg`
- `panna-cotta.jpg`

## Exemple :
Si vous avez une photo de votre Margherita, nommez-la `margherita.jpg` et placez-la dans `frontend/public/images/pizzas/margherita.jpg`

Le site affichera automatiquement la photo. Si aucune photo n'est trouvee, le placeholder (icone pizza) s'affichera.

## Pour changer le format d'image :
Si vos photos sont en .png ou .webp, ouvrez le fichier `frontend/src/components/MenuItem.js` et changez `.jpg` par votre extension dans la ligne :
```
const imagePath = `/images/pizzas/${item.id}.jpg`;
```
