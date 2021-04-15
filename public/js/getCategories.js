const category = document.querySelector('#category');

const subcategory = document.querySelector('#subcategory');

function  getCategories(parent){

} 


category.addEventListener("change", function(e){
    let selected = e.target.value;
    console.log(e);
    console.log(selected);
    fetch(location.origin+'/api/categorias/'+selected)
    .then(response => response.json())
    .then(data => {        
        console.log(data);

        subcategory.innerHTML="";
        data.forEach(op => {
            console.log("añadiento op: ")
            console.log(op)
           
            var option = document.createElement("option");
            option.value= op.id;
            option.text= op.name;
            subcategory.add(option, null)
        });
    });




 

//    getCategories(selected).then((data) => function(){
//         console.log(data);
       
      //  subcategory.innerHTML = data.map(cat => `<option val=${cat.name}>${cat.name}</option>`).join('');







   // })
   // console.log(selected);
    //console.log(selectedT);

})

// const categories1 = ['a', 'b', 'c'];
//                     const subCategories1 = {
//                       a: ['a-1', 'a-2', 'a-3'],
//                       b: ['b-1', 'b-2', 'b-3'],
//                       c: ['c-1', 'c-2', 'c-3'],
//                     };

// const catSelect = document.getElementById('cat');
// const subCatSelect = document.getElementById('subcat');

// catSelect.innerHTML = categories1.map(cat => `<option val=${cat}>${cat}</option>`).join('');
// catSelect.addEventListener('change', setSubcategories);
                   
// setSubcategories();
                  
// function setSubcategories() {
//     subCatSelect.innerHTML = subCategories1[catSelect.value].map(cat => `<option val=${cat}>${cat}</option>`).join('');
// }