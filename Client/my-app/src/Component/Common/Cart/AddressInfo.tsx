"use client"
import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import iconUrl from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"
import toast from "react-hot-toast"

const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow })
L.Marker.prototype.options.icon = DefaultIcon

interface Props {
  setAddressCurrent: React.Dispatch<React.SetStateAction<string>>
}

export default function AddressInfo({ setAddressCurrent }: Props) {
  const [position, setPosition] = useState<[number, number] | null>([10.762622, 106.660172])
  const [addressLocal, setAddressLocal] = useState<string>("")
  const [searchInput, setSearchInput] = useState<string>("")

  const LocationMarker = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng
        setPosition([lat, lng])
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=vi`
        )
        const data = await res.json()
        const name = data.display_name || "Không tìm thấy địa chỉ"
        setAddressLocal(name)
        setAddressCurrent(name)
      },
    })
    return position ? <Marker position={position}></Marker> : null
  }

  const handleSearch = async () => {
    if (!searchInput.trim()) return
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        searchInput
      )}&format=json&addressdetails=1&accept-language=vi&limit=1`
    )
    const data = await res.json()
    if (data && data.length > 0) {
      const { lat, lon, display_name } = data[0]
      setPosition([parseFloat(lat), parseFloat(lon)])
      setAddressLocal(display_name)
      setAddressCurrent(display_name)
    } else toast.error("❌ Không tìm thấy địa chỉ, vui lòng thử lại.")
  }

  const RecenterMap = ({ position }: { position: [number, number] | null }) => {
    const map = useMapEvents({})
    useEffect(() => {
      if (position) map.setView(position, 15)
    }, [position])
    return null
  }

  return (
    <div className="mx-4 mb-4 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 space-y-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Nhập địa chỉ để tìm trên bản đồ..."
          className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 outline-none text-sm"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg font-semibold"
        >
          Tìm
        </button>
      </div>

      <MapContainer
        center={position || [10.762622, 106.660172]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-96 w-full rounded-xl border border-gray-300 shadow-sm"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <RecenterMap position={position} />
      </MapContainer>

      {position && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm">
          <p>
            <b>Địa chỉ:</b> {addressLocal || "Chưa xác định"}
          </p>
          <p>
            <b>Tọa độ:</b> {position[0].toFixed(6)}, {position[1].toFixed(6)}
          </p>
        </div>
      )}
    </div>
  )
}
