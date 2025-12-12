"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import toast from "react-hot-toast"

// --- Leaflet Marker Icon setup ---
import iconUrl from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

const DefaultIcon = L.icon({
  iconUrl: iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

// --- Types ---
interface NominatimResult {
  lat: string
  lon: string
  display_name: string
}

interface Props {
  setAddressCurrent: React.Dispatch<React.SetStateAction<string>>
}

// --- Recenter Map ---
const RecenterMap = ({ position }: { position: [number, number] }) => {
  const map = useMap()
  useEffect(() => {
    map.setView(position, map.getZoom())
  }, [position, map])
  return null
}

// --- Marker click ---
const LocationMarker = ({
  position,
  onLocationSelect,
}: {
  position: [number, number]
  onLocationSelect: (lat: number, lon: number) => void
}) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng)
    },
  })
  return <Marker position={position} />
}

export default function AddressInfo({ setAddressCurrent }: Props) {
  const [position, setPosition] = useState<[number, number]>([10.7769, 106.6951])
  const [addressLocal, setAddressLocal] = useState("")
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([])
  const [showSuggest, setShowSuggest] = useState(false)
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)

  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  /** Reverse Geocode */
  const fetchAddress = useCallback(
    async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=vi`
        )
        const data = await res.json()
        const name = data.display_name || "Không tìm thấy địa chỉ"
        setAddressLocal(name)
        setAddressCurrent(name)
        setQuery(name)
        setPosition([lat, lon])
      } catch {
        toast.error("Không lấy được địa chỉ")
      }
    },
    [setAddressCurrent]
  )

  /** Autocomplete fetch */
  const fetchSuggestions = useCallback(
    (text: string) => {
      if (!text.trim()) {
        setSuggestions([])
        return
      }

      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(async () => {
        setLoading(true)
        if (abortControllerRef.current) abortControllerRef.current.abort()
        abortControllerRef.current = new AbortController()
        try {
          const [lat, lon] = position
          const viewbox = `${lon - 0.5},${lat - 0.5},${lon + 0.5},${lat + 0.5}`
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              text
            )}&format=json&addressdetails=1&limit=5&viewbox=${viewbox}&bounded=1`,
            { signal: abortControllerRef.current.signal }
          )
          const data = await res.json()
          setSuggestions(data)
        } catch (error: any) {
          if (error.name !== "AbortError") console.error(error)
        } finally {
          setLoading(false)
          setHighlightIndex(-1)
        }
      }, 300)
    },
    [position]
  )

  /** Select suggestion */
  const selectSuggestion = (item: NominatimResult) => {
    const lat = parseFloat(item.lat)
    const lon = parseFloat(item.lon)
    setPosition([lat, lon])
    setAddressLocal(item.display_name)
    setAddressCurrent(item.display_name)
    setQuery(item.display_name)
    setShowSuggest(false)
    setHighlightIndex(-1)
  }

  /** Handle input change */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setQuery(text)
    setShowSuggest(true)
    fetchSuggestions(text)
  }

  /** Handle keyboard navigation */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggest) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightIndex((prev) => Math.min(prev + 1, suggestions.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
        selectSuggestion(suggestions[highlightIndex])
      }
    } else if (e.key === "Escape") {
      setShowSuggest(false)
    }
  }

  /** Cleanup on unmount */
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      if (abortControllerRef.current) abortControllerRef.current.abort()
    }
  }, [])

  /** Highlight matched text */
  const highlightText = (text: string) => {
    if (!query) return text
    const regex = new RegExp(`(${query})`, "gi")
    return text.replace(regex, "<mark>$1</mark>")
  }

  return (
    <div className="mx-4 mb-2 p-4 bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm space-y-3">
      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggest(true)}
          placeholder="Nhập địa chỉ..."
          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
        />
        {loading && (
          <div className="absolute right-3 top-2 text-xs text-gray-500 animate-pulse">
            Đang tìm...
          </div>
        )}

        {/* Suggestions */}
        {showSuggest && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white border rounded-md shadow-lg z-[1000] max-h-60 overflow-y-auto">
            {suggestions.map((item, i) => (
              <div
                key={i}
                className={`px-4 py-2 cursor-pointer text-sm border-b last:border-0 ${
                  i === highlightIndex ? "bg-emerald-100" : "hover:bg-emerald-50"
                }`}
                onClick={() => selectSuggestion(item)}
                dangerouslySetInnerHTML={{ __html: highlightText(item.display_name) }}
              />
            ))}
          </div>
        )}

        {/* Overlay để click ngoài đóng */}
        {showSuggest && <div className="fixed inset-0 z-[999] bg-transparent" onClick={() => setShowSuggest(false)} />}
      </div>

      {/* Map */}
      <div className="relative h-96 w-full rounded-lg overflow-hidden border border-gray-300 shadow-inner z-0">
        <MapContainer center={position} zoom={13} scrollWheelZoom className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
          <LocationMarker position={position} onLocationSelect={fetchAddress} />
          <RecenterMap position={position} />
        </MapContainer>
      </div>

      {/* Info */}
      <div className="p-4 bg-white/80 border border-emerald-100 rounded-md text-sm text-slate-700 shadow-sm">
        <p className="mb-1">
          <span className="font-semibold text-emerald-700">Địa chỉ:</span> {addressLocal || "Chưa chọn địa điểm"}
        </p>
        <p>
          <span className="font-semibold text-emerald-700">Tọa độ:</span> {position[0].toFixed(6)}, {position[1].toFixed(6)}
        </p>
      </div>
    </div>
  )
}
