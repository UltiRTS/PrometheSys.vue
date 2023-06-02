export interface Game {
  roomNotes: string
  title: string
  hoster: string
  mapId: number
  ais: Record<string, { team: string }>
  chickens: Record<string, { team: string }>
  players: Record<string, { isSpec: boolean; team: string; hasmap: boolean }>
  polls: Record<string, Set<string>>
  id: number
  engineToken: string
  password: string
  isStarted: boolean
  responsibleAutohost: string
  aiHosters: string[]
  autohostPort: number
  mod: string
}

export interface GameBrief {
  title: string
  hoster: string
  mapId: number
}

export interface ChatRoom {
  roomName: string
  createAt: string
  password: string
  members: string[]
  lastMessage: { author: string; content: string; time: number }
}

export interface Confirmation {
  id: number
  text: string
  type: string
  payload: any
  claimed: boolean
}

export interface User {
  friends: string[]
  friendsMarked: string[]
  friendsOnline: string[]
  username: string
  exp: number
  sanity: number
  blocked: boolean
  confirmations: Confirmation[]
  chatRooms: Record<string, ChatRoom>
  game: Game | null
}

export interface State {
  user: User
  chats: string[]
  games: GameBrief[]
}

export interface StateMessage {
  action: string
  seq: number
  state: State
}

export interface Notification {
  action: string
  seq: number
  message: string
  payload: string
}

export interface PING {
  action: string
  parameters: {}
}
