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

// product

export function warehouseProducts(warehouse_id, search, page, limit) {
  let search_query = ``;
  if (search) search_query = `&search=${search}`;
  return api(
    `get_warehouse_products?warehouse_id=${warehouse_id}${search_query}&page=${page}&limit=${limit}`,
    "get"
  );
}
export function updateWarehouseProductPrice(data) {
  return api(`update_warehouse_product_price`, "put", data);
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

// shop

export function shops(search, page, limit) {
  let search_query = ``;
  if (search) search_query = `search=${search}$`;
  return api(`get_shops?${search_query}page=${page}&limit=${limit}`, "get");
}
export function createShop(data) {
  return api(`create_shop`, "post", data);
}
export function updateShop(data) {
  return api(`update_shop`, "put", data);
}
export function takeMoneyFromShop(data) {
  return api(`take_money_from_shop`, "post", data);
}
export function shopIncomes(shop_id, from_time, to_time, page, limit) {
  let time_query = ``;
  if (from_time && to_time)
    time_query = `from_time=${from_time}&to_time=${to_time}&`;
  return api(
    `get_shop_incomes?shop_id=${shop_id}&${time_query}page=${page}&limit=${limit}`,
    "get"
  );
}

// order

export function orders(shop_id, user_id, status, page, limit) {
  return api(
    `get_orders?shop_id=${shop_id}&user_id=${user_id}&status=${status}&page=${page}&limit=${limit}`,
    "get"
  );
}
export function orderBalance(order_id) {
  return api(`get_order_balances/${order_id}`, "get");
}
export function createOrder(data) {
  return api(`create_order`, "post", data);
}
export function removeOrder(data) {
  return api("remove_order", "delete", data);
}
export function confirmationOrder(data) {
  return api(`confirmation_order`, "put", data);
}

// trade

export function trades(order_id, warehouse_id, page, limit) {
  return api(
    `get_trades?order_id=${order_id}&warehouse_id=${warehouse_id}&page=${page}&limit=${limit}`,
    "get"
  );
}
export function toTrade(data) {
  return api("to_trade", "post", data);
}
export function removeTrade(trade_id) {
  return api(`remove_trade/${trade_id}`, "delete");
}

// category

export function categories(search, page, limit) {
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
export function marketExpenses(market_id, from_time, to_time, page, limit) {
  let time_query = ``;
  if (from_time && to_time)
    time_query = `from_time=${from_time}&to_time=${to_time}&`;
  return api(
    `get_market_expenses/${market_id}?${time_query}page=${page}&limit=${limit}`,
    "get"
  );
}
export function payForPartyExpense(data) {
  return api(`pay_for_party_expense`, `POST`, data);
}
export function partyExpenses(party_id, page, limit) {
  return api(
    `get_party_expenses/${party_id}?page=${page}&limit=${limit}`,
    "get"
  );
}

// party

export function parties(status, page, limit) {
  return api(`get_parties?status=${status}&page=${page}&limit=${limit}`, "get");
}
export function createParty() {
  return api(`create_party`, "post");
}
export function confirmationParty(data) {
  return api(`confirmation_party`, "put", data);
}
export function partyBalance(party_id) {
  return api(`get_party_balance/${party_id}`, "get");
}

// supply

export function supplies(market_id, party_id, warehouse_id, page, limit) {
  return api(
    `get_supplies?market_id=${market_id}&party_id=${party_id}&warehouse_id=${warehouse_id}&page=${page}&limit=${limit}`,
    "get"
  );
}
export function takeSupply(data) {
  return api(`take_supply`, "post", data);
}
export function removeSupply(supply_id) {
  return api(`remove_supply/${supply_id}`, "delete");
}

// statistic

export function profitStatistic(from_time, to_time, shop_id) {
  let time_query = ``;
  if (from_time && to_time)
    time_query = `from_time=${from_time}&to_time=${to_time}&`;
  return api(`get_profit_statistics?${time_query}shop_id=${shop_id}`, "get");
}
export function productStatistic(from_time, to_time, limit) {
  let time_query = ``;
  if (from_time && to_time)
    time_query = `from_time=${from_time}&to_time=${to_time}&`;
  return api(`get_product_statistics?${time_query}limit=${limit}`, "get");
}
