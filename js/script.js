

let section = document.querySelector("section");
// 設定表單按鈕行為
let add = document.querySelector("form button");
add.addEventListener("click", e =>{
    e.preventDefault();

    // console.log(e.target.parentElement);
    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoYear = form.children[1].value;
    let todoMonth = form.children[2].value;
    let todoDate = form.children[3].value;
    console.log(todoText ,todoYear,todoMonth, todoDate);
    

    if (todoText === "" || todoYear === "" || todoMonth === "" || todoDate ===""){
        alert("請輸入事項！");
        return; //以下程式不執行
    }

    

    // 將資料放置section內
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerHTML = todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerHTML = todoYear + "/" + todoMonth + "/" + todoDate;
    todo.appendChild(text);
    todo.appendChild(time);

    // 新增勾勾按鈕
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';

    // 勾勾按鈕完成時產生刪除線
    completeButton.addEventListener("click", e =>{
        // console.log(e.target);
        let todoItem = e.target.parentElement;
        // todoItem.classList.add("done"); //add新增刪除線
        todoItem.classList.toggle("done"); //元素之間切換(開/關)
    })

    // 新增垃圾桶按鈕
    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.addEventListener("click", e =>{
        let todoItem = e.target.parentElement;
        // 動畫消失後刪除
        todoItem.addEventListener("animationend", ()=>{            
            // 刪除localStorage資料
            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item, index) => {
                if (item.todoText == text) {
                    myListArray.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(myListArray));
                }
            })
            todoItem.remove();
        })
        todoItem.style.animation = "scaleDown 0.3s forwards";
    })


    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    // 新增事項時彈出動畫
    todo.style.animation = "scaleUp 0.3s forwards"

    // 將資料以陣列方式存入localStorage
    let myTodo = {
        todoText: todoText,
        todoYear: todoYear,
        todoMonth: todoMonth,
        todoDate: todoDate
    };

    let myList = localStorage.getItem("list");
    if (myList == null){
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else{
        // 接收 JSON 字串，轉為 Javascript 物件
        let myListArray = JSON.parse(myList);
        // 每新增一筆,都往後放
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }

    console.log(JSON.parse(localStorage.getItem("list")));

    // 新增事項後清空輸入框
    form.children[0].value = "";
    form.children[1].value = "";
    form.children[2].value = "";
    form.children[3].value = "";

    section.appendChild(todo);
});

loadDate();

function loadDate(){
    // 重新開啟網頁時讀取localStorage資料,並將資料取出置item
    let myList = localStorage.getItem("list");
    if (myList !== null) {
        let myListArray = JSON.parse(myList);
        myListArray.forEach(item => {
            
            let todo = document.createElement("div");
            todo.classList.add("todo");
            let text = document.createElement("p");
            text.classList.add("todo-text");
            text.innerHTML = item.todoText;
            let time = document.createElement("p");
            time.classList.add("todo-time");
            time.innerHTML = item.todoYear + "/" + item.todoMonth + "/" + item.todoDate;
            todo.appendChild(text);
            todo.appendChild(time);

            // 新增勾勾按鈕
        let completeButton = document.createElement("button");
        completeButton.classList.add("complete");
        completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';

        // 勾勾按鈕完成時產生刪除線
        completeButton.addEventListener("click", e =>{
            // console.log(e.target);
            let todoItem = e.target.parentElement;
            // todoItem.classList.add("done"); //add新增刪除線
            todoItem.classList.toggle("done"); //元素之間切換(開/關)
        })

        // 新增垃圾桶按鈕
        let trashButton = document.createElement("button");
        trashButton.classList.add("trash");
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.addEventListener("click", e =>{
            let todoItem = e.target.parentElement;
            // 動畫消失後刪除
            todoItem.addEventListener("animationend", ()=>{            
                // 刪除localStorage資料,bug:相同名稱時,會刪第一筆,跟按刪除的那一筆
                // 建議新增隱藏id當索引值,來判斷
                let text = todoItem.children[0].innerText;
                let myListArray = JSON.parse(localStorage.getItem("list"));
                myListArray.forEach((item, index) => {
                    if (item.todoText == text) {
                        myListArray.splice(index, 1);
                        localStorage.setItem("list", JSON.stringify(myListArray));
                    }
                })
                todoItem.remove();
            })
            todoItem.style.animation = "scaleDown 0.3s forwards";
        })


        todo.appendChild(completeButton);
        todo.appendChild(trashButton);

        // 新增事項時彈出動畫
        todo.style.animation = "scaleUp 0.3s forwards"

        section.appendChild(todo);
        })
    };
};
// 資料按日期排序
function mergeTime(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j <arr2.length){
        if (Number(arr1[i].todoYear) > Number(arr2[j].todoYear)){
            result.push(arr2[j]);
            j++;
        }else if(Number(arr1[i].todoYear) < Number(arr2[j].todoYear)){
            result.push(arr1[i]);
            i++;
        }else if(Number(arr1[i].todoYear) == Number(arr2[j].todoYear)){
            if(Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)){
                result.push(arr2[j]);
                j++;
            }else if(Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)){
                result.push(arr1[i]);
                i++;
            }else if(Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)){
                if(Number(arr1[i].todoDate) > Number(arr2[j].todoDate)){
                    result.push(arr2[j]);
                    j++;
                }else{
                    result.push(arr1[i]);
                    i++;
                }
            }
        }
    }
    while (i < arr1.length){
        result.push(arr1[i]);
        i++;
    }
    while (j < arr2.length){
        result.push(arr2[j]);
        j++;
    }
    return result;
}
function mergeSort(arr){
    if(arr.length === 1){
        return arr;
    }else {
        let middle = Math.floor(arr.length / 2);
        let right = arr.slice(0, middle);
        let left = arr.slice(middle, arr.length);
        return mergeTime(mergeSort(right), mergeSort(left));
    }
}

// 排序按鈕功能
let sortButton = document.querySelector("div.sort button");
sortButton.addEventListener("click", () =>{
    // 將localStorage內的資料排序
    let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list", JSON.stringify(sortedArray));

    // 畫面清空
    let len = section.children.length;
    for(let i = 0; i < len; i++) {
        section.children[0].remove();        
    }
   

    // 排序後的資料秀出
    loadDate();
})