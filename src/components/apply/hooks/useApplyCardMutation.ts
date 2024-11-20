import { useMutation } from '@tanstack/react-query'
import { applyCard } from '../../../remote/apply'
import { ApplyValues } from '../../../models/apply'
import useAlert from '../../../hooks/alert/useAlert'

interface UseApplyCardMutation {
  onSuccess: () => void
  onError: () => void
}

const useApplyCardMutation = ({ onSuccess, onError }: UseApplyCardMutation) => {
  const showAlert = useAlert()

  return useMutation({
    mutationFn: (applyValues: ApplyValues) => applyCard(applyValues),
    onSuccess: () => onSuccess(),
    onError: () =>
      showAlert({
        title: '카드를 신청하지 못했어요. 나중에 다시 시도해주세요.',
        onButtonClick: () => {
          onError()
        },
      }),
  })
}

export default useApplyCardMutation
