export const useLoading = () => useState<boolean>('isLoading', () => true)

export const useIsError = () => useState<boolean>('isError', () => false) // controlling bottom box error

export const useErrorMessage = () => useState<string>('errorMessage', () => '') // bottom box error message

export const useOngoingSession = () => useState<OngoingSession>('ongoingSession', () => ({
  is: false,
  data: { section: '', started: '' }
}))

export const useNetStatus = () => useState<'online' | 'offline'>('netStatus', () => 'online')
