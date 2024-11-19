import { useCallback } from 'react'
import Form from '../components/signin/Form'
import { FormValues } from '../models/signin'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../remote/firebase'
import { FirebaseError } from 'firebase/app'
import { useNavigate } from 'react-router-dom'
import useAlert from '../hooks/alert/useAlert'

const SigninPage = () => {
  const showAlert = useAlert()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues

      try {
        const response = await signInWithEmailAndPassword(auth, email, password)

        if (response.user) return navigate('/')
      } catch (error) {
        // firebase 에러인 경우
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/invalid-credential') {
            showAlert({
              title: '계정의 정보를 다시 확인해주세요',
              onButtonClick: () => {
                // TODO:
              },
            })

            return
          }
        }
        // 그 외 에러인 경우
        showAlert({
          title: `로그인에 실패했습니다. ${error}`,
          onButtonClick: () => {
            // TODO:
          },
        })
      }
    },
    [showAlert, navigate],
  )

  return (
    <>
      <Form onSubmit={handleSubmit} />
    </>
  )
}

export default SigninPage
