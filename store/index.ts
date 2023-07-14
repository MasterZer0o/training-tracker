export const useLoading = () => useState<boolean>('isLoading', () => true)

export const useActionError = () => useState<{ message: string | null } >('actionError', () => ({ message: null })) // bottom error state

export const useErrorMessage = () => useState<string>('errorMessage', () => '') // bottom box error message

export const useOngoingSession = () => useState<OngoingSession>('ongoingSession', () => ({
  is: false,
  data: { section: '', started: '' }
}))

export const useNetStatus = () => useState<'online' | 'offline'>('netStatus', () => 'online')
