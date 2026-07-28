export type PressArticle = {
  title: string;
  url: string;
};

// Bulletin-style list below the featured NYT photo. Display order =
// publish date, newest first (verified against each article's actual
// publish date; see docs/TODO.md). Add new articles at the top.
export const pressArticles: PressArticle[] = [
  {
    title:
      '[Culture Interview] 임미정 2023 DMZ오픈국제음악제 예술감독(피아니스트) "다시는 전쟁 일어나지 않기 바라는 염원, 음악제에 담고 싶었다" — 서울문화투데이',
    url: "http://www.sctoday.co.kr/news/articleView.html?idxno=41826",
  },
  {
    title: "평화와 공존은 국적과 이념을 초월한다 — 객석",
    url: "https://auditorium.kr/2023/10/평화와-공존은-국적과-이념을-초월한다-dmz-오픈-국제음/",
  },
  {
    title: '"바람이 음악을 실어 분계선 너머로 보내주었으면" PLZ 순회 연주회 — 경향신문',
    url: "https://www.khan.co.kr/article/202109151115001",
  },
  {
    title:
      "[Interview人 근황] 임미정 피아니스트가 이끄는 'PLZ페스티벌'...9월 강원도 일대서 펼쳐져 — 인터뷰365",
    url: "https://www.interview365.com/news/articleView.html?idxno=99041",
  },
  {
    title: "[PRESS] 따뜻한 손끝에서 만난 위로의 순간: 임미정 피아노 독주회 — 아트인사이트",
    url: "https://www.artinsight.co.kr/news/view.php?no=53013",
  },
];
