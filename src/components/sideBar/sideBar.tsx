import s from "./sideBar.module.scss"
import React from "react";
import {sideBarTabs} from "../../mocks/sideBarTabs";
import SideBarIcon from "../../shared/sideBarIcon/sideBarIcon";

function SideBar() {
  return (
      <div className={s.sideBar}>
        <div className={s.sideBarHeader}>
          <div>
            <h1>Название проекта</h1>
            <span>Аббревиатура</span>
          </div>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.41 0.589996L6 5.17L10.59 0.589996L12 2L6 8L0 2L1.41 0.589996Z" fill="white"/>
          </svg>
        </div>
        <ul>
          {
            sideBarTabs.map((item) => (
                <li className={s.sideBarItem} key={item.id}>
                  <div className={s.itemIcon}>
                    <SideBarIcon/>
                  </div>
                  <div className={s.itemName}>
                    {item.name}
                  </div>

                </li>
            ))
          }
        </ul>
      </div>
  );
}

export default SideBar;