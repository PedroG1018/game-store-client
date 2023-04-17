const Home = () => {
  const data = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/N64-Console-Set.png",
      name: "Nintendo 64 (Black)",
      price: 169.99,
      rating: 4.95,
      reviews: 376,
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/N64-Console-Set.png",
      name: "Nintendo 64 (Black)",
      price: 169.99,
      rating: 4.95,
      reviews: 376,
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/N64-Console-Set.png",
      name: "Nintendo 64 (Black)",
      price: 169.99,
      rating: 4.95,
      reviews: 376,
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/N64-Console-Set.png",
      name: "Nintendo 64 (Black)",
      price: 169.99,
      rating: 4.95,
      reviews: 376,
    },
  ];

  return (
    <main className="p-10">
      <div className="flex mx-auto justify-items-center space-x-2 text-center">
        <div>
          <img
            src="https://cdn11.bigcommerce.com/s-ymgqt/product_images/uploaded_images/nintendo-64-joey.jpg"
            alt="dkoldies"
            className="max-w-fit"
          ></img>
        </div>
        <div className="text-blue-800">
          <h1 className="font-bold">1-UP GAME STORE</h1>
          <p className="pt-6">
            Buy used video games, original game systems and old school gaming
            accessories at the largest family run retro video game online store.
            Shop all our vintage 100% authentic products, with a{" "}
            <a href="#" className="text-black underline">
              free 1 year warranty
            </a>
            and free domestic shipping on orders over $10!
          </p>
        </div>
      </div>
      <div className="pt-6 text-center">
        <h1 className="font-semibold text-3xl">Featured Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 items-center pt-4 gap-2">
          {data.map((product) => (
            <div className="p-10 border-4 border-black">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/02/N64-Console-Set.png"
                alt="product"
              />
              <h2>Nintendo 64 System (Black)</h2>
              <p>From: $169.99</p>
              <div className="flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Rating star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <p className="ml-2 text-sm font-bold text-gray-900">4.95</p>
                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-900 underline hover:no-underline"
                >
                  73 reviews
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
