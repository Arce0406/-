// https://gist.github.com/tkambler/71050d80f1a57ea83c18

// let myStorage = window.localStorage;

// function test() {
//   localStorage.setItem("myCat", "Tom");
//   var cat = localStorage.getItem("myCat");
//   localStorage.removeItem("myCat");
//   // Clear all items
//   localStorage.clear();
// }

function saveItems(t) {
  localStorage.setItem("ddtooljsonstr", t);
}

function getItems() {
  const jstr = localStorage.getItem("ddtooljsonstr");
  if (jstr) return JSON.parse(jstr);
  else return;
}

/**
 * 確認
 * @param {*} title
 * @param {*} content
 * @returns
 */
function addItem(title, content) {
  if (!title || !content) return "no input.";

  let items = getItems();
  if (!items) items = {};

  //Object.entries(items).forEach(([k, v]) => (window[k] = v));
  // 若含相同key值，中止
  if (items.hasOwnProperty(title)) {
    return `新增失敗，已經存在key值為${title}的物件。`;
  }
  items[title] = content;
  saveItems(JSON.stringify(items));
}

function updateItem(title, content) {
  if (!title || !content) return "no input.";

  let items = getItems();  
  if (!items) items = { callitems: [] };
  // console.log(items, items.hasOwnProperty(title));

  //Object.entries(items).forEach(([k, v]) => (window[k] = v));
  // 若含相同key值，中止
  if (!items.hasOwnProperty(title)) {
    return `更新失敗，找不到key值為${title}的物件。`;
  }
  items[title] = content;
  saveItems(JSON.stringify(items));
}

function deleteItem(title) {
  if (!title) return "no input.";

  let items = getItems();
  if (!items) return `刪除失敗，找不到key值為${title}的物件。`;

  delete items[title];
  saveItems(JSON.stringify(items));
}

export { saveItems, getItems, addItem, updateItem, deleteItem };
