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
let tabs = document.querySelectorAll(".taskTabs div");
let todoList = [];
let mode = "all"; // render 함수에서 재사용 하기 위해 전역변수로 만듬
let filterList = []; // 전체, 진행중, 완료 list를 배열에 넣는다 

// input 창에 입력하고 엔터키 입력 하면 Todo에 추가 
textInput.addEventListener("keypress", function(event){
  if(event.key === "Enter") {
    event.preventDefault();
    addTodo();
  }
})

todoAddBtn.addEventListener("click", addTodo);

// Tab 클릭 이벤트
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function(event) {
    filter(event);
  });
}
console.log(tabs);

// + 버튼을 클릭하면, Todo가 추가된다.
function addTodo() {
  // 스트링타입(문자열)이 끝났는지에 대한 여부를 알 수 없기 때문에 todo객체로 변환
  // let todoItem = textInput.value;
  let todo = {
    id: randomIdGenerate(),
    todoContent: textInput.value,
    isComplete: false,
    isDelete: false,
  };

  todoList.push(todo);
  console.log(todoList);
  render();
  textInput.value='';
}

// taskContent안에 할일이 추가된다.
function render() {
  let list = [];

  // 1. 내가 선택한 탭에 따라서
  if(mode === "all") {
    list = todoList;
  } // 2. 리스트를 달리 보여준다 
    //  proceeding, complete filterList 
  else if(mode === "proceeding") {
    list = filterList;
  } else if(mode === "complete") { 
    list = filterList;
  }

  let resultHtml = "";
  for (let i = 0; i < list.length; i++) {
    // 완료 버튼 클릭시 취소선 이벤트
    if (list[i].isComplete == true) {
      resultHtml += `<div class="task">
      <div class="todoComplete">${list[i].todoContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">
          완료
        </button>
        <button onclick="deleteTodo('${list[i].id}')">
          삭제
        </button>
      </div>
    </div>
`;
    } else {
      resultHtml += `<div class="task">
      <!-- todoList[i]의 문자열을 객체로 변환했기 때문에 명확한 표기가 필요 -->
      <!--<div>${list[i]}</div> -->
      <div>${list[i].todoContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">
          완료
        </button>
        <button onclick="deleteTodo('${list[i].id}')">
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

// delete버튼을 누르면 할일이 삭제된다.
// 삭제 버튼 이벤트
function deleteTodo(id) {
  console.log("삭제:", id);

  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id) {
      todoList.splice(i, 1);
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

// ======== 첫번째 프로세스 끝 ==========

// Tab 클릭 이벤트 fitter 함수
function filter(event) {
  // console.log(filter, event.target.id);

  mode = event.target.id;
  filterList = []; // 전체, 진행중, 완료 list를 배열에 넣는다 

  if(mode === "all"){
    // 전체 리스트를 보여준다
    render();
  } else if (mode === "proceeding") {
    // 진행중 리스트를 보여준다
    //  todoList.isComplete == false;
    for(let i = 0; i < todoList.length; i++) {
      if(todoList[i].isComplete == false) {
        filterList.push(todoList[i]);
      }
    }
    render();
    console.log("진행중", filterList)
  } else if(mode === "complete") {
    // 완료된 리스트를 보여준다
    // todoList.isComplete == true;
    for(i = 0; i< todoList.length; i++){
      if(todoList[i].isComplete == true) {
        filterList.push(todoList[i]);
      }
    }
  }
  render();
}

// 과제
// 1. 탭 클릭 이동
// 2. 탭에 따른 삭제 동일한 UI나오기
// 3. 디자인 수정