import { useState } from 'react'
import Apply from '../components/apply'

const ApplyPage = () => {
  const [step, setStep] = useState(2)

  const handleSubmit = () => {
    // TODO: 카드신청
  }

  return <Apply step={step} onSubmit={handleSubmit} />
}

export default ApplyPage

//* 카드신청을 하기위해 데이터를 모으는 곳은 여기 ApplyPage였다.
//* 카드신청하는 페이지 입장에서는 이 데이터들이 변하는게 별로 궁금하지 않다.
//* 이 페이지는 다 긁어 모아진 완성본만 넘겨주고 그 완성본을 가지고 카드신청을 하도록 만들어 주면 된다.
//* 카드신청 하는 곳을 apply/index.tsx로 분리하여
//* 여기서 ApplyPage에서는 데이터 완성본만 받도록 해준다.
//* 그리고 step만 Apply로 넘겨준다.

//? step이 변하는 것에 따라 무엇을 그릴지는 Apply에서 하고
//? 실제 step이 변경되고 그런 것들은 ApplyPage에서 하도록 만들어 준다.
