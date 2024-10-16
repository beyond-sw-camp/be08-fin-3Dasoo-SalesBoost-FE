import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isLogedIn:false,
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: localStorage.getItem('loginUserName'),
        returnUrl: null
    }),
    actions: {
        setIsLogedIn(status:boolean){
            this.isLogedIn = status;
        },
        
        logout() {
            this.user = null;
            localStorage.removeItem('loginUserName');
            localStorage.removeItem('loginUserEmail');
            localStorage.removeItem('accessToken');
            this.setIsLogedIn(false);
            router.push({name:"Login"});
        }
    }
});
