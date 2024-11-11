import { css } from '@emotion/react'

export const colorPalette = css`
  :root {
    --red: #f44336;
    --blue: #2196f3;
    --green: #4caf50;
    --white: #fff;
    --black: #212121;
    --grey: #f0efef;
  }
`
// colors.red 이런식으로 쓸 수 있게 설정
export const colors = {
  red: 'var(--red)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  white: 'var(--white)',
  black: 'var(--black)',
  grey: 'var(--grey)',
}

// colors의 키 값만 뺴와 타입지정
export type Colors = keyof typeof colors
