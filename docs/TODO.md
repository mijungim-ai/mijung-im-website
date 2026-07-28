# TODO / Notes

## Project Roadmap

1. **디자인 전면 수정**

2. **영문 콘텐츠 확정**

3. **한글 1차 번역 투입**
   (여기까지 배포가 가장 많이 필요한 구간 — 현재 계정에서 소진)

4. **GitHub 저장소 소유권 결정**
   (Decap CMS 인증은 Netlify 계정이 아니라 git 저장소에 묶이므로, CMS 구축보다 반드시 앞서야 함)

5. **아티스트 계정 생성 → Netlify 사이트 이전**
   (아티스트 본인 이메일로 가입 후 나를 멤버로 초대하는 순서. 이전 후 배포 1회로 정상 동작 확인)

6. **CMS 구축**
   (새 계정·저장소 위에서)

7. **아티스트 검수 → CMS로 수정 반영**
   (아티스트에게 뉴스 항목 하나는 직접 올려보게 할 것)

8. **도메인 연결 = 공개 런칭**
   (미검수 한글 번역본이 검색엔진에 노출되지 않도록 최종 수정 이후로 미룸)

### CMS 구축 전 결정 필요 3건

- 이중언어 정책 — EN만 / 폴백 / 언어별 독립
- 인증 방식 — Netlify Identity 폐기로 대안 필요 (DecapBridge, Auth0, GitHub OAuth 중)
- 배포 빈도 정책 — Decap Editorial Workflow로 발행 시 1회만 배포되게 할지

### KO 사이트 방향 미결

현재 전 페이지 `isEn` 게이트로 placeholder 상태. 3단계에서 일괄 해제 예정.

- KO `common.json`'s `media.enlargeLabel` and `media.lightbox.*` keys are
  not currently rendered in KO — the Gallery/Press grids that use them are
  gated behind `isEn` in `MediaTabs.tsx`. They were added intentionally in
  anticipation of that gate being lifted. Do not delete them as unused.

- Gallery source photo spec: long edge 2000–2400px, JPEG quality 85.
  Given the `images.deviceSizes` step structure in `next.config.ts`,
  sizing originals larger than this brings no real benefit.

- KO pages (Home, About, Performances, Projects, Media) are all currently
  in placeholder state behind their `isEn` gates. Once real KO content is
  ready, these gates need to be lifted together, page by page.

- About 상단도입부로 이동 완료 — Hinson 인용구: "One of the most important
  pianists of our time." — Maurice Hinson, American pianist, pedagogue,
  and critic. (Home 페이지에서는 제거됨; 기존 스타일은 brass 라벨 "In Review" +
  border-l-2 border-brass 인용구 + not-italic 출처 표기였음. About에서는
  제목-부제-인용구 순서로 배치, 인용구 전체 이탤릭체.) `about.quoteText`/
  `about.quoteAttribution` 키는 현재 EN `common.json`에만 있고 KO에는 없음 —
  About 헤더의 인용구는 `isEn`으로 감싸서 KO에서는 아예 렌더링하지 않음
  (다른 섹션처럼 Placeholder로 감싸면 존재하지 않는 키를 그대로 문자열로
  출력해버려서 깨짐). KO 번역 작업 때 이 두 키도 함께 추가할 것.

- About > Artistic Vision 섹션: 내용 미정 — About 페이지에서는 제외하기로
  결정 (2026-07-28). 다른 배치 위치는 미정, 별도 지시 대기. 예약해뒀던 자리
  (프로필 사진 다음·Bio 앞, `[Content pending — see docs/TODO.md]`
  placeholder)와 관련 코드는 모두 제거함; `visionTitle`/`visionBody` 키도
  EN `common.json`에서 삭제. KO `common.json`의 `about.visionTitle`/
  `about.visionBody`는 (KO 파일은 명시 지시 없이 건드리지 않는다는 규칙에
  따라) 그대로 남아있지만 더 이상 어떤 코드에서도 참조되지 않음 — KO 번역
  작업 재개 시 함께 정리할 것.

  참고용으로 보존해둔 초안 텍스트(둘 다 확정 아님, 재사용 시 About 외
  다른 배치를 고려):

  - EN 초안: "For Mijung IM, musical excellence is not an end in itself.
    Virtuosity becomes meaningful when it serves listening, attentiveness,
    and human connection. Her performances invite audiences into a space
    of attentive listening. Rather than projecting emotion outward, she
    draws listeners inward, allowing musical meaning to emerge through
    nuance, pacing, resonance, and silence."

  - KO 초안 (제목 "예술적 비전"): "임미정에게 음악은 좀처럼 귀 기울여지지
    않는 장소 — 접경지대, 숲, 침묵 — 를 듣는 방식입니다. 그의 프로그램은
    피아노 리사이틀이 아름다움만큼이나 평화를 위한 자리를 마련할 수
    있다는 생각을 바탕으로 구성됩니다."

- Performances 페이지 개편 (2026-07-28): 상단도입부를 시각적 제목/부제에서
  sr-only `<h1>` + 이탤릭 3문장 statement(`performances.headerStatement`)로
  교체, "An Artist of Clarity, Depth, and Presence" 섹션(`introHeadline`/
  `introBody`) 삭제, Repertoire 섹션 전체 삭제(`repertoireTitle`/
  `repertoireBody`/`repertoireList`). Selected Engagements는 이제
  `src/data/engagements.ts`의 실제 데이터(3건, 배열 순서 = 표시 순서)로
  렌더링 — 기존 `engagementsList`/`engagementsBody` 번역 키는 더 이상
  쓰이지 않음. Concert Archive는 `src/data/concertArchive.ts`(현재 빈
  배열)를 기준으로 렌더링, 비어 있으면 `archiveBody` 문구를 절제된 빈
  상태 안내로 사용하고, 나중에 포스터가 추가되면 카드 그리드(이미지+연도
  +공연명)로 자동 전환됨.

  KO 쪽 영향: `performances.title`/`subtitle`는 계속 사용 중(새 헤더에서
  KO는 이탤릭 3문장 대신 기존 `subtitle`을 그대로 표시) — 단, 이 subtitle
  텍스트("선정 공연, 공연 아카이브, 레퍼토리")가 이제 없어진 레퍼토리
  섹션을 언급하고 있어 정확하지 않음; KO 번역 작업 재개 시 함께 손볼 것.
  `introHeadline`/`introBody`/`repertoireTitle`/`repertoireBody`/
  `engagementsBody` KO 키들은 (KO 파일 미수정 규칙에 따라) 그대로
  남아있지만 이제 어떤 코드에서도 참조되지 않음 — KO 정리 시 같이 처리.
  Selected Engagements/Concert Archive는 EN 데이터를 KO에도 그대로
  Placeholder로 감싸 노출함(Bio와 동일 패턴).

- Media 페이지 개편 (2026-07-28): 상단도입부를 시각적 제목/부제에서 sr-only
  `<h1>Media</h1>` + 굵은 큰 제목("An Artist of Clarity, Depth, and
  Presence", `media.headerTitle`) + 이탤릭 2문장(`media.headerStatement`,
  `PageHeaderStatement` 재사용)으로 교체. KO는 (About/Performances와 동일
  패턴으로) 새 콘텐츠 대신 기존 `subtitle`을 그대로 표시 — 단 이 subtitle
  ("갤러리, 영상, 오디오, 프레스")도 Audio 탭 삭제로 이제 부정확함; KO
  번역 작업 재개 시 Performances의 subtitle과 함께 손볼 것.

  탭: Audio 탭 완전 삭제(`tabs.audio`, `audioBody` EN에서 삭제, KO에는
  그대로 남아있지만 미참조). Video 탭은 내부 키를 그대로 "video"로
  유지하되 라벨만 "YouTube"로 변경 — KO가 이미 `tabs.video`: "영상"을
  갖고 있어서 키를 실제로 바꾸면 존재하지 않는 새 키(`tabs.youtube`)를
  모든 로케일에서 무조건 호출하게 되어(탭 버튼은 `isEn` 게이트가 없음)
  About 인용구 때와 같은 "번역 키 문자열이 그대로 출력되는" 버그가
  재발했을 것 — 그래서 내부 식별자는 안 건드리고 라벨 문자열만 바꿈. 탭
  순서를 YouTube → Press → Gallery로 재배열.

  작업 전 확인 결과: Video(YouTube) 탭은 더미 데이터가 아니라 이미 실제
  콘텐츠였음 — `videoItems`(연주 3건: Mozart/Chopin/DMZ 공연)과
  `talkItems`(토크·인터뷰 4건) 전부 실제 YouTube embed URL 보유. 사용자
  프롬프트의 "실제 링크가 없으면 Concert Archive처럼 빈 배열로
  스캐폴딩" 조건은 해당 없어 그대로 유지함 — Concert Archive 방식으로
  바꾸지 않았음.

  Press 탭 구조 확인: `media.pressItems`(EN 번역 배열, `{title, source,
  url}`)에 항목을 추가하면 "제목+하이퍼링크" 카드가 그대로 늘어나는
  구조 — 이미 요구사항 충족, 코드 변경 불필요. Gallery는 기존 2장 그대로.

  SNS 아이콘: 상단도입부에 `SocialIconRow`(`src/components/
  SocialIconRow.tsx`)로 5개 배치, `src/data/socials.ts`의 `SOCIALS`를
  그대로 재사용(Footer/Contact와 데이터 소스 공유, `icon` 필드만 추가).
  Instagram/Facebook/YouTube 3개는 실제 링크, Spotify/Apple Music
  2개는 `href: null`(기존 값 유지) → Media 페이지에서만 `href="#"` +
  `preventDefault`로 렌더링(Footer/Contact의 "흐리게 표시" 방식과는
  다르게, 실제 링크와 시각적으로 구분 안 되게). **Spotify/Apple Music
  실제 URL 필요.**

  아이콘 라이브러리: `lucide-react`를 설치해 확인했으나 설치된 버전
  (1.27.0)에 Instagram/Facebook/YouTube/Spotify 브랜드 아이콘이 전혀
  없음(트레이드마크 정리로 제거된 것으로 보임 — "apple"과 "x"(트위터)만
  남아있음). 그래서 다시 제거하고 `src/components/icons/
  SocialGlyphs.tsx`에 직접 만든 단색 SVG 5종을 대신 사용.

- Dialogue 페이지 개편 (2026-07-29): 상단도입부를 sr-only `<h1>Dialogue</h1>`
  + 이탤릭 4문장(`dialogue.headerStatement`, `PageHeaderStatement` 재사용)
  으로 교체, 기존 `entriesBody` 키 삭제. KO는 다른 페이지와 동일하게
  기존 `subtitle`("에세이 및 인터뷰")로 폴백.

  Essays/Artistic Director's Letter 실제 데이터를 `src/data/dialogue.ts`에
  분리(`EssayLink[]`, `DirectorLetterEntry[]` — 후자는 `type: "link" |
  "text"` 판별 유니온, 지금은 전부 링크형이지만 전문형 렌더링도 함께
  구현해둠). 두 섹션 제목("Essays", "Artistic Director's Letter")은
  `t()`가 아니라 코드에 그냥 하드코딩된 영문 문자열 — About의 "The
  Artist"/"Biography" 라벨과 동일한 기존 관행을 따름. 이 두 개를 위한
  새 번역 키를 만들면 EN에는 있고 KO에는 없는 키가 되는데, 이 키는
  `isEn` 게이트 없이 양쪽 로케일에서 무조건 호출되므로(섹션 제목이라
  숨길 수 없음) About 인용구/Media 탭 라벨 때와 같은 버그가 남; 아예
  번역 인프라를 안 타는 하드코딩으로 처음부터 피함.

  기고문/음악감독노트 링크 자체(에세이 2건, PLZ 노트 2건)는 `isEn`으로
  게이트하지 않고 양쪽 로케일에 동일하게 노출 — 원문이 애초에 한국어
  기사·한국어 페스티벌 공지라서 "EN 콘텐츠 확정 전까지 KO에서 숨김"이라는
  기존 게이트의 취지 자체가 적용 안 됨.

  URL 4개 전부 curl로 직접 접속 확인(200 + 실제 페이지 제목 일치):
  국민일보 기사 2건, plzfe.com 2020/2021 노트 2건. `plzfe.com`은 UA
  없이도 정상 응답이라 별도 브라우저 UA 재시도 불필요했음.

- Projects 페이지 — 홈페이지 링크 3건 (2026-07-29): PLZ/DMZ OPEN/Music
  for One 섹션에 "Visit Website →" 링크 추가. **사용자 프롬프트는
  "기존 `href="#"` placeholder를 교체"라고 했지만, 실제 코드에는 그런
  placeholder가 전혀 없었음**(grep 확인 완료, 이 TODO.md에도 관련 항목
  없었음) — 그래서 "교체"가 아니라 새로 추가함. 링크는 각 섹션의
  `final`(=`isEn`) 조건에 함께 묶여 있어 KO에서는 (다른 콘텐츠가 아직
  placeholder 상태인 것과 동일하게) 보이지 않음 — 의도적 설계.

  URL 3개 전부 실접속 확인:
  - `http://plzfe.com/` — 200, 실제 콘텐츠.
  - `https://www.gg.go.kr/dmzopen/index.do` — 기본 curl(UA 없음)로는
    "보안 정책에 의해 차단 되었습니다"(EUC-KR) 차단 페이지가 200으로
    돌아옴 — 브라우저 User-Agent + Accept-Language 헤더를 추가하자
    정상적인 실제 페이지(Vue 앱, 130KB)로 전환됨. 즉 이 도메인은 봇
    차단이 실제로 존재했고, 브라우저처럼 보이는 요청에는 정상 응답함.
  - `http://www.music4one.org/` — 사용자가 봇 차단 가능성을 특별히
    언급했지만, 기본 curl로도 바로 200 + 정상 콘텐츠(title: "(사)
    하나를위한음악재단") — 이 도메인은 차단 없음.

- Projects 페이지 — Educational Initiatives 삭제 + 갤러리 6장 추가
  (2026-07-29): `educationTitle`/`educationBody` 참조 코드(배열 항목)
  삭제, `projects` 배열이 `.map()`으로 렌더링되고 각 섹션이
  `space-y-20`으로만 간격을 두는 구조라(개별 섹션에 `py-*` 없음) 항목
  하나를 지워도 앞뒤 간격이 자동으로 다른 섹션 쌍과 동일하게 유지됨 —
  별도 스타일 조정 불필요. EN `common.json`에서 두 키 삭제; KO
  `common.json`의 `projects.educationTitle`/`educationBody`는 (KO 파일
  미수정 규칙에 따라) 그대로 남아있지만 이제 코드에서 전혀 참조 안 됨.

  EN `projects.subtitle`도 함께 수정함("Festivals, foundations, and
  educational initiatives" → "Festivals and foundations") — 이건 KO
  폴백용이 아니라 `PageHeader`를 통해 EN 사용자에게도 그대로 노출되는
  실제 텍스트라, Educational Initiatives를 지우면 EN 부제 자체가
  당장 부정확해지는 문제라 다른 페이지의 "KO 폴백 문구가 나중에
  부정확해짐" 케이스와는 다르게 즉시 고쳐야 했음. KO
  `projects.subtitle`("페스티벌, 재단, 교육 프로그램")은 여전히 교육
  프로그램을 언급 중 — KO는 안 건드리는 규칙이라 그대로 둠, KO 번역
  작업 재개 시 같이 손볼 것.

  갤러리 6장은 `src/data/projectGallery.ts`에 분리(다른 데이터 파일과
  동일 패턴, `src/data/media.ts`의 `MediaImage` 타입 재사용), 렌더링은
  `src/components/ProjectGallery.tsx`(신규 client 컴포넌트)가 담당 —
  `MediaTabs.tsx`의 Gallery 탭과 동일하게 기존 `Lightbox` 컴포넌트를
  그대로 재사용해 클릭 시 확대. "Gallery" 섹션 제목은 새 키를 만들지
  않고 이미 양쪽 로케일에 있는 `media.tabs.gallery`를 재사용(페이지 간
  네임스페이스 차용이지만, 새 미번역 키를 또 만드는 것보다 안전).
  사진 자체는 (기고문 링크와 마찬가지로) `isEn` 게이트 없이 양쪽
  로케일에 동일하게 노출.

  이미지 처리 중 실수 발견 및 수정: 처음에 bash 배열+for 루프로 6개를
  한 번에 리네이밍하려다가 출력 파일명과 실제 내용이 한 칸씩 밀리는
  버그가 발생함(예: "coasta_rica_..." 파일에 UN 오케스트라 사진이
  들어감) — 원인 특정 전에 즉시 전체 삭제 후 이미지 1장당 명령어 1개로
  개별 재처리, 이름별로 실제 픽셀 치수를 다시 확인하고 대표 이미지
  2장을 직접 눈으로 재확인한 뒤에야 커밋 진행. 6장 전부 4000px
  강제 리사이즈 기준 미만이라 치수는 원본 그대로 두고 quality 85로만
  재인코딩; 이 중 2장(경주 포럼 960×720, 박칼린 인터뷰 611×458)은 사이트
  기준 1500px 미만이라 원본 자체가 저해상도임 — 리사이즈로 개선 불가,
  그대로 사용.

- Contact 페이지 정리 (2026-07-29): 채널별로 분리했던 3개 컨택포인트
  (콘서트/마스터클래스/미디어), 지금은 General과 동일 정보라 통합함.
  채널별 구분이 필요해지면 참고. 레이아웃은 2×2 그리드에서 단일 블록으로
  변경(`grid sm:grid-cols-2` 제거, General 블록에 `max-w-sm`만 적용해
  전체 폭으로 늘어지지 않게 함). FOLLOW(SNS) 섹션은 Contact 페이지
  렌더링에서만 제거 — `src/data/socials.ts`는 손대지 않음(Media 상단
  도입부와 Footer가 계속 참조). 상단도입부(`contact.title`/`subtitle`)는
  그대로 유지.

  EN `common.json`에서 `contact.concertTitle`/`masterclassTitle`/
  `mediaTitle`/`followTitle` 4개 키 삭제. KO `common.json`은 (미수정
  규칙에 따라) 그대로 두었는데, KO는 애초에 `followTitle` 키 자체가
  없었고(FOLLOW 섹션이 EN 전용으로만 `isEn` 게이트되어 있었기 때문),
  `concertTitle`/`masterclassTitle`/`mediaTitle` 3개만 존재 — 이제 이
  3개가 코드에서 전혀 참조되지 않는 미사용 키가 됨. KO 번역 작업 재개
  시 함께 정리할 것.

- Media > Press 탭 재구성 (2026-07-29): NYT 지면 이미지(라이트박스+촬영자
  크레딧)를 상단 고정 콘텐츠로 유지하고, 그 아래 제목+외부링크 아이콘만
  있는 게시판형 리스트를 추가. 리스트 스타일은 Dialogue의 기고문 목록과
  동일하게 맞추기 위해 그 페이지에 있던 `LinkEntry`를 `src/components/
  LinkEntry.tsx`로 분리해 Dialogue/Media 양쪽에서 재사용(로직 변경 없음,
  단순 추출). 데이터는 `src/data/pressArticles.ts`에 분리(다른 데이터
  파일과 동일 패턴) — NYT는 기존처럼 `src/data/media.ts`의 `pressImages`
  (여전히 1장짜리 배열, Lightbox 컴포넌트가 배열을 받는 구조라 그대로 둠)
  로 별도 유지, 목록 5건만 `pressArticles`에 배열로 담음.

  기존 `media.pressItems`(sctoday 카드 1건, `{title, source, url}`) 번역
  키는 삭제하고 `pressArticles.ts`로 이전 — sctoday 항목은 게시판형
  리스트에 통합, 카드 형태를 유지하지 않고 나머지 4건과 동일한
  `LinkEntry` 스타일로 통일(제목 뒤에 "— 매체명"을 붙이는 방식은
  `dialogue.ts`의 essays 항목과 동일한 기존 관행을 따름). KO에는
  애초에 `pressItems` 키가 없어 새로 생긴 미사용 키는 없음.

  리스트 순서는 날짜순(최신 우선)으로 배치 — 각 기사 실제 게시일을
  curl로 직접 확인(User-Agent/Accept-Language 헤더 사용): 서울문화투데이
  2023-11-15, 객석(auditorium.kr) 2023-10-16, 경향신문 2021-09-15,
  인터뷰365 2021-08-31, 아트인사이트 2021-03-27. 그 결과 sctoday 카드가
  가장 최신이라 자연스럽게 리스트 맨 위에 위치함 — "맨 위 또는 날짜순
  적절한 위치" 두 조건이 우연히 일치.

  **링크 1건 수정**: 사용자가 준 객석(auditorium.kr) URL
  (`.../국제음악/`)은 curl 실접속 결과 404("페이지를 찾을 수 없습니다")
  — 가짜 차단 페이지가 아니라 실제 404였음. 해당 사이트 내 검색으로
  실제 슬러그를 찾아 확인: 워드프레스가 제목에서 슬러그를 만들며 끝부분
  "음악제 예술감독 임미정"을 잘라내 실제 URL은 `.../국제음/`(음악→음,
  "악" 한 글자 없음)로 끝남 — 이 실제 URL(HTTP 200, 제목/날짜 일치
  확인됨)로 교체해 반영함. 나머지 4개 URL(경향신문/인터뷰365/
  아트인사이트/sctoday)은 전부 정상 200 + 제목 일치.

- 상단 메뉴바 폰트 강화 + 언어 토글 추가 (2026-07-29): 메뉴 항목
  7개(HOME~CONTACT)의 font-weight를 600(semibold) → 800(extrabold)로
  올림. 사이트 전역에서 쓰이는 `.label` 클래스(탭/배지/푸터 링크 등
  다른 곳에도 다 적용됨) 자체를 바꾸면 영향 범위가 너무 커서, Nav
  전용 `.nav-label` 클래스를 새로 만들어 globals.css에 분리 추가하고
  Nav.tsx의 데스크톱 `<ul>`과 모바일 드로어 `<ul>` 양쪽에만 적용함(다른
  `.label` 사용처는 전혀 변경 없음). Manrope 폰트에 "800" 웨이트를
  `layout.tsx`의 next/font 설정에 추가해야 실제로 800이 렌더링됨(기존엔
  300~700만 로드하고 있었음). 로고(`.logotype`, weight 300)는 그대로 둠
  — 크기(14px)와 폰트 패밀리(Bricolage)가 이미 메뉴(13px, Manrope)와
  다르므로 웨이트 차이만으로도 위계가 자연스럽게 유지됨, 브라우저에서
  확인 완료.

  상단 언어 토글: Nav.tsx에 새로 추가, "전환할 언어만" 표시(예: EN
  상태면 "KO"만) — `LOCALES.find(l => l.code !== locale)`로 계산.
  기존 Footer(우측 하단)와 모바일 드로어 내부의 EN/KO 페어 토글은
  전혀 손대지 않음. 레이아웃: `<ul>`(메뉴)+새 토글+햄버거 버튼을 하나의
  flex 그룹으로 묶어 로고와 `justify-between`으로 분리 — 이렇게 해야
  데스크톱에서 토글이 CONTACT 바로 다음에 자연스럽게 붙고, 모바일에서도
  토글이 로고와 햄버거 버튼 사이(우측)에 위치해 겹치거나 붕 뜨지 않음.
  메뉴 항목 사이 간격을 기존 `gap-7`에서 `gap-5`로 줄여 토글 추가 공간을
  확보함. 1280px 데스크톱에서 로고+메뉴7개(강화된 폰트)+토글이 한 줄에
  정상 표시됨을 스크린샷으로 확인.

  두 토글(상단/하단) 동기화는 별도 상태 관리 없이 자동으로 보장됨 —
  둘 다 `useLocale()`로 현재 URL의 로케일 세그먼트를 읽을 뿐이고, 실제
  전환은 `next-intl`의 `Link` locale prop을 통한 진짜 라우트 이동이라
  한쪽을 눌러 페이지가 바뀌면 다른 쪽도 새로 렌더링되며 저절로 올바른
  상태를 반영함 — 브라우저에서 상단→하단, 하단→상단 양방향 전환 모두
  실제 클릭으로 확인함.

  **작업과 무관한 기존 버그 발견**: `/ko` 홈페이지에서 콘솔에
  `MISSING_MESSAGE: Could not resolve 'home.projectSubtitle' in
  messages for locale 'ko'` 서버 에러 발생 — `src/app/[locale]/page.tsx`
  의 Featured Project 섹션 KO 분기가 Placeholder로 감싸면서도 그 안에서
  `t("projectSubtitle")`를 그대로 호출하고 있어서(해당 키가 KO
  `common.json`에 없음) 발생하는, 이번 세션 여러 번 다룬 것과 동일한
  버그 클래스. 이번 Nav 작업과는 무관해 직접 고치지 않고 별도 작업으로
  분리(spawn_task로 플래그 처리).
