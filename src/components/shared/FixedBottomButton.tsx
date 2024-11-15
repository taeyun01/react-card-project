/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { createPortal } from 'react-dom'

import Button from './Button'
import { colors } from '../../styles/colorPalette'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
}

// portal에 버튼 띄우기
const FixedBottomButton = ({ label, onClick }: FixedBottomButtonProps) => {
  const $portalRoot = document.getElementById('root-portal')

  if (!$portalRoot) return null

  return createPortal(
    <Container>
      <Button size="medium" full onClick={onClick} css={buttonStyles}>
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
`

const buttonStyles = css`
  border-radius: 8px;
`

export default FixedBottomButton
