import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '../constants'
import { ApplyValues } from '../models/apply'

// 우리가 넘겨줄 카드 정보를 저장해주는 함수
export const applyCard = async (applyValues: ApplyValues) => {
  return addDoc(collection(store, COLLECTIONS.CARD_APPLY), applyValues)
}

// 카드를 찾고 그 찾은 카드를 업데이트 해주는 함수
export const updateApplyCard = async ({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues>
}) => {
  //* 업데이트할 카드 찾기
  // 어떤 카드를 업데이트 할건지를 찾아야해서 query함수를 사용해 어떤 collection CARD_APPLY를 뒤질건데 어떤 조건으로 뒤질건지 where로 찾음
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId), // 'userId'가 넘겨 받은 userId랑 같은지
      where('cardId', '==', cardId), // 'cardId'가 넘겨 받은 cardId랑 같은지
    ),
  )

  const [appliedCard] = snapshot.docs

  // 찾은 카드 문서의 참조(ref)를 사용하여 applyValues로 문서 내용을 업데이트
  updateDoc(appliedCard.ref, applyValues) // 카드의 인자와 업데이트 해줄값을 업데이트
}
