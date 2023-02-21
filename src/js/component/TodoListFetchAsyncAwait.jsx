import React, { useState, useEffect } from "react";

const Todolist = () => {

  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);


  let host = 'https://assets.breatheco.de/apis/fake/todos/user/';
  let user = 'norkysgonzalez';

  const fetchPost = async () => {
    const url = host + user;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify([]);
    
    const request = {
      
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'

      };
      
      const response = await fetch(url, request);
      if (response.ok) {
        const responseJSON = await response.json();
        console.log(responseJSON);
        fetchGetTodos();
      }
      

   
  
  }

  const fetchGetTodos = async () => {
    const url = host + user;
    const request = {
      method: 'GET',
      redirect: 'follow'
    };
    const response = await fetch(url, request);
      if (response.ok) {
        const responseJSON = await response.json();
        console.log(responseJSON);
        responseJSON.map((item) => { setList((e) => [...e, item.label]); })
      }
    
  };

  const fetchPutTodos = async (todos) => {
   /*  const url = host + user;
    var raw = JSON.stringify([
      {
        "label": "Make the bed",
        "done": false
      },
      {
        "label": "Walk the dog",
        "done": false
      },
      {
        "label": "Do the replits",
        "done": false
      }
    ]);
   
    const request = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: raw,
    };
    const response = await fetch(url, request);
    const responseJSON = await response.json();
    
     */

    const url = host + user;
    const request = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todos),
    };
    const response = await fetch(url, request);
    if (response.ok) { 
      const responseJSON = await response.json();
      console.log(responseJSON);
    } else {
      console.log('error', error);
    }
  }
  
  
  const deleteTodos = async (todos) => {
    const url = host + user;
    const request = {
      method: 'DELETE',
      redirect: 'follow'
    };

    const response = await fetch(url, request);
    const responseJSON = await response.json();
    

    setList([]);
  }



  const addTask = (event) => {
    event.preventDefault();
    if (inputValue === "") {
      return;
    } else {

      var todosPUT = [];
      for (let index = 0; index < list.length; index++) {
        let item = {};
        item['label'] = list[index];
        item['done'] = false;
        todosPUT.push(item);
      };

      todosPUT.push({ 'label': inputValue, 'done': false });

      fetchPutTodos(todosPUT);
      setList([...list, inputValue]);
      setInputValue("");
    }
  }

 

  const addList = (event) => {
    event.preventDefault ();
    
    
    fetchPost();
    

  }

  useEffect(() => {
    fetchGetTodos();
  }, [])


  return (
    <div className="container col-xs-10 col-md-8 col-lg-6 my-3">
      <h1 className="text-center text-success">Todo's</h1>
      <div className="mb-3">
        <form onSubmit={addTask}>
          <input className="form-control" placeholder="Agrega nueva tarea" type="text"
            value={inputValue}
            onChange={(event) => { setInputValue(event.target.value); }} />
        </form>
      </div>
      <h2 className="text-success">Todo's List</h2>
      <div className="list">
        <ul className="list-group">
          {list.map((listElement, index) => {
            return <li key={index} className="list-group-item d-flex justify-content-between hidden-icon">
              {listElement}</li>
          })
          }
          <span className="list-group-item bg-light text-end fw-lighter">
            {list.length === 0 ? "Sin tareas, agrega una" : list.length + " Item Left"}
          </span>
          <button type="button" className="btn btn-danger" onClick={deleteTodos} >Borrar Tareas</button>
          <button type="button" className="btn btn-success" onClick={addList} >Crear lista</button>
        </ul>
      </div>
    </div>
  );
};

export default Todolist;