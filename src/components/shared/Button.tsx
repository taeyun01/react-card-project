import { css } from '@emotion/react'
import {
  ButtonColor,
  buttonColorMap,
  ButtonSize,
  buttonSizeMap,
  buttonWeakMap,
} from '../../styles/button'
import styled from '@emotion/styled'

interface ButtonProps {
  color?: ButtonColor
  size?: ButtonSize
  weak?: boolean
  full?: boolean
  disabled?: boolean
}

// 버튼 컴포넌트 스타일링

const Button = styled.button<ButtonProps>(
  {
    cursor: 'pointer', // pointer로 설정하여 클릭 가능한 상태 표시
    fontWeight: 'bold', // 굵은 폰트
    borderRadius: '6px', // 6px 둥근 모서리 적용
  },
  (
    { color = 'primary', weak }, // color prop으로 primary/success/error 색상 변경 가능 (기본값: primary)
  ) => (weak ? buttonWeakMap[color] : buttonColorMap[color]), // weak prop이 true면 테두리만 있는 스타일, false면 배경색이 있는 스타일
  ({ size = 'small' }) => buttonSizeMap[size], // size prop으로 버튼 크기 설정 (기본값: small)
  ({ full }) =>
    full && // full prop이 true일 때 적용되는 스타일
    css`
      display: block;
      width: 100%;
      border-radius: 0;
    `,
  ({ disabled }) =>
    disabled && // disabled prop이 true일 때 적용되는 스타일
    css`
      opacity: 0.26;
      cursor: initial;
    `,
)

export default Button
