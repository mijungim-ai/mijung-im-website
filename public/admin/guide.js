// "사용 가이드" modal + button for the Decap CMS admin screen.
//
// Decap CMS has no extension point for adding persistent UI to its own
// chrome — its public API (registerPreviewStyle/Template, registerWidget,
// registerEditorComponent, registerRemarkPlugin, registerWidgetValueSerializer,
// registerBackend, registerMediaLibrary, registerLocale, registerEventListener,
// registerCustomFormat — confirmed exhaustively against the actual unpkg-
// served bundle) only covers the entry editor and its preview pane, never
// the surrounding app shell. So this is plain DOM manipulation instead.
//
// Safe to append straight to document.body: Decap's own React app mounts
// into a single <div id="nc-root">, not onto document.body itself — this
// script's elements sit as body-level SIBLINGS of #nc-root, a region
// React's reconciler never touches. (Never insert anything *inside*
// #nc-root — React would tear it back out on its next render.)
//
// registerPreviewStyle's CSS only reaches the preview iframe, not this
// top-level document, so the modal/button below carry their own inline
// styles rather than reusing the site's Tailwind classes.
(function () {
  var GUIDE_SEEN_KEY = "mijungAdminGuideSeen";
  var loginHandled = false;

  var SAGE = "#4a2e6d";
  var INK = "#1a1a1a";
  var CREAM = "#fcfcfa";
  var HAIRLINE = "#e4e2da";

  var SECTIONS = [
    {
      heading: "글 작성과 저장",
      body:
        "저장(Publish) 버튼을 누르면 곧바로 실제 사이트에 반영됩니다. 별도의 검토 단계 없이 바로 공개되니, 저장 전에 미리보기(화면 오른쪽)로 한 번 더 확인해주세요.",
    },
    {
      heading: "글 순서 (Display Order)",
      body:
        "새 글을 쓰면 Display Order가 자동으로 채워지고, 가장 최근 글이 맨 위에 표시됩니다. 특정 위치에 끼워 넣고 싶다면, 글 목록에서 앞뒤 글 제목 옆에 표시된 숫자(예: #1735...)를 확인하고 그 두 숫자 사이의 값을 입력하면 그 자리에 들어갑니다.",
    },
    {
      heading: "이미지",
      body: "이미지가 있는 글은 두 군데서 다르게 보입니다.",
      list: [
        "관리자 화면(글쓰기 중 오른쪽 미리보기): 참고하기 좋은 크기로 축소되어 보입니다.",
        "실제 방문자가 보는 화면: 작은 썸네일로 보이다가, 클릭하면 원본 크기로 확대해서 볼 수 있습니다.",
      ],
    },
    {
      heading: "선택 입력 필드 (Optional)",
      body:
        "필드 이름 옆에 '(Optional)'이라고 적힌 건 꼭 채우지 않아도 되는 항목입니다. 비워두면 그 부분은 화면에 표시되지 않습니다.",
    },
    {
      heading: "에세이 게시판",
      body:
        "에세이는 제목만 필수이고, 본문(직접 글쓰기)이나 링크(외부 글 연결) 중 하나만 채우면 됩니다. 둘 다 채울 필요는 없습니다.",
    },
  ];

  function el(tag, styles, attrs) {
    var node = document.createElement(tag);
    if (styles) node.style.cssText = styles;
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    return node;
  }

  function buildModal() {
    var overlay = el(
      "div",
      "display:none;position:fixed;inset:0;z-index:999999;" +
        "background:rgba(0,0,0,0.5);align-items:center;justify-content:center;" +
        "padding:24px;font-family:-apple-system,'Segoe UI',Roboto,sans-serif;",
    );
    overlay.id = "mijung-guide-overlay";

    var card = el(
      "div",
      "background:" +
        CREAM +
        ";color:" +
        INK +
        ";max-width:560px;width:100%;max-height:85vh;overflow-y:auto;" +
        "padding:32px;box-shadow:0 8px 32px rgba(0,0,0,0.25);",
    );
    card.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    var title = el(
      "h2",
      "font-size:22px;font-weight:700;margin:0 0 24px;color:" + INK + ";",
      { text: "관리자 페이지 사용 가이드" },
    );
    card.appendChild(title);

    SECTIONS.forEach(function (section, i) {
      var wrap = el(
        "div",
        "margin-bottom:" + (i === SECTIONS.length - 1 ? "0" : "20px") + ";",
      );
      var h = el(
        "h3",
        "font-size:13px;font-weight:700;letter-spacing:0.03em;text-transform:uppercase;" +
          "color:" +
          SAGE +
          ";margin:0 0 8px;",
        { text: section.heading },
      );
      wrap.appendChild(h);

      var p = el("p", "font-size:15px;line-height:1.6;margin:0;color:" + INK + ";", {
        text: section.body,
      });
      wrap.appendChild(p);

      if (section.list) {
        var ul = el("ul", "margin:8px 0 0;padding-left:20px;");
        section.list.forEach(function (item) {
          var li = el(
            "li",
            "font-size:15px;line-height:1.6;margin-top:4px;color:" + INK + ";",
            { text: item },
          );
          ul.appendChild(li);
        });
        wrap.appendChild(ul);
      }

      card.appendChild(wrap);
    });

    var closeBtn = el(
      "button",
      "margin-top:28px;display:block;width:100%;padding:12px 24px;" +
        "background:" +
        SAGE +
        ";color:" +
        CREAM +
        ";border:1px solid " +
        SAGE +
        ";font-size:13px;font-weight:600;letter-spacing:0.05em;" +
        "text-transform:uppercase;cursor:pointer;",
      { type: "button", text: "확인했습니다" },
    );
    closeBtn.addEventListener("mouseenter", function () {
      closeBtn.style.background = CREAM;
      closeBtn.style.color = SAGE;
    });
    closeBtn.addEventListener("mouseleave", function () {
      closeBtn.style.background = SAGE;
      closeBtn.style.color = CREAM;
    });
    closeBtn.addEventListener("click", hideModal);
    card.appendChild(closeBtn);

    overlay.appendChild(card);
    overlay.addEventListener("click", hideModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.style.display !== "none") hideModal();
    });

    document.body.appendChild(overlay);
    return overlay;
  }

  function buildOpenButton() {
    var btn = el(
      "button",
      "display:none;position:fixed;bottom:20px;right:20px;z-index:999998;" +
        "padding:10px 18px;background:" +
        SAGE +
        ";color:" +
        CREAM +
        ";border:1px solid " +
        SAGE +
        ";font-family:-apple-system,'Segoe UI',Roboto,sans-serif;" +
        "font-size:13px;font-weight:600;letter-spacing:0.05em;" +
        "cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.2);",
      { type: "button", text: "사용 가이드" },
    );
    btn.id = "mijung-guide-open-button";
    btn.addEventListener("click", showModal);
    document.body.appendChild(btn);
    return btn;
  }

  var modalEl = buildModal();
  var buttonEl = buildOpenButton();

  function showModal() {
    modalEl.style.display = "flex";
  }
  function hideModal() {
    modalEl.style.display = "none";
  }

  // Heuristic for "is this still the login screen": Decap's own "Login"
  // button text is far less likely to change across versions than any
  // CSS-in-JS class name (confirmed those are runtime-hashed, e.g.
  // "css-no93ty-StyledAuthenticationPage", by inspecting the live login
  // screen's markup).
  function isLoginScreen() {
    var root = document.getElementById("nc-root");
    if (!root || !root.firstChild) return true;
    var candidates = root.querySelectorAll("button, a, span");
    for (var i = 0; i < candidates.length; i++) {
      if (candidates[i].textContent && candidates[i].textContent.trim() === "Login") {
        return true;
      }
    }
    return false;
  }

  function onLoginDetected() {
    if (loginHandled) return;
    loginHandled = true;
    buttonEl.style.display = "block";
    if (!localStorage.getItem(GUIDE_SEEN_KEY)) {
      showModal();
      localStorage.setItem(GUIDE_SEEN_KEY, "true");
    }
  }

  function checkLoginState() {
    if (!loginHandled && !isLoginScreen()) {
      onLoginDetected();
    }
  }

  // Two independent signals, either can trigger detection — Decap has no
  // official post-login event (confirmed: its event system only covers
  // preSave/postSave/prePublish/postPublish/preUnpublish/postUnpublish,
  // nothing auth-related), so neither signal alone is guaranteed:
  // hashchange won't fire if the browser already had a valid session and
  // lands straight in the editor, and the MutationObserver alone could in
  // theory miss a change if Decap re-renders without adding/removing
  // nodes under #nc-root.
  window.addEventListener("hashchange", checkLoginState);

  var root = document.getElementById("nc-root");
  if (root) {
    new MutationObserver(checkLoginState).observe(root, {
      childList: true,
      subtree: true,
    });
  }

  // Catches the already-authenticated-on-load case, where neither of the
  // above may fire before this script runs.
  setTimeout(checkLoginState, 500);
})();
