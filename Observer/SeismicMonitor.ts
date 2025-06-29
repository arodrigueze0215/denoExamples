export type EarthquakeData = {
    magnitude: number;
    location: string;
    depth: number;
    timestamp: Date;
    coordinates: {
        latitude: number;
        longitude: number;
    };
};
class SeismicMonitor extends EventTarget {
    static instance: SeismicMonitor;
    earthquakes: Map<string, EarthquakeData>;
    static EARTHQUAKE_EVENT = "earthquake";

    constructor() {
        super();
        if (!SeismicMonitor.instance) {
            SeismicMonitor.instance = this;
            this.earthquakes = new Map<string, EarthquakeData>();
        }
        return SeismicMonitor.instance;
    }

    // Method to generate random earthquake data
    generateRandomEarthquake(): EarthquakeData {
        const locations = [
            "Dosquebradas, Risaralda, Colombia",
            "Medellín, Antioquia, Colombia",
            "Bogotá, Cundinamarca, Colombia",
            "Cali, Valle del Cauca, Colombia",
            "Cartagena, Bolívar, Colombia",
        ];

        return {
            magnitude: Math.random() * 8.0 + 2.0, // Random magnitude between 2.0 and 10.0
            location: locations[Math.floor(Math.random() * locations.length)],
            depth: Math.random() * 200, // Random depth between 0 and 200km
            timestamp: new Date(),
            coordinates: {
                latitude: Math.random() * 180 - 90,
                longitude: Math.random() * 360 - 180,
            },
        };
    }

    detectEarthquake(): void {
        const earthquake = this.generateRandomEarthquake();
        const event = new CustomEvent(SeismicMonitor.EARTHQUAKE_EVENT, { detail: earthquake });
        this.dispatchEvent(event);
    }

    getEarthquakeData(): EarthquakeData[] {
        return Array.from(this.earthquakes.values());
    }

}

export default SeismicMonitor;
