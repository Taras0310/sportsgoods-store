import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const productsRef = collection(db, "products");
const categoriesRef = collection(db, "categories");

function getQueryFilters(queries) {
  let queryFilters = [];
  for (const key in queries) {
    queryFilters.push(where(`${key}`, "==", `${queries[key]}`));
  }
  return queryFilters;
}

export default class Api {
  static async getAllCategories() {
    const categoryDocs = await getDocs(categoriesRef);
    const categories = categoryDocs.docs.map((q) => q.data());
    return categories;
  }

  static async getAllCategoryProducts() {
    const productDocs = await getDocs(productsRef);
    const products = productDocs.docs.map((q) => q.data());
    return products;
  }

  static async getProducts(queryObject, sortBy) {
    let queryFilters = getQueryFilters(queryObject);
    let q;

    if (sortBy.length > 0) {
      q = query(productsRef, ...queryFilters, orderBy(`${sortBy}`));
    } else {
      q = query(productsRef, ...queryFilters);
    }

    const productDocs = await getDocs(q);
    const products = productDocs.docs.map((q) => q.data());

    return products;
  }

  static async deleteProduct(id) {
    const productItemRef = doc(db, "products", id);
    await deleteDoc(productItemRef);
    return Api.getAllCategoryProducts();
  }

  static async editProduct(id, productData) {
    const productItemRef = doc(db, "products", id);
    await updateDoc(productItemRef, productData);
    return Api.getAllCategoryProducts();
  }

  static async addProduct(productData) {
    const docRef = await addDoc(collection(db, "products"), productData);
    await updateDoc(docRef, {
      id: docRef.id,
      ...productData,
    });

    return Api.getAllCategoryProducts();
  }

  static async addUser(userData) {
    await setDoc(doc(db, "users", userData.id), {
      ...userData,
    });
  }

  static async getUser(id) {
    const user = await getDoc(doc(db, "users", id));
    return user;
  }

  static async createOrder(userId, orderData) {
    const userRef = doc(db, "users", userId);
    const orderCollection = collection(userRef, "orders");

    const orderRef = await addDoc(orderCollection, {
      ...orderData,
    });

    console.log(orderRef, "asdasd");
    console.log(orderRef.id, "id");

    await updateDoc(orderRef, {
      id: orderRef.id,
      ...orderData,
    });
  }

  static async getUserOrders(userId) {
    const userRef = doc(db, "users", userId);
    const orderCollection = collection(userRef, "orders");

    const ordersSnap = await getDocs(orderCollection);

    return ordersSnap.docs.map((e) => e.data());
  }
}
