<script context="module" lang="ts">
	import { getAdventureById } from '$lib/services/adventureService';
	import type { LoadInput } from '@sveltejs/kit';

	export const prerender = true;
	export async function load({ page }: LoadInput) {
		const adventure = await getAdventureById(page.params.id);
		return {
			props: { adventure }
		};
	}
</script>

<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import type { Adventure, Comment } from '$lib/types';
	import AdventurePage from './_components/adventurePage.svelte';
	import CommentForm from '$lib/components/comments/commentForm.svelte';
	import CommentBox from '$lib/components/comments/commentBox.svelte';
	import uniqBy from 'lodash/uniqBy.js';

	let comments: Comment[] = [];
	let isCreatingComment = false;

	$: comments = uniqBy([...comments, ...adventure.comments], 'id').filter(
		(comment) => !comment.blocked
	);

	const openCommentCreation = () => {
		isCreatingComment = true;
	};

	const onCommentSave = (comment: Comment) => {
		isCreatingComment = false;
		comments = [...comments, comment];
	};

	export let adventure: Adventure;
</script>

<AdventurePage {adventure} />
<Container>
	<div class="w-full mt-10">
		<h2 class="text-2xl">Commentaires</h2>
		{#if comments.length > 0}
			{#each comments as comment}
				<div class="my-5">
					<CommentBox {comment} adventureId={adventure.id} />
				</div>
			{/each}
		{/if}
		{#if !isCreatingComment}
			<button
				class="block px-3 py-2 border border-gray-600 text-gray-600 rounded-md mt-5"
				on:click={openCommentCreation}>Commenter</button
			>
		{:else}
			<CommentForm adventureId={adventure.id} onSuccess={onCommentSave} />
		{/if}
	</div>
</Container>
