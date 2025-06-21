import React, { FC } from "react";

type Props = {
  color: string;
};

const Navbar: FC<Props> = ({ color }) => {
  return (
    <div
      className="bg-[#0b150e] px-20 py-5 flex items-center gap-32 justify-between text-white"
      dir="rtl"
    >
      <div className="font-extrabold text-3xl">لوگو</div>
      <div className="flex items-center gap-5 w-full">
        <div>ایتم اول</div>
        <div>ایتم دوم</div>
        <div>ایتم سوم</div>
        <div>ایتم چهارم</div>
        <div>{color}</div>
      </div>
      <div className="flex items-center gap-5">
        <div className="border-2 border-[#cbb26e] rounded-[10px] px-5 py-2 text-sm text-[#cbb26e] cursor-pointer">
          login
        </div>
        {/* <div className="border border-blue-400 rounded-[10px] px-5 py-2 text-sm text-blue-500 cursor-pointer hover:bg-gray-200">login</div> */}
      </div>
    </div>
  );
};

export default Navbar;
