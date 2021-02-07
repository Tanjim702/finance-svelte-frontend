<script>
    import { user } from "../../store";
    let loginEmail = ''
    let loginPassword = ''
</script>

<style>

</style>

<div>
    {#if $user.isAuthenticated}
        You have already signed up
    {:else}
        <form>
            <h4>Signup</h4>
            <div class="input-div">
                <span>Email</span>
                <input type="text" placeholder='Enter your email' bind:value={loginEmail}>
            </div>
            <div class="input-div">
                <span>Username</span>
                <input type="text" placeholder='Enter your email' bind:value={loginEmail}>
            </div>
            <div class="input-div">
                <span>Password</span>
                <input type="text" placeholder='Enter your password' bind:value={loginPassword}>
            </div>
        </form>    
    {/if}
</div>