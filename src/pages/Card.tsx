/** @jsxImportSource @emotion/react */
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getCard } from '../remote/card'
import Top from '../components/shared/Top'
import ListRow from '../components/shared/ListRow'
import FixedBottomButton from '../components/shared/FixedBottomButton'
import Flex from '../components/shared/Flex'
import Text from '../components/shared/Text'
import { css } from '@emotion/react'

const CardPage = () => {
  const { id = '' } = useParams()

  const { data } = useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id),
    enabled: id !== '', // id가 없으면 쿼리 실행 안함 (enabled속성을 통해 데이터를 호출할지 안할지 조절할 수 있음)
  })

  if (!data) return null

  const { name, corpName, benefit, tags, promotion } = data

  const subTitle = promotion ? removeHtmlTags(promotion.title) : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subtitle={subTitle} />

      <ul>
        {benefit.map((text, index) => (
          <ListRow
            key={text}
            left={<CheckIcon />}
            contents={
              <ListRow.ListRowTexts
                title={`혜택 ${index + 1}`}
                subTitle={text}
              />
            }
          />
        ))}
      </ul>

      {promotion ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}
      <FixedBottomButton label="신청하기" onClick={() => {}} />
    </div>
  )
}

const CheckIcon = () => {
  return (
    <svg
      fill="none"
      height="22"
      viewBox="0 0 48 48"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" fillOpacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  )
}

const removeHtmlTags = (text: string) => {
  let output = ''

  // 꺽쇠 태그 시작점부터 끝점 <????> 까지 모두 제거
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      while (text[i] !== '>') i++
    } else {
      output += text[i]
    }
  }
  return output
}

const termsContainerStyles = css`
  margin-top: 40px;
  padding: 0 24px 80px 24px;
`

export default CardPage
