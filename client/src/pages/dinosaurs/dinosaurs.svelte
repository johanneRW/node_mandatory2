<script>
    import AuthGuard from "../../guards/AuthGuard.svelte";
    import { loadDinos, updateVote } from "../../store/store.js"

    let dinoPromise = loadDinos()

    function voteForDino(id) {
        const promise = updateVote(id)
        promise.then(response => {
            if (response.ok) {
                dinoPromise = loadDinos()
            }
        })
    }
</script>

<h1>Vote for your favorite dinosaur.</h1>
<div class="grid-container">
    {#await dinoPromise then dinosaurs}
        {#each dinosaurs as dinosaur (dinosaur.id)}
            <div class="dino">
                <h2>{dinosaur.name}</h2>
                <img src={dinosaur.image} alt={dinosaur.name} />
                <p>Votes: {dinosaur.votes}</p>
                <AuthGuard>
                    <div slot="authed">
                        <button on:click|preventDefault={voteForDino}>Vote</button>
                    </div>
                </AuthGuard>
            </div>
        {/each}
    {/await}
</div>
<AuthGuard>
    <div slot="not_authed">
        <p id="loggedOut">Login/sign-up to vote</p>
    </div>
</AuthGuard>

<style>
    .dino img {
        width: 150px;
    }

    p {
        font-size: larger;
        font-weight: medium;
    }

    .dino {
        width: 20vw;
    }

    .grid-container {
        display: grid;
        grid-template-columns: auto auto auto auto;
        width: 95vw;
    }
    #loggedOut {
        color: #820404;
        font-weight: bold;
    }

    button {
        background-color: #ebca38;
    }
    h1 {
        font-style: italic;
    }
</style>
