<!--
****************************************************************************************************
***                                   Notifications                                              ***
****************************************************************************************************

  Notifications
  Peut être appelé dans n'importe quel composant avec une fonction.

  Exemple :
  this.$notification.show({
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aperiam repellendus officiis optio eum error cupiditate ad explicabo eveniet!',
  });

-->
<template>
  <div class="app-notifications">
    <transition-group name="notification">
      <div class="app-notification" v-for="(notification, index) in notifications" :key="`notif-${index}`">
        {{ notification.text }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import AppEvent from '../utils/AppEvent';

export default {
  data() {
    return {
      visible: false,
      notifications: [],
    };
  },
  beforeMount() {
    AppEvent.$on('app-notification-show', (params) => {
      this.show(params);
    });
  },
  beforeDestroy() {
    AppEvent.$off('app-notification-show', (params) => {
      this.show(params);
    });
  },
  methods: {
    show(params) {
      this.visible = true;
      const notification = { text: params.text };
      this.notifications.push(notification);
      setTimeout(() => { this.notifications.splice(this.notifications.indexOf(notification), 1); }, 4000);
    },
  },
};
</script>

<style lang="sass">
.app-notifications
  position: fixed
  top: 20px
  right: 20px
  .app-notification
    margin-bottom: 0.5rem
    padding: 1rem 2rem
    width: 300px
    background: white
    border-radius: $global-border-radius
    font-size: 0.8rem
    text-align: left
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05)

.notification-enter-active, .notification-leave-active
  transition: all 0.35s ease-in-out

.notification-enter, .notification-leave-to
  transform: translateX(40px)
  opacity: 0

</style>
