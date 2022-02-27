import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const getLocalItems = () => {
  let list = localStorage.getItem('todoLists');
  if (list)
    return JSON.parse(localStorage.getItem('todoLists'));
  else
    return [];
}

const Todo = () => {
  const [input, setInput] = useState("");
  // const [items, setItems] = useState([]);
  const [items, setItems] = useState(getLocalItems());
  const [toggle, setToggle] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  // WHEN USER GIVES INPUT
  const inputEvent = (event) => {
    setInput(event.target.value);
  }

  // ADDING ITEMS ON CLICKING "+"" ICON
  const addItem = () => {
    if (!input) {
      alert('Please fill the input field🙂');
    }
    // for edit the item
    else if (input && !toggle) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: input }
          }
          return elem;
        })
      )
      setToggle(true);
      setInput('');
      setIsEditItem(null);
    }
    // for adding the item
    else {
      const allInputData = { id: new Date().getTime().toString(), name: input, checkBox: false }
      // setItems([...items, input]);
      setItems([...items, allInputData]);
      // console.log(allInputData);
      // console.log(items);
      setInput('')
    }
  }

  // DELETING ITEMS ON CLICKING "🗑" ICON
  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      // return (id !== index);
      return (index !== elem.id);
    });
    setItems(updatedItems);
  }
  // REMOVING ALL ITEMS AT ONCE
  const deleteAll = () => {
    if (window.confirm("Are you sure to delete all?"))
      setItems([]);
  }
  useEffect(() => {
    // console.log(items)
    localStorage.setItem("todoLists", JSON.stringify(items));
  }, [items])

  useEffect(() => {
    // console.log('clicked checkbox');
    let list = JSON.parse(localStorage.getItem('todoLists'));
    // console.log(list[0].id);

    let empty = document.querySelectorAll('.fBox');
    let fill = document.querySelectorAll('.sBox');
    let item = document.querySelectorAll('.items');
    for (let i = 0; i < items.length; i++) {
      if (list[i].checkBox === true) {
        empty[i].style.display = 'none';
        fill[i].style.display = 'block';
        item[i].style.textDecoration = 'line-through';
      }
      else {
        fill[i].style.display = 'none';
        empty[i].style.display = 'block';
        item[i].style.textDecoration = '';
      }
    }
  }, []);

  // EDIT ITEMS
  const editItem = (id) => {
    // console.log('edit click');
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    })
    // console.log(newEditItem);
    setToggle(false);
    setInput(newEditItem.name);
    setIsEditItem(id);
  }
  const markItem = (elem) => {
    let empty = document.querySelectorAll('.fBox');
    let fill = document.querySelectorAll('.sBox');
    let item = document.querySelectorAll('.items');
    for (let i = 0; i < items.length; i++) {
      if (elem.id === items[i].id) {
        empty[i].style.display = 'none';
        fill[i].style.display = 'block';
        item[i].style.textDecoration = 'line-through';

        let x = JSON.parse(localStorage.getItem('todoLists'));
        x[i].checkBox = true;
        localStorage.setItem("todoLists", JSON.stringify(x));
      }
    }
  }
  const markedItem = (elem) => {
    // console.log(elem);
    let empty = document.querySelectorAll('.fBox');
    let fill = document.querySelectorAll('.sBox');
    let item = document.querySelectorAll('.items');

    for (let i = 0; i < items.length; i++) {
      if (elem.id === items[i].id) {
        fill[i].style.display = 'none';
        empty[i].style.display = 'block';
        item[i].style.textDecoration = '';

        let x = JSON.parse(localStorage.getItem('todoLists'));
        x[i].checkBox = false;
        localStorage.setItem("todoLists", JSON.stringify(x));
      }
    }
  }
  return (
    <>
      <div className="mainDiv container-fluid d-flex align-items-center justify-content-center bg-secondary">
        <div className="innerDiv h-75 pt-5">
          <img src={require("../images/image.jpg")} alt="todoLogo" className="todoImg" />
          <div className="inputBox d-flex mb-4">

            <input type="text" className="form-control me-3 p-2" placeholder="✍  Add items.." value={input} onChange={inputEvent} />
            {toggle ? <AddIcon className="addIcon mt-1" onClick={addItem} /> : <EditIcon className="text-success editIcon" id="editIconInputBox" onClick={addItem} />}
          </div>
          {
            items.map((curElem) => {
              return (
                <>
                  <div className="itemDiv" key={curElem.id}>
                    <div className="items fs-5 mt-2">{curElem.name}</div>
                    <div className="iconsDiv">
                      <span className="fBox" onClick={() => markItem(curElem)} data-bs-toggle="tooltip" data-bs-placement="right" title="Mark done✔"> <CheckBoxOutlineBlankIcon className="emptyBox" /></span>

                      <span className="sBox" onClick={() => markedItem(curElem)}><CheckBoxIcon className="fillBox" /></span>

                      <EditIcon className="editIcon" onClick={() => editItem(curElem.id)} />
                      <DeleteIcon className="deleteIcon" onClick={() => deleteItem(curElem.id)}
                      />

                    </div>
                  </div>
                </>
              );
            })
          }
          <div className="text-center">
            <button className="btn btn-danger mt-4 mb-5" onClick={deleteAll}>Delete all</button>
          </div>

        </div>

      </div>
    </>
  );
}
export default Todo;