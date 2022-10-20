<script lang="ts">
	import { fade } from "svelte/transition"
	import json from "./gallery.json"
	let bg = false
	let currentItem
</script>

<svelte:window
	on:keydown={() => {
		bg = false
	}}
/>

{#each json as item}
	<button
		class="galleryimg"
		on:click={() => {
			currentItem = item
			bg = true
		}}
		on:keypress={() => {
			currentItem = item
			bg = true
		}}
	>
		<img src="/gallery/{item.Filename}.webp" alt={item.Name} />
	</button>
{/each}

{#if bg}
	<div
		transition:fade={{ duration: 200 }}
		id="bg"
		on:click={() => {
			bg = false
		}}
		on:keypress={() => {
			bg = false
		}}
	>
		<h1>{currentItem.Name}</h1>
		<img src="/galleryhq/{currentItem.Filename}.jpg" alt={currentItem.Name} />
		<h2>{currentItem.Description}</h2>
	</div>
{/if}

<style lang="sass">
	#bg
		position: fixed
		top: 0
		left: 0
		width: 100vw
		height: 100vh
		background: #000000ef
		z-index: 999
		h1, h2
			text-align: center
			margin-top: 6rem
		h2
			position: fixed
			bottom: 0
			left: 50%
			transform: translateX(-50%)
			height: 6rem

		img
			width: 100%
			height: calc(100% - 18rem)
			position: fixed
			top: 50%
			left: 50%
			transform: translate(-50%, -48%)

	button
		background-color: #0000
		border: 0
		padding: 0

	button, img
		width: 100%
		height: 100%
		object-fit: contain
		border-radius: 1rem

	.galleryimg
		cursor: pointer
		transition: 0.2s
		&:hover
			transition: 0.2s
			transform: scale(1.2)

	@media screen and (max-width: 800px)
		#bg
			h2
				width: 60%

	@media screen and (max-width: 600px)
		#bg
			h1
				margin-top: 3rem
			h2
				width: 85%
</style>
