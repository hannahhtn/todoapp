const moon = "M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z";
const sun = "M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z";
let num_items_left = 0;
let backgroundclor = 'hsl(235, 24%, 19%)';
let textclor = 'white';
const update_list = new Event("update-list");
const num_items = document.getElementById("num-items-left");
let p_num = 0;
let checked = false;
// list of all to-do items
let all_items = new Map();
const ACTIVE = true;
const COMPLETE = false;

document.getElementById("display-mode").addEventListener('click', event => {
    const element = document.getElementById("icon");
    const val = (element.getAttribute("d") == sun)? moon : sun;
    element.setAttribute("d", val);
    if(val == sun)
    {
        document.body.style.backgroundImage = "url('./images/bg-desktop-dark.jpg')";
        document.getElementById("current-input").style.backgroundColor = 'hsl(235, 24%, 19%)';
        document.getElementById("current-input").style.color = 'white';
        document.getElementById("bottom").style.backgroundColor = 'hsl(235, 24%, 19%)';
        document.body.style.backgroundColor = 'hsl(235, 21%, 11%)';
        backgroundclor = 'hsl(235, 24%, 19%)';
        textclor = 'white';

        document.querySelectorAll(".items").forEach(item => {
            item.style.backgroundColor = 'hsl(235, 24%, 19%)';
            item.style.color = 'white'
        })

        document.querySelectorAll(".circle-box").forEach(item => {
            item.style.backgroundColor = 'hsl(235, 24%, 19%)';
        })

        document.getElementById("first-circle-box").style.backgroundColor = 'hsl(235, 24%, 19%)';
    }
    else
    {
        document.body.style.backgroundImage = "url('./images/bg-desktop-light.jpg')";
        document.getElementById("current-input").style.backgroundColor = 'white';
        document.getElementById("current-input").style.color = 'gray';
        document.getElementById("bottom").style.backgroundColor = 'white';
        document.body.style.backgroundColor = 'hsl(236, 33%, 92%)';
        backgroundclor = 'white';
        textclor = 'hsl(235, 24%, 19%)';

        document.querySelectorAll(".items").forEach(item => {
            item.style.backgroundColor = 'white';
            item.style.color = 'hsl(235, 24%, 19%)'
        })

        document.querySelectorAll(".circle-box").forEach(item => {
            item.style.backgroundColor = 'white';
        })

        document.getElementById("first-circle-box").style.backgroundColor = 'white';
    }
})

document.getElementById("current-input").addEventListener('keyup', event => {
    // Number 13 is the "Enter" key on the keyboard
    if(event.keyCode === 13)
    {
        // create li items
        const list = document.getElementById("list");
        const li = document.createElement("li");
        // li.appendChild(document.createTextNode("Four"));

        // create paragraph with li items
        const pa = document.createElement("p");
        pa.innerHTML = document.getElementById("current-input").value;
        all_items.set(pa.innerHTML, ACTIVE);
        p_num++;
        pa.setAttribute("class", "ps-item");
        // pa.setAttribute("id", `item ${p_num}`);
        document.getElementById("current-input").value = "";

        //create icon check
        const check_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        check_icon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        check_icon.setAttribute("width", "11");
        check_icon.setAttribute("height", "9");
        check_icon.setAttribute("class", "icon-check");
        const path_element = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path_element.style.fill = "none";
        path_element.style.stroke = "#FFF";
        path_element.style.strokeWidth = "2";
        path_element.setAttribute("d", "M1 4.304L3.696 7l6-6");
        check_icon.appendChild(path_element);

        //create icon cross
        const cross_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        cross_icon.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        cross_icon.setAttribute("width", "18");
        cross_icon.setAttribute("height", "18");
        cross_icon.setAttribute("class", "icon-cross");
        const path_cross = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path_cross.style.fill = "#494C6B";
        path_cross.style.fillRule = "evenodd";
        path_cross.setAttribute("d", "M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z");
        cross_icon.appendChild(path_cross);

        // create checkbox for li items
        const x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        x.setAttribute("class", "circle-box");
        x.style.backgroundColor = backgroundclor;
        x.addEventListener('click', event => {
            if((check_icon.style.opacity == "0")
                || (check_icon.style.opacity == ""))
            {
                x.style.backgroundImage = 'linear-gradient(to bottom right, hsl(192, 100%, 67%) ,hsl(280, 87%, 65%))';
                x.style.border = '0';

                if(num_items_left > 0)
                {
                    num_items_left--;
                    num_items.dispatchEvent(update_list);
                }

                pa.style.color = 'gray';
                pa.style.textDecoration = "line-through";
                check_icon.style.opacity = "1";
                checked = true;
                all_items.set(pa.innerHTML, COMPLETE);
            }
            else if(check_icon.style.opacity == "1")
            {
                x.style.backgroundImage = 'none';
                x.style.border = '0.08em solid gray';

                num_items_left++;
                num_items.dispatchEvent(update_list);
                
                pa.style.color = textclor;
                pa.style.textDecoration = "none";
                check_icon.style.opacity = "0";
                checked = false;
                all_items.set(pa.innerHTML, ACTIVE);
            }
        })

        const div = document.createElement("div");
        div.setAttribute("class", "text-and-cross");
        div.appendChild(pa);
        div.appendChild(cross_icon);

        li.setAttribute("class", "items");
        li.appendChild(x);
        li.appendChild(check_icon);
        li.appendChild(div);
        li.style.backgroundColor = backgroundclor;
        li.style.color = textclor;
        list.prepend(li);

        // update number of items left
        num_items_left++;
        num_items.dispatchEvent(update_list);

        cross_icon.addEventListener('click', event =>{
            list.removeChild(li);
            if(num_items_left > 0)
            {
                // only remove this item from num of items left when 
                // cross icon is triggered by a click event and this item
                // has not been done
                if(check_icon.style.opacity != "1")
                {   
                    num_items_left--;
                    num_items.dispatchEvent(update_list);
                }
            }
            all_items.delete(pa.innerHTML);
        })
    }
})

num_items.addEventListener("update-list", event => {
    num_items.innerHTML = `${num_items_left} items left`;
})

// active items
document.getElementById("active-items").addEventListener("click", event =>{
    const list = document.getElementsByClassName("ps-item");
    Array.from(list).forEach( item => {
        let key = item.innerHTML;
        if(all_items.get(key) != ACTIVE)
        {
            item.parentElement.parentElement.style.display = "none";
        }
        else
        {
            item.parentElement.parentElement.style.display = "flex";
        }
    })
    update_list_style();
})

// all items
document.getElementById("all-items").addEventListener("click", event =>{
    const list = document.getElementById("list");
    const children = list.children;
    Array.from(children).forEach( item => {
        if(item.style.display == "none")
        {
            item.style.display = "flex";
        }
    })
    update_list_style();
})

// completed-items
document.getElementById("completed-items").addEventListener("click", event =>{
    const list = document.getElementsByClassName("ps-item");
    Array.from(list).forEach( item => {
        let key = item.innerHTML;
        if(all_items.get(key) != COMPLETE)
        {
            item.parentElement.parentElement.style.display = "none";
        }
        else
        {
            item.parentElement.parentElement.style.display = "flex";
        }
    })
    update_list_style();
})

// clear-items
document.getElementById("clear").addEventListener("click", event =>{
    const main_list = document.getElementById("list");
    const list = document.getElementsByClassName("ps-item");
    Array.from(list).forEach( item => {
        let key = item.innerHTML;
        if(all_items.get(key) == COMPLETE)
        {
            main_list.removeChild(item.parentElement.parentElement);
        }
    })
    update_list_style();
})

function update_list_style()
{
    const list = document.getElementById("list");
    const count = list.childElementCount;
    let next = 0;
    for(let i = 0; i < count; i++)
    {
        if(list.children[i].style.display != "none")
        {
            list.children[i].style.borderTopLeftRadius = "5px";
            list.children[i].style.borderTopRightRadius = "5px";
            next = i + 1;
            break;
        }
    }

    for(let j = next; j < count - 1; j++)
    {
        list.children[j].style.borderTopLeftRadius = "0px";
        list.children[j].style.borderTopRightRadius = "0px";
    }
}