const LoginPage = () => {
  return (
    <div className="h-screen w-full bg-stone-50">
      <div className="flex h-full flex-row items-center justify-center gap-[10dvw]">
        <div className="">
          <h2 className="text-3xl font-semibold">Login with Google</h2>
          <h4 className="text-xl font-medium">
            For now, we only support Google login
            <br />
            Please read the README on GitHub first!
          </h4>
        </div>

        <div className="flex items-center rounded-md bg-white p-4 shadow-xl">
          <h2 className="text-xl text-emerald-300">Login</h2>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
