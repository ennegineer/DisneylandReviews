<script>
import { Link } from "svelte-routing";
</script>

<div class='header'>
    <h1 class='title'>Disneyland Reviews</h1>
        <p>
            <Link to="/">Summary</Link> | 
            <Link to="reviews">Reviews</Link> |
            <Link to="graphs">Graphs</Link> |
            <Link to="data">Data</Link>
        </p>
</div>

<style>
.header {
    display: flex;
    justify-content: space-between;
    padding-left: 1.5em;
    padding-right: 1.5em;
    align-items: baseline;
}
</style>