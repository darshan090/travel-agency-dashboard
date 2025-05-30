import { ButtonComponent } from "@syncfusion/ej2-react-buttons"
import { Link } from "react-router"
import { loginWithGoogle } from "~/appwrite/auth"

const SignIn = () => {
  return (
    <main className="auth">
        <section className="size-full glassmorphism flex-center px-6">
            <div className="sign-in-card">
                <header className="header">
                    <Link to='/'>
                        <img src="/assets/icons/logo.svg" alt="" className="size-[30px]"/>
                    </Link>
                    <h1 className="p-28-bold text-dark-100">Tourvisto</h1>
                </header>
                <article>
                    <h2 className="p-28-semibold text-dark-100 text-center">Start Your Travel Journey</h2>
                    <p className="p-18-regular text-center text-gray-100 !leading-7">Sign in with Google to manage destinations,iteneraries and user activity with ease</p>
                    <ButtonComponent type="button" iconCss="e-search-icon" className="button-class !h-11 !w-full" onClick={loginWithGoogle}>
                        <img src="/assets/icons/google.svg"  className="size-5"/>
                        <span className="p-18-semibold text-white">Sign In with Google</span>
                    </ButtonComponent>
                </article>
            </div>
        </section>
    </main>
  )
}

export default SignIn