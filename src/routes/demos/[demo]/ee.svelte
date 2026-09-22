<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
  import {encode, decode} from "./obfuscrypt.ts"
	import { onMount } from 'svelte';
	let text = $state('test');
	let seed = $state(Number.parseInt(Math.abs(Math.random())*2**64).toString(16));
	let counter = $state(0);
	let cipher = $state('');
	let errorText = $state('');
  let encrypt = $state(true);
  function updateCipher() {
      cipher = encode(seed, counter, text).ciphertext
  }
  function updateText() {
      text = decode(seed, cipher)
  }
  onMount(()=>{
      cipher = encode(seed, counter, text).ciphertext
  })
  function handleKeyDown(event) {
    encrypt ? updateCipher():updateText();
    if (event.key === 'Enter') {
      event.shiftKey ? counter--:counter++;
    }
  }
</script>

<button class="cursor-pointer border border-purple-700 px-6 py-3 text-purple-300 transition-colors hover:border-purple-500">
  <p class='text-white border-purple-500' onclick={()=>{encrypt = !encrypt}}>{encrypt?"En":"De"}crypt</p>
</button>
<p class="text-white my-6">Input: </p>
  {#if encrypt}
<input
  type="text"
  bind:value={text}
  onkeydown={handleKeyDown}
  placeholder="Message to encrypt"
  class="focus;border-purple-500 w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
/>
  {:else if text}
<p class="text-white my-6 break-words">{text}</p>
  {:else}
<p class="text-purple-300 my-6">Invalid!</p>
  {/if}


	<div class="flex gap-4 col my-4 row">
<p class="text-white my-6">Seed (hex): </p>
<input
  type="text"
  bind:value={seed}
  oninput={encrypt ? updateCipher:updateText}
  placeholder="Seed"
  class="focus;border-purple-500 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
/>
<p class="text-white my-6">Index: </p>
<input
  type="number"
  bind:value={counter}
  oninput={encrypt ? updateCipher:updateText}
  placeholder="Seed"
  class="focus;border-purple-500 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
/>
    </div>
<p class="text-white my-6">Output: </p>
  {#if !encrypt}
<input
  type="text"
  bind:value={cipher}
  oninput={updateText}
  placeholder="Encrypted message"
  class="focus;border-purple-500 w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
/>
  {:else}
<p class="text-white my-6 break-words">{cipher}</p>
  {/if}

		<div class="my-6">
<button class="cursor-pointer border border-purple-700 px-6 py-3 text-purple-300 transition-colors hover:border-purple-500 mb-8">
  <p class='text-white border-purple-500' onclick={()=>{navigator.clipboard.writeText(cipher)}}>copy</p>
</button>
  </div>
