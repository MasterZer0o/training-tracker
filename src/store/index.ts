import { ref } from 'vue';
import { OngoingSession } from '../../types';

export const isLoading = ref<boolean>(true);
export const isError = ref<boolean>(false); // controlling bottom box error
export const errorMessage = ref<string>(''); // bottom box error message

export const ongoingSession = ref<OngoingSession>({
	is: false,
	data: { section: '', started: '' }
});
