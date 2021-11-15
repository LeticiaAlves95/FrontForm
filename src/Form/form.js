import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';


function Formulario(){
  const [campos,setCampos]= useState({
    nome: '',
    email: '',
    mensagem: '',
    anexo: ''
  });

  function send(){
    const formData = new FormData();
    Object.keys(campos).forEach(key => formData.append(key, campos[key]));
    axios.post('http://localhost:3030/send', 
              formData,
              {
                headers: {
                  "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                }
              })
      .then(response => { console.log(response.data); })
  }
  
  function handleInputChange(event){
    console.log(campos);
    if(event.target.name === "anexo")
    campos[event.target.name] = event.target.files[0];
    else
    campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  function handleFormSubmit(event){
    event.preventDefault();
    console.log(campos);
    send(campos);
    alert ('enviado com sucesso!');
  }
    return(
        <div className="container"> 
<form onSubmit={handleFormSubmit}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" name='email' onChange={handleInputChange} aria-describedby="emailHelp"/>
   
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Nome</label>
    <input type="text" class="form-control" id="nome" name='nome' onChange={handleInputChange}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Conteúdo</label>
    <input type="text" class="form-control" id="mensagem" name='mensagem' onChange={handleInputChange} aria-describedby="emailHelp"/>
  
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Anexo</label>
    <input type="file" class="form-control" id="anexo" name='anexo' onChange={handleInputChange} aria-describedby="emailHelp"/>
   
  </div>
  <button type="submit" value="enviar" class="btn btn-primary">Enviar</button>
</form>
        </div>
    );
    
}
export default Formulario;