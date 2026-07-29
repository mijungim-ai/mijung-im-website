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

### CMS 구축 전 결정 필요 2건

- 인증 방식 — Netlify Identity 폐기로 대안 필요 (DecapBridge, Auth0, GitHub OAuth 중)
- 배포 빈도 정책 — Decap Editorial Workflow로 발행 시 1회만 배포되게 할지

### 이중언어 정책 — 확정 (2026-07-29)

게시판형 5개 섹션(Home Latest News, Performances Selected Engagements/
Concert Archive, Media YouTube/Press/Gallery, Dialogue Essays/Director's
Letter, Projects Gallery)은 **콘텐츠 EN/KO 공용, 감싸는 UI 텍스트만
언어별 분리**. 작성 언어는 항목마다 다를 수 있음(전부 한국어, 전부
영어, 혼용 전부 허용) — 예: Dialogue 기사 제목은 한국어(국민일보 등
실제 한국 언론), Media 비디오 제목("Mozart"/"Chopin")과 Performances
공연 정보는 영어, 전부 그대로 유지.

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

- 상단 메뉴 — 활성 페이지 표시 (2026-07-29): `bg-ink`의 실제 값(`#fcfcfa`)
  위에서 sage(`#5a6650`)와 brass(`#8a6b3a`) 대비를 직접 계산 — sage
  5.92:1, brass 4.82:1, 둘 다 WCAG AA(4.5:1) 통과. 우선순위 규칙대로
  sage 사용 — 마침 데스크톱 `<ul>`의 `isActive` 텍스트 색이 이미
  `text-sage`였어서(이전 세션에 이미 구현되어 있던 부분) 색 자체는
  변경 없이 유지, 새로 추가한 건 활성 항목 전용 1px sage 밑줄뿐. 모든
  항목에 `border-b`(비활성은 `border-transparent`)를 동일하게 줘서
  active/inactive 전환 시 레이아웃이 흔들리지 않게 함(Media 탭의 기존
  밑줄 패턴과 동일한 기법).

  모바일 드로어(햄버거 메뉴)는 이미 항목마다 `border-b border-hairline`
  구분선이 있어서 여기에 밑줄을 추가로 넣으면 활성 항목만 선이 두 줄로
  겹쳐 보여 지저분해짐 — 판단해서 드로어는 기존처럼 색(sage)만으로
  구분하도록 그대로 둠(이 부분도 이전 세션에 이미 구현되어 있었음).
  375px에서 드로어를 열어 확인.

  7개 페이지(EN) 전부 실제 이동(주소창 네비게이션)으로 검증 완료 —
  각 페이지에서 해당 항목 하나만 sage 색+밑줄, 나머지 6개는 회색+밑줄
  없음을 계산된 스타일로 확인. KO 로케일도 미디어 페이지로 스팟체크
  확인. 로고/언어 토글은 이 로직과 무관해 손대지 않음.

  검증 중 참고: Nav의 `<Link>`에 raw JS `.click()`(비신뢰 이벤트)을
  쏘면 next-intl 라우터가 실제로는 정상 동작했는데도 브라우저 주소는
  바뀌고 활성 상태 계산은 이전 페이지 값으로 멈춰있는 것처럼 보이는
  테스트 아티팩트가 있었음(진짜 버그 아님) — 실제 주소창 네비게이션과
  신뢰된 클릭으로 재확인해 정상 동작임을 확인함.

- 활성 메뉴 색상 버그 리포트 재확인 (2026-07-29): 사용자가 KO
  `/dialogue` 스크린샷에서 DIALOGUE 항목에 밑줄은 있으나 sage 텍스트
  색은 안 먹었다고 신고. 재조사 결과 **코드에는 결함이 없었음** —
  `Nav.tsx`의 `isActive(item.href) ? "text-sage border-sage" : ...`
  삼항식과 `globals.css`의 `.nav-label`(색상 속성 없음, `font-weight`/
  `letter-spacing`만 지정)을 다시 읽어봐도 텍스트 색과 밑줄 색이 서로
  다른 곳에서 씹힐 구조적 이유가 없음(둘 다 같은 삼항식의 같은 분기에서
  같은 특이도의 Tailwind 유틸리티 클래스로 나옴). 실제로 `bg-ink`
  위에서 `.text-sage`/`.text-grey-muted`를 무력화하는 `a`/전역 `color`
  규칙도 `globals.css`에 전혀 없음(grep 확인).

  이 상태에서 라이브로 재검증(오래 떠 있던 dev 서버, Tue06AM부터 이
  세션 내내 수십 번의 파일 저장을 거친 상태)했더니 computed style이
  이미 정상(`다이얼로그` color: `rgb(90, 102, 80)`)이었음 — 재현
  실패. 혹시 몰라 dev 서버를 완전히 죽이고 `.next` 캐시를 지운 뒤 처음
  한 번은 재시작 직후 여러 라우트를 동시에 때려서 일시적으로
  `SyntaxError ... JSON.parse`발 500 에러가 몇 차례 났으나(코드가 아닌
  Turbopack 콜드스타트 시점의 무관한 아티팩트로 판단, Nav 색상과는 별개
  현상), 완전히 정지 후 순차적으로 재요청하자 전부 200으로 안정화됨.
  이 클린 서버에서 KO `/dialogue`, EN `/media`, EN `/contact`, KO
  `/performances` 4개 페이지를 실제 스크린샷 + computed style로 재검증
  — 전부 활성 항목만 sage 텍스트(`rgb(90, 102, 80)`)+1px sage 밑줄,
  나머지는 회색(`rgb(110, 107, 98)`)+투명 밑줄로 정상 동작.

  **결론**: 코드 변경 없음(수정할 결함을 찾지 못함). 사용자가 본
  스크린샷은 이 브라우저 도구 세션과는 다른 경로(실제 Chrome 등)에서
  캡처됐을 가능성이 있고, 그 시점의 캐시된 CSS/HMR 상태가 원인이었을
  가능성이 가장 유력해 보이나 확정할 수는 없음 — 재현이 안 되는 상태에서
  존재하지 않는 결함을 억지로 "수정"하지 않음. 앞으로 유사 신고가 다시
  들어오면 재현 시점의 하드 리프레시(캐시 무시) 여부를 먼저 확인할 것.

- 디자인 토큰 — sage/brass 색상 교체 (2026-07-29): `--accent-sage`
  `#5a6650`→`#5b7a3e`, `--accent-brass`: `#8a6b3a`→`#8f6a1e`.
  영향 범위 사전 조사(grep) 결과 하드코딩된 hex는 이 두 CSS 변수
  정의(`globals.css` 13-20행) 자체뿐이었고, 나머지는 전부
  `text-sage`/`border-sage`/`bg-sage`/`text-brass`/`border-brass`
  Tailwind 유틸리티를 통해 변수를 참조하는 구조라 값만 바꿔서 전체
  사이트에 자동 반영됨 — 별도 파일 수정 불필요.

  Sage(`#5B7A3E`)의 배경(`#FCFCFA`) 대비 여유가 0.26으로 좁음
  (4.76:1, AA 기준 4.5:1) — 향후 `--bg-primary`를 지금보다 밝게 조정할
  경우 이 색부터 재확인 필요.

  실측 대비(렌더링된 computed style 기준 재계산, 사용자 사전 추정치와
  거의 일치): Sage 4.756:1(추정 4.76:1), Brass 4.812:1(추정 4.81:1) —
  둘 다 AA 통과, 사용자가 지정한 "4.5 미만이면 먼저 보고" 조건에
  해당하지 않아 값 조정 없이 그대로 반영.

- 로고 — Nav "MIJUNG IM" → "IM" 모노그램 + 파비콘 (2026-07-29): Home
  히어로의 "Mijung IM" 타이틀 실제 computed style을 확인해 재사용(새
  폰트 로드 없음) — `font-family: Merriweather`(레이아웃의
  `--font-bodoni` 변수, 프로젝트 초기에 "Bodoni Moda"였다가 나중에
  Merriweather로 교체된 이력이 있어 변수명과 실제 폰트가 다름),
  `font-weight: 700`, `font-style: italic`, `letter-spacing: normal`
  — 기존 globals.css의 `.display-serif` 클래스가 정확히 이 조합이라
  Nav.tsx에서 `logotype` 대신 `display-serif`로 교체. 텍스트는
  `t()` 없이 `IM` 하드코딩, `aria-label="Mijung IM"` 추가. Footer의
  "Mijung IM" 워드마크는 이번 지시 범위 밖이라 손대지 않음(로고
  일관성 관점에서 나중에 재검토 여지 있음).

  파비콘: 기존 `src/app/favicon.ico`는 `create-next-app` 기본값(커스텀
  안 된 상태)이었음 — 새 아이콘 도입에 맞춰 삭제하고 Next.js 파일
  컨벤션대로 `src/app/icon.png`(32×32, 배지형 A안: ink 배경 둥근
  사각형 + 반전색 IM)와 `src/app/apple-icon.png`(180×180, 풀블리드
  불투명 정사각형 — iOS가 자체적으로 모서리를 마스킹하므로 투명/둥근
  모서리를 넣지 않음, Apple 권장사항)로 교체. 두 파일 다 히어로와
  동일한 Merriweather Bold Italic 폰트로 PIL 직접 래스터화(브라우저
  캔버스가 아니라 실제 폰트 파일을 8배 슈퍼샘플링 후 LANCZOS
  다운스케일 — 파비콘은 최종적으로 정적 비트맵으로 표시되므로 이
  방식이 실제 결과물과 가장 가까움).

  16px 검증 결과 실제 문제 발견해 사용자에게 보고 후 진행: 투명
  배경(B안, 세리프 획이 16px에서 소실)과 배지형(A안)의 16px도
  경계선상이었으나, 32px에서는 A안이 확실히 우수 — 사용자가 A안을
  그대로 채택하기로 결정. 16px 열화는 알려진 트레이드오프로 남겨둠;
  나중에 16px 전용 단순화 마크가 필요해지면 이 항목 참고.

- Concert Archive 실제 데이터 4건 추가 (2026-07-29): `ConcertArchiveEntry`
  타입에 `venue?`/`program?` 선택 필드 추가(모든 항목이 다 채울 필요는
  없음). 사용자가 채팅에 직접 첨부한 포스터 이미지 4장은 대화 세션의
  JSONL 트랜스크립트(`~/.claude/projects/.../<session>.jsonl`)에서
  base64로 직접 추출해 `public/images/archive/`에 저장 — 이미지가
  첨부된 순서와 파일명 목록의 순서가 서로 달라서(목록은 최신순 정렬,
  첨부는 원문 순서), 각 이미지를 실제로 열어 내용을 눈으로 대조한 뒤
  확정함(1987년 포스터가 정확히 401×540px인 것으로 최종 교차 검증).

  Performances 페이지의 기존 스캐폴딩(빈 배열일 때만 empty-state,
  차 있으면 이미 카드 그리드 렌더링하는 조건문)이 이미 있었으나
  라이트박스 연결이 안 되어 있었음 — `ConcertArchiveGrid.tsx`(신규
  client 컴포넌트, `ProjectGallery.tsx`와 동일 패턴)로 분리해 기존
  `Lightbox` 재사용, 페이지의 조건부 empty-state 분기는 통째로
  제거(더 이상 빈 배열이 될 일이 없어서 `archiveBody` EN 키도 함께
  삭제). KO `common.json`의 `archiveBody`는 계속 존재하지만 이제 코드
  어디서도 참조 안 함 — KO 정리 시 같이 처리. 포스터 4건의 제목·장소는
  실제 역사적 기록이라(한국어 원문 그대로인 것도 있음) Dialogue
  essays/Projects gallery와 동일하게 `isEn` 게이트 없이 양쪽 로케일에
  동일 노출.

  카드에는 연도+제목만, 장소/프로그램은 라이트박스 안에서만 노출하기로
  판단(기존 Media Gallery/Projects 갤러리 카드 스타일과 통일감 유지).

  1987년 포스터 화질 확인 결과(사용자 요청대로 보정 안 하고 그대로
  둠): 원본이 401×540px라 라이트박스에서 실측 5.76배까지 업스케일됨
  (데스크톱 확대 시 naturalWidth 200×270 vs 렌더 1152px 폭 — Next.js
  Image가 소스보다 큰 폭을 요청해도 업스케일은 안 해주기 때문에 원본
  그대로 서빙됨). 나머지 3장(1240~1426px 폭 원본)은 거의 1:1로
  렌더링되어 나란히 보면 1987년 포스터만 눈에 띄게 부드럽고 디테일이
  약함 — 사용자가 이미 예상한 대로였고 요청대로 손대지 않음.

  **작업과 무관한 기존 버그 발견**: 라이트박스 좌우 화살표 버튼(이전/
  다음)이 `w-[90vw]` 이미지 박스에 실제로 가려져서, 마우스/트랙패드
  클릭이 씹히는 현상 발견(`document.elementFromPoint`로 버튼 중심
  좌표의 최상단 요소가 버튼이 아니라 `<img>`인 것을 확인). 스와이프
  제스처와 키보드 화살표는 정상 동작하지만 클릭은 안 먹음 — `Lightbox`
  공유 컴포넌트라 Media/Projects/Performances 전부에 영향. 이번 작업과
  무관해 직접 고치지 않고 별도 작업으로 분리(spawn_task로 플래그
  처리).

- 이름-값 불일치 토큰 전수조사 (2026-07-29): `bg-ink`/`text-ivory`/
  (이미 고친) `--font-bodoni`와 같은 클래스, `globals.css`의 모든
  색상·폰트 CSS 변수를 실제 정의값과 대조(HSL 변환까지 포함해 수치로
  확인). 지금 당장 리네임하지 않고 목록만 남김 — 실제 리네임 필요해질
  때 이 항목 참고.

  **확실한 불일치**:
  - `--color-ink`(`bg-ink` 등) = `#fcfcfa`, L=98.4% — 이름은 검정/잉크
    색을 암시하지만 실제로는 거의 흰색. (이전에 이미 논의된 항목.)
  - `--color-ink-deep`(`bg-ink-deep` 등) = `#f2f1ec`, L=93.7% —
    "ink-deep"이면 ink보다 더 짙어야 하는데 마찬가지로 거의 흰색(ink
    대비 살짝만 더 어두움). **이번에 새로 발견.**
  - `--color-ivory`(`text-ivory` 등) = `#1a1a1a`, L=10.2% — 이름은
    아이보리(크림색)를 암시하지만 실제로는 거의 검정. (이전에 이미
    논의된 항목.)

  **약한/애매한 불일치**(참고용, 확신도 낮음):
  - `--color-sage`(`text-sage`/`bg-sage`/`border-sage`) = `#5b7a3e`,
    H=91°(녹색) S=32.6% L=36.1% — 일반적으로 "세이지 그린"은 채도가
    낮고 밝은 회녹색을 가리키는데, 실제 값은 그보다 진하고 채도 높은
    "올리브/모스" 그린에 가까움. 이번 세션 중 두 차례 밝게 조정한
    결과로 원래(다크테마 시절 `#6e7a5e`) 색상보다 세이지다움에서 더
    멀어졌을 가능성. ink/ivory만큼 명백하진 않아 "약한" 불일치로 분류.

  **확인했지만 문제없음**(참고용):
  - `--color-grey-muted` = `#6e6b62`(S=5.8%, 저채도 회색) — 이름대로
    실제로 무채색에 가까운 톤, 일치.
  - `--color-hairline` = `#e4e2da` — "hairline"은 색상명이 아니라
    용도명(얇은 구분선)이라 애초에 색 불일치 대상이 아님, 실제 용도도
    전부 1px 보더로만 쓰임, 일치.
  - `--color-brass` = `#8f6a1e`(H=40° S=65.3%, 진한 금갈색) — 황동색
    범주로 합리적, 불일치 아님.
  - `--color-on-photo` = `#f5f1e8` — "on-photo"도 색상명이 아니라
    용도명(사진 위에 얹는 텍스트는 테마 무관하게 항상 밝아야 한다는
    규칙, 코드 주석에 명시됨), 값 자체도 그 용도에 맞게 항상 밝음,
    불일치 아님. **참고**: 공교롭게도 이 토큰의 실제 값이 사람들이
    "ivory"라는 이름에서 기대할 법한 바로 그 톤(옅은 크림색)임 —
    나중에 `--color-ivory`를 리네임할 때 이름 후보나 혼동 방지 참고로
    남겨둠.
  - 폰트 토큰(`--font-sans`, `--font-heading`, `--font-display`,
    `--font-display-bold`) — 전부 이름이 시사하는 폰트 성격(산세리프/
    헤딩용/디스플레이 세리프)과 실제 로드되는 폰트가 일치. `--font-
    display`/`--font-display-bold`는 이번 세션 초반에 이미
    `--font-bodoni`(-bold)에서 `--font-display-serif`(-bold)로
    리네임 완료.

- Projects·Contact 상단도입부 — sr-only h1 + 서브타이틀 + 상단본문 패턴
  편입 (2026-07-29): 지금까지 두 페이지만 `PageHeader`(항상 보이는
  큰 `text-h1` 제목 + 회색 서브타이틀 2단 구성)를 쓰고 있었음 —
  About/Performances/Media/Dialogue와 다른 별도 패턴. 이번에 통일: 두
  페이지 다 `sr-only <h1>{title}</h1>` + 보이는 `PageSubtitle`(제목
  단어 자체, 회색 36px) + `PageHeaderStatement`(부제 문구, sage
  이탤릭)로 교체. `PageHeader` 컴포넌트는 이 두 곳이 유일한 사용처였고
  둘 다 마이그레이션되면서 완전히 미사용이 돼 `src/components/
  PageHeader.tsx` 자체를 삭제함(grep으로 다른 참조 없음 확인).

  **git log 조사 — Projects가 예전에 Dialogue와 함께 상단도입부 교체
  요청을 받았는데 왜 반영이 안 됐는지**: 커밋 `7c738c3`(Dialogue 헤더
  교체 — sr-only h1 + headerStatement)의 커밋 메시지와 diff를 확인한
  결과 Dialogue 페이지 파일만 수정했고 Projects는 전혀 건드리지
  않았음. `src/app/[locale]/projects/page.tsx`의 전체 커밋 이력
  (`git log --oneline -- .../projects/page.tsx`)에도 헤더/상단도입부
  교체 커밋이 단 한 번도 없었음 — 갤러리 추가, 링크 추가, 이미지 간격
  조정, PageHeader eyebrow 제거, 타이포 통일 커밋뿐. 그 라운드에서
  Dialogue와 같은 메시지에 같이 왔던 "Projects" 프롬프트는 실제로는
  헤더 교체가 아니라 **완전히 다른 내용**(PLZ/DMZ OPEN/Music for One
  "Visit Website" 링크 추가)이었음 — `docs/TODO.md`의 "Projects 페이지
  — 홈페이지 링크 3건" 항목(이 파일 174번째 줄 부근)이 바로 그 커밋의
  기록. 즉 "반영했다가 나중에 되돌아간" 게 아니라, 애초에 그 라운드의
  Projects 프롬프트 자체가 헤더 교체를 요청한 적이 없었음(사용자가
  같은 메시지에 두 개의 다른 페이지에 대한 다른 종류의 작업을 함께
  보내서 생긴 착각으로 보임). 다른 페이지(About/Performances/Media)는
  전부 헤더 교체가 요청된 라운드에 실제로 반영됐음 — 이런 종류의 누락은
  Projects/Contact(둘 다 이번에 처리)를 제외하면 더 없는 것으로 확인.

- 사이트 전역 섹션 간격 통일 (2026-07-29): 7개 페이지의 상단도입부↔
  본문(A), 섹션↔섹션(B) 간격이 페이지마다 제각각이었음(About/Home류
  "이중 패딩 인접 섹션" 패턴은 ~224px, Performances/Dialogue/Projects류
  "space-y-20 래퍼" 패턴은 ~80-105px). 실측(leaf 요소 기준 DOM 측정,
  단순 padding 값이 아니라 실제 렌더링된 텍스트 경계 기준) 후 제안값을
  먼저 보여주고 승인받은 뒤 적용:
  - B = 224px(`py-28`, 즉 한쪽 112px) — About의 기존 값을 전역 기준으로
    채택. A = B와 동일(224px).
  - 모바일 `py-14 md:py-28`(56px→112px) — 기존 Home 히어로 타이틀의
    `pt-10 md:pt-16` 반응형 축소 관행과 일치.
  - 중앙화: `src/components/Section.tsx`(본문 섹션 래퍼),
    `src/components/PageHeaderSection.tsx`(상단도입부 래퍼, `pt-16` +
    `border-b` 포함) 신설. 6개 페이지에 중복돼 있던 헤더 래퍼 코드를
    `PageHeaderSection`으로, 모든 본문 섹션을 `Section`으로 교체.
  - Performances/Dialogue/Projects: `space-y-20` 래퍼를 걷어내고 각
    섹션을 `<Section>`으로 개별 감싸 224px가 자연스럽게 나오게 함.
  - About/Home: 이미 224px 근처였으므로 `<Section>`으로 갈아끼우되
    시각적 변화 최소화. Home 히어로→인트로는 사진 자체가 이미 강한
    시각적 구분선이라는 판단하에 단일 `py-28`만 유지(두 배로 안 늘림,
    사용자 승인). Home의 PLZ 전면 사진 섹션(`bg-ink-deep` 풀블리드,
    `Image fill`)은 구조가 완전히 다른 커스텀 섹션이라 판단, `Section`
    으로 바꾸지 않고 그대로 둠 — 이건 내 판단이고 명시적으로 논의된
    바는 아님. Home CTA 섹션은 원래 `py-32`(다른 곳들의 `py-28`과
    다른 outlier)였는데, "전역 통일"이라는 목표에 예외를 두지 않고
    `<Section>`(=`py-28`)으로 통일함 — 이것도 명시적으로 논의되지
    않은 내 판단.
  - Media/Contact: 섹션이 하나뿐이라 B 해당 없음, A만 224px로 맞춤.
  - 검증: `tsc`/`eslint`/`next build` 통과. 7개 페이지 전부 데스크톱
    (1280px)·모바일(375px) 폭에서 leaf 기준 DOM 측정 + 스크린샷으로
    확인. 데스크톱 스크린샷 도구가 스크롤 후 캡처 시 간헐적으로
    빈 화면을 반환하는 문제가 있어(이전에도 발견된 known issue) 대부분
    스크롤 위치는 DOM 측정으로, 시각 확인은 모바일 스크린샷 위주로
    진행. 실측 결과 전 페이지 데스크톱 A/B 값이 224-226px 범위로
    수렴(Home 249px, Performances 249px, Dialogue 241px 등 일부는
    Placeholder 박스 패딩이나 `border-b pb-6` 같은 실제 콘텐츠 때문에
    조금 더 큼 — 버그 아님). About 상단도입부(262px)는 이탤릭 인용구의
    line-height 때문에 이전부터 있던 초과분으로, 이번 리팩터로 새로
    생긴 게 아님. Performances/Dialogue/Projects는 간격이 3배 가까이
    늘었지만 실제로 스크린샷 확인 결과 허전하거나 헐거워 보이지
    않았음 — 오히려 여유 있고 자연스러운 느낌.

- 간격 구조 수정 — padding 이중 합산 제거 (2026-07-29): 바로 위 항목에서
  적용한 224px 기준이 사실 `<Section>` 자체 padding(112px)과 인접
  Section의 padding(112px)이 맞닿아 합산된 결과였고, 사용자가 의도한
  건 "섹션 사이 실제 간격이 항상 정확히 112px 한 번"이라는 걸 확인 —
  구조를 다음과 같이 수정:
  - `<Section>`에서 자체 `py-14 md:py-28`를 완전히 제거, 좌우
    padding(`px-6`)과 `mx-auto max-w-3xl`만 유지.
  - 형제 `<Section>`들을 감싸는 부모에 `space-y-14 md:space-y-28`
    적용해서 섹션 사이에 정확히 56/112px 한 번만 생기게 함
    (Performances/Dialogue/Projects/About/Home 전부 이 패턴으로 통일).
  - 상단도입부↔본문(A) 간격: `<PageHeaderSection>`은 손대지 않고
    그대로 둠 — `<Section>`이 더 이상 자기 padding을 안 가지므로
    header의 기존 `py-14 md:py-28`(border 앞의 여백)가 유일한 기여자가
    되어 자동으로 단일 56/112px이 됨. 별도로 `mb`/`mt` 조정 불필요.
  - Home: 히어로→인트로 간격은 히어로 자체가 padding이 없으므로,
    본문 섹션들을 감싸는 wrapper에 `pt-14 md:pt-28`를 별도로 추가해서
    단일 112px 유지. PLZ 전면 사진 섹션은 여전히 `<Section>`이 아닌
    커스텀 `<section>`이지만, 다른 본문 섹션들과 같은 `space-y-14
    md:space-y-28` wrapper 안의 형제로 둬서 앞뒤로 자동으로 112px씩
    생기게 함(자체 padding은 그대로 0, "커스텀 여백 그대로" 유지) —
    이건 명시적으로 논의되지 않았지만 가장 단순하고 일관된 방법이라
    판단해 이렇게 처리.
  - **부수 효과(명시적으로 논의되지 않음, 사용자에게 보고 필요)**:
    각 페이지 마지막 섹션이 더 이상 자기 bottom padding을 안 가지므로,
    마지막 섹션↔Footer 사이 간격이 Footer 자체의 `mt-24`(96px)만
    남고 이전보다 줄어듦(224px 시스템 때는 섹션의 pb-28(112)+footer의
    mt-24(96)=208px였음). 사용자가 이번 요청에서 Footer 경계는 언급하지
    않았고, 리터럴하게 지시대로 구현하면 자연스럽게 발생하는 결과라
    그대로 두고 이 사실만 투명하게 보고함 — 필요하면 별도로 조정 가능.
  - 검증: `tsc`/`eslint`/`next build` 통과. 7개 페이지 전부 데스크톱
    (1280px)·모바일(375px)에서 `main section` 전수 조회 + leaf 기준
    DOM 측정으로 재검증, EN/KO 스크린샷 확인. 224px로 남아있는 곳
    없음을 확인 — 전부 56/112px 근처로 수렴(Placeholder 박스 패딩,
    `border-b pb-6`, 이탤릭 인용구 line-height 등 실제 콘텐츠로 인한
    자연스러운 소폭 초과만 있고 이중 합산 흔적은 없음).

- 상단도입부↔본문 경계 — 구분선 위치 재분배 (2026-07-29): 사용자가
  Performances에서 이탤릭 진술문 다음 가로 구분선(`border-b`)이 여백
  끝자락에 붙어있어서, 구분선 아래("Selected Engagements" 제목까지)가
  거의 0px로 보인다고 제보. 실측으로 확인: `PageHeaderSection`의
  `border-b`는 헤더 안쪽 div 자체의 아래쪽 테두리라서, div의
  `padding-bottom`(당시 `pb-14 md:pb-28`, 56/112px)이 전부 "구분선
  위" 쪽에만 쓰이고, `<Section>`은 이제 자기 padding이 없으므로
  "구분선 아래" 쪽은 0px였음(Performances 실측: 위 113px / 아래 0px).
  수정:
  - `PageHeaderSection`의 안쪽 div `padding-bottom`을 절반으로 줄임
    (`pb-14 md:pb-28` → `pb-7 md:pb-14`, 56/112px → 28/56px).
    `padding-top`(pt-14 md:pt-28, nav 여백 다음 제목까지 간격)은
    이 문제와 무관해서 그대로 둠.
  - 나머지 절반을 각 페이지의 **첫 번째** `<Section>`에만
    `pt-7 md:pt-14`(28/56px)로 개별 추가 — `<Section>` 컴포넌트 자체나
    `space-y-14 md:space-y-28` 래퍼는 건드리지 않아서, 지난번 "모든
    Section에 padding을 주면 이중합산" 문제가 재발하지 않음. 대상:
    About(사진 그리드 Section), Performances(Engagements Section),
    Media(유일한 Section), Dialogue(Essays Section), Projects(3개
    프로젝트 카드 중 `i === 0`인 첫 번째만, `.map`에 index 추가),
    Contact(유일한 Section). Home은 이 헤더 구조 자체를 안 써서
    (히어로 구조) 해당 없음, 그대로 둠.
  - 검증(구분선 위/아래 개별 측정): Performances 57/56(데스크톱)
    29/28(모바일), Media 59/56 · 31/28, Dialogue 57/56 · 29/28,
    Projects 57/56 · 29/28, Contact 57/56 · 29/28 — 전부 거의 정확히
    균등 분배(목표 56/56, 28/28). About만 예외: 94/56(데스크톱)
    84/28(모바일)로 "구분선 위" 쪽이 더 큼 — 이건 이 수정과 무관하게
    이전부터 있던 이탤릭 인용구의 line-height 초과분(문단 텍스트의
    실제 렌더링 하단 경계가 CSS 라인하이트보다 아래로 벌어지는 폰트
    렌더링 특성)이 "구분선 위" 쪽 padding에 얹혀서 생기는 현상이고,
    총합(150 데스크톱/112 모바일)은 이번 수정 전후로 동일 — 새로
    생긴 문제가 아니라 기존에 알려진 현상이 이번에 어느 쪽에
    귀속되는지가 바뀐 것뿐. B(섹션 간) 간격은 전부 재측정해서 이번
    수정으로 영향받지 않았음을 확인(예: About 112/112,
    Dialogue 129, Projects 58×3 등 직전 커밋과 동일).
  - `tsc`/`eslint`/`next build` 통과. 데스크톱(1280px)·모바일(375px)
    양쪽에서 구분선 주변 스크린샷으로 위/아래 여백이 시각적으로도
    균등해 보이는지 확인(About 제외, 이유 상술), EN/KO 확인.

- Media > Gallery 신규 20장 추가 (2026-07-29): 사용자가 제공한 20개
  ImageKit URL을 `public/images/gallery/`에 다운로드해 추가(기존 2장
  + 신규 20장 = 22장). 캡션은 파일명 추정치이며, 아티스트 확인 후
  정확한 장소·맥락으로 교체 필요.

  **중복 관련 안내와 실제 결과 불일치**: 사용자는 "The World
  Competition 020.jpg" URL이 목록에 정확히 두 번 나오니 하나만
  처리해달라고 했으나, 실제 제공된 20개 URL을 전수 비교(각 URL의
  `updatedAt` 쿼리 파라미터까지 포함해 정확히 일치하는지 확인)한 결과
  완전히 서로 다른 20개 URL이었고 그 파일도 목록에 단 한 번만
  등장함 — 실제 중복은 없었음. 이 사실을 먼저 사용자에게 알린 뒤 20개
  전부를 갤러리에 추가했음("기존 2장 + 신규 19장 = 21장"이라고
  예상했던 것과 달리 실제로는 22장이 됨). 사용자가 특정 사진을
  제외하고 싶다면 추후 안내 필요.

  **이미지 처리**: 다운로드 시 ImageKit CDN이 "25.0 MP 초과"
  오류(`ik-error: ELIMIT`)를 반환하는 원본이 5개 있었음 — 원본을 직접
  받는 대신 ImageKit의 URL 변환 파라미터(`tr=w-2200,h-2200,c-at_max,
  q-85`)를 붙여 CDN이 서버 사이드에서 긴 변 2200px 이내로 리사이즈 +
  품질 85로 재인코딩한 버전을 바로 받는 방식으로 해결 — 로컬에서 다시
  리사이즈할 필요 없이 한 번의 요청으로 목표 규격을 만족. `c-at_max`
  옵션은 원본이 목표보다 작을 때 업스케일하지 않는 것을 실측으로
  확인(2000×1333 원본 파일에 2200 바운딩 박스를 걸어도 그대로
  2000×1333 유지됨). 1500px 미만인 2개 파일(1280×960)은 이 변환을
  아예 적용하지 않고 원본을 그대로 복사 — 바이트 단위로 원본과
  동일함을 `diff`로 확인.

  **작업 중 발견한 도구 버그(다음에 유사 스크립트 작성 시 주의)**:
  이 환경의 기본 셸이 zsh인데, zsh 배열은 1-indexed(bash는
  0-indexed)라서 `${NAMES[$((i-1))]}`처럼 bash식으로 -1 오프셋을 준
  코드가 실제로는 모든 파일명을 한 칸씩 밀어서 매핑하는 심각한
  버그를 냈음(예: URL #2의 실제 내용이 URL #1을 위해 지어둔 파일명으로
  저장됨). 다운로드 직후 파일 크기 목록에서 이상한 점을 못 느꼈지만,
  최종 이미지들을 실제로 열어 파일명과 사진 내용이 맞는지 육안
  확인하는 과정에서 발견 — 전량 삭제 후 `${NAMES[$i]}`(zsh
  1-indexed에 맞춘 정상 인덱싱)로 재다운로드해 바로잡음. zsh에서
  bash 스타일 배열 인덱싱 코드를 그대로 쓰면 안 된다는 교훈.

  **검증**: `tsc`/`eslint`/`next build` 통과. Lightbox/MediaTabs
  코드에 이미지 개수 관련 하드코딩(`images.length` 외 매직 넘버)이
  없음을 grep으로 먼저 확인 — 코드 변경 없이도 22장 규모에서 정상
  동작할 것으로 예상했고, 실제로 그레이드(2열 grid, 22개 항목)·
  라이트박스 첫 장(1/22, Previous 버튼 없음)·마지막 장(22/22, Next
  버튼 없음, 올바른 캡션)을 데스크톱·375px 모바일 양쪽에서 실측
  확인. KO 로케일은 Gallery 실제 콘텐츠가 `isEn` 조건부라 기존
  Video/Press 탭과 동일하게 플레이스홀더("콘텐츠 준비 중")를
  보여주는 게 정상 동작이며, 실제로 그렇게 렌더링됨을 확인 —
  버그 아님.

- Gallery 중복 사진 제거 + 그리드 4열 변경 (2026-07-29): 육안 비교 결과
  기존 `dmz_dome_beach.jpg`/`jeil_church_cheorwon.jpg`(이전 라운드
  원본, 캡션 부실)가 이번 라운드에 새로 추가한
  `goseong_hwajinpo_beach_2020.jpg`/`artistic_director_jeil_church_
  cheorwon_2020.jpg`(같은 사진, 캡션 있음)와 동일한 사진임을 확인 —
  `jeil_church_cheorwon.jpg`는 새 버전과 픽셀 크기(2000×1333)까지
  똑같았음. `galleryImages` 배열에서 옛 2개 항목만 제거(새 캡션 버전
  유지), grep으로 다른 곳(Press/Home/About 등)에서 참조 없음을 확인한
  뒤 `public/images/gallery/`에서 파일도 삭제 — 22장 → 20장(원래 URL
  목록 20개와 일치).

  그리드는 2열→4열로 변경(`sm:grid-cols-2` → `grid-cols-2
  sm:grid-cols-4`), 모바일은 기존과 동일하게 2열 유지 — 사실은 이전
  코드가 모바일에서 1열(`sm` 미만에 `grid-cols-*` 지정 없음)이었지만,
  사용자가 "지금의 2열"이라고 표현한 의도(모바일은 더 적은 열 유지,
  데스크톱만 늘림)에 맞춰 모바일을 명시적으로 2열로 설정 — 이 부분은
  사용자의 실제 인식과 코드 상태가 달랐던 점을 먼저 알리고 진행함.

  **캡션 줄바꿈 확인 결과**: 4열에서 각 칸 너비는 데스크톱 156px,
  모바일(2열) 147.5px로 비슷함. 가장 긴 캡션("Opening Concert,
  Geonbongsa Temple, Geumgangsan, Goseong, 2020")이 4줄로 줄바꿈됨 —
  `overflow`/`text-overflow`/`line-clamp` 등 잘림 처리가 전혀 없어서
  텍스트가 잘리거나 겹치는 문제는 없음(정상적으로 전부 줄바꿈되어
  보임). 다만 사진(4:3 비율, 156px 폭이면 약 117px 높이) 대비 캡션
  텍스트 블록(4줄, 약 84px)이 상당히 크게 느껴지는 칸이 몇 개 있음 —
  깨지거나 잘리는 버그는 아니지만 시각적으로 무겁게 느껴질 수 있어
  참고로 남김(억지로 괜찮다고 하지 않음). 필요하면 긴 캡션을 줄이거나
  `line-clamp`를 추가하는 것도 옵션.

  **검증**: `tsc`/`eslint`/`next build` 통과. 데스크톱 1280px(4열,
  156px 칸)·모바일 375px(2열, 147.5px 칸) 양쪽에서 grid-template-
  columns 실측, 라이트박스 1/20(Previous 없음)·20/20(Next 없음, 캡션
  "Horogoru Fortress" 정상) 재확인. 데스크톱 스크린샷 도구가 스크롤
  후 캡처 시 이번에도 반복적으로 빈 화면을 반환해서(이전에도 여러 번
  확인된 known issue) 데스크톱 그리드 캡처는 DOM 실측(컬럼 너비·줄
  수·overflow 속성)으로 대체하고, 시각 확인은 신뢰도 높은 모바일
  스크린샷으로 진행 — 컬럼 폭이 데스크톱(156px)·모바일(147.5px)로
  거의 같아서 모바일 스크린샷이 데스크톱 줄바꿈 양상의 유효한 대리
  증거로 판단.

- 로고·파비콘 sage 원형 배지로 변경 (2026-07-29): 대비 먼저 계산 —
  sage(`#5b7a3e`) 배경에 순백(`#FFFFFF`) 텍스트는 4.886:1, 이 사이트의
  `--color-on-photo`(`#f5f1e8`, 사진 위 텍스트용 크림톤)는 4.334:1.
  로고는 큰 텍스트 기준(AA 3:1)이라 둘 다 통과하지만, 순백이 AA
  일반 텍스트(4.5:1)와 AAA 큰 텍스트(4.5:1)까지 추가로 통과하는 반면
  on-photo는 AA 큰 텍스트만 통과 — 순백을 채택.

  Nav 로고: `w-11 h-11 rounded-full bg-sage` 안에 `display-serif
  text-lg text-white`로 "IM" — `aria-label="Mijung IM"`은 `<Link>`에
  그대로 유지. 폰트는 Nav에서 실제 쓰는 것과 동일한 Merriweather
  700 Italic(Google Fonts CSS API에서 직접 ttf 다운로드해 PIL로
  렌더링, next/font/google이 로드하는 것과 동일 파일). 데스크톱·
  375px 모바일·EN/KO 전부 스크린샷으로 확인, 원 안에 깔끔하게
  들어맞고 가독성 좋음.

  **파비콘 — 16px에서 원형은 실패, 사각 배지로 전환**: 지시대로 원형
  배지를 512px 캔버스에서 폰트 크기 220~360까지 실측 테스트 후 실제
  16×16/32×32로 다운샘플링해서 개별 확인. 32px에서는 원형도 문제
  없었지만, 16px에서는 텍스트가 뚜렷한 "IM" 형태가 아니라 흐릿한
  흰색 얼룩으로 보임 — 기존(변경 전) 사각형 파비콘을 동일하게 16px로
  다운샘플링해 나란히 비교한 결과, 기존 버전이 원형 버전보다 명확히
  더 잘 읽힘. 폰트 크기를 최대(360, 원에 안 잘리는 한계 근처)까지
  키워봐도 유의미하게 나아지지 않아 — 원형 자체가 모서리 공간을
  버려서 같은 캔버스 대비 텍스트를 원형보다 사각형에서 더 크게 넣을
  수 있는 게 근본 원인.

  지시된 대로 무리해서 통과시키지 않고, 지시에 명시된 대안(원 없이
  sage 사각 배지)으로 전환해서 재검증 — 둥근 사각형(squircle, 모서리
  반경 캔버스의 18%)에 동일 폰트로 재시도한 결과 16px·32px 둘 다
  기존 파비콘과 동등하거나 더 나은 가독성으로 확인됨. 최종 채택:
  - `src/app/icon.png`(32×32, 브라우저 탭용): sage 배경의 둥근 사각
    배지(모서리만 투명), 흰색 IM — 기존 파비콘도 완전한 사각이
    아니라 미세하게 둥근 모서리였음을 픽셀 단위로 확인하고 그 관례를
    유지.
  - `src/app/apple-icon.png`(180×180): 기존 관례대로 모서리 둥글림
    없이 캔버스 전체를 sage로 꽉 채운 완전 불투명 정사각형(iOS가
    자체적으로 마스킹하므로 원본은 항상 각진 정사각형이어야 한다는
    기존 관례를 그대로 유지 — 기존 파일도 RGB, 투명도 없음, 모서리
    픽셀도 배경색과 동일함을 확인 후 따름).
  - 즉 Nav 로고는 요청대로 원형, 파비콘만 (요청에 명시된 대안대로)
    둥근 사각형으로 다르게 처리됨 — 둘 다 sage/흰색 팔레트는 동일.

  **검증**: `tsc`/`eslint`/`next build` 통과. Nav 로고 데스크톱·
  375px 모바일·EN/KO 스크린샷 확인, `aria-label` 유지 확인. 파비콘은
  최종 산출물을 실제 16×16/32×32 크기 그대로 다시 열어서 가독성
  재확인(둘 다 양호), apple-icon 180×180도 확인.

- Nav 로고 "IM" 확대 + 900 weight 적용 (2026-07-29): Google Fonts
  CSS API로 Merriweather 900 italic 존재 여부 확인 — 700 italic과는
  다른 URL(다른 정적 파일)로 실재함을 확인하고, `layout.tsx`의
  `merriweatherItalic` weight 배열에 `"900"`을 추가(`["700", "900"]`)
  해서 실제 로드. 브라우저에서 `document.fonts`로 재확인한 결과 900
  italic 전용 `@font-face`가 별도로 "loaded" 상태로 잡혀서, 가짜
  합성 굵기가 아니라 진짜 900 글리프임을 확인 — 700 유지로 폴백할
  필요 없이 900 그대로 적용.

  단, `.display-serif`(globals.css, `@layer` 밖의 순정 CSS 클래스)가
  이미 `font-weight: 700`을 못박아두고 있어서, 이 사이트가 계속
  지켜온 "unlayered 커스텀 클래스가 Tailwind 유틸리티보다 항상
  이긴다"는 캐스케이드 규칙 때문에 `font-black` 같은 Tailwind
  유틸리티로는 덮어쓸 수 없음 — 이 로고 하나만을 위해 전역 클래스를
  더 늘리기보다 인라인 `style={{ fontWeight: 900 }}`로 처리(인라인
  스타일은 이 클래스 캐스케이드 문제를 확실하게 우회).

  크기는 기존(18px) / +20%(21.6px) / +35%(24.3px) 세 가지를 실제
  스크린샷(뷰포트를 작게 줄여서 로고를 크게 확대해 비교)으로 검토한
  뒤 +35%(24.3px)를 채택 — "확실히 커 보이면서도 두 글자로 알아볼 수
  있는 수준"이라는 목표에 가장 부합. 실측 결과 이 크기에서도 텍스트
  너비(34.2px)가 원 지름(44px)보다 작아 실제로는 원 테두리에 잘리지
  않고 안쪽에 들어감 — "잘림 허용"은 활용되지 않았지만 그래도 시각적
  으로 원 가장자리에 바짝 붙어 이전보다 훨씬 크고 대담해 보임.

  **로고 적용 범위 관련 안내**: 사용자가 "데스크톱 Nav, 모바일 Nav,
  모바일 햄버거 드로어 로고"를 각각 별도로 언급했지만, 실제 코드에는
  로고가 `<header>` 안에 단 하나만 존재함 — `<header>`가
  `position: fixed`로 드로어(`<div className="md:hidden fixed
  inset-x-0 top-16...">`) 위에 항상 떠 있는 구조라, 드로어를 열어도
  같은 헤더의 같은 로고가 계속 보이는 것이고 드로어 안에 별도 로고
  인스턴스가 있는 게 아님. 실제로 햄버거 메뉴를 열어 스크린샷으로
  확인 — 드로어가 열려도 상단에 동일 로고가 그대로 유지됨. 즉 이번
  수정 하나로 사용자가 언급한 세 가지 컨텍스트가 전부 자동으로
  커버됨.

  **검증**: `tsc`/`eslint`/`next build` 통과. 데스크톱·375px 모바일
  (상단바 + 드로어 열린 상태)·EN/KO 스크린샷 확인, `aria-label`
  유지·computed `font-weight: 900`·`font-size: 24.3px` 확인. 파비콘
  (`icon.png`/`apple-icon.png`)은 지시대로 전혀 건드리지 않음(git
  status로 미변경 확인).

- 게시판형 5개 섹션 언어 게이팅 감사 및 통일 (2026-07-29): 콘텐츠는
  EN/KO 공용, 감싸는 UI만 언어별 분리라는 정책 기준으로 5개 섹션
  전수 감사.

  | 섹션 | 콘텐츠 소스 | 게이트 상태(감사 전) | 조치 |
  |---|---|---|---|
  | Home Latest News | `t("newsBody")` | 게이트 없음 — EN/KO 둘 다 "곧 게시 예정" 문구뿐(실제 뉴스 콘텐츠 자체가 아직 없음) | 조치 없음(정책 위반 아님, 콘텐츠 미작성 상태) |
  | Performances Selected Engagements | `data/engagements.ts`(plain) | 약한 게이트 — KO에서 동일 데이터를 Placeholder(점선 박스+"콘텐츠 준비 중")로 감쌈 | **수정**: isEn/Placeholder 제거, 무조건 렌더링 |
  | Performances Concert Archive | `data/concertArchive.ts`(plain) | 게이트 없음(이전 라운드 확인) | 재확인만, 변경 없음 |
  | Media YouTube | `t.raw("videoItems"/"talkItems")` | 강한 게이트(`isEn &&`) — **KO 번역 파일에 해당 키 자체가 없어서, 단순히 게이트만 지우면 즉시 런타임 에러**로 확인 | **수정**: 콘텐츠를 `src/data/videos.ts`(plain)로 이전 후 게이트 제거 |
  | Media Press | `data/pressArticles.ts` + `data/media.ts`(plain) | 강한 게이트(`isEn &&`) | **수정**: 게이트 제거 |
  | Media Gallery | `data/media.ts`(plain) | 강한 게이트(`isEn &&`, 지난 라운드부터 확인된 사항) | **수정**: 게이트 제거 |
  | Dialogue Essays | `data/dialogue.ts`(plain) | 게이트 없음(이전 라운드 확인) | 재확인만, 변경 없음 |
  | Dialogue Director's Letter | `data/dialogue.ts`(plain) | 게이트 없음(이전 라운드 확인) | 재확인만, 변경 없음 |
  | Projects Gallery(하단, 6장) | `data/projectGallery.ts`(plain), `ProjectGallery.tsx` | 게이트 없음 — 이미 정책 준수 | 조치 없음 |

  **Media YouTube 탭이 가장 까다로웠던 이유**: `videoItems`/
  `talkItems`(영상 제목·설명·embed URL)와 상위 그룹 라벨
  `videoGroups.performancesTitle`/`talksTitle`("Performances"/
  "Talks & Interviews")가 next-intl 번역 시스템(`content/en/
  common.json`) 안에만 있었고, `content/ko/common.json`의 `media`
  네임스페이스에는 `videoItems`/`talkItems`/`videoGroups`/
  `headerTitle`/`headerStatement` 키 자체가 통째로 없었음(실측
  확인). 이 상태에서 `isEn &&`만 지우면 KO에서 `t.raw("videoItems")`
  가 없는 키를 찾다가 즉시 에러가 남 — 이전 라운드에 실제로
  `t("projectSubtitle")` 같은 EN 전용 키를 KO에서 잘못 호출해 런타임
  에러가 났던 것과 같은 패턴. 표준 진행 규칙("ko/common.json은 명시적
  지시 없이 수정 금지, 고아 키는 TODO.md에 기록")을 지키면서 이 문제를
  풀기 위해, `videoItems`/`talkItems`를 갤러리·프레스·대화·공연
  데이터와 동일한 패턴(plain TS 데이터 파일, `src/data/videos.ts`
  신규 생성)으로 옮겨서 언어 무관 콘텐츠로 전환 — ko/common.json은
  전혀 건드리지 않음.

  `videoGroups.performancesTitle`/`talksTitle` 두 그룹 라벨은
  콘텐츠라기보다 "Essays"/"Artistic Director's Letter"처럼 섹션을
  나누는 라벨에 가까워서, 이미 이 코드베이스에 있는 선례(Dialogue의
  두 섹션 제목이 애초에 `t()`가 아니라 하드코딩된 영어 문자열임)를
  그대로 따라 "Performances"/"Talks & Interviews"를 하드코딩 —
  ko/common.json에 새 번역 키를 추가하지 않고도 안전하게 양쪽 언어에
  노출시킴.

  **오펀 처리(삭제 아님, 기록만)**: `MediaTabs.tsx`에서 최종 폴백
  분기(`isEn`이 전부 false일 때만 도달하던 `<Placeholder>{t(bodyKey)}
  </Placeholder>`)를 제거하면서, `media.videoBody`/`galleryBody`/
  `pressBody`/`videoGroups`/`videoItems`/`talkItems` 번역 키가
  코드에서 더 이상 참조되지 않게 됨(en/ko 둘 다 해당). JSON에서
  삭제하지는 않고 여기에 고아 상태만 기록. (참고: `home.videoBody`는
  Media 탭과 이름만 같을 뿐 별개의 Home "Featured Video" 섹션 키라
  계속 사용 중 — 혼동 주의.)

  **검증**: `tsc`/`eslint`/`next build` 통과. KO 페이지에서 실측 —
  Media 탭 전환 시 YouTube(Mozart/Chopin/DMZ 공연 + Talk/Interview
  4개), Press(NYT 사진 + 실제 언론 기사 5개, 전부 한국어 원문 제목),
  Gallery(20장 전부, 캡션 포함)가 Placeholder 없이 그대로 노출됨을
  `get_page_text`/DOM 카운트로 확인. Gallery 라이트박스는 데스크톱·
  375px 모바일 둘 다 KO 라벨("닫기"/"다음 이미지"/"1 / 20")로 정상
  동작, 첫 장은 이전 버튼 없음, 임의 중간 장(3/20)에서 이전·다음
  버튼 둘 다 있음을 확인. Performances Selected Engagements도 KO에서
  더 이상 점선 Placeholder 박스 없이 Concert Archive와 동일한 방식
  으로 노출됨을 확인. Dialogue(Essays·Letter)·Projects Gallery(6장)는
  기존처럼 KO에서 정상 노출 유지 재확인. Home Latest News는 EN/KO
  둘 다 여전히 "콘텐츠 준비 중" 상태 그대로(실제 콘텐츠가 없어
  변경하지 않음).

### 하드코딩 문자열 7건 → t() 키 전환, KO는 EN 임시값 (2026-07-29)

`docs/translation-source-en.md` 감사에서 발견한 하드코딩 7건을 모두
`t()` 호출로 전환하고 EN/KO `common.json` 양쪽에 정식 키를 추가함.
KO 값은 아직 번역이 없어 EN과 동일한 값을 임시로 넣음(자리만 잡아둠,
의미 변화 없음) — 사용자가 명시적으로 이번 건에 한해 KO
`common.json` 수정을 허용함(평소엔 명시 지시 없이 건드리지 않는 규칙).

전환 목록:
- About "The Artist" → `about.theArtistLabel` (about/page.tsx)
- About "Biography" → `about.biographyLabel` (about/page.tsx)
- Dialogue "Essays" → `dialogue.essaysTitle` (dialogue/page.tsx)
- Dialogue "Artistic Director's Letter" → `dialogue.directorLetterTitle`
  (dialogue/page.tsx) — `&rsquo;`는 JSON에 실제 어퍼스트로피(’)로 저장
- Projects "Visit Website" → `projects.visitWebsiteLabel`
  (projects/page.tsx) — 화살표 "→"는 기존 `home.projectLink` 선례처럼
  키 밖에 그대로 둠(`{t("visitWebsiteLabel")} →`)
- Media "Performances" 그룹 라벨 → `media.videoGroups.performancesTitle`
  (MediaTabs.tsx) — 위 항목(2026-07-29 이전 라운드)에서 하드코딩으로
  남겨뒀던 것을 이번에 다시 `t()`로 연결. EN 키는 이미 존재했음
  (당시엔 고아 키), 이번에 KO 쪽에 `media.videoGroups` 객체 자체가
  없던 것을 새로 추가
- Media "Talks & Interviews" 그룹 라벨 → `media.videoGroups.talksTitle`
  (MediaTabs.tsx) — 위와 동일한 방식

`media.videoGroups.*`를 제외한 나머지 5개 키는 EN/KO 둘 다 이번에
신규 추가. Projects "Visit Website"는 `project.final`(=`isEn`)이
true일 때만 렌더링되는 기존 구조라 KO 화면에는 애초에 노출되지
않음(변경 없음, 기존 동작 그대로) — 실측으로 확인.

**검증**: `tsc --noEmit`/`eslint`(수정 파일 4개)/`next build` 모두
통과. EN·KO 양쪽에서 About/Dialogue/Projects/Media 4개 페이지를
`get_page_text`로 실측 — 7곳 전부 변경 전과 동일하게 영문 그대로
노출됨을 확인(KO 값이 EN과 같으므로 시각적 변화 없음).

**남은 일**: 실제 한글 번역이 오면 `content/ko/common.json`의 해당
5개 신규 키(`about.theArtistLabel`/`biographyLabel`,
`dialogue.essaysTitle`/`directorLetterTitle`,
`projects.visitWebsiteLabel`) 값만 교체하면 됨. `media.videoGroups.*`
두 키는 코드 구조상 "Performances"/"Talks & Interviews"가 사실상
게시판형 섹션의 감싸는 UI 라벨이라 번역 여부는 추후 판단 필요.

### `docs/translation-ko-final-v2.md` 확정 번역 1차 반영 (2026-07-29)

**8번째 하드코딩 항목 추가 전환**: 지난 라운드에서 "7건"에 포함하지
않고 의도적으로 남겨뒀던 `MediaTabs.tsx:53`의 탭 목록 접근성 라벨
(`aria-label="Media category"`)을 이번 요청에서 명시적으로 포함시켜
`media.categoryLabel` 키로 전환. EN `common.json`에 신규 추가(`"Media
category"`), KO에는 확정 번역("미디어 카테고리")을 바로 채워 넣음(이번
항목은 임시 EN 자리표시자 단계 없이 곧장 최종 번역으로 추가).

**KO 번역 반영**: `translation-ko-final-v2.md`에 정리된 확정 번역을
`content/ko/common.json`에 채워 넣음 — `footer.rights`, `home.
statementHeadline`/`statementTagline`/`projectImageCaption`(3개 다
KO에 없던 신규 키), `about.quoteText`/`quoteAttribution`(신규 키)
및 `theArtistLabel`/`biographyLabel`(지난 라운드의 EN 임시값을 실제
번역으로 교체), `about.bioMedium`(전체 교체, 기존 자리표시자 문단
삭제), `performances.headerStatement`(신규), `media.headerTitle`/
`headerStatement`(신규) 및 `videoGroups.performancesTitle`/
`talksTitle`(임시값 → 실제 번역), `dialogue.headerStatement`(신규)
및 `essaysTitle`/`directorLetterTitle`(임시값 → 실제 번역),
`projects.plzBody`/`dmzBody`/`foundationBody`(전체 교체) 및
`plzImageCaption`(신규), `projects.visitWebsiteLabel`(임시값 → 실제
번역).

**코드 변경은 명시적으로 요청된 2건으로만 한정**:
1. `MediaTabs.tsx` 탭 목록 `aria-label`을 `{t("categoryLabel")}`로 전환.
2. `page.tsx`(Home) PLZ 배너 이미지 alt — 기존 `isEn ? t("projectImageCaption")
   : "Piano performance inside a transparent dome..."`(KO 분기 영문
   하드코딩 fallback)을 `{t("projectImageCaption")}` 단일 호출로 교체.
   EN/KO 둘 다 이제 같은 키를 통해 각자의 언어로 alt 텍스트를 받음
   (EN 값은 기존과 동일해 시각적 변화 없음, KO는 새 번역 alt로 교체).

**의도적으로 건드리지 않은 부분(판단 보류, 사용자 확인 필요)**: 사용자
요청 항목 2는 "JSON 값을 채워달라"는 요청이었고, 항목 1·3에서만
명시적으로 코드 변경을 요청함. 그래서 아래 기존 `isEn`/`Placeholder`
게이트는 이번에 건드리지 않음 — 즉 방금 채운 번역 중 일부는 코드에
아직 연결되지 않아 KO 화면에 보이지 않음:
- About 상단 인용구(`quoteText`/`quoteAttribution`) — `about/page.tsx`의
  `{isEn && (...)}` 블록이 그대로라 KO에서는 여전히 렌더링 안 됨.
- Performances/Media/Dialogue 상단본문(`headerStatement`, Media는
  `headerTitle`도) — 각 페이지의 `isEn ? headerStatement 문단 : 짧은
  subtitle` 삼항연산자가 그대로라 KO는 여전히 기존 subtitle만 노출.
- Home `statementHeadline`/`statementTagline` — `{isEn && (...)}` 블록
  그대로라 KO에서는 여전히 안 보임.
- About bioMedium / Projects 3개 카드 본문(`plzBody`/`dmzBody`/
  `foundationBody`) — 이 두 곳은 완전히 숨겨진 게 아니라 `Placeholder`
  컴포넌트로 감싸져 있어(점선 박스 + "콘텐츠 준비 중" 라벨), 새 번역
  텍스트 자체는 KO 화면에 그대로 노출됨 — 다만 이미 완성된 최종
  번역 위에 "준비 중" 라벨이 함께 뜨는 상태로 남아 있음.
- Projects "홈페이지 방문" 버튼 — `project.final`(=`isEn`) 조건에
  묶여 있어 KO에서는 버튼 자체가 렌더링되지 않음(지난 라운드부터
  동일, 이번에도 변경 없음).

이 게이트들을 해제할지는 사용자에게 별도 확인 필요 — TODO.md 44행의
로드맵 메모("3단계 한글 1차 번역 투입 시 isEn 게이트 일괄 해제 예정")
상으로는 이번이 그 3단계에 해당하지만, 이번 요청은 정확히 JSON 값
채우기와 지정된 2건의 코드 변경으로만 범위를 한정했기 때문에 게이트
해제는 임의로 진행하지 않음.

**검증**: `tsc --noEmit`/`eslint`(수정 파일 전체)/`next build` 모두
통과. EN 7개 페이지를 `get_page_text`/DOM(`img[alt]`, tablist
`aria-label`)로 실측 — 이번 변경으로 전혀 달라지지 않았음을 확인.
KO 7개 페이지(Home/About/Performances/Media/Dialogue/Projects/
Contact) 전부 `get_page_text`로 실측, About·Media·Projects는 데스크톱
(About) 및 375px 모바일(About/Projects/Media) 스크린샷으로도 확인.
About 바이오 전체 4문단, Projects 카드 3개 설명, Dialogue 두 섹션
제목, Media 그룹 라벨 2건 및 탭 접근성 라벨, Footer 저작권 문구가
모두 새 번역대로 정확히 노출되고 missing-key 에러(원문 키 이름이
그대로 문자열로 출력되는 현상)가 전혀 없음을 확인. Home PLZ 배너
alt가 EN에서는 기존과 동일한 영문 그대로, KO에서는 새 한국어 번역으로
바뀐 것을 `img[alt]` DOM 조회로 확인.
