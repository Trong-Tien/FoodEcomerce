import type { Voucher } from "./Voucher";

export interface VoucherUser {
  id: number;
  voucherId: number;
  userId: string;
  isUsed: boolean;
  usedAt?: string | null;
  voucherDTO?: Voucher | null; // ✅ tên đúng như từ backend
}
