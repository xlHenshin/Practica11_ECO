class Columna{
    constructor(usuario){
        this.usuario=usuario;
    }

    render=()=>{
        let component = document.createElement("div");
        component.className = "Columna";
    
        let publicacionCont = document.createElement("div");
        publicacionCont.className = "publicacionCont";
        publicacionCont.innerHTML = this.usuario.publicacion;
    
        let fechaCont = document.createElement("div");
        fechaCont.className = "fechaCont";
        fechaCont.innerHTML = this.usuario.fecha;
    
        let nombreUsuario = document.createElement("div");
        nombreUsuario.className = "nombreUsuario";
        nombreUsuario.innerHTML = "@"+ this.usuario.usuario;
    
        let respuestaCont = document.createElement("div");
        respuestaCont.className = "respuestaCont";
    
        let respuestaUsuario = document.createElement("textarea");
        respuestaUsuario.className = "respuestaUsuario";
        respuestaUsuario.placeholder = "Escribe algo...";
    
        let respuestaBtn = document.createElement("button");
        respuestaBtn.className = "respuestaBtn";
        respuestaBtn.innerHTML = "Responder";
    
        respuestaCont.appendChild(respuestaUsuario);
        respuestaCont.appendChild(respuestaBtn);
        component.appendChild(fechaCont);
        component.appendChild(publicacionCont);
        component.appendChild(nombreUsuario);
        component.appendChild(respuestaCont);
    
        let respuestaCont2 = document.createElement("div");
        respuestaCont2.className = "respuestaCont2";
        let usuarioId = this.usuario.id;
    
        database.ref("users/comentarios").on('value', function(data){
            respuestaCont2.innerHTML="";
            data.forEach((comentario)=>{
                let valor = comentario.val();
                if(usuarioId===valor.id){
                    let respuestaCont3 = document.createElement("div");
                    respuestaCont3.className="respuestaCont3";
                    respuestaCont3.innerHTML=valor.comentario;
                    respuestaCont2.appendChild(respuestaCont3);
                    component.appendChild(respuestaCont2);
                }
            });
        });
    
        respuestaBtn.addEventListener('click', ()=>{
            if(respuestaUsuario.value===''){
                alert("Llene el campo vacío");
                return;
            }
    
            const database=firebase.database();
            let reference = database.ref("users/comentarios").push();
            let comentario = {
                id:this.usuario.id,
                comentario: respuestaUsuario.value
            };
            reference.set(comentario);
            respuestaUsuario.value='';
        });
        return component;
    }
}