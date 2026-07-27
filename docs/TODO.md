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
