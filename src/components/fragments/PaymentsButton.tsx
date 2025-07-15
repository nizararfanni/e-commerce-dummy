import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentsButton({ cartTotal, cardInfo }: any) {
  const [loading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleBuy = async () => {
    setIsLoading(true);
    try {
      // generate token dari backend
      const { data } = await axios.post("http://localhost:4000/token", {
        orderId: `ORDER-` + Date.now(),
        grossAmount: cartTotal,
        first_name: cardInfo.first_name,
        email: cardInfo.email,
        phone: cardInfo.phone,
      });
      console.log("isi data mid", cardInfo);

      //panggil midtrasn snap
      window.snap.pay(data.token, {
        onSuccess: function (result: any) {
          /* You may add your own implementation here */
          alert("payment success!");
          localStorage.setItem("order_detail", JSON.stringify(result));
          navigate("/payments");
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleBuy}>
      {loading ? "memprosess" : "bayar sekkarang"}
    </button>
  );
}
