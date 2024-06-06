import { internaAxios } from ".";
let local = "Lista";
export function Autlog(){
  
  let data = JSON.parse(localStorage.getItem('token'))
  console.log(data)
  if (!data) return false;
  else return true;
}
export function cargarLista() {
  let lista = JSON.parse(localStorage.getItem(local));
  if (!lista) return [];
  else return lista;
}
export const ListarComentarios = async () => {
  try {
    let  data  = await internaAxios.get("posts");
    return data;
  } catch (error) {
    return error;
  }
};
export const Quitar = async(parms)=>{
  try {
    let lista = cargarLista();
    let dato = lista.filter((e) => e.id !== parms.id);
    localStorage.setItem(local, JSON.stringify(dato));
    return { mensaje: "eliminado", lista: dato };
  } catch (error) {
    console.log(error)
    return { mensaje: "hubo un error", lista: error };
  }
}
export const AgregarLista = async (parms) => {
  try {
    console.log(parms)
    let lista = cargarLista();
    console.log(lista)
    if (lista.length > 0) {
      let dato = lista.find((e) => e.id === parms.id);
      if (dato === undefined) {
        let parametros = [...lista, { ...parms }];        
      localStorage.setItem(local, JSON.stringify(parametros));
      return { mensaje: "Agregado", lista: parametros };
      }
      return {mensaje:"Ya se encuentra agregado",lista:lista};
    } else {
      
      let parametros = [ { ...parms }];        
      localStorage.setItem(local, JSON.stringify(parametros));
      return { mensaje: "Agregado", lista: parametros }; 
    }
  } catch (error) {
    return { mensaje: "Hubo un error", lista: error }; 
  }
};
