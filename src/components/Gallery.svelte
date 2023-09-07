<script lang="ts">
	import { fade } from "svelte/transition"
	import json from "./gallery.json"

	type Item = {
		Name: string
		Filename: string
		Description: string
	}

	let bg = false,
		currentItem: Item

	const open = (item: Item) => () => {
			currentItem = item
			bg = true
		},
		close = () => {
			bg = false
		}
</script>

<svelte:window on:keydown={close} />

<br />
<div id="all">
	{#each json as item}
		<button
			class="galleryimg"
			on:click={open(item)}
			on:keypress={open(item)}>
			<img
				src="https://cdn.torbreckorchard.co.uk/gallery/{item.Filename}.webp"
				alt={item.Name} />
		</button>
	{/each}
</div>

{#if bg}
	<div
		transition:fade={{ duration: 200 }}
		id="bg"
		on:click={close}
		on:keypress={close}>
		<h2>{currentItem.Name}</h2>
		<img
			src="https://cdn.torbreckorchard.co.uk/galleryhq/{currentItem.Filename}.jpg"
			alt={currentItem.Name} />
		<h3>{currentItem.Description}</h3>
	</div>
{/if}

<style lang="stylus">
	#all
		max-width 100%
		display grid
		column-gap 0.5rem
		row-gap 0.5rem
		grid-template-columns repeat(4, 1fr)

		@media screen and (max-width 800px)
			grid-template-columns repeat(3, 1fr)
		@media screen and (max-width 500px)
			grid-template-columns repeat(2, 1fr)

	#bg
		position fixed
		top 0
		left 0
		width 100vw
		height 100vh
		background #000e
		z-index 999

		img
			width 100%
			height calc(100% - 18rem)
			position fixed
			top 50%
			left 50%
			transform translate(-50%, -48%)

	button
		background #0000
		border 0
		padding 0

	button
	img
		width 100%
		height 100%
		object-fit contain
		border-radius 1rem

	.galleryimg
		cursor pointer
		transition 0.2s
		&:hover
			transition 0.2s
			transform scale(1.2)

	h2
	h3
		text-align center
		margin-top 6rem

	h2
		font-size 2.5rem

	h3
		font-size 1.8rem
		position fixed
		bottom 0
		left 50%
		transform translateX(-50%)
		height 6rem
		font-weight 400
		@media screen and (max-width 800px)
			width 60%

	@media screen and (max-width 600px)
		h2
			margin-top 3rem
		h3
			width 85%
</style>
