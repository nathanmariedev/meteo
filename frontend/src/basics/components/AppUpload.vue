<!--
****************************************************************************************************
***                                       Upload                                               ***
****************************************************************************************************

Composant upload, il gère :
 - upload simple ou multiple
 - drag & drop de fichier(s)
 - affichage du progress d'axios (simple ou multiple) à l'aide du fichier utilitaire upload.js

*************
*** PROPS ***
*************

  - multiple :
    un ou plusieurs fichiers

  - progress :
    progression de l upload

  - accept :
    type de fichier accepté

  Exemple :
  <app-upload v-model="answer10" :progress="multipleProgressUpload" :multiple="true"/>
  <app-upload v-model="answer11" :progress="progressUpload"/>

  Exemple de gestion d'upload API :
  async handleFiles() {
    if (this.answer10) {
      // Si on a un upload avec des fichiers multiples
      const files = this.answer10;

      // On construit le tableau de promesses
      const uploadPromises = files.map(async (file, index) => {
        await document.upload(file, (progressEvent) => {
          this.multipleProgressUpload = uploadService.getProgress(progressEvent, index);
        });

        this.$notification.show({
          text: `Fichier ${file.name} uploadé !`,
        });
      });

      try {
        await Promise.allSettled(uploadPromises);

        this.multipleProgressUpload = 0;
        this.answer10 = null;
      } catch (error) {
        this.$message.show({
          title: 'Erreur',
          text: 'Il y a eu une erreur lors de l’envoi de vos fichiers.',
          confirmText: 'Ok',
          hasCancel: false,
        });

        throw error;
      }
    }
  }

  async handleSimpleFile() {
    if (this.answer11) {
      try {
        await document.upload(this.answer11, (progressEvent) => {
          // On calcule le pourcentage de la progression
          this.progressUpload = uploadService.getProgress(progressEvent);
        });

        this.$notification.show({
          text: `Fichier ${this.answer11.name} uploadé !`,
        });

        this.progressUpload = 0;
        this.answer11 = null;
      } catch (error) {
        this.$message.show({
          title: 'Erreur',
          text: 'Il y a eu une erreur lors de l’envoi de votre fichier.',
          confirmText: 'OK',
          hasCancel: false,
        });

        throw error;
      }
    }
  }

-->
<template>
  <div class="app-upload" :class="{ drag: isDragOver || progress > 0 || value}"
    @dragenter.prevent="isDragOver = true"
    @dragover.prevent="isDragOver = true"
    @dragleave.prevent="isDragOver = false"
    @drop.prevent="dropFiles">
    <label>
      <svg viewBox="0 -24 512.00046 512" xmlns="http://www.w3.org/2000/svg"><path d="m413.492188 128.910156c-17.292969-86.765625-101.648438-143.082031-188.414063-125.789062-63.460937 12.648437-113.082031 62.238281-125.769531 125.691406-61.519532 7.089844-105.648438 62.707031-98.5625 124.230469 6.523437 56.621093 54.480468 99.339843 111.476562 99.300781h80.09375c8.847656 0 16.019532-7.171875 16.019532-16.019531 0-8.847657-7.171876-16.019531-16.019532-16.019531h-80.09375c-44.238281-.261719-79.882812-36.332032-79.625-80.566407.261719-44.234375 36.332032-79.882812 80.570313-79.625 8.164062.003907 15.023437-6.140625 15.921875-14.253906 8.132812-70.308594 71.722656-120.710937 142.03125-112.578125 59.109375 6.839844 105.738281 53.464844 112.574218 112.578125 1.34375 8.257813 8.5 14.308594 16.867188 14.253906 44.238281 0 80.097656 35.859375 80.097656 80.097657 0 44.234374-35.859375 80.09375-80.097656 80.09375h-80.09375c-8.847656 0-16.019531 7.171874-16.019531 16.019531 0 8.847656 7.171875 16.019531 16.019531 16.019531h80.097656c61.925782-.386719 111.816406-50.898438 111.433594-112.828125-.351562-56.394531-42.53125-103.753906-98.507812-110.605469zm0 0"/><path d="m313.019531 287.464844c6.148438 6.367187 16.289063 6.542968 22.652344.394531 6.363281-6.144531 6.539063-16.285156.394531-22.648437-.128906-.136719-.261718-.265626-.394531-.394532l-67.9375-67.953125c-6.246094-6.265625-16.390625-6.277343-22.65625-.03125-.007813.011719-.019531.019531-.027344.03125l-67.9375 67.953125c-6.363281 6.144532-6.539062 16.285156-.394531 22.648438 6.148438 6.363281 16.289062 6.539062 22.652344.394531.132812-.128906.265625-.261719.394531-.394531l40.609375-40.625v201.617187c0 8.847657 7.171875 16.019531 16.019531 16.019531 8.84375 0 16.015625-7.171874 16.015625-16.019531v-201.617187zm0 0"/></svg>
      <small v-if="value && multiple">{{ value.length }} fichiers</small>
      <small v-if="value && !multiple">1 fichier</small>
      <span v-if="progress > 0">Envoi en cours : {{ progress }} %</span>
      <span v-else-if="!value">Déposer ou ajouter votre fichier ici</span>
      <span v-else-if="value">Modifier votre fichier ici</span>
      <input ref="inputFile" type="file" @input="addFiles" :accept="accept" :multiple="multiple">
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    multiple: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      default: 0,
    },
    accept: {
      type: String,
      default: 'image/*',
    },
  },
  data() {
    return {
      isDragOver: false,
    };
  },
  watch: {
    value: 'handleInputFile',
  },
  methods: {
    dropFiles(event) {
      this.isDragOver = false;
      const upload = this.multiple ? [...event.dataTransfer.files] : [...event.dataTransfer.files][0];
      this.$emit('input', upload);
    },
    addFiles(event) {
      const upload = this.multiple ? [...event.target.files] : [...event.target.files][0];
      this.$emit('input', upload);
    },
    handleInputFile(value) {
      if (!value) this.$refs.inputFile.value = null;
    },
  },
};
</script>

<style lang="sass">
.app-upload
  label
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    padding: 2rem 5rem
    border: 1px dashed $light-color
    border-radius: $global-border-radius
    background: lighten($light-color, 10%)
    svg
      max-width: 60px
      path
        fill: $light-color
        transition: all ease-in 0.2s
    input
      display: none
  &.drag
    label svg path
      fill: $main-color
</style>
