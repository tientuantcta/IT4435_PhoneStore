import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.jsx";
import { changeActiveSidebarItem } from "../../actions/navigation.js";

import cn from "classnames";

const Sidebar = (props) => {
  const { activeItem = "", ...restProps } = props;

  const [burgerSidebarOpen, setBurgerSidebarOpen] = useState(false);

  useEffect(() => {
    if (props.sidebarOpened) {
      setBurgerSidebarOpen(true);
    } else {
      setTimeout(() => {
        setBurgerSidebarOpen(false);
      }, 0);
    }
  }, [props.sidebarOpened]);

  return (
    <nav className={cn(s.root, { [s.sidebarOpen]: burgerSidebarOpen })}>
      <header className={s.logo}>
        <span className={s.title}>PHONE STORE</span>
      </header>
      <ul className={s.nav}>
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Trang chủ"
          isHeader
          iconName={<i className={"eva eva-home-outline"} />}
          link="/admin/dashboard"
          index="dashboard"
          // badge="9"
        />
        <h5 className={s.navTitle}>Menu</h5>
        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Tất Cả Điện thoại "
          isHeader
          iconName={<i className={"eva eva-grid-outline"} />}
          link="/admin/products"
          index="typography"
        />

        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Thêm Điện thoại "
          isHeader
          iconName={<i className={"eva eva-smartphone-outline"} />}
          link="/admin/insertProduct"
          index="typography"
        />

        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Bán điện thoại"
          isHeader
          iconName={<i className={"eva eva-shopping-bag-outline"} />}
          link="/admin/uielements"
          index="uielements"
          childrenLinks={[
            {
              header: "Tạo hoá đơn bán",
              link: "/admin/createPhoneSale",
            },
            {
              header: "Xem hoá đơn bán",
              link: "/admin/viewsPhoneSale",
            },
          ]}
        />

        <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={props.activeItem}
          header="Thống kê doanh số"
          isHeader
          iconName={<i className={"eva eva-bar-chart-outline"} />}
          link="/admin/chart"
          index="typography"
        />
      </ul>
    </nav>
  );
};

Sidebar.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
