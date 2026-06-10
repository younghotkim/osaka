"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import {
  categoryColors,
  type TripStop
} from "@/lib/trip-data";
import { useItineraryContext } from "./ItineraryContext";

declare global {
  interface Window {
    google?: {
      maps: {
        Map: new (el: HTMLElement, options: Record<string, unknown>) => GoogleMap;
        Marker: new (options: Record<string, unknown>) => GoogleMarker;
        Polyline: new (options: Record<string, unknown>) => GooglePolyline;
        InfoWindow: new (options?: Record<string, unknown>) => GoogleInfoWindow;
        LatLngBounds: new () => GoogleBounds;
        SymbolPath: { CIRCLE: number };
      };
    };
    initOsakaTripMap?: () => void;
  }
}

type GoogleMap = {
  fitBounds: (bounds: GoogleBounds, padding?: number) => void;
  setCenter: (position: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
  addListener: (event: string, callback: (event: { latLng?: GoogleLatLng }) => void) => void;
};

type GoogleLatLng = {
  lat: () => number;
  lng: () => number;
};

type GoogleMarker = {
  addListener: (event: string, callback: (event: { latLng?: GoogleLatLng }) => void) => void;
  setPosition: (position: { lat: number; lng: number }) => void;
  setMap: (map: GoogleMap | null) => void;
};

type GooglePolyline = {
  setMap: (map: GoogleMap | null) => void;
};

type GoogleInfoWindow = {
  open: (options: { map: GoogleMap; anchor: GoogleMarker }) => void;
  setContent: (content: string) => void;
  close: () => void;
};

type GoogleBounds = {
  extend: (position: { lat: number; lng: number }) => void;
};

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const OSAKA_CENTER = { lat: 34.6687, lng: 135.5013 };

// Day route colors — Osaka neon on warm paper.
const dayRouteColors = ["#d4356c", "#1d7f8c", "#e8a020", "#7d3f8e"];

export function routeColorForDay(day: number): string {
  return dayRouteColors[(day - 1) % dayRouteColors.length];
}

// Warm rose-paper map tint to match the app theme.
const osakaMapStyles = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ saturation: -40 }] },
  { featureType: "water", stylers: [{ color: "#cfe3df" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#f9efe9" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#6b4a5a" }] },
  { featureType: "landscape", stylers: [{ color: "#f4e7e0" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#2a1a22" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#fdf3f0" }] }
];

export function MapView({
  activeStop,
  onSelectStop,
  onMapClick,
  pin,
  editMode = false,
  dayFilter = 0,
  onMoveStopPin
}: {
  activeStop: TripStop;
  onSelectStop: (stop: TripStop) => void;
  onMapClick?: (lat: number, lng: number) => void;
  pin?: { lat: number; lng: number } | null;
  /** Edit mode: markers become draggable, drag end persists the new coords. */
  editMode?: boolean;
  /** 0 = show every day; otherwise only that day's stops + route. */
  dayFilter?: number;
  onMoveStopPin?: (stopId: string, lat: number, lng: number) => void;
}) {
  const { snapshot } = useItineraryContext();
  const tripStops = snapshot.stops;
  const tripDays = snapshot.days;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<GoogleMap | null>(null);
  const markersRef = useRef<GoogleMarker[]>([]);
  const polylinesRef = useRef<GooglePolyline[]>([]);
  const infoRef = useRef<GoogleInfoWindow | null>(null);
  const pinMarkerRef = useRef<GoogleMarker | null>(null);
  const lastFitKeyRef = useRef<string>("");
  const draggingRef = useRef(false);
  const onSelectRef = useRef(onSelectStop);
  const onMapClickRef = useRef(onMapClick);
  const onMoveStopPinRef = useRef(onMoveStopPin);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    onSelectRef.current = onSelectStop;
  }, [onSelectStop]);

  useEffect(() => {
    onMapClickRef.current = onMapClick;
  }, [onMapClick]);

  useEffect(() => {
    onMoveStopPinRef.current = onMoveStopPin;
  }, [onMoveStopPin]);

  useEffect(() => {
    if (!apiKey || window.google?.maps) {
      setMapReady(Boolean(window.google?.maps));
      return;
    }

    window.initOsakaTripMap = () => setMapReady(true);
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-osaka-trip-map="true"]'
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initOsakaTripMap&loading=async`;
    script.async = true;
    script.defer = true;
    script.dataset.osakaTripMap = "true";
    document.head.appendChild(script);
  }, []);

  // Create the map ONCE — markers/routes are managed separately so editing
  // (dragging pins, saving stops) never resets the camera.
  useEffect(() => {
    if (!mapReady || !mapRef.current || !window.google?.maps || mapInstanceRef.current) return;

    const googleMaps = window.google.maps;
    const map = new googleMaps.Map(mapRef.current, {
      center: OSAKA_CENTER,
      zoom: 13,
      disableDefaultUI: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      clickableIcons: false,
      styles: osakaMapStyles
    });

    mapInstanceRef.current = map;
    infoRef.current = new googleMaps.InfoWindow();

    map.addListener("click", (event) => {
      if (!onMapClickRef.current || !event.latLng) return;
      infoRef.current?.close();
      onMapClickRef.current(event.latLng.lat(), event.latLng.lng());
    });
  }, [mapReady]);

  // (Re)draw markers + day routes whenever the itinerary / filter / mode changes.
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !window.google?.maps) return;
    const googleMaps = window.google.maps;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    polylinesRef.current.forEach((line) => line.setMap(null));
    polylinesRef.current = [];

    const visibleDays = tripDays.filter((day) => dayFilter === 0 || day.day === dayFilter);
    const bounds = new googleMaps.LatLngBounds();
    let visibleCount = 0;

    visibleDays.forEach((day) => {
      const dayStops = tripStops.filter((stop) => stop.day === day.day);
      const line = new googleMaps.Polyline({
        path: dayStops.map((stop) => ({ lat: stop.lat, lng: stop.lng })),
        geodesic: true,
        strokeColor: routeColorForDay(day.day),
        strokeOpacity: 0.78,
        strokeWeight: 3,
        icons: [
          {
            icon: {
              path: googleMaps.SymbolPath.CIRCLE,
              scale: 3,
              fillOpacity: 1,
              strokeOpacity: 0
            },
            offset: "100%",
            repeat: "34px"
          }
        ],
        map
      }) as GooglePolyline;
      polylinesRef.current.push(line);

      dayStops.forEach((stop, index) => {
        const marker = new googleMaps.Marker({
          position: { lat: stop.lat, lng: stop.lng },
          map,
          title: editMode ? `${stop.title} — 길게 끌면 위치 이동` : stop.title,
          draggable: editMode,
          label: {
            // Day filter on → order within the day; all days → day number.
            text: dayFilter === 0 ? String(stop.day) : String(index + 1),
            color: "#ffffff",
            fontWeight: "800"
          },
          icon: {
            path: googleMaps.SymbolPath.CIRCLE,
            scale: editMode ? 12 : 10,
            fillColor: categoryColors[stop.category],
            fillOpacity: 1,
            strokeColor: editMode ? "#201219" : "#ffffff",
            strokeWeight: 2
          }
        });

        marker.addListener("click", () => {
          onSelectRef.current(stop);
          if (!infoRef.current) return;
          infoRef.current.setContent(
            `<strong style="color:#000">${stop.time} ${stop.title}</strong><br />${stop.subtitle}` +
              (editMode
                ? `<br /><em style="color:#a3275f">핀을 끌어 위치를 옮길 수 있어요</em>`
                : "")
          );
          infoRef.current.open({ map, anchor: marker });
        });

        if (editMode) {
          marker.addListener("dragstart", () => {
            draggingRef.current = true;
            infoRef.current?.close();
          });
          marker.addListener("dragend", (event) => {
            draggingRef.current = false;
            if (!event.latLng || !onMoveStopPinRef.current) return;
            onMoveStopPinRef.current(stop.id, event.latLng.lat(), event.latLng.lng());
          });
        }

        markersRef.current.push(marker);
        bounds.extend({ lat: stop.lat, lng: stop.lng });
        visibleCount += 1;
      });
    });

    // Refit the camera only when the visible day set changes — never mid-edit,
    // so saving/dragging a stop doesn't yank the viewport around.
    const fitKey = `${dayFilter}`;
    if (visibleCount > 0 && lastFitKeyRef.current !== fitKey) {
      lastFitKeyRef.current = fitKey;
      map.fitBounds(bounds, 56);
    }
  }, [mapReady, tripStops, tripDays, dayFilter, editMode]);

  // Recenter on the selected stop (list tap / marker tap), unless mid-drag.
  useEffect(() => {
    if (!mapInstanceRef.current || draggingRef.current) return;
    mapInstanceRef.current.setCenter({ lat: activeStop.lat, lng: activeStop.lng });
    mapInstanceRef.current.setZoom(15);
  }, [activeStop]);

  // Pending pin (edit mode: tap an empty spot → candidate coords for new stop).
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !window.google?.maps) return;
    if (pin) {
      if (pinMarkerRef.current) {
        pinMarkerRef.current.setPosition(pin);
        pinMarkerRef.current.setMap(map);
      } else {
        pinMarkerRef.current = new window.google.maps.Marker({
          position: pin,
          map,
          label: { text: "＋", color: "#ffffff", fontWeight: "900" },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: "#d4356c",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 3
          }
        }) as GoogleMarker;
      }
      map.setCenter(pin);
    } else if (pinMarkerRef.current) {
      pinMarkerRef.current.setMap(null);
    }
  }, [pin, mapReady]);

  return (
    <>
      <div ref={mapRef} className="google-map" />
      {!apiKey && (
        <div className="map-fallback">
          <MapPin size={22} />
          <strong>Google Maps API 키가 필요합니다.</strong>
          <span>.env.local에 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY를 넣으면 지도가 표시됩니다.</span>
        </div>
      )}
    </>
  );
}

export function MiniRouteStrip({
  from,
  to
}: {
  from: TripStop;
  to: TripStop | null;
}) {
  if (!apiKey) {
    return (
      <div className="mini-map mini-map--empty">
        <MapPin size={16} />
        <span>지도 키 없음</span>
      </div>
    );
  }

  const points = to ? [from, to] : [from];
  const center = to
    ? `${(from.lat + to.lat) / 2},${(from.lng + to.lng) / 2}`
    : `${from.lat},${from.lng}`;
  const markers = points
    .map(
      (stop, index) =>
        `markers=color:0x${index === 0 ? "d4356c" : "1d7f8c"}|label:${index + 1}|${stop.lat},${stop.lng}`
    )
    .join("&");
  const path = to ? `&path=color:0xd4356ccc|weight:4|${from.lat},${from.lng}|${to.lat},${to.lng}` : "";
  const styles = [
    "&style=feature:water|color:0x1a103d",
    "&style=feature:road|element:geometry|color:0x241548",
    "&style=feature:landscape|color:0x150a30",
    "&style=feature:poi|visibility:off",
    "&style=element:labels.text.fill|color:0xc6b0e6",
    "&style=element:labels.text.stroke|color:0x0a0524"
  ].join("");
  const src = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${to ? 14 : 15}&size=720x180&scale=2&${markers}${path}${styles}&key=${apiKey}`;

  return (
    <div className="mini-map">
      <img src={src} alt={to ? `${from.title} → ${to.title}` : from.title} loading="lazy" />
    </div>
  );
}
