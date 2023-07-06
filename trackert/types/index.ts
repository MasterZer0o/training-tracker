export { }
declare global {
  export interface OngoingSession {
    is: boolean
    data: { section: string; started: string }
  }

  export interface Session {
    id?: number
    section: string
    date: string
    timeStart: string
    timeEnd: string
    duration: string
    isNew?: boolean
  }

  export interface AuthError {
    is: boolean
    status?: string
  }

}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      pass: string
    }
  }
}
