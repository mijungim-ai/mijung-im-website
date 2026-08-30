// Simplifies Decap CMS's Publish dropdown down to a single action, and
// sends the editor back to the collection's list view after saving.
//
// Investigated first: config.yml has no way to disable just the "Publish
// and create new" / "Publish and duplicate" options while keeping "New
// entry" creation itself — confirmed against the live unpkg bundle that
// they're gated by the SAME flag as the collection's own `create:`
// setting (canCreate, which resolves straight from `collection.get(
// "create")`). Turning that off to hide the extra dropdown options would
// also remove the "New [Collection]" button entirely, which every one of
// these 9 boards needs. So this is DOM-level hiding instead, same
// approach as guide.js's login-screen detection: find the menu items by
// their exact label text (Decap's own English strings, not a CSS-in-JS
// class name, which is unstable across versions) and hide them —
// hiding via style, never removing the node, so React's own re-renders
// of the dropdown never fight this.
//
// The row itself, not just its label text, has to be hidden or its
// background/divider/"+" icon are left behind as an empty strip — traced
// through the actual unpkg bundle to confirm what that row really is:
// every dropdown item (Decap uses react-simple-dropdown) renders through
// that library's MenuItem, whose render() hardcodes
// `role: "menuitem"` and defaults its wrapping tag to a plain <div> —
// *not* a <button>/<a>/<li>, which is what the first version of this
// file assumed and why only the inner <span> label ended up hidden.
// role="menuitem" is a value the library's own code sets on every item
// alike (not a version-churny generated class), so it's what this
// closest() call targets, ahead of button/a/li as a fallback for markup
// this trace didn't cover.
//
// With only "Publish now" left clickable, there's no longer a need to
// guess which button was pressed: postPublish/postSave firing at all
// means that's the one that happened, so both listeners unconditionally
// send the editor back to the collection list.
//
// The "Publish" button itself isn't a split button — traced through the
// actual bundle: the button's only click handler calls
// `ambManager.toggleMenu(...)`, full stop, and its caret is a CSS
// ::after (no separate DOM element for an "arrow area" to redirect).
// So there's no button to rewire; instead, the same observer that hides
// the other rows auto-clicks "Publish now" the moment it appears, so
// pressing "Publish" reads as one action instead of two.
(function () {
  var HIDDEN_LABELS = [
    "Publish and create new",
    "Publish and duplicate",
    "Duplicate",
  ];
  var AUTO_CLICK_LABEL = "Publish now";

  // Finds the clickable row (not just the label text inside it) for an
  // exact label — same leaf-text-match + role="menuitem" lookup used
  // for the rows this file hides.
  function findRow(root, label) {
    var candidates = root.querySelectorAll("button, a, li, div, span");
    for (var i = 0; i < candidates.length; i++) {
      var el = candidates[i];
      if (el.children.length > 0) continue;
      if ((el.textContent ? el.textContent.trim() : "") !== label) continue;
      return el.closest('[role="menuitem"], button, a, li') || el;
    }
    return null;
  }

  // Re-armed whenever "Publish now" isn't present (dropdown closed), so
  // every fresh open of the dropdown gets exactly one auto-click — not
  // guarded by marking the row itself, since closeOnSelection means the
  // row is typically gone (unmounted, not just hidden) right after the
  // click that closes the menu, taking any attribute we set on it with
  // it.
  var autoClickArmed = true;

  function processDropdown() {
    var root = document.getElementById("nc-root");
    if (!root) return;

    HIDDEN_LABELS.forEach(function (label) {
      var row = findRow(root, label);
      if (row && row.style.display !== "none") {
        row.style.display = "none";
      }
    });

    var publishNowRow = findRow(root, AUTO_CLICK_LABEL);
    if (publishNowRow) {
      if (autoClickArmed) {
        autoClickArmed = false;
        publishNowRow.click();
      }
    } else {
      // Dropdown is closed (or not yet opened) — ready for the next
      // time it opens.
      autoClickArmed = true;
    }
  }

  var root = document.getElementById("nc-root");
  if (root) {
    new MutationObserver(processDropdown).observe(root, {
      childList: true,
      subtree: true,
    });
  }
  processDropdown();

  // Decap's own hash router: #/collections/<name>/... while editing an
  // entry, #/collections/<name> for the list itself (confirmed via the
  // login-screen detection built for guide.js). Re-setting the hash to
  // just the collection segment returns to that collection's list.
  //
  // Traced through the actual unpkg bundle: postSave AND postPublish are
  // both invoked from inside the same backend-layer persistEntry() call,
  // strictly BEFORE the calling Redux thunk dispatches the save-success
  // action that updates entryDraft (and therefore hasChanged). A plain
  // history.block() is also registered by Decap's Editor component for
  // as long as hasChanged is true; setting the hash here counts as a POP
  // transition (it didn't go through history.push), so if hasChanged is
  // still true at this exact moment, history's block shows a
  // window.confirm() with the "leave this page?" text — not a native
  // beforeunload dialog, despite looking like one.
  //
  // A brand-new entry adds a SECOND source of hash churn on top of that:
  // right after persistEntry() resolves (the same call that fires
  // postSave/postPublish), Decap's own save thunk does
  // `await dispatch(Xc(...)), history.replace(/collections/<name>/entries/<slug>)`
  // to move the URL from the temporary "/new" screen to the real
  // slug-based one — confirmed in the bundle as the Pc() helper, built
  // on the same history.replace() that really does assign
  // window.location.hash (and so fires a real, externally-observable
  // hashchange). A single fixed delay raced this: short enough and we'd
  // beat Decap's own redirect and get overwritten right after landing on
  // the list; long enough to always lose to it and the fix stops helping
  // at all on a slow connection. Instead of guessing a delay long enough
  // to outlast that, and short enough to still dodge the confirm(),
  // this waits for the hash to go quiet: every hashchange (ours or
  // Decap's) restarts the same timer, so the list-navigation only fires
  // once nothing has touched the hash for a full quiet window —
  // whichever finishes last, wins, regardless of how long Decap's own
  // redirect takes.
  // A single "settle, then stop" pass isn't enough on its own: this
  // project's backend is real GitHub, so the network round-trip behind
  // Decap's own Xc()+Pc() redirect (see above) isn't bounded by
  // anything we control — a first version of this fix that stopped
  // watching after just one 300ms-quiet pass still lost to a redirect
  // that happened to land slightly later than that in production, even
  // though it worked in every isolated test (which could only ever
  // simulate a guessed timing, never the real GitHub latency). Rather
  // than guess a single bigger number and risk the same failure mode at
  // a different threshold, this keeps re-checking every 300ms — fast
  // enough that the common, uncontested case still returns to the list
  // almost immediately — but keeps doing so for a full 6 SECONDS from
  // the initial trigger before finally giving up, which comfortably
  // outlasts a slow save round-trip without permanently hijacking the
  // hash for the rest of the session.
  var CHECK_INTERVAL_MS = 300;
  var MAX_WATCH_MS = 6000;
  var settleTimer = null;
  var pendingTarget = null;
  var watchDeadline = 0;

  function scheduleSettleCheck() {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(function () {
      if (!pendingTarget) return;
      if (window.location.hash !== pendingTarget) {
        window.location.hash = pendingTarget; // triggers hashchange -> re-armed below
        return;
      }
      if (Date.now() < watchDeadline) {
        // Quiet for now, but still within the watch window — Decap's
        // own redirect may simply not have arrived yet. Keep checking.
        scheduleSettleCheck();
        return;
      }
      pendingTarget = null; // watch window elapsed with nothing left to correct — done
    }, CHECK_INTERVAL_MS);
  }

  window.addEventListener("hashchange", function () {
    if (pendingTarget) {
      scheduleSettleCheck();
    }
  });

  function goToCollectionList() {
    var match = window.location.hash.match(/^#\/collections\/([^/]+)/);
    if (!match) return;
    pendingTarget = "#/collections/" + match[1];
    watchDeadline = Date.now() + MAX_WATCH_MS;
    scheduleSettleCheck();
  }

  // Registered on both: this project runs Decap in simple (direct-
  // publish) mode, not editorial_workflow, and it's unconfirmed from
  // outside a real login which of postSave/postPublish actually fires
  // in that mode — safer to listen on both than to guess and have this
  // silently do nothing. Confirmed harmless to fire twice: the bundle
  // trace shows both events fire back-to-back in simple mode, and
  // calling goToCollectionList twice just re-arms the same settle timer.
  CMS.registerEventListener({ name: "postPublish", handler: goToCollectionList });
  CMS.registerEventListener({ name: "postSave", handler: goToCollectionList });
})();
