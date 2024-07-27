// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다.
// 1) 완료를 클릭하는 순간 true와 false
// 2) 완료 클릭이 true면 밑줄긋기
// 3) false면 그대로 두기

// 완료 버튼을 누르면 할일이 완료로 넘어가고, 밑줄이 생김
// delete버튼을 누르면 할일이 삭제된다.
// ----------------------------------------
// 진행중, 완료 탭을 누르면 언더바가 이동
// 완료 탭은 완료된 아이템만, 진행중탭은 진행중 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let textInput = document.getElementById("todoTextInput");
let todoAddBtn = document.getElementById("todoAddBtn");
let todoList = [];

todoAddBtn.addEventListener("click", addTodo);

// + 버튼을 클릭하면, 할일이 추가된다.
function addTodo() {
  // 스트링타입(문자열)이 끝났는지에 대한 여부를 알 수 없기 때문에 todo객체로 변환
  // let todoItem = textInput.value;
  let todo = {
    id: randomIdGenerate(),
    todoContent: textInput.value,
    isComplete: false,
    isDelete: false
  };

  todoList.push(todo);
  console.log(todoList);
  render();
}

// taskContent안에 할일이 추가된다.
function render() {
  let resultHtml = "";

  for (let i = 0; i < todoList.length; i++) {
    // 완료 버튼 클릭시 취소선 이벤트
    if (todoList[i].isComplete == true) {
      resultHtml += `<div class="task">
      <div class="todoComplete">${todoList[i].todoContent}</div>
      <div>
        <button onclick="toggleComplete('${todoList[i].id}')">
          완료
        </button>
        <button onclick="deleteTodo('${todoList[i].id}')">
          삭제
        </button>
      </div>
    </div>
`;
    } else {
      resultHtml += `<div class="task">
      <!-- todoList[i]의 문자열을 객체로 변환했기 때문에 명확한 표기가 필요 -->
      <!--<div>${todoList[i]}</div> -->
      <div>${todoList[i].todoContent}</div>
      <div>
        <button onclick="toggleComplete('${todoList[i].id}')">
          완료
        </button>
        <button onclick="deleteTodo('${todoList[i].id}')">
          삭제
        </button>
        </div>
      </div>
      `;
    }
  }
  document.getElementById("taskContent").innerHTML = resultHtml;
}

// 완료 버튼 이벤트
function toggleComplete(id) {
  
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id) {
      // 한번 완료를 클릭하면 되면 false가 되지 않음 
      // todoList[i].isComplete = true;
      // toggle로 만들기 위해 수정 
      todoList[i].isComplete = !todoList[i].isComplete;
      break;
    }
  }
  // 값을 바꾼후 UI 업데이트 필요
  render();
  console.log(todoList);
}

// todo객체 랜덤 아이디 만들기
function randomIdGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}

// delete버튼을 누르면 할일이 삭제된다.
// 삭제 버튼 이벤트
function deleteTodo(id) {
  console.log("삭제:",id);

  for(let i = 0; i < todoList.length; i++) {
    if(todoList[i].id == id) {
      todoList.splice(i,1);
    break;
    }
  }
  // 값을 바꾼후 UI 업데이트 필요
  render();
  console.log(todoList);
}
