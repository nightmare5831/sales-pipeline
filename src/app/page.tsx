export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-8">
          Sales Pipeline
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your deals with a visual kanban board
        </p>
        <div className="flex gap-4">
          <a
            href="/pipeline"
            className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            View Pipeline
          </a>
        </div>
      </main>
    </div>
  )
}