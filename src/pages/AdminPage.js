import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Modal from "../component/Modal";
import Api from "../api";

export default function AdminPage() {
  const [goods, setGoods] = useState([]);

  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(null);

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

  const openUpdateDialog = (item) => {
    setOpen(true);
    setEditable(true);
    setUpdatedProduct(item);
  };

  const openAdd = () => {
    setOpen(true);
  };

  return (
    <div className="page admin-page">
      <div className="admin-controls">
        <button
          type="submit"
          className="btn-primary"
          onClick={() => {
            openAdd();
          }}
        >
          Add Product
        </button>
      </div>
      <table className="admin-table">
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
                <td>{item.price} грн</td>
                <td
                  onClick={() => {
                    openUpdateDialog(item);
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
      <Modal
        open={open}
        setOpen={setOpen}
        setGoods={setGoods}
        updatedProduct={updatedProduct}
        setEditable={setEditable}
        editable={editable}
      />
    </div>
  );
}
