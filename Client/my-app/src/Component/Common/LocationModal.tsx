// src/Component/Common/LocationModal.tsx
import { useEffect, useMemo, useState } from "react";
import { FiChevronLeft, FiX, FiSearch } from "react-icons/fi";

/* ===== Types ===== */
interface LocationModalProps {
  onClose: () => void;
  onConfirm: (address: {
    province: string;
    district: string;
    ward: string;
    addressDetail: string;
  }) => void;
}
type Ward = { name: string; hint?: string };
type District = { name: string; hint?: string; wards: Ward[] };
type Province = {
  code: string;
  name: string;
  oldName?: string;
  hint?: string;
  districts: District[];
};

/* ===== Demo data (rút gọn) ===== */
const DATA: Province[] = [
  {
    code: "HCM",
    name: "Thành phố Hồ Chí Minh",
    hint: "Hồ Chí Minh, Bình Dương, Bà Rịa - Vũng Tàu",
    districts: [
      {
        name: "Quận 1",
        hint: "Trung tâm TP",
        wards: [
          { name: "Phường Bến Nghé" },
          { name: "Phường Bến Thành" },
          { name: "Phường Cô Giang" },
        ],
      },
      {
        name: "Quận 7",
        hint: "Nam Sài Gòn",
        wards: [
          { name: "Phường Tân Phong" },
          { name: "Phường Tân Phú" },
          { name: "Phường Tân Kiểng" },
        ],
      },
      {
        name: "Huyện Cần Giờ",
        hint: "Hướng biển",
        wards: [
          { name: "Xã Cần Thạnh" },
          { name: "Xã Long Hòa" },
          { name: "Xã Lý Nhơn" },
        ],
      },
    ],
  },
  {
    code: "DAN",
    name: "Thành phố Đà Nẵng",
    hint: "Quảng Nam, Đà Nẵng",
    districts: [
      {
        name: "Hải Châu",
        wards: [{ name: "Phường Hải Châu 1" }, { name: "Phường Hải Châu 2" }],
      },
      {
        name: "Thanh Khê",
        wards: [{ name: "Phường Thạc Gián" }, { name: "Phường Chính Gián" }],
      },
      {
        name: "Ngũ Hành Sơn",
        wards: [{ name: "Phường Mỹ An" }, { name: "Phường Khuê Mỹ" }],
      },
    ],
  },
];

/* ===== Component ===== */
export default function LocationModal({
  onClose,
  onConfirm,
}: LocationModalProps) {
  const [step, setStep] = useState<"province" | "district" | "ward" | "detail">(
    "province"
  );
  const [useCurrent, setUseCurrent] = useState(false);
  const [showOldName, setShowOldName] = useState(true);
  const [search, setSearch] = useState("");

  const [pickedProvince, setPickedProvince] = useState<Province | null>(null);
  const [pickedDistrict, setPickedDistrict] = useState<District | null>(null);
  const [pickedWard, setPickedWard] = useState<Ward | null>(null);
  const [addressDetail, setAddressDetail] = useState("");

  /* Geolocation (demo) */
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  useEffect(() => {
    if (!useCurrent) return;
    if (!("geolocation" in navigator)) {
      setGeoError("Trình duyệt không hỗ trợ xác định vị trí.");
      setUseCurrent(false);
      return;
    }
    setGeoLoading(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      () => setGeoLoading(false),
      () => {
        setGeoLoading(false);
        setUseCurrent(false);
        setGeoError("Không lấy được vị trí. Vui lòng chọn thủ công.");
      },
      { timeout: 8000 }
    );
  }, [useCurrent]);

  /* Filter theo step */
  const provinceList = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return DATA;
    return DATA.filter((p) =>
      [p.name, p.oldName, p.hint]
        .filter(Boolean)
        .some((t) => t!.toLowerCase().includes(q))
    );
  }, [search]);

  const districtList = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = pickedProvince?.districts ?? [];
    if (!q) return list;
    return list.filter((d) =>
      [d.name, d.hint].filter(Boolean).some((t) => t!.toLowerCase().includes(q))
    );
  }, [pickedProvince, search]);

  const wardList = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = pickedDistrict?.wards ?? [];
    if (!q) return list;
    return list.filter((w) =>
      [w.name, w.hint].filter(Boolean).some((t) => t!.toLowerCase().includes(q))
    );
  }, [pickedDistrict, search]);

  /* Handlers */
  const back = () => {
    if (step === "district") setStep("province");
    else if (step === "ward") setStep("district");
    else if (step === "detail") setStep("ward");
    setSearch("");
  };

  const selectProvince = (p: Province) => {
    setPickedProvince(p);
    setPickedDistrict(null);
    setPickedWard(null);
    setSearch("");
    setStep("district");
  };

  const selectDistrict = (d: District) => {
    setPickedDistrict(d);
    setPickedWard(null);
    setSearch("");
    setStep("ward");
  };

  const selectWard = (w: Ward) => {
    setPickedWard(w);
    setSearch("");
    setStep("detail");
  };

  const canFinish =
    !!pickedProvince &&
    !!pickedDistrict &&
    !!pickedWard &&
    addressDetail.trim().length > 0;

  const finish = () => {
    if (!canFinish) return;
    onConfirm({
      province: pickedProvince!.name,
      district: pickedDistrict!.name,
      ward: pickedWard!.name,
      addressDetail: addressDetail.trim(),
    });
    onClose();
  };

  /* Title theo step */
  const title =
    step === "province"
      ? "Chọn Tỉnh/Thành phố"
      : step === "district"
        ? (pickedProvince?.name ?? "Chọn Quận/Huyện")
        : step === "ward"
          ? (pickedDistrict?.name ?? "Chọn Phường/Xã")
          : "Địa chỉ nhận hàng";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* modal */}
      <div
        className="relative w-full max-w-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_120ms_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (mềm viền) */}
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200/60">
          {/* Back */}
          {step !== "province" ? (
            <button
              aria-label="Quay lại"
              onClick={back}
              className="w-9 h-9 grid place-items-center rounded-full hover:bg-gray-100"
            >
              <FiChevronLeft className="text-xl" />
            </button>
          ) : (
            <span className="w-9" />
          )}

          <h2 className="flex-1 text-lg font-bold text-gray-900 text-center">
            {title}
          </h2>

          {/* Right action: X ở các step bình thường, Hoàn tất ở step detail */}
          {step === "detail" ? (
            <button
              onClick={finish}
              disabled={!canFinish}
              className={`px-3 h-9 rounded-full text-white text-sm font-medium transition
                ${canFinish ? "bg-green-600 hover:bg-green-700" : "bg-green-300 cursor-not-allowed"}`}
            >
              Hoàn tất
            </button>
          ) : (
            <button
              aria-label="Đóng"
              onClick={onClose}
              className="w-9 h-9 grid place-items-center rounded-full hover:bg-gray-100"
            >
              <FiX className="text-lg" />
            </button>
          )}
        </div>

        {/* Info + toggles (chỉ hiện ở bước đầu/giữa) */}
        {step !== "detail" && (
          <div className="px-5 pt-4">
            <div className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-2 border border-green-200/40">
              <div className="text-sm">
                <div className="font-semibold text-green-700">
                  Sử dụng vị trí hiện tại
                </div>
                <div className="text-green-700/80 text-xs">
                  {geoLoading
                    ? "Đang xác định vị trí..."
                    : "Bật để chọn tự động gần bạn"}
                </div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={useCurrent}
                  onChange={(e) => setUseCurrent(e.target.checked)}
                />
                <span className="w-11 h-6 bg-gray-300 rounded-full relative transition peer-checked:bg-green-600">
                  <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition peer-checked:left-[22px]" />
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between mt-3 mb-2">
              <div className="text-sm text-gray-700">
                Hiển thị tên{" "}
                {step === "province"
                  ? "Tỉnh/Thành"
                  : step === "district"
                    ? "Quận/Huyện"
                    : "Phường/Xã"}{" "}
                cũ
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={showOldName}
                  onChange={(e) => setShowOldName(e.target.checked)}
                />
                <span className="w-10 h-6 bg-gray-300 rounded-full relative transition peer-checked:bg-green-600">
                  <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition peer-checked:left-[18px]" />
                </span>
              </label>
            </div>
          </div>
        )}

        {geoError && (
          <div className="px-5 text-sm text-red-600">{geoError}</div>
        )}

        {/* Search (sticky) */}
        {step !== "detail" && (
          <div className="px-5 pb-2 sticky top-[56px] bg-white z-10">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Tìm nhanh ${step === "province" ? "Tỉnh/Thành" : step === "district" ? "Quận/Huyện" : "Phường/Xã"}`}
                className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500/40"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}

        {/* List */}
        <div className="px-5 pb-4 max-h-[420px] overflow-y-auto">
          {step === "province" && (
            <ul className="divide-y divide-gray-200/60 rounded-xl border border-gray-200/60 ring-1 ring-black/5">
              {provinceList.map((p) => (
                <li key={p.code}>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-50"
                    onClick={() => selectProvince(p)}
                  >
                    <div className="font-medium text-gray-900">
                      {showOldName && p.oldName ? p.oldName : p.name}
                    </div>
                    {p.hint && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        {p.hint}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {step === "district" && pickedProvince && (
            <ul className="divide-y divide-gray-200/60 rounded-xl border border-gray-200/60 ring-1 ring-black/5">
              {districtList.map((d) => (
                <li key={d.name}>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-50"
                    onClick={() => selectDistrict(d)}
                  >
                    <div className="font-medium text-gray-900">{d.name}</div>
                    {d.hint && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        {d.hint}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {step === "ward" && pickedDistrict && (
            <ul className="divide-y divide-gray-200/60 rounded-xl border border-gray-200/60 ring-1 ring-black/5">
              {wardList.map((w) => (
                <li key={w.name}>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-50"
                    onClick={() => selectWard(w)}
                  >
                    <div className="font-medium text-gray-900">{w.name}</div>
                    {w.hint && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        {w.hint}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {step === "detail" && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Tỉnh/Thành phố
                  </label>
                  <input
                    disabled
                    value={pickedProvince?.name ?? ""}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Quận/Huyện
                  </label>
                  <input
                    disabled
                    value={pickedDistrict?.name ?? ""}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Phường/Xã
                  </label>
                  <input
                    disabled
                    value={pickedWard?.name ?? ""}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Số nhà, tên đường
                  </label>
                  <input
                    value={addressDetail}
                    onChange={(e) => setAddressDetail(e.target.value)}
                    placeholder="Ví dụ: 123 Lê Lợi"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500/40"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ⛔ Footer đã xoá theo yêu cầu */}
      </div>
    </div>
  );
}
