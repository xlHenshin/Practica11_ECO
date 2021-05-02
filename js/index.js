const database=firebase.database();
const usuario = document.getElementById("usuario");
const textPublicacion = document.getElementById("textPublicacion");
const publicarBtn = document.getElementById("publicarBtn");
const publicacionesCont = document.getElementById("publicacionesCont");



const publicar = ()=>{

    if(usuario.value === '' || textPublicacion.value === ''){
        alert("Digite todos los datos");
        return;
    }

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let fecha = null;

    if (month < 10) {
        fecha = `${day}-0${month}-${year}`;
      } else {
        fecha = `${day}-${month}-${year}`;
      }

    let reference = database.ref("users/feisbu").push();
    let user={
        id: reference.key,
        usuario: usuario.value,
        publicacion: textPublicacion.value,
        fecha: fecha
    };

    reference.set(user);
    usuario.value='';
    textPublicacion.value='';
};

publicarBtn.addEventListener('click', publicar);

database.ref("users/feisbu").on('value', function(data){
    publicacionesCont.innerHTML="";
    data.forEach((usuario)=>{
        let valor=usuario.val();
        let columna = new Columna(valor);
        publicacionesCont.appendChild(columna.render());
    })
});