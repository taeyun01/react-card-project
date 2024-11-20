import { useState } from 'react'
import Apply from '../components/apply'
import useApplyCardMutation from '../components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '../components/apply/hooks/usePollApplyStatus'
import { updateApplyCard } from '../remote/apply'
import { APPLY_STATUS } from '../models/apply'
import useUser from '../hooks/auth/useUser'
import { useParams, useNavigate } from 'react-router-dom'
import Text from '../components/shared/Text'

const ApplyPage = () => {
  const navigate = useNavigate()

  const [readyToPoll, setReadyToPoll] = useState(false)

  const user = useUser()
  const { id } = useParams()

  const status = usePollApplyStatus({
    onSuccess: async () => {
      // console.log('카드추가 성공')
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id as string,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', { replace: true })
    },
    onError: async () => {
      // console.log('카드추가 실패')
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id as string,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', { replace: true })
    },
    enabled: readyToPoll,
  })

  //* useApplyCardMutation 훅이 무슨일을 하는지 알수 있도록 로직을 숨기지 말고 선언적으로 할 일만 딱 해주는 훅을 만들어준다.
  const { mutate, isPending } = useApplyCardMutation({
    onSuccess: () => {
      // 값이 추가 됐을 때 => 폴링시작
      setReadyToPoll(true)
    },
    onError: () => {
      // 실패 했을 때 => 폴링시작
      window.history.back() // 신청실패 확인창을 누르면 다시 상세페이지로 뒤로가기
    },
  })

  // TODO: 로딩 컴포넌트 만들기
  if (readyToPoll || isPending) {
    return (
      <div style={{ padding: '24px' }}>
        <Text typography="t5">
          {status === APPLY_STATUS.READY && '카드를 준비하고 있어요!'}
          {status === APPLY_STATUS.PROGRESS && '카드를 신청중이에요!'}
        </Text>
      </div>
    )
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage

//* 카드신청을 하기위해 데이터를 모으는 곳은 여기 ApplyPage였다.
//* 카드신청하는 페이지 입장에서는 이 데이터들이 변하는게 별로 궁금하지 않다.
//* 이 페이지는 다 긁어 모아진 완성본만 넘겨주고 그 완성본을 가지고 카드신청을 하도록 만들어 주면 된다.
//* 카드신청 하는 곳을 apply/index.tsx로 분리하여
//* 여기서 ApplyPage에서는 데이터 완성본만 받도록 해준다.

//? step이 변하는 것에 따라 무엇을 그릴지는 Apply에서 한다.
