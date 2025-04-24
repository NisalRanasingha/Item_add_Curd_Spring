import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { Modal } from "bootstrap";

function App() {
  const [id, setId] = useState("");
  const [itemname, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [items, setItems] = useState([]);

  const addItem = (e) => {
    const newItem = {
      itemname: itemname,
      price: parseFloat(price),
      qty: qty,
    };

    axios
      .post(`http://localhost:8080/api/v1/additem`, newItem)
      .then((response) => {
        console.log("Item added:", response.data);
        getItems();
        setItemName("");
        setPrice("");
        setQty("");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const getItems = () => {
    axios
      .get("http://localhost:8080/api/v1/getitems")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      axios
        .delete(`http://localhost:8080/api/v1/deleteitem/${id}`)
        .then((response) => {
          alert(response.data);
          getItems();
        })
        .catch((error) => {
          alert("Failed to delete item!");
          console.log(error);
        });
    }
  };

  const update = (id) => {
    axios.get(`http://localhost:8080/api/v1/getitem/${id}`).then((response) => {
      // console.log(response.data);
      setId(response.data.id);
      setItemName(response.data.itemname);
      setPrice(response.data.price);
      setQty(response.data.qty);
    });
  };

  const updateItem = ()=>{

    const newItem = {
      id:id,
      itemname: itemname,
      price: parseFloat(price),
      qty: qty,
    };
    axios.put(`http://localhost:8080/api/v1/updateitem`,newItem).then((response)=>{
      getItems();
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error update item:", error);
    });
  }

  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <button
        type="button"
        className="btn btn-primary m-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add New item
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Item
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={addItem}>
                <div className="mb-3">
                  <label className="form-label">Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={itemname}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Quntity</label>
                  <input
                    type="text"
                    className="form-control"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Item
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Item Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.itemname}</td>
                <td>{parseFloat(item.price).toFixed(2)}</td>
                <td>{item.qty}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModaledit"
                    onClick={() => update(item.id)}
                  >
                    Edit
                  </button>

                  <div
                    className="modal fade"
                    id="exampleModaledit"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Modal title
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={updateItem}>
                            <input type="hidden" value={id} />
                            <div className="mb-3">
                              <label className="form-label">Item Name</label>
                              <input
                                type="text"
                                className="form-control"
                                value={itemname}
                                onChange={(e) => setItemName(e.target.value)}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Price</label>
                              <input
                                type="text"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Quntity</label>
                              <input
                                type="text"
                                className="form-control"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                required
                              />
                            </div>
                            <button type="submit" className="btn btn-primary">
                              Update Item
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
