import { useEffect } from "react";
import { useNavigate,  } from "react-router-dom";

export default function Auth(){
 let history = useNavigate()
    function Entrar(event){
        event.preventDefault()
        let user = document.getElementById('user').value;
        let pass = document.getElementById('inputPassword').value;
       
        if(user.trim()!==' ' && pass.trim()!==' '){
            if(user.trim()==='admin' && pass.trim()==='admin'){
                localStorage.setItem('token',JSON.stringify({token:'Bearer'}))
                history("/lista")
                return
            }
            alert('Usuario o contraseña incorrecta')
            return
        }
        alert('Faltan Campos por completar')
    }
    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem('token'))
        if(data!==null){
            if(data.token==="Bearer"){
                history('/lista')
            }
        }

    },[])
    return(
            <div className="container login-container">
        <form className="login-form"  onSubmit={Entrar} method="post">
            <h1 className="h3 mb-3 font-weight-normal text-center">Entrar</h1>
            <div className="form-group">
                <label for="user">Usuario</label>
                <input type="text" id="user" className="form-control" placeholder="User" required autofocus/>
            </div>
            <div className="form-group">
                <label for="inputPassword">Contraseña</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
            </div>
            <div className="d-flex justify-content-center p-3">
            <button className="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
            </div>
        </form>
    </div>
    )
}