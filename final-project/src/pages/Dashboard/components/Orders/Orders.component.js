import React from "react";
import { Tabs } from "./components/Tabs/Tabs.component";

function Orders() {
  return (
    <div className="mx-44 rounded-lg">
      <div className="flex items-center justify-between mt-12">
        <p className="text-2xl -mt-7 font-extrabold">مدیریت سفارش ها</p>
      </div>
      <div className="mt-10">
        <Tabs />
      </div>
    </div>
  );
}

export { Orders };
