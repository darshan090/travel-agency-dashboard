import { ButtonComponent } from "@syncfusion/ej2-react-buttons"
import { Link, redirect } from "react-router-dom"
import { loginWithGoogle } from "~/appwrite/auth"
import { account } from "~/appwrite/client"

export async function clientLoader (){
    try {
        const user = await account.get();

        if(user.$id) return redirect('/')
    } catch (error) {
        console.log('Error fetching User',error)
    }
}

const SignIn = () => {
  console.log('Current origin:', window.location.origin); // Debug log
  return (
    <main className="auth">
        <section className="size-full glassmorphism flex-center px-6">
            <div className="sign-in-card">
                <header className="header-class">
                    <Link to='/'>
                        <img src="/assets/icons/logo.svg" alt="" className="size-[30px]"/>
                    </Link>
                    <h1 className="p-28-bold text-dark-100">Tourvisto</h1>
                </header>
                <article>
                    <h2 className="p-28-semibold text-dark-100 text-center mt-5">Start Your Travel Journey</h2>
                    <p className="p-18-regular text-center text-gray-100 !leading-7">Sign in with Google to manage destinations,iteneraries and user activity with ease</p>
                    <ButtonComponent type="button" iconCss="e-search-icon" className="button-class !h-11 !w-full mt-5" onClick={loginWithGoogle}>
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