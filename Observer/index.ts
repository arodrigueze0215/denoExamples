import SeismicMonitor from "./SeismicMonitor.ts";
import "./listeners/EmergencyResponseAgency.ts";

const seismicMonitor = new SeismicMonitor();

seismicMonitor.detectEarthquake();  