import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const InsertProduct = () => {
  const history = useHistory();
  const [phoneCategories, setPhoneCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    image: "",
    quantity: "",
    sold: "",
    price: "",
    description: "",
  });

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/category/get");
      setPhoneCategories(JSON.parse(response.data.data));
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
    console.log(product);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to add this product?"
    );

    if (confirmed) {
      try {
        const response = await axios.post(
          "http://localhost:3000/product/add",
          product
        );
        console.log(response.data);
        history.push("/admin/products");
      } catch (error) {
        console.error(error);
        // Handle error or show an error message
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="right">
      <div className="right__content">
        <div className="right__title">Bảng điều khiển</div>
        <p className="right__desc">Thêm điện thoại</p>
        <div className="right__formWrapper">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="right__inputWrapper">
              <label htmlFor="title">Tên điện thoại</label>
              <input
                type="text"
                placeholder="Tiêu đề"
                name="name"
                value={product.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="p_category">Loại</label>
              <select
                name="categoryId"
                value={product.categoryId}
                onChange={handleInputChange}
              >
                <option disabled="" selected="">
                  Chọn danh mục
                </option>
                {phoneCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="right__inputWrapper">
              <label htmlFor="image">Link hình ảnh</label>
              <input
                type="text"
                name="image"
                value={product.image}
                onChange={handleInputChange}
              />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="quantity">Số lượng</label>
              <input
                type="text"
                placeholder="Số lượng"
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
              />
            </div>

            <div className="right__inputWrapper">
              <label htmlFor="sold">Đã bán</label>
              <input
                type="text"
                placeholder="Đã bán"
                name="sold"
                value={product.sold}
                onChange={handleInputChange}
              />
            </div>

            <div className="right__inputWrapper">
              <label htmlFor="price">
                Giá sản phẩm (đơn vị : triệu đồng, ví dụ : 10.50 (10 triệu 500
                nghìn đồng) )
              </label>

              <input
                type="text"
                placeholder="Giá sản phẩm"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="right__inputWrapper">
              <label htmlFor="description ">Mô tả</label>
              <textarea
                name="description"
                cols={30}
                rows={10}
                placeholder="Mô tả"
                value={product.description}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn">
              Thêm sản phẩm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InsertProduct;
