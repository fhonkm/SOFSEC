import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext"

export default function LoginPage() {
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();

    const handleSignOut = async (e) => {
        e.preventDefault()
        try {
            await signOut();
            navigate("/");
        } catch (e) {
            console.log("error: ", e)
        }
    }

    return (
        <div>
            <p>Welcome, {session?.user?.email}!</p>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignOut}>
                Sign out!
            </button>
        </div>
    )
}