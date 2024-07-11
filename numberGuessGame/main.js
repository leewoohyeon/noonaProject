// 랜덤번호 지정
// 사용자가 번호 입력 > Go 버튼 클릭
// 랜덤번호를 맞추면 정답입니다.
// 랜덤번호 < 사용자입력번호 down.
// 랜덤번호 > 사용자입력번호 up.
// 리셋 버튼을 누르면 게임이 리셋
// 기회는 5번, 게임이 끝남(더이상 게임 불가, 버튼 disable)
// 사용자입력번호 범위 밖에 숫자를 입력하면 알려줌 | 기회깎지X
// 유저가 입력한 번호를 다시 입력하면 알려준다 | 기회깎지X

let randomNum = 0;
let playBtn = document.getElementById("playBtn");
let userInputNum = document.getElementById("userInputNum");
let resultTextBox = document.getElementById("resultTextBox");
let resetBtn = document.getElementById("resetBtn");
let chanceArea = document.getElementById("chanceArea");
let chances = 5;
let gameOver = false;
let history = [];

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
userInputNum.addEventListener("focus", function()
{userInputNum.value = ""}
);

// 랜덤 번호 지정
function pickRandomNum() {
  // Math.random 0-1까지 랜덤한 숫자를 반환
  // 1-100까지의 랜덤 숫자를 원하기 때문에 *100
  // 소수점 뒷자리를 버리기 위해 Math.floor 함수 실행
  // 1-100까지의 랜덤수를 원하기 때문에 +1
  randomNum = Math.floor(Math.random() * 100) + 1;

  console.log("randomNum :", randomNum);
}

// 사용자가 번호 입력 > Go 버튼 클릭
function play() {
  // 사용자가 입력한 숫자값을 가져옴
  let userInputNumValue = userInputNum.value;

  // 유효성 검사 1
  // 사용자입력번호 범위 밖에 숫자를 입력하면 알려줌 | 기회깎지X
  if (userInputNumValue < 1 || userInputNumValue > 100) {
    alert("1과 100사이의 숫자를 입력하세요.");
    
    return;
  }
  
  // 유효성 검사 2
  // 히스토리 배열 내 값이 중복되는지 확인 
  if(history.includes(userInputNumValue)) {
    alert("중복된 숫자 입니다.");
    
    return;
  }

  // 기회는 5번
  chances--;
  chanceArea.textContent = `남은기회:${chances}번`;

  console.log(userInputNumValue);
  // 랜덤번호 > 사용자입력번호 up
  if (userInputNumValue < randomNum) {
    resultTextBox.textContent = "UP!!";
    // 랜덤번호 < 사용자입력번호 down
  } else if (userInputNumValue > randomNum) {
    // console.log("down!!!")
    resultTextBox.textContent = "DOWN!!";
  } else {
    // 랜덤번호를 맞추면 정답입니다.
    // console.log("정답입니다")
    resultTextBox.textContent = "ANSWER!!";
    gameOver = true;
  }

  // 유저가 입력한 번호를 배열에 저장함
  history.push(userInputNumValue);
  console.log(history);

  // 기회는 5번, 게임이 끝남(더이상 게임 불가, 버튼 disable)
  if (chances < 1) {
    gameOver = true;
    // playBtn.disabled = true;
  }

  // userInputNum.value = "";

  if(gameOver == true) {
    playBtn.disabled = true;
  }
}

// 초기화 버튼 함수
function reset() {
  // 1. input창 값 비우기
  userInputNum.value = "";

  // 2. 랜덤 숫자 초기화
  pickRandomNum();
  resultTextBox.textContent = "결과값";
}

pickRandomNum();
