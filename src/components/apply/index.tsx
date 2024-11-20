import BasicInfo from './BasicInfo'
import CardInfo from './CardInfo'
import Terms from './Terms'
import { APPLY_STATUS, ApplyValues } from '../../models/apply'
import { useEffect, useState } from 'react'
import useUser from '../../hooks/auth/useUser'
import { useParams } from 'react-router-dom'

// 카드 신청 하기전 유저정보를 얻기 위한 페이지
// 각각의 페이지로 분리할 수도 있지만, 스텝으로 분리하면 코드도 한곳에 보이고 데이터 흐름을 쉽게 파악할 수 있음
//* ApplyPage에서 넘겨준 step에 따라 렌더링 되는 컴포넌트가 달라짐
//* 여기서 만들어지는 데이터들은 Apply컴포넌트에서 관심 있게 지켜보고 관리하게 된다.
const Apply = ({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void
}) => {
  const user = useUser()
  const { id } = useParams() as { id: string }

  const [step, setStep] = useState(0)

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  }) //* 완성된 데이터 이기 때문에 이 값들을 부분적으로 채울 수 없음 그래서 Partial로 써줌

  // Pick으로 뽑으면 객체로 나옴. terms는 string에 array니까 ApplyValues['terms'] 이런식으로 뽑아줌
  // * 약관을 받고
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    // console.log('terms', terms)
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
    }))

    setStep((prevStep) => prevStep + 1)
  }

  //* 기본정보를 받고
  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    // console.log('infoValues', infoValues)
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infoValues, //* 얘는 객체라 ...으로 풀어서 저장
    }))

    setStep((prevStep) => prevStep + 1)
  }

  //* 카드정보를 받으면서 부분적으로 데이터를 채워나감
  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    // console.log('cardInfoValues', cardInfoValues)
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
    }))

    setStep((prevStep) => prevStep + 1)
  }

  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    }
  }, [step, applyValues, onSubmit])

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />} {/* 약관동의 */}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}{' '}
      {/* 기본 정보 */}
      {step === 2 && <CardInfo onNext={handleCardInfoChange} />}{' '}
      {/* 카드 정보 */}
    </div>
  )
}

export default Apply
