import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import meal1 from "../../assets/dashboard/meal-1.svg";
import meal2 from "../../assets/dashboard/meal-2.svg";
import meal3 from "../../assets/dashboard/meal-3.svg";

import ImgProduct1 from "../../images/product1.jpg";
import ImgProduct2 from "../../images/product2.jpg";
import ImgProduct3 from "../../images/product3.jpg";
import IconEdit from "../../assets/icon-edit.svg";
import IconDelete from "../../assets/icon-trash-black.svg";

import axios from "axios";
const Dashboard = () => {
  const [checkboxes, setCheckboxes] = useState([true, false]);

  const toggleCheckbox = (id) => {
    setCheckboxes((checkboxes) =>
      checkboxes.map((checkbox, index) => (index === id ? !checkbox : checkbox))
    );
  };

  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [productResponse, orderResponse] = await Promise.all([
        axios.get("http://localhost:3000/product/get"),
        axios.get("http://localhost:3000/order/get"),
      ]);

      const productData = JSON.parse(productResponse.data.data);
      const orderData = orderResponse.data;

      setProductList(productData);
      setOrderList(orderData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Make sure to set isLoading to false even if an error occurs
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="right">
      <div className="right__content">
        <div className="right__title">Bảng điều khiển</div>
        <p className="right__desc">Bảng điều khiển</p>
        <div className="right__cards">
          <Link className="right__card" to="/admin/products">
            <div className="right__cardTitle">Sản Phẩm</div>
            <div className="right__cardNumber">{productList.length}</div>
            <div className="right__cardDesc">Xem Chi Tiết</div>
          </Link>
          <Link className="right__card" to="/admin/createPhoneSale">
            <div className="right__cardTitle">Tạo hoá đơn bán</div>
            <div className="right__cardNumber">{orderList.length}</div>
            <div className="right__cardDesc">Xem Chi Tiết</div>
          </Link>
          <Link className="right__card" to="/admin/createEnterPhone">
            <div className="right__cardTitle">Nhập điện thoại</div>
            <div className="right__cardNumber">4</div>
            <div className="right__cardDesc">Xem Chi Tiết</div>
          </Link>
          <Link className="right__card" to="/admin/chart">
            <div className="right__cardTitle">Thống kê doanh thu</div>
            <div className="right__cardNumber">72</div>
            <div className="right__cardDesc">Xem Chi Tiết</div>
          </Link>
        </div>
        <div className="right__table">
          <p className="right__tableTitle">Sản phẩm mới</p>
          <div className="right__tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Giá SP</th>
                  <th>Đã bán</th>

                  <th>Thời gian</th>
                  <th>Sửa</th>
                  <th>Xoá</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="STT">1</td>
                  <td data-label="Tên sản phẩm"> iPhone 14 Pro Max 128GB</td>
                  <td data-label="Hình ảnh">
                    <img src={ImgProduct1} alt="" />
                  </td>
                  <td data-label="Giá SP">26.680.000₫</td>
                  <td data-label="Đã bán">1</td>

                  <td data-label="Thời gian">2020-07-13 21:31:05</td>
                  <td data-label="Sửa" className="right__iconTable">
                    <Link to="/admin/editProduct/iphone14-pro-max-128gb">
                      <img src={IconEdit} alt="" />
                    </Link>
                  </td>
                  <td data-label="Xoá" className="right__iconTable">
                    <img src={IconDelete} alt="" />
                  </td>
                </tr>
                <tr>
                  <td data-label="STT">2</td>
                  <td data-label="Tên sản phẩm">iPhone 13 Pro Max 128GB</td>
                  <td data-label="Hình ảnh">
                    <img src={ImgProduct2} alt="" />
                  </td>
                  <td data-label="Giá SP">18.500.000₫</td>
                  <td data-label="Đã bán">0</td>

                  <td data-label="Thời gian">2020-07-13 22:19:01</td>
                  <td data-label="Sửa" className="right__iconTable">
                    <Link to="/admin/editProduct/iphone-13-pro-max-128gb">
                      <img src={IconEdit} alt="" />
                    </Link>
                  </td>
                  <td data-label="Xoá" className="right__iconTable">
                    <img src={IconDelete} alt="" />
                  </td>
                </tr>
                <tr>
                  <td data-label="STT">3</td>
                  <td data-label="Tên sản phẩm">Samsung S21 FE</td>
                  <td data-label="Hình ảnh">
                    <img src={ImgProduct3} alt="" />
                  </td>
                  <td data-label="Giá SP">12.490.000 ₫</td>
                  <td data-label="Đã bán">1</td>

                  <td data-label="Thời gian">2020-07-13 21:30:41</td>
                  <td data-label="Sửa" className="right__iconTable">
                    <Link to="/admin/editProduct/samsung-s21-fe">
                      <img src={IconEdit} alt="" />
                    </Link>
                  </td>
                  <td data-label="Xoá" className="right__iconTable">
                    <img src={IconDelete} alt="" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link to="/admin/products" className="right__tableMore">
            <p>Xem tất cả sản phẩm</p>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
