import { getFeaturedEvents } from "../fake-data";
import EventList from "../components/events/EventList";

function HomePage() {
    const featuredEvents = getFeaturedEvents();

    return (
        <div>
            <ul>
                {<EventList items={featuredEvents}/>}
            </ul>
        </div>
    )
}

export default HomePage;