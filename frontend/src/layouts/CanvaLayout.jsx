export default function CanvaLayout({ pub }) {
    return (
      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="bg-gray-900 text-white flex flex-col justify-center p-12 space-y-6">
          <h1 className="text-5xl font-black">{pub.title}</h1>
          <p>{pub.description}</p>
          <span className="text-4xl">{pub.tone}</span>
        </div>
        <div className="flex items-center justify-center bg-gray-100">
          {pub.image
            ? <img src={pub.image} alt="" className="object-contain max-h-full" />
            : <span className="opacity-30">—</span>}
        </div>
      </div>
    );
  }
  