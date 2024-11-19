import { onAuthStateChanged } from 'firebase/auth' // firebase의 인증상태가 바뀌면 동작함, 로그인이 되거나 로그아웃이 되거나
import { useState } from 'react'
import { auth } from '../../remote/firebase'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '../../atom/user'

// 인증처리를 해주는 컴포넌트 (로그인 상태일 때만 페이지 접근 가능)
// 여기서 children은 App컴포넌트다. children이 return되면 이미 인증처리가 됐다는 뜻
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    } else {
      // 로그인이 안된 경우나 로그아웃을 했을 때, 상태를 null로 초기화
      setUser(null)
    }

    setInitialize(true)
  })

  if (!initialize) {
    // return <div>인증 처리중...</div>
    return null
  }

  return <>{children}</>
}

export default AuthGuard
