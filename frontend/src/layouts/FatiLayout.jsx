export default function FatiLayout({ pub }) {
    return (
      <div className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-purple-600 to-pink-500 text-white p-8 space-y-6">
        <h1 className="text-4xl font-extrabold drop-shadow-lg">{pub.title}</h1>
        <p className="max-w-xl">{pub.description}</p>
        {pub.image && <img src={pub.image} alt="" className="w-72 rounded-lg shadow-lg" />}
      </div>
    );
  }
  