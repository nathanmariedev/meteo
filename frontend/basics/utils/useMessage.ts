import { useEventBus } from '@vueuse/core';

const { emit } = useEventBus<{
  title: string;
  text: string;
  cancelText?: string;
  confirmText?: string;
  hasCancel?: boolean;
  onConfirm?: () => void;
}>('app-message-show');

export const message = (params: {
  title: string;
  text: string;
  cancelText?: string;
  confirmText?: string;
  hasCancel?: boolean;
  onConfirm?: () => void;
}) => emit(params);
