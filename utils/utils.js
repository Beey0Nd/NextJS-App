export async function getAllEvents() {
    const data = await fetch("https://nextjs-app-5b0a5-default-rtdb.firebaseio.com/events.json").then(res => res.json())

    const events = []

    for(const key in data) {
       events.push({
            id: key,
            ...data[key]
       }) 
    }

    return events;
}

export async function getFeaturedEvents() {
    const events = await getAllEvents()
    return events.filter((event) => event.isFeatured);
}