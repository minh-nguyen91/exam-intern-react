/* App.jsx */
import './App.css';
import React, { useState} from 'react';
import { IoMdCart } from 'react-icons/io';
import { IoCartOutline } from "react-icons/io5";

const products = [
    { id: 1, name: 'Áo thun trắng', price: 150000, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab' },
    { id: 2, name: 'Quần jeans xanh', price: 300000, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d' },
    { id: 3, name: 'Tai nghe không dây', price: 500000, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df' },
    { id: 4, name: 'Sạc dự phòng', price: 200000, image: 'https://images.unsplash.com/photo-1706275399524-813e89914e43' },
    { id: 5, name: 'Giày thể thao', price: 450000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
    { id: 6, name: 'Áo khoác', price: 350000, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3' },
    { id: 7, name: 'Mũ lưỡi trai', price: 100000, image: 'https://images.unsplash.com/photo-1560774358-d727658f457c' },
    { id: 8, name: 'Đồng hồ thể thao', price: 600000, image: 'https://images.unsplash.com/photo-1523475496153-3d6cc0f0bf19' },
    { id: 9, name: 'Ba lô du lịch', price: 400000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62' },
    { id: 10, name: 'Kính râm thời trang', price: 250000, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f' },
    { id: 11, name: 'Bình nước giữ nhiệt', price: 180000, image: 'https://images.unsplash.com/photo-1648919725390-1eec35fdf32c' },
    { id: 12, name: 'Ốp lưng điện thoại', price: 80000, image: 'https://images.unsplash.com/photo-1593055454503-531d165c2ed8' },
];

// Displays a small red circle showing how many different items are in the basket.
// Only rendered if there's at least one item.
function BasketTotal({ totalBasket }){ 
  if (totalBasket.length === 0) return null;
  else return <div className="baskettotal">{totalBasket.length}</div>
}

// Window that appears to show the basket's content.
// For each product, displays its image, name, unit price, quantity, and total.
// Appears when isVisible is true (toggled by clicking the basket icon ("giỏ hàng")).
function BasketWindow({ isVisible, items }){
  if (!isVisible) return null; // Prevent rendering if the basket isn't open
  return (
  <div id="basketwindow">
      {items.map((item) => (
          <div key={item.id} className="basketbox">
              <img src={item.image} alt={item.name} className="basketimage" title={item.name} width={100} height={100}/>
              <p className="basketname">{item.name}</p> 
              <p className="basketprice">Thành tiền: {item.price.toLocaleString('vi-VN', {maximumFractionDigits:0})} x {item.num} = {item.total.toLocaleString('vi-VN', {maximumFractionDigits:0})} VND</p>
          </div>
      ))}
  </div>
  )
}

function App() {
  const [basketProducts, setBasketProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Toggles the visibility of the basket window (open/close).
  const toggleBasketWindow = () => { 
    setIsVisible(previousValue => !previousValue);
  };
  
  // Find full product info based on ID.
  // Used inside the basket window to get name, image, and price for rendering.
  function getProductsInfo(id) {
    return products.find(item => item.id === Number(id));
  }
  
  // Handles the "itembuybutton" button click:
  // If the product is already in the basket, update its quantity and total price.
  // Otherwise, add the item with its information from products with a quantity of 1 (num = 1) and a total equal to the price multiplied by its quantity.
  function buyButtonClick(event) {
    const elementId = Number(event.currentTarget.id);
    var product = basketProducts.find(item => item.id === elementId);

    if (product) {
      setBasketProducts(prev =>
        prev.map(item =>
          item.id === elementId ? { ...item, num: item.num + 1, total: item.total + item.price } : item
        )
      );
    } else {
      product = getProductsInfo(elementId);
      setBasketProducts(prev => [...prev, { id: elementId, name: product.name, price: product.price, image: product.image, num: 1, total: product.price}]);
    }
  };

  return (
    <main>
      <nav>
        <button className="basketbutton" onClick={toggleBasketWindow}>Giỏ hàng <IoCartOutline style={{width: '20px', height: '20px'}}/></button>
        <BasketTotal totalBasket={basketProducts}/> {/* Renders the red badge showing how many different items are in the basket */}
        <BasketWindow isVisible={isVisible} items={basketProducts}/> {/* Renders the window showing the basket contents, if the window is toggled open */}
      </nav>
      <div className="container">
          {products.map((item) => (
              <div key={item.id} className="itembox">
                  <img src={item.image} alt={item.name} className="itemimage" title={item.name} width={300} height={300}/>
                  <p className="itemname">{item.name}</p>
                  <p className="itemprice">{item.price.toLocaleString('vi-VN', {maximumFractionDigits:0})} VND</p>
                  {/* "Add to basket" button with shopping cart icon */}
                  <button onClick={buyButtonClick} className="itembuybutton" id={item.id}><IoMdCart style={{width: '70%', height: '70%'}} /></button>
              </div>
          ))}
      </div>
    </main>
  )
}

export default App