import router from "@/router";
import store from "@/store";
import axios from "axios";
import swal from "sweetalert";

async function api(endpoint, method, data) {
  store.dispatch("setloading", true);
  let result = null,
    error = null;
  await axios
    .create({
      baseURL: `https://warehouse-api.crud.uz/${endpoint}`,
      headers: {
        Authorization: `Bearer ${localStorage["token"]}`,
      },
    })
    .request({ method: method.toUpperCase(), data: data })
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      error = err;
      catchError(err);
    })
    .finally(() => {
      store.dispatch("setloading", false);
    });
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(result);
    } else {
      reject(error);
    }
  });
}

function catchError(error) {
  console.error(error);
  if (error.response?.status == 401) {
    swal({
      icon: "warning",
      title: "Ism yoki parolda xatolik !",
      timer: 2000,
    }).then(() => {
      if (location.pathname !== "/") {
        router.push("/");
      }
    });
  } else if (error.response?.status == 400) {
    swal({
      icon: "warning",
      title: error.response?.data.detail,
      timer: 2500,
    });
  } else if (error.response?.status == 404) {
    swal({
      icon: "warning",
      title: "URL manzili noto'g'ri !",
      timer: 2000,
    });
  } else if (error.response?.status == 422) {
    swal({
      icon: "warning",
      title: "Ma'lumotlar to'liq emas !",
      timer: 2000,
    });
  } else if (error.message == "Network Error") {
    swal({
      icon: "warning",
      title: "Server bilan aloqa mavjud emas !",
      timer: 2000,
    });
  }
}

export function success(target) {
  if (target !== undefined) {
    document.querySelector(`[${target}]`).click();
  }
  return swal({
    icon: "success",
    title: " ",
    buttons: false,
    timer: 800,
    closeOnEsc: false,
    closeOnClickOutside: false,
  });
}

// token

export function token(data) {
  let form_data = new FormData();
  form_data.append("username", data.username);
  form_data.append("password", data.password);
  return api(`token`, `POST`, form_data);
}

// warehouse

export function warehouses(search) {
  let search_query = ``;
  if (search) search_query = `?search=${search}`;
  return api(`get_warehouses${search_query}`, "GET");
}
export function createWarehouse(data) {
  return api("create_warehouse", "post", data);
}
export function updateWarehouse(data) {
  return api("update_warehouse", "put", data);
}

// products

export function warehouseProducts(warehouse_id, search, page, limit) {
  let search_query = ``;
  if (search) search_query = `&search=${search}`;
  return api(
    `get_warehouse_products?warehouse_id=${warehouse_id}${search_query}&page=${page}&limit=${limit}`,
    "get"
  );
}

// user

export function users(search, status, page, limit) {
  let search_query = ``;
  if (search) search_query = `search=${search}&`;
  return api(
    `get_users?${search_query}status=${status}&page=${page}&limit=${limit}`,
    `GET`
  );
}
export function createUser(data) {
  return api(`create_user`, `POST`, data);
}
export function updateUser(data) {
  return api(`update_user`, `PUT`, data);
}

// market

export function markets(search, page, limit) {
  let search_query = ``;
  if (search) search_query = `search=${search}&`;
  return api(`get_markets?${search_query}page=${page}&limit=${limit}`, `GET`);
}
export function createMarket(data) {
  return api(`create_market`, `POST`, data);
}
export function updateMarket(data) {
  return api(`update_market`, `PUT`, data);
}

// category

export function cateogries(search, page, limit) {
  let search_query = ``;
  if (search) search_query = `search=${search}&`;
  return api(
    `get_categories?${search_query}page=${page}&limit=${limit}`,
    `GET`
  );
}
export function createCategory(data) {
  return api(`create_category`, `POST`, data);
}
export function updateCategory(data) {
  return api(`update_category`, `PUT`, data);
}

// brand

export function brands(search, category_id, page, limit) {
  let search_query = ``;
  if (search) search_query = `search=${search}&`;
  return api(
    `get_brands?${search_query}category_id=${category_id}&page=${page}&limit=${limit}`,
    `GET`
  );
}
export function createBrand(data) {
  return api(`create_brand`, `POST`, data);
}
export function updateBrand(data) {
  return api(`update_brand`, `PUT`, data);
}

// currency

export function currencies() {
  return api(`get_currencies`, `GET`);
}
export function createCurrency(data) {
  return api(`create_currency`, `POST`, data);
}
export function updateCurrency(data) {
  return api(`update_currency`, `PUT`, data);
}

// expense

export function payForMarket(data) {
  return api(`pay_for_market_expense`, `POST`, data);
}
