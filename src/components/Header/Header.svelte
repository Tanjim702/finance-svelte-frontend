<script context='module'>
    import { user } from "../../store.js";
    import HeaderLink from "./HeaderLink.svelte";
</script>

<style>
    .header{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        padding-right: 10px;
        border-bottom: 2px solid rgb(168, 168, 168);
    }
    .header h2{
        color: rgb(252, 114, 23);
    }
    ul{
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        align-items: center;
    }
</style>

<header>
    <div class="header">
        <div class="logo">
            <h2>
                Money Manager
            </h2>
        </div>
        <div class="links">
            <ul>
                {#if $user.isAuthenticated}
                <HeaderLink link='Dashboard'/>
                <HeaderLink link='Logout'/>
                {:else}
                <HeaderLink link='Signup'/>
                <HeaderLink link='Login'/>
                {/if}
            </ul>
        </div>
    </div>
</header>