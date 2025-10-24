import {
  X,
  TicketPercent,
  Gift,
  User,
  MapPin,
  FileText,
  HelpCircle,
  Headphones,
  Search,
  LogOut,
} from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  open: boolean;
  onClose: () => void;
  user?: { name?: string; email?: string };
  onLogout: () => void;
}

export default function AccountSidebar({ open, onClose, user, onLogout }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay nền tối */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Panel tài khoản */}
      <div
        className="absolute right-0 top-0 h-full w-[360px] sm:w-[400px] bg-white shadow-2xl 
                   animate-slideIn overflow-y-auto rounded-l-xl"
      >
        {/* Header người dùng */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div>
            <h2 className="font-semibold text-gray-800">
              Anh {user?.name || "Người dùng"}
            </h2>
            <p className="text-xs text-gray-500">CHƯA CÓ HẠNG · 0 điểm</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nội dung menu */}
        <div className="p-3 text-[15px] text-gray-700 space-y-4">
          {/* Nhóm 1 */}
          <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <MenuItem
              icon={<TicketPercent className="text-green-600" size={18} />}
              label={
                <>
                  Phiếu mua hàng{" "}
                  <span className="ml-1 bg-yellow-400 text-white text-[11px] font-bold px-1.5 py-[1px] rounded-full">
                    0
                  </span>
                </>
              }
              onClick={() => navigate({ to: "/PhieuMuaHang" })}
            />
            <MenuItem
              icon={<Gift className="text-pink-500" size={18} />}
              label="Ưu đãi đặc biệt"
              onClick={() => navigate({ to: "/UuDai" })}
            />
          </div>

          {/* Nhóm 2 */}
          <div>
            <p className="px-2 mb-1 text-xs text-gray-500 uppercase font-semibold">
              Thông tin cá nhân
            </p>
            <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <MenuItem
                icon={<User className="text-green-600" size={18} />}
                label="Sửa thông tin cá nhân"
                onClick={() => navigate({ to: "/ThongTin" })}
              />
              <MenuItem
                icon={<MapPin className="text-green-600" size={18} />}
                label="Địa chỉ nhận hàng (1)"
                onClick={() => navigate({ to: "/DiaChi" })}
              />
              <MenuItem
                icon={<FileText className="text-green-600" size={18} />}
                label="Đơn hàng từng mua"
                onClick={() => navigate({ to: "/DonHang" })}
              />
            </div>
          </div>

          {/* Nhóm 3 */}
          <div>
            <p className="px-2 mb-1 text-xs text-gray-500 uppercase font-semibold">
              Hỗ trợ khách hàng
            </p>
            <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <MenuItem
                icon={<Headphones className="text-green-600" size={18} />}
                label={
                  <>
                    Tư vấn: <b>1900.1908</b> (7:30 – 21:30)
                  </>
                }
              />
              <MenuItem
                icon={<HelpCircle className="text-green-600" size={18} />}
                label={
                  <>
                    Khiếu nại: <b>1800.1067</b> (7:30 – 21:00){" "}
                    <span className="text-xs text-gray-400 italic">Miễn phí</span>
                  </>
                }
              />
              <MenuItem
                icon={<Search className="text-green-600" size={18} />}
                label="Tìm kiếm cửa hàng"
                onClick={() => navigate({ to: "/CuaHang" })}
              />
              <MenuItem
                icon={<TicketPercent className="text-green-600" size={18} />}
                label="Mua phiếu mua hàng"
                onClick={() => navigate({ to: "/MuaPhieu" })}
              />
            </div>
          </div>

          {/* Đăng xuất */}
          <div className="border-t pt-3">
            <MenuItem
              icon={<LogOut className="text-red-500" size={18} />}
              label={<span className="text-red-600 font-semibold">Đăng xuất</span>}
              onClick={onLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-green-50 transition border-b last:border-b-0"
    >
      <div className="min-w-[20px]">{icon}</div>
      <div className="flex-1 text-[15px]">{label}</div>
      <span className="text-gray-400">{">"}</span>
    </button>
  );
}
