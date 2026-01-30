const express = require('express');// ye express library import karta hai
const app = express(); // sara server ko handle app hi karta hai ab sari functionality aa jati hai

const db = require('./db'); // 👈 ye line zaroor honi chahiye
const menuitem=require('./models/menuitems')
const bodyParser=require('body-parser');
app.use(bodyParser.json()); // req.body ke form mein chala jata hai
// mtlb body parsor kya karna hai jis bhi form mein data aata hai usko bs bat do jaise json fir wousko javasript object mein covert karke usko request ke from mein store kar lega jiska hum use karege.


 // import the router files
 const personroutes=require('./routes/personRoutes')
 app.use('/person',personroutes);

 //impport router files for menuitem
 const menuitemRoutes=require('./routes/menuitemRoutes')
 app.use('/menu',menuitemRoutes);
app.listen(3000, () => {
  console.log('listening on port 3000');
});
