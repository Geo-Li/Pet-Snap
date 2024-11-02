import React from "react";

export default function MainContent() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-[97%] w-[97%] rounded-lg bg-orange-50">
        <div className="grid h-full w-full grid-cols-6 grid-rows-5 gap-4 p-4">
          <div className="col-span-2 row-span-3 rounded-md bg-white">01</div>
          <div className="col-span-2 row-span-2 rounded-md bg-white">02</div>
          <div className="col-span-2 row-span-3 rounded-md bg-white">03</div>
          <div className="col-span-2 row-span-3 rounded-md bg-white">04</div>
          <div className="col-span-2 row-span-2 rounded-md bg-white">05</div>
          <div className="col-span-2 row-span-2 rounded-md bg-white">06</div>
        </div>
      </div>
    </div>
  );
}
