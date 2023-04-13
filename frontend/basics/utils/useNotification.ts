import { useEventBus } from '@vueuse/core';

const { emit } = useEventBus<string>('app-notification-show');

export const notification = (text: string) => emit(text);
