<template>
    <section class="error">
        <div class="icon">
            <Rain />
        </div>
        <h1>Oops... Something wrong append</h1>
    </section>
</template>
<script>
import Rain from '@/assets/img/weatherIcons/rain.svg';

export default {
  components: {
    Rain,
  },
};
</script>
<style lang="sass">
.error
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  .icon
    margin-top: 5vh
</style>
