import { useState } from "react";

interface LocationModalProps {
  onClose: () => void;
  onConfirm: (address: {
    province: string;
    district: string;
    ward: string;
    addressDetail: string;
  }) => void;
}

export default function LocationModal({
  onClose,
  onConfirm,
}: LocationModalProps) {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const handleConfirm = () => {
    onConfirm({
      province,
      district,
      ward,
      addressDetail,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">Chọn địa chỉ giao hàng</h2>

        <input
          type="text"
          placeholder="Tỉnh/Thành phố"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          type="text"
          placeholder="Quận/Huyện"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          type="text"
          placeholder="Phường/Xã"
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          type="text"
          placeholder="Số nhà, tên đường..."
          value={addressDetail}
          onChange={(e) => setAddressDetail(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
