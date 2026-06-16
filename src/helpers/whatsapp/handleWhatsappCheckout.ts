import { CartItem } from "@/store/cart.store";
import { buildWhatsappMessage } from "./buildWhatsappMessage";
import { getWhatsappUrl } from "./getWhatsappUrl";
import { CheckoutData } from "@/types/checkout.types";
import { createOrderAction } from "@/app/actions/utils/orders";

type Props = CheckoutData & {
    items: CartItem[];
    subtotal: number;
};

export async function handleWhatsappCheckout({
    customerName,
    phone,
    notes,
    items,
    subtotal,
}: Props) {
    const result = await createOrderAction({
        customerName,
        phone,
        notes,
        items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
        })),
    });

    if (!result.ok) {
        return {
            ok: false,
            message: result.message,
        };
    }

    const message = buildWhatsappMessage({
        orderId: result.order!.id,
        customerName,
        phone,
        notes,
        items,
        subtotal,
    });

    window.open(
        getWhatsappUrl(
            process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "",
            message
        ),
        "_blank"
    );

    return {
        ok: true,
        order: result.order,
    };
}