/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from './Flex'
import Text from './Text'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean // 화살표 표시 여부 (true면 화살표 표시)
  onClick?: () => void
}

//* 컴포넌트 합성하기 : 방대한 양의 props를 사용하지 않아도 되고 재사용성에도 좋음 (props 드릴링 해결)
const ListRow = ({
  left,
  contents,
  right,
  withArrow,
  onClick,
}: ListRowProps) => {
  return (
    //* ListRow는 UI를 넣을 구멍만 뚫어주고 사용처에서 각각 요소들을 조합해서 사용하는 방법
    <Flex as="li" css={listRowContainerStyles} onClick={onClick} align="center">
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow && <ArrowRightIcon />}
    </Flex>
  )
}

const listRowContainerStyles = css`
  padding: 8px 24px;
`

const listRowLeftStyles = css`
  margin-right: 14px;
`

const listRowContentsStyles = css`
  flex: 1;
`

//* 합성할 컴포넌트
const ListRowTexts = ({
  title,
  subTitle,
}: {
  title: string
  subTitle: string
}) => {
  return (
    <Flex direction="column">
      <Text bold>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

const ArrowRightIcon = () => {
  return (
    <svg
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
    >
      <title />
      <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
    </svg>
  )
}

//* 컴포넌트 합성
// ListRow에 ListRowTexts를 사용하겠다. 라는 의미
// 함수도 객체니까 이런식으로 key와 value를 이용해서 컴포넌트를 넣어줄 수 있음
ListRow.ListRowTexts = ListRowTexts

export default ListRow
