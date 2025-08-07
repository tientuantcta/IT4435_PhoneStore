import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreatePhoneSale = () => {
  const history = useHistory();
  const [products, setProducts] = useState([
    { productId: "", soLuong: "", donGia: "" },
  ]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = () => {
    axios
      .get("http://localhost:3000/product/get")
      .then((response) => {
        setProductList(JSON.parse(response.data.data));
      })
      .catch((error) => {
        console.error("Error fetching product list:", error);
      });
  };

  const handleProductChange = (index, field, value) => {
    const selectedProduct = productList.find(
      (product) => product.id === parseInt(value)
    );
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
      donGia: selectedProduct
        ? selectedProduct.price
        : updatedProducts[index].donGia,
    };
    setProducts(updatedProducts);
  };
  const handleAddProduct = () => {
    setProducts([...products, { productId: "", soLuong: "", donGia: "" }]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "tenKhachHang",
      "diaChi",
      "SDT",
      "ngay",
      "thoiGianBaoHanh",
    ];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (e.target.elements[field].value === "") {
        alert(`Please fill in the ${field} field`);
        return;
      }
    }

    const confirmed = window.confirm(
      "Are you sure you want to submit the order?"
    );
    if (confirmed) {
      const order = {
        tenKhachHang: e.target.elements.tenKhachHang.value,
        diaChi: e.target.elements.diaChi.value,
        SDT: e.target.elements.SDT.value,
        sanPham: products,
        ngay: e.target.elements.ngay.value,
        thoiGianBaoHanh: e.target.elements.thoiGianBaoHanh.value,
        description: e.target.elements.description.value,
      };

      axios
        .post("http://localhost:3000/order/add", order)
        .then((response) => {
          console.log("Order added successfully:", response.data);
          history.push("/admin/viewsPhoneSale");
        })
        .catch((error) => {
          console.error("Error adding order:", error);
          // Optionally, you can handle the error or show an error message here
        });
    }
  };
  return (
    <div className="right">
      <div className="right__content">
        <div className="right__title">Bảng điều khiển</div>
        <p className="right__desc">Tạo hoá đơn bán điện thoại</p>
        <div className="right__formWrapper">
          <form onSubmit={handleSubmit}>
            <div className="right__inputWrapper">
              <label htmlFor="tenKhachHang">Tên khách hàng</label>
              <input
                type="text"
                id="tenKhachHang"
                placeholder="Tên khách hàng"
              />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="diaChi">Địa chỉ</label>
              <input type="text" id="diaChi" placeholder="Địa chỉ" />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="SDT">SĐT</label>
              <input type="text" id="SDT" placeholder="SĐT" />
            </div>

            {products.map((product, index) => (
              <div key={index}>
                <div className="right__inputWrapper">
                  <label htmlFor={`productId-${index}`}>Sản phẩm bán</label>
                  <select
                    id={`productId-${index}`}
                    value={product.productId}
                    onChange={(e) =>
                      handleProductChange(index, "productId", e.target.value)
                    }
                  >
                    <option value="">-- Chọn sản phẩm --</option>
                    {productList.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="right__inputWrapper">
                  <label htmlFor={`donGia-${index}`}>
                    Đơn giá (triệu đồng)
                  </label>
                  <input
                    type="text"
                    id={`donGia-${index}`}
                    placeholder="Đơn giá"
                    value={product.donGia}
                    readOnly={true}
                  />
                </div>

                <div className="right__inputWrapper">
                  <label htmlFor={`soLuong-${index}`}>Số lượng</label>
                  <input
                    type="number"
                    id={`soLuong-${index}`}
                    placeholder="Số lượng"
                    value={product.soLuong}
                    onChange={(e) =>
                      handleProductChange(index, "soLuong", e.target.value)
                    }
                  />
                </div>

                {index > 0 && (
                  <div
                    className="btn"
                    onClick={() => handleRemoveProduct(index)}
                  >
                    Xóa sản phẩm
                  </div>
                )}
              </div>
            ))}

            <div className="btn" onClick={handleAddProduct}>
              Thêm sản phẩm
            </div>

            <div className="right__inputWrapper">
              <label htmlFor="ngay">Ngày</label>
              <input type="date" id="ngay" />
            </div>

            <div className="right__inputWrapper">
              <label htmlFor="thoiGianBaoHanh">Thời gian bảo hành (ngày)</label>
              <input
                type="number"
                id="thoiGianBaoHanh"
                placeholder="Thời gian bảo hành "
              />
            </div>

            <div className="right__inputWrapper">
              <label htmlFor="description">Mô tả</label>
              <textarea
                id="description"
                cols={30}
                rows={10}
                placeholder="Mô tả"
                defaultValue={""}
              />
            </div>
            <button className="btn" type="submit">
              Tạo hoá đơn bán điện thoại
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePhoneSale;
