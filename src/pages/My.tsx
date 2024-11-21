import { useCallback } from 'react'
import Button from '../components/shared/Button'
import Flex from '../components/shared/Flex'
import Text from '../components/shared/Text'
import useAlert from '../hooks/alert/useAlert'
import useUser from '../hooks/auth/useUser'
import { signOut } from 'firebase/auth'
import { auth } from '../remote/firebase'
import MyImage from '../components/my/MyImage'
import Spacing from '../components/shared/Spacing'

const MyPage = () => {
  const user = useUser()
  const showAlert = useAlert()

  const handleLogout = useCallback(async () => {
    const response = await signOut(auth)

    if (response === undefined)
      return showAlert({
        description: '로그아웃이 완료되었어요!',
        onButtonClick: () => {},
      })

    return showAlert({
      description: '로그아웃이 실패했어요!',
      onButtonClick: () => {},
    })
  }, [showAlert])

  return (
    <Flex direction="column" align="center">
      <Spacing size={40} />
      <MyImage size={80} mode="upload" />
      <Spacing size={20} />
      <Text bold>{user?.displayName}</Text>
      <Spacing size={10} />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  )
}

export default MyPage
