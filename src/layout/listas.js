import { useEffect, useState } from "react"
import { AgregarLista, ListarComentarios, Quitar, cargarLista } from "../utils/utils"

export default function ListaJson(){
    
    let[lista,setList]=useState([])
    let [dest,setDesta]= useState([])
    async function Consultarcometariso(){
        try{
            let{data}=await ListarComentarios()
            setList(data)
         }catch(err){
            console.log(err)
         }
    }
    async function agregar(parms){
      let dato = await  AgregarLista(parms)
      console.log(dato)
      setDesta(dato.lista)
      alert(dato.mensaje)
    }
    async function Quitarlista(parms){
        try{ 
        let dato = await Quitar(parms)
        setDesta(dato.lista)
        console.log(dato)
        alert(dato.mensaje)
     }catch(err){
console.log(err)
        alert(err.mensaje)
     }
    }
    const goToHome = () => {
        localStorage.removeItem('token')
        window.location.href='/';
      };
    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem('token'))
        console.log(data)
        if(data===null){
            
                goToHome()
        }
        Consultarcometariso()
        if(dest.length===0){
            setDesta(cargarLista())
        }
    },[])
    return(
    <>
    
        <div className="d-flex justify-content-end p-3">
            <button className="btn btn-danger" onClick={goToHome}>Cerrar</button>
        </div>

    <div className=" container pt-5">
    <ul className="nav nav-pills nav-fill tab gap-2 p-1 small bg-primary rounded-5 shadow-sm" id="pillNav2" role="tablist" >
  <li className="nav-item" role="presentation">
    <button className="nav-link active rounded-5" id="home-tab2" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane"aria-selected="true">Post</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link rounded-5" id="profile-tab2" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane"  aria-selected="false">Destacados</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
  <div className=" card mt-3 p-5">

<ol className="list-group list-group">
    {
    lista.length>0? 
    lista.map((da,i)=>{
        return(
<li key={i} className="list-group-item  d-flex justify-content-between align-items-start">
<div className="ms-2 me-auto">
<div className="fw-bold">ID {da.id}  User Id {da.userId}</div>
{da.title}
</div>
<button className=" btn btn-success" onClick={()=>agregar(da)}> Agregar </button>
</li>
        )
    })    :<div class="spinner-grow" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
    }


</ol>

</div>
  </div>
  <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
  <div className=" card mt-3 p-5">

<ol className="list-group list-group">
    {
    dest.length>0? 
    dest.map((da,i)=>{
        return(
<li key={i} className="list-group-item d-flex justify-content-between align-items-start">
<div className="ms-2 me-auto">
<div className="fw-bold">ID {da.id}  User Id {da.userId}</div>
{da.title}
</div>
<button className=" btn btn-danger" onClick={()=>Quitarlista(da)}> Quitar </button>
</li>
        )
    })    :""
    }


</ol>

</div>
  </div>
</div>
       
        

    </div>
        </>
        )
}