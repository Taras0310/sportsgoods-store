import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../contexts/AppContext";
import Select from "./Select";
import Api from "../api";
import {
  categoriesToSelectOptions,
  subCategoriesToSelectOptions,
} from "../utils/utils";

function getCategoryByValue(array, name) {
  console.log(array, name);
  return array.find((item) => item.name === name);
}

export default function Modal({
  open,
  setOpen,
  setGoods,
  updatedProduct,
  setEditable,
  editable,
}) {
  const { categories } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [subcategoryOptions, setSubcategoryOptions] = useState([]);

  const descriptionRef = useRef();
  const priceRef = useRef();
  const imgRef = useRef();
  const brandRef = useRef();
  const quantityRef = useRef();
  const nameRef = useRef();

  const updateDescriptionRef = useRef();
  const updatePriceRef = useRef();
  const updateImgRef = useRef();
  const updateBrandRef = useRef();
  const updateQuantityRef = useRef();
  const updateNameRef = useRef();
  const updateCategoryRef = useRef();
  const updateSubcategoryRef = useRef();

  useEffect(() => {
    if (selectedCategory.length > 0) {
      const findedCategory = getCategoryByValue(categories, selectedCategory);
      console.log(findedCategory.subcategories);
      setSubcategoryOptions(
        subCategoriesToSelectOptions(findedCategory.subcategories)
      );
    } else {
      setSubcategoryOptions([]);
    }
  }, [selectedCategory]);

  const handleSelectedCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSelectedSubCategory = (event) => {
    setSelectedSubCategory(event.target.value);
  };

  const editTodo = () => {
    const updateItemObj = {
      description: updateDescriptionRef.current.value || null,
      price: updatePriceRef.current.value || null,
      img: updateImgRef.current.value || null,
      brand: updateBrandRef.current.value || null,
      quantity: updateQuantityRef.current.value || null,
      name: updateNameRef.current.value || null,
    };
    Api.editProduct(updatedProduct.id, updateItemObj).then((productsData) => {
      setGoods(productsData);
    });

    setOpen(false);
  };

  const addProductItem = () => {
    const itemObj = {
      description: descriptionRef.current.value || null,
      category: selectedCategory || null,
      price: priceRef.current.value || null,
      img: imgRef.current.value || null,
      subcategory: selectedSubCategory || null,
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
              if (e.target.className === "modal-background") {
                setOpen(false);
                setEditable(false);
              }
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
                  <div className="field">
                    <label htmlFor="name">
                      <strong>Category</strong>
                    </label>
                    <Select
                      options={categoriesToSelectOptions(categories)}
                      selectedValue={selectedCategory}
                      onChange={handleSelectedCategory}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="name">
                      <strong>Name</strong>
                    </label>
                    <input
                      type="text"
                      className="inp-field"
                      ref={nameRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="description">
                      <strong>Description</strong>
                    </label>
                    <input
                      type="text"
                      className="inp-field"
                      ref={descriptionRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Price</strong>
                    </label>
                    <input
                      type="number"
                      className="inp-field"
                      ref={priceRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Img</strong>
                    </label>
                    <input type="text" className="inp-field" ref={imgRef} />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Brand</strong>
                    </label>
                    <input
                      type="text"
                      className="inp-field"
                      ref={brandRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Quantity</strong>
                    </label>
                    <input
                      type="number"
                      className="inp-field"
                      ref={quantityRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Subcategory</strong>
                    </label>
                    <Select
                      options={subcategoryOptions}
                      selectedValue={selectedSubCategory}
                      onChange={handleSelectedSubCategory}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    id="submitBtn"
                    onClick={addProductItem}
                  >
                    Add
                  </button>
                </>
              ) : (
                <>
                  <div className="field">
                    <label htmlFor="category">
                      <strong>Category</strong>
                    </label>
                    <input
                      type="text"
                      className="inp-field"
                      ref={updateCategoryRef}
                      value={updatedProduct.category}
                      disabled
                      readOnly
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="name">
                      <strong>Name</strong>
                    </label>
                    <input
                      type="text"
                      className="inp-field"
                      defaultValue={updatedProduct.name}
                      ref={updateNameRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="description">
                      <strong>Description</strong>
                    </label>
                    <input
                      type="text"
                      className="inp-field"
                      defaultValue={updatedProduct.description}
                      ref={updateDescriptionRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Price</strong>
                    </label>
                    <input
                      type="number"
                      className="inp-field"
                      defaultValue={updatedProduct.price}
                      ref={updatePriceRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Img</strong>
                    </label>
                    <input
                      type="text"
                      className="inp-field"
                      defaultValue={updatedProduct.img}
                      ref={updateImgRef}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Brand</strong>
                    </label>
                    <input
                      type="text"
                      className="inp-field"
                      defaultValue={updatedProduct.brand}
                      ref={updateBrandRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Quantity</strong>
                    </label>
                    <input
                      type="number"
                      className="inp-field"
                      defaultValue={updatedProduct.quantity}
                      ref={updateQuantityRef}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="price">
                      <strong>Subcategory</strong>
                    </label>
                    <input
                      type="text"
                      className="inp-field"
                      value={updatedProduct.subcategory}
                      ref={updateSubcategoryRef}
                      disabled
                      readOnly
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    id="submitBtn"
                    onClick={editTodo}
                  >
                    Edits
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
