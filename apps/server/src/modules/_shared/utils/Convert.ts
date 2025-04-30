export function formatSecondsToMinutesAndSeconds(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const minStr =
    minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "";
  const secStr = `${seconds.toString().padStart(2, "0")} second${
    seconds !== 1 ? "s" : ""
  }`;

  if (minutes > 0) {
    return `${minStr} and ${secStr}`;
  }
  return secStr;
}
