<script>
    import { onMount } from 'svelte';

    const quotes = [
        "Sudah terbiasa terjadi tantee~",
        "Pikirkan tentang masa depan, ketika Konoha bukan satu-satunya tempat kita berpijak",
        "Are you sound this morning? Have you returned to the waking world without leaving any memories behind in the night?",
        "Repression work yielded a more preferable result.",
        "An opportunity has arrived.",
        "'Tis my time to shine!",
        "There's no such thing as pure freedom in this world. Even the wind cannot blow on forever.",
        "Rise and shine, sleepyhead, the sun's already in your eyes! ...Haha, don't tell me you actually thought I'd wake you up like that?",
        "Can't sleep? I understand — inspiration always comes knocking in the small hours. It's hard to ignore, right?",
        "Hm? Still half asleep? Don't force yourself. You should get some more rest."
    ];

    let currentQuote = "";

    onMount(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        currentQuote = quotes[randomIndex];
    });
</script>

<h2>
    "{currentQuote}"
</h2>
<style>
    h2 {
        font-size: var(--font-size-quote);
        animation: fadeIn 1.75s ease-in;
        background-color: inherit;
        color: inherit;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }

        75% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
</style>