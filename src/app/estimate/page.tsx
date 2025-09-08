import ChatEstimator from "@/components/ChatEstimator";

export default function EstimatePage() {
return (
  <section className="mx-auto max-w-7xl px-6 py-16">
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        Project Estimator
      </h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
        Get an instant estimate range and book your session.
      </p>
    </div>

    <div className="mt-10 max-w-3xl mx-auto">
      <ChatEstimator />
    </div>
  </section>
);

}
