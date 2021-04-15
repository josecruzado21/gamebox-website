const category = document.querySelector('#category');

const subcategory = document.querySelector('#subcategory');

fetch(location.origin+'/api/categorias/'+category.value)
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


})
