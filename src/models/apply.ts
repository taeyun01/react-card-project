import { User } from './user'

export interface Term {
  id: string
  title: string
  link?: string
}

export interface ApplyValues {
  userId: User['uid'] // 유저 id
  terms: Array<Term['id']> // 동의한 약관 id
  appliedAt: Date // 언제 신청 했는지
  cardId: string // 신청한 카드 id
  salary: string // 연소득
  creditScore: string // 신용점수
  payDate: string // 결제일
}

export interface Option {
  label: string
  value: string | number | undefined
}