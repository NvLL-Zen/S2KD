<script>
    import { fade, scale } from 'svelte/transition';
    import { onMount, onDestroy } from 'svelte';

    let open = false;
    let selectedDate = '';
    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();

    let months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    function daysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    function selectDate(y, m, d) {
        selectedDate = `${y}/${String(m+1).padStart(2,'0')}/${String(d).padStart(2,'0')}`;
        open = false;
    }

    function prevMonth() {
        if (month === 0) {
            month = 11;
            year--;
        } else {
            month--;
        }
    }

    function nextMonth() {
        if (month === 11) {
            month = 0;
            year++;
        } else {
            month++;
        }
    }

    let pickerRef;
    function handleClickOutside(event) {
        if (open && pickerRef && !pickerRef.contains(event.target)) {
            open = false;
        }
    }

    let removeListener = null;
    
    function manageListener() {
        if (open) {
            window.addEventListener('mousedown', handleClickOutside);
            removeListener = () => window.removeEventListener('mousedown', handleClickOutside);
        } else if (removeListener) {
            removeListener();
            removeListener = null;
        }
    }

    $: open, manageListener();

    onMount(() => {
        return () => {
            if (removeListener) removeListener();
        };
    });
    
    onDestroy(() => {
        if (removeListener) removeListener();
    });
</script>

<style>
    .datepicker-container {
        position: relative;
        display: inline-block;
        width: 180px;
    }
    .datepicker-input {
        width: 100%;
        padding: 8px 12px;
        background: black;
        color: white;
        border: 1px solid white;
        border-radius: 5px;
        font-size: 1em;
        cursor: pointer;
        transition: border 0.2s;
        text-align: center;
    }
    .datepicker-input:focus {
        outline: none;
        border: 1.5px solid #fff;
    }
    .dropdown {
        position: absolute;
        top: 110%;
        left: 50%;
        transform: translateX(-50%);
        width: 260px;
        background: black;
        color: white;
        border: 1px solid white;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.7);
        z-index: 10;
        padding: 16px;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        text-align: center;
    }
    .arrow-btn {
        background: none;
        color: white;
        border: none;
        font-size: 1.2em;
        cursor: pointer;
        padding: 2px 8px;
        border-radius: 3px;
        transition: background 0.2s;
    }
    .arrow-btn:hover {
        background: #222;
    }
    .calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
    }
    .day, .date {
        text-align: center;
        padding: 4px 0;
        font-size: 0.95em;
    }
    .day {
        font-weight: bold;
        color: #bbb;
    }
    .date {
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.2s, color 0.2s;
    }
    .date:hover {
        background: #fff;
        color: #000;
    }
    .selected {
        background: #fff;
        color: #000;
        font-weight: bold;
    }
</style>

<div class="datepicker-container" bind:this={pickerRef}>
    <input
        class="datepicker-input"
        type="text"
        readonly
        placeholder="Pilih tanggal"
        value={selectedDate}
        on:click={() => open = !open}
    />
    {#if open}
        <div class="dropdown" transition:fade={{ duration: 180 }}>
            <div class="header">
                <button class="arrow-btn" on:click={prevMonth}>&lt;</button>
                <span>{months[month]} {year}</span>
                <button class="arrow-btn" on:click={nextMonth}>&gt;</button>
            </div>
            <div class="calendar">
                <div class="day">Mi</div>
                <div class="day">Se</div>
                <div class="day">Se</div>
                <div class="day">Ra</div>
                <div class="day">Ka</div>
                <div class="day">Ju</div>
                <div class="day">Sa</div>
                {#each Array(new Date(year, month, 1).getDay()).fill(0) as _}
                    <div></div>
                {/each}
                {#each Array(daysInMonth(year, month)).fill(0).map((_, i) => i + 1) as d}
                    <button
                        type="button"
                        class="date {selectedDate === `${year}/${String(month+1).padStart(2,'0')}/${String(d).padStart(2,'0')}` ? 'selected' : ''}"
                        on:click={() => selectDate(year, month, d)}
                        aria-label={`Select ${year}/${String(month+1).padStart(2,'0')}/${String(d).padStart(2,'0')}`}
                    >{d}</button>
                {/each}
            </div>
        </div>
    {/if}
</div>
