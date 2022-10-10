let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submet =document.getElementById('submet');


let mood ='create'
let tmp;

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
        title: title.value.toLowerCase(),
        price: price.value,
        taxes:taxes.value,
        discount:discount.value,
        ads: ads.value,
        count: count.value,
        category: category.value.toLowerCase(),
        total:total.innerHTML,
    }

    if(mood === 'create'){
        if(newPro.count > 1){
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            
        }

    } else{
        dataPro[tmp] =newPro;
        mood = 'create';
        submet.innerHTML = 'Create';
        count.style.display ='block';
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
    getTotal();
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
         <td><button onclick=updateData(${i}) id="update">update</button></td>
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
function updateData(i){
    //console.log( 'hallo funker ' + i );
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value =dataPro[i].taxes;
    discount.value=dataPro[i].discount;
    ads.value=dataPro[i].ads;
    count.style.display = 'none'
    category.value= dataPro[i].category;
    getTotal();
    submet.innerHTML = 'Update'
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    }
    )
}

//search
let searchMood = 'title';

function getSearchMood(id){ 

    let search = document.getElementById('search');
    //console.log(id)
    if(id == ('searchTitle')){
    searchMood = 'title';
    search.placeholder = 'Search by Title';
    }else{
    searchMood ='category';
    search.placeholder = 'Search by category';

}
search.focus()
search.value='';
showData();

//console.log (searchMood);

}

function searchData(value){

    console.log(value);
    let table = '';
    if(searchMood == 'title'){


        for (let i = 0; i < dataPro.length; i++) {
            if(dataPro[i].title.includes(value.toLowerCase())){
                console.log(dataPro[i])

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
                 <td><button onclick=updateData(${i}) id="update">update</button></td>
                 <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                </tr>`

            }

        }
    }
    else if(searchMood == 'category'){


        for (let i = 0; i < dataPro.length; i++) {
            if(dataPro[i].category.includes(value.toLowerCase())){
                console.log(dataPro[i])

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
                 <td><button onclick=updateData(${i}) id="update">update</button></td>
                 <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                </tr>`

            }

        }
    }

    document.getElementById('tbody').innerHTML = table;


}