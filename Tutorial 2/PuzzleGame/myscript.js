// ボードとパネルの定義
// Board and panel definitions
let board = [];
let panel = document.getElementsByName('panel');

// パネルの移動方向
// Panel movement direction
const UP = 1;
const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;

// パネルの画像
// Panel image
let imageFile = ['p0.jpg', 'p2.jpg', 'p4.jpg', 'p8.jpg',
                 'p16.jpg', 'p32.jpg', 'p64.jpg', 'p128.jpg',
                 'p256.jpg', 'p512.jpg', 'p1024.jpg', 'p2048.jpg'];

// popup.htmlが読み込まれた後に呼び出されます。
// Called when popup.html is loaded.
window.onload = () => {
  if (loadBoard() == false){
    initBoard();
  }
  dispBoard();
}

// upボタンのクリックメソッドです。
// Click method for up button.
document.getElementById('id_up').onclick = () => {
  onFling(UP);
}

// downボタンのクリックメソッドです。
// Click method for down button.
document.getElementById('id_down').onclick = () => {
  onFling(DOWN);
}

// leftボタンのクリックメソッドです。
// Click method for left button.
document.getElementById('id_left').onclick = () => {
  onFling(LEFT);
}

// rightボタンのクリックメソッドです。
// Click method for right button.
document.getElementById('id_right').onclick = () => {
  onFling(RIGHT);
}

// restartボタンのクリックメソッドです。
// Click method for restart button.
document.getElementById('id_restart').onclick = () => {
  initBoard();
  dispBoard();
}

let wait = false;

// 方向ボタンのクリック時の処理です。
//  後処理がスケジュール中の場合は処理を中断します。
//  パネルを前詰めします。
//  前詰め後の同じ値のパネルを合成します。
//  合成により隙間が発生した場合は再度、前詰めします。
//  ボードを表示します。
//  後処理を１秒後にスケジュールします。
// Processing when the direction button is clicked.
//  If post-processing is scheduled, processing will be interrupted.
//  Pre-pack the panel.
//  Combine panels with the same value after pre-packing.
//  If there is a gap due to compositing, pre-pack it again.
//  Display the board.
//  Schedule post-processing after 1 second.
function onFling(direction){
  if (wait == true) return;
  prePackPanel(direction);
  combinePanel(direction);
  prePackPanel(direction);
  dispBoard();
  wait = true;
  // 1000ミリ秒(1秒)後にafterOnFling()を実行します。
  // Execute afterOnFling() after 1000ms(1sec).
  setTimeout(afterOnFling, 1000); 
}

// 方向ボタンのクリック時の後処理です。
// Post-processing when the direction button is clicked.
function afterOnFling(){
  if (checkWin()){
    alert('You Win.');
    initBoard();
    dispBoard();
    wait = false;
  }
  else{
    setPanel();
    dispBoard();
    if (checkLoss()){
      // 1000ミリ秒(1秒)後にafterOnFling2()を実行します。
      // Execute afterOnFling() after 1000ms(1sec).
      setTimeout(youLoss, 1000); 
    }
    else{
      saveBoard();
      wait = false;
    }
  }
}

// 負けた時の処理です。負けた状態のボードを表示するためには関数を分ける必要があります。
// When you lose.You need to separate the functions to see the losing board.
function youLoss(){
  alert('You Loss.');
  initBoard();
  dispBoard();
  wait = false;
}

// ボードを初期化します。
// Initialize the board.
function initBoard(){
  for (let x = 0; x < 4; x++){
    board[x] = [];
    for (let y = 0; y < 4; y++){
      board[x][y] = 0;
    }
  }
  // 勝利テスト用
  // for win test
  //  board[0][0] = 10;
  //  board[0][1] = 10;
  // 敗北テスト用
  // for loss test
  //  board = [[0,2,3,4],[5,6,7,8],[9,2,3,4],[5,6,7,8]];
  setPanel();
  setPanel();
}

// ボードを表示します。
// Display the board.
function dispBoard(){
  for (let x = 0; x < 4; x++){
    for (let y = 0; y < 4; y++){
      panel[x * 4 + y].src = imageFile[board[x][y]];
    }
  }
}

// パネルを指定方向に前詰めします。
// Pre-align the panel in the specified direction.
function prePackPanel(direction){
  let i = 0;
  if (direction == DOWN || direction == UP){
    for (let y = 0; y < 4; y++){
      let tmp = [0, 0, 0, 0];
      if (direction == DOWN){
        i = 3;
        for (let x = 3; x >= 0; x--){
          if (board[x][y] == 0){
            continue;
          }
          tmp[i--] = board[x][y];
        }
      }
      else{
        i = 0;
        for (let x = 0; x < 4; x++){
          if (board[x][y] == 0){
            continue;
          }
          tmp[i++] = board[x][y];
        }
      }
      for (let x = 0; x < 4; x++){
        board[x][y] = tmp[x];
      }
    }
  }
  else{
    for (let x = 0; x < 4; x++){
      let tmp = [0, 0, 0, 0];
      if (direction == RIGHT){
        i = 3;
        for (let y = 3; y >= 0; y--){
          if (board[x][y] == 0){
            continue;
          }
          tmp[i--] = board[x][y];
        }
      }
      else{
        i = 0;
        for (let y = 0; y < 4; y++){
          if (board[x][y] == 0){
            continue;
          }
          tmp[i++] = board[x][y];
        }
      }
      for (let y = 0; y < 4; y++){
        board[x][y] = tmp[y];
      }
    }
  }
}

// 同じパネルを合成します。
// Combine the same panels.
function combinePanel(direction){
  if (direction == DOWN || direction == UP){
    for (let y = 0; y < 4; y++){
      if (direction == DOWN){
        for (let x = 3; x > 0; x--){
          if (board[x][y] == 0) continue;
          if (board[x][y] == board[x - 1][y]){
            board[x][y]++;
            board[x - 1][y] = 0;
          }
        }
      }
      else{
        i = 0;
        for (let x = 0; x < 3; x++){
          if (board[x][y] == 0) continue;
          if (board[x][y] == board[x + 1][y]){
            board[x][y]++;
            board[x + 1][y] = 0;
          }
        }
      }
    }
  }
  else{
    for (let x = 0; x < 4; x++){
      if (direction == RIGHT){
        for (let y = 3; y > 0; y--){
          if (board[x][y] == 0) continue;
          if (board[x][y] == board[x][y - 1]){
            board[x][y]++;
            board[x][y - 1]  = 0;
          }
        }
      }
      else{
        i = 0;
        for (let y = 0; y < 3; y++){
          if (board[x][y] == 0) continue;
          if (board[x][y] == board[x][y + 1]){
            board[x][y]++;
            board[x][y +1] = 0;
          }
        }
      }
    }
  }
}

// 無作為に抽出した空白のパネルを２のパネルに変更します。
// Change the randomly sampled blank panel to a 2 panel.
function setPanel(){
  let zeroX = [];
  let zeroY = [];
  for (let x = 0; x < 4; x++){
    for (let y = 0; y < 4; y++){
      if (board[x][y] == 0){
        zeroX.push(x);
        zeroY.push(y);
      }
    }
  }
  if (zeroX.length == 0) return;
  let i = Math.floor(Math.random()* zeroX.length);
  board[zeroX[i]][zeroY[i]] = 1;
}

// 勝利を判定します。２０４８のパネルがあれば勝ちです。
// 
function checkWin(){
  for (let x = 0; x < 4; x++){
    for (let y = 0; y < 4; y++){
      if (board[x][y] == 11) return true;
    }
  }
  return false;
}

// 敗北を判定します。スライド出来るパネルが無ければ負けです。
// 
function checkLoss(){
  for (let x = 0; x < 4; x++){
    for (let y = 0; y < 4; y++){
      if (board[x][y] == 0) return false;
    }
  }
  for (let i = 0; i < 4; i++){
    for (let j = 0; j < 3; j++){
      if (board[i][j] == board[i][j + 1]) return false;
      if (board[j][i] == board[j + 1][i]) return false;
    }
  }
  return true;
}


// ボードを保存します。
// Save the board.
function saveBoard(){
  localStorage['board'] = board;
}

// ボードを読み込みます。
// Load ths board.
function loadBoard(){
  let savedBoard = localStorage['board'];
  if (savedBoard == null) return false;
  savedBoard = savedBoard.split(',');
  let i = 0;
  for (let x = 0; x < 4; x++){
    board[x] = [];
    for (let y = 0; y < 4; y++){
      board[x][y] = savedBoard[i++];
    }
  }
  return true;
}