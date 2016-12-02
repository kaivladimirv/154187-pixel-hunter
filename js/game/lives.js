export default function (lives) {
  return `
    <div class="game__lives">
      ${lives.map((value) => `<img src="img/heart__${value}.svg" class="game__heart" alt="Life" width="32" height="32">`).join(' ')}
    </div>`;
}
