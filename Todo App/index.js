let form=document.getElementById('form')
let textinput=document.getElementById('textinput')
let msg=document.getElementById('msg')
let date=document.getElementById('date')
let textarea=document.getElementById('textarea')
let add=document.getElementById('add')

let data=[];     //to store the data entered by user

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    formvalidation();     //to validate the form that text should not be empty
});

let formvalidation=()=>{
    if(textinput.value===""){
        msg.innerHTML="Task should not be empty"
    }
    else{
        msg.innerHTML=""
        acceptData();    //function to add data in the array data
       
         //to close the modal after submitting the form
        add.setAttribute('data-bs-dismiss',"modal")
        add.click()
         
        //IIFE:- immedeately invoked function expression
        (()=>{
            add.setAttribute('data-bs-dismiss',"")
        })();
    }
}

let acceptData=()=>{
    data.push({
        text:textinput.value,
        date:date.value,
        description:textarea.value
    })


localStorage.setItem('tasks',JSON.stringify(data))
showTasks();
}

let showTasks=()=>{
    let task=JSON.parse(localStorage.getItem('tasks'))
    tasks.innerHTML='';
    task.map((item,index)=>{
        return (tasks.innerHTML+=`
        <div id=${index}>
        <span class="fn-bold">${item.text}</span>
        <span class="small text-secondary">${item.date}</span>
        <p>${item.description}</p>
        
        <span class="options">
        <i class="bi bi-pencil-square"
          onclick="editTask(this)"
          data-bs-toggle='modal' 
          data-bs-target='#form'
        ></i>
        
        <i class="bi bi-trash" onclick='deleteTask(this)'></i>
        </span>
        </div>
        `)
    })
    resetform();   //reset the form to empty to write the data again

}

let resetform=()=>{
    textinput.value='';
    date.value='';
    textarea.value='';
}

//delete the task
let deleteTask=(e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1)  //removing element from original array "data"
    localStorage.setItem('tasks',JSON.stringify(data));
}

//Edit the task
let editTask=(e)=>{
    let selectedTask=e.parentElement.parentElement;
    textinput.value=selectedTask.children[0].innerHTML;
    date.value=selectedTask.children[1].innerHTML;
    textarea.value=selectedTask.children[2].innerHTML;
    
//for deleting the task that we are editing
    deleteTask(e);
}

//to show the tasks on refreshing also
(()=>{
    data=JSON.parse(localStorage.getItem('tasks'))||[];
    showTasks();
})();