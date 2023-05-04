import { getFeaturedEvents } from "../utils/utils";

import EventList from "../components/events/EventList";
import NewsletterRegistration from "../components/input/NewsletterRegistration"

function HomePage({events}) {
    return (
        <div>
            <NewsletterRegistration />
            <EventList items={events}/>
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