// @ts-nocheck

import { Sidebar, SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Link } from "react-router";
import { useRef } from "react";
import Navitems from "./Navitems";

const MobileSidebar = () => {
  let sidebar: any;

  const toggleSidebar = () =>{
    sidebar.toggle()
  }

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            className="size-[30px]"
          />
          <h1>Tourvisto</h1>
        </Link>
        <button onClick={toggleSidebar}>
          <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
        </button>
      </header>
      <SidebarComponent
        width={270}
        ref={(Sidebar) => (sidebar = Sidebar)}
        created={() => sidebar.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="over"
      >
        <Navitems handleClick={toggleSidebar}/>
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
