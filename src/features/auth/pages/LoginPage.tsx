import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-stone-50 to-slate-100 dark:bg-none">
        <div className=" w-full max-w-md shadow-lg p-6 bg-white rounded-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold leading-none tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-500">Basic Form</p>
          </div>
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
