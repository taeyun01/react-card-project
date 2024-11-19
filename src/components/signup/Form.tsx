/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import FixedBottomButton from '../shared/FixedBottomButton'
import Flex from '../shared/Flex'
import TextField from '../shared/TextField'
import Spacing from '../shared/Spacing'
import { useCallback, useState, useMemo } from 'react'
import { FormValues } from '../../models/signup'
import validator from 'validator'

// 컨트롤드 방식을 사용. (state로 form들을 관리해 값이 변경될 때마다 유효성 검사를 처리)
const Form = ({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) => {
  // 하나의 관심사는 하나의 객체로 관리
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  // 해당 페이지에 들어오자마자 인풋 에러 표시가 나타나는데,
  // 인풋을 입력하고 해당 필드에 맞지 않을 때 에러 표시가 나오도록 하기 위해 dirty 상태 관리
  // ex) 이메일 인풋이 써졌으면 dirty.email = true 로 바뀌고(인풋이 더러워 졌다고 판단) 이메일 형식이 아니면 에러 표시가 나오도록 설정
  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handleFormValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }))
    },
    [],
  )

  // 인풋에서 포커스가 벗어나면 해당 필드를 dirty 상태로 설정 (인풋이 더러워졌다고 판단하는 함수) (클릭 했다가 다른 곳으로 이동해도 인풋이 더러워졌다고 판단)
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setDirty((prevDirty) => ({
      ...prevDirty,
      [name]: true,
    }))
  }, [])

  // validator로 유효성 검사
  const errors = useMemo(() => validate(formValues), [formValues])

  // 에러가 없으면 제출 버튼 활성화
  const isSubmit = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="abc@example.com"
        value={formValues.email}
        onChange={handleFormValue}
        hasError={!!dirty.email && !!errors.email}
        helpMessage={dirty.email && errors.email}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValue}
        hasError={!!dirty.password && !!errors.password}
        helpMessage={dirty.password && errors.password}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 확인"
        name="rePassword"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValue}
        hasError={!!dirty.rePassword && !!errors.rePassword}
        helpMessage={dirty.rePassword && errors.rePassword}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        placeholder="홍길동"
        value={formValues.name}
        onChange={handleFormValue}
        hasError={!!dirty.name && !!errors.name}
        helpMessage={dirty.name && errors.name}
        onBlur={handleBlur}
      />
      <FixedBottomButton
        label="회원가입"
        disabled={!isSubmit}
        onClick={() => {
          onSubmit(formValues)
        }}
      />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
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

  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호는 8자 이상 입력해주세요'
  } else if (!validator.equals(formValues.rePassword, formValues.password)) {
    errors.rePassword = '비밀번호가 일치하지 않습니다'
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2자 이상 입력해주세요'
  }

  return errors
}

export default Form
