<!--
****************************************************************************************************
***                                          Table                                               ***
****************************************************************************************************

*************
*** PROPS ***
*************

* headers : [Object] - liste d'objets décrivant les en-têtes des colonnes
Le champ "label" est celui qui sera utilisé pour l'affichage
Le champ "key" peut différer selon l'utilisation.
  - Si vous ne comptez pas personnaliser l'affichage des cases de la colonne, donc ne pas spécifier de slot. Alors le champ key doit correspondre à une propriété de l'objet passé en props "data". De cette façon le component affichera automatiquement la valeur de la propriété dans la case, dans une balise <p>
  - Maintenant si vous comptez personnaliser l'affichage des cases de la colonne OU si votre propriété est nested (sous-objet). Alors le champ key servira seulement à retrouver la colonne lors de la spécification du template. Il doit donc être unique mais pas forcément correspondre à une propriété de l'objet en props "data"

Exemple:

[
  {
    label: 'Object ID',
    key: 'objectId', //  Ici, on affichera la propriété "objectId" de l'objet
  },
  {
    label: 'Color',
    key: 'color', //  Ici, on affichera la propriété "color" de l'objet
  },
  {
    label: 'Digit',
    key: 'metadata.pagination.page', // Ici, vu que les sous-objets ne sont pas pris en compte, il servira juste pour le retrouver dans les slots
  },
  {
    label: 'Bool',
    key: 'bool', //  Ici, on affichera la propriété "bool" de l'objet
  }
]

* data : [Object] - liste d'objets à afficher

Exemple:

[
  {
    objectId: '1',
    color: 'red',
    bool: true,
    metadata: {
      pagination: {
        page: 10,
      },
    },
  },
  {
    objectId: '2',
    color: 'blue',
    bool: true,
    metadata: {
      pagination: {
        page: 22,
      },
    },
  },
  {
    objectId: '3',
    color: 'yellow',
    bool: false,
    metadata: {
      pagination: {
        page: 57,
      },
    },
  }
]

* loading : Boolean - sert à changer l'affichage du tableau par le contenu passé dans le slot "loading"

*************
*** SLOTS ***
*************

Doc sur les scope-slots
- https://fr.vuejs.org/v2/guide/components-slots.html#Slots-avec-portee
- https://www.digitalocean.com/community/tutorials/vuejs-scoped-component-slots

Il est possible de personnaliser plusieurs éléments du tableau grâce aux "scope-slots". On peut indiquer une balise "template" pour personnaliser l'affichage des cases d'une colonne, sinon on garde l'affichage par défaut qui est un simple <p>

* header - Avec ce slot on indique quel format auront les cases de header. L'objet "data" nous donne accès aux champs définis dans la liste "headers" en props.
  NOTE : si ce slot n'est pas spécifié, alors le champ "label" de l'objet passé en props "headers" sera affiché dans une balise <label>

  Exemple:

  <app-table :headers="headers" :data="data">
    <template slot="header" slot-scope="{ data }">
      <p><strong>{{ data.label }}</strong></p>
    </template>
  </app-table>

* CLE_CHAMP - Alors pour ce slot, le nom dépend du champ "key" que vous avez défini dans la liste "headers" en props. L'objet "data" nous donne accès aux objets passés en props "data"
  NOTE : si ce slot n'est pas spécifié pour une colonne, alors la propriété définie par le champ "key" du header de l'objet sera affiché dans une balise <p>

  Exemple:

  <app-table :headers="headers" :data="data">
    <template slot="objectId" slot-scope="{ data }">
      <p><strong>{{ data.objectId }}</strong></p>
    </template>

    <template slot="metadata.pagination.page" slot-scope="{ data }">
      <p><strong>{{ data.metadata.pagination.page }}</strong></p>
    </template>
  </app-table>

* empty-table - Avec ce slot on indique le contenu que l'on souhaite afficher lorsque la liste "data" en props est vide. On aura toujours les headers affichés, mais le contenu de la table est remplacé par ce template

  Exemple:

  <app-table :headers="headers" :data="data">
    <template slot="empty-table">
      <p>Oups, c'est vide !</p>
    </template>
  </app-table>

* loading - Avec ce slot on indique le contenu que l'on souhaite afficher lorsque le props "loading" est à true. De la même manière que pour le slot "empty-table", on aura toujours les headers affichés, mais le contenu de la table est remplacé par ce template

  Exemple:

  <app-table :headers="headers" :data="data">
    <template slot="loading">
      <p>LOADING...</p>
    </template>
  </app-table>
-->

<template>
  <section class="app-table">
    <div class="grid-x header">
      <div
        v-for="header in headers"
        :key="header.key"
        class="cell auto">
        <slot v-if="$scopedSlots.header" name="header" :data="header"></slot>
        <label v-else>{{ header.label }}</label>
      </div>
    </div>

    <div v-if="loading">
      <slot name="loading"></slot>
    </div>
    <div v-else-if="data && data.length > 0" class="grid-x data">
      <div
        v-for="(line, index) in data"
        :key="index"
        class="line"
        :class="{ 'pair' : index % 2 === 0 }">
        <div
          v-for="header in headers"
          :key="`${index}-${header.key}`"
          class="cell auto">
          <!-- Affichage custom si le slot est spécifié -->
          <slot
            v-if="$scopedSlots[header.key]"
            :name="header.key"
            :data="line"></slot>

          <!-- Affichage par défaut, juste du texte -->
          <p v-else>
            {{ line[header.key] }}
          </p>
        </div>
      </div>
    </div>
    <slot v-else name="empty-table"></slot>
  </section>
</template>

<script>
export default {
  name: 'app-table',
  props: {
    headers: [Array],
    // Format [{ label: 'Lorem Ipsum', key: 'lorem' }]
    data: [Array],
    loading: [Boolean],
  },
};
</script>

<style lang="sass">
.app-table
  width: 100%
  .header
    padding: 1rem 1.25rem 1rem 1.25rem
    background-color: white
    div
      display: flex
      justify-content: flex-start
      align-items: center
      button
        padding: 0
  .data
    .line
      display: flex
      flex-direction: row
      align-items: center
      width: 100%
      height: 50px
      padding: 0 1rem 0 1rem
      background-color: white
      text-align: left
    .pair
      background-color: lighten($second-color, 60%)
</style>
