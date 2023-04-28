import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../utils/utils";

function HomePage({events}) {

    return (
        <div>
            {<EventList items={events}/>}
        </div>
    )
}

export async function getStaticProps() {
    const events = await getFeaturedEvents()
    
    return {
        props: {
            events: events
        }
    }
}

export default HomePage;