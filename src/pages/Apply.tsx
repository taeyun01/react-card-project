import { useEffect, useState } from 'react'
import Apply from '../components/apply'
import useApplyCardMutation from '../components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '../components/apply/hooks/usePollApplyStatus'
import { updateApplyCard } from '../remote/apply'
import { APPLY_STATUS, ApplyValues } from '../models/apply'
import useUser from '../hooks/auth/useUser'
import { useParams, useNavigate } from 'react-router-dom'
import useAppliedCard from '../components/apply/hooks/useAppliedCard'
import useAlert from '../hooks/alert/useAlert'
import FullPageLoader from '../components/shared/FullPageLoader'

const STATUS_MESSAGE = {
  [APPLY_STATUS.READY]: '카드 심사를 준비하고 있어요!',
  [APPLY_STATUS.PROGRESS]: '카드를 심사 중이에요. 잠시만 기다려주세요!',
  [APPLY_STATUS.COMPLETE]: '카드 신청이 완료되었어요!',
}

const ApplyPage = () => {
  const showAlert = useAlert()
  const navigate = useNavigate()

  const [readyToPoll, setReadyToPoll] = useState(false)
  const [navigateTo, setNavigateTo] = useState<string | null>(null)

  const user = useUser()
  const { id } = useParams()

  const data = useAppliedCard({
    // useAppliedCard함수에서 유저가 카드 신청을 이미 했는지 확인
    userId: user?.uid as string,
    cardId: id as string,
    // 그렇게 해서 받아온 데이터 applied(신청한) 상태가 아니면 처음 신청을 하는거니까
    // return을 해주어 카드 신청을 하는 페이지를 렌더링 한다. -> return <Apply onSubmit={mutate} />
    onSuccess: (applied: ApplyValues | null) => {
      if (!applied) {
        return null
      }

      // 신청에 대한 데이터가 상태가 완료 상태면, 이미 카드 발급이 완료된 상태이므로 Alert을 띄워주고 홈으로 돌아간다.
      if (applied.status === APPLY_STATUS.COMPLETE) {
        showAlert({
          title: '이미 카드 발급이 완료된 카드입니다.',
          onButtonClick: () => {
            window.history.back()
          },
        })
        return
      }

      // 신청 정보는 있는데 COMPLETE 상태가 아니라면, 카드 심사가 끝나지 않은 것이기 때문에 재심사를 하기 위해 처리
      // 유저가 카드 신청 중 이탈하여 READY 상태로 남아있을 때는 카드사로 다시 재심사를 요청
      setReadyToPoll(true)
    },
    onError: () => {},
  })

  const status = usePollApplyStatus({
    onSuccess: async () => {
      console.log('카드추가 성공')
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id as string,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      // navigate('/apply/done?success=true', { replace: true })
      setNavigateTo('/apply/done?success=true')
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
      // navigate('/apply/done?success=false', { replace: true })
      setNavigateTo('/apply/done?success=false')
    },
    enabled: readyToPoll,
  })

  //* useApplyCardMutation 훅이 무슨일을 하는지 알수 있도록 로직을 숨기지 말고 선언적으로 할 일만 딱 해주는 훅을 만들어준다.
  // step1,2,3을 거쳐서 카드를 신청하게 됨. mutate가 실행되는 시점에 카드에 대한 정보가 쌓이게 됨. 성공적으로 정보가 쌓이면 onSuccess가 호출되면서 카드사의 신청상태를 폴링하게 됨
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

  console.log('status', status)

  useEffect(() => {
    if (navigateTo) {
      return navigate(navigateTo, { replace: true })
    }
  }, [navigateTo, navigate])

  if (readyToPoll || isPending) {
    return <FullPageLoader message={STATUS_MESSAGE[status ?? 'READY']} />
  }

  // data가 있고, 신청 상태가 완료 상태면 페이지에 아무것도 렌더링 하지 않음
  if (data && data.status === APPLY_STATUS.COMPLETE) {
    return null
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
