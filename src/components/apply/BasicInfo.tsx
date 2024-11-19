import Select from '../shared/Select'
import {
  ANNUAL_INCOME_OPTIONS,
  CREDIT_SCORE_OPTIONS,
  PAYMENT_DATE_OPTIONS,
} from '../../constants/apply'
import { useCallback, useState } from 'react'
import { ApplyValues } from '../../models/apply'
import FixedBottomButton from '../shared/FixedBottomButton'

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

const BasicInfo = ({
  onNext, // salary, creditScore, payDate 이 3가지에 대한 정보를 넘겨주는 함수
}: {
  onNext: (infoValues: InfoValues) => void
}) => {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '', // 연소득
    creditScore: '', // 신용점수
    payDate: '', // 결제일
  })

  const handleInfoChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target
      setInfoValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }))
    },
    [],
  )

  const isAllInfoSelected = Object.values(infoValues).every((value) => value)

  // console.log(infoValues)

  return (
    <>
      <Select
        name="salary"
        label="연소득"
        options={ANNUAL_INCOME_OPTIONS}
        placeholder={ANNUAL_INCOME_OPTIONS[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={CREDIT_SCORE_OPTIONS}
        placeholder={CREDIT_SCORE_OPTIONS[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={PAYMENT_DATE_OPTIONS}
        placeholder={PAYMENT_DATE_OPTIONS[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />

      <FixedBottomButton
        label="다음"
        onClick={() => onNext(infoValues)}
        disabled={!isAllInfoSelected}
      />
    </>
  )
}

export default BasicInfo
