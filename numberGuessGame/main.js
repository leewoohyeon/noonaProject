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

playBtn.addEventListener("click", play)

// 랜덤 번호 지정
function pickRandomNum() {
  // Math.random 0-1까지 랜덤한 숫자를 반환
  // 1-100까지의 랜덤 숫자를 원하기 때문에 *100
  // 소수점 뒷자리를 버리기 위해 Math.floor 함수 실행
  // 1-100까지의 랜덤수를 원하기 때문에 +1
  randomNum = Math.floor(Math.random()*100)+1;

  console.log("randomNum :", randomNum);
}

// 사용자가 번호 입력 > Go 버튼 클릭
function play() {
  // 사용자가 입력한 숫자값을 가져옴
  let userInputNumValue = userInputNum.value;
  
  console.log(userInputNumValue);
  // 랜덤번호 > 사용자입력번호 up
  if(userInputNumValue < randomNum) {
    resultTextBox.textContent = "UP!!"
    // 랜덤번호 < 사용자입력번호 down
  }else if(userInputNumValue > randomNum) {
    // console.log("down!!!")
    resultTextBox.textContent = "DOWN!!"
  }else {
    // 랜덤번호를 맞추면 정답입니다.
    // console.log("정답입니다")
    resultTextBox.textContent = "ANSWER!!"
  }

}

pickRandomNum();