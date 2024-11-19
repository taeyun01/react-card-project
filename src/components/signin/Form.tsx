/** @jsxImportSource @emotion/react */
import { useCallback, useMemo, useState } from 'react'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import TextField from '../shared/TextField'
import { css } from '@emotion/react'
import Text from '../shared/Text'
import { Link } from 'react-router-dom'
import { colors } from '../../styles/colorPalette'
import validator from 'validator'
import { FormValues } from '../../models/signin'

const Form = ({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handleFormValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }))
    },
    [],
  )

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setDirty((prevDirty) => ({
      ...prevDirty,
      [name]: true,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const isSubmit = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        value={formValues.email}
        hasError={!!dirty.email && !!errors.email}
        helpMessage={dirty.email && errors.email}
        onChange={handleFormValues}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호"
        name="password"
        type="password"
        value={formValues.password}
        hasError={!!dirty.password && !!errors.password}
        helpMessage={dirty.password && errors.password}
        onChange={handleFormValues}
        onBlur={handleBlur}
      />
      <Spacing size={32} />

      <Button
        size="medium"
        disabled={!isSubmit}
        onClick={() => onSubmit(formValues)}
      >
        로그인
      </Button>
      <Spacing size={12} />
      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`

const validate = (formValues: FormValues) => {
  // errors = {email: '이메일 형식을 확인해주세요', password: '패스워드 형식을 확인해주세요', rePassword: '패스워드 확인 형식을 확인해주세요', name: '이름을 확인해주세요'}
  const errors: Partial<FormValues> = {}

  if (!validator.isEmail(formValues.email)) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8자 이상 입력해주세요'
  }

  return errors
}

export default Form
