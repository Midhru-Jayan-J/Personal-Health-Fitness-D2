import { create } from "zustand"
// import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async() => {
        try {
            const res = await fetch("http://localhost:3000/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            if(!res.ok) throw new Error("Not Authenticated");
            const data = await res.json();
            set({authUser: data});
        } catch (error) {
            console.log("Error in checkAuth: ", error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },



}))