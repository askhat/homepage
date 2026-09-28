<script>
  import { page } from '$app/state'
</script>

<svelte:head>
  <title>{page.status} — Askhat Bikmetov</title>
</svelte:head>

<main>
  <h1>{page.status}</h1>
  <p><a href="/">← Back home</a></p>
</main>

<style>
  main {
    padding: calc(768px / 10) calc(320px / 10);
    text-align: center;
  }

  h1 {
    margin-bottom: 1rem;
  }

  a {
    text-decoration: underline;
  }
</style>
