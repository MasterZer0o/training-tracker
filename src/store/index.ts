import { ref } from 'vue';

export const isLoading = ref<boolean>(true);
export const isError = ref<boolean>(false); // controlling bottom box error
export const errorMessage = ref<string>(''); // bottom box error message
