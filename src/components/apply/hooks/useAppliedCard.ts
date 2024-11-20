//* 이 Hook은 getAppliedCard 함수를 이용하여 유저의 신청 정보를 반환하는 Hook

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getAppliedCard } from '../../../remote/apply'
import { ApplyValues } from '../../../models/apply'
import { useEffect } from 'react'

interface UseAppliedCardProps {
  userId: string
  cardId: string
  options?: UseQueryOptions<ApplyValues | null>
  onSuccess: (applied: ApplyValues | null) => void
  onError: () => void
}

const useAppliedCard = ({
  userId,
  cardId,
  options,
  onSuccess,
  onError,
}: UseAppliedCardProps) => {
  const { data, isError } = useQuery({
    queryKey: ['appliedCard', userId, cardId],
    queryFn: () => getAppliedCard({ userId, cardId }),
    ...options,
  })

  useEffect(() => {
    //  성공시 호출
    if (data) {
      onSuccess(data)
    }

    if (isError) {
      onError()
    }
  }, [data, isError, onSuccess, onError])

  return data
}

export default useAppliedCard
