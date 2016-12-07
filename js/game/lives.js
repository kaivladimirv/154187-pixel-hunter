export default function (livesCount, maxLives) {
  return `
    <div class="game__lives">
      ${new Array(maxLives).fill('empty').fill('full', maxLives - livesCount).map((value) => `<img src="img/heart__${value}.svg" class="game__heart" alt="Life" width="32" height="32">`).join('\u00A0')}
    </div>`;
}
