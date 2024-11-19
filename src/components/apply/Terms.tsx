import Agreement from '../shared/Agreement'
import { TERMS_LIST } from '../../constants/apply'
import { useCallback, useState } from 'react'
import FixedBottomButton from '../shared/FixedBottomButton'
import { ApplyValues } from '../../models/apply'

const Terms = ({
  onNext,
}: {
  onNext: (terms: ApplyValues['terms']) => void
}) => {
  const [termsAgreement, setTermsAgreement] = useState(() => {
    return TERMS_LIST.reduce<Record<string, boolean>>(
      (prev, terms) => ({
        ...prev,
        [terms.id]: false,
      }),
      {},
    )
  })
  console.log('termsAgreement', termsAgreement)

  const handleAllAgreement = useCallback(
    (_: React.MouseEvent<HTMLElement>, checked: boolean) => {
      // console.log('checked', checked)
      setTermsAgreement((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          // 01, 02 등의 약관 id를 가져옴
          (prev, key) => ({
            ...prev,
            [key]: checked, // checked 상태가 true면 전체 key를 순회하면서 모든 id를 가진 값들을 다 true로 변경
          }),
          {},
        )
      })
    },
    [],
  )

  // 모든 약관이 동의되었는지 확인
  const isAllTermsAgreed = Object.values(termsAgreement).every(
    (agreed) => agreed,
  )

  return (
    <>
      <Agreement>
        <Agreement.Title
          checked={isAllTermsAgreed}
          onChange={handleAllAgreement}
        >
          약관에 모두 동의
        </Agreement.Title>
        {TERMS_LIST.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreement[id]} // 체크가 돼있는지 안돼있는지 판단
            onChange={(_, checked) => {
              setTermsAgreement((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={!isAllTermsAgreed} // 모두 체크되면 활성화
        onClick={() => {
          // 약관 동의 버튼이 모두 눌렸을 때 termsAgreement의 id키값들을 빼오면 string[]로 돼있음
          onNext(Object.keys(termsAgreement))
        }}
      />
    </>
  )
}

export default Terms
