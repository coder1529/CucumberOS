/* ==========================================================================
   💾 1. 데이터 모델 및 정형 템플릿 처리부
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

function generateNoteHTML(heading, dateString, bodyText) {
  return `
    <div style="background-color: #dfb0b0; border-radius: 12px; height: 100%; padding: 16px; font-family: Courier, monospace; box-sizing: border-box; display: flex; flex-direction: column; box-shadow: inset 0 0 10px rgba(0,0,0,0.05);">
        <div style="background-color: #f1c9c9; flex: 1; padding: 16px; border-radius: 16px; display: flex; flex-direction: column; overflow: hidden;">
            <p style="margin: 0px 0px 4px 0px; font-weight: bold; font-size: 16px; color: #333;">${heading}</p>
            <p style="font-size: 11px; margin: 0px 0px 12px 0px; color: #666;">📅 ${dateString}</p>
            <div style="overflow-y: auto; flex: 1; padding-right: 5px;">
                <div contenteditable="true" style="outline: none; min-height: 100%; line-height: 1.5; color: #111; user-select: text;">
                    ${bodyText}
                </div>
            </div>
        </div>
    </div>
  `;
}

/* ==========================================================================
   ✨ [상점 대확장] 오이 클릭커 게임 글로벌 상태 관리 데이터
   ========================================================================== */
var cucumberScore = 0;
var cucumbersPerSecond = 0;

// 아이템별 기본 비용 및 1개당 상승하는 CPS 스펙 정의
var farmCost = 15;
var farmCpsValue = 1;

var greenhouseCost = 100;
var greenhouseCpsValue = 8;

var labCost = 500;
var labCpsValue = 45;

var aiCost = 3000;
var aiCpsValue = 260;

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
var biggestIndex = 10; 

/* ==========================================================================
   🎯 3. 완벽한 윈도우 정중앙 강제 배치 조율 모듈 (Center Spawn Engine)
   ========================================================================== */
function centerWindow(element) {
  if (!element) return;
  
  // 숨겨진 요소의 픽셀 수치 계산을 위해 임시로 block 활성화
  var originalDisplay = element.style.display;
  element.style.display = "block";

  // CSS 마진 및 트랜스폼 스타일 간섭 차단 초기화
  element.style.margin = "0px";
  element.style.transform = "none";

  var windowWidth = element.offsetWidth;
  var windowHeight = element.offsetHeight;
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;

  var centerLeft = (screenWidth - windowWidth) / 2;
  var centerTop = (screenHeight - windowHeight) / 2;

  // 탑 바(40px) 충돌 보정
  if (centerTop < 50) centerTop = 50;
  if (centerLeft < 0) centerLeft = 0;

  element.style.position = "absolute";
  element.style.left = centerLeft + "px";
  element.style.top = centerTop + "px";

  // 상태 복원
  element.style.display = originalDisplay;
}

// 윈도우 드래그 바인딩 함수
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
    
    // 에디터 폼 필드나 클릭커 상점 버튼, 거대 오이를 누를 때는 드래그 비활성화 처리
    if (e.target.closest('[contenteditable="true"]') || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON' || e.target.id === 'bigCucumber') {
      return;
    }
    
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = moveElement;
    
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

// 실시간 시계
function update_time(){
    var time = new Date().toLocaleString();
    var text = document.querySelector("#TIME");
    if(text) text.innerHTML = time;
}
setInterval(update_time, 1000);
update_time();

// 윈도우 레이어 제어 프로토콜
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

// 아이콘 선택/더블 핸들러
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

if (welcome) welcome.addEventListener("mousedown", () => layer(welcome));
if (notetaker) notetaker.addEventListener("mousedown", () => layer(notetaker));
if (clickerWindow) clickerWindow.addEventListener("mousedown", () => layer(clickerWindow));

var welcome_close = document.querySelector("#close_welcome");
var welcome_open = document.querySelector("#open_welcome");
var notetaker_close = document.querySelector("#notetaker_close");
var clicker_close = document.querySelector("#clicker_close");

if(notetaker_close) notetaker_close.addEventListener("click", function(e) { e.stopPropagation(); close_window(notetaker); });
if(clicker_close) clicker_close.addEventListener("click", function(e) { e.stopPropagation(); close_window(clickerWindow); });
if(welcome_close) welcome_close.addEventListener("click", function(e) { e.stopPropagation(); close_window(welcome); });
if(welcome_open) welcome_open.addEventListener("click", function() { open_window(welcome); });


/* ==========================================================================
   📝 4. [앱 1] NoteTaker 목록 동적 드로잉 제어 로직
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
    item.style.boxSizing = "border-box";

    item.innerHTML = `<div style="font-weight:600; color:#222; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${note.title}</div><div style="font-size:10px; color:#999;">${note.date}</div>`;
    
    item.addEventListener("click", function() {
      set_note(index);
    });
    noteListContainer.appendChild(item);
  });
}

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
   ✨ 5. [앱 2] Cucumber Clicker 확장팩 상점 엔진 구현 (4종 아이템 연동)
   ========================================================================== */
var bigCucumberBtn = document.querySelector("#bigCucumber");
var scoreDisplay = document.querySelector("#scoreDisplay");
var cpsDisplay = document.querySelector("#cpsDisplay");

// 이미지 속 선언과 정확히 일치하도록 변수명 버그 수정 및 동형 매핑
var buyFarmBtn = document.querySelector("#buyFarmBtn");
var buyGreenhouseBtn = document.querySelector("#buyGreenhouseBtn");
var buyLabBtnBtn = document.querySelector("#buyLabBtn"); // 🧪 LabBtn 수정
var buyAiBtnBtn = document.querySelector("#buyAiBtn");   // 🤖 AiBtn 수정

// 비용 노출 레이블 디스플레이 셀렉터 매핑
var farmCostDisplay = document.querySelector("#farmCostDisplay");
var greenhouseCostDisplay = document.querySelector("#greenhouseCostDisplay");
var labCostDisplay = document.querySelector("#labCostDisplay");
var aiCostDisplay = document.querySelector("#aiCostDisplay");

// 4종 상점 인플레이션 UI 동기화 함수
function updateClickerUI() {
  if (scoreDisplay) scoreDisplay.innerHTML = cucumberScore + " 🥒";
  if (cpsDisplay) cpsDisplay.innerHTML = "초당 생산량(CPS): " + cucumbersPerSecond;
  
  if (farmCostDisplay) farmCostDisplay.innerHTML = "비용: " + farmCost + " 🥒 (+" + farmCpsValue + " CPS)";
  if (greenhouseCostDisplay) greenhouseCostDisplay.innerHTML = "비용: " + greenhouseCost + " 🥒 (+" + greenhouseCpsValue + " CPS)";
  if (labCostDisplay) labCostDisplay.innerHTML = "비용: " + labCost + " 🥒 (+" + labCpsValue + " CPS)";
  if (aiCostDisplay) aiCostDisplay.innerHTML = "비용: " + aiCost + " 🥒 (+" + aiCpsValue + " CPS)";
}

// 오이 수동 마우스 클릭 이벤트
if (bigCucumberBtn) {
  bigCucumberBtn.addEventListener("click", function() {
    cucumberScore += 1;
    updateClickerUI();
    bigCucumberBtn.style.transform = "scale(0.85)";
    setTimeout(function() { bigCucumberBtn.style.transform = "scale(1)"; }, 50);
  });
}

// [업그레이드 1] 농장 구매
if (buyFarmBtn) {
  buyFarmBtn.addEventListener("click", function() {
    if (cucumberScore >= farmCost) {
      cucumberScore -= farmCost;
      cucumbersPerSecond += farmCpsValue;
      farmCost = Math.floor(farmCost * 1.5); 
      updateClickerUI();
    } else {
      alert("오이(🥒)가 부족합니다! 농장을 구매할 수 없습니다.");
    }
  });
}

// [업그레이드 2] 온실 구매
if (buyGreenhouseBtn) {
  buyGreenhouseBtn.addEventListener("click", function() {
    if (cucumberScore >= greenhouseCost) {
      cucumberScore -= greenhouseCost;
      cucumbersPerSecond += greenhouseCpsValue;
      greenhouseCost = Math.floor(greenhouseCost * 1.5); 
      updateClickerUI();
    } else {
      alert("오이(🥒)가 부족합니다! 온실을 구매할 수 없습니다.");
    }
  });
}

// [업그레이드 3] 유전공학 연구소 구매 (수정된 변수명 적용)
if (buyLabBtnBtn) {
  buyLabBtnBtn.addEventListener("click", function() {
    if (cucumberScore >= labCost) {
      cucumberScore -= labCost;
      cucumbersPerSecond += labCpsValue;
      labCost = Math.floor(labCost * 1.5); 
      updateClickerUI();
    } else {
      alert("오이(🥒)가 부족합니다! 연구소를 구매할 수 없습니다.");
    }
  });
}

// [업그레이드 4] 오이 AI 메인프레임 구매 (수정된 변수명 적용)
if (buyAiBtnBtn) {
  buyAiBtnBtn.addEventListener("click", function() {
    if (cucumberScore >= aiCost) {
      cucumberScore -= aiCost;
      cucumbersPerSecond += aiCpsValue;
      aiCost = Math.floor(aiCost * 1.5); 
      updateClickerUI();
    } else {
      alert("오이(🥒)가 부족합니다! Cucumber AI를 구동할 수 없습니다.");
    }
  });
}

// 오이 자동 획득 초당 루틴 처리 (1000ms 회전)
setInterval(function() {
  if (cucumbersPerSecond > 0) {
    cucumberScore += cucumbersPerSecond;
    updateClickerUI();
  }
}, 1000);


/* ==========================================================================
   🎬 6. 즉시 부팅 및 강제 센터링 시동 초기화
   ========================================================================== */
window.onload = function() {
  centerWindow(welcome);
  centerWindow(notetaker);
  centerWindow(clickerWindow);
  
  dragElement(welcome);
  dragElement(notetaker);
  dragElement(clickerWindow);

  renderNoteSidebar();
  if (content.length > 0) {
    set_note(0); 
  }
  updateClickerUI();
};