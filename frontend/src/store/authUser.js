import axios from "axios";
import {create} from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    user:null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLogginIn: false,
    signup: async (credentials) => {
        set({isSigningUp: true});
        try{
            const response = await axios.post("/api/v1/auth/signup", credentials);
            set({user: response.data.user});
            toast.success("Account created successfully");
        }catch(error){
            toast.error(error.response.data.message);
            set({isSigningUp: false, user:null});

        }
    },
    login: async (credentials) => {
        set({ isLogginIn: true });
        try{
            const response = await axios.post("/api/v1/auth/login",credentials);
            set({ user: response.data.user, isLogginIn: false });
            toast.success("Logged in successfully");
        }catch(error){
            toast.error(error.response.data.message) || "Login failed";
            set({ isLogginIn: false, user:null});
        }
    },
    logout: async () => {
		set({ isLoggingOut: true });
		try {
			await axios.post("/api/v1/auth/logout");
			set({ user: null, isLoggingOut: false });
			toast.success("Logged out successfully");
		} catch (error) {
			set({ isLoggingOut: false });
			toast.error(error.response.data.message || "Logout failed");
		}
	},
    authCheck: async () => {
		set({ isCheckingAuth: true });
		try {
			const response = await axios.get("/api/v1/auth/authCheck");

			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
			//toast.error(error.response.data.message || "An error occurred");
		}
	},
}));