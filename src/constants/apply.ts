import { Option, Term } from '../models/apply'

export const TERMS_LIST: Term[] = [
  {
    id: '01',
    title: '카드신청 관련 안내 및 필수 동의',
  },
  {
    id: '02',
    title: '(필수) 개인정보 요약 동의서',
    link: 'https://www.google.com',
  },
]

export const ANNUAL_INCOME_OPTIONS: Option[] = [
  { label: '600만원 ~ 5,000만원', value: '600만원 ~ 5,000만원' },
  { label: '5,000만원 ~ 1억원', value: '5,000만원 ~ 1억원' },
  { label: '1억원 초과', value: '1억원 초과' },
]

export const CREDIT_SCORE_OPTIONS: Option[] = [
  { label: '600점 이상', value: '600점 이상' },
  { label: '600점 미만', value: '600점 미만' },
]

export const PAYMENT_DATE_OPTIONS: Option[] = [
  { label: '1일', value: '1일' },
  { label: '25일', value: '25일' },
]
