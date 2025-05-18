export default function ImmersiveLayout({ pub }) {
    return (
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: pub.image ? `url(${pub.image})` : 'none' }}
      >
        <div className="bg-black/60 text-white p-10 max-w-lg rounded-lg">
          <h1 className="text-4xl font-bold mb-4">{pub.title}</h1>
          <p className="mb-4">{pub.description}</p>
          {pub.music && <audio src={pub.music} controls className="w-full" />}
        </div>
      </div>
    );
  }
  