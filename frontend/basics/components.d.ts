// src/global-components.d.ts
import AppTitle from '@basics/components/AppTitle.vue';
import AppCard from '@basics/components/AppCard.vue';
import AppButton from '@basics/components/AppButton.vue';
import AppCheckbox from '@basics/components/AppCheckbox.vue';
import AppRadio from '@basics/components/AppRadio.vue';
import AppNotifications from '@basics/components/AppNotifications.vue';
import AppMessage from '@basics/components/AppMessage.vue';
import AppTooltip from '@basics/components/AppTooltip.vue';
import AppInput from '@basics/components/AppInput.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'app-title': typeof AppTitle;
    'app-card': typeof AppCard;
    'app-button': typeof AppButton;
    'app-radio': typeof AppRadio;
    'app-checkbox': typeof AppCheckbox;
    'app-notifications': typeof AppNotifications;
    'app-message': typeof AppMessage;
    'app-tooltip': typeof AppTooltip;
    'app-input': typeof AppInput;
  }
}
