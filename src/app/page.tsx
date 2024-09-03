import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Ambition Tracker</h1>
          <Link href="/auth/signin" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Sign In / Sign Up
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Track Your Goals, Achieve Your Dreams</h2>
          <p className="text-xl text-gray-600 mb-8">Ambition Tracker helps you set, monitor, and accomplish your personal and professional goals.</p>
          <Link href="/auth/signin" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
            Get Started
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { title: 'Set Goals', description: 'Define clear, actionable goals for your personal and professional life.' },
            { title: 'Track Progress', description: 'Monitor your advancement with intuitive charts and progress indicators.' },
            { title: 'Stay Motivated', description: 'Receive reminders and encouragement to keep you on track towards success.' },
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Turn Your Ambitions into Reality?</h2>
          <Link href="/auth/signin" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
            Join Ambition Tracker Today
          </Link>
        </section>
      </div>
    </main>
  )
}
