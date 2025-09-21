<script>
    import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
  
    let currentMonth = new Date();
    let events = [
      { date: "2025-09-05", title: "Event A" },
      { date: "2025-09-14", title: "Event B" }
    ];
  
    let days = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth)
    });
  
    function getEvents(day) {
      return events.filter((e) => e.date === format(day, "yyyy-MM-dd"));
    }
  </script>
  
  <div class="calendar">
    <div class="header">{format(currentMonth, "MMMM yyyy")}</div>
    <div class="grid">
      {#each days as day}
        <div class="day">
          <div class="date">{format(day, "d")}</div>
          {#each getEvents(day) as ev}
            <div class="event"></div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
  
  <style>
    .calendar {
      width: 100%;
      height: 80%;
       /* small box style */
      font-family: sans-serif;
      background: black;
      border: 2.5px solid #fff;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      text-align: center;
      font-weight: bold;
      padding: 0.5rem;
      background: black;
      height: 15%;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      height: 85%;
    }
    .day {
      border: 2.5px solid #eee;
      min-height: 50px;
      padding: 2px;
      position: relative;
    }
    .date {
      font-size: 1rem;
      color: #fff;
    }
    .event {
      width: 6px;
      height: 6px;
      background: #4f46e5;
      border-radius: 50%;
      position: absolute;
      bottom: 4px;
      left: 4px;
    }
  </style>
  