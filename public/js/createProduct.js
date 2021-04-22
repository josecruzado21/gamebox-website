const category = document.querySelector('#category');

const subcategory = document.querySelector('#subcategory');

const nameInput = document.querySelector('#name');

const slug = document.querySelector('#slug');

const hasEdition = document.querySelector('#hasEdition');

const edition = document.querySelector('#edition');

function make_slug(str)
{
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9]+/g, '-');
    str = str.replace(/^-+|-+$/g, '');
    return str;
}

hasEdition.addEventListener("change", function(e){
    let selected = e.target.value;
    console.log(selected);
    if(selected == 0){
        edition.value = "";
        edition.disabled = true;
    }else{
        edition.disabled = false;
    }
});


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
});

nameInput.addEventListener("change", function(e){
    let value = e.target.value;
  
    console.log(value);

    let sValue = make_slug(value); 

    console.log(sValue);
    slug.value = sValue


})
