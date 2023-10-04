const store = document.getElementById("store");
const bag = document.getElementById("bag");

store.addEventListener("click", function (e) {
  if (e.target.nodeName === "BUTTON") {
    const item = e.target.parentElement;
    const itemName = item.textContent.trim().split("\n")[0];

    addToCookie(itemName);

    e.target.remove(); // Remove the button
    store.removeChild(item);
    bag.appendChild(item);
  }
});

// Populate bag from cookie on page load
const savedItems = getCookie("bagItems");
if (savedItems) {
  savedItems.split(",").forEach((itemName) => {
    if (itemName) {
      moveItemToBag(itemName);
    }
  });
}

function addToCookie(itemName) {
  const existingItems = getCookie("bagItems") || "";
  if (!existingItems.split(",").includes(itemName)) {
    document.cookie =
      "bagItems=" + existingItems + (existingItems ? "," : "") + itemName;
  }
}

function moveItemToBag(itemName) {
  const store = document.getElementById("store");
  const bag = document.getElementById("bag");

  Array.from(store.children).forEach((li) => {
    if (li.textContent.includes(itemName)) {
      const button = li.querySelector("button");
      if (button) button.remove(); // Remove the button

      store.removeChild(li);
      bag.appendChild(li);
    }
  });
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function checkout() {
  alert("Proceeding to checkout!");
}
