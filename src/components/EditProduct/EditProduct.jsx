import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

const EditProduct = () => {
  const location = useLocation();
  const history = useHistory();
  const { product } = location.state;
  console.log(product);
  const [phoneCategories, setPhoneCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currproduct, setProduct] = useState({
    id: product.id,
    name: product.name,
    image: product.image,
    quantity: product.quantity,
    sold: product.sold,
    price: product.price,
    description: product.description,
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
    setProduct({ ...currproduct, [name]: value });
    console.log(currproduct);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to update this product?"
    );
    if (confirmed) {
      try {
        const response = await axios.patch(
          "http://localhost:3000/product/update",
          currproduct
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
                value={currproduct.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="right__inputWrapper">
              <label htmlFor="image">Link hình ảnh</label>
              <input
                type="text"
                name="image"
                value={currproduct.image}
                onChange={handleInputChange}
              />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="quantity">Số lượng</label>
              <input
                type="text"
                placeholder="Số lượng"
                name="quantity"
                value={currproduct.quantity}
                onChange={handleInputChange}
              />
            </div>

            <div className="right__inputWrapper">
              <label htmlFor="sold">Đã bán</label>
              <input
                type="text"
                placeholder="Đã bán"
                name="sold"
                value={currproduct.sold}
                onChange={handleInputChange}
              />
            </div>

            <div className="right__inputWrapper">
              <label htmlFor="price">Giá sản phẩm</label>
              <input
                type="text"
                placeholder="Giá sản phẩm"
                name="price"
                value={currproduct.price}
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
                value={currproduct.description}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn">
              Cập nhật sản phẩm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
