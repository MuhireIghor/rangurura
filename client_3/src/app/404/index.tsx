import Logo from "components/atoms/Logo";

export default function NotFound() {
  const handleGoBack = () => {
    history.back();
  };
  return (
    <div className="w-full bg-primary relative">
      <img
        src="/bg_shape.svg"
        className="absolute z-10 max-w-[100vw] min-w-[100vw] max-h-[100vh] min-h-[100vh] object-cover"
      />
      <main className="h-[100vh] w-[100vw] flex items-center justify-center bg-[url('bg_shape.svg)] bg-center bg-cover static z-10">
        <div className="w-[95%] md:w-[45%] h-fit shadow-2xl bg-white pb-8 py-12 z-20 rounded-xl">
          <div className="w-full flex justify-center items-center">
            <Logo className="text-primary" showText={true} />
          </div>

          <p className="text-5xl font-semibold text-primary text-center">
            404!
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-5xl text-center">
            Page not found
          </h1>
          <p className="leading-5 text-center text-black text-base  pt-4">
            The page you are looking for was not found. If you think this is an
            issue, please contact support for help
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={handleGoBack}
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-light-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-blue"
            >
              Go back
            </button>
            <div role="button" className="text-sm font-semibold text-primary">
              Contact support <span aria-hidden="true">&rarr;</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
