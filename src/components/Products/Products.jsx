import React from "react";
import ImgProduct1 from "../../images/product1.jpg";
import ImgProduct2 from "../../images/product2.jpg";
import ImgProduct3 from "../../images/product3.jpg";
import IconEdit from "../../assets/icon-edit.svg";
import IconDelete from "../../assets/icon-trash-black.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Products = () => {
  const [productList, setProductList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product/get");
      console.log(response.data.data);
      setProductList(JSON.parse(response.data.data));
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDeleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3000/product/delete/${productId}`);
        // Update the product list after successful deletion
        fetchData();
      } catch (error) {
        console.error(error);
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
        <p className="right__desc">Xem sản phẩm</p>
        <div className="right__table">
          <div className="right__tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Giá SP (triệu đồng)</th>
                  <th>Loại</th>
                  <th>Đã bán</th>
                  <th>Còn lại</th>
                  <th>Sửa</th>
                  <th>Xoá</th>
                </tr>
              </thead>

              {productList.map((product, index) => (
                <tr key={product.id}>
                  <td data-label="STT">{index + 1}</td>
                  <td data-label="Tên sản phẩm">{product.name}</td>
                  <td data-label="Hình ảnh">
                    <img style={{ width: 200 }} src={product.image} alt="" />
                  </td>
                  <td data-label="Giá SP">{product.price}</td>

                  <td data-label="Loại">{product.categoryName}</td>

                  <td data-label="Đã bán">{product.sold}</td>

                  <td data-label="Còn lại">{product.quantity}</td>

                  <td data-label="Sửa" className="right__iconTable">
                    <Link
                      to={{
                        pathname: `/admin/editProduct/${product.id}`,
                        state: { product },
                      }}
                    >
                      <img src={IconEdit} alt="" />
                    </Link>
                  </td>
                  <td data-label="Xoá" className="right__iconTable">
                    <img
                      src={IconDelete}
                      alt=""
                      onClick={() => {
                        onDeleteProduct(product.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
