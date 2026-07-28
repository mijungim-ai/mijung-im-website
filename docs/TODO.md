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
