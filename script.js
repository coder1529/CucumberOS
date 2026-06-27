var content = [
  {
    title: "Welcome!",
    date: "2026/6/12",
    content: generate_note("Hi! Start Writing!", "2025/6/12", "Start Writing Here!")
  },
  {
    title: "Project List",
    date: "2026/6/12",
    content: generate_note("Project List", "2026/6/12", "Project #1: X<br>Project #2: XX<br>Project #3: XXX")
  }
];

function generate_note(heading, date, content){
  return `
  <div class = "first_div">
    <div class = "second_div>
      <p class = "heading_style">${heading}</p>
      <p class = "date_style">${date}</p>
      <div class = "not_style_set">
        <div contenteditable = "true" class = "note_style">
        ${content}
        </div>
      </div>
    </div>
  </div>
  `;
}

const default_cursor = document.getElementById('default_cursor');
const pointer_cursor = document.getElementById('pointer_cursor');
const crosshair_cursor = document.getElementById('crosshair_cursor');

var cucumbers = 0;
var cucumbers_auto_ps = 0;
var cucumber_farm_cost = 15;
var cucumber_farm_cps = 1;
var cucumber_greenhouse_cost = 100;
var cucumber_greenhouse_cps = 10;
var cucumber_lab_cost = 250;
var cucumber_lab_cps = 50;
var cucumber_ai_cost = 1000;
var cucumber_ai_cps = 1500;
var OS = document.querySelector("#OS")
var welcome_window = document.querySelector("#window");
var notetaker_window = document.querySelector("#notetaker");
var clicker_window = document.querySelector("#clicker");
var cursor_changer_window = document.querySelector("#CursorChanger");
var background_settings_window = document.querySelector("#backgroundsetting")
var terminal_window = document.querySelector("#terminal")
var screentime_window = document.querySelector("#screentime")
var select_bar = document.querySelector("#top");
var note_list_container = document.querySelector("#noteList");
var note_contents_container = document.querySelector("#notesContent");
let notetakerOpen = false;
let clickerOpen = false;
let ccOpen = false;
let bsOpen = false;
let tOpen = false;
var drag_d_e = true;
var drag_p_e = false;
var drag_c_e = false;
var selected_icon = undefined;
var biggest_index = 10;
var cpc = 1;

//copy pasted from the website that stardance provided: https://jams.hackclub.com/batch/webOS/part-3
function center_window(element){
  if(!element){
    return;
  }
  var original_display = element.style.display;
  element.style.display = "block";
  element.style.margin = "0px";
  element.style.transform = "none";
  var window_width = element.offsetWidth;
  var window_height = element.offsetHeight;
  var screen_width = window.innerWidth;
  var screen_height = window.innerHeight;
  var center_left = (screen_width - window_width) / 2;
  var center_top = (screen_height - window_height) / 2;
  if(center_top < 50){
    center_top = 50;
  }
  if(center_top < 0){
    center_top = 0;
  }
  element.style.position = "absolute";
  element.style.left = "center_left" + "px";
  element.style.top = "center_top" + "px";
  element.style.display = original_display;
}

function drag_element(element){
  if(!element){
    return;
  }
  var initial_x = 0, initial_y = 0; current_x = 0; current_y = 0;
  var header = document.getElementById(element.id + "header");
  if(header){
    header.onmousedown = startDragging;
  }
  else {
    element.onmousedown = startDragging;
  }
}

// Step 1: Define a function called `drag_element` that makes an HTML element draggable.
function drag_element(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDrag_element`).
    document.onmouseup = stopDragging;
    document.onmousemove = drag_element;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function drag_element(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
} //end of copy paste

function update_time(){
  var time = new Date().toLocaleString();
  var text = document.querySelector("#TIME");
  if(text){
    text.innerHTML = time;
  }
}

setInterval(update_time, 1000);
update_time()

var notetaker_total_time = 0
var clicker_total_time = 0
var cc_total_time = 0
var bs_total_time = 0
var t_total_time = 0
var NTtime = document.querySelector("#NTtime")
var Ctime = document.querySelector("#Ctime")
var CCtime = document.querySelector("#CCtime")
var BStime = document.querySelector("#BStime")
var TLtime = document.querySelector("#TLtime")

function open_window(element){
  if(!element){
    return;
  }
  element.style.display = "block";
  biggest_index++;
  if(select_bar) select_bar.zIndex = biggest_index + 1;
  layer(element)
  if(element == notetaker_window){
      if(!notetakerOpen){
          notetaker_start_time = new Date()
          notetakerOpen = true;
      }
  }
  if(element == clicker_window){
      if(!clickerOpen){
          clicker_start_time = new Date()
          clickerOpen = true;
      }
  }
  if(element == cursor_changer_window){
      if(!ccOpen){
          cc_start_time = new Date()
          ccOpen = true;
      }
  }
  if(element == background_settings_window){
      if(!bsOpen){
          bs_start_time = new Date()
          bsOpen = true;
      }
  }
  if(element == terminal_window){
      if(!tOpen){
          t_start_time = new Date()
          tOpen = true;
      }
  }
}

function close_window(element){
  if(element){
    element.style.display = "none";
  }
  if(element == notetaker_window){
      if(notetakerOpen){
          notetaker_total_time += new Date() - notetaker_start_time;
          notetakerOpen = false;
      }
  }
  if(element == clicker_window){
      if(clickerOpen){
          clicker_total_time += new Date() - clicker_start_time;
          clickerOpen = false;
      }
  }
  if(element == cursor_changer_window){
      if(ccOpen){
          cc_total_time += new Date() - cc_start_time;
          ccOpen = false;
      }
  }
  if(element == background_settings_window){
      if(bsOpen){
          bs_total_time += new Date() - bs_start_time;
          bsOpen = false;
      }
  }
  if(element == terminal_window){
      if(tOpen){
          t_total_time += new Date() - t_start_time;
          tOpen = false;
      }
  }
}

function update_NTtime() {
    let total = notetaker_total_time;

    if (notetakerOpen) {
        total += new Date() - notetaker_start_time;
    }

    let seconds = Math.floor(total / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds %= 60;
    minutes %= 60;

    // NTtime.innerHTML
    NTtime.innerHTML =
        "<br>" +
        hours + "h " +
        minutes + "m " +
        seconds + "s";
}

function update_Ctime() {
    let total = clicker_total_time;

    if (clickerOpen) {
        total += new Date() - clicker_start_time;
    }

    let seconds = Math.floor(total / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds %= 60;
    minutes %= 60;

    // NTtime.innerHTML
    Ctime.innerHTML =
        "<br>" +
        hours + "h " +
        minutes + "m " +
        seconds + "s";
}

function update_CCtime() {
    let total = cc_total_time;

    if (ccOpen) {
        total += new Date() - cc_start_time;
    }

    let seconds = Math.floor(total / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds %= 60;
    minutes %= 60;

    // NTtime.innerHTML
    CCtime.innerHTML =
        "<br>" +
        hours + "h " +
        minutes + "m " +
        seconds + "s";
}

function update_BStime() {
    let total = bs_total_time;

    if (bsOpen) {
        total += new Date() - bs_start_time;
    }

    let seconds = Math.floor(total / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds %= 60;
    minutes %= 60;

    // NTtime.innerHTML
    BStime.innerHTML =
        "<br>" +
        hours + "h " +
        minutes + "m " +
        seconds + "s";
}

function update_TLtime() {
    let total = t_total_time;

    if (tOpen) {
        total += new Date() - t_start_time;
    }

    let seconds = Math.floor(total / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds %= 60;
    minutes %= 60;

    // NTtime.innerHTML
    TLtime.innerHTML =
        "<br>" +
        hours + "h " +
        minutes + "m " +
        seconds + "s";
}

setInterval(update_NTtime, 1000);
setInterval(update_Ctime, 1000);
setInterval(update_CCtime, 1000);
setInterval(update_BStime, 1000);
setInterval(update_TLtime, 1000);

function select_element(element){
  if(!element){
    return;
  }
  element.classList.add("selected");
  selected_icon = element;
}

function deselect_element(element){
  if(!element){
    return;
  }
  element.classList.remove("selected");
  selected_icon = undefined;
}

function layer(element){
  if(!element){
    return;
  }
  biggest_index++;
  element.style.zIndex = biggest_index;
}

function icon_tap(element){
  if(element.classList.contains("selected")){
    var target_id = element.getAttribute("data-target");
    var target_window = document.getElementById(target_id);
    if(target_window){
      open_window(target_window);
    }
    deselect_element(element);
  }
  else{
    var prev = document.querySelector(".selected");
    if(prev){
      prev.classList.remove("selected");
    }
    select_element(element);
  }
}

if (welcome_window) welcome_window.addEventListener("mousedown", () => layer(welcome_window));

if (notetaker_window) notetaker_window.addEventListener("mousedown", () => layer(notetaker_window));

if (clicker_window) clicker_window.addEventListener("mousedown", () => layer(clicker_window));

if (cursor_changer_window) cursor_changer_window.addEventListener("mousedown", () => layer(cursor_changer_window));

if (background_settings_window) background_settings_window.addEventListener("mousedown", () => layer(background_settings_window));

if(terminal_window) terminal_window.addEventListener("mousedown", () => layer(terminal_window));

if(screentime_window) screentime_window.addEventListener("mousedown", () => layer(screentime_window));

var welcome_close = document.querySelector("#close_welcome");
var welcome_open = document.querySelector("#open_welcome");
var notetaker_close = document.querySelector("#notetaker_close");
var clicker_close = document.querySelector("#clicker_close");
var cursor_changer_close = document.querySelector("#CursorChanger_close");
var background_settings_close = document.querySelector("#backgroundsetting_close")
var terminal_close = document.querySelector("#close_terminal")
var screentime_close = document.querySelector("#close_screentime")

if(notetaker_close){
  notetaker_close.addEventListener("click", function(e){e.stopPropagation(); close_window(notetaker_window);});
}

if(clicker_close){
  clicker_close.addEventListener("click", function(e){e.stopPropagation(); close_window(clicker_window)});
}

if(welcome_close){
  welcome_close.addEventListener("click", function(e){e.stopPropagation(); close_window(welcome_window)});
}

if(welcome_open){
  welcome_open.addEventListener("click", function(){open_window(welcome_window);});
}

if(cursor_changer_close){
  cursor_changer_close.addEventListener("click", function(e){e.stopPropagation(); close_window(cursor_changer_window)});
}

if(background_settings_close){
  background_settings_close.addEventListener("click", function(e){e.stopPropagation(); close_window(background_settings_window)});
}

if(terminal_close){
  terminal_close.addEventListener("click", function(e){e.stopPropagation(); close_window(terminal_window)});
}

if(screentime_close){
  screentime_close.addEventListener("click", function(e){e.stopPropagation(); close_window(screentime_window)});
}

function set_note_up(index){
  if(note_contents_container && content[index]){
    note_contents_container.innerHTML = content[index].content;
    var items = document.querySelectorAll(".sidebar-note-item");
    items.forEach(function(item, idx){
      if(idx === index){
        item.style.backgroundColor = "#e2d1d1";
        item.style.borderLeft = "4px solid #cc7a7a";
        item.style.fontWeight = "bold";
      }
      else{
        item.style.backgroundColor = "white";
        item.style.borderLeft = "1px solid #ddd";
        item.style.fontWeight = "normal";
      }
    });
  }
}

function render_note_sidebar(){
  if(!note_list_container) return;
  note_list_container.innerHTML="";
  content.forEach(function(note, index){
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
    item.innerHTML = `<div style = "font-weight: 600; color: #222; text-overflow: "ellipsis; overflow: hidden; white-space: nowrap;">${note.title}</div>`;
    item.addEventListener("click", function(){
      set_note_up(index);
    });
    note_list_container.appendChild(item);
  });
}

function handle_add_note() {
  var titleInput = document.querySelector("#newNoteTitle");
  var descInput = document.querySelector("#newNoteDesc");
  if(!titleInput || !descInput){
    return;
  }
  var title = titleInput.value.trim();
  var desc = descInput.value.trim();
  if(title === "") { alert("Please enter a note title!"); return; }
  var today = new Date();
  var dateString = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
  var newNote = {
  title: title,
  date: dateString,
  content: generate_note(title.toUpperCase(), dateString, desc || "No content written.")
  };
  content.push(newNote);
  titleInput.value = "";
  descInput.value = "";
  render_note_sidebar();
  set_note_up(content.length - 1);
}

var addNoteBtn = document.querySelector("#addNoteBtn");

if(addNoteBtn){
  addNoteBtn.addEventListener("click", handle_add_note);
}

var big_cucumber_button = document.querySelector("#bigCucumber");
var score_display = document.querySelector("#scoreDisplay");
var cps_display = document.querySelector("#cpsDisplay");

var buy_farm_button = document.querySelector("#buyFarmBtn");
var buy_green_house_button = document.querySelector("#buyGreenhouseBtn");
var buy_lab_button = document.querySelector("#buyLabBtn");
var buy_ai_button = document.querySelector("#buyAiBtn");

var farm_cost_display = document.querySelector("#farmCostDisplay");
var greenhouse_cost_display = document.querySelector("#greenhouseCostDisplay");
var lab_cost_display = document.querySelector("#labCostDisplay");
var ai_cost_display = document.querySelector("#aiCostDisplay");

var default_cursor_button = document.querySelector("#default_cursor_btn");
var pointer_cursor_button = document.querySelector("#pointer_cursor_btn");
var crosshair_cursor_button = document.querySelector("#crosshair_cursor_btn");

function update_ui(){
  if(score_display){
    score_display.innerHTML = "🥒 " + cucumbers + " 🥒";
  }
  if(cps_display){
    cps_display.innerHTML = "Cucumbers Per Second:" + cucumbers_auto_ps;
  }
  if(farm_cost_display){
    farm_cost_display.innerHTML = "Cost: " + cucumber_farm_cost + " 🥒 : +" + cucumber_farm_cps + "CPS";
  }
  if(greenhouse_cost_display){
    greenhouse_cost_display.innerHTML = "Cost: " + cucumber_greenhouse_cost + " 🥒 : +" + cucumber_greenhouse_cps + "CPS";
  }
  if(lab_cost_display){
    lab_cost_display.innerHTML = "Cost: " + cucumber_lab_cost + " 🥒 : +" + cucumber_lab_cps + "CPS";
  }
  if(ai_cost_display){
    ai_cost_display.innerHTML = "Cost: " + cucumber_ai_cost + " 🥒 : +" + cucumber_ai_cps + "CPS";
  }
}

setInterval(function() {
  if (cucumbers_auto_ps > 0) {
    cucumbers += cucumbers_auto_ps;
    update_ui();
  }
}, 1000);

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const previewImage = document.getElementById('preview-image');

dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  handleImageFile(file);
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');

  const file = e.dataTransfer.files[0];
  handleImageFile(file);
});

function handleImageFile(file) {
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImage.src = e.target.result;
      previewImage.style.display = 'block';
      document.body.style.backgroundImage = `url('${e.target.result}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    }
    reader.readAsDataURL(file);

  } else {
    alert('Please select or drop a valid image file.');
  }
}

document.addEventListener("DOMContentLoaded", () => {
    const terminalContainer = document.getElementById("terminal-type");

    terminalContainer.addEventListener("keydown", (event) => {
        if (event.target.classList.contains("terminal-input") && event.key === "Enter") {
            const currentInput = event.target;
            const userInputText = currentInput.value.trim();

            if (userInputText !== "") {
                console.log(userInputText);
            }

            if (userInputText == "/help"){
              const output = document.createElement("div");
              output.innerHTML = `
                      <span class="prompt" style="background-color: #232323; color: greenyellow; border: #232323; white-space: pre;">Commands:<br>&#9;/help: shows all commands<br>&#9;/killAll: kills all windows<br>&#9;/open {user_input}: opens a window with that name<br>&#9;/openAll: opens all windows<br>&#9;/endOS: closes the OS
                      </span>
                      <input type="text" class="terminal-input" style="background-color: #232323; color: greenyellow; border: #232323" autofocus>
              `;
              terminalContainer.appendChild(output);
            }

            if (userInputText == "/killAll"){
              close_window(welcome_window)
              close_window(notetaker_window)
              close_window(clicker_window)
              close_window(cursor_changer_window)
              close_window(background_settings_window)
              close_window(screentime_window)
              const output = document.createElement("div");
              output.innerHTML = `
                      <span class="prompt" style="background-color: #232323; color: greenyellow; border: #232323; white-space: pre;">Killed all windows
                      </span>
                      <input type="text" class="terminal-input" style="background-color: #232323; color: greenyellow; border: #232323" autofocus>
              `;
              terminalContainer.appendChild(output);
            }

            if (userInputText.startsWith("/open ")) {
                const windowName = userInputText.split("/open ")[1].trim();
                if (windowName === "welcome") {
                    open_window(welcome_window)
                    outputText = `Opened ${windowName} window`;
                    const output = document.createElement("div");
                    output.innerHTML = `
                            <span class="prompt" style="background-color: #232323; color: greenyellow; border: #232323; white-space: pre;">Opened welcome
                            </span>
                            <input type="text" class="terminal-input" style="background-color: #232323; color: greenyellow; border: #232323" autofocus>
                    `;
                    terminalContainer.appendChild(output);
                } else if (windowName === "notetaker") {
                    open_window(notetaker_window)
                    outputText = `Opened ${windowName} window`;
                    const output = document.createElement("div");
                    output.innerHTML = `
                            <span class="prompt" style="background-color: #232323; color: greenyellow; border: #232323; white-space: pre;">Opened NoteTaker
                            </span>
                            <input type="text" class="terminal-input" style="background-color: #232323; color: greenyellow; border: #232323" autofocus>
                    `;
                    terminalContainer.appendChild(output);
                } else if (windowName === "clicker") {
                    open_window(clicker_window);
                    outputText = `Opened ${windowName} window`;
                    const output = document.createElement("div");
                    output.innerHTML = `
                            <span class="prompt" style="background-color: #232323; color: greenyellow; border: #232323; white-space: pre;">Opened Cucumber Clicker
                            </span>
                            <input type="text" class="terminal-input" style="background-color: #232323; color: greenyellow; border: #232323" autofocus>
                    `;
                    terminalContainer.appendChild(output);
                } else if (windowName === "cursor_changer") {
                    open_window(cursor_changer_window);
                    outputText = `Opened ${windowName} window`;
                    const output = document.createElement("div");
                    output.innerHTML = `
                            <span class="prompt" style="background-color: #232323; color: greenyellow; border: #232323; white-space: pre;">Opened Cursor Change
                            </span>
                            <input type="text" class="terminal-input" style="background-color: #232323; color: greenyellow; border: #232323" autofocus>
                    `;
                    terminalContainer.appendChild(output);
                } else if (windowName === "background") {
                    open_window(background_settings_window);
                    outputText = `Opened ${windowName} window`;
                    const output = document.createElement("div");
                    output.innerHTML = `
                            <span class="prompt" style="background-color: #232323; color: greenyellow; border: #232323; white-space: pre;">Opened Background Settings
                            </span>
                            <input type="text" class="terminal-input" style="background-color: #232323; color: greenyellow; border: #232323" autofocus>
                    `;
                    terminalContainer.appendChild(output);
                } else if (windowName === "screentime"){
                    open_window(screentime_window);
                    outputText = `Opened ${windowName} window`;
                    const output = document.createElement("div");
                    output.innerHTML = `
                            <span class="prompt" style="background-color: #232323; color: greenyellow; border: #232323; white-space: pre;">Opened Screentime
                            </span>
                            <input type="text" class="terminal-input" style="background-color: #232323; color: greenyellow; border: #232323" autofocus>
                    `;
                    terminalContainer.appendChild(output);
                } else {
                    outputText = `Unknown window: ${windowName}`;
                    const output = document.createElement("div");
                    output.innerHTML = `
                            <span class="prompt" style="background-color: #232323; color: greenyellow; border: #232323; white-space: pre;">Unknown window<br>Do you mean:<br>   /open welcome: opens welcome window<br>   /open notetaker: opens notetaker window<br>   /open clicker: opens clicker window<br>   /open cursor_changer: opens cursor changer window<br>   /open background: opens background settings window<br>   /open screentime: opens screentime window
                            </span>
                            <input type="text" class="terminal-input" style="background-color: #232323; color: greenyellow; border: #232323" autofocus>
                    `;
                    terminalContainer.appendChild(output);
                }
            }

            if(userInputText == "/openAll"){
              open_window(welcome_window);
              open_window(notetaker_window);
              open_window(clicker_window);
              open_window(cursor_changer_window);
              open_window(background_settings_window);
              open_window(screentime_window)
              const output = document.createElement("div");
              output.innerHTML = `
                      <span class="prompt" style="background-color: #232323; color: greenyellow; border: #232323; white-space: pre;">Opened all windows
                      </span>
                      <input type="text" class="terminal-input" style="background-color: #232323; color: greenyellow; border: #232323" autofocus>
              `;
              terminalContainer.appendChild(output);
            }

            if(userInputText == "/endOS"){
              window.close()
            }

            const immutableSpan = document.createElement("span");
            immutableSpan.className = "immutable-text";
            immutableSpan.innerText = currentInput.value;

            currentInput.parentNode.replaceChild(immutableSpan, currentInput);

            createNewRow(terminalContainer);
        }
    });
});

function createNewRow(container) {
    const newRow = document.createElement("div");
    newRow.className = "terminal-row";
    newRow.innerHTML = `
            <span class="prompt" style="background-color: #232323; color: greenyellow; border: #232323">></span>
            <input type="text" class="terminal-input" style="background-color: #232323; color: greenyellow; border: #232323" autofocus>
    `;
    container.appendChild(newRow);
    newRow.querySelector(".terminal-input").focus();
}

starttime = new Date()

function update_screentime(){
  var now = new Date();
  var diff = now - starttime;

  var seconds = Math.floor(diff / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);

  seconds %= 60;
  minutes %= 60;

  Ttime.innerHTML =
    "<br>" +
    hours + "h " +
    minutes + "m " +
    seconds + "s";
}

setInterval(update_screentime, 1000);

var drag_d = document.querySelector("#drag_default")
var drag_p = document.querySelector("#drag_pointer")
var drag_c = document.querySelector("#drag_crosshair")
var notetakerheader = document.querySelector("#notetakerheader")
var clickerheader = document.querySelector("#clickerheader")
var ccheader = document.querySelector("#CursorChangerheader")
var bsheader = document.querySelector("#backgroundsettingheader")
var tlheader = document.querySelector("#terminalheader")
var screentimeheader = document.querySelector("#screentimeheader")

if(notetakerheader){
  notetakerheader.addEventListener("pointerdown", function(e){e.stopPropagation(); if(drag_d_e){default_cursor.style.display = "none"; drag_d.style.display = "block";} if(drag_p_e){pointer_cursor.style.display = "none"; drag_p.style.display = "block";} if(drag_c_e){crosshair_cursor.style.display = "none"; drag_c.style.display = "block";}});
}

if(notetakerheader){
  notetakerheader.addEventListener("pointerup", function(e){e.stopPropagation(); if(drag_d_e){default_cursor.style.display = "block"; drag_d.style.display = "none"; } if(drag_p_e){pointer_cursor.style.display = "block"; drag_p.style.display = "none"; } if(drag_c_e){crosshair_cursor.style.display = "block"; drag_c.style.display = "none"; }});
}
//
if(welcome_window){
  welcome_window.addEventListener("pointerdown", function(e){e.stopPropagation(); if(drag_d_e){default_cursor.style.display = "none"; drag_d.style.display = "block";} if(drag_p_e){pointer_cursor.style.display = "none"; drag_p.style.display = "block";} if(drag_c_e){crosshair_cursor.style.display = "none"; drag_c.style.display = "block";}});
}

if(welcome_window){
  welcome_window.addEventListener("pointerup", function(e){e.stopPropagation(); if(drag_d_e){default_cursor.style.display = "block"; drag_d.style.display = "none"; } if(drag_p_e){pointer_cursor.style.display = "block"; drag_p.style.display = "none"; } if(drag_c_e){crosshair_cursor.style.display = "block"; drag_c.style.display = "none"; }});
}
//
if(clickerheader){
  clickerheader.addEventListener("pointerdown", function(e){e.stopPropagation(); if(drag_d_e){default_cursor.style.display = "none"; drag_d.style.display = "block";} if(drag_p_e){pointer_cursor.style.display = "none"; drag_p.style.display = "block";} if(drag_c_e){crosshair_cursor.style.display = "none"; drag_c.style.display = "block";}});
}

if(clickerheader){
  clickerheader.addEventListener("pointerup", function(e){e.stopPropagation(); if(drag_d_e){default_cursor.style.display = "block"; drag_d.style.display = "none"; } if(drag_p_e){pointer_cursor.style.display = "block"; drag_p.style.display = "none"; } if(drag_c_e){crosshair_cursor.style.display = "block"; drag_c.style.display = "none"; }});
}
//
if(ccheader){
  ccheader.addEventListener("pointerdown", function(e){e.stopPropagation(); if(drag_d_e){default_cursor.style.display = "none"; drag_d.style.display = "block";} if(drag_p_e){pointer_cursor.style.display = "none"; drag_p.style.display = "block";} if(drag_c_e){crosshair_cursor.style.display = "none"; drag_c.style.display = "block";}});
}

if(ccheader){
  ccheader.addEventListener("pointerup", function(e){e.stopPropagation(); if(drag_d_e){default_cursor.style.display = "block"; drag_d.style.display = "none"; } if(drag_p_e){pointer_cursor.style.display = "block"; drag_p.style.display = "none"; } if(drag_c_e){crosshair_cursor.style.display = "block"; drag_c.style.display = "none"; }});
}
//
if(bsheader){
  bsheader.addEventListener("pointerdown", function(e){e.stopPropagation(); if(drag_d_e){default_cursor.style.display = "none"; drag_d.style.display = "block";} if(drag_p_e){pointer_cursor.style.display = "none"; drag_p.style.display = "block";} if(drag_c_e){crosshair_cursor.style.display = "none"; drag_c.style.display = "block";}});
}

if(bsheader){
  bsheader.addEventListener("pointerup", function(e){e.stopPropagation(); if(drag_d_e){default_cursor.style.display = "block"; drag_d.style.display = "none"; } if(drag_p_e){pointer_cursor.style.display = "block"; drag_p.style.display = "none"; } if(drag_c_e){crosshair_cursor.style.display = "block"; drag_c.style.display = "none"; }});
}
//
if(tlheader){
  tlheader.addEventListener("pointerdown", function(e){e.stopPropagation(); if(drag_d_e){default_cursor.style.display = "none"; drag_d.style.display = "block";} if(drag_p_e){pointer_cursor.style.display = "none"; drag_p.style.display = "block";} if(drag_c_e){crosshair_cursor.style.display = "none"; drag_c.style.display = "block";}});
}

if(tlheader){
  tlheader.addEventListener("pointerup", function(e){e.stopPropagation(); if(drag_d_e){default_cursor.style.display = "block"; drag_d.style.display = "none"; } if(drag_p_e){pointer_cursor.style.display = "block"; drag_p.style.display = "none"; } if(drag_c_e){crosshair_cursor.style.display = "block"; drag_c.style.display = "none"; }});
}
//
if(screentimeheader){
  screentimeheader.addEventListener("pointerdown", function(e){e.stopPropagation(); if(drag_d_e){default_cursor.style.display = "none"; drag_d.style.display = "block";} if(drag_p_e){pointer_cursor.style.display = "none"; drag_p.style.display = "block";} if(drag_c_e){crosshair_cursor.style.display = "none"; drag_c.style.display = "block";}});
}

if(screentimeheader){
  screentimeheader.addEventListener("pointerup", function(e){e.stopPropagation(); if(drag_d_e){default_cursor.style.display = "block"; drag_d.style.display = "none"; } if(drag_p_e){pointer_cursor.style.display = "block"; drag_p.style.display = "none"; } if(drag_c_e){crosshair_cursor.style.display = "block"; drag_c.style.display = "none"; }});
}
//

window.onload = function() {
  // center_window(welcome_window);
  // center_window(notetaker_window);
  // center_window(clicker_window);
  drag_element(welcome_window);
  drag_element(notetaker_window);
  drag_element(clicker_window);
  drag_element(cursor_changer_window);
  drag_element(background_settings_window)
  drag_element(terminal_window)
  drag_element(screentime_window)
  render_note_sidebar();

  default_cursor.style.display = "block";
  //   drag_d.style.display = "block"

  document.addEventListener('mousemove', (e) => {
      default_cursor.style.left = `${e.pageX}px`;
      default_cursor.style.top = `${e.pageY}px`;
  });

  document.addEventListener('mousemove', (e) => {
      pointer_cursor.style.left = `${e.pageX}px`;
      pointer_cursor.style.top = `${e.pageY}px`;
  });

  document.addEventListener('mousemove', (e) => {
      crosshair_cursor.style.left = `${e.pageX}px`;
      crosshair_cursor.style.top = `${e.pageY}px`;
  });

  document.addEventListener('mousemove', (e) => {
    drag_d.style.left = `${e.pageX}px`;
    drag_d.style.top = `${e.pageY}px`;
  });

  document.addEventListener('mousemove', (e) => {
    drag_p.style.left = `${e.pageX}px`;
    drag_p.style.top = `${e.pageY}px`;
  });

  document.addEventListener('mousemove', (e) => {
    drag_c.style.left = `${e.pageX}px`;
    drag_c.style.top = `${e.pageY}px`;
  });


  default_cursor_button.addEventListener("click", function(){
    default_cursor.style.display = "block";
    drag_d_e = true;
    drag_p_e = false;
    drag_c_e = false;
    pointer_cursor.style.display = "none";
    crosshair_cursor.style.display = "none";
  }
  );
  pointer_cursor_button.addEventListener("click", function(){
    default_cursor.style.display = "none";
    drag_d_e = false;
    drag_p_e = true;
    drag_c_e = false;
    pointer_cursor.style.display = "block";
    crosshair_cursor.style.display = "none";
  }
  );
  crosshair_cursor_button.addEventListener("click", function(){
    default_cursor.style.display = "none";
    drag_d_e = false;
    drag_p_e = false;
    drag_c_e = true;
    pointer_cursor.style.display = "none";
    crosshair_cursor.style.display = "block";
  }
  );

  buy_farm_button.addEventListener("click", function(){
    if(cucumbers >= cucumber_farm_cost){
      cucumbers -= cucumber_farm_cost;
      cucumbers_auto_ps += cucumber_farm_cps;
      cucumber_farm_cost = Math.floor(cucumber_farm_cost * 1.5);
      update_ui();
    }
    else{
      alert("Not enough cucumbers! Can't buy the farm!")
    }
  });
  buy_green_house_button.addEventListener("click", function(){
    if(cucumbers >= cucumber_greenhouse_cost){
      cucumbers -= cucumber_greenhouse_cost;
      cucumbers_auto_ps += cucumber_greenhouse_cps;
      cucumber_greenhouse_cost = Math.floor(cucumber_greenhouse_cost * 1.5);
      update_ui();
    }
    else{
      alert("Not enough cucumbers! Can't buy the greenhouse!")
    }
  });
  buy_lab_button.addEventListener("click", function(){
    if(cucumbers >= cucumber_lab_cost){
      cucumbers -= cucumber_lab_cost;
      cucumbers_auto_ps += cucumber_lab_cps;
      cucumber_lab_cost = Math.floor(cucumber_lab_cost * 1.5);
      update_ui();
    }
    else{
      alert("Not enough cucumbers! Can't buy the lab!")
    }
  });
  buy_ai_button.addEventListener("click", function(){
    if(cucumbers >= cucumber_ai_cost){
      cucumbers -= cucumber_ai_cost;
      cucumbers_auto_ps += cucumber_ai_cps;
      cucumber_ai_cost = Math.floor(cucumber_ai_cost * 1.5);
      update_ui();
    }
    else{
      alert("Not enough cucumbers! Can't buy the AI!")
    }
  });
  big_cucumber_button.addEventListener("click", function(){
    cucumbers += cpc;
    update_ui();
    big_cucumber_button.style.transform = "scale(0.85)";
    setTimeout(function(){
      big_cucumber_button.style.transform = "scale(1)";
    }, 100);
  });
  update_ui();
  if (content.length > 0) {
    set_note_up(0);
  }
};