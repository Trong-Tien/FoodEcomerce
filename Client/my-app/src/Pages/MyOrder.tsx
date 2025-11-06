    "use client"

    import { useEffect, useState } from "react"
    import { useAuth } from "@/Context/AuthContext"
    import { orderService } from "@/Services/orderService"
    import { Tabs ,TabsList, TabsTrigger, TabsContent} from "@/Component/Common/tabs"
    import { Button } from "@/Component/Common/Cart/Button"
    import { Package, MessageCircle, Repeat2 } from "lucide-react"

    export default function MyOrder() {
    const { token } = useAuth()
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState("all")

    useEffect(() => {
        const fetchOrders = async () => {
        if (!token) {
            setError("Bạn chưa đăng nhập")
            setLoading(false)
            return
        }

        try {
            const data = await orderService.getAll()
            setOrders(data || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
        }

        fetchOrders()
    }, [token])

    if (loading) {
        return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Đang tải đơn hàng...</p>
            </div>
        </div>
        )
    }

    if (error) {
        return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md text-center">
            <p className="text-destructive font-medium">Lỗi: {error}</p>
            </div>
        </div>
        )
    }

    return (
        <div className="min-h-screen bg-muted/30">
        <div className="max-w-5xl mx-auto p-4 md:p-6">
            {/* Header */}
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance mb-2">Đơn hàng của tôi</h1>
            <p className="text-muted-foreground">Quản lý và theo dõi tất cả đơn hàng của bạn</p>
            </div>

            {/* Tabs Navigation */}
            <div className="mb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:w-fit bg-background border-b border-border rounded-none h-auto p-0 gap-0">
                <TabsTrigger
                    value="all"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                    Tất cả
                </TabsTrigger>
                <TabsTrigger
                    value="pending"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                    Chờ xác nhận
                </TabsTrigger>
                <TabsTrigger
                    value="processing"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                    Vận chuyển
                </TabsTrigger>
                <TabsTrigger
                    value="completed"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                    Hoàn thành
                </TabsTrigger>
                </TabsList>

                {/* Content */}
                <TabsContent value={activeTab} className="mt-6">
                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                    <Package className="w-16 h-16 text-muted-foreground/30 mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">Chưa có đơn hàng</p>
                    <p className="text-muted-foreground text-center">Bạn chưa có đơn hàng nào trong mục này</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                        key={order.id}
                        className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                        {/* Order Header */}
                        <div className="border-b border-border p-4 bg-muted/40">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-primary rounded-r"></div>
                                <div>
                                <p className="font-semibold text-foreground text-lg">{order.shopName || "Shop"}</p>
                                <p className="text-xs text-muted-foreground">
                                    Đơn hàng #OID{order.id?.toString().slice(-6)}
                                </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-700 rounded-full text-sm font-medium">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Hoàn thành
                                </span>
                            </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-4 space-y-3">
                            {order.items?.map((item: any, idx: number) => (
                            <div
                                key={idx}
                                className="flex gap-4 pb-3 last:pb-0 last:border-0 border-b border-border last:border-b-0"
                            >
                                <div className="relative flex-shrink-0">
                                <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg bg-muted border border-border"
                                />
                                <span className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                    {item.quantity}
                                </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                                    {item.name}
                                </p>
                                {item.variant && <p className="text-sm text-muted-foreground mt-1">{item.variant}</p>}
                                </div>
                                <div className="flex-shrink-0 text-right">
                                <p className="font-semibold text-primary text-lg">
                                    {item.price.toLocaleString("vi-VN")}đ
                                </p>
                                </div>
                            </div>
                            ))}
                        </div>

                        {/* Order Footer */}
                        <div className="border-t border-border bg-muted/20 p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="text-right md:text-left">
                                <p className="text-sm text-muted-foreground mb-1">Thành tiền</p>
                                <p className="text-2xl font-bold text-primary">
                                {order.totalPrice.toLocaleString("vi-VN")}đ
                                </p>
                            </div>
                            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                                <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 sm:flex-none gap-2 border-border hover:bg-muted bg-transparent"
                                >
                                <MessageCircle className="w-4 h-4" />
                                <span className="hidden sm:inline">Liên hệ người bán</span>
                                <span className="sm:hidden">Liên hệ</span>
                                </Button>
                                <Button
                                className="flex-1 sm:flex-none gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                                size="sm"
                                >
                                <Repeat2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Mua lại</span>
                                <span className="sm:hidden">Mua lại</span>
                                </Button>
                            </div>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
                </TabsContent>
            </Tabs>
            </div>
        </div>
        </div>
    )
    }
