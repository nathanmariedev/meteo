<!--
****************************************************************************************************
***                                       Tooltip                                                ***
****************************************************************************************************

Affiche une bulle positionée au-dessus de son parent si la prop 'show' est true.

***************************************************************************************
** Appliquer 'position: relative' au parent pour que la bulle soit bien positionnée. **
***************************************************************************************

Pour changer la taille et la position du triangle, jouer avec le composant .app-tooltip:after (tuto: https://css-tricks.com/snippets/css/css-triangle/)
Il faudra adapter en fonction la position du composant.

Propriétés CSS importantes :

.app-tooltip
  top, left, right, bottom, transform -> ajuste la position de la bulle par rapport au parent
  &:after
    top, left, right, bottom -> ajuste la position du triangle par rapport à la bulle
    transform -> fait apparaître le triangle hors de la bulle (à l'intérieur sinon)
                *****************************************************************************************************
                * Le 1px est nécessaire pour ne pas avoir une fine ligne transparente entre le triangle et la bulle *
                *****************************************************************************************************
    border-color -> Pour une flèche droite, ne donner une couleur qu'à un côté. Pour une flèche "penchée", en colorer 2
    filter: drop-shadow -> ajoute de l'ombre autour du triangle
    clip-path: inset -> enlève l'ombre sur un côté du triangle

-->
<template>
  <div class="app-tooltip" :class="{ shown: show }">
    <slot></slot>
  </div>
</template>

<script>

export default {
  props: {
    show: [Boolean],
  },
};
</script>

<style lang="sass">
.app-tooltip
  display: none
  position: absolute
  left: 90%
  top: 0
  min-height: 2rem
  min-width: 7rem
  transform: translateY( calc(-100% - 1rem)) /* Decalage de 100% + hauteur du triangle*/
  padding: 0.7rem 1rem
  color: $text-color
  text-transform: none
  background: $light-color
  border-radius: 8px
  box-shadow: 2px 2px 4px rgba(191, 191, 191, 0.25)
  &:after
    content: ''
    width: 0
    height: 0
    position: absolute
    bottom: 0
    left: 10%
    transform: translateY(calc(100% - 1px))
    border: 1rem solid transparent
    border-width: 0.5rem 1rem
    border-top-color: $light-color
    border-left-color: $light-color
    filter: drop-shadow(2px 2px 4px rgba(191, 191, 191, 0.25))
    clip-path: inset(0 -4px -4px -4px)

.app-tooltip.shown
  display: flex

</style>
