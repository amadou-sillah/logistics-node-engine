export interface Shipment {
  id: string;
  trackingNumber: string;
  status: string;
  origin: string;
  destination: string;
  eta: string;
}

export interface TrackingEvent {
  shipmentId: string;
  eventType: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  occurredAt: string;
}
