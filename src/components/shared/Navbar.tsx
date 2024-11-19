/** @jsxImportSource @emotion/react */
import { Link, useLocation } from 'react-router-dom'
import Flex from './Flex'
import Button from './Button'
import { css } from '@emotion/react'
import { colors } from '../../styles/colorPalette'
import useUser from '../../hooks/auth/useUser'
import { useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../remote/firebase'
import useAlert from '../../hooks/alert/useAlert'

const Navbar = () => {
  const showAlert = useAlert()
  const location = useLocation()
  const showSigninButton = ['/signin', '/signup'].includes(location.pathname)

  const user = useUser()

  const handleLogout = useCallback(async () => {
    const response = await signOut(auth)
    if (response === undefined)
      return showAlert({
        description: '로그아웃이 완료되었어요!',
        onButtonClick: () => {
          // TODO:
        },
      })
  }, [showAlert])

  // 유저 상태에 따라 버튼을 다르게 렌더링 해주는 함수
  const renderButton = useCallback(() => {
    // 로그인 상태일 경우 (user가 null이 아닐 경우, user정보가 있을 경우)
    if (user) {
      return <Button onClick={handleLogout}>로그아웃</Button>
    }

    // /signin', '/signup 경로가 아닐 경우. 로그인 버튼 렌더링
    if (!showSigninButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showSigninButton, handleLogout])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">Home</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;

  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`
export default Navbar
