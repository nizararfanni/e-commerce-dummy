import { useEffect, useState } from "react";

type tranasactionDetail = {
  order_id: string;
  gross_amount: number;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
};

const OnSuccess = () => {
  const [orderDetail, setOrderDetail] = useState<tranasactionDetail | null>(
    null
  );

  //ambil data dr local storage yg gw krim
  useEffect(() => {
    const orderDetail = localStorage.getItem("order_detail");
    console.log("order detail", orderDetail);
    if (!orderDetail) return;
    setOrderDetail(JSON.parse(orderDetail));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="max-w-[600px] flex justify-center items-center  flex-col gap-4  bg-gray-200 border-4 border-gray-400 shadow-[28px_28px_0px_rgba(0,0,0,50)] shadow-gray-400 p-4">
        <h1 className="text-2xl mb-2">The Details Transaction is here.</h1>
        <div className="flex flex-col justify-center items-center  mx-auto min-w-[500px] p-6 ">
          {orderDetail && (
            <div className="flex flex-col justify-between gap-3 ">
              <p className="font-bold text-xl">
                Order ID: {orderDetail.order_id}
              </p>
              <p className="font-bold text-xl">
                Gross Amount: Rp.
                {orderDetail.gross_amount.toLocaleString("id-ID")};
              </p>
              <p className="font-bold text-xl">
                Payment Type: {orderDetail.payment_type}
              </p>
              <p className="font-bold text-xl">
                transation time : {orderDetail.transaction_time}
              </p>
              <p className="font-bold text-xl">
                status transiction: {orderDetail.transaction_status}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnSuccess;
