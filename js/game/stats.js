export default function (stats) {
  return `
    <ul class="stats">
      ${stats.map((value) => `<li class="stats__result stats__result--${value}"></li>`).join('')}
    </ul>`;
}
