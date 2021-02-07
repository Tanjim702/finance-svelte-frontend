<script context='module'>
	import Header from "./components/Header/Header.svelte";
	import Login from "./components/User/Login.svelte";
	import Signup from "./components/User/Signup.svelte";
	import Dashboard from "./components/Finances/Dashboard.svelte";
	import AddFinance from "./components/Finances/AddFinance.svelte";
	import { onMount } from "svelte";
	import { user } from "./store";
	import { decodeToken,toggleAuthHeader } from "./utils";
</script>

<script>
	onMount(()=>{
		const token = localStorage.getItem('token')
		if(token){
			const loggedInUser = decodeToken(token).user
			user.set({isAuthenticated:true,user:loggedInUser}) 
			toggleAuthHeader('set',token)
		}else{
			return
		}
	})
</script>

<main>
	<Header/>
	<Login/>
	<Signup/>
	<Dashboard/>
	<AddFinance/>
</main>

<style>

</style>