import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Modal from "../component/Modal";
import Api from "../api";
import "../component/adminPage.scss";

export default function AdminPage() {
  const [goods, setGoods] = useState([]);
  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [toUpdateId, setToUpdateId] = useState("");

  useEffect(() => {
    Api.getAllCategoryProducts().then((productsData) => {
      setGoods(productsData);
    });
  }, []);

  const deleteProduct = (id) => {
    Api.deleteProduct(id).then((productsData) => {
      setGoods(productsData);
    });
  };

  const openUpdateDialog = (id) => {
    setOpen(true);
    setToUpdateId(id);
  };

  const openAdd = () => {
    setOpen(true);
  };

  return (
    <>
      <Header />
      <div className="admin-content">
        <table border="1">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {goods.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>{item.price}$</td>
                  <td
                    onClick={() => {
                      openUpdateDialog(item.id);
                      setEditable(true);
                    }}
                  >
                    Edit
                  </td>
                  <td onClick={() => deleteProduct(item.id)}>Delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="button-add">
          <button
            type="submit"
            onClick={() => {
              openAdd();
              setEditable(false);
            }}
          >
            Add Product
          </button>
        </div>
        <Modal
          open={open}
          setOpen={setOpen}
          setGoods={setGoods}
          toUpdateId={toUpdateId}
          editable={editable}
        />
      </div>
    </>
  );
}
