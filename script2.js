let last_space_press_time = 0
var fast_finder = document.querySelector("#fastfinder")
var fast_finder_input = document.querySelector("#fastfinderinput")
var folder_icon_changer_box = document.querySelector("#changeicon")
var _notetaker = document.querySelector("#_Notetaker")
var __notetaker = document.querySelector("#__Notetaker")
var ___notetaker = document.querySelector("#___Notetaker")
var _notetaker_list = document.querySelector("#_notetaker-list")
var _notetaker_saves = document.querySelector("#saves")
var addnewtxt = document.querySelector("#addnewtxt")
var addtxt = document.querySelector("#addtxt")
click_num = 0;

window.addEventListener("keydown", (event) => {
    if (event.code === "Space"){
        const current_time = Date.now()
        const time_difference = current_time - last_space_press_time

        if (time_difference < 500){
            console.log('DETECTED');
            event.preventDefault();
            fast_finder.style.display = 'flex'
            last_space_press_time = 0;
        }
        else {
            last_space_press_time = current_time
        }
    }
})

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape"){
        fast_finder.style.display = "none";
    }
})

document.addEventListener("click", (e) => {
    if (e.target.id !== fast_finder.id && e.target.id !== fast_finder_input.id){
        fast_finder.style.display = "none";
    }
})

document.addEventListener("contextmenu", (e) => {
    if (e.target.id !== fast_finder.id && e.target.id !== fast_finder_input.id){
        fast_finder.style.display = "none";
    }
})

fast_finder_input.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        if (fast_finder_input.value.toLowerCase().includes('notetaker')){
            open_window(notetaker_window)
        }
        if (fast_finder_input.value.toLowerCase().includes('clicker')){
            open_window(clicker_window)
        }
        if (fast_finder_input.value.toLowerCase().includes('cursorchanger') || fast_finder_input.value.toLowerCase().includes('cursor changer')){
            open_window(cursor_changer_window)
        }
        if (fast_finder_input.value.toLowerCase().includes('background settings') || fast_finder_input.value.toLowerCase().includes('backgroundsettings')){
            open_window(background_settings_window)
        }
        if (fast_finder_input.value.toLowerCase().includes('terminal')){
            open_window(terminal_window)
        }
        if (fast_finder_input.value.toLowerCase().includes('screentime') || fast_finder_input.value.toLowerCase().includes('screen time')){
            open_window(screentime_window)
        }
        if (fast_finder_input.value.toLowerCase().includes('pickle jar') || fast_finder_input.value.toLowerCase().includes('picklejar')){
            open_window(pickle_jar)
        }
        console.log("enter")
    }
})

folder_icon_changer_box.addEventListener("mouseenter", () => {
    console.log('Mouse entered folder_icon_changer_box - Hover started');
    folder_icon_changer_box.style.background = "#cfdde2"
})
folder_icon_changer_box.addEventListener("mouseleave", () => {
    console.log('Mouse left folder_icon_changer_box - Hover ended');
    folder_icon_changer_box.style.background = "whitesmoke"
})
folder_icon_changer_box.addEventListener("mouseleave", () => {
    console.log('Mouse left folder_icon_changer_box - Hover ended');
    folder_icon_changer_box.style.background = "whitesmoke"
})

folder_icon_changer_box.addEventListener("click", (e) => {
    var element = document.getElementById(change_icon_folder_num);
    var input_element = document.createElement("input");
    input_element.type = 'text';
    input_element.value = element.textContent;
    input_element.id = element.id;
    input_element.classList = "folder-icon folder-rename-input";
    input_element.style.height = "30px";
    element.replaceWith(input_element);
    input_element.focus();
    input_element.select();

    function finish_rename(){
        var new_name = document.createElement('p');
        new_name.style.cssText = element.style.cssText;
        new_name.classList = "folder-icon";
        new_name.id = input_element.id;
        new_name.textContent = input_element.value.trim() || element.textContent;
        input_element.replaceWith(new_name);
    }

    input_element.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") input_element.blur();
    });
    input_element.addEventListener("blur", finish_rename, { once: true });

    folder_change_box.style.display = "none";
    folder_change_box_open = false;
})

_notetaker.addEventListener("click", (e) => {
    if (click_num === 0){
        alert("CAUTION\nTHIS IS A SENSITIVE FILE\nTAP ENTER(to erase this alert) AND CLICK ONE MORE TIME TO OPEN THE FILE")
        click_num = 1;
    }
    else {
        pickle_jar_desktop_applications_list.style.display = "none";
        _notetaker_list.style.display = "flex";
        click_num = 0;
    }
})

var saves_click_num = 0;

_notetaker_saves.addEventListener("click", () => {
    if (saves_click_num === 0){
        alert("CAUTION\nTHIS IS A SENSITIVE FILE\nIT MIGHT WIPE OUT THE MEMORY IN THE FOLLOWING APP(S):\nNoteTaker\nTAP ENTER(to erase this alert) AND CLICK ONE MORE TIME TO OPEN THE FILE")
        saves_click_num = 1;
    }
    else {
        _notetaker_list.style.display = "none";
        render_saves_list();
        pickle_jar_saves_list.style.display = "flex";
        saves_click_num = 0;
    }
})

var pickle_jar_right_click_open = false;

document.addEventListener("mousemove", (e) => {
    if(!pickle_jar_right_click_open) {
        pickle_jar_folder_page_right_click.style.left = `${e.pageX + 55.5}px`
        pickle_jar_folder_page_right_click.style.top = `${e.pageY + 40}px`
    }
})

document.addEventListener("contextmenu", (e) => {
    if(e.target === pickle_jar_folder_page){
        pickle_jar_folder_page_right_click.style.left = `${e.pageX + 55.5}px`
        pickle_jar_folder_page_right_click.style.top = `${e.pageY + 40}px`
        if(!pickle_jar_right_click_open) {
            biggest_index++;
            pickle_jar_folder_page_right_click.style.zIndex = biggest_index;
            pickle_jar_folder_page_right_click.style.display = "flex";
            pickle_jar_right_click_open = true;
        }
        else{
            pickle_jar_folder_page_right_click.style.display = "none";
            pickle_jar_right_click_open = false;
            // setTimeout(() => {pickle_jar_folder_page_right_click.style.display = "flex";}, 1);
            biggest_index++;
            pickle_jar_folder_page_right_click.style.zIndex = biggest_index;
            pickle_jar_folder_page_right_click.style.display = "flex";
            pickle_jar_right_click_open = true;
        }
    }
    else{
        pickle_jar_folder_page_right_click.style.display = "none";
        pickle_jar_right_click_open = false;
    }
})

document.addEventListener("mousedown", (e) => {
    if(!pickle_jar_folder_page_right_click.contains(e.target)){
        pickle_jar_folder_page_right_click.style.display = "none";
        pickle_jar_right_click_open = false;
    }
})

addnewtxt.addEventListener("mouseenter", () => {
    console.log('Mouse entered pickle_jar_folder_page_right_click - Hover started');
    addnewtxt.style.background = "#cfdde2";
    addtxt.style.display = "flex";
})

addnewtxt.addEventListener("mouseleave", () => {
    console.log('Mouse left pickle_jar_folder_page_right_click - Hover ended');
    addnewtxt.style.background = "whitesmoke";
    // addtxt.style.display = "none";
})

addtxt.addEventListener("mouseenter", () => {
    addtxt.style.background = "#cfdde2"
})

addtxt.addEventListener("mouseleave", () => {
    addtxt.style.background = "whitesmoke"
})

addtxt.addEventListener("click", () => {
    create_txt_file(current_folder_page_key);
})