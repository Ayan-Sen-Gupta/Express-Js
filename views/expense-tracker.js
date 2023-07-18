const myForm = document.querySelector('#my-form');
const itemNameInput = document.querySelector('#itemName'); 
const amountInput = document.querySelector('#amount');
const descriptionInput = document.querySelector('#description');
const categoryInput = document.querySelector('#category');

myForm.addEventListener('submit', onAddingExpense);

function onAddingExpense(e){
  
    e.preventDefault();

        let myObj = {
            itemName:itemNameInput.value,
            amount: amountInput.value,
            description: descriptionInput.value,
            category: categoryInput.value
        }; 

    axios.post("http:localhost:3000/",myObj)
         .then((response) => {
              console.log(response.data);
              showExpenseOnScreen(response.data);
            
         })
         .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
            console.log(err);
         })
   

   //Clear fields
   itemNameInput.value='';
   amountInput.value='';
   descriptionInput.value='';
   categoryInput.value='';

} 
    
window.addEventListener('DOMContentLoaded', onPageLoading);

function onPageLoading(e){
    e.preventDefault();

   axios.get("http:localhost:3000/")
        .then((response) =>{

            console.log(response);

            for(let i=0;i<response.data.length;i++){ 
                showExistingExpenseOnScreen(response.data[i]);
            }
                    
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
            console.log(err);
        })

}
   

function showExistingExpenseOnScreen(expense){ 
    let parentNode=document.getElementById('expenses');
    let childHTML=`<li id=${expense.id}>${expense.itemName} - Rs.${expense.expenseAmount} - ${expense.description} - ${expense.category}
                    <button onclick=editExpense(${expense.id},'${expense.itemName}',${expense.expenseAmount},'${expense.description}','${expense.category}')>Edit</button>
                    <button onclick=deleteExpense(${expense.id})>Delete</button></li>`;
    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}

        
   function showExpenseOnScreen(expense){ 
            
        let parentNode=document.getElementById('expenses');
        let childHTML=`<li id=${expense.id}>${expense.itemName} - Rs.${expense.expenseAmount} - ${expense.description} - ${expense.category}
                        <button onclick=editExpense(${expense.id},'${expense.itemName}',${expense.expenseAmount},'${expense.description}','${expense.category}')>Edit</button>
                        <button onclick=deleteExpense(${expense.id})>Delete</button></li>`;
        parentNode.innerHTML=parentNode.innerHTML+childHTML;
    }

    function removeExpenseFromScreen(expenseId){ 
        let parentNode = document.getElementById('expenses');
        let childNodeToBeDeleted= document.getElementById(expenseId);
        parentNode.removeChild(childNodeToBeDeleted);         
    }
        
    function deleteExpense(expenseId){ 

       axios.delete(`http:localhost:3000/delete-expense/${expenseId}`)
            .then((response) => {
              
              removeExpenseFromScreen(expenseId); 
            })
            .catch((err) => {
              document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
              console.log(err);
            })
        
}

    function editExpense(expenseId,itemName,amount,description,category){
      
      itemNameInput.value=itemName;   
      amountInput.value=amount; 
      descriptionInput.value=description;
      categoryInput.value=category; 
    //   deleteExpense(expenseId);  
    

    axios.get(`http:localhost:3000/edit-expense/${expenseId}`)
    .then((response) => {
      
      removeExpenseFromScreen(expenseId); 
    })
    .catch((err) => {
      document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
      console.log(err);
    })
}