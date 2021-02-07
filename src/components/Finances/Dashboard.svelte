<script>
    import { onMount } from "svelte";
    import { finances, user } from "../../store.js";
    import request from "../../request";
    $:myfinances = Object.entries($finances.finances);
    onMount(async () => {
        try {
            const res = await request.get("/transactions/allTransactions");
            finances.set({ finances: res.data.data });
            myfinances = Object.entries($finances.finances);
        } catch (error) {
            return error.message;
        }
    });
    const deleteItem = (type, id) => {
        request
            .delete(`/transactions/delete/${id}`)
            .then(() => {
                const filteredTypesForState = $finances.finances[type].filter(
                    (finance) => finance._id !== id
                );
                const newFinances = {
                    ...$finances.finances,
                    [type]: filteredTypesForState,
                };
                finances.set({ finances: newFinances });
            })
            .catch((err) => {
                console.log(err);
            });
    };
</script>

<div>
    {#if !$user.isAuthenticated}
        <p>User is not Authenticated.You are not allowed here and you now it</p>
    {:else if myfinances.length > 0}
        <div class="dashboard">
            {#each myfinances as finance}
                <div class="card">
                    <h3 class="title">{finance[0]}</h3>
                    <ul class="list">
                        {#if finance[1].length === 0}
                            <p>There are no {finance[0]} yet</p>
                        {:else}
                            {#each finance[1] as item}
                                <li>
                                    <p>{item.source}</p>
                                    <small>{item.amount}</small>
                                    <!-- <p>{item.date}</p> -->
                                    <button
                                        on:click={(e) =>
                                            deleteItem(
                                                item.incomeType,
                                                item._id
                                            )}>X</button
                                    >
                                </li>
                            {/each}
                        {/if}
                    </ul>
                </div>
            {/each}
        </div>
    {:else}
        <p>Loading</p>
    {/if}
</div>

<style>
    .dashboard {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }
    .card {
        border: 1px solid black;
        display: flex;
        flex-direction: column;
    }
    .title {
        text-align: center;
        font-weight: 200;
        font-family: "Courier New", Courier, monospace;
        color: burlywood;
        text-transform: capitalize;
    }
    ul {
        list-style-type: none;
        padding-left: 5px;
        padding-right: 5px;
    }
    li {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
</style>
