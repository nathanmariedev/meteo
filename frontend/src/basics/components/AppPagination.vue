<!--
****************************************************************************************************
***                                    Pagination                                                ***
****************************************************************************************************

Composant pagination, il suppose agir sur le paramètre query de la page en cours,
mais une prop :route serait tout à fait envisageable aussi.

*************
*** PROPS ***
*************
  - offset :
    nombre d'éléments décalés

  - limit :
    nombre d'éléments par page

  - count :
    nombre d'éléments total

  Exemple :
  <app-pagination :offset="50" :limit="10" :count="300"/>

-->
<template>
  <div class="app-pagination">
    <router-link
      :class="{ disabled: currentPage === 1 }"
      :to="{ query: { ...$route.query, page: currentPage - 1 }}" class="arrow">
      ᐸ
    </router-link>

    <router-link
      v-if="currentPage > 1"
      :to="{ query: { ...$route.query, page: 1 }}" class="first">
        1
    </router-link>

    <span v-if="currentPage > 3" class="more">...</span>

    <router-link
      v-if="currentPage > 2"
      :to="{ query: { ...$route.query, page: currentPage - 1 }}" class="previous">
      {{ currentPage - 1 }}
    </router-link>

    <router-link :to="{ query: { ...$route.query, page: currentPage }}" class="current">{{ currentPage }}</router-link>

    <router-link
      v-if="currentPage + 1 < lastPage"
      :to="{ query: { ...$route.query, page: currentPage + 1 }}" class="after">
        {{ currentPage + 1 }}
    </router-link>

    <span  v-if="currentPage + 2 <= lastPage" class="more">...</span>

    <router-link
      v-if="currentPage  < lastPage"
      :to="{ query: { ...$route.query, page: lastPage }}" class="last">
        {{ lastPage }}
    </router-link>

    <router-link
      :class="{ disabled: currentPage  === lastPage }"
      :to="{ query: { ...$route.query, page: currentPage + 1 }}" class="arrow">
        ᐳ
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    offset: {
      type: [Number],
    },
    limit: {
      type: [Number],
    },
    count: {
      type: [Number],
    },
  },
  data() {
    return {
    };
  },
  computed: {
    currentPage() {
      return Math.floor(this.offset / this.limit) + 1;
    },
    lastPage() {
      return Math.floor(this.count / this.limit) + 1;
    },
  },
  methods: {
  },
};
</script>

<style lang="sass">
.app-pagination
  display: inline-flex
  align-items: center
  margin: 0.1rem 0
  padding: 0.5rem 0.6rem 0.4rem
  background: lighten($light-color, 8%)
  border-radius: $global-border-radius
  .arrow
    color: $main-color
    font-weight: bold
    font-size: 0.8rem
    font-weight: bold
    cursor: pointer
  a, span
    display: inline-flex
    align-items: center
    justify-content: center
    padding: 0.5rem 0.8rem
    width: 50px
    height: 50px
    color: $text-color
    font-size: 1.2rem
    border-radius: 50%
    transition: all ease-in-out 0.25s
    &:hover
      background: lighten($light-color, 4%)
    &.current
      color: $main-color
      font-weight: bold
    &.disabled
      color: lighten($text-color, 40%)
  span:hover
    background: transparent

</style>
