<script>
  import Game from '$lib/game/Game.svelte'

  const name = 'Askhat Bikmetov'
  const socials = [
    { name: 'github', href: 'https://github.com/askhat' },
    {
      name: 'linkedin',
      href: 'https://www.linkedin.com/in/askhat-bikmetov-35031aa8/'
    },
    { name: 'telegram', href: 'https://t.me/askhatbik' },
    { name: 'discord', href: 'https://discord.gg/Yj7eTTX' }
  ]

  let gameOn = $state(false)
  let title = $state(name)
  /** @type {HTMLImageElement | undefined} */
  let photo = $state()

  function win() {
    gameOn = false
    title = 'You Won!'
    setTimeout(() => (title = name), 3000)
  }
</script>

<svelte:head>
  <title>{name}</title>
  <meta name="description" content="Askhat's Home Page" />
</svelte:head>

<div class="container" class:dimmed={gameOn}>
  <article class="row" itemscope itemtype="https://schema.org/Person">
    <div class="info">
      <h1 itemprop="name">{title}</h1>
      <h2>
        <span itemprop="jobTitle">Front–end Developer</span>
        <br />
        <span itemprop="worksFor">at&nbsp;Akvelon</span>
      </h2>
    </div>
    <button
      class="photo"
      title="Play"
      onclick={() => (gameOn = true)}
      disabled={gameOn}
    >
      <img
        bind:this={photo}
        src="/askhat-bikmetov-photo.jpg"
        alt={name}
        itemprop="image"
        style:visibility={gameOn ? 'hidden' : 'visible'}
      />
    </button>
  </article>
  <footer>
    <ul class="row">
      {#each socials as social (social.name)}
        <li>
          <a href={social.href} target="_blank" rel="noopener me">
            <img
              src="/i/{social.name}.svg"
              alt={social.name}
              width="50"
              height="50"
            />
          </a>
        </li>
      {/each}
    </ul>
  </footer>
</div>

{#if gameOn && photo}
  <Game ball={photo} onlose={() => (gameOn = false)} onwin={win} />
{/if}

<style>
  .container {
    margin: 0 auto;
    min-width: var(--min-width);
    padding-top: var(--y-unit);
    transition: filter 0.3s;
  }

  @media (min-width: 414px) {
    .container {
      max-width: var(--max-width);
    }
  }

  .dimmed {
    filter: blur(25px);
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin: 0 var(--x-unit);
    padding-bottom: var(--y-unit);
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 120px;
  }

  .photo {
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
  }

  .photo img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
  }

  ul {
    list-style: none;
  }
</style>
