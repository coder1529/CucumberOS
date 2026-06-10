var content = [
  {
    title: "Welcome",
    date: "06/28/2023",
    content: `
                <div style="background-color: #dfb0b0; margin: 6px; border-radius: 12px; width: 520px; height: 480px; padding: 16px; font-family: Courier; display: flex;">
                                    <div style="background-color: #f1c9c9; width: 540px; padding: 16px; border-radius: 16px;">
                                        <p style="margin: 0px;">HI! START WRITING!</p>
                                        <p style="font-size: 12px; margin: 0px;">2026/6/9</p>
                                        <div style="overflow-y: scroll;">
                                        <p contenteditable="True">
                                        <span contenteditable="true">
                                            TYPE HERE
                                            </br>
                                            </br>
                                            </br>
                                            </br>
                                        </span>
                                        <span contenteditable="true">
                                        </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
      `
  }
]

// Make the DIV element draggable:
dragElement(document.getElementById("window"));
dragElement(document.getElementById("notetaker"));
// dragElement(document.getElementById("welcome"));  
var welcome = document.querySelector("#window");
var notetaker = document.querySelector("#notetaker")
var select_bar = document.querySelector("#top")
var selected_icon = undefined
var biggestIndex = 1;

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
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
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
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
}

var welcome_close = document.querySelector("#close_welcome")

var welcome_open = document.querySelector("#open_welcome")

var notetaker_close = document.querySelector("#notetaker_close")

notetaker_close.addEventListener("click", () => close_window(notetaker));

welcome_close.addEventListener("click", function() {
  close_window(welcome);
});

welcome_open.addEventListener("click", function() {
  open_window(welcome);
});


function update_time(){
    var time = new Date().toLocaleString();
    var text = document.querySelector("#TIME");
    text.innerHTML = time
}

setInterval(update_time, 1000)

function open_window(element) {
  element.style.display = "block"
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  select_bar.style.zIndex = biggestIndex + 1;
}

function close_window(element) {
  element.style.display = "none"
}

function select(element) {
  element.classList.add("selected");
  selected_icon = element
} 

function deselect(element) {
  element.classList.remove("selected");
  selected_icon = undefined
}

function layer(element) {
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
}

function check_tap(element) {
  element.addEventListener("mousedown", () =>
    layer(element)
  )
}

function icon_tap(element){
    if (element.classList.contains("selected")) {
        var target_id = element.getAttribute("data-target"); 
        var target_window = document.getElementById(target_id); 
        if (target_window) {
            open_window(target_window);
        }
        deselect(element);
        deselect(element)
    } else {
        select(element)
    }
}

if (welcome) {
    welcome.addEventListener("mousedown", () => layer(welcome));
}
if (notetaker) {
    notetaker.addEventListener("mousedown", () => layer(notetaker));
}

function set_note(index) {
  var notesContent = document.querySelector("#notesContent")
  notesContent.innerHTML = content[index].content
}

function addToSideBar(index) {
  const side_bar = document.querySelector("#sidebar");
  const note_button = document.createElement("button");
  note_button.classList.add("note-item");
    note_button.innerHTML = `
    <h4>${content[index].title}</h4>
    <p>${content[index].date}</p>
  `;
  note_button.addEventListener("click", () => {
    set_note(index);
  })
  sidebar.appendChild(note_button);
}

set_note(0)

// function initialize(element_name) {
//   var screen = document.querySelector("#" + element_name)
//   check_tap(screen)
//   makeClosable(element_name)
//   dragElement(screen)
// }