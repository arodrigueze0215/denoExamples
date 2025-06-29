import SeismicMonitor from "../SeismicMonitor.ts";
import { EarthquakeData } from "../SeismicMonitor.ts";

class EmergencyResponseAgency {
    
    constructor() {
        const seismicMonitor = new SeismicMonitor();
        seismicMonitor.addEventListener(SeismicMonitor.EARTHQUAKE_EVENT, (event: Event) => {
            this.handleEarthquake(event as CustomEvent<EarthquakeData>);
        });
    }

    handleEarthquake(event: CustomEvent<EarthquakeData>) {
        console.log("Emergency Response Agency: Earthquake detected!", event.detail);
    }
}

export default new EmergencyResponseAgency();
