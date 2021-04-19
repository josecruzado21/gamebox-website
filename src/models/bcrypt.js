
const bcryptjs = require('bcryptjs');

let hash = bcryptjs.hashSync('1234', 10);



console.log(hash);
console.log(bcryptjs.compareSync('1234',hash))