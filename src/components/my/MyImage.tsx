import styled from '@emotion/styled'
import useUser from '../../hooks/auth/useUser'
import { getAuth, updateProfile } from 'firebase/auth'
import { app, storage, store } from '../../remote/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '../../constants'
import { userAtom } from '../../atom/user'
import { useSetRecoilState } from 'recoil'
import { useState } from 'react'
import FullPageLoader from '../shared/FullPageLoader'

const MyImage = ({
  size = 40,
  mode = 'default',
}: {
  size?: number
  mode?: 'default' | 'upload'
}) => {
  const user = useUser()
  const setUser = useSetRecoilState(userAtom)
  const [isLoading, setIsLoading] = useState(false)

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)

    const files = e.target.files // 내가 업로드한 파일 정보

    // 현재 로그인한 유저 정보 (즉, 인증된 유저 정보)
    const currentUser = getAuth(app).currentUser

    // 파일이 없거나, 유저 정보가 없거나, 인증된 유저 정보가 없으면 함수 종료
    if (!files || !user || !currentUser) return

    // 파일 이름 가져오고 // 파일 저장 경로 지정
    const fileName = files[0].name
    const storageRef = ref(storage, `users/${currentUser.uid}/${fileName}`) // 해당 path로 저장

    // 스토리지에 파일 업로드 (어떤 파일을 어떤 경로로 업로드 할지 지정)
    const uploadTask = await uploadBytes(storageRef, files[0])

    // 스토리지에 업로드된 이미지URL 가져오기
    const downloadUrl = await getDownloadURL(uploadTask.ref)

    // 유저 이미지 업데이트 (유저 인증 쪽 DB업데이트)
    await updateProfile(currentUser, {
      photoURL: downloadUrl, // 어떤 값을 업데이트 할건지 (photoURL을 업데이트 할거고, downloadUrl을 업데이트 할 것이다.)
    })

    // USER 컬렉션에 가서 해당 uid를 가진 doc(문서)에 접근해서 이미지 업데이트 (photoURL이 추가됨)
    await updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      photoURL: downloadUrl,
    })

    // 리코일에 저장된 유저 정보 업데이트
    setUser({
      ...user,
      photoURL: downloadUrl,
    })

    setIsLoading(false)

    // console.log('uploadTask', uploadTask)
    // console.log('downloadUrl', downloadUrl)
  }

  return (
    <Container>
      <img
        src={
          user?.photoURL ||
          'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-64.png'
        } // 유저의 이미지가 없으면 폴백 이미지를 보여줌
        alt="유저의 이미지"
        width={size}
        height={size}
      />

      {/* 파일 업로드가 일어나면 onChange함수 실행 */}
      {mode === 'upload' && (
        <input
          type="file"
          accept="image/*"
          onChange={handleUploadImage}
          disabled={isLoading}
        />
      )}
      {isLoading && (
        <FullPageLoader
          message="이미지를 업데이트하고 있어요!"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          color="white"
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  // 파일 업로드 인풋 숨김
  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

// const UserDefaultImage = ({ size = 40 }: { size?: number }) => {
//   return (
//     <svg
//       enableBackground="new -27 24 100 100"
//       height={size}
//       id="male3"
//       version="1.1"
//       viewBox="-27 24 100 100"
//       width={size}
//       xmlSpace="preserve"
//       xmlns="http://www.w3.org/2000/svg"
//       xmlnsXlink="http://www.w3.org/1999/xlink"
//     >
//       <g>
//         <g>
//           <circle cx="23" cy="74" fill="#F5EEE5" r="50" />
//           <g>
//             <defs>
//               <circle cx="23" cy="74" id="SVGID_1_" r="50" />
//             </defs>
//             <clipPath id="SVGID_2_">
//               <use overflow="visible" xlinkHref="#SVGID_1_" />
//             </clipPath>
//             <path
//               clip-path="url(#SVGID_2_)"
//               d="M38,99.9l27.9,7.7c3.2,1.1,5.7,3.5,7.1,6.6v9.8H-27v-9.8      c1.3-3.1,3.9-5.5,7.1-6.6L8,99.9V85h30V99.9z"
//               fill="#E6C19C"
//             />
//             <g clip-path="url(#SVGID_2_)">
//               <defs>
//                 <path
//                   d="M38,99.9l27.9,7.7c3.2,1.1,5.7,3.5,7.1,6.6v9.8H-27v-9.8c1.3-3.1,3.9-5.5,7.1-6.6L8,99.9V85h30V99.9z"
//                   id="SVGID_3_"
//                 />
//               </defs>
//               <clipPath id="SVGID_4_">
//                 <use overflow="visible" xlinkHref="#SVGID_3_" />
//               </clipPath>
//               <path
//                 clip-path="url(#SVGID_4_)"
//                 d="M-27,82H73v42H-27V82z M23,112c11,0,20-6.3,20-14s-9-14-20-14S3,90.3,3,98       S12,112,23,112z"
//                 fill="#E6A422"
//               />
//               <path
//                 clip-path="url(#SVGID_4_)"
//                 d="M23,102c-1.7,0-3.9-0.4-5.4-1.1c-1.7-0.9-8-6.1-10.2-8.3       c-2.8-3-4.2-6.8-4.6-13.3c-0.4-6.5-2.1-29.7-2.1-35c0-7.5,5.7-19.2,22.1-19.2l0.1,0l0,0l0,0l0.1,0       c16.5,0.1,22.1,11.7,22.1,19.2c0,5.3-1.7,28.5-2.1,35c-0.4,6.5-1.8,10.2-4.6,13.3c-2.1,2.3-8.4,7.4-10.2,8.3       C26.9,101.6,24.7,102,23,102L23,102z"
//                 fill="#D4B08C"
//               />
//               <path
//                 clip-path="url(#SVGID_4_)"
//                 d="M23,82C10.3,82,0,89.4,0,98.5S10.3,115,23,115s23-7.4,23-16.5       S35.7,82,23,82z M23,111c-10.5,0-19-6-19-13.5S12.5,84,23,84s19,6,19,13.5S33.5,111,23,111z"
//                 fill="#D98C21"
//               />
//             </g>
//           </g>
//           <path
//             d="M23,98c-1.5,0-3.5-0.3-4.8-0.9c-1.6-0.7-7.2-4.6-9.1-6.3c-2.5-2.3-3.8-5.1-4.2-10S3,58.5,3,54.5     C3,48.8,8.1,40,23,40l0,0l0,0l0,0l0,0C37.9,40,43,48.8,43,54.5c0,4-1.5,21.5-1.9,26.4s-1.6,7.7-4.2,10c-1.9,1.7-7.6,5.6-9.1,6.3     C26.5,97.7,24.5,98,23,98L23,98z"
//             fill="#F2CEA5"
//           />
//           <path
//             d="M30,85.5c-1.9,2-5.2,3-8.1,2.4c-2.7-0.6-4.7-2-5.7-4.3L30,85.5z"
//             fill="#A3705F"
//           />
//           <path
//             d="M30,85.5c-1.9,2-5.2,3-8.1,2.4     c-2.7-0.6-4.7-2-5.7-4.3L30,85.5z"
//             fill="none"
//             stroke="#A3705F"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <g>
//             <defs>
//               <rect height="5" id="SVGID_5_" width="31" x="7" y="65" />
//             </defs>
//             <clipPath id="SVGID_6_">
//               <use overflow="visible" xlinkHref="#SVGID_5_" />
//             </clipPath>
//             <circle
//               clip-path="url(#SVGID_6_)"
//               cx="32"
//               cy="69"
//               fill="#291F21"
//               r="2"
//             />
//             <circle
//               clip-path="url(#SVGID_6_)"
//               cx="14"
//               cy="69"
//               fill="#291F21"
//               r="2"
//             />
//           </g>
//           <path
//             d="M8,66c0,0,1.1-3,6.1-3c3.4,0,5.4,1.5,6.4,3"
//             fill="none"
//             stroke="#CC9872"
//             strokeWidth="2"
//           />
//           <path
//             d="M38.1,66c0,0-1.1-3-6.1-3c-4.8,0-7,3-7,5c0,1.9,0,9,0,9"
//             fill="none"
//             stroke="#BB8660"
//             strokeWidth="2"
//           />
//           <path
//             d="M41.8,72.2c0,0,0.8-6.3,3.7-7.2c0.4-1.8,1.5-7,1.5-9.9s-0.3-5.7-1.9-8.1c-1.8-2.6-5.6-4.1-7.6-4.1     c-2.3,1.4-7.7,4.6-9.4,6.5c-0.9,1,0.4,1.8,0.4,1.8s1.2-0.5,1.7-0.6c2.5-0.7,8-1.2,9.7,1.3C42,54.9,42,63.7,42,65     C42,66.2,41.8,72.2,41.8,72.2z"
//             fill="#452228"
//           />
//           <path
//             d="M0.5,65c2.9,1,3.7,7.2,3.7,7.2S4,66.2,4,65c0-1.6,0.2-9.1,3.4-12.7c3.6-4,8.4-5.3,11.1-3.5     c1.4,0.9,6.1,5.5,11.1,1.7c3-2.3,8.5-7.5,8.5-7.5s-2.9-8.9-16.1-7.9c-5.6,0.5-11.8-0.9-11.8-0.9s-0.1,2.5,0.9,3.8     C2.8,40.4,0.1,46.4-0.7,51c-0.2,0.9-0.3,1.8-0.3,2.7c0,0.5,0,1,0,1.4C-1,58,0.1,63.1,0.5,65z"
//             fill="#6B363E"
//           />
//         </g>
//       </g>
//     </svg>
//   )
// }

export default MyImage
