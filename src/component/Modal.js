import React from "react";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../contexts/AppContext";
import MySelect from "./MySelect";
import Api from "../api";

export default function Modal({
  open,
  setOpen,
  setGoods,
  toUpdateId,
  editable,
}) {
  let arrSelect = [];
  const { categories } = useStore();
  categories && categories.map((el) => arrSelect.push(el.name));

  const descriptionRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const imgRef = useRef();
  const brandRef = useRef();
  const quantityRef = useRef();
  const subcategoryRef = useRef();
  const nameRef = useRef();

  const updateDescriptionRef = useRef();
  const updatePriceRef = useRef();
  const updateImgRef = useRef();
  const updateBrandRef = useRef();
  const updateQuantityRef = useRef();
  const updateNameRef = useRef();
  const updateCategoryRef = useRef();
  const updateSubcategoryRef = useRef();

  const editTodo = () => {
    const updateItemObj = {
      description: updateDescriptionRef.current.value || null,
      price: updatePriceRef.current.value || null,
      img: updateImgRef.current.value || null,
      brand: updateBrandRef.current.value || null,
      quantity: updateQuantityRef.current.value || null,
      name: updateNameRef.current.value || null,
    };
    Api.editProduct(toUpdateId, updateItemObj).then((productsData) => {
      setGoods(productsData);
    });

    setOpen(false);
  };

  const addProductItem = () => {
    const itemObj = {
      description: descriptionRef.current.value || null,
      category: categoryRef.current.value || null,
      price: priceRef.current.value || null,
      img: imgRef.current.value || null,
      subcategory: subcategoryRef.current.value || null,
      brand: brandRef.current.value || null,
      quantity: quantityRef.current.value || null,
      name: nameRef.current.value || null,
    };
    Api.addProduct(itemObj).then((productsData) => {
      console.log(productsData);
      setGoods(productsData);
    });
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="modal-background"
            onClick={(e) => {
              e.target.className === "modal-background" && setOpen(false);
            }}
            initial={{ opacity: 1 }}
            in={{ opacity: 0 }}
            exit={{ opacity: 1 }}
          >
            <form
              className="form-group"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {!editable ? (
                <>
                  <MySelect
                    value={categoryRef}
                    options={arrSelect}
                    className="select-form"
                    option
                  />

                  <div className="field">
                    <label htmlFor="name">
                      <strong>Enter name</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      ref={nameRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="description">
                      <strong>Enter description</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      ref={descriptionRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Enter price</strong>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      ref={priceRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Enter img</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      ref={imgRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Enter brand</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      ref={brandRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Enter quantity</strong>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      ref={quantityRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Enter subcategory</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      ref={subcategoryRef}
                      required
                    />
                  </div>

                  <button type="submit" id="submitBtn" onClick={addProductItem}>
                    Add
                  </button>
                </>
              ) : (
                <>
                  <div className="field">
                    <label htmlFor="category">
                      <strong>Enter category</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      ref={updateCategoryRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="name">
                      <strong>Enter name</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      ref={updateNameRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="description">
                      <strong>Enter description</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      ref={updateDescriptionRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Enter price</strong>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      ref={updatePriceRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Enter img</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      ref={updateImgRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Enter brand</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      ref={updateBrandRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Enter quantity</strong>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      ref={updateQuantityRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Enter subcategory</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      ref={updateSubcategoryRef}
                      required
                    />
                  </div>

                  <button type="submit" id="submitBtn" onClick={editTodo}>
                    Edit
                  </button>
                </>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
