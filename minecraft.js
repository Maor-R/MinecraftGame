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
const CLASS_TILE = "tile";

const pickaxeTool = document.getElementById("pickaxe");
const shovelTool = document.getElementById("shovel");
const axeTool = document.getElementById("axe");
const waterBucket = document.getElementById("waterBucket");
const leaf = document.getElementById("leaf").getElementsByTagName("span")[0];
const wood = document.getElementById("wood").getElementsByTagName("span")[0];
const water = document.getElementById("water").getElementsByTagName("span")[0];
const dirt = document.getElementById("dirt").getElementsByTagName("span")[0];
const grass = document.getElementById("grass").getElementsByTagName("span")[0];
const bricksVariation = document.getElementById("bricks_variation").getElementsByTagName("span")[0];
const rock = document.getElementById("rock").getElementsByTagName("span")[0];
const restartGameBtn = document.getElementById("restartGame");
const endGameBtn = document.getElementById("endGame");
const instructions = document.getElementById("instructions");

let gameAreaMat = Array.from(Array(ROWS), () => new Array(COLUMNS));
let currentTool;
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
if (lastToolElement !== undefined) {
  lastToolElement.style.borderColor = DEFAULT_BORDER_COLOR;
}
if (lastMaterial !== undefined) {
  lastMaterial.style.borderColor = DEFAULT_BORDER_COLOR;
}

  currentTool = "";
  dirtCnt = 0;
  grassCnt = 0;
  woodCnt = 0;
  leafCnt = 0;
  rockCnt = 0;
  bricksVariationCnt = 0;
  waterCnt = 0;
  mode = "";
  tileToAdd = "";
  lastTileRemove = "";
  addTileType = "";
  iIndexLastTileRemove;
  jIndexLastTileRemove;
  lastToolElement = undefined;
  lastMaterial = undefined;
  drawScreen();

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
    (iIsRange(i - 1) && gameAreaMat[i - 1][j] === undefined)) { 
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
    } 
  } 
}

function iIsRange(i) {
  return i >= 1 && i < ROWS;
}

function jIsRange(j) {
  return j >= 1 && j < COLUMNS;
}

function drawMap(iStart, iEnd, jStart, jEnd, tile){
  for (let i = iStart; i < iEnd; i++) {
    for (let j = jStart; j < jEnd; j++) {

        let element = document.createElement("div");
        element.addEventListener("click", removeTile);
        element.style.backgroundImage = `url(./assets/images/${tile}.webp)`;
        gameAreaMat[i][j] = tile;
        element.style.gridRow = i;
        element.style.gridColumn = j;
        element.classList = CLASS_TILE;
        gameArea.appendChild(element);
      
    }
  }
}

function drawScreen(){
  //draw grass
  drawMap(15 ,16 ,1 ,15 ,GRASS);
  drawMap(15 ,16 ,18 ,23 ,GRASS);
  drawMap(15 ,16 ,26 ,COLUMNS ,GRASS);

  //draw dirt
  drawMap(16 ,ROWS ,1 ,15 ,DIRT);

  drawMap(16 ,ROWS ,18 ,23 ,DIRT);
  drawMap(16 ,ROWS ,26 ,COLUMNS ,DIRT);

  //draw water
  drawMap(15 ,ROWS ,15 ,18 ,WATER);
  drawMap(15 ,ROWS ,23 ,26 ,WATER);

  //draw wood
  drawMap(11 ,15 ,20 ,21 ,WOOD);
  //draw leaf
  drawMap(10 ,11 ,17 ,24 ,LEAF);
  drawMap(9 ,10 ,18 ,23 ,LEAF);
  drawMap(8 ,9 ,19 ,22 ,LEAF);
  drawMap(7 ,8 ,20 ,21 ,LEAF);

  //draw brick wall
  drawMap(10 ,11 ,1 ,9 ,BRICKS_VARIATION);
  drawMap(11 ,12 ,1 ,8 ,BRICKS_VARIATION);
  drawMap(12 ,13 ,1 ,7 ,BRICKS_VARIATION);
  drawMap(13 ,14 ,1 ,6 ,BRICKS_VARIATION);
  drawMap(14 ,15 ,1 ,5 ,BRICKS_VARIATION);

  //draw wall
  drawMap(10 ,11 ,9 ,10 ,ROCK);
  drawMap(11 ,12 ,8 ,11 ,ROCK);
  drawMap(12 ,13 ,7 ,12 ,ROCK);
  drawMap(13 ,14 ,6 ,13 ,ROCK);
  drawMap(14 ,15 ,5 ,14 ,ROCK);

}
drawScreen();

