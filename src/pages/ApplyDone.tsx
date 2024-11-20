/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import FixedBottomButton from '../components/shared/FixedBottomButton'
import Flex from '../components/shared/Flex'
import Text from '../components/shared/Text'
import { parse } from 'qs'

const ApplyDonePage = () => {
  // qs 라이브러리 사용
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string }

  return (
    <Flex css={applyDoneContainer}>
      <Text typography="t4">
        {success === 'true'
          ? '카드 신청이 완료되었습니다.'
          : '카드 신청에 실패하였습니다.'}
      </Text>

      <FixedBottomButton label="확인" onClick={() => window.history.back()} />
    </Flex>
  )
}

const applyDoneContainer = css`
  padding: 24px;
`

export default ApplyDonePage
