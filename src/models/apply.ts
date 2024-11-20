import { User } from './user'

export interface Term {
  id: string
  title: string
  link?: string
}

export const APPLY_STATUS = {
  READY: 'READY',
  PROGRESS: 'PROGRESS',
  COMPLETE: 'COMPLETE',
  REJECT: 'REJECT',
} as const

export interface ApplyValues {
  userId: User['uid'] // 유저 id
  terms: Array<Term['id']> // 동의한 약관 id
  appliedAt: Date // 언제 신청 했는지
  cardId: string // 신청한 카드 id
  salary: string // 연소득
  creditScore: string // 신용점수
  payDate: string // 결제일
  isMaster: boolean // 마스터카드 쓸건지 여부
  isHipass: boolean // 하이패스 쓸건지 여부
  isRf: boolean // 후불교통기능 쓸건지 여부
  status: keyof typeof APPLY_STATUS
  step: number
}

export interface Option {
  label: string
  value: string | number | undefined
}
