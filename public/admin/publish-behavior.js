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
  function goToCollectionList() {
    var match = window.location.hash.match(/^#\/collections\/([^/]+)/);
    if (match) {
      window.location.hash = "#/collections/" + match[1];
    }
  }

  // Registered on both: this project runs Decap in simple (direct-
  // publish) mode, not editorial_workflow, and it's unconfirmed from
  // outside a real login which of postSave/postPublish actually fires
  // in that mode — safer to listen on both than to guess and have this
  // silently do nothing.
  CMS.registerEventListener({ name: "postPublish", handler: goToCollectionList });
  CMS.registerEventListener({ name: "postSave", handler: goToCollectionList });
})();
