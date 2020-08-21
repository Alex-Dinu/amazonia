import Axios from "axios";

export async function getNewCartId() {
  try {
    const { data } = await Axios.post("http://localhost:8080/cart", {});
    //console.log(">>>CartScreen.getNewCartId cartid=" + data.id);
    return data.id;
  } catch (error) {
    //.log(">>>CartScreen.updateCartDataStore error=" + error.message);
  }
}
