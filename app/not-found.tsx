import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex py-10 justify-center ">
      <div className="flex flex-col items-center justify-center text-center p-8 bg-[#ede4d2] h-fit">
        <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
}
