/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const red = 'red'

const containerStyles = css`
  background-color: ${red};
`

const bold = css`
  font-weight: bold;
`

const Button = styled.button`
  width: 100px;
  height: 100px;
  ${bold}
`

function App() {
  return (
    <div>
      <h1 className="App" css={containerStyles}>
        프로젝트 셋팅 완료
      </h1>
      <Button>버튼</Button>
    </div>
  )
}

export default App
