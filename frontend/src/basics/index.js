import AppEvent from './utils/AppEvent';
import AppMessage from './components/AppMessage.vue';
import AppModal from './components/AppModal.vue';
import AppCheckbox from './components/AppCheckbox.vue';
import AppRadio from './components/AppRadio.vue';
import AppSwitch from './components/AppSwitch.vue';
import AppButton from './components/AppButton.vue';
import AppCard from './components/AppCard.vue';
import AppNotifications from './components/AppNotifications.vue';
import AppSelect from './components/AppSelect.vue';
import AppInput from './components/AppInput.vue';
import AppDatepicker from './components/AppDatepicker.vue';
import AppTitle from './components/AppTitle.vue';
import AppSubtitle from './components/AppSubtitle.vue';
import AppLabel from './components/AppLabel.vue';
import AppSlider from './components/AppSlider.vue';
import AppProgress from './components/AppProgress.vue';
import AppSpinner from './components/AppSpinner.vue';
import AppTable from './components/AppTable.vue';
import AppTooltip from './components/AppTooltip.vue';
import AppUpload from './components/AppUpload.vue';
import AppTabs from './components/AppTabs.vue';
import AppPagination from './components/AppPagination.vue';
import AppCollapse from './components/AppCollapse.vue';

const basics = {

  install(Vue) {
    Vue.component('app-message', AppMessage);
    Vue.component('app-modal', AppModal);
    Vue.component('app-checkbox', AppCheckbox);
    Vue.component('app-radio', AppRadio);
    Vue.component('app-switch', AppSwitch);
    Vue.component('app-button', AppButton);
    Vue.component('app-card', AppCard);
    Vue.component('app-notifications', AppNotifications);
    Vue.component('app-select', AppSelect);
    Vue.component('app-input', AppInput);
    Vue.component('app-datepicker', AppDatepicker);
    Vue.component('app-title', AppTitle);
    Vue.component('app-subtitle', AppSubtitle);
    Vue.component('app-label', AppLabel);
    Vue.component('app-slider', AppSlider);
    Vue.component('app-progress', AppProgress);
    Vue.component('app-spinner', AppSpinner);
    Vue.component('app-table', AppTable);
    Vue.component('app-tooltip', AppTooltip);
    Vue.component('app-upload', AppUpload);
    Vue.component('app-pagination', AppPagination);
    Vue.component('app-tabs', AppTabs);
    Vue.component('app-collapse', AppCollapse);

    // eslint-disable-next-line
    Vue.prototype.$message = {
      show(params) {
        AppEvent.$emit('app-message-show', params);
      },
    };

    // eslint-disable-next-line
    Vue.prototype.$notification = {
      show(params) {
        AppEvent.$emit('app-notification-show', params);
      },
    };
  },
};

export default basics;
