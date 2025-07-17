import Head from 'next/head';

import { AppConfig } from '../utils/AppConfig';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-600 antialiased">
      <Head>
        <title>개인정보처리방침 - {AppConfig.site_name}</title>
        <meta name="description" content="Dabini 개인정보처리방침" />
      </Head>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          개인정보처리방침
        </h1>

        <div className="space-y-8 rounded-lg bg-white p-8 shadow-sm">
          <div className="leading-relaxed text-gray-600">
            <p>
              <strong>다빈이랩</strong>(이하 &apos;회사&apos;라 합니다)은(는)
              개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와
              관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여
              다음과 같이 개인정보 처리방침을 수립·공개합니다.
            </p>
          </div>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              제1조 (개인정보의 처리 목적)
            </h2>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p>
                회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
                개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용
                목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의
                동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ol className="ml-6 list-decimal space-y-3">
                <li>
                  <strong>홈페이지 회원 가입 및 관리:</strong> 회원 가입 의사
                  확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격
                  유지·관리, 서비스 부정이용 방지, 각종 고지·통지, 고충 처리 등
                </li>
                <li>
                  <strong>AI 채팅 서비스 제공:</strong>
                  <ul className="ml-4 mt-2 list-disc space-y-1">
                    <li>
                      사용자 입력 내용(채팅 메시지) 분석 및 AI 기반 응답 생성
                    </li>
                    <li>채팅 기록 저장, 조회 및 관리 기능 제공</li>
                    <li>서비스 이용 통계 및 사용자 맞춤형 서비스 제공</li>
                  </ul>
                </li>
                <li>
                  <strong>서비스 개선 및 개발:</strong> 신규 서비스 개발 및 맞춤
                  서비스 제공, 서비스 유효성 확인, 접속 빈도 파악 또는 회원의
                  서비스 이용에 대한 통계 (필요시 익명화 처리 후 활용)
                </li>
                <li>
                  <strong>고충 처리:</strong> 민원인의 신원 확인, 민원사항 확인,
                  사실조사를 위한 연락·통지, 처리결과 통보 등
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              제2조 (처리하는 개인정보의 항목 및 수집 방법)
            </h2>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  1. 처리하는 개인정보 항목
                </h3>
                <div className="ml-4 space-y-2">
                  <div>
                    <strong>필수항목:</strong>
                    <ul className="ml-4 mt-1 list-disc">
                      <li>회원가입 시: 아이디, 이메일 주소, 비밀번호</li>
                      <li>
                        AI 채팅 서비스 이용 시:{' '}
                        <strong>
                          채팅 내용(사용자 입력 메시지 및 AI 응답 메시지 포함)
                        </strong>
                        , 서비스 이용 기록, 접속 로그, 쿠키, IP 주소
                      </li>
                    </ul>
                  </div>
                  <div>
                    <strong>선택항목:</strong> (귀사의 서비스에 따라 추가)
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  2. 개인정보 수집방법
                </h3>
                <ul className="ml-4 list-disc space-y-1">
                  <li>
                    홈페이지, 모바일 앱 등 온라인 서비스 가입 및 이용 과정에서
                    이용자가 직접 입력
                  </li>
                  <li>
                    서비스 이용 과정에서 자동으로 생성되어 수집 (예: 쿠키,
                    서비스 이용 기록, IP 주소 등)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              제3조 (개인정보의 처리 및 보유 기간)
            </h2>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p>
                1. 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
                개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서
                개인정보를 처리·보유합니다.
              </p>
              <p>2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
              <ul className="ml-6 list-disc space-y-3">
                <li>
                  <strong>홈페이지 회원 가입 및 관리:</strong> 회원 탈퇴 시까지.
                  다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
                  <ul className="ml-4 mt-2 list-disc">
                    <li>
                      관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는
                      해당 수사·조사 종료 시까지
                    </li>
                    <li>
                      서비스 이용에 따른 채권·채무관계 잔존 시에는 해당
                      채권·채무관계 정산 시까지
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>
                    AI 채팅 서비스 제공 관련 정보 (채팅 내용 포함):
                  </strong>
                  <ul className="ml-4 mt-2 list-disc">
                    <li>
                      원칙적으로{' '}
                      <strong>
                        회원 탈퇴 시 또는 정보주체가 채팅 기록 삭제 요청 시 지체
                        없이 파기
                      </strong>
                      합니다.
                    </li>
                    <li>
                      다만, 서비스 개선 및 통계 분석을 위해 채팅 내용을
                      익명화하여 활용하는 경우 해당 목적 달성 시까지 보유할 수
                      있습니다.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>
                    전자상거래 등에서의 소비자 보호에 관한 법률에 따른 보존
                    정보:
                  </strong>
                  <ul className="ml-4 mt-2 list-disc">
                    <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                    <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                    <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                  </ul>
                </li>
                <li>
                  <strong>통신비밀보호법에 따른 보존 정보:</strong>
                  <ul className="ml-4 mt-2 list-disc">
                    <li>로그인 기록(접속기록): 3개월</li>
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              제4조 (개인정보의 제3자 제공)
            </h2>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p>
                1. 회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서
                명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한
                규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만
                개인정보를 제3자에게 제공합니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              제5조 (개인정보처리의 위탁)
            </h2>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p>
                1. 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
                처리업무를 위탁하고 있습니다.
              </p>
              <div className="ml-6 space-y-4">
                <div>
                  <ul className="list-disc space-y-1">
                    <li>
                      <strong>수탁업체명:</strong> OpenAI, L.L.C.
                    </li>
                    <li>
                      <strong>위탁업무의 내용:</strong> 사용자 입력 내용(채팅
                      메시지)의 자연어 처리 및 AI 기반 응답 생성
                    </li>
                    <li>
                      <strong>위탁기간:</strong> 서비스 제공 기간 동안 또는 위탁
                      계약 종료 시까지
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="list-disc space-y-1">
                    <li>
                      <strong>수탁업체명:</strong> Google Cloud Korea LLC
                    </li>
                    <li>
                      <strong>위탁업무의 내용:</strong>
                      <ul className="ml-4 mt-1 list-disc">
                        <li>
                          서비스 제공을 위한 데이터 저장 및 관리 (회원 정보,
                          채팅 내용 등 포함)
                        </li>
                        <li>
                          서비스 운영을 위한 인프라(서버, 스토리지, 네트워크 등)
                          제공 및 유지보수
                        </li>
                        <li>데이터 백업 및 복구</li>
                      </ul>
                    </li>
                    <li>
                      <strong>위탁 정보의 국외 이전 가능성:</strong> Google
                      Cloud의 데이터센터는 전 세계 다양한 지역에 위치하고
                      있으며, 서비스 제공의 안정성 및 효율성 확보를 위해 회원이
                      서비스를 이용하는 국가 외의 지역(예: Google Cloud가 지정한
                      데이터센터 소재 국가)에서 개인정보가 처리(저장, 관리 등)될
                      수 있습니다. 회사는 개인정보의 국외 이전에 대해 관련
                      법령을 준수하며, 정보주체의 권리가 침해되지 않도록 필요한
                      조치를 취하고 있습니다.
                    </li>
                    <li>
                      <strong>위탁기간:</strong> 서비스 제공 기간 동안 또는 위탁
                      계약 종료 시까지
                    </li>
                  </ul>
                </div>
              </div>
              <p>
                2. 회사는 위탁계약 체결 시 개인정보 보호법 제26조에 따라
                위탁업무 수행목적 외 개인정보 처리 금지, 기술적·관리적 보호조치,
                재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한
                사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게
                처리하는지를 감독하고 있습니다.
              </p>
              <p>
                3. 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본
                개인정보 처리방침을 통하여 공개하도록 하겠습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              제6조 (정보주체와 법정대리인의 권리·의무 및 그 행사방법)
            </h2>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p>
                1. 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호
                관련 권리를 행사할 수 있습니다.
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>개인정보 열람요구</li>
                <li>오류 등이 있을 경우 정정 요구</li>
                <li>삭제요구</li>
                <li>처리정지 요구</li>
              </ul>
              <p>
                2. 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편,
                모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체
                없이 조치하겠습니다.
              </p>
              <p>
                3. 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한
                경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를
                이용하거나 제공하지 않습니다.
              </p>
              <p>
                4. 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을
                받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보
                보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야
                합니다.
              </p>
              <p>
                5. 정보주체는 개인정보 보호법 등 관계법령을 위반하여 회사가
                처리하고 있는 정보주체 본인이나 타인의 개인정보 및 사생활을
                침해하여서는 아니됩니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              제7조 (개인정보의 파기)
            </h2>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p>
                1. 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
                불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
              </p>
              <p>
                2. 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나
                처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를
                계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의
                데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
              </p>
              <p>3. 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <strong>파기절차:</strong> 회사는 파기 사유가 발생한
                  개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아
                  개인정보를 파기합니다.
                </li>
                <li>
                  <strong>파기방법:</strong> 회사는 전자적 파일 형태로
                  기록·저장된 개인정보는 기록을 재생할 수 없도록 로우레벨포맷
                  등의 방법을 이용하여 파기하며, 종이 문서에 기록·저장된
                  개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              제8조 (개인정보 자동 수집 장치의 설치·운영 및 그 거부에 관한 사항)
            </h2>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p>
                1. 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해
                이용정보를 저장하고 수시로 불러오는 &apos;쿠키(cookie)&apos;를
                사용합니다.
              </p>
              <p>
                2. 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의
                컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터
                내의 하드디스크에 저장되기도 합니다.
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  가. 쿠키의 사용목적: 이용자가 방문한 각 서비스와 웹 사이트들에
                  대한 방문 및 이용형태, 인기 검색어, 보안접속 여부 등을
                  파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.
                </li>
                <li>
                  나. 쿠키의 설치·운영 및 거부 : 웹브라우저 상단의
                  도구&lt;인터넷 옵션&gt;개인정보 메뉴의 옵션 설정을 통해 쿠키
                  저장을 거부 할 수 있습니다.
                </li>
                <li>
                  다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이
                  발생할 수 있습니다.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              제9조 (개인정보의 안전성 확보조치)
            </h2>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p>
                회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
                있습니다.
              </p>
              <ol className="ml-6 list-decimal space-y-2">
                <li>
                  <strong>관리적 조치:</strong> 내부관리계획 수립·시행, 정기적
                  직원 교육 등
                </li>
                <li>
                  <strong>기술적 조치:</strong> 개인정보처리시스템 등의 접근권한
                  관리, 접근통제시스템 설치, 고유식별정보 등의 암호화 (비밀번호,{' '}
                  <strong>채팅 내용 등 주요 정보 저장 및 전송 시 암호화</strong>
                  ), 보안프로그램 설치
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              제10조 (개인정보 보호책임자)
            </h2>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p>
                1. 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을
                위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              </p>
              <div className="ml-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    ▶ 개인정보 보호책임자
                  </h4>
                  <ul className="ml-4 mt-2 list-disc space-y-1">
                    <li>성명: 최연웅</li>
                    <li>직책: 대표</li>
                    <li>
                      연락처: (전화번호) 010-6556-2256, (이메일)
                      yonsweng@dabinilab.com
                    </li>
                  </ul>
                </div>
              </div>
              <p>
                2. 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한
                모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한
                사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다.
                회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴
                것입니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              제11조 (권익침해 구제방법)
            </h2>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p>
                정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제,
                상담 등을 문의하실 수 있습니다.
                <br />
                &lt;아래의 기관은 회사와는 별개의 기관으로서, 회사의 자체적인
                개인정보 불만처리, 피해구제 결과에 만족하지 못하시거나 보다
                자세한 도움이 필요하시면 문의하여 주시기 바랍니다&gt;
              </p>
              <ul className="ml-6 list-disc space-y-3">
                <li>
                  <strong>
                    ▶ 개인정보 침해신고센터 (한국인터넷진흥원 운영)
                  </strong>
                  <ul className="ml-4 mt-2 list-disc">
                    <li>소관업무: 개인정보 침해사실 신고, 상담 신청</li>
                    <li>홈페이지: privacy.kisa.or.kr</li>
                    <li>전화: (국번없이) 118</li>
                    <li>
                      주소: (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층
                      개인정보침해신고센터
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>▶ 개인정보 분쟁조정위원회</strong>
                  <ul className="ml-4 mt-2 list-disc">
                    <li>
                      소관업무: 개인정보 분쟁조정신청, 집단분쟁조정 (민사적
                      해결)
                    </li>
                    <li>홈페이지: www.kopico.go.kr</li>
                    <li>전화: (국번없이) 1833-6972</li>
                    <li>
                      주소: (03171)서울특별시 종로구 세종대로 209 정부서울청사
                      12층
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>▶ 대검찰청 사이버수사과:</strong> (국번없이) 1301
                  (cid@spo.go.kr)
                </li>
                <li>
                  <strong>▶ 경찰청 사이버수사국:</strong> (국번없이) 182
                  (cyberbureau.police.go.kr)
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              제12조 (개인정보 처리방침 변경)
            </h2>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p>
                1. 이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에
                따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의
                시행 7일 전부터 공지사항을 통하여 고지할 것입니다. 다만,
                개인정보의 수집 및 활용, 제3자 제공 등과 같이 이용자 권리의
                중요한 변경이 있을 경우에는 최소 30일 전에 고지합니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">부칙</h2>
            <div className="space-y-3 leading-relaxed text-gray-600">
              <p>본 방침은 2025년 7월 8일부터 시행됩니다.</p>
            </div>
          </section>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <button
              onClick={() => window.history.back()}
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              이전 페이지로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
