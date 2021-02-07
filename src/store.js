import {writable} from 'svelte/store'

export const user = writable({
    isAuthenticated:false,
    user:{
        _id:'',
        name:'',
        email:'',
        password:''
    }
})

export const finances = writable({
    finances:{},
})