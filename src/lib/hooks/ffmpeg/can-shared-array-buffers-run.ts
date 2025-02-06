export function canSharedArrayBuffersRun() {
  if (window.isSecureContext && window.crossOriginIsolated) {
    return true;
  }
  if (!window.isSecureContext) {
    console.info("not secure context");
  }
  if (!window.crossOriginIsolated) {
    console.info("not cross origin isolated");
  }
  console.info("running in singlethread mode");

  return false;
}
