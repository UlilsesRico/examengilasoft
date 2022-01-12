// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
    Table,
    Button,
    Container,
    Modal,
    ModalBody,
    ModalHeader,
    FormGroup,
    ModalFooter,
    CardFooter,
    Label,
    Input,
    Row,
    Col,
} from "reactstrap";
import React from "react";

const data = [
    {id:1, tipo:"Sedan", nollanta: "4", motor:"1.6"  },
    {id:2, tipo:"motocicleta", nollanta: "2", motor:"200cc"},
    {id:3, tipo:"Sedan", nollanta: "4", motor:"1.8"},
    {id:4, tipo:"Sedan", nollanta: "4", motor:"2.0"},
    {id:5, tipo:"motocicleta", nollanta: "2", motor:"600cc"}, 

];


class App extends React.Component {
    // Se crea el estado
state={
    data:data,
    form:{
        id:'',
        tipo:'',
        nollanta:'',
        motor:'',
    },
    modalInsertar: false,
    modalEditar:false,
};

handleChange =e=>{
this.setState({
    form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
    }
});

}

mostrarmodalInsertar=()=>{
    this.setState({modalInsertar:true});
}

ocultarmodalInsertar=()=>{
    this.setState({modalInsertar:false});
}

mostrarmodalEditar=(registro)=>{
    this.setState({modalEditar:true, form: registro});
}

ocultarmodalEditar=()=>{
    this.setState({modalEditar:false});
}


insertar=()=>{
    var nuevoauto={...this.state.form};
    nuevoauto.id=this.state.data.length+1; 
    var lista= this.state.data;
    lista.push(nuevoauto);
    this.setState({data: lista, modalInsertar:false}); //Aqui se inserta en la lista y cierra el modal 
}

editar=(dato)=>{
 var contador = 0;
 var lista=this.state.data;
 lista.map((registro)=>{
     if(dato.id===registro.id){
        lista[contador].tipo=dato.tipo;
        lista[contador].nollanta=dato.nollanta;   
        lista[contador].motor=dato.motor;   
     }
     contador++;
 })
 this.setState({data:lista, modalEditar:false}); //Aqui se actualiza en la lista y se cierra el modal 
}


filtrar=(e)=>{
  console.log(e.target.value)
  if(e.target.value!==null && e.target.value!==''){
    this.setState({
      data:  this.state.data.filter((elemento)=> elemento.nollanta===e.target.value)
    })
  }else{
    this.setState({
      data: data
    })
  }
}



// eliminar=(dato)=>{
//  var opcion =window.confirm("¿Eliminar registro?"+dato.id);
//  if(opcion){
//  var contador = 0;
//  var lista = lista.state.data;
//  lista.map((registro)=>{
//      if(registro.id==dato.id){
//          lista.splice(contador, 1);
//      }
//      contador ++;
//  });

// }
//  this.setState({data:lista});
//  }
//esta parte no se pide en el examen 


    render() {
        return (

            <>

            <Container className="mt-5">
                <Row>
                <Col className="mt-4">
                    <Button color="primary" className="float-right" onClick={()=>this.mostrarmodalInsertar()}> Insertar nuevo vehículo </Button>
                </Col>
               
                </Row>
            </Container>
            <Container>
                




<Table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Tipo de vehículo</th>
            <th>Número de llantas</th>
            <th>Motor</th>
            <th>Cilindraje</th>
        </tr>
        <tr>
            <th></th>
            <th></th>
            <th><input type="text" name="llanta_flt" onChange={this.filtrar} placeholder="Filtrar por No llanta" /></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        { this.state.data.map((pintar)=>(
    <tr>
        <td>{pintar.id}</td>
        <td>{pintar.tipo}</td>
        <td>{pintar.nollanta}
        </td>
        <td>{pintar.motor}</td> 
        <td>
            <Button color="primary" className="mx-3" onClick={()=>this.mostrarmodalEditar(pintar)}>Editar</Button>
            {/* <Button color="danger" onClick={()=>this.eliminar(pintar)}>Eliminar</Button> */}
        </td>       
    </tr>
    

     ))}
    </tbody>
</Table>
            </Container>



{/* Modal Inserta datos */}
            <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3 className="text-center">Insertar Auto o motocicleta</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>              
              <input className="form-control" readOnly type="text" value={this.state.data.length+1} />
            </FormGroup>
            
            <FormGroup>
              <label> Tipo: </label>
              <input className="form-control" name="tipo" type="text" onChange={this.handleChange} />
            </FormGroup>
            
            <FormGroup>
              <label> Número de llantas: </label>
              <input className="form-control" name="nollanta" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Motor: </label>
              <input className="form-control" name="motor" type="text" onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button className="btn btn-danger"onClick={() => this.ocultarmodalInsertar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

{/* Modal Inserta datos */}






{/* Modal para actualizar datos */}
<Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
           <div><h3>Editar Autos</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>            
              <input className="form-control" readOnly type="text" value={this.state.form.id} />
            </FormGroup>
            
            <FormGroup>
              <label> Tipo: </label>
              <input className="form-control" name="tipo" type="text" onChange={this.handleChange} value={this.state.form.tipo} />
            </FormGroup>
            
            <FormGroup>
              <label>
                Número de llantas: 
              </label>
              <input className="form-control" name="nollanta" type="text" onChange={this.handleChange} value={this.state.form.nollanta}/>
            </FormGroup>
            <FormGroup>
              <label>
                Motor: 
              </label>
              <input
                className="form-control"
                name="motor"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.motor}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}>
              Actualizar
            </Button>
            <Button
              color="danger"
              onClick={() => this.ocultarmodalEditar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal> 
{/* Modal para actualizar datos*/}


<CardFooter className="text-center"><h4>Created by Oscar Rico 2022</h4></CardFooter>


            </>
        );
    }
}

export default App;