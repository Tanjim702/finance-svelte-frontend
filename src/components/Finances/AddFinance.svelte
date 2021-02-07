<script>
    import request from "../../request";
    import { finances } from "../../store";
    let data = {
        source:'',
        incomeType:'',
        amount:null,
        description:'',
        date:Date.now(),
        month:new Date().getMonth()
    }
    async function handleSubmit(e){
        try {
            const res = await request.post('/transactions/createTransaction',data)
            finances.set({finances:{
                ...$finances.finances,
                [res.data.data.incomeType]:[data,...$finances.finances[res.data.data.incomeType]]
            }})
        } catch (error) {
            console.log(error)
        }
    }
</script>

<section>
    <form on:submit|preventDefault={handleSubmit}>
        <input type="text" bind:value={data.source} placeholder='Source'>
       <select bind:value={data.incomeType}>
        <option value="Select a type" selected disabled>Select</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
        <option value="asset">Asset</option>
        <option value="liability">Liability</option>
        </select>
        <input type="number" bind:value={data.amount} placeholder='amount'>
        <textarea bind:value={data.description}></textarea>
        <button type='submit'>Add</button>
    </form>
</section>

<style>
    input,select{
        padding: 10px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular';
        display: block;        
    }
    input,select:focus{
        outline: none;
    }
</style>