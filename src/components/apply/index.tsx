import BasicInfo from './BasicInfo'
import CardInfo from './CardInfo'
import Terms from './Terms'
import { ApplyValues } from '../../models/apply'

// 카드 신청 하기전 유저정보를 얻기 위한 페이지
// 각각의 페이지로 분리할 수도 있지만, 스텝으로 분리하면 코드도 한곳에 보이고 데이터 흐름을 쉽게 파악할 수 있음
//* ApplyPage에서 넘겨준 step에 따라 렌더링 되는 컴포넌트가 달라짐
//* 여기서 만들어지는 데이터들은 Apply컴포넌트에서 관심 있게 지켜보고 관리하게 된다.
const Apply = ({ step, onSubmit }: { step: number; onSubmit: () => void }) => {
  // Pick으로 뽑으면 객체로 나옴. terms는 string에 array니까 ApplyValues['terms'] 이런식으로 뽑아줌
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log('terms', terms)
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    console.log('infoValues', infoValues)
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    console.log('cardInfoValues', cardInfoValues)
  }

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
