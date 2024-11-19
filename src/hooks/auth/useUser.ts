import { useRecoilValue } from 'recoil'
import { userAtom } from '../../atom/user'

const useUser = () => {
  return useRecoilValue(userAtom)
}

export default useUser
