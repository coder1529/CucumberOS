/* ==========================================================================
   💾 1. 애플리케이션 데이터 정의 (NoteTaker용 템플릿 엔진)
   ========================================================================== */
var content = [
  {
    title: "Welcome Note",
    date: "2026/6/9",
    content: generateNoteHTML("HI! START WRITING!", "2026/6/9", "Welcome to CucumberOS!<br><br>This layout supports interactive tab switching.")
  },
  {
    title: "Shopping List",
    date: "2026/6/10",
    content: generateNoteHTML("🥒 CUCUMBER MARKET", "2026/6/10", "1. Fresh Cucumbers x10<br>2. Organic Mint Leaves<br>3. Tonic Water")
  }
];

// 정형화된 HTML 마크업 템플릿 빌더 함수
function generateNoteHTML(heading, dateString, bodyText) {
  return `
    <div style="background-color: #dfb0b0; border-radius: 12px; height: 100%; padding: 16px; font-family: Courier, monospace; box-sizing: border-box; display: flex; flex-direction: column; box-shadow: inset 0 0 10px rgba(0,0,0,0.05);">
        <div style="background-color: #f1c9c9; flex: 1; padding: 16px; border-radius: 16px; display: flex; flex-direction: column; overflow: hidden;">
            <p style="margin: 0px 0px 4px 0px; font-weight: bold; font-size: 16px; color: #333;">${heading}</p>
            <p style="font-size: 11px; margin: 0px 0px 12px 0px; color: #666;">📅 ${dateString}</p>
            <div style="overflow-y: auto; flex: 1; padding-right: 5px;">
                <div contenteditable="true" style="outline: none; min-height: 100%; line-height: 1.5; color: #111;">
                    ${bodyText}
                </div>
            </div>
        </div>
    </div>
  `;
}

/* ==========================================================================
   ✨ [Part 5 고급 기능] 오이 클릭커 게임 핵심 상태 관리 데이터
   ========================================================================== */
var cucumberScore = 0;
var cucumbersPerSecond = 0;
var farmCost = 15;

/* ==========================================================================
   🖥️ 2. 핵심 글로벌 상태값 및 DOM 셀렉터 인스턴스화
   ========================================================================== */
var welcome = document.querySelector("#window");
var notetaker = document.querySelector("#notetaker");
var clickerWindow = document.querySelector("#clicker");
var select_bar = document.querySelector("#top");
var noteListContainer = document.querySelector("#noteList");
var notesContentContainer = document.querySelector("#notesContent");

var selected_icon = undefined;
var biggestIndex = 10; // 초기 z-index 레이어 기준점

/* ==========================================================================
   🎯 3. 완벽한 윈도우 정중앙 강제 배치 조율 모듈 (Center Spawn Engine - 버그 수정본)
   ========================================================================== */
function centerWindow(element) {
  if (!element) return;
  
  // 1. 숨겨진 윈도우 인스턴스의 픽셀 영역 추적을 위한 가시화 활성화 연산 처리
  var originalDisplay = element.style.display;
  element.style.display = "block";

  // 2. [중요] CSS 파일(.window)에 박혀있는 마진 및 이동 변형 속성이 좌표 계산을 방해하지 못하도록 강제 초기화
  element.style.margin = "0px";
  element.style.transform = "none";

  // 3. 뷰포트 영역 및 타겟 윈도우 박스 실시간 크기 측정
  var windowWidth = element.offsetWidth;
  var windowHeight = element.offsetHeight;
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;

  // 4. 동적 센터링 오프셋 공식 연산
  var centerLeft = (screenWidth - windowWidth) / 2;
  var centerTop = (screenHeight - windowHeight) / 2;

  // 5. 상단 시스템 메뉴 바(40px) 컴포넌트 밑으로 들어가도록 한계선 적용
  if (centerTop < 50) centerTop = 50;
  if (centerLeft < 0) centerLeft = 0;

  // 6. 스타일 시트에 절대값 픽셀 단위로 정확하게 주입
  element.style.position = "absolute";
  element.style.left = centerLeft + "px";
  element.style.top = centerTop + "px";

  // 7. 기존 display 상태값으로 원래대로 복원
  element.style.display = originalDisplay;
}


// 🚀 시스템 기동 즉시 배치 실행
centerWindow(welcome);
centerWindow(notetaker);
centerWindow(clickerWindow);

dragElement(welcome);
dragElement(notetaker);
dragElement(clickerWindow);


/* ==========================================================================
   🎛️ 4. 윈도우 코어 제어 레이어 (드래그, 깊이 레이어 관리)
   ========================================================================== */
function dragElement(element) {
  if (!element) return;
  var initialX = 0, initialY = 0, currentX = 0, currentY = 0;

  var header = document.getElementById(element.id + "header");
  if (header) {
    header.onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    
    // contenteditable 편집 구역 및 입력 폼 컴포넌트, 오이 클릭 타겟일 경우 드래그 무시 처리
    if (e.target.closest('[contenteditable="true"]') || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON' || e.target.id === 'bigCucumber') {
      return;
    }
    
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = moveElement;
    
    // 클릭 시 해당 창을 화면 전면으로 포커싱 레이어 업
    layer(element);
  }

  function moveElement(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// 실시간 시스템 시계 모듈 구동
function update_time(){
    var time = new Date().toLocaleString();
    var text = document.querySelector("#TIME");
    if(text) text.innerHTML = time;
}
setInterval(update_time, 1000);
update_time();

// 윈도우 창 레이어 흐름 제어 함수군
function open_window(element) {
  if(!element) return;
  element.style.display = "block";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  if(select_bar) select_bar.style.zIndex = biggestIndex + 1;
}

function close_window(element) {
  if(element) element.style.display = "none";
}

function select(element) {
  if(!element) return;
  element.classList.add("selected");
  selected_icon = element;
} 

function deselect(element) {
  if(!element) return;
  element.classList.remove("selected");
  selected_icon = undefined;
}

function layer(element) {
  if(!element) return;
  biggestIndex++;
  element.style.zIndex = biggestIndex;
}

// 바탕화면 앱 아이콘 원클릭 / 더블액션 라우터 트리거
function icon_tap(element){
    if (element.classList.contains("selected")) {
        var target_id = element.getAttribute("data-target"); 
        var target_window = document.getElementById(target_id); 
        if (target_window) {
            open_window(target_window);
        }
        deselect(element);
    } else {
        var prev = document.querySelector(".selected");
        if(prev) prev.classList.remove("selected");
        select(element);
    }
}

// 윈도우 본체 표면 마우스 다운 레이어 정렬 연동
if (welcome) welcome.addEventListener("mousedown", () => layer(welcome));
if (notetaker) notetaker.addEventListener("mousedown", () => layer(notetaker));
if (clickerWindow) clickerWindow.addEventListener("mousedown", () => layer(clickerWindow));

// 시스템 창 기능 버튼 리스너 바인딩
var welcome_close = document.querySelector("#close_welcome");
var welcome_open = document.querySelector("#open_welcome");
var notetaker_close = document.querySelector("#notetaker_close");
var clicker_close = document.querySelector("#clicker_close");

if(notetaker_close) notetaker_close.addEventListener("click", function(e) { e.stopPropagation(); close_window(notetaker); });
if(clicker_close) clicker_close.addEventListener("click", function(e) { e.stopPropagation(); close_window(clickerWindow); });
if(welcome_close) welcome_close.addEventListener("click", function(e) { e.stopPropagation(); close_window(welcome); });
if(welcome_open) welcome_open.addEventListener("click", function() { open_window(welcome); });


/* ==========================================================================
   📝 5. [앱 1] NoteTaker 제어 로직 (동적 바인딩 및 선택)
   ========================================================================== */
function set_note(index) {
  if (notesContentContainer && content[index]) {
    notesContentContainer.innerHTML = content[index].content;
    
    var items = document.querySelectorAll(".sidebar-note-item");
    items.forEach(function(item, idx) {
      if (idx === index) {
        item.style.backgroundColor = "#e2d1d1"; 
        item.style.borderLeft = "4px solid #cc7a7a";
        item.style.fontWeight = "bold";
      } else {
        item.style.backgroundColor = "white";
        item.style.borderLeft = "1px solid #ddd";
        item.style.fontWeight = "normal";
      }
    });
  }
}

function renderNoteSidebar() {
  if (!noteListContainer) return;
  noteListContainer.innerHTML = ""; 

  content.forEach(function(note, index) {
    var item = document.createElement("div");
    item.className = "sidebar-note-item";
    item.style.padding = "10px 12px";
    item.style.backgroundColor = "white";
    item.style.border = "1px solid #ddd";
    item.style.borderRadius = "8px";
    item.style.cursor = "pointer";
    item.style.fontSize = "13px";
    item.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
    item.style.display = "flex";
    item.style.flexDirection = "column";
    item.style.gap = "2px";

    item.innerHTML = `<div style="font-weight:600; color:#222; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${note.title}</div><div style="font-size:10px; color:#999;">${note.date}</div>`;
    
    item.addEventListener("click", function() {
      set_note(index);
    });
    noteListContainer.appendChild(item);
  });
}

/* ==========================================================================
   📝 5. [앱 1] NoteTaker 제어 로직 내부 (handleAddNote 함수 마무리 구간)
   ========================================================================== */
function handleAddNote() {
  var titleInput = document.querySelector("#newNoteTitle");
  var descInput = document.querySelector("#newNoteDesc");
  if(!titleInput || !descInput) return;
  
  var title = titleInput.value.trim();
  var desc = descInput.value.trim();
  if(title === "") { alert("Please enter a note title!"); return; }
  
  var today = new Date();
  var dateString = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();

  var newNote = {
    title: title,
    date: dateString,
    content: generateNoteHTML(title.toUpperCase(), dateString, desc || "No content written.")
  };

  content.push(newNote);
  titleInput.value = "";
  descInput.value = "";
  renderNoteSidebar();
  set_note(content.length - 1);
}

var addNoteBtn = document.querySelector("#addNoteBtn");
if(addNoteBtn) addNoteBtn.addEventListener("click", handleAddNote);


/* ==========================================================================
   ✨ 6. [앱 2] Cucumber Clicker 게임 엔진 구현 (Part 5 구조 연동)
   ========================================================================== */
var bigCucumberBtn = document.querySelector("#bigCucumber");
var buyFarmBtn = document.querySelector("#buyFarmBtn");
var scoreDisplay = document.querySelector("#scoreDisplay");
var cpsDisplay = document.querySelector("#cpsDisplay");
var farmCostDisplay = document.querySelector("#farmCostDisplay");

function updateClickerUI() {
  if (scoreDisplay) scoreDisplay.innerHTML = cucumberScore + " 🥒";
  if (cpsDisplay) cpsDisplay.innerHTML = "초당 생산량(CPS): " + cucumbersPerSecond;
  if (farmCostDisplay) farmCostDisplay.innerHTML = "비용: " + farmCost + " 🥒 (CPS +1)";
}

// 오이 수동 클릭 이벤트 매핑
if (bigCucumberBtn) {
  bigCucumberBtn.addEventListener("click", function() {
    cucumberScore += 1;
    updateClickerUI();
    
    // 오이 크기 햅틱 피드백 스케일 효과
    bigCucumberBtn.style.transform = "scale(0.85)";
    setTimeout(function() {
      bigCucumberBtn.style.transform = "scale(1)";
    }, 50);
  });
}

// 상점 업그레이드 농장(Farm) 구매 바인딩
if (buyFarmBtn) {
  buyFarmBtn.addEventListener("click", function() {
    if (cucumberScore >= farmCost) {
      cucumberScore -= farmCost;
      cucumbersPerSecond += 1;
      farmCost = Math.floor(farmCost * 1.5); // 비용 인플레이션 누적 증가율 설정
      updateClickerUI();
    } else {
      alert("오이(🥒)가 부족합니다! 거대 오이를 더 클릭하세요!");
    }
  });
}

// 자동 생산성 코어 루프 엔진 가동 (1000ms 주기)
setInterval(function() {
  if (cucumbersPerSecond > 0) {
    cucumberScore += cucumbersPerSecond;
    updateClickerUI();
  }
}, 1000);


/* ==========================================================================
   🎬 7. 시스템 초기 부팅 구동 절차
   ========================================================================== */
renderNoteSidebar();
if (content.length > 0) {
  set_note(0); 
}
updateClickerUI();
