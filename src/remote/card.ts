import {
  collection,
  getDocs,
  limit,
  query,
  // QuerySnapshot,
  startAfter,
  doc,
  getDoc,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '../constants'
import { Card } from '../models/card'

// pageParam 지금 보이고 있는 맨 마지막 요소
export const getCards = async (
  pageParam?: QueryDocumentSnapshot<DocumentData>,
) => {
  // CARD라는 컬렉션에 접근해서 모든 데이터를 가져옴 (getDocs도 비동기)
  try {
    const cardQuery = !pageParam // 커서 여부에 따라서 쿼리를 분류 했는데,
      ? query(collection(store, COLLECTIONS.CARD), limit(10)) // 커서가 없다면 최초 호출 이니까 아무런 조건없이 10개만 불러주고
      : query(
          // 다음 호출 부터는 10개의 맨 마지막 요소를 커서라고 판단을 하고 그 커서를 기준으로 다음 10개를 불러오도록 페이징 처리를 함
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(10),
        )

    const cardSnapshot = await getDocs(cardQuery) // 쿼리를 가지고 문서를 호출하도록 함

    // 현재 불러온 데이터의 맨 마지막 문서(요소)를 커서로 설정
    const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

    // 데이터 가공
    const items = cardSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Card),
    }))
    return { items, lastVisible } // 받아온 데이터들과 마지막 커서를 반환
  } catch (error) {
    console.error(error)
  }
}

export const getCard = async (id: string) => {
  // 카드 하나를 가져오는 함수 (상세페이지)
  // 우리 앱에 있는 카드 컬렉션안에 있는 id를 가진 문서를 찾아 기져옴
  const snapshot = await getDoc(doc(store, COLLECTIONS.CARD, id))
  return {
    id,
    ...(snapshot.data() as Card),
  }
}
