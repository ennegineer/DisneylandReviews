<script context=module>
    import { setContext, getContext } from 'svelte';
    import { writable } from 'svelte/store';
    
    const key = {};
    
    export const getAccordionContext = () => getContext(key);
    export const createAccordionContext = () => {
        const current = writable(null);
        const context = { current };
        setContext(key, context);
        
        return context;
    }
    </script>
    <script>
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    
    export let open = false;
    
        const { current } = getAccordionContext();
        const currentKey = {};
    
        createAccordionContext(); // Context for children
    
    function handleClick() {
        open = !open
                if (open)
                    $current = currentKey;
    }
    
        $: if ($current != currentKey)
            open = false;
    </script>
    
    <div  class="accordion">
      <div class="header" on:click={handleClick}>
          <div class="text">
              <slot name="head"></slot> 
          </div>
      </div>
    
      {#if open}
      <div class="details" transition:slide="{{ duration: 150, 
      easing:quadInOut }}" >
          <slot name="details">
          </slot>
      </div>
      {/if}
    
    </div>
    
    <style>
       div.accordion {
          margin: 1rem 0;
          background-color: rgb(69, 69, 69);
        color: #444;
        cursor: pointer;
        padding: .6em;
        text-align: left;
        border: none;
        outline: none;
        transition: 0.4s;
      }
      .active, .accordion:hover {
        background-color: rgb(82, 82, 82);
      }
      div.header {
          display:flex;
          width:100%;
      }
      div.header .text {
          flex: 1;
      }
      div.details {
          background-color: transparent;
          padding:1rem;
      }
    </style>