import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  namaProduk: string;
  email: string;
  photo: string;
  harga: number;
  deksripsi: string;
  stock: number;
}

const AddProducts = () => {
  const {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      namaProduk: "",
      email: "",
      photo: "",
      harga: 0,
      deksripsi: "",
      stock: 0,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
       await axios.post("http://localhost:4000/products", {
        name: data.namaProduk,
        email: data.email,
        images: data.photo || null,
        price: Number(data.harga),
        description: data.deksripsi,
        stock: Number(data.stock),
      });
      reset()
      alert(`Berhasil menambahkan barang! ${data.namaProduk}`);


    } catch (err: any) {
      console.log(err.message || "ada kesalhan");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white max-w-[600px] w-full p-6 rounded space-y-8"
      >
        <div className="flex justify-center  items-center font-bold text-xl">
          <h1>Tambahkan Products Baru</h1>
        </div>
        {/* Name */}

        <label htmlFor="name" className="relative block bg-gray-200 rounded ">
          <input
            {...register("namaProduk", { required: "nama harus di isi" })}
            placeholder="masukan nama produk anda"
            className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm p-3"
          />
          <span className="absolute inset-y-0 start-3 -translate-y-5  px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
            Nama Produk
          </span>
          <p className="bg-white flex items-center px-5">
            {errors.namaProduk?.message}
          </p>
        </label>

        {/* Email */}
        <label htmlFor="email" className="relative block bg-gray-200 rounded">
          <input
            {...register("email", { required: "nama harus di isi" })}
            placeholder="masukan alamat email anda"
            className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm p-3"
          />
          <span className="absolute inset-y-0 start-3 -translate-y-5 px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
            Email
          </span>
        </label>

        {/* Images */}
        <label htmlFor="images" className="relative block bg-gray-200 rounded">
          <input
            {...register("photo", { required: "nama harus di isi" })}
            placeholder="sertakan gambar jikaada"
            className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm p-3"
          />
          <span className="absolute inset-y-0 start-3 -translate-y-5 px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
            URL Gambar (boleh kosong)
          </span>
        </label>

        {/* Price */}
        <label htmlFor="price" className="relative block bg-gray-200 rounded">
          <input
            {...register("harga", { required: "nama harus di isi" })}
            type="number"
            placeholder="harga barang"
            className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm p-3"
          />
          <span className="absolute inset-y-0 start-3 -translate-y-5  px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
            Harga
          </span>
        </label>

        {/* Description */}
        <label
          htmlFor="description"
          className="relative block bg-gray-200 rounded"
        >
          <textarea
            {...register("deksripsi", { required: "nama harus di isi" })}
            placeholder="deksripsi mengenai barang yang akan di jual"
            className="peer mt-0.5 w-full p-4 rounded border-gray-300 shadow-sm sm:text-sm resize-none h-20"
          ></textarea>
          <span className="absolute inset-y-0 start-3 -translate-y-5  px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
            Deskripsi
          </span>
        </label>

        {/* Stock */}
        <label htmlFor="stock" className="relative block bg-gray-200 rounded">
          <input
            {...register("stock", { required: "nama harus di isi" })}
            type="number"
            placeholder="berapa stocknya"
            className="peer mt-0.5 w-fullrounded w-full border-gray-300 shadow-sm sm:text-sm p-3"
          />
          <span className="absolute inset-y-0 start-3 -translate-y-5 px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
            Stok
          </span>
        </label>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-400 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300 ease-in-out"
          >
            Submit Produk
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
