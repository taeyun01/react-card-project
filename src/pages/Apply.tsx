import { useState } from 'react'
import BasicInfo from '../components/apply/BasicInfo'
import CardInfo from '../components/apply/CardInfo'
import Terms from '../components/apply/Terms'
import { ApplyValues } from '../models/apply'

// 카드 신청 하기전 유저정보를 얻기 위한 페이지
// 각각의 페이지로 분리할 수도 있지만, 스텝으로 분리하면 코드도 한곳에 보이고 데이터 흐름을 쉽게 파악할 수 있음
const ApplyPage = () => {
  const [step, setStep] = useState(1)

  // Pick으로 뽑으면 객체로 나옴. terms는 string에 array니까 ApplyValues['terms'] 이런식으로 뽑아줌
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log('terms', terms)
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    console.log('infoValues', infoValues)
  }

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />} {/* 약관동의 */}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}{' '}
      {/* 기본 정보 */}
      {step === 2 && <CardInfo />} {/* 카드 정보 */}
    </div>
  )
}

export default ApplyPage
