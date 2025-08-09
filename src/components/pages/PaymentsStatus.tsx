import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Payment = {
  order_id: string;
  gross_amount: number;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  transaction_id: string;
  status_message: string;
};
// /payments/:order_id
function PaymentStatus() {
  const { orderId } = useParams();
  const [payment, setPayment] = useState<Payment | null>(null);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/payments/${orderId}`
        );
        const data = await response.json();
        console.log(data);

        setPayment(data.payment);
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };
    fetchPaymentStatus();
  }, [orderId]);
  if (!payment) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="max-w-[600px] flex justify-center items-center  rounded-md  flex-col gap-4  bg-gray-200 border-4 border-gray-400 shadow-[28px_28px_0px_rgba(0,0,0,50)] shadow-gray-400 p-4">
        <h1 className="text-2xl mb-2">The Details Transaction is here.</h1>
        <div className="flex flex-col justify-center items-center  mx-auto min-w-[500px] p-6 ">
          {payment && (
            <div className="flex flex-col justify-between gap-3 ">
              <p className="font-bold text-xl">
                Order ID: {payment.order_id.replace("ORDER-", "")}
              </p>
              <p className="font-bold text-xl">
                Gross Amount: Rp.
                {payment.gross_amount.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
                ;
              </p>
              <p className="font-bold text-xl">
                Payment Type: {payment.payment_type.split("_").join(" ")}
              </p>
              <p className="font-bold text-xl">
                transation time :{" "}
                {new Date(payment.transaction_time).toLocaleString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </p>
              <p className="font-bold text-xl">
                status transiction: {payment.transaction_status}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentStatus;
