<script>
    import { user } from "../../store";
    import request from "../../request.js";
    import {decodeToken,toggleAuthHeader} from "../../utils.js";
    let loginEmail = ''
    let loginPassword = ''
    const handleSubmit =async (e)=>{
        const data = {email:loginEmail,password:loginPassword}
        const res = await request.post('/user/login',data)
        const token = res.data.token
        await toggleAuthHeader('login',token)
        const loggedInUser = {isAuthenticated:true,user:decodeToken(token).user}
        user.set(loggedInUser)       
    }
</script>

<style>
    
</style>

<div>
    {#if $user.isAuthenticated}
        You have already logged in
    {:else}
        <form on:submit|preventDefault={handleSubmit}>
            <h4>Login</h4>
            <div class="input-div">
                <span>Login</span>
                <input type="text" placeholder='Enter your email' bind:value={loginEmail}>
            </div>
            <div class="input-div">
                <span>Password</span>
                <input type="text" placeholder='Enter your password' bind:value={loginPassword}>
            </div>
            <button type="submit">Login</button>
        </form>    
    {/if}
</div>