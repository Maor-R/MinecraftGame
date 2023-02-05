const ROWS = 21;
const COLUMNS = 27;

const PICKAXE = "pickaxe";
const SHOVEL = "shovel";
const AXE = "axe";
const WATER_BUCKET = "waterBucket";

const DIRT = "dirt";
const GRASS = "grass";
const WOOD = "wood";
const LEAF = "leaf";
const ROCK = "rock";
const BRICKS_VARIATION = "bricks_variation";
const WATER = "water";
const ADD_TILE = "add_tile";
const REMOVE_TILE = "remove_tile";
const DEFAULT_BORDER_COLOR = "#91917a";
const CHOICE_BORDER_COLOR = "gold";

const pickaxeTool = document.getElementById("pickaxe");
const shovelTool = document.getElementById("shovel");
const axeTool = document.getElementById("axe");
const waterBucket = document.getElementById("waterBucket");
const leaf = document.getElementById("leaf").getElementsByTagName("span")[0];
const wood = document.getElementById("wood").getElementsByTagName("span")[0];
const water = document.getElementById("water").getElementsByTagName("span")[0];
const dirt = document.getElementById("dirt").getElementsByTagName("span")[0];
const grass = document.getElementById("grass").getElementsByTagName("span")[0];
const bricksVariation = document
  .getElementById("bricks_variation")
  .getElementsByTagName("span")[0];
const rock = document.getElementById("rock").getElementsByTagName("span")[0];

const restartGameBtn = document.getElementById("restartGame");
const endGameBtn = document.getElementById("endGame");
const instructions = document.getElementById("instructions");
let currentTool;
let gameAreaMat = Array.from(Array(ROWS), () => new Array(COLUMNS));

let dirtCnt = 0;
let grassCnt = 0;
let woodCnt = 0;
let leafCnt = 0;
let rockCnt = 0;
let bricksVariationCnt = 0;
let waterCnt = 0;
let mode = "";
let tileToAdd = "";
let lastTileRemove = "";
let addTileType = "";
let iIndexLastTileRemove;
let jIndexLastTileRemove;
let lastToolElement = undefined;
let lastMaterial = undefined;

function startGame() {
  welcomeScreen.style.cssText = "display: none";
}
function restartGame() {
  window.location = window.location;
}

function openInstructions() {
  instructions.style.cssText = "display: block";
}

function closeInstructions() {
  instructions.style.cssText = "display: none";
}
function endGame() {
  welcomeScreen.style.cssText = "display: block";
}

function setCurrentTool(event) {
  currentTool = event.target.id;
  if (lastToolElement !== undefined) {
    lastToolElement.style.borderColor = DEFAULT_BORDER_COLOR;
    lastToolElement = undefined;
  }
  if (lastMaterial !== undefined) {
    lastMaterial.style.borderColor = DEFAULT_BORDER_COLOR;
    lastMaterial = undefined;
  }
  event.target.style.borderColor = CHOICE_BORDER_COLOR;
  lastToolElement = event.target;
}

function changeMode(event) {
  currentMaterial = event.target.id;
  if (lastMaterial !== undefined) {
    lastMaterial.style.borderColor = DEFAULT_BORDER_COLOR;
    lastMaterial = undefined;
  }
  if (lastToolElement !== undefined) {
    lastToolElement.style.borderColor = DEFAULT_BORDER_COLOR;
    lastToolElement = undefined;
  }
  event.target.style.borderColor = CHOICE_BORDER_COLOR;

  tileToAdd = event.target.id;
  mode = ADD_TILE;
  lastMaterial = event.target;
}

function addTile(i, j, e, tta) {
  if (
    tileToAdd === lastTileRemove &&
    i === iIndexLastTileRemove &&
    j === jIndexLastTileRemove
  ) {
    e.target.style.backgroundImage = `url(./assets/images/${tta}.webp)`;
    mode = "";
    addTileType = "";
  }
}

function removeTile(event) {
  let tileName;
  let i;
  let j;
  if (this.style.backgroundImage !== "")
    tileName = this.style.backgroundImage.split("/")[3].split(".")[0];

  i = Number(event.target.style.gridRow.split('/')[0]);
  j = Number(event.target.style.gridColumn.split('/')[0]);
  
  if (mode === ADD_TILE) {
    addTile(i, j, event, tileToAdd);

    return;
  } 
  switch (tileName) {
    case GRASS:
      if (currentTool === SHOVEL) {
        tryToRemoveTile(i, j, event, GRASS);
      }
      break;
    case DIRT:
      if (currentTool === SHOVEL) {
        tryToRemoveTile(i, j, event, DIRT);
      }
      break;
    case WOOD:
      if (currentTool === AXE) {
        tryToRemoveTile(i, j, event, WOOD);
      }
      break;
    case LEAF:
      if (currentTool === AXE) {
        tryToRemoveTile(i, j, event, LEAF);
      }
      break;
    case ROCK:
      if (currentTool === PICKAXE) {
        tryToRemoveTile(i, j, event, ROCK);
      }

      break;
    case BRICKS_VARIATION:
      if (currentTool === PICKAXE) {
        tryToRemoveTile(i, j, event, BRICKS_VARIATION);
      }

      break;
    case WATER:
      if (currentTool === WATER_BUCKET) {
        tryToRemoveTile(i, j, event, WATER);
      }
      break;
    default:
      break;
  }
}

function tryToRemoveTile(i, j, e, material) {
  if (
    (jIsRange(j - 1) && gameAreaMat[i][j - 1] === undefined) ||
    (jIsRange(j + 1) && gameAreaMat[i][j + 1] === undefined) ||
    (iIsRange(i + 1) && gameAreaMat[i + 1][j] === undefined) ||
    (iIsRange(i - 1) && gameAreaMat[i - 1][j] === undefined)
  ) { 
    e.target.style.backgroundImage = "";
    gameAreaMat[i][j] = undefined;
    iIndexLastTileRemove = i;
    jIndexLastTileRemove = j;
    switch (material) {
      case GRASS:
        grassCnt++;
        grass.innerText = grassCnt;
        lastTileRemove = GRASS;

        break;
      case DIRT:
        dirtCnt++;
        dirt.innerText = dirtCnt;
        lastTileRemove = DIRT;

        break;
      case WOOD:
        woodCnt++;
        wood.innerText = woodCnt;
        lastTileRemove = WOOD;

        break;
      case LEAF:
        leafCnt++;
        leaf.innerText = leafCnt;
        lastTileRemove = LEAF;

        break;
      case ROCK:
        rockCnt++;
        rock.innerText = rockCnt;
        lastTileRemove = ROCK;

        break;
      case BRICKS_VARIATION:
        bricksVariationCnt++;
        bricksVariation.innerText = bricksVariationCnt;
        lastTileRemove = BRICKS_VARIATION;

        break;
      case WATER:
        waterCnt++;
        water.innerText = waterCnt;
        lastTileRemove = WATER;

        break;
      default:
        break;
    } //switch
  } //if
}
function iIsRange(i) {
  return i >= 1 && i < ROWS;
}

function jIsRange(j) {
  return j >= 1 && j < COLUMNS;
}

function buildGround() {
  for (let i = 15; i < ROWS; i++) {
    for (let j = 1; j < COLUMNS; j++) {
      if (!((j >= 15 && j <= 17) || (j >= 23 && j <= 25))) {
        let element = document.createElement("div");
        element.addEventListener("click", removeTile);
        if (i == 15) {
          element.style.backgroundImage = "url(./assets/images/grass.webp)";
          gameAreaMat[i][j] = GRASS;
        } else {
          element.style.backgroundImage = "url(./assets/images/dirt.webp)";
          gameAreaMat[i][j] = DIRT;
        }
        element.style.gridRow = i;
        element.style.gridColumn = j;
        element.classList = "tile";
        gameArea.appendChild(element);
      }
    }
  }
}

function buildWall() {
  for (let i = 10; i < 15; i++) {
    let sumTile = (i - 9) * 2 - 1;
    for (let j = COLUMNS / 3 - (i - 10); sumTile-- > 0; j++) {
      let element = document.createElement("div");
      element.addEventListener("click", removeTile);

      element.style.backgroundImage = "url(./assets/images/rock.webp)";
      gameAreaMat[i][j] = ROCK;

      element.style.gridRow = i;
      element.style.gridColumn = j;
      element.classList = "tile";
      gameArea.appendChild(element);
    }
  }
}

function buildRiver() {
  for (let i = 15; i < ROWS; i++) {
    let sumTile = 6;
    for (let j = COLUMNS / 3 + 6; sumTile-- > 0; j++) {
      if (j == COLUMNS / 3 + 9) {
        j += 5;
      }
      let element = document.createElement("div");
      element.addEventListener("click", removeTile);

      element.style.backgroundImage = "url(./assets/images/water.webp)";
      gameAreaMat[i][j] = WATER;

      element.style.gridRow = i;
      element.style.gridColumn = j;
      element.classList = "tile";
      gameArea.appendChild(element);
    }
  }
}

function buildTree() {
  let start = 6;
  let bg;
  let bgi;
  for (let i = 7; i < 15; i++) {
    let sumTile;
    let j;
    if (i >= 5 && i <= 10) {
      sumTile = (i - start) * 2 - 1;
      j = COLUMNS - i;
      bgi = "url(./assets/images/leaf.webp)";
      bg = LEAF;
    } else {
      sumTile = 1;
      j = COLUMNS - 7;
      bgi = "url(./assets/images/wood.webp)";
      bg = WOOD;
    }

    for (; sumTile-- > 0; j++) {
      let element = document.createElement("div");
      element.addEventListener("click", removeTile);

      element.style.backgroundImage = bgi;
      gameAreaMat[i][j] = bg;

      element.style.gridRow = i;
      element.style.gridColumn = j;
      element.classList = "tile";
      gameArea.appendChild(element);
    }
  }
}

function buildBrickWall() {
  let start = 20;
  let bgi;
  for (let i = 10; i < 15; i++) {
    let sumTile;
    let j;

    sumTile = (start-2) - i;
    j = 1;
    bgi = "url(./assets/images/bricks_variation.webp)";

    for (; sumTile-- > 0; j++) {
      let element = document.createElement("div");
      gameAreaMat[i][j] = BRICKS_VARIATION;
      element.addEventListener("click", removeTile);
      element.style.backgroundImage = bgi;
      element.style.gridRow = i;
      element.style.gridColumn = j;
      element.classList = "tile";
      gameArea.appendChild(element);
    }
  }
}

function initGame() {
  buildGround();
  buildWall();
  buildTree();
  buildRiver();
  buildBrickWall();
}


initGame();