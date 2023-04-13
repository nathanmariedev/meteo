<template>
  <div class="app-notifications">
    <transition-group name="notification">
      <div
        class="app-notification"
        v-for="(notification, index) in notifications"
        :key="`notif-${index}`"
      >
        {{ notification }}
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
/**
 * Notifications component is used to display notifications. It is a simple component that can be used in any component.
 *
 * @remarks
 * Example :
 * import { notification } from '../../basics/utils/useNotification';
 *
 * notification('Lorem ipsum dolor sit amet consectetur adipisicing elit.');
 *
 * @basics
 */
import { ref } from 'vue';
import { useEventBus } from '@vueuse/core';

const { on } = useEventBus<string>('app-notification-show');
const visible = ref<boolean>(false);
const notifications = ref<string[]>([]);

on((val) => {
  visible.value = true;
  notifications.value.push(val);
  setTimeout(() => {
    notifications.value.splice(notifications.value.length - 1, 1);
  }, 4000);
});
</script>

<style lang="postcss">
.app-notifications {
  position: fixed;
  top: 20px;
  right: 20px;
  & .app-notification {
    margin-bottom: 0.5rem;
    padding: 1rem 2rem;
    width: 300px;
    background: var(--color-main-flat);
    border-radius: var(--global-border-radius);
    color: var(--color-main-line);
    font-size: 0.8rem;
    text-align: left;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.35s ease-in-out;
}
.notification-enter-from,
.notification-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>
