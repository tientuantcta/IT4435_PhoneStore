import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ViewPhoneSale = () => {
  const location = useLocation();
  const { order } = location.state;
  const [isLoading, setIsLoading] = useState(true);
  const [orderInfo, setOrderInfo] = useState({});

  const formatTime = (time) => {
    const formattedTime = new Date(time).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedTime;
  };

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/order/get/${order.id}`
      );
      setOrderInfo(response.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="right">
      <div className="right__content">
        <div className="right__title">Bảng điều khiển</div>
        <p className="right__desc">Cập nhật hoá đơn bán</p>
        <div className="right__formWrapper">
          <div>
            <h2>Số hoá đơn: {orderInfo.id}</h2>
            <br></br>
            <p class="big">
              <strong>Tên khách hàng :</strong> {orderInfo.tenKhachHang}
            </p>

            <p class="big">
              <strong>Địa chỉ:</strong> {orderInfo.diaChi}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {orderInfo.SDT}
            </p>
            <p>
              <strong>Tổng tiền:</strong> {order.tongTien} (triệu đồng)
            </p>
            <p>
              <strong>Thời gian:</strong> {formatTime(orderInfo.ngay)}
            </p>
            <p>
              <strong>Thời gian bảo hành:</strong> {orderInfo.thoiGianBaoHanh}{" "}
              ngày
            </p>
            <p>
              <strong>Mô tả:</strong> {orderInfo.description}
            </p>
            <div className="product-table">
              <table>
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {orderInfo.sanPham.map((product) => (
                    <tr key={product.id}>
                      <td>{product.tenSanPham}</td>
                      <td>{product.soLuong}</td>
                      <td>{product.donGia} triệu đồng</td>
                      <td>{product.tongTien} triệu đồng</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPhoneSale;
