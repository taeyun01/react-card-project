/** @jsxImportSource @emotion/react */
import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { getCard } from '../remote/card'
import Top from '../components/shared/Top'
import ListRow from '../components/shared/ListRow'
import FixedBottomButton from '../components/shared/FixedBottomButton'
import Flex from '../components/shared/Flex'
import Text from '../components/shared/Text'
import { css } from '@emotion/react'
import { motion } from 'motion/react'
import { useCallback } from 'react'
import useUser from '../hooks/auth/useUser'
import useAlert from '../hooks/alert/useAlert'
import Review from '../components/card/Review'
import Spacing from '../components/shared/Spacing'

// 카드 상세페이지 함수 개선 테스트
// const str = `
//   <div class="pop_box"><div class="close_btn"><br></div><div class="banner"><h3 style="background: #7b7165;">체크카드 온라인 신규 발급 혜택을 Check!</h3><p class="title">기간</p><p>발급 : 2023.8.1(화) ~ 2023.8.31(목)<br>이용 : 2023.8.1(화) ~ 2023.9.10(일)</p><p class="title">대상</p><p>KB국민 체크카드 온라인 신규 발급 고객 (KB국민 기업, 기업, 선불카드 제외)</p><table><tbody><tr><td style="text-align:left;padding:15px;line-height:1.8em;"><p style="padding-bottom:10px;">[신규회원] 아래 중 한가지 충족하고 신규 발급 시점 체크카드 미보유 시 대상 인정</p><p>① KB국민 개인체크카드 최초 신규 발급 회원<br>② 보유 체크카드 전체의 유효기간 만료 후 신규 발급 회원<br>③ 2022년 12월 31일 이전 체크카드 탈회 후 이벤트 기간 중 신규 발급 회원</p></td></tr></tbody></table><p class="title">내용</p><p>대상 고객 응모 후 아래 조건 충족하면 혜택 제공!</p><p class="b">[혜택1] 스타벅스 아메리카노 1잔!</p><p>합산 5천원 이상 이용 시 스타벅스 아메리카노 tall size 1잔 모바일 쿠폰 1매 제공</p><p>[혜택2] 1만원 캐시백!</p><p>마케팅 동의 시 1만원</p><table><tbody><tr><td style="text-align:left;padding:15px;">[개인(신용)정보 동의(선택)] 선택항목 전체 동의 &amp; 이용채널 전체 동의</td></tr></tbody></table><p>[혜택3] 2만원 캐시백!</p><p>KB Pay 2만원 이상 이용 시 2만원 캐시백</p><p class="button"><a href="https://m.kbcard.com/e/280661" rel="noopener noreferrer" target="_blank">응모하러 가기</a></p><p class="title">혜택 제공</p><p>2023.9.27(수) 이내 고객 휴대폰으로 모바일쿠폰 발송(유효기간 60일), 최근 이용 체크카드 출금계좌로 캐시백</p><p class="title">이용 전 확인해주세요</p><ul><li>연회비 없음</li><li>응모 필수, 응모 및 이용 선후는 관계 없음</li><li>혜택1, 혜택2는 중복적용 가능, 체크카드 신규회원 대상인 다른 이벤트와는 혜택 중복 적용이 불가<br>*중복 참여 시 발급월 기준 가장 앞선 신청 건 자동 적용<br>*체크카드 신규회원 이벤트 통합 본인 회원 기준 1인 1회 한하여 제공</li><li>이용금액은 이용기간 종료 후 3영업일까지 정상 매입된 금액에 한함(매출취소, 당사 포인트리 충전금액 제외)</li><li>기존 체크카드 회원의 추가/교체 발급, 유효기간 미경과 해지 회원의 재발급시 대상 제외</li><li>혜택 제공 전 대상카드 해지 또는 교체, 체크카드 탈회하면 대상에서 제외</li></ul><br><ul class="conbox"><li>계약을 체결하기 전에 상품설명서와 약관을 확인하시기 바랍니다.</li><li class="none"><strong>연체이자율: 회원별/이용상품별 정상이자율 +3%p, 최고 연 20% 이내 <br>※단, 연체발생시점에 정상이자율이 없는 경우 아래와 같이 적용함</strong><ul><li class="dot"><strong>일시불 거래 연체시 : 거래발생시점의 최소기간(2개월) 유이자 할부 수수료율 적용</strong></li><li class="dot"><strong>무이자할부 거래 연체시 : 거래발생시점의 동일한 할부 계약 기간의 유이자 할부수수료율 적용</strong></li><li class="dot"><strong>그 외의 경우: 정상이자율은 상법상 상사법정이율과 상호금융가계자금대출금리 중 높은 금리 적용<br>*한국은행에서 매월 발표하는 가장 최근의 비은행금융기관 가중평균대출금리중 상호금융 가계자금 대출 금리(신규대출 기준)</strong></li><li class="none"><strong>상환능력에 비해 신용카드 사용액이 과도할 경우, 귀하의 개인신용평점이 하락할 수 있습니다.</strong></li><li class="none"><strong>개인신용평점 하락시 금융거래와 관련된 불이익이 발생할 수 있습니다.</strong></li><li class="none"><strong>일정기간 원리금을 연체할 경우, 모든 원리금을 변제할 의무가 발생할 수 있습니다.</strong></li></ul></li></ul><strong><ul><li class="dot">이 행사는 KB국민카드 영업정책 및 제휴업체의 사정으로 변경 또는 중단될 수 있습니다.</li><li class="dot">문의 : KB국민카드 고객센터 (1588-1688)</li><li class="dot">준법감시인 심의필 230725-02795-HPM (2023.07.25)</li></ul></strong></div></div>
//   <div class="pop_box"><div class="close_btn"><br></div><div class="banner"><h3 style="background: #7b7165;">체크카드 온라인 신규 발급 혜택을 Check!</h3><p class="title">기간</p><p>발급 : 2023.8.1(화) ~ 2023.8.31(목)<br>이용 : 2023.8.1(화) ~ 2023.9.10(일)</p><p class="title">대상</p><p>KB국민 체크카드 온라인 신규 발급 고객 (KB국민 기업, 기업, 선불카드 제외)</p><table><tbody><tr><td style="text-align:left;padding:15px;line-height:1.8em;"><p style="padding-bottom:10px;">[신규회원] 아래 중 한가지 충족하고 신규 발급 시점 체크카드 미보유 시 대상 인정</p><p>① KB국민 개인체크카드 최초 신규 발급 회원<br>② 보유 체크카드 전체의 유효기간 만료 후 신규 발급 회원<br>③ 2022년 12월 31일 이전 체크카드 탈회 후 이벤트 기간 중 신규 발급 회원</p></td></tr></tbody></table><p class="title">내용</p><p>대상 고객 응모 후 아래 조건 충족하면 혜택 제공!</p><p class="b">[혜택1] 스타벅스 아메리카노 1잔!</p><p>합산 5천원 이상 이용 시 스타벅스 아메리카노 tall size 1잔 모바일 쿠폰 1매 제공</p><p>[혜택2] 1만원 캐시백!</p><p>마케팅 동의 시 1만원</p><table><tbody><tr><td style="text-align:left;padding:15px;">[개인(신용)정보 동의(선택)] 선택항목 전체 동의 &amp; 이용채널 전체 동의</td></tr></tbody></table><p>[혜택3] 2만원 캐시백!</p><p>KB Pay 2만원 이상 이용 시 2만원 캐시백</p><p class="button"><a href="https://m.kbcard.com/e/280661" rel="noopener noreferrer" target="_blank">응모하러 가기</a></p><p class="title">혜택 제공</p><p>2023.9.27(수) 이내 고객 휴대폰으로 모바일쿠폰 발송(유효기간 60일), 최근 이용 체크카드 출금계좌로 캐시백</p><p class="title">이용 전 확인해주세요</p><ul><li>연회비 없음</li><li>응모 필수, 응모 및 이용 선후는 관계 없음</li><li>혜택1, 혜택2는 중복적용 가능, 체크카드 신규회원 대상인 다른 이벤트와는 혜택 중복 적용이 불가<br>*중복 참여 시 발급월 기준 가장 앞선 신청 건 자동 적용<br>*체크카드 신규회원 이벤트 통합 본인 회원 기준 1인 1회 한하여 제공</li><li>이용금액은 이용기간 종료 후 3영업일까지 정상 매입된 금액에 한함(매출취소, 당사 포인트리 충전금액 제외)</li><li>기존 체크카드 회원의 추가/교체 발급, 유효기간 미경과 해지 회원의 재발급시 대상 제외</li><li>혜택 제공 전 대상카드 해지 또는 교체, 체크카드 탈회하면 대상에서 제외</li></ul><br><ul class="conbox"><li>계약을 체결하기 전에 상품설명서와 약관을 확인하시기 바랍니다.</li><li class="none"><strong>연체이자율: 회원별/이용상품별 정상이자율 +3%p, 최고 연 20% 이내 <br>※단, 연체발생시점에 정상이자율이 없는 경우 아래와 같이 적용함</strong><ul><li class="dot"><strong>일시불 거래 연체시 : 거래발생시점의 최소기간(2개월) 유이자 할부 수수료율 적용</strong></li><li class="dot"><strong>무이자할부 거래 연체시 : 거래발생시점의 동일한 할부 계약 기간의 유이자 할부수수료율 적용</strong></li><li class="dot"><strong>그 외의 경우: 정상이자율은 상법상 상사법정이율과 상호금융가계자금대출금리 중 높은 금리 적용<br>*한국은행에서 매월 발표하는 가장 최근의 비은행금융기관 가중평균대출금리중 상호금융 가계자금 대출 금리(신규대출 기준)</strong></li><li class="none"><strong>상환능력에 비해 신용카드 사용액이 과도할 경우, 귀하의 개인신용평점이 하락할 수 있습니다.</strong></li><li class="none"><strong>개인신용평점 하락시 금융거래와 관련된 불이익이 발생할 수 있습니다.</strong></li><li class="none"><strong>일정기간 원리금을 연체할 경우, 모든 원리금을 변제할 의무가 발생할 수 있습니다.</strong></li></ul></li></ul><strong><ul><li class="dot">이 행사는 KB국민카드 영업정책 및 제휴업체의 사정으로 변경 또는 중단될 수 있습니다.</li><li class="dot">문의 : KB국민카드 고객센터 (1588-1688)</li><li class="dot">준법감시인 심의필 230725-02795-HPM (2023.07.25)</li></ul></strong></div></div>
//   <div class="pop_box"><div class="close_btn"><br></div><div class="banner"><h3 style="background: #7b7165;">체크카드 온라인 신규 발급 혜택을 Check!</h3><p class="title">기간</p><p>발급 : 2023.8.1(화) ~ 2023.8.31(목)<br>이용 : 2023.8.1(화) ~ 2023.9.10(일)</p><p class="title">대상</p><p>KB국민 체크카드 온라인 신규 발급 고객 (KB국민 기업, 기업, 선불카드 제외)</p><table><tbody><tr><td style="text-align:left;padding:15px;line-height:1.8em;"><p style="padding-bottom:10px;">[신규회원] 아래 중 한가지 충족하고 신규 발급 시점 체크카드 미보유 시 대상 인정</p><p>① KB국민 개인체크카드 최초 신규 발급 회원<br>② 보유 체크카드 전체의 유효기간 만료 후 신규 발급 회원<br>③ 2022년 12월 31일 이전 체크카드 탈회 후 이벤트 기간 중 신규 발급 회원</p></td></tr></tbody></table><p class="title">내용</p><p>대상 고객 응모 후 아래 조건 충족하면 혜택 제공!</p><p class="b">[혜택1] 스타벅스 아메리카노 1잔!</p><p>합산 5천원 이상 이용 시 스타벅스 아메리카노 tall size 1잔 모바일 쿠폰 1매 제공</p><p>[혜택2] 1만원 캐시백!</p><p>마케팅 동의 시 1만원</p><table><tbody><tr><td style="text-align:left;padding:15px;">[개인(신용)정보 동의(선택)] 선택항목 전체 동의 &amp; 이용채널 전체 동의</td></tr></tbody></table><p>[혜택3] 2만원 캐시백!</p><p>KB Pay 2만원 이상 이용 시 2만원 캐시백</p><p class="button"><a href="https://m.kbcard.com/e/280661" rel="noopener noreferrer" target="_blank">응모하러 가기</a></p><p class="title">혜택 제공</p><p>2023.9.27(수) 이내 고객 휴대폰으로 모바일쿠폰 발송(유효기간 60일), 최근 이용 체크카드 출금계좌로 캐시백</p><p class="title">이용 전 확인해주세요</p><ul><li>연회비 없음</li><li>응모 필수, 응모 및 이용 선후는 관계 없음</li><li>혜택1, 혜택2는 중복적용 가능, 체크카드 신규회원 대상인 다른 이벤트와는 혜택 중복 적용이 불가<br>*중복 참여 시 발급월 기준 가장 앞선 신청 건 자동 적용<br>*체크카드 신규회원 이벤트 통합 본인 회원 기준 1인 1회 한하여 제공</li><li>이용금액은 이용기간 종료 후 3영업일까지 정상 매입된 금액에 한함(매출취소, 당사 포인트리 충전금액 제외)</li><li>기존 체크카드 회원의 추가/교체 발급, 유효기간 미경과 해지 회원의 재발급시 대상 제외</li><li>혜택 제공 전 대상카드 해지 또는 교체, 체크카드 탈회하면 대상에서 제외</li></ul><br><ul class="conbox"><li>계약을 체결하기 전에 상품설명서와 약관을 확인하시기 바랍니다.</li><li class="none"><strong>연체이자율: 회원별/이용상품별 정상이자율 +3%p, 최고 연 20% 이내 <br>※단, 연체발생시점에 정상이자율이 없는 경우 아래와 같이 적용함</strong><ul><li class="dot"><strong>일시불 거래 연체시 : 거래발생시점의 최소기간(2개월) 유이자 할부 수수료율 적용</strong></li><li class="dot"><strong>무이자할부 거래 연체시 : 거래발생시점의 동일한 할부 계약 기간의 유이자 할부수수료율 적용</strong></li><li class="dot"><strong>그 외의 경우: 정상이자율은 상법상 상사법정이율과 상호금융가계자금대출금리 중 높은 금리 적용<br>*한국은행에서 매월 발표하는 가장 최근의 비은행금융기관 가중평균대출금리중 상호금융 가계자금 대출 금리(신규대출 기준)</strong></li><li class="none"><strong>상환능력에 비해 신용카드 사용액이 과도할 경우, 귀하의 개인신용평점이 하락할 수 있습니다.</strong></li><li class="none"><strong>개인신용평점 하락시 금융거래와 관련된 불이익이 발생할 수 있습니다.</strong></li><li class="none"><strong>일정기간 원리금을 연체할 경우, 모든 원리금을 변제할 의무가 발생할 수 있습니다.</strong></li></ul></li></ul><strong><ul><li class="dot">이 행사는 KB국민카드 영업정책 및 제휴업체의 사정으로 변경 또는 중단될 수 있습니다.</li><li class="dot">문의 : KB국민카드 고객센터 (1588-1688)</li><li class="dot">준법감시인 심의필 230725-02795-HPM (2023.07.25)</li></ul></strong></div></div>
//   <div class="pop_box"><div class="close_btn"><br></div><div class="banner"><h3 style="background: #7b7165;">체크카드 온라인 신규 발급 혜택을 Check!</h3><p class="title">기간</p><p>발급 : 2023.8.1(화) ~ 2023.8.31(목)<br>이용 : 2023.8.1(화) ~ 2023.9.10(일)</p><p class="title">대상</p><p>KB국민 체크카드 온라인 신규 발급 고객 (KB국민 기업, 기업, 선불카드 제외)</p><table><tbody><tr><td style="text-align:left;padding:15px;line-height:1.8em;"><p style="padding-bottom:10px;">[신규회원] 아래 중 한가지 충족하고 신규 발급 시점 체크카드 미보유 시 대상 인정</p><p>① KB국민 개인체크카드 최초 신규 발급 회원<br>② 보유 체크카드 전체의 유효기간 만료 후 신규 발급 회원<br>③ 2022년 12월 31일 이전 체크카드 탈회 후 이벤트 기간 중 신규 발급 회원</p></td></tr></tbody></table><p class="title">내용</p><p>대상 고객 응모 후 아래 조건 충족하면 혜택 제공!</p><p class="b">[혜택1] 스타벅스 아메리카노 1잔!</p><p>합산 5천원 이상 이용 시 스타벅스 아메리카노 tall size 1잔 모바일 쿠폰 1매 제공</p><p>[혜택2] 1만원 캐시백!</p><p>마케팅 동의 시 1만원</p><table><tbody><tr><td style="text-align:left;padding:15px;">[개인(신용)정보 동의(선택)] 선택항목 전체 동의 &amp; 이용채널 전체 동의</td></tr></tbody></table><p>[혜택3] 2만원 캐시백!</p><p>KB Pay 2만원 이상 이용 시 2만원 캐시백</p><p class="button"><a href="https://m.kbcard.com/e/280661" rel="noopener noreferrer" target="_blank">응모하러 가기</a></p><p class="title">혜택 제공</p><p>2023.9.27(수) 이내 고객 휴대폰으로 모바일쿠폰 발송(유효기간 60일), 최근 이용 체크카드 출금계좌로 캐시백</p><p class="title">이용 전 확인해주세요</p><ul><li>연회비 없음</li><li>응모 필수, 응모 및 이용 선후는 관계 없음</li><li>혜택1, 혜택2는 중복적용 가능, 체크카드 신규회원 대상인 다른 이벤트와는 혜택 중복 적용이 불가<br>*중복 참여 시 발급월 기준 가장 앞선 신청 건 자동 적용<br>*체크카드 신규회원 이벤트 통합 본인 회원 기준 1인 1회 한하여 제공</li><li>이용금액은 이용기간 종료 후 3영업일까지 정상 매입된 금액에 한함(매출취소, 당사 포인트리 충전금액 제외)</li><li>기존 체크카드 회원의 추가/교체 발급, 유효기간 미경과 해지 회원의 재발급시 대상 제외</li><li>혜택 제공 전 대상카드 해지 또는 교체, 체크카드 탈회하면 대상에서 제외</li></ul><br><ul class="conbox"><li>계약을 체결하기 전에 상품설명서와 약관을 확인하시기 바랍니다.</li><li class="none"><strong>연체이자율: 회원별/이용상품별 정상이자율 +3%p, 최고 연 20% 이내 <br>※단, 연체발생시점에 정상이자율이 없는 경우 아래와 같이 적용함</strong><ul><li class="dot"><strong>일시불 거래 연체시 : 거래발생시점의 최소기간(2개월) 유이자 할부 수수료율 적용</strong></li><li class="dot"><strong>무이자할부 거래 연체시 : 거래발생시점의 동일한 할부 계약 기간의 유이자 할부수수료율 적용</strong></li><li class="dot"><strong>그 외의 경우: 정상이자율은 상법상 상사법정이율과 상호금융가계자금대출금리 중 높은 금리 적용<br>*한국은행에서 매월 발표하는 가장 최근의 비은행금융기관 가중평균대출금리중 상호금융 가계자금 대출 금리(신규대출 기준)</strong></li><li class="none"><strong>상환능력에 비해 신용카드 사용액이 과도할 경우, 귀하의 개인신용평점이 하락할 수 있습니다.</strong></li><li class="none"><strong>개인신용평점 하락시 금융거래와 관련된 불이익이 발생할 수 있습니다.</strong></li><li class="none"><strong>일정기간 원리금을 연체할 경우, 모든 원리금을 변제할 의무가 발생할 수 있습니다.</strong></li></ul></li></ul><strong><ul><li class="dot">이 행사는 KB국민카드 영업정책 및 제휴업체의 사정으로 변경 또는 중단될 수 있습니다.</li><li class="dot">문의 : KB국민카드 고객센터 (1588-1688)</li><li class="dot">준법감시인 심의필 230725-02795-HPM (2023.07.25)</li></ul></strong></div></div>
//   <div class="pop_box"><div class="close_btn"><br></div><div class="banner"><h3 style="background: #7b7165;">체크카드 온라인 신규 발급 혜택을 Check!</h3><p class="title">기간</p><p>발급 : 2023.8.1(화) ~ 2023.8.31(목)<br>이용 : 2023.8.1(화) ~ 2023.9.10(일)</p><p class="title">대상</p><p>KB국민 체크카드 온라인 신규 발급 고객 (KB국민 기업, 기업, 선불카드 제외)</p><table><tbody><tr><td style="text-align:left;padding:15px;line-height:1.8em;"><p style="padding-bottom:10px;">[신규회원] 아래 중 한가지 충족하고 신규 발급 시점 체크카드 미보유 시 대상 인정</p><p>① KB국민 개인체크카드 최초 신규 발급 회원<br>② 보유 체크카드 전체의 유효기간 만료 후 신규 발급 회원<br>③ 2022년 12월 31일 이전 체크카드 탈회 후 이벤트 기간 중 신규 발급 회원</p></td></tr></tbody></table><p class="title">내용</p><p>대상 고객 응모 후 아래 조건 충족하면 혜택 제공!</p><p class="b">[혜택1] 스타벅스 아메리카노 1잔!</p><p>합산 5천원 이상 이용 시 스타벅스 아메리카노 tall size 1잔 모바일 쿠폰 1매 제공</p><p>[혜택2] 1만원 캐시백!</p><p>마케팅 동의 시 1만원</p><table><tbody><tr><td style="text-align:left;padding:15px;">[개인(신용)정보 동의(선택)] 선택항목 전체 동의 &amp; 이용채널 전체 동의</td></tr></tbody></table><p>[혜택3] 2만원 캐시백!</p><p>KB Pay 2만원 이상 이용 시 2만원 캐시백</p><p class="button"><a href="https://m.kbcard.com/e/280661" rel="noopener noreferrer" target="_blank">응모하러 가기</a></p><p class="title">혜택 제공</p><p>2023.9.27(수) 이내 고객 휴대폰으로 모바일쿠폰 발송(유효기간 60일), 최근 이용 체크카드 출금계좌로 캐시백</p><p class="title">이용 전 확인해주세요</p><ul><li>연회비 없음</li><li>응모 필수, 응모 및 이용 선후는 관계 없음</li><li>혜택1, 혜택2는 중복적용 가능, 체크카드 신규회원 대상인 다른 이벤트와는 혜택 중복 적용이 불가<br>*중복 참여 시 발급월 기준 가장 앞선 신청 건 자동 적용<br>*체크카드 신규회원 이벤트 통합 본인 회원 기준 1인 1회 한하여 제공</li><li>이용금액은 이용기간 종료 후 3영업일까지 정상 매입된 금액에 한함(매출취소, 당사 포인트리 충전금액 제외)</li><li>기존 체크카드 회원의 추가/교체 발급, 유효기간 미경과 해지 회원의 재발급시 대상 제외</li><li>혜택 제공 전 대상카드 해지 또는 교체, 체크카드 탈회하면 대상에서 제외</li></ul><br><ul class="conbox"><li>계약을 체결하기 전에 상품설명서와 약관을 확인하시기 바랍니다.</li><li class="none"><strong>연체이자율: 회원별/이용상품별 정상이자율 +3%p, 최고 연 20% 이내 <br>※단, 연체발생시점에 정상이자율이 없는 경우 아래와 같이 적용함</strong><ul><li class="dot"><strong>일시불 거래 연체시 : 거래발생시점의 최소기간(2개월) 유이자 할부 수수료율 적용</strong></li><li class="dot"><strong>무이자할부 거래 연체시 : 거래발생시점의 동일한 할부 계약 기간의 유이자 할부수수료율 적용</strong></li><li class="dot"><strong>그 외의 경우: 정상이자율은 상법상 상사법정이율과 상호금융가계자금대출금리 중 높은 금리 적용<br>*한국은행에서 매월 발표하는 가장 최근의 비은행금융기관 가중평균대출금리중 상호금융 가계자금 대출 금리(신규대출 기준)</strong></li><li class="none"><strong>상환능력에 비해 신용카드 사용액이 과도할 경우, 귀하의 개인신용평점이 하락할 수 있습니다.</strong></li><li class="none"><strong>개인신용평점 하락시 금융거래와 관련된 불이익이 발생할 수 있습니다.</strong></li><li class="none"><strong>일정기간 원리금을 연체할 경우, 모든 원리금을 변제할 의무가 발생할 수 있습니다.</strong></li></ul></li></ul><strong><ul><li class="dot">이 행사는 KB국민카드 영업정책 및 제휴업체의 사정으로 변경 또는 중단될 수 있습니다.</li><li class="dot">문의 : KB국민카드 고객센터 (1588-1688)</li><li class="dot">준법감시인 심의필 230725-02795-HPM (2023.07.25)</li></ul></strong></div></div>
// `

// 카드 상세 페이지
const CardPage = () => {
  const { id = '' } = useParams()
  const user = useUser()
  const showAlert = useAlert()
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id),
    enabled: id !== '', // id가 없으면 쿼리 실행 안함 (enabled속성을 통해 데이터를 호출할지 안할지 조절할 수 있음)
  })

  // TODO: 카드 신청하기는 로그인 상태서만 가능, 미로그인시 로그인페이지로 이동하는데. 로그인 한 다음 home페이지가 아닌 신청페이지로 이동하는 방법
  const moveToApply = useCallback(() => {
    if (!user) {
      showAlert({
        title: '로그인이 필요한 기능입니다.',
        onButtonClick: () => {
          navigate('/signin') // 확인 버튼을 눌렀을 때 이동
        },
      })
      return
    }

    navigate(`/apply/${id}`, { replace: true })
  }, [user, navigate, id, showAlert])

  if (!data) return null

  const { name, corpName, benefit, tags, promotion } = data

  const subTitle = promotion ? removeHtmlTags(promotion.title) : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subtitle={subTitle} />

      <ul>
        {benefit.map((text, index) => (
          <motion.li
            key={text}
            initial={{
              opacity: 0,
              translateX: -90,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: 'easeInOut',
            }}
            // 화면에 노출될때마다 애니메이션 실행
            // whileInView={{
            //   opacity: 1,
            //   translateX: 0,
            // }}
          >
            <ListRow
              as="div"
              left={<CheckIcon />}
              contents={
                <ListRow.ListRowTexts
                  title={`혜택 ${index + 1}`}
                  subTitle={text}
                />
              }
            />
          </motion.li>
        ))}
      </ul>

      {promotion ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <Spacing size={1000} />

      <Review />

      <Spacing size={100} />

      <FixedBottomButton
        label="1분만에 신청하고 혜택받기"
        onClick={moveToApply}
      />
    </div>
  )
}

const CheckIcon = () => {
  return (
    <svg
      fill="none"
      height="22"
      viewBox="0 0 48 48"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" fillOpacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  )
}

//* for문을 계속 돌면서 진행이 되는 함수는 값이 늘어날 수록 선형적으로 성능이 좋지 않아진다. (함수 개선)
// const removeHtmlTags = (text: string) => {
//   let output = ''

//   // 꺽쇠 태그 시작점부터 끝점 <????> 까지 모두 제거
//   for (let i = 0; i < text.length; i++) {
//     if (text[i] === '<') {
//       while (text[i] !== '>') i++
//     } else {
//       output += text[i]
//     }
//   }
//   return output
// }

//* 위 함수 구현자체가 별로기 때문에 우선 정규식을 사용해서 함수를 개선 (함수를 개선하는 것만으로도 크게 성능 개선이 도움이 된다.)
//* 성능 탭을 확인하여 함수를 바꾸기 전과 후를 비교해보자
const removeHtmlTags = (text: string) => {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}

const termsContainerStyles = css`
  margin-top: 40px;
  padding: 0 24px 80px 24px;
`

export default CardPage
