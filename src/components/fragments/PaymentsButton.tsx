import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function PaymentsButton({ cartTotal, cardInfo }: any) {
  const [loading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleBuy = async () => {
    setIsLoading(true);
    try {
      const integerAmount = Math.round(cartTotal);
      // generate token dari backend
      const { data } = await axios.post("http://localhost:4000/token", {
        orderId: `ORDER-` + Date.now(),
        grossAmount: integerAmount,
        first_name: cardInfo.first_name,
        email: cardInfo.email,
        phone: cardInfo.phone,
      });
      console.log("isi data mid", cardInfo);

      //panggil midtrasn snap
      window.snap.pay(data.token, {
        onSuccess: function (result: any) {
          /* You may add your own implementation here */
          try {
            axios.post("http://localhost:4000/payments", {
              order_id: result.order_id,
              fraud_status: result.fraud_status,
              gross_amount: result.gross_amount,
              payment_type: result.payment_type,
              status_message: result.status_message,
              transaction_id: result.transaction_id,
              transaction_status: result.transaction_status,
              transaction_time: result.transaction_time,
            });
          } catch (error: any) {
            console.error("ada kesalahan waktu payment", error.message);
          }
          localStorage.setItem("cartItems", JSON.stringify(result));
          navigate(`/payments/${result.order_id}`);
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleBuy}
        type="submit"
        className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[9px_9px_0px_rgba(0,0,0,10)] active:bg-[#00E1EF] rounded-md"
      >
        {loading ? "memprosess" : "bayar sekkarang"}
      </button>
    </div>
  );
}
