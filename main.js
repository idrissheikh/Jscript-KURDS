let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submet =document.getElementById('submet');


console.log(typeof +taxes.value);
console.log(typeof ads.value);  
console.log(typeof +price.value);







//get total
function getTotal(){

    if(price.value != ''){
        //change value to number by adding + 
        let result = (+price.value +  +taxes.value +  +ads.value ) - +discount.value;
        total.innerHTML= result;
    }
}



//create prudoct
//save localsotrge

let dataPro;
if(localStorage.product != null){
    //change data to  arry
    dataPro = JSON.parse(localStorage.product);
}else{
let dataPro =[];  
}

//let dataPro =[]; 
submet.onclick = function(){
    //create newo opject
    let newPro ={
        title: title.value,
        price: price.value,
        taxes:taxes.value,
        discount:discount.value,
        ads: ads.value,
        count: count.value,
        category: category.value,
        total:total.innerHTML,
    }

    if(newPro.count > 1){
        for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        
    }
    // push nyopject av data i arry datapro();
    //save localsotrge
    //dataPro.push(newPro);
    //    localStorge take jest string that´s why we change value to string.
    localStorage.setItem('product', JSON.stringify(dataPro));
    //console.log(dataPro);

    //clear inputs
    clearData();
    showData();
    
     


}


//clear inputs 
function clearData(){
    title.value = '';
    price.value ='';
    taxes.value ='';
    discount.value='';
    ads.value='';
    count.value='';
    category.value='';
    total.innerHTML='';         
}
//read
function showData(){
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
         table +=
         `<tr>
         <td>${i}</td>
         <td>${dataPro[i].title}</td>
         <td>${dataPro[i].price}</td>
         <td>${dataPro[i].taxes}</td>
         <td>${dataPro[i].ads}</td>
         <td>${dataPro[i].discount}</td>
         <td>${dataPro[i].total}</td>
         <td>${dataPro[i].category}</td>
         <td><button id="update">update</button></td>
         <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
         </tr>`
         //console.log(table);     
    }

     document.getElementById('tbody').innerHTML = table;
     let btnDelete =document.getElementById('deleteAll');
     if(dataPro.length > 0){
        btnDelete.innerHTML =`
        <button onclick=deleteAll()>delete All( ${dataPro.length})</button>`
     }else{
        btnDelete.innerHTML = '';
     }


} showData();   



//delete 
function deleteData(i){
    console.log(i);
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro)
    showData();
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
    
}

//count 



//update
//search