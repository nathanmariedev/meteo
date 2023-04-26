<template>
  <section class="home">
    <div class="grid-container">
      <app-subtitle>Grille</app-subtitle>
      <p>
        Le grille est basée sur celle de Fondation pour en savoir plus :
        <a href="https://foundation.zurb.com/sites/docs/xy-grid.html" target="_blank">Grille XY Fondation</a>
      </p>
      <div class="grid-x">
        <div class="cell small-4">Colonne 1</div>
        <div class="cell small-4">Colonne 2</div>
        <div class="cell small-4">Colonne 3</div>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Boutons</app-subtitle>
      <div>
        <app-button size="small" look="primary">Bouton petit</app-button>
        <app-button size="medium" look="primary">Bouton moyen</app-button>
        <app-button size="large" look="primary">Bouton grand</app-button>
      </div>
      <div>
        <app-button size="small" look="second">Bouton petit</app-button>
        <app-button size="medium" look="second">Bouton moyen</app-button>
        <app-button size="large" look="second">Bouton grand</app-button>
      </div>
      <div>
        <app-button size="small" look="second" :loading="true">Bouton petit avec loader</app-button>
        <app-button size="medium" look="second" :loading="true">Bouton moyen avec loader</app-button>
        <app-button size="large" look="second" :loading="true">Bouton grand avec loader</app-button>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Titre</app-subtitle>
      <div>
        <app-subtitle>Sous-titre</app-subtitle>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Card</app-subtitle>
      <div class="grid-x grid-margin-x">
        <div class="cell medium-3">
          <app-card
            title="Lorem Ipsum"
            text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, deserunt."
            image="https://images.unsplash.com/photo-1632196068933-23998d66a2dd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"/>
        </div>
        <div class="cell medium-3">
          <app-card
            title="Lorem Ipsum"
            text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, deserunt."
            image="https://images.unsplash.com/photo-1632196068933-23998d66a2dd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"/>
        </div>
        <div class="cell medium-3">
          <app-card
            title="Lorem Ipsum"
            text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, deserunt."
            image="https://images.unsplash.com/photo-1632196068933-23998d66a2dd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"/>
        </div>
        <div class="cell medium-3">
          <app-card
            title="Lorem Ipsum"
            text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, deserunt."
            image="https://images.unsplash.com/photo-1632196068933-23998d66a2dd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"/>
        </div>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Message</app-subtitle>
      <div>
        <app-button @click="showMessage()">Afficher un message</app-button>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Modale</app-subtitle>
      <div>
        <app-button @click="isModalVisible = true">Afficher une modale</app-button>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Notification</app-subtitle>
      <div>
        <app-button @click="showNotification()">Afficher une notification</app-button>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Input</app-subtitle>
      <div>
        <app-input type="text" v-model="answer4"/>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>TextArea</app-subtitle>
      <div>
        <app-input type="textarea" v-model="answer4"/>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Checkbox</app-subtitle>
      <div>
        <app-checkbox v-for="item in data" :key="`c${item.name}`" :value="item.name" v-model="answer1">{{ item.label }}</app-checkbox>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Radio</app-subtitle>
      <div>
        <app-radio v-for="item in data" :key="`r${item.name}`" :value="item.name" v-model="answer2">{{ item.label }}</app-radio>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Switch</app-subtitle>
      <div>
        <app-switch v-model="answer9">Je suis un switch</app-switch>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Select simple</app-subtitle>
      <div>
        <app-select v-model="answer3" :options="data"></app-select>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Select multiple</app-subtitle>
      <div>
        <app-select v-model="answer12" :options="data" :multiple=true></app-select>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Datepicker</app-subtitle>
      <div>
        <app-datepicker v-model="answer5"/>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Slider</app-subtitle>
      <div>
        <app-slider v-model="answer7"/>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Label</app-subtitle>
      <div>
        <app-label>Label</app-label>
        <app-input type="text"/>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Progress</app-subtitle>
      <div>
        <app-progress :data="dataAnswer8" :active="answer8"/>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Table</app-subtitle>
      <div>
        <app-table
          :headers="tableHeaders"
          :data="tableData">
          <template slot="objectId" slot-scope="{ data }">
            <p><strong>{{ data.objectId }}</strong></p>
          </template>

          <template slot="metadata.pagination.page" slot-scope="{ data }">
            <p><strong>{{ data.metadata.pagination.page }}</strong></p>
          </template>
        </app-table>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Tooltip</app-subtitle>
      <div class="tooltip-container">
        <app-button @click="isTooltipVisible = !isTooltipVisible">
          {{ isTooltipVisible ? 'Cacher' : 'Afficher' }} un tooltip
        </app-button>
        <app-tooltip :show="isTooltipVisible">Ceci est un tooltip</app-tooltip>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Files multiples</app-subtitle>
      <div>
        <app-upload v-model="answer10" :progress="multipleProgressUpload" :multiple="true"/>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>File simple</app-subtitle>
      <div>
        <app-upload v-model="answer11" :progress="progressUpload"/>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Pagination</app-subtitle>
      <div>
        <app-pagination :offset="pagination.offset" :limit="pagination.limit" :count="pagination.count"/>
      </div>
      <div>
        <app-pagination :offset="50" :limit="10" :count="300"/>
      </div>
      <div>
        <app-pagination :offset="0" :limit="10" :count="200"/>
      </div>
      <div>
        <app-pagination :offset="200" :limit="10" :count="200"/>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Tabs</app-subtitle>
      <div>
        <app-tabs :tabs="[
          { label: 'Tab 1', route: { name: 'login' } },
          { label: 'Tab 2', route: { name: 'demo' } },
          { label: 'Tab 3', route: { name: 'login' } }]">
        </app-tabs>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Import SVG</app-subtitle>
      <div>
        <validated-icon/>
      </div>
    </div>

    <app-modal :show.sync="isModalVisible">
      <app-subtitle>Modale</app-subtitle>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, molestiae aut. Eveniet ab aperiam laboriosam debitis, repellendus natus ex nostrum repudiandae nulla sapiente optio, blanditiis animi necessitatibus? Libero, ex explicabo?</p>
      <app-button @click="isModalVisible = false">Fermer</app-button>
    </app-modal>

    <div class="grid-container">
      <app-subtitle>Spinner</app-subtitle>
      <div>
        <app-spinner small/>
        <app-spinner/>
      </div>
    </div>

    <div class="grid-container">
      <app-subtitle>Collapse</app-subtitle>
      <div>
        <app-collapse title="Lorem 1" v-model="activeCollapse" name="collapse1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum a error amet quae id officiis accusamus voluptatibus eligendi quisquam non assumenda praesentium porro, consequuntur quaerat distinctio aut nostrum consectetur quo?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum a error amet quae id officiis accusamus voluptatibus eligendi quisquam non assumenda praesentium porro, consequuntur quaerat distinctio aut nostrum consectetur quo?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum a error amet quae id officiis accusamus voluptatibus eligendi quisquam non assumenda praesentium porro, consequuntur quaerat distinctio aut nostrum consectetur quo?
        </app-collapse>
        <app-collapse title="Lorem 2" v-model="activeCollapse" name="collapse2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum a error amet quae id officiis accusamus voluptatibus eligendi quisquam non assumenda praesentium porro, consequuntur quaerat distinctio aut nostrum consectetur quo?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum a error amet quae id officiis accusamus voluptatibus eligendi quisquam non assumenda praesentium porro, consequuntur quaerat distinctio aut nostrum consectetur quo?
        </app-collapse>
        <app-collapse title="Lorem 3" v-model="activeCollapse" name="collapse3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum a error amet quae id officiis accusamus voluptatibus eligendi quisquam non assumenda praesentium porro, consequuntur quaerat distinctio aut nostrum consectetur quo?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum a error amet quae id officiis accusamus voluptatibus eligendi quisquam non assumenda praesentium porro, consequuntur quaerat distinctio aut nostrum consectetur quo?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum a error amet quae id officiis accusamus voluptatibus eligendi quisquam non assumenda praesentium porro, consequuntur quaerat distinctio aut nostrum consectetur quo?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum a error amet quae id officiis accusamus voluptatibus eligendi quisquam non assumenda praesentium porro, consequuntur quaerat distinctio aut nostrum consectetur quo?
        </app-collapse>
      </div>
    </div>

  </section>
</template>

<script>
import document from '@/services/api/document';
import uploadService from '@/services/utils/upload';

import validatedIcon from '@/assets/img/validated.svg';

export default {
  name: 'demo',
  components: {
    validatedIcon,
  },
  data() {
    return {
      isModalVisible: false,

      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      answer5: null,
      answer7: null,
      answer8: 6,
      answer9: true,
      answer10: null,
      answer11: null,
      answer12: null,

      dataAnswer8: [{
        label: 'Partie 1',
        number: 1,
        type: 'large',
        status: 'done',
      }, {
        label: null,
        type: 'small',
        status: 'done',
      }, {
        label: null,
        type: 'small',
        status: 'done',
      }, {
        label: null,
        type: 'small',
        status: 'done',
      }, {
        label: 'Partie 2',
        number: 2,
        type: 'large',
        status: 'in-progress',
      }, {
        label: null,
        type: 'small',
        status: 'in-progress',
      }, {
        label: null,
        type: 'small',
        status: 'pending',
      }, {
        label: 'Partie 3',
        number: 3,
        type: 'large',
        status: 'pending',
      }, {
        label: null,
        type: 'small',
        status: 'pending',
      }, {
        label: null,
        type: 'small',
        status: 'pending',
      }, {
        label: null,
        type: 'small',
        status: 'pending',
      }],

      data: [
        { name: 'a1', label: 'Réponse A1' },
        { name: 'a2', label: 'Réponse A2' },
        { name: 'a3', label: 'Réponse A3' },
        { name: 'a4', label: 'Réponse A4' },
        { name: 'a5', label: 'Réponse A5' },
        { name: 'a6', label: 'Réponse A6' },
        { name: 'a7', label: 'Réponse A7' },
        { name: 'a9', label: 'Réponse A9' },
        { name: 'a10', label: 'Réponse A10' },
        { name: 'a11', label: 'Réponse A11' },
      ],

      tableHeaders: [{ label: 'Object ID', key: 'objectId' }, { label: 'Color', key: 'color' }, { label: 'Digit', key: 'metadata.pagination.page' }, { label: 'Bool', key: 'bool' }],
      tableData: [{
        objectId: '1', color: 'red', digit: 1, bool: true, metadata: { pagination: { page: 10 } },
      },
      {
        objectId: '2', color: 'blue', digit: 2, bool: true, metadata: { pagination: { page: 22 } },
      },
      {
        objectId: '3', color: 'yellow', digit: 3, bool: false, metadata: { pagination: { page: 57 } },
      }],

      isTooltipVisible: false,

      multipleProgressUpload: 0,
      progressUpload: 0,

      pagination: {
        offset: 20,
        limit: 10,
        count: 125,
      },

      activeCollapse: null,
    };
  },
  watch: {
    answer10: 'handleFiles',
    answer11: 'handleSimpleFile',
  },
  methods: {
    closeModal() {
      this.$notification.show({
        text: 'Confirmer !',
      });
    },
    showMessage() {
      this.$message.show({
        title: 'Lorem',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aperiam repellendus officiis optio eum error cupiditate ad explicabo eveniet!',
        onConfirm: () => {
          this.closeModal();
        },
      });
    },
    showNotification() {
      this.$notification.show({
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aperiam repellendus officiis optio eum error cupiditate ad explicabo eveniet!',
      });
    },
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
    },
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
    },
  },
};
</script>

<style lang="sass">
.home
  padding: 1rem 0 4rem
  .grid-container
    text-align: left
  .app-subtitle
    margin-top: 4rem
  .tooltip-container
    position: relative
    width: fit-content
  svg
    max-width: 20px
</style>
