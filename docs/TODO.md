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
