import type { App } from 'vue';

import AppTitle from './components/AppTitle.vue';
import AppCard from './components/AppCard.vue';
import AppButton from './components/AppButton.vue';
import AppRadio from './components/AppRadio.vue';
import AppCheckbox from './components/AppCheckbox.vue';
import AppNotifications from './components/AppNotifications.vue';
import AppMessage from './components/AppMessage.vue';
import AppTooltip from './components/AppTooltip.vue';
import AppInput from './components/AppInput.vue';

const basics = {
  install: (app: App) => {
    app.component('app-title', AppTitle);
    app.component('app-card', AppCard);
    app.component('app-button', AppButton);
    app.component('app-radio', AppRadio);
    app.component('app-checkbox', AppCheckbox);
    app.component('app-notifications', AppNotifications);
    app.component('app-message', AppMessage);
    app.component('app-tooltip', AppTooltip);
    app.component('app-input', AppInput);
  },
};

export default basics;
