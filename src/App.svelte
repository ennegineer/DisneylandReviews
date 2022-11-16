<script>
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
  import { Router, Link, Route } from "svelte-routing";
  import Summary from './Summary.svelte'
  import Data from './Data.svelte'
  import Graph from './Graph.svelte'
  import Menu from './Menu.svelte'
  import Foot from './Foot.svelte'
</script>

<Router url="">
  <Menu/>
  <main>
    <Route path="/" component="{Summary}" />
    <Route path="graphs" component="{Graph}" />
    <Route path="data" component="{Data}" />
  </main>
  <Foot/>
</Router>


<style>
html, body {
  height: 100%;
  margin: 3px;
  min-height: 100%;
}
</style>
