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
(function () {
  var HIDDEN_LABELS = [
    "Publish and create new",
    "Publish and duplicate",
    "Duplicate",
  ];

  function hideMatchingMenuItems() {
    var root = document.getElementById("nc-root");
    if (!root) return;
    var candidates = root.querySelectorAll("button, a, li, div, span");
    for (var i = 0; i < candidates.length; i++) {
      var el = candidates[i];
      // Only consider leaf-ish nodes (no element children) so a label's
      // own text match doesn't also flag every ancestor wrapping it.
      if (el.children.length > 0) continue;
      var text = el.textContent ? el.textContent.trim() : "";
      if (HIDDEN_LABELS.indexOf(text) === -1) continue;
      var target =
        el.closest('[role="menuitem"], button, a, li') || el;
      if (target.style.display !== "none") {
        target.style.display = "none";
      }
    }
  }

  var root = document.getElementById("nc-root");
  if (root) {
    new MutationObserver(hideMatchingMenuItems).observe(root, {
      childList: true,
      subtree: true,
    });
  }
  hideMatchingMenuItems();

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
