import { useQuery } from '@tanstack/react-query'
import { APPLY_STATUS } from '../../../models/apply'

interface UsePollApplyStatusProps {
  onSuccess: () => void
  onError: () => void
  enabled: boolean // 폴링을 할지 말지 여부
}

const usePollApplyStatus = ({
  enabled,
  onSuccess,
  onError,
}: UsePollApplyStatusProps) => {
  const { data, isError } = useQuery({
    queryKey: ['applyStatus'],
    queryFn: () => getApplyStatus(),
    enabled,
    refetchInterval: 2500, // 2.5초마다 폴링
    staleTime: 0, // 계속 최신 데이터를 유지하기 위해 0으로 설정
    //! v5부터 사라진 옵션 (onSuccess, onError, onSettled)
    // onSuccess: (status) => {
    //   console.log('status', status)
    //   if (status === APPLY_STATUS.COMPLETE) {
    //     onSuccess()
    //   }
    // },
    // onError: () => {
    //   onError()
    // },
  })

  // console.log(data) // "READY" | "PROGRESS" | "COMPLETE"

  // 성공시 호출
  if (data === APPLY_STATUS.COMPLETE) {
    onSuccess()
  }

  if (isError) {
    onError()
  }

  return data
}

// const currentIndex = 0

// 카드사를 대신 해주는 모킹함수 (랜덤하게 상태값을 뱉어주는 함수)
const getApplyStatus = async () => {
  const values = [
    APPLY_STATUS.READY,
    APPLY_STATUS.PROGRESS,
    APPLY_STATUS.COMPLETE,
    APPLY_STATUS.REJECT,
  ]

  // 랜덤하게 상태값을 뱉어줌
  const status = values[Math.floor(Math.random() * values.length)]

  // 순차적으로 순회
  // const status = values[currentIndex]
  // currentIndex = (currentIndex + 1) % values.length

  // 실패 케이스
  if (status === APPLY_STATUS.REJECT) {
    throw new Error('카드 발급에 실패했습니다.')
  }

  return status
}

export default usePollApplyStatus
