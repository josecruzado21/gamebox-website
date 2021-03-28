const fs = require('fs');
const path = require('path');
const dataPath = path.resolve(__dirname, '../data/');
console.log(dataPath);
const User = {
    fileName: dataPath+'/users.json',
    
    getData:function(){
      return JSON.parse( fs.readFileSync(this.fileName, 'utf-8'));
    },
    generateId:function(){
        let users = this.findAll();
        let lastUser = users.pop();

        if(lastUser){
            return lastUser.id +1;
        } else{
            return 1;
        }  
      },

    findAll:function(){
        return this.getData();
    }, 
    findById:function(id){
        let users = this.findAll();
        return users.find(f=>f.id === id);
    }, 
    findByProperty:function(prop, text){
        let users = this.findAll();
        return users.find(f=>f[prop] === text);
    }, 
    create:function(user){
        let users = this.findAll();

        user.id = this.generateId();

        users.push(user);

        usersFinal = JSON.stringify(users, null, ' ');
        fs.writeFileSync(this.fileName, usersFinal);
    }, 
    edit:function(user){

        let users = this.findAll();
        let id = parseInt(user.id);

        //Obtengo el indice del usuario en la lista
        const i = users.map( p => p.id ).indexOf(id);

        //Lo saco de la lista
        if ( i > -1 ) {
            users.splice(i, 1);
        }

        //Vuelve a entrar a la lista
        users.push(user);

        usersFinal = JSON.stringify(users, null, ' ');
        fs.writeFileSync(this.fileName, usersFinal);
    }, 
    delete:function(user){
        let users = this.findAll();
      
        let id = parseInt(user.id);

        //Obtengo el indice del usuario en la lista
        const i = users.map( p => p.id ).indexOf(id);

        //Lo saco de la lista
        if ( i > -1 ) {
            users.splice(i, 1);
        }

        usersFinal = JSON.stringify(users, null, ' ');
        fs.writeFileSync(this.fileName, usersFinal);

    }, 


}
module.exports = User;

//console.log(User.findByProperty('email','ldavydychevf@walmart.com'))