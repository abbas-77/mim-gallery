import React, { FC } from "react";

type Props = {
  color: string;
};

const Navbar: FC<Props> = ({ color }) => {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-50 px-20 py-5 flex items-center gap-32 justify-between text-white"
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
      </div>
    </div>
  );
};

export default Navbar;
