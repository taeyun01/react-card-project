import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import Form from '../components/signup/Form'
import { FormValues } from '../models/signup'
import { auth, store } from '../remote/firebase'
import { FirebaseError } from 'firebase/app'
import { collection, doc, setDoc } from 'firebase/firestore'
import { COLLECTIONS } from '../constants'

const SignupPage = () => {
  // 회원가입 처리하는 곳은 폼에서 바뀌는 정보는 궁금하지 않음. 회원가입은 그냥 완성된 데이터가 필요함 (form 입력 데이터) 그래서 따로 Form컴포넌트가 아닌 회원가입 페이지에서 따로 처리
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      await updateProfile(user, {
        displayName: name,
      })

      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: name,
      }

      await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser) // USER 컬렉션에 저장하는데 id는 user.uid로 저장

      alert('회원가입이 완료되었습니다.')

      // TODO: 로그인 처리
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          return alert('이미 사용중인 이메일입니다.')
        }
        return alert(error.message)
      }
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit} />
    </>
  )
}

export default SignupPage
