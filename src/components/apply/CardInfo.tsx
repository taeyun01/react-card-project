/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Button from '../shared/Button'
import Spacing from '../shared/Spacing'
import { ApplyValues } from '../../models/apply'
import { useCallback, useState } from 'react'
import FixedBottomButton from '../shared/FixedBottomButton'

type CardInfoValues = Pick<ApplyValues, 'isMaster' | 'isHipass' | 'isRf'>

const CardInfo = ({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void
}) => {
  const [cardInfoValues, setCardInfoValues] = useState({
    isHipass: false,
    isMaster: false,
    isRf: false,
  })

  const { isHipass, isMaster, isRf } = cardInfoValues

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const $button = e.target as HTMLButtonElement // type을 정의해줘야 dataset에 접근 가능
      // console.log($button.name)
      // console.log(JSON.parse($button.dataset.value as string)) // dataset.value는 string이라서 파싱해줌 boolean으로
      setCardInfoValues((prevValues) => ({
        ...prevValues,
        [$button.name]: JSON.parse($button.dataset.value as string), // dataset.value는 string이라서 파싱해줌 boolean으로
      }))
    },
    [],
  )

  // console.log(cardInfoValues)

  return (
    <div css={buttonGroupContainerStyle}>
      <Button.Group title="해외결제">
        <Button
          name="isMaster"
          weak={!isMaster}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          weak={isMaster}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title="후불교통기능">
        <Button
          name="isRf"
          weak={isRf}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          weak={!isRf}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title="후불하이패스카드">
        <Button
          name="isHipass"
          weak={isHipass}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          weak={!isHipass}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <FixedBottomButton label="다음" onClick={() => onNext(cardInfoValues)} />
    </div>
  )
}

const buttonGroupContainerStyle = css`
  padding: 24px;
`

export default CardInfo
